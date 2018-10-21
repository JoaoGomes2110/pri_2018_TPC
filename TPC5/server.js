var http = require('http')
var url = require('url')
var fs = require('fs')
var pug = require('pug')




// Expressões regulares
var estilo = /w3\.css/
var index = /index/
var obra = /obra/
const string_open = '{"obras": ['
const string_close = ']}'


http.createServer((req,res)=>{
    var firstLog = 0;
    var purl = url.parse(req.url,true)
   
    if(index.test(purl.pathname) && firstLog==0){
        res.writeHead(200,{'Content-Type': 'text/html'})
        
        fs.readdir('obras-json/json/',(erro,ficheiros)=>{
            if(!erro){
                var fd = fs.openSync('obras-json/index.json','w')
                fs.appendFileSync(fd,string_open,'utf8')
                for(var file=0;file<ficheiros.length;file++){
                    if(file==ficheiros.length-1){
                        //ultimo ficheiro a escrever
                        var dados = fs.readFileSync('obras-json/json/'+ficheiros[file])
                        var myObj = JSON.parse(dados)
                        fs.appendFileSync(fd,'{"id": "'+myObj._id+'" , "tipo": "'+myObj.tipo+'", "titulo": "'+myObj.titulo+'"}','utf8')
                    }else{
                        var dados = fs.readFileSync('obras-json/json/'+ficheiros[file])
                        var myObj = JSON.parse(dados)
                        fs.appendFileSync(fd,'{"id": "'+myObj._id+'" , "tipo": "'+myObj.tipo+'", "titulo": "'+myObj.titulo+'"},','utf8')
                    }
                }
                fs.appendFileSync(fd,string_close,'utf8')
                fs.closeSync(fd)
                console.log('fechei o ficheiro...')
                
                fs.readFile('obras-json/index.json',(erro,dados)=>{
                    if(!erro){
                        var myObj = JSON.parse(dados)
                        res.write(pug.renderFile('index.pug',{ind:myObj}))
                    }else{
                        res.write('<p><b>Erro: A ler o ficheiro index.json')
                    }
                    res.end()
                })
                    
            }else{
                res.write('Erro a ler a pasta json')
            }
            firstLog=1
        })
    }else{
        if(index.test(purl.pathname) && firstLog==1){
            fs.readFile('obras-json/index.json',(erro,dados)=>{
                if(!erro){
                    var myObj = JSON.parse(dados)
                    res.write(pug.renderFile('index.pug',{ind:myObj}))
                }else{
                    res.write('<p><b>Erro: A ler o ficheiro index.json')
                }
                res.end()
            })
        }else{
            if(estilo.test(purl.pathname)){
                res.writeHead(200,{'Content-Type': 'text/css'})
                fs.readFile('estilo/w3.css',(erro,dados)=>{
                    if(!erro){
                        res.write(dados)
                    }
                    else{
                        res.write('<p><b>ERRO: </b> ' + erro + '</p>')
                     }
                     res.end()
                })
            }
            else{
                if(obra.test(purl.pathname)){
                    var ficheiro = purl.pathname.split('/')[2] + '.json'
                    console.log('Lendo o ficheiro: ' + ficheiro)
    
                    res.writeHead(200,{'Content-Type': 'text/html'})
                    fs.readFile('obras-json/json/'+ficheiro,(erro,dados)=>{
                        if(!erro){
                            var myObj = JSON.parse(dados)
                            res.write(pug.renderFile('template.pug',{obra:myObj}))
                        }
                        else{
                            res.write('<p><b>Erro: </b> ' + erro + '</p>')
                         }
                         res.end()
                    })
                }else{
                    res.writeHead(200,{'Content-Type': 'text/html'})
                    res.write('<p><b>Erro: </b> ' + purl.pathname + '</p>')
                    res.write('<p> Rota desconhecida</p>')
                    res.end()
                }
            }
        }
    }
}).listen(6001,()=>{
    console.log('Servidor á escuta na porta 6001...')
})