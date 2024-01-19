// netlify-functions/fetchContent.js
const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async function (event, context) {
  try {
    const { url } = JSON.parse(event.body);
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const content = $('#content-middle').html();
    return {
      statusCode: 200,
      body: JSON.stringify({ content }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
