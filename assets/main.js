String.prototype.inserir = function (palavra, index) {
    return index > 0
        ? this.replace(new RegExp('.{' + index + '}'), '$&' + palavra)
        : palavra + this;
};

const palavras = {
    'a': [
        'Avião',
        'Abelha',
        'Anel'
    ],
    'e': [
        'Estrela',
        'Elefante',
        'Escova'
    ],
    'i': [
        'Ilha',
        'Igreja',
        'Ioiô'
    ],
    'o': [
        'Onça',
        'Ônibus',
        'Ovo'
    ],
    'u': [
        'Uva',
        'Urso',
        'Unicórnio'
    ],
};

function criarAsPalavrasParaAView() {

    for (let letra in palavras) {
        adicionarPalavraNaView(letra)
    }
}

function adicionarPalavraNaView(vogal) {
    let palavra = '';
    const identificador = vogal.toUpperCase();

    for (let posicao in palavras[vogal]) {
        palavra = criarPalavraEmHTML(palavras[vogal][posicao], vogal, posicao);
        document.getElementById('palavra' + identificador + posicao).innerHTML = palavra;
    }
}

function criarPalavraEmHTML(palavra, vogal, index) {
    const palavraOriginal = palavra;
    let palavraParaAview = '';

    while (palavra === palavraOriginal) {
        palavra = palavra.split('').sort(function () {
            return 0.5 - Math.random()
        }).join('');
    }

    const posicaoDasLetrasRandom = Math.floor(Math.random() * 3) + 1;

    palavra = adicionaLetraRandomNoMeio(posicaoDasLetrasRandom, palavra);
    palavra = adicionaLetraRandomNoInicioENoMeio(posicaoDasLetrasRandom, palavra);
    palavra = adicionaLetraRandomNoInicioMeioEFinal(posicaoDasLetrasRandom, palavra);

    let contador = 0;

    while (contador < palavra.length) {
        palavraParaAview += '<span class="letra-clicavel" data-vogal="' + vogal + '" data-letra="' + palavra[contador] + '" data-index="' + index + '">' + palavra[contador] + '</span>';
        contador++;
    }

    return '<a>' + palavraParaAview + '</a>';
}

function adicionaLetraRandomNoMeio(posicaoDaLetraRandom, palavra) {
    if (posicaoDaLetraRandom === 1) {
        palavra = palavra.inserir(letraRandom(palavra), Math.floor(palavra.length / 2));
    }

    return palavra;
}


function adicionaLetraRandomNoInicioENoMeio(posicaoDaLetraRandom, palavra) {
    if (posicaoDaLetraRandom === 2) {
        palavra = palavra.inserir(letraRandom(palavra), Math.floor(palavra.length / 2));
    }

    return palavra;
}

function adicionaLetraRandomNoInicioMeioEFinal(posicaoDaLetraRandom, palavra) {
    if (posicaoDaLetraRandom === 3) {
        palavra = palavra + letraRandom(palavra);
    }

    return palavra;
}

function letraRandom(letrasParaRemover) {
    let letras = "ÔãôóABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";

    let contador = 0;

    while (contador < letrasParaRemover.length) {
        letras = letras.replace(letrasParaRemover[contador], '');
        contador++;
    }

    const string_length = 1;
    let letraRandom = '';
    let numero;
    for (let i = 0; i < string_length; i++) {
        numero = Math.floor(Math.random() * letras.length);
        letraRandom += letras.substring(numero, numero + 1);
    }

    return letraRandom;
}

$(document).on('click', '.letra-clicavel', function (e) {
    const letra = $(this).data('letra');
    const vogal = $(this).data('vogal');
    const posicao = $(this).data('index');
    const palavra = palavras[vogal][posicao];

    if (palavra.indexOf(letra) > -1) {
        $(this).addClass('letra-aceita');
    }

    if ($(this).parent().find('.letra-aceita').length === palavra.length) {
        $(this).parent().parent().html('<a class="palavra-correta" id="palavra-correta'+palavra+'">' + palavra + '</a>');
        $('#palavra-correta'+palavra).parent().parent().addClass('letras-aceitas');
    }

    e.stopImmediatePropagation();
});

$(document).on('click', '.letra', function(e)
{
   const idParaExibir = $(this).data('exibir');
   $('.letra').removeClass('letra-ativa');
   $('.container-da-vogal').hide();
   $('#'+idParaExibir).show();
   $(this).addClass('letra-ativa');
   e.stopImmediatePropagation();
});

criarAsPalavrasParaAView();