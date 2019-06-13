String.prototype.inserir = function(palavra, index) {
    return index > 0
        ? this.replace(new RegExp('.{' + index + '}'), '$&' + palavra)
        : palavra + this;
};

const palavras = {
    a: [
        'Avião',
        'Abelha',
        'Anel'
    ],
    e: [
        'Estrela',
        'Elefante',
        'Escova'
    ],
    i: [
        'Ilha',
        'Igreja',
        'Ioiô'
    ],
    o: [
        'Onça',
        'Ônibus',
        'Ovo'
    ],
    u: [
       'Uva',
       'Urso',
       'Unicórnio'
    ],
};

function criarAsPalavrasParaAView()
{
    let palavra = '';
   for (let posicaoA in palavras.a) {
        palavra = criarPalavraEmHTML(palavras.a[posicaoA], 'a', posicaoA);
        document.getElementById('palavraA'+posicaoA).innerHTML = palavra;
    }

    for (let posicaoE in palavras.e) {
        palavra = criarPalavraEmHTML(palavras.e[posicaoE], 'a', posicaoE);
        document.getElementById('palavraE'+posicaoE).innerHTML = palavra;
    }

    for (let posicaoI in palavras.i) {
        palavra = criarPalavraEmHTML(palavras.i[posicaoI], 'a', posicaoI);
        document.getElementById('palavraI'+posicaoI).innerHTML = palavra;
    }

    for (let posicaoO in palavras.o) {
        palavra = criarPalavraEmHTML(palavras.o[posicaoO], 'a', posicaoO);
        document.getElementById('palavraO'+posicaoO).innerHTML = palavra;
    }

    for (let posicaoU in palavras.u) {
        palavra = criarPalavraEmHTML(palavras.u[posicaoU], 'a', posicaoU);
        document.getElementById('palavraU'+posicaoU).innerHTML = palavra;
    }
}

function criarPalavraEmHTML(palavra, vogal, index)
{
    const palavraOriginal = palavra;
    let palavraParaAview = '';

    while (palavra === palavraOriginal) {
        palavra = palavra.split('').sort(function(){return 0.5-Math.random()}).join('');
    }

    const posicaoDasLetrasRandom = Math.floor(Math.random() * 3) + 1;

    palavra = adicionaLetraRandomNoMeio(posicaoDasLetrasRandom, palavra);
    palavra = adicionaLetraRandomNoInicioENoMeio(posicaoDasLetrasRandom, palavra);
    palavra = adicionaLetraRandomNoInicioMeioEFinal(posicaoDasLetrasRandom, palavra);

    let contador = 0;

    while (contador < palavra.length) {
        palavraParaAview += '<span class="letra-clicavel" data-vogal="'+vogal+'" data-letra="'+palavra[contador]+'" data-index="'+index+'">'+palavra[contador]+'</span>';
        contador++;
    }

    return '<a>'+palavraParaAview+'</a>';
}

function adicionaLetraRandomNoMeio(posicaoDaLetraRandom, palavra)
{
    if(posicaoDaLetraRandom === 1) {
        palavra = palavra.inserir(letraRandom(palavra), Math.floor(palavra.length / 2));
    }

    return palavra;
}


function adicionaLetraRandomNoInicioENoMeio(posicaoDaLetraRandom, palavra)
{
    if(posicaoDaLetraRandom === 2) {
        palavra = palavra.inserir(letraRandom(palavra));
        palavra = palavra.inserir(letraRandom(palavra), Math.floor(palavra.length / 2));
    }

    return palavra;
}

function adicionaLetraRandomNoInicioMeioEFinal(posicaoDaLetraRandom, palavra)
{
    if(posicaoDaLetraRandom === 3) {
        palavra = palavra.inserir(letraRandom(palavra));
        palavra = palavra.inserir(letraRandom(palavra), Math.floor(palavra.length / 2));
        palavra = palavra + letraRandom(palavra);
    }

    return palavra;
}

function letraRandom(letrasParaRemover)
{
    let letras = "ÔãôóABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";

    let contador = 0;

    while (contador < letrasParaRemover.length) {
        letras = letras.replace(letrasParaRemover[contador],'');
        contador++;
    }

    const string_length = 1;
    let letraRandom = '';
    let numero;
    for (let i=0; i<string_length; i++) {
        numero = Math.floor(Math.random() * letras.length);
        letraRandom += letras.substring(numero,numero+1);
    }

    return letraRandom;
}

$(document).on('click', '.letra-clicavel', function (e){
    const letra = $(this).data('letra');
    const vogal = $(this).data('vogal');
    const posicao =  $(this).data('index');
    const palavra = palavras[vogal][posicao];

    if (palavra.indexOf(letra) > -1) {
        $(this).addClass('letra-aceita');
    }

    if($(this).parent().find('.letra-aceita').length === palavra.length) {
        $(this).parent().html('<p class="palavra-correta">'+palavra+'</p>')
    }

    e.stopImmediatePropagation();
});

criarAsPalavrasParaAView();