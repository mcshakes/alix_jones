require('dotenv').config()
const { prefix } = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.TOKEN).then(() => {
    console.log("I am ready");
    const guild = client.guilds.cache.get(process.env.TEST_SERVER_ID);

    if (guild && guild.channels.get(process.env.TEST_CHANNEL)) {
        guild.channels.get('channelid').send("Good Morning").then(() => client.destroy());
    } else {
        console.log("nope");

    }
    client.destroy();
});