
const Discord = require("discord.js"); 
const { Client } = require('discord.js');
const client = new Client({ intents: 1999 })
const db = require("quick.db");
const express = require('express');
const fs = require("fs");
const config = require("./config.json");
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
}); 
app.listen(process.env.PORT);

client.queue = new Map();

client.login(config.token);

client.on('ready', () => {
    let activities = [
        `use l!help`,
        `um simples bot de musicas`,
      ],
      i = 0;
    setInterval(
      () =>
        client.user.setActivity(`${activities[i++ % activities.length]}`, {
          type: 'STREAMING' //WATCHING, PLAYING, STREAMING , LISTENING
        }),
      15000
    );
    console.log('oi loving tou online');
  }); 
  


client.on("message", message => {
    if (message.author.bot) return;
    if (message.channel.type == 'LoveMusic')
    return
    if(message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`) {
    return message.channel.send(`**Olá** ${message.author}, **sou um bot de musica simples, para saber meus comandos digite l!help**`)
    }
    });

client.on('message', message => {
     if (message.author.bot) return;
     if (message.channel.type == 'dm') return;
     if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
     if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

    const args = message.content
        .trim().slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message, args);
    } catch (err) {
    console.error('Erro:' + err);
  }
});

client.on("guildMemberAdd", (member) => {
  let ferinha_canal_de_boas_vindas = db.get(`ferinha_boas_vindas_${member.guild.id}`);
  let ferinha_contador = member.guild.memberCount;
  let ferinha_servidor = member.guild.name;

  if (!ferinha_canal_de_boas_vindas) return;

  let msg_embed_ferinha = new Discord.MessageEmbed() //mensagem embed
  .setAuthor(`${member.user.tag}`, member.user.avatarURL())
  .setDescription(`Boas Vindas ${member.user} ao servidor **${ferinha_servidor}**! \nAtualmente estamos com \`${ferinha_contador}\` membros!`)
  .setColor("RANDOM")
  .setThumbnail(member.user.avatarURL());

  client.channels.cache.get(ferinha_canal_de_boas_vindas).send(msg_embed_ferinha)
});
