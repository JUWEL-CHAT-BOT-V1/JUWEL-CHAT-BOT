const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
 config: {
  name: "autodl",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "MR JUWEL",
  description: "Auto video download (Fixed & Stylish)",
  commandCategory: "user",
  usages: "",
  cooldowns: 5,
 },

 run: async function () {},

 handleEvent: async function ({ api, event }) {
  try {
   const { alldown } = require("shaon-videos-downloader");

   const content = event.body ? event.body.trim() : "";
   if (!content.startsWith("http://") && !content.startsWith("https://")) return;

   // React loading
   api.setMessageReaction("⏳", event.messageID, () => {}, true);

   const data = await alldown(content);
   if (!data || !data.url) {
    return api.sendMessage("❌ Video download failed!", event.threadID, event.messageID);
   }

   const videoUrl = data.url;

   // Download video
   const res = await axios({
    url: videoUrl,
    method: "GET",
    responseType: "stream"
   });

   const filePath = __dirname + "/cache/auto.mp4";
   const writer = fs.createWriteStream(filePath);

   res.data.pipe(writer);

   writer.on("finish", () => {
    api.setMessageReaction("✅", event.messageID, () => {}, true);

    api.sendMessage({
     body: `🌟✨ 𝐌𝐑 🅙𝐔🅦𝐄🅛 ✨🌟

🚀 Auto Video Downloader 🚀

📥 Download Ready! 🎬
Enjoy the Video in HD!

🎀 Stay Tuned for More! 🎀`,
     attachment: fs.createReadStream(filePath)
    }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
   });

   writer.on("error", () => {
    api.sendMessage("❌ File write error!", event.threadID, event.messageID);
   });

  } catch (err) {
   console.error(err);
   api.sendMessage("❌ Something went wrong!", event.threadID, event.messageID);
  }
 }
};
