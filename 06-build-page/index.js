const fs=require('fs');
const path=require('path');
const dist=path.join(__dirname,'project-dist');
const src_asset=path.join(__dirname,'assets');
const src=path.join(__dirname,'styles');
const dest=path.join(dist,'style.css');
const dest_assets=path.join(dist,'assets');
const html_crap=path.join(__dirname,'components');
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
function copy(e,q){
  fs.promises.rmdir( q,{ recursive: true },{ force: true }).then(()=>fs.promises.mkdir(q,
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
async function createHTML(){
  await fs.promises.rmdir( dist,{ recursive: true },{ force: true });
  await fs.promises.mkdir(dist,{ recursive: true });
  await copy(src_asset,dest_assets);
  await bundle();
  const  htmlpath=path.join(dist,'index.html');
  await fs.promises.copyFile(path.join(__dirname,'template.html'),htmlpath);
  let teamplate=await fs.promises.readFile(htmlpath,'utf-8');
  let header=  await fs.promises.readFile(path.join(html_crap,'header.html'),'utf-8');
  let footer= await fs.promises.readFile(path.join(html_crap,'footer.html'),'utf-8');
  let  article=await fs.promises.readFile(path.join(html_crap,'articles.html'),'utf-8');
  const replaceheader=teamplate.replace('{{header}}',header).replace('{{footer}}',footer).replace('{{articles}}',article);
  
  await fs.promises.writeFile(htmlpath, replaceheader);
  console.log(article);

}
createHTML();