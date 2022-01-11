const discord = require("discord.js");
const client = new discord.Client();
const fs = require("fs");
const prefix = '!'
let connections = {};
let speak_chs = {};


client.on('ready', async () => {
    //This will get the amount of servers and then return it.
    const servers = await client.guilds.cache.size
    const users = await client.users.cache.size
    
    console.log(`Botは今 ${servers} 個のサーバーに入ってるよー`)

    client.user.setActivity(`!help | 導入数 ${servers} `, {
        type: 'PLAYING',
    })
})


.on("message", async message => {

    if (message.content == "!sporrt") {
        const embed = {
            embed: {
                title: "サポートサーバーです",
                description: "SupportServer",
                color: 0xffff00,
                fields: [{
                    name: "URL",
                    value: "https://discord.gg/Y6w5Jv3EAR",
                    inline: false,
                }],
            },
        };
        message.channel.send(embed);
    }




    if (message.content == "!help") {
        const embed = {
            "embed": {
                "title": "helpです",
                "description": "This is Help commands",
                "color": 0xffff12,
                "fields": [
                    {
                        "name": "!help",
                        "value": "今、表示しているやつです",
                        "inline": false
                    },
                    {
                        "name": "!in",
                        "value": "botのリンクを出します",
                        "inline": false
                    },
                    {
                        "name": "!ping",
                        "value": "ping値を出します",
                        " inline": false
                    },
                    {
                        "name": "!sporrt",
                        "value": "サポサバのURLを表示します",
                        "inline": false
                    },
                    {
                        "name": "!sp",
                        "value": "制作協力者の紹介です",
                        "inline": false
                    },
                    {
                        "name": "!gban",
                        "value": "グローバルチャットでのban申請のサイトURLがでます",
                        "inline": false
                    },
                    {
                        "name": "!c <消したい量の数> (管理者のみです)",
                        "value": "指定した数分のメッセージを削除できます",
                        "inline": false
                    },
                    {
                        "name": "!g-rule",
                        "value": "グローバルチャットの利用規約を出します",
                        "inline": false
                    },
                    {
                        "name": "!web",
                        "value": "このBOTのサイトを表記します",
                        "inline": false
                    },
                    {
                        "name": "!pi",
                        "value": "このBOTの運営を紹介します",
                        "inline": false
                    },
                    {
                        "name": "!donation",
                        "value": "BOT支援送金フォームです",
                        "inline": false
                    },
                    {
                        "name": "!user [ID]",
                        "value": "ユーザー情報を出せます",
                        "inline": false
                    },
                    {
                        "name": "グローバルチャット",
                        "value": "このチャンネルを作成するとグローバルチャットが使用できます",
                        "inline": false
                    },
                    {
                        "name": "!player [ID]",
                        "value": "Minecraftのユーザー情報を出せます",
                        "inline": false
                    },
                    {
                        "name": "!server [IP]",
                        "value": "MinecraftServer情報を出せます",
                        "inline": false
                    },
                    {
                        "name": "!uuis [MCID]",
                        "value": "MinecraftユーザーUUID情報を出せます",
                        "inline": false
                    },
                    {
                        "name": "!poll [タイトル] [投票1] [投票2] ● ● ●",
                        "value": "投票ができます",
                        "inline": false
                    },
                    {
                        "name": "!BAN メンション",
                        "value": "緊急でBANコマンドは無効化しています。 開発者募集中です！https://kuroneko6423.com/Application",
                        "inline": false
                    }]
            }
        }
        message.channel.send(embed);
    }




    if (message.content == "!ping") {
        message.channel.send(` Ping を確認しています...`).then((pingcheck) => {
            pingcheck.edit(
                `botの速度|${pingcheck.createdTimestamp - message.createdTimestamp} ms`
            )
        });
    }


    if (message.content.startsWith("!c")) {
        //コマンド
        if (!message.member.hasPermission("Administrator")) return message.channel.send("❌ 権限が不足しています。"); //権限がなかったら表示
        const args = message.content.split(" ").slice(1).join(""); //コマンド空白数字の数字の部分取得
        if (!args) return message.channel.send(
            "❌ エラー発生:空白がない または数字が書いていません"); //空白がないまたは数字がない場合表示
        const messages = await message.channel.messages.fetch({
            limit: args
        }); //していした数を削除
        message.channel.bulkDelete(messages);
    }


    if (message.content == "!g-rule") {
        const embed = {
            "embed": {
                "title": "グローバルチャット利用規約",
                "description": "グローバルチャットの利用を始めたときに利用規約同意したものとみなします。",
                "color": 0xffff00,
                "fields": [{
                    "name": "1.個人情報の送信禁止。例外あり",
                    "value": "(送信可能、都道府県・年齢　送信禁止、電話番号・生年月日・市・丁目・マンション名・学校名・マイナンバー・その他、個人情報が特定できそうなのは禁止)",
                    "inline": false
                },
                {
                    "name": "2.宣伝禁止。例外あり",
                    "value": "(自分のディスコ―ドサーバー招待URL・BotURL・自分のサイトURLは禁止/Owner・Admin・moderatorから、許可する場合もあります。)※ Admin-運営 moderator-モデレーター の方は許可。",
                    "inline": false
                },
                {
                    "name": "3.R-18系禁止",
                    "value": "(R-18などを送信した場合、そのサーバーでの利用を停止)",
                    "inline": false
                },
                {
                    "name": "4.スパム禁止",
                    "value": "(あいうえお、など、連続チャットは禁止。負荷軽減の為、2.3秒開けての投稿をおねがいします。)",
                    "inline": false
                },
                {
                    "name": "5.他のユーザーに成りすまし禁止",
                    "value": "(ほかのユーザーと同じアイコン・名前などはできるだけ控えてください。)",
                    "inline": false
                },
                {
                    "name": "6.その他、Owner・Adminが禁止するみなす行為禁止",
                    "value": "(この利用規約はいつでも改訂しますので、何日がごとに見ることをおすすめします。(Botから見ている場合: $g-ruleで見れます。 )",
                    "inline": false
                },
                {
                    "name": "規約情報",
                    "value": "2021/03/22",
                    "inline": false
                }]
            }
        }
        message.channel.send(embed);
    }


    if (message.content == "!web") {
        const embed = {
            "embed": {
                "title": "webサイトです",
                "description": "",
                "color": 0xffff00,
                "fields": [{
                    "name": "webサイトです",
                    "value": "https://kuroneko6423.com/",
                    "inline": false
                }]
            }
        }
        message.channel.send(embed);
    }


    if (message.content == "!gban") {
        const embed = {
            "embed": {
                "title": "グローバルBANをするためのフォームです",
                "description": "",
                "color": 0xffff00,
                "fields": [{
                    "name": "こちらからどうぞ",
                    "value": "https://forms.gle/B1rv2DWGQTnZcYuJ7",
                    "inline": false
                }]
            }
        }
        message.channel.send(embed);
    }


    if (message.content == "!sp") {
        const embed = {
            "embed": {
                "title": "制作にて協力してくれた方と主の紹介",
                "description": "",
                "color": 0xffff00,
                "fields": [{
                    "name": "黒猫ちゃん(管理者)",
                    	　　"value": "Discord | https://discord.gg/Ya6YqBr | web | https://kuroneko6423.com/",
                   	　　 "inline": false
                　　　　},

		        {
                    "name": "Yuukiさん",
                    "value": "Discord | https://discord.gg/uc5KfSPwSX",
                    "inline": false
                },
                {
                    "name": "cronさん",
                    "value": "web | https://cron.jp",
                    "inline": false
                },
                {
                    "name": "YHさん",
                    "value": "寄付 | https://ko-fi.com/yh82667",
                    "inline": false
                }]
            }
        };
        message.channel.send(embed);
    }


    if (message.content == "!in") {
        const embed = {
            "embed": {
                "title": "BOT導入",
                "description": "こちらから導入してください",
                "color": 0xffff00,
                "fields": [{
                    "name": "BOTリンク",
                    "value": "bot導入URL　https://discord.com/api/oauth2/authorize?client_id=894075966224220233&permissions=8&scope=bot",
                    "inline": false
                }]
            }
        }
        message.channel.send(embed);
    }


    if (message.content == "!donation") {
        const embed = {
            "embed": {
                "title": "BOT支援",
                "description": "こちらから送金してください",
                "color": 0xffff00,
                "fields": [{
                    "name": "BOT支援送金フォーム",
                    "value": "https://forms.gle/vNz5jQQt1gM4gtcu6",
                    "inline": false
                },
                {
                    "name": "クレカでの寄付",
                    "value": "https://store.kuroneko6423.com",
                    "inline": false
                }]
            }
        };
        message.channel.send(embed);
    }
})


client.on("message", message => {
    if(message.content === "!pi") { //もしメッセージが「!embed」なら
    const embed = new discord.MessageEmbed()
    .setTitle("KuronekoServer運営List")　//Embedのタイトル
    .setURL("https://kuroneko6423.com/Admin")　//タイトルに埋め込むURL
    .setAuthor("KuronekoServerAdminList", "https://github.com/KuronekoServer/typing-web/blob/main/kuroneko.jpg?raw=true") //Embedのアウター
    .setThumbnail("https://github.com/KuronekoServer/typing-web/blob/main/kuroneko.jpg?raw=true")　//Embedのサムネイル
    .setImage("https://github.com/kuroneko6423/kuroneko6423/blob/main/kuronekoServer.jpg?raw=true")　//Embedのイメージ
    .addField("KuronekoServer WebSite", "https://kuroneko6423.com")　//Embedのフィールド
    .addField("運営、開発者募集中" , "https://kuroneko6423.com/Application")　//Embedのフィールド
    .addField("黒猫ちゃん(管理者&運営)", "https://profile.kuroneko6423.com/")　//Embedのフィールド
    .addField("Yuukiさん(モデレーター)", "https://kuroneko6423.com/Yuuki")　//Embedのフィールド
    .addField("cronさん(共同開発者)", "https://cron.jp")　//Embedのフィールド
    .addField("YHさん(共同開発者)", "WEBサイト未作成")　//Embedのフィールド
    .setFooter("KuronekoServer")　//Embedのフッター
    .setColor("RANDOM")　//Embedのカラー
    .setTimestamp();
    
    message.channel.send(embed); //Embedを送信
     }
})


//グローバルチャット
client.on("message", message => {
if (message.author.bot || message.channel.name != "グローバルチャット") return;

    client.channels.cache.forEach(ch => {
        if (ch.name == "グローバルチャット" && ch.type == "text") {
            ch.send({
                "embed": {//埋め込み
                    "color" : "RANDOM",
                    "description": message.content,//メッセージの内容を説明欄に
                    "timestamp": new Date(),//時間を時間の欄に
                    "footer": {
                        "icon_url": message.guild.iconURL(),//フッターのアイコンのURLをメッセージが送信されたサーバーのアイコンのURLに
                        "text": message.guild.name//文字をサーバーの名前に
                    },
                    "image": {
                        "url": message.attachments.first()||null//もしメッセージの中にファイルが有るなら、メッセージの中のはじめのファイルのURLを。無いならnull(無し)を。
                    },
                    "author": {
                        "name": message.author.tag,//メッセージの送信者のタグ付きの名前を送信者名の欄に
                        "url": `https://discord.com/users/${message.author.id}`,//名前を押すとその人のプロフィールが出されるように(https://discord.com/users/ その人のID)
                        "icon_url": message.author.displayAvatarURL({ format: 'png' })//メッセージ送信者のアイコンのURLを送信者のアイコンの欄に
                    }
                }
            });
        };
    });
    message.delete({ timeout: 1000 }).catch((e)=>message.channel.send(`メッセージを削除する際にエラーが起きました\nエラー:${e.message}`))  
})


client.on("message", message => {
  if (message.content.startsWith("!user")) {
    const args = message.content.split(" ")[1];

    const user = client.users.cache.get(args);
    if (!args) return message.channel.send("エラー:IDが入力されていません");
    if (!user)
      return message.channel.send("エラー:指定されたIDが見つかりません");
    var userpresence = user.presence.status;
    if (userpresence === "online") {
      userpresence = "オンライン";

    } else if (userpresence === "offline") {
      userpresence = "オフライン";
    } else if (userpresence === "dnd") {
      userpresence = "取り込み中";
    } else if (userpresence === "idle") {
      userpresence = "退席中";
    }
    message.channel.send({
      embed: {
        title: `───${user.username}の情報───`,
        description: `${user.username}の情報を表示しています`,
        color: "RANDOM", //色
        timestamp: new Date(),
        footer: {
          icon_url: message.guild.iconURL(),
          text: `サーバー名：${message.guild.name}`
        },
        thumbnail: {
          url: user.avatarURL()
        },
        fields: [
          {
            name: "ユーザータグ",
            value: `${user.tag}`
          },
          {
            name: "ユーザーメンション",
            value: `${user}`
          },
          {
            name: "ユーザーID",
            value: `${user.id}`
          },
          {
            name: "アカウントの種類",
            value: user.bot ? "BOT" : "ユーザー",
            inline: true
          },
          {
            name: "現在のステータス",
            value: `${userpresence}`,
            inline: true
          },
          {
            name: "userguild",
            value: `${user.guild}`
          }
        ]
      }
    });
  }
});


//チャット

client.on('message', async message => {

  if (message.author.bot) {
   retuen;     
  }

  if (message.content == 'こんにちは') {
    message.channel.send('...こんにちは～')
  }

  if (message.content == 'おはよう') {
    message.channel.send('おはようです...(眠たい...)')
  }

  if (message.content == 'おはようございます') {
    message.channel.send('おはようございま～す！')
  }

  if (message.content == 'なにしてるの？') {
    message.channel.send('私も気になる！')
  }

  if (message.content == 'おやすみなさい') {
    message.channel.send('おやすみ～')
  }

  if (message.content == 'こんばんは') {
    message.channel.send('こんばんは！')
  }
  
  if (message.content == 'こんばんはー') {
    message.channel.send('こんばんちわ！')
  }
  
  if (message.content == 'おはようー') {
    message.channel.send('おはようです！！')
  }
  
  if (message.content == 'おはー') {
    message.channel.send('おはよ～うオーディションして....ってあぁぁぁぁぁぁぁぁ。絶対聞かなかったことにしてくださいね！')
  }

  if (message.content == '暇') {
    message.channel.send('雑談します？ [Botだけどね]')
  }

  if (message.content == '課題') {
    message.channel.send('課題なんて燃やしちゃえ★')
  }

  if (message.content == 'は？') {
    message.channel.send('怒らないで(´;ω;｀)')
  }

  if (message.content == 'あ？') {
    message.channel.send('怒らないで(´;ω;｀)')
  }

  if (message.content == '嫌い') {
    message.channel.send('そんなこと言わないで(´;ω;｀)')
  }

  if (message.content == 'あけおめ') {
    message.channel.send('あけおめ！ :boom::boom::boom: ')
  }
})

client.on("message", message => {
    if(message.content === "!forestblackServerRule") { //もしメッセージが「!embed」なら
    const embed = new discord.MessageEmbed()
    .setTitle("minecraft Server 利用規約")　//Embedのタイトル
    .setURL("https://kuroneko6423.com/Minecraft")　//タイトルに埋め込むURL
    .setAuthor("minecraft Server Rule") //Embedのアウター
    .setThumbnail("https://github.com/KuronekoServer/typing-web/blob/main/kuroneko.jpg?raw=true")　//Embedのサムネイル
    .addField("第1条", "serverに負荷を掛けない")　//Embedのフィールド
    .addField("第2条", "サイバー攻撃をしない(DDoSやDoSなど")　//Embedのフィールド
    .addField("第3条", "TNTなどを使わない")　//Embedのフィールド
    .addField("第4条", "IPを第三者に教えない")　//Embedのフィールド
    .addField("第5条", "x-rayなどのチートを使わない。x-rayのテクスチャだけでも処罰対象")　//Embedのフィールド
    .addField("第6条", "人のものを勝手に取ったり、壊したりしない")　//Embedのフィールド
    .addField("第7条", "BAN等の処分については、運営メンバー内での協議で事前の確認なく行うことができるものとし、このルールは運営内で認可され、公表されることによって変更を行えるものとする")　//Embedのフィールド
    .setFooter("KuronekoServer")　//Embedのフッター
    .setColor("RANDOM")　//Embedのカラー
    .setTimestamp();
    
    message.channel.send(embed); //Embedを送信
     }
})

   
client.on('message', async message => {
  if (!message.content.startsWith(prefix)) return
  const [command, ...args] = message.content.slice(prefix.length).split(' ')
  if (command === 'poll') {
    const [title, ...choices] = args
    if (!title) return message.channel.send('タイトルを指定してください')
    const emojis = ['🇦', '🇧', '🇨', '🇩']
    if (choices.length < 2 || choices.length > emojis.length)
      return message.channel.send(`選択肢は2から${emojis.length}つを指定してください`)
    const poll = await message.channel.send({
      embed: {
        title: title,
        description: choices.map((c, i) => `${emojis[i]} ${c}`).join('\n')
      }
    });
    emojis.slice(0, choices.length).forEach(emoji => poll.react(emoji))
  }
})


client.on("message", message => {
if(message.content === "!ban") { //もしメッセージが「!servers」なら
    message.channel.send(`緊急でBANコマンドは無効化しています。 開発者募集中です！https://kuroneko6423.com/Application`); }
})

client.login("ODk0MDc1OTY2MjI0MjIwMjMz.YVkvIQ.ayyfDWhS_KokGOec9zavfJfUTpY").catch(err => console.warn(err));
