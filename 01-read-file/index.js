const fs=require('fs');
const path=require('path');
const filepath=path.join(__dirname,'text.txt');
let stream=fs.createReadStream(filepath,'utf-8');
stream.on('data',(err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
