var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile')
var formidable = require('formidable')
var fs = require('fs')
 
var myDB = __dirname + "/ficheiros.json"
 
/* GET home page. */
router.get('/', (req, res) => res.render('index'))
 
router.get('/ficheiro', (req,res)=> {
  jsonfile.readFile(myDB, (erro,ficheiros)=> {
    if(!erro) res.render('lista',{lista: ficheiros})
    else res.json(erro)
  })
})
  
router.post('/ficheiro/guardar', (req,res)=> {
  var f = req.body.ficheiro
  console.dir(f)
  var str = f.toString().split(",")

  
  jsonfile.readFile(myDB, (erro, ficheiros)=> {
    if(!erro) {
      ficheiros.push({nome: str[0].split('\\').pop(), descricao: str[1]})
      console.dir(ficheiros)
      jsonfile.writeFile(myDB,ficheiros,erro2 => {
        if(!erro2)
          console.log('Registo gravado com sucesso!')
        else
          console.log('Erro: '+erro2)
      })
    }
    else
      console.log('Erro: '+erro)
    })
    res.json(f)
  })

module.exports = router
