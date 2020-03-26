require('dotenv').config()
const { prefix } = require('./config.json');
const Discord = require("discord.js");
const client = new Discord.Client();
const { goodMorning } = require("./cron-jobs/greetings");

client.once("ready", () => {

    const server = client.guilds.cache.get(process.env.SERVER_ID);
    // console.log(`GUILD: ${server}!`);
    console.log(`Logged in as ${client.user.tag}!`);

    goodMorning.start()

});

client.on("message", message => {
    if (message.author.bot) return; // Ignore if bots talk

    // if (!message.content.startsWith(prefix) || message.author.bot) return;

    // const args = message.content.slice(prefix.length).split(/ +/);
    const args = message.content
    const username = message.author.username;

    const guild = client.guilds.cache.get(process.env.TEST_SERVER_ID);

    // respondWithGIF(process.env.TEST_CHANNEL);
    
    // client.channels.fetch(process.env.TEST_CHANNEL)
    //     .then(channeObj => {
    //         // console.log("CHANNEL", channeObj);
    //         channeObj.send('FUCK AGAIN!!!')
    //             .then(message => console.log(`Sent message: ${message.content}`))
    //             .catch(console.error);
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })

})

const respondWithGIF = (channel) => {
    client.channels.fetch(channel)
        .then(channeObj => {
            channeObj.send('FUCK AGAIN!!!')
                .then(message => console.log(`Sent message: ${message.content}`))
                .catch(console.error);
        })
        .catch(err => {
            console.log(err)
        })
};

client.login(process.env.TOKEN)