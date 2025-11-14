const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

// ENV'DEN GELEN ROL ID
const AUTO_ROLE_ID = process.env.AUTO_ROLE_ID;

client.once('ready', () => {
  console.log(`Bot aktif: ${client.user.tag}`);
});

client.on('guildMemberAdd', async (member) => {
  try {
    const role = member.guild.roles.cache.get(AUTO_ROLE_ID);

    if (!role) {
      console.log("Rol bulunamadı! ID yanlış olabilir.");
      return;
    }

    await member.roles.add(role);
    console.log(`${member.user.username} adlı kullanıcıya rol verildi.`);
  } catch (err) {
    console.error("Rol verirken hata:", err);
  }
});

client.login(process.env.BOT_TOKEN);
