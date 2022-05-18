const fs=require('fs');
const path=require('path');
const filepath=path.join(__dirname,'text.txt');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt:'Ввод сюды\n'
});
readline.prompt();
fs.writeFile(filepath,'',(err)=>{if (err){console.log(err);}});
readline.on('line', content => {
  readline.prompt();
  if (content==='exit'){
    console.log('Ну и ладно...');
    readline.close();
  }
  else{
      
    fs.appendFile(filepath,content,err=>{
      if (err){
        console.error(err);
      }
    });
  }
  
});
readline.on('SIGINT',()=>{
  console.log('Ну и ладно...');
  readline.close();
});