const fs = require('fs');
const path = __dirname + '/antigaliStatus.json';

let offenseTracker = {}; // threadID -> userID -> { count, uidSaved }
const badWords = [
  "fuck","fucking","motherfucker","mother fucker","abal","fucker",
  "Sawya","sawya","Voda","voda","Juwel ke chudi","MG","chdi",
  "tok fuck","tui magi","magi","Magi","mang","tok chudi","bokacoda","xodi","Abal choda","Bokacoda",
  "toke🖕🖕🖕","🖕🖕🖕","Pompom","pompom","Toke🖕","bollocks","bloodyhell",
  "xoda","chup magi","Tui magi","tui magi","tor heda","Tor heda","hada",
  "Chup magi","Head","Toke🖕🖕","🖕","🖕🖕","মাদারচোদ","চুদি","মাগি",
  "কার বাল","সাউয়া বেডি","নিছের বাল","চোকাচোদা","চুদবো","চুদানির পোলা",
  "মাং","মাংগের বেডি","মাংগের গুপ","সাউয়ার বট","ভোদা","তোর মার ভোদা","সাউয়ার কথা","বোকাচোদা বট","বট বোকাচোদা","সাউয়া","জুয়েল কে চুূদি","জুয়েল বোকাচোদা","তোর সাউয়া","তোর মায়ের সাউয়া","তোর বোনের সাউয়া","তোর সাউয়া মাগি","তোর সাউয়া","মাংগের বেডি","মাংগের গুপ","বালের গুপ",
  "গিটার বাজাও","জাও গিটার বাজাও","হাত মারবে","হাত মারবো","হাত মারো",
  "হাত মাড়ি","হাত মারতে জাবে","গিটার বাজাবো","পুটকি","রেন্ডির ছেলে",
  "রেন্ডি মেয়ে","রেন্ডি","এডমিন এর বাল","তুই মাগি","তোর চুদি","চোদার টাইম নাই","তোর মতো মাগি কে","তোর মতো মাগি","তোক চুূদি মাগি","তুই ১২ ভাতারী মাগি"," তুই হাত মাড়া মাগি","হাত মার","হাত মারো","হাত মাড়া মাগি","হাত মাড়া মাগি তুই"," তোর মা মাগি","তোর বোন মাগি","তোর মা মাগি বোকাচোদা","তোর বোন মাগি","বোকাচোদা","তোর মাকে চুদি মাদারচোদ","তোর মাকে চুদি","তোর মাকে আমি চুদি","তোর বোনকে আমি চুদি","তোর বোনকে চুদি","সাউয়ার গুপ","মাংগের গুপ",
  "আবাল নাকি","জুয়েল চোকাচোদা","বোকাচোদা জুয়েল","জুয়েল কে চুদি"
];

// সবসময় ON
let antiGaliStatus = true;

// 🔰 Bot Owner / Bot Admin UID list
const BOT_ADMINS = [
  "100071528325738", // তোমার UID
  // একাধিক UID চাইলে কমা দিয়ে
];

module.exports.config = {
  name: "antigali",
  version: "3.5.0",
  hasPermssion: 0,
  credits: "MR JUWEL",
  description: "বাংলা Anti-Gali সিস্টেম (Admin + Bot Admin Inbox Forward সহ)",
  commandCategory: "moderation",
  usages: "",
  cooldowns: 0
};

module.exports.handleEvent = async function ({ api, event, Threads }) {
  try {
    if (!antiGaliStatus || !event.body) return;

    const message = event.body.toLowerCase();
    const threadID = event.threadID;
    const userID = event.senderID;
    const botID = api.getCurrentUserID && api.getCurrentUserID();

    if (!offenseTracker[threadID]) offenseTracker[threadID] = {};
    if (!offenseTracker[threadID][userID])
      offenseTracker[threadID][userID] = { count: 0, uidSaved: userID };

    if (!badWords.some(word => message.includes(word))) return;

    let userData = offenseTracker[threadID][userID];
    userData.count += 1;
    const count = userData.count;

    // User Info
    let userInfo = {};
    try { userInfo = await api.getUserInfo(userID); } catch {}
    const userName = userInfo[userID]?.name || "অজানা ব্যবহারকারী";

    // Thread Info
    let threadInfo = {};
    try {
      if (Threads && typeof Threads.getData === "function") {
        const tdata = await Threads.getData(threadID);
        threadInfo = tdata.threadInfo || {};
      } else if (typeof api.getThreadInfo === "function") {
        threadInfo = await api.getThreadInfo(threadID) || {};
      }
    } catch {}

    const isAdminInThread = (uid) => {
      try {
        if (!threadInfo || !threadInfo.adminIDs) return false;
        return threadInfo.adminIDs.some(item => {
          if (typeof item === "string") return item == String(uid);
          if (item && item.id) return String(item.id) == String(uid);
          return false;
        });
      } catch {
        return false;
      }
    };

    /* ===============================
       🔔 ADMIN + BOT ADMIN INBOX FORWARD
    ================================= */
    const groupName = threadInfo.threadName || "Unknown Group";
    const alertMsg =
`🚨 Anti-Gali Alert

👥 গ্রুপ: ${groupName}
👤 ইউজার: ${userName}
🆔 UID: ${userID}
⚠️ Warning: ${count}

💬 মেসেজ:
"${event.body}"`;

// 🔹 Group Admins
    if (threadInfo && threadInfo.adminIDs) {
      for (const admin of threadInfo.adminIDs) {
        const adminID = typeof admin === "string" ? admin : admin.id;
        if (!adminID) continue;
        try {
          await api.sendMessage(alertMsg, adminID);
        } catch {}
      }
    }

// 🔹 Bot Admins / Owner
    for (const ownerID of BOT_ADMINS) {
      try {
        await api.sendMessage(alertMsg, ownerID);
      } catch {}
    }

    /* =============================== */

    // 🔰 বাংলা সতর্কবার্তা ফ্রেম
    const frameBase = (n, extra = '') => (
`╔════════════════════════════════════╗
🚫 সতর্কবার্তা #${n}
👤 ব্যবহারকারী: ${userName} (UID: ${userID})
⚠️ আপনার মেসেজে অশালীন শব্দ পাওয়া গেছে।
🔁 অপরাধের সংখ্যা: ${n} বার
${extra}
╚════════════════════════════════════╝`
    );

    if (count === 1) {
      await api.sendMessage(
        frameBase(1, 'দয়া করে এখনই মেসেজটি আনসেন্ড করুন!'),
        threadID,
        event.messageID
      );
    } else if (count === 2) {
      await api.sendMessage(
        frameBase(2, '⚠️ পরেরবার একই ভুল করলে আপনাকে রিমুভ করা হবে!'),
        threadID,
        event.messageID
      );
    }

    if (event.messageID) {
      setTimeout(() => {
        api.unsendMessage(event.messageID).catch(() => {});
      }, 60000);
    }

    if (count === 3) {
      const botIsAdmin = botID ? isAdminInThread(botID) : false;

      if (!botIsAdmin) {
        userData.count = 2;
        return api.sendMessage(
`╔════════════════════════════════════╗
⚠️ কাজটি বন্ধ করা হয়েছে
🤖 আমি (বট) অ্যাডমিন নই, তাই কাউকে রিমুভ করতে পারছি না।
👤 ব্যবহারকারী: ${userName} (UID: ${userID})
╚════════════════════════════════════╝`,
          threadID
        );
      }

      if (isAdminInThread(userID)) {
        userData.count = 2;
        return api.sendMessage(
`╔════════════════════════════════════╗
⚠️ কাজটি বন্ধ করা হয়েছে
এই ব্যবহারকারী একজন গ্রুপ অ্যাডমিন।
👤 ব্যবহারকারী: ${userName} (UID: ${userID})
╚════════════════════════════════════╝`,
          threadID
        );
      }

      try {
  await api.sendMessage(
`🚨 ব্যবহারকারী ${userName} (UID: ${userID})
বারবার অশালীন শব্দ ব্যবহারের কারণে গ্রুপ থেকে সরানো হয়েছে।`,
    threadID
  );

  await api.removeUserFromGroup(userID, threadID);
  userData.count = 0;

} catch {
        userData.count = 2;
        return api.sendMessage(
`⚠️ ${userName} (${userID})-কে কিক করতে ব্যর্থ।`,
          threadID
        );
      }
    }

  } catch (error) {
    console.error("AntiGali error:", error);
    api.sendMessage("⚠️ Anti-Gali সিস্টেমে একটি ত্রুটি ঘটেছে।", event.threadID);
  }
};

module.exports.run = async function () {};
