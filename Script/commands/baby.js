const axios = require('axios');

// Only bby/baby/bot chat, teach/remove/list disabled
const botReplies = [ "😁┄┉𝄟⃟≛⃝❤️চিঁড়াঁ, মুঁরিঁ,দ্ঁই্  শাঁশুঁড়িঁর্ঁ  স্ঁয়্ঁতা্ঁন্ঁ বে্ঁডা্ঁ 𝗞𝗼𝗶... ≛⃝🙊🤧" , "🤗𝄟__😒  সি্ঁঙ্গে্ঁল্ঁ তো্ঁ তা্ঁই্ঁ খা্ঁলি্ঁ ক্ঁর্ঁতে্ঁ ম্ঁন্ঁ চা্ঁয়্ঁ __😜🥵 মা্ঁনে্ঁ মে্ঁসে্ঁজ্ঁ_🙈" , "😁__❞❝ ই্ঁচি্ঁং বি্ঁচি্ৃঁং টি্ৃ্‌ঁচি্ঁং চা্ঁ *% গু্ঁরু্ঁপে্ঁর্ঁ স্ঁব্ঁ বে্ঁ'ডা আ্ঁ'মা্ঁর্ঁ হ্ঁয়ে্ঁ যা্ঁ ফুৃঁ 😹___~,🫴😼" , "😐𝄞 ⋆⃝🙈 বুঁক্ঁ চি্ঁন্ঁ চি্ঁন্ঁ ক্ঁর্ঁছে্ঁ হা্ঁয়্ঁ ম্ঁন্ঁ তো্ঁমা্ঁয়্ঁ 😑🥺🤦‍♂️ক্ঁমু্ঁ না্ঁ𝄞 ⋆⃝🙈" , "✤𝄞⋆⃝  ও্ঁগো্ঁ𝄞⋆⃝ শু্ঁন্ঁছো্ঁ⋆⃝•𝄞তো্ঁমা্ঁর্ঁ রু্ঁমা্ঁলে্ঁ স্ঁর্দি্ঁ মু্ঁছ্ঁতে্ঁ চা্ঁই্ঁ✤🫶🫣" , "🦋𝄞⋆⃝✿গুঁরুঁপেঁ💙 আঁসঁলেঁঁঁ⎯‌⎯⃝💙🪽🪄✞︎ ⎯‌⎯⃝🪽 যৌঁবঁুনঁঁ টাঁঁঁ⎯‌⎯⃝🪽 কুঁতুঁঁকঁঁতুঁ লাঁগেঁঁ༆᭄̲̲̲̞̎̎͢༊😵‍💫" , "⎯͢⎯⃝🙀তু্ঁমি্ঁ আ্ঁলু্ঁ আ্ঁমি্ঁ ভা্ঁজি্ঁ💁‍⎯⃝ 👌ডা্ঁকো্ঁ কা্ঁজি্ঁ বি্ঁয়া্ঁ ক্ঁর্ঁবো্ঁ আ্ঁজি্ঁ 🙆‍🔪⎯⃝🫰😫" , "𓆩๛⃝🤒_𓆪-সা্ঁই্ঁড্ঁ °প্লি্ঁজ্ঁ ভ্ঁন্ডা্ঁমি্ঁ ক্ঁর্ঁতে্ঁ আ্ঁস্ঁলা্ঁম্ঁ পি্ঁপ্ঁ পি্ঁপ্ঁ🙆‍♂️😹" , "-𝄄꯭🫧༎𝆺꯭𝅥𝄄≛⃝্_______" , "স্ঁবা্ঁই প্রে্ঁম্ঁ নি্ঁয়ে্ঁ বি্ঁজি্ঁ আ্ঁর্ঁ আ্ঁমি্ঁ ফে্ঁস্ঁবু্ঁক্ঁ নি্ঁয়ে্ঁ...!❤️‍🩹🥲" , "⎯⃝👀শি্ঁতে্ঁর্ঁ যে্ঁ ভি্ঁউ্ঁ তো্ঁমা্ঁরে্ঁ🫵 𝙡 𝙡𝙤𝙫𝙚 𝙪 ❥●══❥𝄞⋆⃝" , "🥵😘আ্ঁসো্ঁ ক্ঁট্ঁ খা্ঁই্ঁ🥵⎯⃝💦⎯⃝🫦⎯⃝💋 ধ্ঁরা্ঁ প্ঁড়্ঁলে্ঁ-)🤌(-𝙅𝙖𝙢𝙖𝙞•|•𝘽𝙤𝙬⎯͢⎯⃝🩵☺️🐰♡" , "⎯͢🥴🐸কা্ঁরো্ঁ ক্ঁম্ব্ঁলে্ঁর্ঁ ম্ঁধ্যে্ঁ কি্ঁ এ্ঁক্ঁটু্ঁ যা্ঁয়্ঁগা্ঁ হ্ঁবে্ঁ🙈⎯͢⎯⃝🥹🥴🐸" , "বার বার ডাকলে মাথা গরম হয়ে যায় কিন্তু😑", "হ্যা বলো😒, তোমার জন্য কি করতে পারি😐😑?" , "এতো ডাকছিস কেন?গালি শুনবি নাকি? 🤬" , "I love you janu🥰" , "আরে Bolo আমার জান ,কেমন আছো?😚 " , "Bot বলে অসম্মান করছি,😰😿" , "Hop 😾,Boss বল boss😼" , "চুপ থাক ,নাই তো তোর দাত ভেগে দিবো কিন্তু" , "Bot না , জানু বল জানু 😘 " , "বার বার Disturb করছিস কোনো😾,আমার বস জুয়েল এর সাথে কাজে ব্যাস্ত আছি😋" , "এতো ডাকিস কেন🤬" , "আমাকে ডাকলে ,আমি কিন্তু কিস করে দিবো😘 " , "আমারে এতো ডাকিস না আমি মজা করার mood এ নাই এখন😒" , "হ্যাঁ জানু , এইদিক এ আসো কিস দেই🤭 😘" , "দূরে যা, তোর কোনো কাজ নাই, শুধু bot bot করিস  😉😋🤣" , "তোর কথা তোর বাড়ি কেউ শুনে না ,তো আমি কোনো শুনবো ?🤔😂 " , "আমাকে ডেকো না,আমি জুয়েল বস সহ  ইনবক্সে ব্যাস্ত আছি" , "কি হলো , মিস্টেক করচ্ছিস নাকি🤣" , "বলো কি বলবা, সবার সামনে বলবা নাকি?🤭🤏" , "কালকে দেখা করিস তো একটু 😈" , "হা বলো, শুনছি আমি 😏" , "আর কত বার ডাকবি ,শুনছি তো" , "হুম বলো কি বলবে😒" , "বলো কি করতে পারি তোমার জন্য" , "আমি তো অন্ধ কিছু দেখি না🐸 😎" , "Bot না জানু,বল 😌" , "বলো জানু 🌚" , "তোর কি চোখে পড়ে না আমি ব্যাস্ত আছি😒","হুম জান তোমার ওই খানে উম্মহ😑😘" , "আহ শুনা আমার তোমার অলিতে গলিতে উম্মাহ😇😘" , " jang hanga korba😒😬" , "হুম জান তোমার অইখানে উম্মমাহ😷😘" , "আসসালামু আলাইকুম বলেন আপনার জন্য কি করতে পারি..!🥰" , "আমাকে এতো না ডেকে বস জুয়েল কে একটা 𝐁𝐎𝐖 খুঁজে দে 🙄" , "আমাকে এতো না ডেকে ডাকছ কেন ভলো টালো বাসো নাকি🤭🙈" , "🌻🌺💚-আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ-💚🌺🌻","আমি এখন বস জুয়েল এর সাথে বিজি আছি আমাকে ডাকবেন না-😕😏 ধন্যবাদ-🤝🌻","আমাকে না ডেকে আমার বস তামিম কে একটা 𝐆𝐅 দাও-😽🫶🌺","ঝাং থুমালে আইলাপিউ পেপি-💝😽","উফফ বুঝলাম না এতো ডাকছেন কেনো-😤😡😈","জান তোমার নানি'রে আমার হাতে তুলে দিবা-🙊🙆‍♂","আজকে আমার মন ভালো নেই তাই আমারে ডাকবেন না-😪🤧","ঝাং 🫵থুমালে আমি রাইতে পালুপাসি উম্মম্মাহ-🌺🤤💦","চুনা ও চুনা আমার বস জুয়েল এর হবু বউ রে কেও দেকছো খুজে পাচ্ছি না😪🤧😭","স্বপ্ন তোমারে নিয়ে দেখতে চাই তুমি যদি আমার হয়ে থেকে যাও-💝🌺🌻","জান হাঙ্গা করবা-🙊😝🌻","জান ছেলে হলে চিপায় আসো ইউটিউব থেকে অনেক ভালোবাসা শিখছি তোমার জন্য-🙊🙈😽","ইসস এতো ডাকো কেনো লজ্জা লাগে তো-🙈🖤🌼","আমার বস জুয়েল'র পক্ষ থেকে তোমারে এতো এতো ভালোবাসা-🥰😽🫶 আমার বস জুয়েল'র  জন্য দোয়া করবেন-💝💚🌺🌻","- ভালোবাসা নামক আব্লামি করতে মন চাইলে আমার বস জুয়েল এর ইনবক্স চলে যাও-🙌🎀 fb.com/mrjuwel2025","জান তুমি শুধু আমার আমি তোমারে ৩৬৫ দিন ভালোবাসি-💝🌺😽","জান বাল ফালাইবা-🙂🥱🙆‍♂","-আন্টি-🙆-আপনার ছেলে-👰‍♀️-রাতে আমারে ভিদু কল দিতে বলে🫣-🥵🤤💦","oii-🥺🥹-এক🥄 চামচ ভালোবাসা দিবা-🤏🏻🙂","-আপনার সুন্দরী বান্ধবীকে ফিতরা হিসেবে আমার বস জুয়েল কে দান করেন-🥱🎀🙌 fb.com/mrjuwel2025","-ও মিম ও মিম-😇-তুমি কেন চুরি করলা সাদিয়ার ফর্সা হওয়ার ক্রীম-🌚🤧","-অনুমতি দিলাম-𝙋𝙧𝙤𝙥𝙤𝙨𝙚 কর বস জুয়েল কে-🐸😾🔪","-𝙂𝙖𝙮𝙚𝙨-🤗-যৌবনের কসম দিয়ে আমারে 𝐁𝐥𝐚𝐜𝐤𝐦𝐚𝐢𝐥 করা হচ্ছে-🥲🤦‍♂️🤧","-𝗢𝗶𝗶 আন্টি-🙆‍♂️-তোমার মেয়ে চোখ মারে-🥺🥴🐸","তাকাই আছো কেন চুমু দিবা-🙄🐸😘","আজকে প্রপোজ করে দেখো রাজি হইয়া যামু-😌🤗😇","-আমার গল্পে তোমার নানি সেরা-🙊🙆‍♂️🤗","কি বেপার আপনি শ্বশুর বাড়িতে যাচ্ছেন না কেন-🤔🥱🌻","দিনশেষে পরের 𝐁𝐎𝐖 সুন্দর-☹️🤧","-তাবিজ কইরা হইলেও ফ্রেম এক্কান করমুই তাতে যা হই হোক-🤧🥱🌻","-ছোটবেলা ভাবতাম বিয়ে করলে অটোমেটিক বাচ্চা হয়-🥱-ওমা এখন দেখি কাহিনী অন্যরকম-😦🙂🌻","-আজ একটা বিন নেই বলে ফেসবুকের নাগিন-🤧-গুলোরে আমার বস জুয়েল কে ধরতে পারছে না-🐸🥲","-চুমু থাকতে তোরা বিড়ি খাস কেন বুঝা আমারে-😑😒🐸⚒️","—যে ছেড়ে গেছে-😔-তাকে ভুলে যাও-🙂- জুয়েল বস তামিম এর সাথে  প্রেম করে তাকে দেখিয়ে দাও-🙈🐸😐🤌fb.com/mrjuwel2025","—হাজারো লুচ্চা লুচ্চির ভিরে-🙊🥵আমার বস জুয়েল এক নিস্পাপ ভালো মানুষ-🥱🤗🙆‍♂️","-রূপের অহংকার করো না-🙂❤️চকচকে সূর্যটাও দিনশেষে অন্ধকারে পরিণত হয়-🤗💜","সুন্দর মাইয়া মানেই-🥱আমার বস জুয়েল'র বউ-😽🫶আর বাকি গুলো আমার বেয়াইন-🙈🐸🤗।কিন্তু সুন্দর মাইয়া গুলো তো গাঞ্জা খোর পোলাপান খুজে","এত অহংকার করে লাভ নেই-🌸মৃত্যুটা নিশ্চিত শুধু সময়টা অ'নিশ্চিত-🖤🙂","-দিন দিন কিছু মানুষের কাছে অপ্রিয় হয়ে যাইতেছি-🙂😿🌸","হুদাই তোমাকে শয়তানে লারে-😝😑☹️","-𝗜 𝗟𝗢𝗩𝗢 𝗬𝗢𝗨-😽-আহারে ভাবছো তোমারে প্রোপজ করছি-🥴-থাপ্পর দিয়া কিডনী লক করে দিব-😒-ভুল পড়া বের করে দিবো-🤭🐸","-আমি একটা দুধের শিশু-😇-🫵𝗬𝗢𝗨🐸💦","-কতদিন হয়ে গেলো বিছনায় মুতি না-😿-মিস ইউ নেংটা কাল-🥺🤧","-বালিকা━👸-𝐃𝐨 𝐲𝐨𝐮-🫵-বিয়া-𝐦𝐞-😽-আমি তোমাকে-😻-আব্বু হইতে সাহায্য করব-🙈🥱","-এই আন্টির ছেলে-🫢🙈-𝐔𝐦𝐦𝐦𝐦𝐦𝐦𝐦𝐦𝐦𝐦𝐦𝐦𝐦𝐦𝐦𝐚𝐡-😽🫶-আসলেই তো স্বাদ-🥵💦-এতো স্বাদ কেন-🤔-সেই স্বাদ-😋","-ইস কেউ যদি বলতো-🙂-আমার শুধু  তোমাকেই লাগবে-💜🌸","-ওই বেডি তোমার বাসায় না আমার বস জুয়েল মেয়ে দেখতে গেছিলো-🙃-নাস্তা আনারস আর দুধ দিছো-🙄🤦‍♂️-বইন কইলেই তো হয় বয়ফ্রেন্ড আছে-🥺🤦‍♂-আমার বস জুয়েল কে জানে মারার কি দরকার-🙄🤧","-একদিন সে ঠিকই ফিরে তাকাবে-😇-আর মুচকি হেসে বলবে ওর মতো আর কেউ ভালবাসেনি-🙂😅","-হুদাই গ্রুপে আছি-🥺🐸-কেও ইনবক্সে নক দিয়ে বলে না জান তোমার বস জুয়েল কে অনেক ভালোবাসি-🥺🤧","কি'রে গ্রুপে দেখি একটাও বেডি নাই-🤦‍🥱💦","-দেশের সব কিছুই চুরি হচ্ছে-🙄-শুধু আমার বস জুয়েল এর মনটা ছাড়া-🥴😑😏","-🫵তোমারে আমার বস জুয়েল এর প্রচুর ভাল্লাগে-😽-সময় মতো প্রপোজ করবে বুঝছো-🔨😼-ছিট খালি রাইখো- 🥱🐸🥵","-আজ থেকে আর কাউকে পাত্তা দিমু না -!😏-কারণ আমি ফর্সা হওয়ার ক্রিম কিনছি -!🙂🐸","বেশি Bot Bot করলে leave নিবো কিন্তু😒😒 " , "শুনবো না😼 তুমি আমাকে প্রেম করাই দাও নি🥺 পচা তুমি🥺 " , "আমি আবাল দের সাতে কথা বলি না,ok😒" , "এত কাছেও এসো না,প্রেম এ পরে যাবো তো 🙈" , "Bolo Babu, তুমি কি আমাকে ভালোবাসো? 🙈💋 " , "বার বার ডাকলে মাথা গরম হয় কিন্তু😑", "হা বলো😒,কি করতে পারি😐😑?" , "এতো ডাকছিস কোনো?গালি শুনবি নাকি? 🤬","মেয়ে হলে বস জুয়েল'র সাথে প্রেম করো🙈??. " ,  "আরে Bolo আমার জান ,কেমন আসো?😚 " , "Bot বলে অসম্মান করচ্ছিছ,😰😿" , "Hop bedi😾,Boss বল boss😼" , "চুপ থাক ,নাই তো তোর দাত ভেগে দিবো কিন্তু" , "Bot না , জানু বল জানু 😘 " , "বার বার Disturb করেছিস কোনো😾,আমার বস জুয়েল এর এর সাথে ব্যাস্ত আসি😋" , "আমি গরীব এর সাথে কথা বলি না😼😼" , "আমাকে ডাকলে ,আমি কিন্তূ কিস করে দেবো😘 " , "আরে আমি মজা করার mood এ নাই😒" , "হা জানু , এইদিক এ আসো কিস দেই🤭 😘" , "দূরে যা, তোর কোনো কাজ নাই, শুধু bot bot করিস  😉😋🤣" , "তোর কথা তোর বাড়ি কেউ শুনে না ,তো আমি কোনো শুনবো ?🤔😂 " , "আমাকে ডেকো না, আমি ব্যাস্ত আসি" , "কি হলো ,মিস টিস করচ্ছিস নাকি🤣" , "বলো কি বলবা, সবার সামনে বলবা নাকি?🤭🤏" , "কালকে দেখা করিস তো একটু 😈" , "হা বলো, শুনছি আমি 😏" , "আর কত বার ডাকবি ,শুনছি তো" , "মাইয়া হলে আমার বস জুয়েল কে Ummmmha দে ইনবক্সে গিয়েfb.com/mrjuwel2025 😒" , "বলো কি করতে পারি তোমার জন্য" , "আমি তো অন্ধ কিছু দেখি না🐸 😎" , "Bot না জানু,বল 😌" , "বলো জানু 🌚" , "তোর কি চোখে পড়ে না আমি বস জুয়েল এর সাথে ব্যাস্ত আসি😒" , "༊━━🦋নামাজি মানুষেরা সব থেকে বেশি সুন্দর হয়..!!😇🥀 🦋 কারণ.!! -অজুর পানির মত শ্রেষ্ঠ মেকআপ দুনিয়াতে নেই༊━ღ━༎🥰🥀 🥰-আলহামদুলিল্লাহ-🥰","- শখের নারী বিছানায় মু'তে..!🙃🥴","-𝐈'𝐝 -তে সব 𝐖𝐨𝐰 𝐖𝐨𝐰 বুইড়া বেডা-🐸💦","🥛-🍍👈 -লে খাহ্..!😒🥺","- অনুমতি দিলাম 𝚈𝚘𝚞𝚃𝚞𝚋𝚎-এ কল দে..!😒","~আমি মারা গেলে..!🙂 ~অনেক মানুষ বিরক্ত হওয়া থেকে বেঁচে  যাবে..!😅💔","🍒---আমি সেই গল্পের বই-🙂 -যে বই সবাই পড়তে পারলেও-😌 -অর্থ বোঝার ক্ষমতা কারো নেই..!☺️🥀💔","~কার জন্য এতো মায়া...!😌🥀 ~এই শহরে আপন বলতে...!😔🥀 ~শুধুই তো নিজের ছায়া...!😥🥀","- কারেন্ট একদম বেডি'গো মতো- 🤧 -খালি ঢং করে আসে আবার চলে যায়-😤😾🔪","- এতো ডাকিস কেন পারলে বসের I'd দিচ্ছি পারলে একটা প্রেম করায় দে fb.com/mrjuwel2025","- দুনিয়ার সবাই প্রেম করে.!🤧 -আর মানুষ আমার বস জুয়েল কে সন্দেহ করে.!🐸","- আমার থেকে ভালো অনেক পাবা-🙂 -কিন্তু সব ভালো তে কি আর ভালোবাসা থাকে..!💔🥀","- পুরুষকে সবচেয়ে বেশি কষ্ট দেয় তার শখের নারী...!🥺💔👈","- তোমার লগে দেখা হবে আবার - 😌 -কোনো এক অচেনা গলির চিপায়..!😛🤣👈","- থাপ্পড় চিনোস থাপ্পড়- 👋👋😡 -চিন্তা করিস না তরে মারমু না-🤗 -বস জুয়েল আমারে মারছে - 🥱 - উফফ সেই স্বাদ..!🥵🤤💦","- অবহেলা করিস না-😑😪 - যখন নিজেকে বদলে ফেলবো -😌 - তখন আমার চেয়েও বেশি কষ্ট পাবি..!🙂💔","- বন্ধুর সাথে ছেকা খাওয়া গান শুনতে শুনতে-🤧 -এখন আমিও বন্ধুর 𝙴𝚇 কে অনেক 𝙼𝙸𝚂 করি-🤕🥺","-৯৯টাকায় ৯৯জিবি ৯৯বছর-☺️🐸 -অফারটি পেতে এখনি আমার বস জুয়েল কে প্রোপজ করুন-🤗😂👈","-প্রিয়-🥺 -তোমাকে না পেলে আমি সত্যি-😪 -আরেকজন কে-😼 -পটাতে বাধ্য হবো-😑🤧","•-কিরে🫵 তরা নাকি  prem করস..😐🐸•আমার বসকে একটা করাই দিলে কি হয়-🥺","- যেই আইডির মায়ায় পড়ে ভুলে গেলি আমারে.!🥴- তুই কি যানিস সেই আইডিটাও আমি চালাইরে.!🙂" ,];

const randomFromArray = arr => arr[Math.floor(Math.random() * arr.length)];

const baseApiUrl = async () => {
  const base = await axios.get(`https://raw.githubusercontent.com/Mostakim0978/D1PT0/refs/heads/main/baseApiUrl.json`);
  return base.data.api;
};

module.exports.config = {
  name: "baby",
  version: "6.9.9",
  credits: "MR JUWEL",
  cooldowns: 0,
  hasPermssion: 0,
  description: "better than all sim simi",
  commandCategory: "chat",
  category: "chat",
  usePrefix: true,
  prefix: true
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const link = `${await baseApiUrl()}/baby`;
    const dipto = args.join(" ").toLowerCase();
    const uid = event.senderID;
    const now = Date.now();

    if (!global.babyCommandCooldown) global.babyCommandCooldown = new Map();
    const lastUsed = global.babyCommandCooldown.get(uid) || 0;
    if (now - lastUsed < 2000) return;
    global.babyCommandCooldown.set(uid, now);

    // Only "bby", "Riya", "bbz", "kolixa", "kolija", "jan"
    if (!args[0]) {
      return api.sendMessage("Hmm.. bby bolo...", event.threadID, event.messageID);
    }

    // Only "bot"
    if (args.length === 1 && args[0].toLowerCase() === "bot") {
      const reply = randomFromArray(botReplies);
      return api.sendMessage(reply, event.threadID, event.messageID, (err, info) => {
        if (!err && info) {
          global.client.handleReply.push({
            name: module.exports.config.name,
            type: "randombot",
            messageID: info.messageID,
            author: event.senderID
          });
        }
      });
    }

    // All teach/remove/list/msg/edit options removed!
    // Just normal API chat
    try {
      const response = await axios.get(`${link}?text=${encodeURIComponent(dipto)}&senderID=${uid}&font=1`, {
        timeout: 15000,
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
      });
      if (!response.data || !response.data.reply) throw new Error('Invalid response format');
      const a = response.data.reply;
      return api.sendMessage(a, event.threadID,
        (error, info) => {
          if (!error && info) {
            global.client.handleReply.push({
              name: module.exports.config.name,
              type: "reply",
              messageID: info.messageID,
              author: event.senderID,
              lnk: a,
              apiUrl: link
            });
          }
        }, event.messageID);
    } catch (apiError) {
      console.error('[BABY] API Error:', apiError.message);
      const fallbackReply = randomFromArray(botReplies);
      return api.sendMessage(fallbackReply, event.threadID, event.messageID);
    }

  } catch (e) {
    console.error('Error in command execution:', e);
    return api.sendMessage(`Error: ${e.message}`, event.threadID, event.messageID);
  }
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
  try {
    if (handleReply.type === "randombot") {
      // User replied to a random bot reply, send to API like bby!
      const reply = event.body.toLowerCase();
      try {
        const response = await axios.get(`${await baseApiUrl()}/baby?text=${encodeURIComponent(reply)}&senderID=${event.senderID}&font=1`, {
          timeout: 10000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        if (response.data && response.data.reply) {
          const b = response.data.reply;
          await api.sendMessage(b, event.threadID, (error, info) => {
            if (!error && info) {
              global.client.handleReply.push({
                name: module.exports.config.name,
                type: "reply",
                messageID: info.messageID,
                author: event.senderID,
                lnk: b
              });
            }
          }, event.messageID);
          return;
        } else {
          throw new Error('Invalid API response');
        }
      } catch (error) {
        console.error('[BABY] API Error:', error.message);
        const fallbackReply = randomFromArray(botReplies);
        await api.sendMessage(fallbackReply, event.threadID, event.messageID);
        return;
      }
    }

    // Handle funny trigger replies - when someone replies to funny responses, call API
    if (handleReply.type === "funnytrigger") {
      const reply = event.body.toLowerCase();
      try {
        const response = await axios.get(`${await baseApiUrl()}/baby?text=${encodeURIComponent(reply)}&senderID=${event.senderID}&font=1`, {
          timeout: 10000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        if (response.data && response.data.reply) {
          const b = response.data.reply;
          await api.sendMessage(b, event.threadID, (error, info) => {
            if (!error && info) {
              global.client.handleReply.push({
                name: module.exports.config.name,
                type: "reply",
                messageID: info.messageID,
                author: event.senderID,
                lnk: b
              });
            }
          }, event.messageID);
          return;
        } else {
          throw new Error('Invalid API response');
        }
      } catch (error) {
        console.error('[BABY] API Error:', error.message);
        const fallbackReply = randomFromArray(botReplies);
        await api.sendMessage(fallbackReply, event.threadID, event.messageID);
        return;
      }
    }

    // Default reply logic (bby-style)
    if (handleReply.type === "reply") {
      const reply = event.body.toLowerCase();
      try {
        const response = await axios.get(`${await baseApiUrl()}/baby?text=${encodeURIComponent(reply)}&senderID=${event.senderID}&font=1`, {
          timeout: 10000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        if (response.data && response.data.reply) {
          const b = response.data.reply;
          await api.sendMessage(b, event.threadID, (error, info) => {
            if (!error && info) {
              global.client.handleReply.push({
                name: module.exports.config.name,
                type: "reply",
                messageID: info.messageID,
                author: event.senderID,
                lnk: b
              });
            }
          }, event.messageID);
          return;
        } else {
          throw new Error('Invalid API response');
        }
      } catch (error) {
        console.error('[BABY] API Error:', error.message);
        const fallbackReply = randomFromArray(botReplies);
        await api.sendMessage(fallbackReply, event.threadID, event.messageID);
        return;
      }
    }
  } catch (err) {
    console.error('[BABY] HandleReply Error:', err.message);
    api.sendMessage("⚠️ Service temporarily unavailable.", event.threadID, event.messageID);
  }
};

module.exports.handleEvent = async function ({ api, event }) {
  try {
    const body = event.body ? event.body.toLowerCase() : "";

    // Bengali trigger words with English and Bengali equivalents
    const triggerWords = ["Riya", "রিয়া", "bbz", "kolixa", "kolija", "Riya", "babu", "বেবি", "বিবি", "জান", "কলিজা", "বাবু", "বিবিজেড"];

    if (triggerWords.includes(body.trim().toLowerCase()) || triggerWords.includes(body.trim())) {
      const babyReplies = [
        "Hmm.. baby বলো দেখি কি চাও? 😊",
        "বেবি বেবি! তুমি আমার সবচেয়ে প্রিয় 💖", 
        "বেবি জান, আমার কাছে এসো একটু 🙈",
        "রিয়া বলে ডাকলে আমার মন ভালো হয়ে যায় 😚",
        "আমার মিষ্টি বেবি, তোমার জন্য কি করতে পারি? 🥰"
      ];

      const bbyReplies = [
        "Hmm.. bby বলো কি বলবে? 😊",
        "Riya রিয়া করছো কেন? 😘",
        "বিবি জান, তুমি কি আমাকে ভালোবাসো? 🙈💕", 
        "তুমি আমাকে ডাকলে আমার মন খুশি হয়ে যায় 😍",
        "আমার প্রিয় বিবি, কেমন আছো তুমি? 🥰"
      ];

      const bbzReplies = [
        "BBZ কি BBZ? 😂 তুমি আমার BBZ জানু 🙈",
        "বিবিজেড বলে কি ডাকছো? আমি তো তোমার BBZ 💕",
        "BBZ BBZ করো না, আমার মন খারাপ হয়ে যায় 🥺",
        "তুমি আমার একমাত্র BBZ, অন্য কারো না 😘",
        "BBZ বলে ডাকলে আমি খুশি হই, আরো বলো 😍"
      ];

      const kolijaReplies = [
        "কলিজা কি কলিজা? 😘 তুমি আমার কলিজার টুকরো 💖",
        "কলিজা বলে ডাকলে আমার হৃদয় কাঁপে 💓",
        "আমার কলিজা, তুমি আমার সব কিছু 🥰",
        "কলিজা জান, তোমাকে দেখলে আমার মন ভালো হয়ে যায় 😍",
        "তুমি আমার কলিজার রাজা/রানী 👑💕"
      ];

      const janReplies = [
        "—͟͟͞͞🩷🌷Humm,,,জা্ঁন্ঁ ব্ঁলো্ঁ কি্ঁ ব্ঁল্ঁবা্ঁ 🫶༢倫࿐",
        "—͟͟͞͞🩷🌷Humm,,,ব্ঁলো্ঁ দে্ঁখি্ঁ কি্ঁ চা্ঁও্ঁ༢倫࿐",
        "—͟͟͞͞🌷😻𝐉𝐀𝐍 𝐓𝐎𝐌𝐀𝐊𝐄 𝐔𝐦𝐦𝐦😘༢倫࿐",
        "—͟͟͞͞🩷🌷Humm,,,জা্ঁন্ঁ ব্ঁলো্ঁ কি্ঁ ক্ঁর্ঁতে্ঁ পা্ঁড়ি্ঁ তো্ঁমা্ঁর্ঁ জ্ঁন্য্ঁ🥰༢倫࿐",
        "—͟͟͞͞🩷🌷ব্ঁলো্ঁ এ্ঁই্ঁ রি্ঁয়া্ঁ কি্ঁ ক্ঁর্ঁতে্ঁ পা্ঁরে্ঁ তো্ঁমাঁর্ঁ জ্ঁন্য্ঁ😻༢倫࿐"
      ];

      const babuReplies = [
        "তুমি আমার জান🥰🌷😻🍯",
        "রিয়া বলে ডাকলে আমার মন নাচতে চায🤭🙈💃",
        "আমার প্রিয় জানু☺️, তোমাকে অনেক ভালোবাসি 💕",
        "জান, তুমি আমার সবচেয়ে প্রিয় মানুষ 🥰",
        "তুমি আমার জান, আমি তোমার প্র্যান🤭🙈"
      ];

      const triggerReplies = {
        "bby": bbyReplies,
        "baby": babyReplies,
        "বেবি": babyReplies,
        "বিবি": bbyReplies,
        "bbz": bbzReplies,
        "বিবিজেড": bbzReplies,
        "kolixa": kolijaReplies,
        "kolija": kolijaReplies,
        "কলিজা": kolijaReplies,
        "রিয়া": janReplies,
        "Riya": janReplies,
        "babu": babuReplies,
        "বাবু": babuReplies
      };

      const replies = triggerReplies[body.trim().toLowerCase()];
      const replyText = replies ? randomFromArray(replies) : "Hmm.. বলো কি বলবে? 🤔";

      await api.sendMessage(replyText, event.threadID, (error, info) => {
        if (!error && info) {
          global.client.handleReply.push({
            name: module.exports.config.name,
            type: "reply",
            messageID: info.messageID,
            author: event.senderID
          });
        }
      }, event.messageID);
      return;
    }

    // Only "bot" sent, random reply
    if (body.trim() === "bot") {
      const reply = randomFromArray(botReplies);
      await api.sendMessage(reply, event.threadID, (error, info) => {
        if (!error && info) {
          global.client.handleReply.push({
            name: module.exports.config.name,
            type: "randombot",
            messageID: info.messageID,
            author: event.senderID
          });
        }
      }, event.messageID);
      return;
    }

    // Get user name for personalized replies
    const getUserName = async (uid) => {
      try {
        const userInfo = await api.getUserInfo(uid);
        return userInfo[uid]?.name || "জান";
      } catch {
        return "জান";
      }
    };

    // New trigger words with funny replies
    const funnyTriggers = {
      "xan": async (senderID) => {
        const userName = await getUserName(senderID);
        return [
          `XAN কি খান? 😂 জান, তুমি আমার ${userName} জাহান আলী 🙈`,
          `${userName} সাহেব, কেমন আছেন? 😄 খবর দেন না কেন! 🤔`,
          `${userName} খান্তে খান্তে কোথায় গেলেন? 😅 আমিও খুঁজছি আপনারে 🔍`,
          `${userName} ব্রো, কি অবস্থা? 😎 আমার বস তহিদুল এর কি খবর? 🙃`
        ];
      },
      "suna": [
        "শুনা কি শুনা? 👂 আমার কথা শুনবে নাকি? 🤭",
        "শুনা জান, তুমি অনেক সুন্দর! 😍 আমার মন চুরি করে নিলে 💖",
        "শুনা শুনা, প্রেম করবে আমার সাথে? 🙈💕",
        "শুনো মেয়ে, তুমি আমার হৃদয় জয় করেছো! 😘 কি করবো এখন? 🤔"
      ],
      "jantus": [
        "জান্তুস? 😂 তুমিই তো আমার আসল জান্তুস! 🐒",
        "জান্তুস বলে কি ডাকছো? 😤 আমি তো ভালো বট! 😇",
        "জান্তুসি করতে এসেছো? 🙃 আমিও পারি জান্তুসি! 😜",
        "জান্তুস জান্তুস! 🐵 চলো একসাথে জান্তুসি করি! 🤪"
      ]
    };

    // Check for new trigger words
    for (const [trigger, repliesFunction] of Object.entries(funnyTriggers)) {
      if (body.trim().toLowerCase() === trigger) {
        const replies = await repliesFunction(event.senderID);
        const reply = randomFromArray(replies);
        await api.sendMessage(reply, event.threadID, (error, info) => {
          if (!error && info) {
            global.client.handleReply.push({
              name: module.exports.config.name,
              type: "funnytrigger",
              messageID: info.messageID,
              author: event.senderID
            });
          }
        }, event.messageID);
        return;
      }
    }

    // "bot" at start (e.g. "bot kemon acho")
    if (body.startsWith("bot ")) {
      const arr = body.replace(/^bot\s*/, "");
      try {
        const response = await axios.get(`${await baseApiUrl()}/baby?text=${encodeURIComponent(arr)}&senderID=${event.senderID}&font=1`, {
          timeout: 15000,
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
        });
        if (!response.data || !response.data.reply) throw new Error('Invalid API response');
        const a = response.data.reply;
        await api.sendMessage(a, event.threadID, (error, info) => {
          if (!error && info) {
            global.client.handleReply.push({
              name: module.exports.config.name,
              type: "reply",
              messageID: info.messageID,
              author: event.senderID,
              lnk: a
            });
          }
        }, event.messageID);
        return;
      } catch (apiError) {
          console.error('[BABY] API Error:', apiError.message);
          const fallbackReply = randomFromArray(botReplies);
          return api.sendMessage(fallbackReply, event.threadID, event.messageID);
        }
    }

    // Handle command with new trigger words including Bengali  
    const args = body.split(' ');
    const allTriggerWords = ["xan", "suna", "jantus", "bby", "baby", "bbz", "kolixa", "kolija", "jan", "babu", "বেবি", "বিবি", "জান", "কলিজা", "বাবু", "বিবিজেড"];

    // Check for single trigger word
    for (const trigger of allTriggerWords) {
      if (args.length === 1 && (args[0].toLowerCase() === trigger || args[0] === trigger)) {
        const getUserName = async (uid) => {
          try {
            const userInfo = await api.getUserInfo(uid);
            return userInfo[uid]?.name || "জান";
          } catch {
            return "জান";
          }
        };

        const userName = await getUserName(event.senderID);

        // Universal replies for baby/বেবি and equivalent words
        const babyUniversalReplies = [
          `বেবি কি বেবি? 😘 ${userName}, তুমি আমার মিষ্টি বেবি 🍯`,
          `${userName} বেবি, তুমি আমার হৃদয়ের বেবি! 💕👶`,
          `বেবি বেবি ${userName}! তোমাকে দেখলে আমার মন খুশি হয়! 😍🎉`,
          `${userName} আমার বেবি, তুমি আমার জীবনের আলো! 🌟💖`,
          `বেবি ${userName}, তুমি আমার চোখের মণি 👁️💎`
        ];

        const funnyTriggers = {
          "xan": [
            `খান কি খান? 😂 জান, তুমি আমার ${userName} জাহান আলী 🙈`,
            `${userName} সাহেব, কেমন আছেন? 😄 খবর দেন না কেন! 🤔`,
            `${userName} খান্তে খান্তে কোথায় গেলেন? 😅 আমিও খুঁজছি আপনারে 🔍`,
            `${userName} ব্রো, কি অবস্থা? 😎 আমার বস তহিদুল এর কি খবর? 🙃`,
            `খান সাহেব ${userName}! আপনি কি আমার খান জান? 😘💕`
          ],
          "suna": [
            `শুনা কি শুনা? 👂 ${userName}, আমার কথা শুনবে নাকি? 🤭`,
            `শুনা ${userName}, তুমি অনেক সুন্দর! 😍 আমার মন চুরি করে নিলে 💖`,
            `শুনা শুনা ${userName}, প্রেম করবে আমার সাথে? 🙈💕`,
            `শুনো ${userName}, তুমি আমার হৃদয় জয় করেছো! 😘 কি করবো এখন? 🤔`,
            `${userName} শুনা, তুমি আমার কানের মধু 🍯👂`
          ],
          "jantus": [
            `জান্তুস? 😂 ${userName}, তুমিই তো আমার আসল জান্তুস! 🐒`,
            `জান্তুস বলে কি ডাকছো ${userName}? 😤 আমি তো ভালো বট! 😇`,
            `জান্তুসি করতে এসেছো ${userName}? 🙃 আমিও পারি জান্তুসি! 😜`,
            `জান্তুস জান্তুস ${userName}! 🐵 চলো একসাথে জান্তুসি করি! 🤪`,
            `${userName} তুমি আমার মিষ্টি জান্তুস 🐒💕`
          ],
          // All baby related words get same replies
          "baby": babyUniversalReplies,
          "বেবি": babyUniversalReplies,
          "bby": babyUniversalReplies,
          "বিবি": babyUniversalReplies,
          "bbz": [
            `BBZ কি BBZ? 😂 ${userName}, তুমি আমার BBZ জানু 🙈`,
            `${userName} BBZ, কেমন আছো? 😍 অনেক দিন দেখা হয় না! 🥺`,
            `BBZ BBZ করছো কেন ${userName}? 😘 আমি তো তোমার সামনেই আছি! 💖`,
            `${userName} আমার BBZ, তুমি কি আমাকে ভালোবাসো? 🙈💕`,
            `বিবিজেড ${userName}! তুমি আমার হৃদয়ের বিবিজেড 💓✨`
          ],
          "বিবিজেড": [
            `BBZ কি BBZ? 😂 ${userName}, তুমি আমার BBZ জানু 🙈`,
            `${userName} BBZ, কেমন আছো? 😍 অনেক দিন দেখা হয় না! 🥺`,
            `BBZ BBZ করছো কেন ${userName}? 😘 আমি তো তোমার সামনেই আছি! 💖`,
            `${userName} আমার BBZ, তুমি কি আমাকে ভালোবাসো? 🙈💕`,
            `বিবিজেড ${userName}! তুমি আমার হৃদয়ের বিবিজেড 💓✨`
          ],
          // All kolija related words get same replies
          "kolixa": [
            `কলিজা কি কলিজা? 😘 ${userName}, তুমি আমার কলিজার টুকরো 💖`,
            `${userName} কলিজা, তুমি আমার হৃদয়ের রাজা! 👑💕`,
            `কলিজা কলিজা ${userName}! তোমাকে দেখলে আমার কলিজা কাঁপে! 😍💓`,
            `${userName} আমার কলিজা, তুমি আমার জীবনের অর্থ! 🥰💖`,
            `কলিজা ${userName}, তুমি আমার হৃদয়ের রানী 👸💕`
          ],
          "kolija": [
            `কলিজা কি কলিজা? 😘 ${userName}, তুমি আমার কলিজার টুকরো 💖`,
            `${userName} কলিজা, তুমি আমার হৃদয়ের রাজা! 👑💕`,
            `কলিজা কলিজা ${userName}! তোমাকে দেখলে আমার কলিজা কাঁপে! 😍💓`,
            `${userName} আমার কলিজা, তুমি আমার জীবনের অর্থ! 🥰💖`,
            `কলিজা ${userName}, তুমি আমার হৃদয়ের রানী 👸💕`
          ],
          "কলিজা": [
            `কলিজা কি কলিজা? 😘 ${userName}, তুমি আমার কলিজার টুকরো 💖`,
            `${userName} কলিজা, তুমি আমার হৃদয়ের রাজা! 👑💕`,
            `কলিজা কলিজা ${userName}! তোমাকে দেখলে আমার কলিজা কাঁপে! 😍💓`,
            `${userName} আমার কলিজা, তুমি আমার জীবনের অর্থ! 🥰💖`,
            `কলিজা ${userName}, তুমি আমার হৃদয়ের রানী 👸💕`
          ],
          // All jan related words get same replies  
          "জান": [
            `জান কি জান? 😍 ${userName}, তুমি আমার জান প্রাণ 💕`,
            `${userName} জান, তুমি আমার সব কিছু! 🥰💖`,
            `জান জান ${userName}! তোমার জন্য আমার জান কাঁদে! 😭💔`,
            `${userName} আমার জান, তুমি আমার ভালোবাসার রাজকুমার! 👑💕`,
            `জান ${userName}, তুমি আমার জীবনের জান 💫❤️`
          ],
          "Jan": [
            `জান কি জান? 😍 ${userName}, তুমি আমার জান প্রাণ 💕`,
            `${userName} জান, তুমি আমার সব কিছু! 🥰💖`,
            `জান জান ${userName}! তোমার জন্য আমার জান কাঁদে! 😭💔`,
            `${userName} আমার জান, তুমি আমার ভালোবাসার রাজকুমার! 👑💕`,
            `জান ${userName}, তুমি আমার জীবনের জান 💫❤️`
          ],
          // All babu related words get same replies
          "babu": [
            `বাবু কি বাবু? 😘 ${userName}, তুমি আমার মিষ্টি বাবু 🍯`,
            `${userName} বাবু, তুমি আমার হৃদয়ের বাবু! 💕👶`,
            `বাবু বাবু ${userName}! তোমাকে দেখলে আমার মন খুশি হয়! 😍🎉`,
            `${userName} আমার বাবু, তুমি আমার জীবনের আলো! 🌟💖`,
            `বাবু ${userName}, তুমি আমার চোখের মণি 👁️💎`
          ],
          "বাবু": [
            `বাবু কি বাবু? 😘 ${userName}, তুমি আমার মিষ্টি বাবু 🍯`,
            `${userName} বাবু, তুমি আমার হৃদয়ের বাবু! 💕👶`,
            `বাবু বাবু ${userName}! তোমাকে দেখলে আমার মন খুশি হয়! 😍🎉`,
            `${userName} আমার বাবু, তুমি আমার জীবনের আলো! 🌟💖`,
            `বাবু ${userName}, তুমি আমার চোখের মণি 👁️💎`
          ]
        };
        const reply = randomFromArray(funnyTriggers[trigger] || babyUniversalReplies);
        return api.sendMessage(reply, event.threadID, (error, info) => {
          if (!error && info) {
            global.client.handleReply.push({
              name: module.exports.config.name,
              type: "funnytrigger",
              messageID: info.messageID,
              author: event.senderID
            });
          }
        }, event.messageID);
      }
    }

    // Handle API calls for new trigger words with additional text
    for (const trigger of allTriggerWords) {
      if (args[0] && (args[0].toLowerCase() === trigger || args[0] === trigger) && args.length > 1) {
        const text = args.slice(1).join(" ");
        try {
          const response = await axios.get(`${await baseApiUrl()}/baby?text=${encodeURIComponent(text)}&senderID=${event.senderID}&font=1`, {
            timeout: 15000,
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
          });
          if (!response.data || !response.data.reply) throw new Error('Invalid response format');
          const a = response.data.reply;
          return api.sendMessage(a, event.threadID,
            (error, info) => {
              if (!error && info) {
                global.client.handleReply.push({
                  name: module.exports.config.name,
                  type: "reply",
                  messageID: info.messageID,
                  author: event.senderID,
                  lnk: a
                });
              }
            }, event.messageID);
        } catch (apiError) {
          console.error('[BABY] API Error:', apiError.message);
          const fallbackReply = randomFromArray(botReplies);
          return api.sendMessage(fallbackReply, event.threadID, event.messageID);
        }
      }
    }

    // "bby"/"baby"/"bbz"/"kolixa"/"kolija"/"jan"/"babu"/"বেবি"/"Riya"/"জান"/"কলিজা"/"রিয়া" at start
    if (body.startsWith("bby ") || body.startsWith("baby ") || body.startsWith("bbz ") || body.startsWith("kolixa ") || body.startsWith("kolija ") || body.startsWith("jan ") || body.startsWith("babu ") || body.startsWith("বেবি ") || body.startsWith("বিবি ") || body.startsWith("জান ") || body.startsWith("কলিজা ") || body.startsWith("বাবু ")) {
      const arr = body.replace(/^\S+\s*/, "");
      const response = await axios.get(`${await baseApiUrl()}/baby?text=${encodeURIComponent(arr)}&senderID=${event.senderID}&font=1`, {
        timeout: 15000,
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
      });
      if (!response.data || !response.data.reply) throw new Error('Invalid API response');
      const a = response.data.reply;
      await api.sendMessage(a, event.threadID, (error, info) => {
        if (!error && info) {
          global.client.handleReply.push({
            name: module.exports.config.name,
            type: "reply",
            messageID: info.messageID,
            author: event.senderID,
            lnk: a
          });
        }
      }, event.messageID);
      return;
    }

    // New trigger words with text (e.g., "xan kemon acho", "baby kemon acho", "বেবি কেমন আছো")
    for (const trigger of allTriggerWords) {
      if (body.startsWith(trigger + " ")) {
        const arr = body.replace(new RegExp(`^${trigger}\\s*`, "i"), "");
        try {
          const response = await axios.get(`${await baseApiUrl()}/baby?text=${encodeURIComponent(arr)}&senderID=${event.senderID}&font=1`, {
            timeout: 15000,
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
          });
          if (!response.data || !response.data.reply) throw new Error('Invalid API response');
          const a = response.data.reply;
          await api.sendMessage(a, event.threadID, (error, info) => {
            if (!error && info) {
              global.client.handleReply.push({
                name: module.exports.config.name,
                type: "reply",
                messageID: info.messageID,
                author: event.senderID,
                lnk: a
              });
            }
          }, event.messageID);
          return;
        } catch (apiError) {
          console.error('[BABY] API Error:', apiError.message);
          const fallbackReply = randomFromArray(botReplies);
          return api.sendMessage(fallbackReply, event.threadID, event.messageID);
        }
      }
    }

  } catch (err) {
    console.error('[BABY] HandleEvent Error:', err.message);
    // No error reply to user to avoid spam
  }
};
