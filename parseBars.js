// replace TODO with env variables
const fs = require('fs');
const { parse } = require('csv-parse');
// Note, the `stream/promises` module is only available
// starting with Node.js version 16
const { finished } = require('stream/promises');
const { exec } = require('child_process');


// Read and process the CSV file
const processFile = async() => {
  const records = [];
  const parser = fs
    .createReadStream('./san_francisco_bars.csv') //TODO: change this for each run
    .pipe(parse({
    // CSV options if any
    }));
  parser.on('readable', function(){
    let record; while ((record = parser.read()) !== null) {
    // Work with each record
      records.push(record);
    }
  });
  await finished(parser);
  return records;
};
// Parse the CSV content
const execute = async() => {
    let map = new Map();
    let zips = new Set();
    const records = await processFile();
    for(rec of records){
        let arr = rec[0].split(' ');
        let id = arr[0];
        let zip = arr[1];
        let url = arr[2];
        zips.add(url);
        if(map.has(zip)){
            let urls = map.get(zip);
            map.set(zip, [...urls, url]);
        } else {
            map.set(zip, [url]);
        }
    }

    //[zip, list of bars]
   
   let json = JSON.stringify(Array.from(map.entries()));
    
    fs.appendFile(`san_francisco_bars_clean.json`, json, function(err) { TODO: //change this for each run
      if (err) throw err;
      }

  );

  let zips_json = JSON.stringify(Array.from(zips.entries()));
    
  fs.appendFile(`san_francisco_bars_list.json`, zips_json, function(err) { TODO: //change this for each run
    if (err) throw err;
    }

);



}

execute();