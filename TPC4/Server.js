var http = require('http')
var url = require('url')
var fs = require('fs')

http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type': 'text/html'})
    var parse_url = url.parse(req.url,true)
    
    if(parse_url.pathname == '/index'){
        fs.readFile('website/index.html',(erro,dados)=>{
            if(!erro)
                res.write(dados)
            else
                res.write(erro)
            res.end()
        })
    }
    else{
        if(parse_url.pathname == '/obra'){
            fs.readFile('website/html/obra'+parse_url.query.id+'.html',(erro,dados)=>{
                if(!erro)
                    res.write(dados)
                else
                    res.write(erro)
                res.end()
            })
        }
        else{
            res.end()
        }
    }
}).listen(8000, ()=>{
    console.log('Servidor à escuta na porta 8000...')
})