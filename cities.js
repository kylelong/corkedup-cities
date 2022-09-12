/*
create city_zipcode.json file with what is returned when querying for wine bars 
using the yelp api

*/
const { 
    YELP_API_KEY,
    CHARLOTTE,
    SAN_FRANCISCO
 } = require('./config.js');
let yelpAPI = require('yelp-api');
var fs = require('fs');

const api = (zipCode, city) => {
    //Create a new yelpAPI object with your API key
let apiKey = YELP_API_KEY;
let yelp = new yelpAPI(apiKey);
city = city.toLowerCase();


// Set any parameters, if applicable (see API documentation for allowed params)
let params = [{ term: "wine bars", location: zipCode }];

// Call the endpoint
yelp.query('businesses/search', params)
.then(data => {
// Success

fs.writeFile(`san_francisco/${city}_${zipCode}.json`, JSON.stringify(data), function(err) {
    if (err) throw err;
    }
);

})
.catch(err => {
// Failure
console.log(err);
});
}

let zip_codes = SAN_FRANCISCO;

zip_codes.sort()
let index = 0;
let timeout;
// console.log(charlotte.length);
function createCityFiles() {

// your function code here
if(index < zip_codes.length){
    console.log(zip_codes[index]);
    api(zip_codes[index], "san_francisco");
    index++;
} else{
    return;
}

timeout = setTimeout(createCityFiles, 15000);
}

//createCityFiles();
// flawed sf 94135 94145 94153 94155
let indices = [27, 32, 33, 43, 45, 46, 49, 51];
for(index of indices){
    console.log(SAN_FRANCISCO[index]);
}





