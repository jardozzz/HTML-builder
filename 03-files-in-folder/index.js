const fs=require('fs');
const path=require('path');
let path1=path.join(__dirname,'secret-folder');
function rec(){
  fs.readdir(path1, (err, files) => {
    if (err)
      console.log(err);
      
    else {
        
      files.forEach(function(file) {
        let path2=path.join(path1,file);
        fs.stat(path2,(err,data)=>{
          if (err){
            console.log(err);
          }
          if(!data.isDirectory()){
            console.log(file.slice(0,file.indexOf('.'))+' - '+path.extname(path2).slice(1)+' - '+data.size +' bytes');
          }
         
        });
      });
    }
      
  });
}
rec();
  

