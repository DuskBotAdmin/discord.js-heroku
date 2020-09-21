// Discord bot implements
const discord = require('discord.js');
const client = new discord.Client();

client.on('ready', message =>
{
	console.log('bot is ready!');
});

client.on('ready', message =>
{
  client.user.setPresence({ game: { name:"Minecarft@DusksHackEdition" } });  
  console.log('bot is ready!');
});

client.on('message', message =>
{
	if(message.isMemberMentioned(client.user))
	{
		message.reply( '呼びましたか？' );
		return;
	}
});

//不適切なメッセージのさくじょ
client.on('message',message=>{
 if (message.content.match(/しね|ころす|死ね|殺す|きっしょ|ゴミ|野獣先輩|糞|カス/)) {
   message.channel.send('不適切な表現が含まれていたため、削除しました。');
  message.delete(100)
}
})
client.on('message',message=>{
if (message.content.match(/不適切な表現が含まれていたため、削除しました。/)) {
        message.delete(3000)
   }
});

//______________グローバルチャット_____________________________
client.on('message', message => { // メッセージが送信されたとき
    if(message.author.bot){
        return;
    }
    if (message.channel.name == ("グローバルチャット")){ // もし送信された場所が「グローバルチャット」なら
        message.delete(); // メッセージを削除する(二重になるのを防ぐため)
        const ch_name = "グローバルチャット"; // 「グローバルチャット」という名前のチャンネルに一斉配信
        client.channels.forEach(channel => {
            if (channel.name === ch_name) {
                channel.send({embed: {
                    title: message.content, // メッセージ内容
                    color: 0x800080, // 色
                    timestamp: new Date(),
                    footer: {
                        text: "グローバルチャット" //フッターの内容
                    },
                    thumbnail: {
                        url: "https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png" // ユーザーのアイコン
                    },
                    fields: [
                        {
                            name: "サーバー",
                            value: `${message.guild.name} (${(message.guild.id)})`, // 送信されたサーバーの名前とID
                            inline: true
                        },

                        {
                            name: "ユーザー",
                            value: `${message.author.username} (${message.author.id})`, // 送信したユーザーの名前とID
                            inline: true
                        }
                    ]
                }});
            }
        })
    }
});

client.on('message',message=>{
  if (message.content.match(/🥺/)){
    let react = '🥺';
    message.react(react)
      .then(message => console.log("リアクション: 🥺"))
      .catch(console.error);
  }})
client.on('message',message=>{
  if (message.content.match(/ぴえん/)){
    let react = '🥺';
    message.react(react)
      .then(message => console.log("リアクション: 🥺"))
      .catch(console.error);
  }})

//コインゲーム
client.on('message', message => {
if(message.content === 'coin'){
var array = [":dvd:omote", ":cd:ura"];
message.channel.send(array[Math.floor(Math.random() * array.length)]);
console.log(array[Math.floor(Math.random() * array.length)]);
}
})

//占い
client.on('message', message => {
if(message.content === '占い'){
var array = ["凶　えぇ、、、", "小吉　まあ、がんば", "中吉　普通で草", "吉　おめでと。", "大吉　おめでと。"];
message.channel.send(array[Math.floor(Math.random() * array.length)]);
console.log(array[Math.floor(Math.random() * array.length)]);
}
})

client.on('message', async message => {
  // Voice only works in guilds, if the message does not come from a guild,
  // we ignore it
  if (!message.guild) return;

  if (message.content === '/join') {
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
    } else {
      message.reply('You need to join a voice channel first!');
    }
  }
});

// Create an event listener for messages
client.on('message', message => {
  // If the message is "what is my avatar"
  if (message.content === 'what is my avatar') {
    // Send the user's avatar URL
    message.reply(message.author.displayAvatarURL());
  }
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});

client.on('message', message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // If the message content starts with "!kick"
  if (message.content.startsWith('!kick')) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member
          .kick('Optional reason that will display in the audit logs')
          .then(() => {
            // We let the message author know we were able to kick the person
            message.reply(`Successfully kicked ${user.tag}`);
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            message.reply('I was unable to kick the member');
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.reply("That user isn't in this guild!");
      }
      // Otherwise, if no user was mentioned
    } else {
      message.reply("You didn't mention the user to kick!");
    }
  }
});

client.on('message', message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // if the message content starts with "!ban"
  if (message.content.startsWith('!ban')) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Ban the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         * Read more about what ban options there are over at
         * https://discord.js.org/#/docs/main/master/class/GuildMember?scrollTo=ban
         */
        member
          .ban({
            reason: 'They were bad!',
          })
          .then(() => {
            // We let the message author know we were able to ban the person
            message.reply(`Successfully banned ${user.tag}`);
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to ban the member,
            // either due to missing permissions or role hierarchy
            message.reply('I was unable to ban the member');
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.reply("That user isn't in this guild!");
      }
    } else {
      // Otherwise, if no user was mentioned
      message.reply("You didn't mention the user to ban!");
    }
  }
});

 client.on('message', async message => {
   if (message.content === '!bans' && message.guild) {
     const bans = await message.guild.fetchBans()
     message.channel.send(bans.map(ban => ban.user.tag).join(', ') || 'none')
   }
 })

 client.on('message', async message => {
   if (message.content === '!invites') {
     const invites = await message.guild.fetchInvites()
     console.log(invites.map(invite => invite.url))
   }
 })

 client.on("guildMemberRemove", member => {
   const period = Math.round((Date.now() - member.joinedAt) / 86400000) // サーバーに居た期間を日数にして計算
 
   console.log(`${member.user.tag}は${member.guild.name}に約${period}日間サーバーに参加していました。`)
 })

 client.on('guildMemberAdd', member => {
	  console.log(`${member.guild.name} に ${member.displayName} が参加しました`)
 })
 
 client.on('guildMemberRemove', member => {
	  console.log(`${member.guild.name} から ${member.displayName} が退出しました`)
 })

  client.on('message', message => {
        if(command === "ping"){
        message.channel.send(` Ping を確認しています...`)
        .then((pingcheck) => pingcheck.edit(`botの速度|${pingcheck.createdTimestamp - message.createdTimestamp} ms`))
    }

client.login(process.env.TOKEN);
