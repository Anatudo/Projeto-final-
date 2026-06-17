const formulario = document.getElementById('formContato');
const statusFormulario = document.getElementById('statusFormulario');

function mostrarErro(campo, mensagem) {
    const container = campo.closest('.campo');
    const erro = container.querySelector('.erro');
    erro.textContent = mensagem;
}

function limparErros() {
    const erros = document.querySelectorAll('.erro');
    erros.forEach((erro) => {
        erro.textContent = '';
    });
    statusFormulario.textContent = '';
    statusFormulario.className = 'status';
}

function validarFormulario(evento) {
    evento.preventDefault();
    limparErros();

    const nome = document.getElementById('nome');
    const data = document.getElementById('data');
    const idade = document.getElementById('idade');
    const assunto = document.getElementById('assunto');
    const mensagem = document.getElementById('mensagem');
    const termos = document.getElementById('termos');
    const preferencia = document.querySelector('input[name="preferencia"]:checked');

    let valido = true;
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const dataSelecionada = new Date(data.value + 'T00:00:00');

    if (nome.value.trim().length < 3) {
        mostrarErro(nome, 'Digite um nome com pelo menos 3 caracteres.');
        valido = false;
    }

    if (!data.value || dataSelecionada < hoje) {
        mostrarErro(data, 'Escolha uma data atual ou futura.');
        valido = false;
    }

    if (!idade.value || Number(idade.value) < 12 || Number(idade.value) > 120) {
        mostrarErro(idade, 'Digite uma idade válida entre 12 e 120 anos.');
        valido = false;
    }

    if (!assunto.value) {
        mostrarErro(assunto, 'Selecione um assunto.');
        valido = false;
    }

    if (!preferencia) {
        const grupoRadio = document.querySelector('fieldset.grupo .erro');
        grupoRadio.textContent = 'Escolha uma preferência de contato.';
        valido = false;
    }

    if (!termos.checked) {
        mostrarErro(termos, 'Confirme que as informações estão corretas.');
        valido = false;
    }

    if (mensagem.value.trim().length < 10) {
        mostrarErro(mensagem, 'A mensagem deve ter pelo menos 10 caracteres.');
        valido = false;
    }

    if (valido) {
        statusFormulario.textContent = 'Formulário validado com sucesso! O envio de e-mail não foi implementado.';
        statusFormulario.classList.add('sucesso');
        formulario.reset();
    }
}

formulario.addEventListener('submit', validarFormulario);
