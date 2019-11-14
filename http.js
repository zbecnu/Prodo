const http =  require('http');

server =  http.createServer(function(req,res){
    res.writeHead(200);
    res.end('zhangbing');
});

server.listen(3000,()=>{
    console.log('start http')
});
