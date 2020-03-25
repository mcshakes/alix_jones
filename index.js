require('dotenv').config()
const { prefix } = require('./config.json');
const Discord = require("discord.js");
const client = new Discord.Client();

client.once("ready", () => {
    console.log("Alix is ready!");
});

client.on("message", message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
})

client.login(process.env.TOKEN)