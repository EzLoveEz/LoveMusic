const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  message.client.queue.get(message.guild.id)

        const embed = new Discord.MessageEmbed()
       .setTitle(`COMANDOS`)
       .setColor("RED")
       .setDescription(`${message.author} **Olá, você pode encontra meus comandos logo abaixo:**

\nl!clear "1-99"\n
\nl!play "tocar uma musica do youtube"\n
\nl!pause "para a musica que está tocando"\n
\nl!resume "volta musica a tocar"\n
\nl!queue "lista de musicas"\n
\nl!skip "pular a musica"\n
\nl!leave "eu saio da chamada"\n
\nl!volume "1-10"\n`);
      await message.channel.send(embed);
      ;
}