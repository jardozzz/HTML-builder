const fs=require('fs');
const path=require('path');
const src=path.join(__dirname,'styles');
const dest=path.join(__dirname,'project-dist','bundle.css');
async function bundle(){
  fs.readdir(src,(err,data)=>{
    
    if(err){
      console.error(err);
    }
    else {
      let write=fs.createWriteStream(dest,{encoding: 'utf8'}, { flags : 'a+' });
      for (let i of data) {
        if(path.extname(path.join(src,i).slice(1))==='.css'){
               
          let read=fs.createReadStream(path.join(src,i),{encoding: 'utf8'});
          read.pipe(write);
              
        }
      }
    }
  });}
bundle();