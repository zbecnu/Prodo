const cp =  require('child_process');

const child_process = cp.fork(__dirname+'/child.js');

setInterval(()=>{
    child_process.send(100);
},1000);

child_process.on('message',msg=>{
    console.log(msg);

})