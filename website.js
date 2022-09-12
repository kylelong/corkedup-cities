const axios = require('axios');
const cheerio = require('cheerio');

// load all urls via get /charlotte to state
// for all urls call getUrl below
const getUrl = async (url) => {

    try {
        const resp = await axios.get(url);
        const $ = cheerio.load(resp.data);
        const linkObjects = $('a');

        const links = [];
        linkObjects.each((index, element) => {
          links.push({
            text: $(element).text(), // get the text
            href: $(element).attr('href'), // get the href attribute
          });
        });
        const result = links.filter(elem => elem.href && elem.text.length > 0 && elem.href.includes('biz_redir'));
        console.log(result[0].text);
        return result[0].text;


    } catch(err){
        console.log(err);
    }
}


const arr = getUrl("https://www.yelp.com/biz/grape-and-agave-charlotte?adjust_creative=otIbaP_wswOiXzGQ1qVmbg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=otIbaP_wswOiXzGQ1qVmbg");
console.log(arr);
//console.log(arr.filter(elem => elem.href && elem.href.includes("biz_redir")));