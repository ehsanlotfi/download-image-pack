// بیست سطع و هر سطح دو به توان شماره سطح تصویر ضرب در خودش 
var glob = require("glob");
const info = (i) => {
  let pr = new Promise((res, err) => {
    glob(`images/${i}/**/*.png`, {}, (er, files) => {
      const 
        allImages = (2 ** i) * (2 ** i),
        receivedImage = files.length,
        percent = Math.round(receivedImage * 100 / allImages);
  
      console.log(`level ${i} =  ${percent}%  [${receivedImage} from ${allImages.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]`);
      res();
    });
});

pr.then(() => {
  if(++i < 20 ){
    info(i);
  }
});

};

info(0);
