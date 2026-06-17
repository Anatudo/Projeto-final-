const coordenadas = document.querySelectorAll('.coordenada');
const objetos = document.querySelectorAll('.objeto');
const instrucao = document.getElementById('instrucao');
const pontuacao = document.getElementById('pontuacao');
const reiniciar = document.getElementById('reiniciar');

let respostaAtual = [];
let selecionados = [];
let coordAtiva = null;
let acertos = 0;

function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function atualizarPontuacao() {
    pontuacao.textContent = `${acertos} de ${coordenadas.length}`;
}

function limparObjetos() {
    objetos.forEach((objeto) => {
        objeto.classList.remove('correto', 'errado');
    });
}

window.addEventListener('load', () => {
    const lista = document.querySelector('.lista');
    const coords = Array.from(lista.children);
    embaralhar(coords).forEach((coord) => lista.appendChild(coord));
});

coordenadas.forEach((coord) => {
    coord.addEventListener('click', () => {
        if (coord.classList.contains('concluida')) return;

        coordenadas.forEach((item) => item.classList.remove('ativa'));
        limparObjetos();

        coord.classList.add('ativa');
        coordAtiva = coord;
        respostaAtual = coord.dataset.itens.split(',');
        selecionados = [];
        instrucao.innerHTML = `${coord.dataset.coord}: selecione <strong>${respostaAtual[0]}</strong> e <strong>${respostaAtual[1]}</strong>.`;
    });
});

objetos.forEach((objeto) => {
    objeto.addEventListener('click', () => {
        if (!coordAtiva) {
            instrucao.textContent = 'Primeiro escolha uma coordenada.';
            return;
        }

        const nome = objeto.dataset.item;

        if (respostaAtual.includes(nome)) {
            if (!selecionados.includes(nome)) {
                selecionados.push(nome);
                objeto.classList.add('correto');
            }

            if (selecionados.length === 2) {
                acertos += 1;
                atualizarPontuacao();
                instrucao.textContent = acertos === coordenadas.length ? 'Parabéns! Você concluiu o jogo.' : 'Muito bem! Escolha a próxima coordenada.';
                coordAtiva.classList.add('concluida');
                coordAtiva.classList.remove('ativa');
                respostaAtual = [];
                selecionados = [];
                coordAtiva = null;

                setTimeout(limparObjetos, 900);
            }
        } else {
            objeto.classList.add('errado');
            setTimeout(() => objeto.classList.remove('errado'), 600);
        }
    });
});

reiniciar.addEventListener('click', () => {
    acertos = 0;
    respostaAtual = [];
    selecionados = [];
    coordAtiva = null;
    atualizarPontuacao();
    instrucao.textContent = 'Escolha uma coordenada para começar.';
    coordenadas.forEach((coord) => coord.classList.remove('ativa', 'concluida'));
    limparObjetos();
});

atualizarPontuacao();
