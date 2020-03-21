const fetch = require('node-fetch'); //para fazer os requests http
const sha1 = require('js-sha1');  //para computar o resumo criptográfico
const fs = require('fs'); //para escrever arquivos
const FormData = require('form-data'); //para enviar request no formato de form-data
const filePath = require("path");


let url ='https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=118530a27b5193eeb557dcd87dc07e5f13e5a353';

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

        //salvar o arquivo
        salvarArquivo (data, 'answer.json');
        //guardar arquivo em variável pra enviar no form
    })
    .catch(err => console.log(`erro: ${err}`));

let arquivo;
try {
    arquivo = fs.createReadStream('./answer.json');
}
catch(err) {
    console.log(`erro: ${err}`);
}
console.log('Arquivo salvo, probably.');

//criar objeto no formato de dados de formulário
const formData = new FormData();
//campo 'file' contendo o arquivo
formData.append('answer', arquivo);

let url2 = 'https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=118530a27b5193eeb557dcd87dc07e5f13e5a353';

fetch(url2, {
    method: 'POST',
    body: formData,
    headers: formData.getHeaders()
})
.then(res => res.json())
.then(data => {
    console.log(data)
})
.catch(err => console.log(`erro: ${err}`));