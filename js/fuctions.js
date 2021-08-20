let engine = {
    "cores": ['green', 'purple', 'pink', 'red', 'yellow', 'orange', 'grey', 'black'],
    "hexadecimais":{
        'green': '#02EF00',
        'purple': '#790093',
        'pink': '#F02A7E',
        'red': '#E90808',
        'yellow': '#E7D703',
        'orange': '#F16529',
        'grey': '#EBEBEB',
        'black': '#141414'
    },
    "moedas": 0
}

const audioMoeda = new Audio('audio/moeda.mp3');
const audioErrou = new Audio('audio/errou.mp3');

function sorteiaCor(){
    let corSorteada = Math.floor(Math.random() * engine.cores.length);
    let legendaCorCaixa = document.getElementById('cor-caixa');
    let nomeCorSorteada = engine.cores[corSorteada];

    legendaCorCaixa.innerText = nomeCorSorteada.toUpperCase();
    
    return engine.hexadecimais[nomeCorSorteada];
}

function corDaCaixa(nomeDaCor){
    let caixaDasCores = document.getElementById('cor-atual');
    
    caixaDasCores.style.backgroundColor = nomeDaCor;
    caixaDasCores.style.backgroundImage = "url('/img/caixa-fechada.png')";
    caixaDasCores.style.backgroundSize = "100%";
}

function atualizaPontuacao(valor){
    let pontuacao = document.getElementById('pontuacao-atual');

    engine.moedas += valor;

    if(valor < 0){
        audioErrou.play();
    } else{
        audioMoeda.play();
    }

    pontuacao.innerText = engine.moedas;
}

corDaCaixa(sorteiaCor());

// API DE RECONHECIMENTO DE VOZ
var btnGravador = document.getElementById('btn-responder');
var transcricaoAudio = "";
var respostaCorreta = "";

if(window.SpeechRecognition || window.webkitSpeechRecognition){
    var SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    var gravador = new SpeechAPI();

    gravador.continuos = false;
    gravador.lang = "en-US";

    gravador.onstart = function(){
        btnGravador.innerText = "Estou ouvindo";

        btnGravador.style.backgroundColor = "white";
        btnGravador.style.color = "black";
    }

    gravador.onend = function(){
        btnGravador.innerText = "Responder";

        btnGravador.style.backgroundColor = "transparent";
        btnGravador.style.color = "white";
    }

    gravador.onresult = (event) =>{
        transcricaoAudio = event.results[0][0].transcript.toUpperCase();
        respostaCorreta = document.getElementById('cor-caixa').innerText.toUpperCase();

        if(transcricaoAudio === respostaCorreta){
            atualizaPontuacao(1);
        }else{
            atualizaPontuacao(-1);
        }

        corDaCaixa(sorteiaCor());
    }
}else{
    alert('não tem suporte');
}


btnGravador.addEventListener('click', function(e){
    gravador.start();
  })