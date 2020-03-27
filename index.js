require('dotenv').config()
const { prefix } = require('./config.json');
const { postGIFS } = require('./response_manager/giphy_functions');
const Discord = require("discord.js");
const axios = require('axios')
const client = new Discord.Client();
const fs = require('fs');
const CronJob = require("cron").CronJob;

function readJSONFile() {
    return fs.readFile("./greetings.json", 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }

        let line = randomizeGreeting(JSON.parse(jsonString));
        return line
    })
}

// =================  =================  =================
function randomizeGreeting(JSONmessages) {
    return JSONmessages.all[Math.random() * 38 | 0];
}
// =================  =================  =================


client.once("ready", () => {

    const server = client.guilds.cache.get(process.env.SERVER_ID);
    // console.log(`GUILD: ${server}!`);
    console.log(`Logged in as ${client.user.tag}!`);

    goodMorning.start()

});


client.on("message", message => {

    if (message.author.bot) return; // Ignore if bots talk

    // const args = message.content.slice(prefix.length).split(/ +/);
    const args = message.content
    const username = message.author.username;

    const guild = client.guilds.cache.get(process.env.TEST_SERVER_ID);



    // 1) Check if users were mentioned
    if (message.mentions.users.first() !== undefined) {

        if (message.mentions.users.first().username == "alix_jones") {
            respondWithGIF(process.env.TEST_CHANNEL);
        }

    }

})

const goodMorning = new CronJob("0 11 1-30 * *", function () {
    sendGreeting(process.env.TEST_CHANNEL);
})

const respondWithGIF = async channel => {
    giphyURL = await postGIFS()

    client.channels.fetch(channel)
        .then(channeObj => {

            channeObj.send(giphyURL)
                .then(message => console.log(`Sent message: ${message.content}`))
                .catch(console.error);
        })
        .catch(err => {
            console.log(err)
        })
};

const sendGreeting = (channel) => {
    fs.readFile("./greetings.json", 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }

        let line = randomizeGreeting(JSON.parse(jsonString));

        client.channels.fetch(channel)
            .then(channeObj => {
                channeObj.send(line.value)
                    .then(message => console.log(`Sent message: ${message.content}`))
                    .catch(console.error);
            })
            .catch(err => {
                console.log(err)
            })

    })
}

client.login(process.env.TOKEN)