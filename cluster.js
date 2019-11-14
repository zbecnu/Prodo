const cluster =  require('cluster');
const os = require('os');

// show
if(cluster.isMaster){
    for(let i=0; i<os.cpus().length/2;i++){
        
       const worker =  cluster.fork();

       let missping = 0;

       setInterval(()=>{
            worker.send('ping');    
            missping++;

            if(missping >=3){
                worker.exit(1);
            }

       },3000);


       worker.on('message',(msg)=>{
            if(msg == 'pong'){
                missping--;
            }
       });

        //主进程监听子进程的退出情况
        cluster.on('exit',()=>{
            setTimeout(() => {
                cluster.fork();     
            }, 5000);
        });

    }
}else{
    // showsmsg.push(num);
    // 检测异常
    process.on('uncaughtException',(err)=>{
        console.log(err);
        process.exit(1);
    });

    process.on('message',(msg)=>{
        if(msg=='ping'){
            process.send('pong');
        }
    })

    // 检测内存
    setInterval(() => {
        if(process.memoryUsage().rss< 2301203210321){
                process.exit(1);
        }
    },1000);

    require('./http');
}
 