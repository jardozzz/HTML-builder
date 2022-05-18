const fs=require('fs');
const path=require('path');
function rec(e){
  fs.readdir(e, (err, files) => {
    if (err)
      console.log(err);
      
    else {
        
      files.forEach(function(file) {
        let path1=path.join(e,file);
        fs.stat(path1,(err,data)=>{
          if (err){
            console.log(err);
          }
          if(data.isDirectory()){
            return rec(path1);
          }
         
        });
      });
    }
      
  });
}
rec(__dirname);
  

