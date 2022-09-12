// makes csv file of yelp id, zipcode, wine url for all resturants in a city
const axios = require('axios');
const cheerio = require('cheerio');
var fs = require('fs');

//TODO: make sure all citites are here
const { 
  YELP_API_KEY,
  CHARLOTTE,
  SAN_FRANCISCO
} = require('./config.js');

// load all urls via get /charlotte to state
// for all urls call getUrl below
const getUrl = async(url, businessId, zip_code) => {

    try {
        const resp = await axios.get(url);
        const $ = cheerio.load(resp.data);
        const linkObjects = $('a');

        const links = [];
        linkObjects.each((index, element) => {
            let text = $(element).text();
            let href = $(element).attr('href');
          links.push({
            text: text, // get the text
            href: href, // get the href attribute
          });
          if( text != undefined &&
            text.includes("www.") &&
             href.includes("biz_redir")) {
                let wwwIndex = href.indexOf("www");
                let domains = [".com", ".org", ".edu", ".us"]
          
                domains.forEach(element => {
                  if(href.includes(element)){
                    let domainIndex = href.indexOf(element.substring(1));
                    let wine_url = href.substring(wwwIndex, domainIndex + element.length - 1);
        
                    let info = `${businessId} ${zip_code} ${wine_url}\n`;

                    // TODO: change city name
                    fs.appendFile(`san_francisco_bars.csv`, info, function(err) {
                      if (err) throw err;
                      }

                  );
                  }
                })


                //console.log(href, href.substring(wwwIndex, comIndex + 3));
                //write to file here
             }

        });




    } catch(err){
        console.log(err);
    }
}
//TODO: change city here
let zip_codes = SAN_FRANCISCO; //current city
console.log(zip_codes.length);
const args = process.argv.slice(2);
const index = args[0];
console.log("writing to file with index: ", index);

let zip = zip_codes[index];
//TODO: change city name for each city
const file = require(`./san_francisco/san_francisco_${zip}.json`);
let data = JSON.parse(file);
let businesses = data.businesses;

for(let i = 0; i < businesses.length; i++){
    let url = businesses[i].url;
   getUrl(url, businesses[i].id, zip);
    
}

// for i in {0..65}; do node wineUrls.js $i; date ; zip_code; sleep 20; done 

// sf 27 32 33 43 45 46 49 51

