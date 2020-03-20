const express = require('express')
const app = express()
const port = 3000
const fetch = require('node-fetch'); //para fazer os requests http
const sha1 = require('js-sha1');  //para computar o resumo criptográfico
const fs = require('fs'); //para escrever arquivos


var url ='https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=118530a27b5193eeb557dcd87dc07e5f13e5a353';
fetch(url)
    .then(response => response.json())
    .then(data => {
        let mensagem = data.cifrado;
        let n = data.numero_casas;
        let i;
        let msgTraduzida = [];
        let naoTraduzir = [' ',',','-','_','.','1','2','3','4','5','6','7','8','9','0'];
        for (i=0; i < mensagem.length; i++) {
            //se o caractere atual não for um dos que não devem ser modificados
            if (!naoTraduzir.includes(mensagem[i]))
                //coloca no array a letra decrementada -1 (ex: b -> a), é o processo inverso da cifra de césar
                msgTraduzida.push(String.fromCharCode(mensagem[i].charCodeAt(0) - n));
            //senão coloca o caractere sem mudança
            else
                msgTraduzida.push(mensagem[i]);
        }

        //transforma a msg traduzida em string e guarda no obj JSON
        data.decifrado = msgTraduzida.join('');
        //cria o resumo criptográfico e guarda no obj JSON
        data.resumo_criptografico = sha1(data.decifrado);

        //função para salvar JSON para um arquivo como string, recebe o obj JSON e o path aonde salvar o arquivo
        const salvarArquivo = (data, path) => {
            try {
                fs.writeFileSync(path, JSON.stringify(data));
            } catch (error) {
                console.error(error);
            }
        }

        //salvar o arquivo, process.cwd() retorna o path do diretório aonde tá rodando o processo
        salvarArquivo (data, 'answer.json');

    })
    .catch(err => console.log(`erro: ${err}`));

app.get('/', (req, res) => res.send(``));

const server = app.listen(port, () => console.log(`Listening na porta ${port}!`));

process.on('SIGTERM', () => {
    server.close(() => {
      console.log('Process terminated')
    });
  }); //não é necessário, mas com isso passa a ter a opção de terminar o server gracefully


/*
exemplo de uso completo de fetch:
var url ='https://example.com';
var headers = {
  "Content-Type": "application/json",
  "client_id": "1001125",
  "client_secret": "876JHG76UKFJYGVHf867rFUTFGHCJ8JHV"
}
var data = {
  "name": "Wade Wilson",
  "occupation": "Murderer",
  "age": "30 (forever)"
}
fetch(url, { method: 'POST', headers: headers, body: data})
  .then((res) => {
     return res.json()
})
.then((json) => {
  console.log(json);
  // Do something with the returned data.
});

PROPRIEDADES DA RESPOSTA

fetch('https://example.com')
.then(res => {
  res.text()       // response body (=> Promise)
  res.json()       // parse via JSON (=> Promise)
  res.status       //=> 200
  res.statusText   //=> 'OK'
  res.redirected   //=> false
  res.ok           //=> true
  res.url          //=> 'https://example.com'
  res.type         //=> 'basic'
                   //   ('cors' 'default' 'error'
                   //    'opaque' 'opaqueredirect')

  res.headers.get('Content-Type')
})

VEJA TB:

fetch('https://example.com')
  .then(reportStatus)

function checkStatus (res) {
  if (res.status >= 200 && res.status < 300) {
    return res
  } else {
    let err = new Error(res.statusText)
    err.response = res
    throw err
  }

ASYNC:

const fetch = require("node-fetch");

const url = "https://example.com";

const get_data = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
};

getData(url);
*/