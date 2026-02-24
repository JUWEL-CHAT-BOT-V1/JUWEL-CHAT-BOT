module.exports.config = {
  name: "pp",
  version: "2.1.0",
  hasPermssion: 0,
  credits: "𝐌𝐑 𝐉𝐔𝐖𝐄𝐋",
  description: "No prefix profile picture",
  commandCategory: "noprefix",
  cooldowns: 0
};

const fs = require("fs-extra");
const request = require("request");
const path = require("path");

module.exports.run = async function ({ event, api, args, Users }) {
  const cachePath = path.join(__dirname, "cache");
  const imgPath = path.join(cachePath, "pp.png");

  if (!fs.existsSync(cachePath)) fs.mkdirSync(cachePath);

  let uid;

  // Reply
  if (event.type === "message_reply") {
    uid = event.messageReply.senderID;
  }
  // Mention
  else if (event.mentions && Object.keys(event.mentions).length > 0) {
    uid = Object.keys(event.mentions)[0];
  }
  // Facebook link
  else if (args[0] && args[0].includes(".com/")) {
    try {
      uid = await api.getUID(args[0]);
    } catch {
      return api.sendMessage("❌ Invalid Facebook link", event.threadID, event.messageID);
    }
  }
  // Own profile
  else {
    uid = event.senderID;
  }

  const name = await Users.getNameUser(uid);

  const bodyText =
`╭─❖🌸 PROFILE 🌸❖─╮
👤 নাম : ${name}
🆔 UID : ${uid}
╰───❖ 𝐉⃞𝐔⃞𝐖⃞𝐄⃞𝐋 ❖───╯`;

  const sendImg = () => {
    api.sendMessage(
      {
        body: bodyText,
        attachment: fs.createReadStream(imgPath)
      },
      event.threadID,
      () => fs.unlinkSync(imgPath),
      event.messageID
    );
  };

  request(
    `https://graph.facebook.com/${uid}/picture?height=1500&width=1500`
  )
    .pipe(fs.createWriteStream(imgPath))
    .on("close", sendImg);
};


/// 🔹 NOPREFIX HANDLE
module.exports.handleEvent = async function ({ event, api, Users }) {
  if (!event.body) return;

  if (event.body.trim().toLowerCase() === "pp") {
    return this.run({
      event,
      api,
      args: [],
      Users
    });
  }
};
