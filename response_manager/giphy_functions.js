const axios = require('axios');


const QUERIES = ["globalists", "conspiracies", "trump", "frogs", "liberals", "death"]

const contructGIF = async () => {
    let offset = Math.floor(Math.random() * (10 - 1) + 1);
    let query = QUERIES[Math.floor(Math.random() * QUERIES.length)];

    const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_KEY}&q=${query}&limit=1&offset=${offset}&rating=R&lang=en`;

    return url;

}

const getGIF = async () => {
    url = await contructGIF();

    try {
        return await axios.get(url)
    } catch (error) {
        console.log("Error Grabbing GIF, ", error)
    }
}

const postGIFS = async () => {
    const gifObject = await getGIF();

    if (gifObject) {
        let embedURL = gifObject.data.data[0].embed_url;

        return embedURL;
    }
}




module.exports = { getGIF, postGIFS };