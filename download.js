// بیست سطع و هر سطح دو به توان شماره سطح تصویر ضرب در خودش 
// (2 ** level) * (2 ** level)
var fs = require('fs'),
request = require("request-promise"),
sleep = require('util').promisify(setTimeout),
level = 3;

async function start () {

  const folders = Array.from(Array((2 ** level)).keys());

  var chunkRenge = 100;

  for (const folder of folders) {

    const chunks = [];
    let files = JSON.parse(JSON.stringify(folders));

    while (files.length > 0) {
      chunks.push(files.splice(0, chunkRenge));
    }

    for (const chunk of chunks) {

      await Promise.all(chunk.map(async file => {
        const folderPath = `${level}/${folder}/`;
        const fileName = `${file}.png`;
        const ifExists = await fs.existsSync(`images/${folderPath}${fileName}`);

        if(!ifExists) {
          const url = `https://b.tile.openstreetmap.org/${folderPath}${fileName}`;
          const options = {
            url,
            encoding: 'binary',
            method: 'get',
            'headers': {
              "User-Agent":"PostmanRuntime/7.26.8",
            }
          };
          var d = await request(options);
          await fs.mkdirSync(`images/${folderPath}`, { recursive: true });
          var result = await fs.writeFileSync(`images/${folderPath}${fileName}`, d, 'binary');
          
          await sleep(10000);
        }
        
      }));

      console.log(`folder => ${folder} [ ${chunk[0]}-${chunk[chunk.length - 1]} ] downloaded!`);

    }
    
  }

 
}


start();
