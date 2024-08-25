const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
  EmbedBuilder,
} = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
  ],
  shards: "auto",
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Reaction,
    Partials.GuildScheduledEvent,
    Partials.User,
    Partials.ThreadMember,
  ],
});
const path = require("path");
const fs = require("fs")
const { prefix, owner, token } = require("./config.js");
const { readdirSync } = require("fs");
const moment = require("moment");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");

client.commands = new Collection();

const rest = new REST({ version: "10" }).setToken(token);

const log = (l) => {
  console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${l}`);
};

//slash-command-handler
const commands = [];
const commandFiles = readdirSync("./src/commands/slash").filter((file) =>
  file.endsWith(".js")
);
for (const file of commandFiles) {
  const command = require(`./src/commands/slash/${file}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
}
//prefix-command-handler
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  let commandName = args.shift().toLowerCase();

  const commandPath = path.join(__dirname, 'src/commands/prefix', `${commandName}.js`);

  if (fs.existsSync(commandPath)) { 
    try {
      const command = require(commandPath); 
      await command.execute(message, args);
    } catch (error) {
      console.error(`Komut '${commandName}' çalıştırılamadı:`, error);
      message.reply('Komut çalıştırılırken bir hata oluştu.');
    }
  } else {
    const komutDosyaları = fs.readdirSync(path.join(__dirname, 'src/commands/prefix'));

    const benzerKomutlar = komutDosyaları.filter(dosya => {
      const komutAdi = path.basename(dosya, '.js');
      return commandName.includes(komutAdi) || komutAdi.includes(commandName);
    });

    if (benzerKomutlar.length > 0) {
      const othercommandsembed = new EmbedBuilder()
        .setColor("2B2D31")
        .setTitle(`Komut '${commandName}' bulunamadı.`)
        .setDescription('Belki şu komutlardan birini demek istediniz:');
      
      benzerKomutlar.forEach(komut => {
        const komutAdi = path.basename(komut, '.js');
        const komutYolu = path.join(__dirname, 'src/commands/prefix', komut);
        const komutDosyasi = require(komutYolu); 
        try {
          const description = komutDosyasi.description; 
          othercommandsembed.addFields({ name: `${prefix}${komutAdi}\n`, value: "```"+description+"```"})
      } catch (error) {
          console.error(`Komut '${komutAdi}' için açıklama alınamadı:`, error);
          othercommandsembed.addFields({ name: `${prefix}${komutAdi}\n`, value: "```Açıklama bulunamadı```"})
      }
      });

      message.reply({embeds: [othercommandsembed]}).then((replymessage) => {
        setTimeout(async () => {
          try {
            if (!replymessage.deleted) {
              replymessage.delete(); 
            }

            if (!message.deleted) {
              message.delete(); 
            }
          } catch (error) {
            console.error(`Mesaj silinemedi: ${error}`); 
          }
        }, 10000);
      });
    } else {
      const commandnotfoundembed = new EmbedBuilder()
        .setColor("2B2D31")
        .setTitle(`Komut '${commandName}' bulunamadı.`)
        .setDescription('Komutlara **'+prefix+'help** ile veya **/help** ile bakabilirsiniz!');
      message.reply({embeds: [commandnotfoundembed]}).then((replymessage) => {
        setTimeout(async () => {
          try {
            if (!replymessage.deleted) {
              replymessage.delete(); 
            }

            if (!message.deleted) {
              message.delete(); 
            }
          } catch (error) {
            console.error(`Mesaj silinemedi: ${error}`); 
          }
        }, 5000);
      });
    }
  }
});
// ----------
client.on("ready", async () => {
  try {
    await rest.put(Routes.applicationCommands(client.user.id), {
      body: commands,
    });
  } catch (error) {
    console.error(error);
  }
  log(`${client.user.username} Aktif Edildi!`);
});
// main events
const eventFiles = readdirSync("./src/events").filter((file) =>
  file.endsWith(".js")
);
for (const file of eventFiles) {
  const event = require(`./src/events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

//

client.login(token);
