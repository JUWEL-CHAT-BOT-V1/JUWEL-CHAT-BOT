const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const { alldown } = require("shaon-videos-downloader");

/* ===== SETTINGS ===== */
const cooldown = new Map();
const downloadedLinks = new Set();
const MAX_LINK_CACHE = 100;

const cacheDir = path.join(__dirname, "cache");
const statsPath = path.join(__dirname, "autodl_stats.json");

/* ===== INIT ===== */
if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);
if (!fs.existsSync(statsPath)) {
  fs.writeJsonSync(statsPath, { total: 0, users: {} }, { spaces: 2 });
}

module.exports = {
  config: {
    name: "autodl",
    version: "3.0.0",
    hasPermission: 0,
    credits: "MR JUWEL",
    description: "Auto download Facebook & TikTok videos",
    commandCategory: "auto",
    usages: "Just share or paste video link",
    cooldowns: 5
  },

  run: async () => {},

  handleEvent: async function ({ api, event }) {
    try {
      let videoURL = null;

      /* ===== LINK DETECT ===== */
      if (event.body && event.body.includes("http")) {
        videoURL = event.body.match(/https?:\/\/[^\s]+/)?.[0];
      }

      if (!videoURL && event.share?.url) {
        videoURL = event.share.url;
      }

      if (!videoURL && event.attachments?.length) {
        for (const att of event.attachments) {
          if (att.url) {
            videoURL = att.url;
            break;
          }
        }
      }

      if (!videoURL) return;

      const userID = event.senderID;
      const now = Date.now();

      /* ===== COOLDOWN ===== */
      if (cooldown.has(userID) && now - cooldown.get(userID) < 5000) {
        return api.sendMessage(
          "⏱️ একটু ধীরে! ৫ সেকেন্ড পর আবার চেষ্টা করো।",
          event.threadID,
          event.messageID
        );
      }
      cooldown.set(userID, now);

      /* ===== DUPLICATE CHECK ===== */
      if (downloadedLinks.has(videoURL)) {
        return api.sendMessage(
          "⚠️ এই ভিডিওটি আগে ডাউনলোড করা হয়েছে!",
          event.threadID,
          event.messageID
        );
      }

      api.setMessageReaction("⚡", event.messageID, () => {}, true);
      api.sendTypingIndicator(event.threadID, true);

      const startTime = Date.now();

      /* ===== DOWNLOAD INFO ===== */
      const data = await alldown(videoURL);
      if (!data?.url) throw new Error("Download failed");

      api.setMessageReaction("⏳", event.messageID, () => {}, true);

      let type = "Video";
      if (/tiktok/i.test(videoURL)) type = "TikTok Video";
      if (/facebook|fb/i.test(videoURL)) type = "Facebook Video";
      if (/reel|short/i.test(videoURL)) type = "Reel / Short";

      const title = data.title || "Shared Video";

      const filePath = path.join(
        cacheDir,
        `autodl_${userID}_${Date.now()}.mp4`
      );

      /* ===== FETCH VIDEO ===== */
      const video = await axios.get(data.url, {
        responseType: "arraybuffer",
        timeout: 30000
      });

      const sizeMB = video.data.length / (1024 * 1024);
      if (sizeMB > 25) {
        api.sendTypingIndicator(event.threadID, false);
        return api.sendMessage(
          "❌ ভিডিওটি 25MB এর বেশি, পাঠানো সম্ভব নয়!",
          event.threadID
        );
      }

      fs.writeFileSync(filePath, video.data);
      api.setMessageReaction("📤", event.messageID, () => {}, true);

      /* ===== STATS ===== */
      const stats = fs.readJsonSync(statsPath);
      stats.total++;
      stats.users[userID] = (stats.users[userID] || 0) + 1;
      fs.writeJsonSync(statsPath, stats, { spaces: 2 });

      downloadedLinks.add(videoURL);
      if (downloadedLinks.size > MAX_LINK_CACHE) {
        downloadedLinks.delete(downloadedLinks.values().next().value);
      }

      const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
      api.sendTypingIndicator(event.threadID, false);

      /* ===== SEND MESSAGE ===== */
      api.sendMessage(
        {
          body:
`┏━━🎬 AUTO DOWNLOAD ━━┓
📌 Title : ${title}
🎞️ Source: ${type}

📦 Size  : ${sizeMB.toFixed(2)} MB
⏱️ Time  : ${timeTaken}s

👤 Your DL : ${stats.users[userID]}
📥 Total  : ${stats.total}

✅ Download Complete
┗━━━━━━━━━━━━━━━━━┛`,
          attachment: fs.createReadStream(filePath)
        },
        event.threadID,
        () => fs.unlinkSync(filePath),
        event.messageID
      );

      api.setMessageReaction("✅", event.messageID, () => {}, true);

    } catch (err) {
      console.error("[AUTO DL ERROR]", err);
      api.sendTypingIndicator(event.threadID, false);
      api.setMessageReaction("❌", event.messageID, () => {}, true);
      api.sendMessage(
        "⚠️ ভিডিও ডাউনলোড করা যায়নি! Public ভিডিও হলে আবার চেষ্টা করো।",
        event.threadID
      );
    }
  }
};
