const perguntas = [
    {
        texto: 'Qual linguagem é usada para estruturar o conteúdo de uma página?',
        opcoes: ['CSS', 'HTML', 'JavaScript', 'Python'],
        resposta: 'HTML',
        explicacao: 'HTML é a linguagem responsável pela estrutura da página.'
    },
    {
        texto: 'Qual linguagem é usada para estilizar uma página web?',
        opcoes: ['CSS', 'SQL', 'Java', 'PHP'],
        resposta: 'CSS',
        explicacao: 'CSS define cores, tamanhos, espaçamentos e layout.'
    },
    {
        texto: 'No JavaScript, qual comando pode criar uma variável?',
        opcoes: ['let', 'body', 'style', 'section'],
        resposta: 'let',
        explicacao: 'let é usado para declarar variáveis em JavaScript.'
    },
    {
        texto: 'Qual evento acontece quando o usuário clica em um botão?',
        opcoes: ['submit', 'click', 'change', 'load'],
        resposta: 'click',
        explicacao: 'O evento click é acionado quando há um clique.'
    },
    {
        texto: 'Para que serve o DOM?',
        opcoes: [
            'Para salvar arquivos no computador',
            'Para acessar e manipular elementos da página',
            'Para trocar a internet do navegador',
            'Para criar imagens automaticamente'
        ],
        resposta: 'Para acessar e manipular elementos da página',
        explicacao: 'O DOM permite que o JavaScript encontre e altere elementos HTML.'
    }
];

let indiceAtual = 0;
let pontos = 0;
let respondeu = false;

const perguntaElemento = document.getElementById('pergunta');
const opcoesElemento = document.getElementById('opcoes');
const feedbackElemento = document.getElementById('feedback');
const proximaBotao = document.getElementById('proxima');
const contadorElemento = document.getElementById('contador');
const pontuacaoElemento = document.getElementById('pontuacao');
const progressoElemento = document.getElementById('progresso');

function carregarPergunta() {
    respondeu = false;
    feedbackElemento.textContent = '';
    proximaBotao.disabled = true;

    const perguntaAtual = perguntas[indiceAtual];
    perguntaElemento.textContent = perguntaAtual.texto;
    contadorElemento.textContent = `Pergunta ${indiceAtual + 1} de ${perguntas.length}`;
    pontuacaoElemento.textContent = `Pontuação: ${pontos}`;
    progressoElemento.style.width = `${(indiceAtual / perguntas.length) * 100}%`;
    opcoesElemento.innerHTML = '';

    perguntaAtual.opcoes.forEach((opcao) => {
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.className = 'opcao';
        botao.textContent = opcao;
        botao.addEventListener('click', () => verificarResposta(botao, opcao));
        opcoesElemento.appendChild(botao);
    });
}

function verificarResposta(botaoClicado, opcaoEscolhida) {
    if (respondeu) return;

    respondeu = true;
    const perguntaAtual = perguntas[indiceAtual];
    const botoes = document.querySelectorAll('.opcao');

    botoes.forEach((botao) => {
        botao.disabled = true;
        if (botao.textContent === perguntaAtual.resposta) {
            botao.classList.add('correta');
        }
    });

    if (opcaoEscolhida === perguntaAtual.resposta) {
        pontos += 10;
        feedbackElemento.textContent = `Resposta correta! ${perguntaAtual.explicacao}`;
    } else {
        botaoClicado.classList.add('errada');
        feedbackElemento.textContent = `Resposta incorreta. ${perguntaAtual.explicacao}`;
    }

    pontuacaoElemento.textContent = `Pontuação: ${pontos}`;
    proximaBotao.disabled = false;
}

function avancarPergunta() {
    indiceAtual += 1;

    if (indiceAtual < perguntas.length) {
        carregarPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    progressoElemento.style.width = '100%';
    perguntaElemento.textContent = pontos >= 40 ? 'Excelente desempenho!' : 'Quiz finalizado!';
    opcoesElemento.innerHTML = '';
    contadorElemento.textContent = 'Fim do jogo';
    pontuacaoElemento.textContent = `Pontuação final: ${pontos}`;
    feedbackElemento.textContent = `Você fez ${pontos} pontos de ${perguntas.length * 10}.`;
    proximaBotao.textContent = 'Jogar novamente';
    proximaBotao.disabled = false;
    proximaBotao.removeEventListener('click', avancarPergunta);
    proximaBotao.addEventListener('click', reiniciarQuiz);
}

function reiniciarQuiz() {
    indiceAtual = 0;
    pontos = 0;
    proximaBotao.textContent = 'Próxima pergunta';
    proximaBotao.removeEventListener('click', reiniciarQuiz);
    proximaBotao.addEventListener('click', avancarPergunta);
    carregarPergunta();
}

proximaBotao.addEventListener('click', avancarPergunta);
carregarPergunta();
