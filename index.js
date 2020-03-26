require('dotenv').config()
const { prefix } = require('./config.json');
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');
const CronJob = require("cron").CronJob;

var lineObj;

function readJSONFile() {
    return fs.readFile("./greetings.json", 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }

        lineObj = randomizeGreeting(JSON.parse(jsonString));
        // console.log("INSIDE CALLBACK", lineObj)
        return lineObj;
    })
}

function randomizeGreeting(JSONmessages) {
    return JSONmessages.all[Math.random() * 38 | 0];
}

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

    sendGreeting(process.env.TEST_CHANNEL);
})

const goodMorning = new CronJob("* * * * *", function () {
    console.log("INITIATE ANGER");
    sendGreeting(process.env.TEST_CHANNEL);
})

const respondWithGIF = (channel) => {
    client.channels.fetch(channel)
        .then(channeObj => {
            channeObj.send('CRON FUCK!!!')
                .then(message => console.log(`Sent message: ${message.content}`))
                .catch(console.error);
        })
        .catch(err => {
            console.log(err)
        })
};

const sendGreeting = (channel) => {
    readJSONFile();

    console.log("MORNING", lineObj);
    // client.channels.fetch(channel)
    //     .then(channeObj => {
    //         channeObj.send('CRON FUCK!!!')
    //             .then(message => console.log(`Sent message: ${message.content}`))
    //             .catch(console.error);
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
}

client.login(process.env.TOKEN)