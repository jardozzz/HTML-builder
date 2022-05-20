const fs=require('fs');
const path=require('path');
const src=path.join(__dirname,'files/');
const dest=path.join(__dirname, 'files-copy');
function copy(e,q){
  fs.promises.rm( q,{ recursive: true,force:true }).then(()=>fs.promises.mkdir(q,
    { recursive: true }).catch(err => {
    console.log(err);
  })).then(()=>fs.promises.readdir(e)).catch(err => {
    console.log(err);
  }).then(filenames => {
    for (let filename of filenames){
      let q1=path.join(q,filename);
      let e1=path.join(e,filename);
      fs.stat(e1,(err,data)=>{if (err){
        console.log(err);
      }
      if(data.isDirectory()){
        return copy(e1,q1);
      }
      else { fs.promises.copyFile( path.join(e,filename), path.join(q,filename));}});
   
    
    }});}
copy(src,dest);