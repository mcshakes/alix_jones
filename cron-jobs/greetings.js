require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();
const CronJob = require("cron").CronJob;


const goodMorning = new CronJob("* * * * *", function () {
    console.log("INITIATE ANGER");

    // client.login(process.env.TOKEN).then(() => {
    //     const guild = client.guilds.cache.get(process.env.TEST_SERVER_ID);
    client.channels.fetch(process.env.TEST_CHANNEL)
        .then(channeObj => {
            // console.log("CHANNEL", channeObj);
            channeObj.send('FUCK AGAIN!!!')
                .then(message => console.log(`Sent message: ${message.content}`))
                .catch(console.error);
        })
        .catch(err => {
            console.log(err)
        })

    client.destroy();
    // });
})

module.exports = { goodMorning };

