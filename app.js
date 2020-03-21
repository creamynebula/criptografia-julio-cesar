//exemplo de server

const express = require('express')
const app = express()
const port = 3000
    
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