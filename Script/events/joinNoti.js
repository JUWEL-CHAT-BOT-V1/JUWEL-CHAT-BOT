module.exports.config = {
  name: "joinnoti",
  eventType: ["log:subscribe"],
  version: "2.0.0",
  credits: "MR JUWEL",
  description: "Advanced Welcome Notification",
  dependencies: {
    "fs-extra": "",
    "path": ""
  }
};

module.exports.onLoad = function () {
  const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
  const { join } = global.nodemodule["path"];

  const paths = [
    join(__dirname, "cache", "joinGif"),
    join(__dirname, "cache", "randomgif")
  ];

  for (const p of paths) {
    if (!existsSync(p)) mkdirSync(p, { recursive: true });
  }
};

module.exports.run = async function ({ api, event }) {
  const fs = require("fs-extra");
  const path = require("path");
  const moment = require("moment-timezone");

  const { threadID } = event;
  const botPrefix = global.config.PREFIX || "/";
  const botName = global.config.BOTNAME || "𝗦𝗵𝗮𝗵𝗮𝗱𝗮𝘁 𝗖𝗵𝗮𝘁 𝗕𝗼𝘁";

  const time = moment.tz("Asia/Dhaka").format("hh:mm A");
  const date = moment.tz("Asia/Dhaka").format("DD/MM/YYYY");

  /* ================= BOT JOIN ================= */
  if (event.logMessageData.addedParticipants.some(u => u.userFbId == api.getCurrentUserID())) {

    await api.changeNickname(
      `[ ${botPrefix} ] • ${botName}`,
      threadID,
      api.getCurrentUserID()
    );

    const botMsg = `
╔════════════════╗
  ⎯꯭𓆩꯭𝆺𝅥😻⃞𝐑⃞𝐈⃞𝐘⃞𝐀⃞༢࿐ 𝗔𝗖𝗧𝗜𝗩𝗘
╚════════════════╝
🎀চ্ঁলে্ঁ এ্ঁসে্ঁছে্ঁ⎯꯭𓆩꯭𝆺𝅥😻⃞𝐑⃞𝐈⃞𝐘⃞𝐀⃞༢࿐
এ্ঁখ্ঁন্ঁ তো্ঁমা্ঁদে্ঁর্ঁ সা্ঁথে্ঁ আ্ঁড্ডা্ঁ দি্ঁবো্ঁ
🔹 Prefix : ${botPrefix}
🔹 Commands : ${botPrefix}help
🕒 Time : ${time}
📅 Date : ${date}
👑 Admin : MR JUWEL
`;

    const mediaPath = path.join(__dirname, "cache", "randomgif");
    const files = fs.readdirSync(mediaPath).filter(f =>
      [".mp4", ".gif", ".jpg", ".png", ".jpeg"].some(e => f.endsWith(e))
    );

    const media = files.length
      ? fs.createReadStream(path.join(mediaPath, files[Math.floor(Math.random() * files.length)]))
      : null;

    return api.sendMessage(
      media ? { body: botMsg, attachment: media } : botMsg,
      threadID
    );
  }

  /* ================= USER JOIN ================= */
  try {
    const { threadName, participantIDs, adminIDs } = await api.getThreadInfo(threadID);
    const threadData = global.data.threadData.get(parseInt(threadID)) || {};

    let names = [];
    let mentions = [];

    for (const u of event.logMessageData.addedParticipants) {
      names.push(u.fullName);
      mentions.push({ tag: u.fullName, id: u.userFbId });
    }

    const memberCount = participantIDs.length;
    const adminMentions = adminIDs.map(a => ({ tag: "Admin", id: a.id }));

    let msg = threadData.customJoin || `
╭━━━━━━━━━━━━━━━╮
   🎉 𝗪𝗘𝗟𝗖𝗢𝗠𝗘 🎉
╰━━━━━━━━━━━━━━━╯
👤 Name : {name}
👥 Member No : {count}
🏡 Group : {thread}
🕒 Time : ${time}
📅 Date : ${date}
`;

    msg = msg
      .replace(/{name}/g, names.join(", "))
      .replace(/{count}/g, memberCount)
      .replace(/{thread}/g, threadName);

    const joinPath = path.join(__dirname, "cache", "joinGif");
    const mediaFiles = fs.readdirSync(joinPath).filter(f =>
      [".mp4", ".gif", ".jpg", ".png", ".jpeg"].some(e => f.endsWith(e))
    );

    const media = mediaFiles.length
      ? fs.createReadStream(path.join(joinPath, mediaFiles[Math.floor(Math.random() * mediaFiles.length)]))
      : null;

    return api.sendMessage(
      media
        ? { body: msg, attachment: media, mentions }
        : { body: msg, mentions },
      threadID
    );
  } catch (err) {
    console.error(err);
  }
};
