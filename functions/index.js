const cheerio = require('cheerio');
const got = require('got');
const functions = require('firebase-functions');

const config = {
  url: 'url to the website you want to check',
  selector: 'selector path of the content you want to check',
  content: `actual html content you want to check`,
  callback: 'url to call when change occurs e.g. your mail/notification trigger',
};

const checkHandler = async () => {
  const response = await got(config.url);
  const $ = cheerio.load(response.body);
  const output = $(config.selector).html() || '';
  const sanitized = output.replace(/[\n\t\r ]/g, '');
  if (sanitized !== config.content) {
    await got(config.callback);
    console.info(`Content has changed`);
    console.info(sanitized);
  } else {
    console.info(`Nothing changed`);
  }
};

exports.scrapAndCheck = functions
  .region('europe-west1')
  .pubsub.schedule('every 1 minutes')
  .onRun((context) => {
    try {
      checkHandler();
    } catch (error) {
      console.error(error, 'Error');
    } finally {
      return null;
    }
  });
