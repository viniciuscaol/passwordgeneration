const btn = document.getElementById('btn');
const senhaE = document.getElementById('senha');
const copy = document.getElementById('copy');
const qaunt = document.getElementById('caracteres');

// Função para criar uma senha
const criarSenha = () => {
    const comprimento = parseInt(qaunt.value);

    // Validar o comprimento da senha
    if (isNaN(comprimento) || comprimento < 4 || comprimento > 20) {
        alert('A senha deve conter no mínimo 4 e no máximo 20 caracteres.');
        return;
    }

    let senha = '';
    const maiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const minusculas = 'abcdefghijklmnopqrstuvwxyz';
    const numeros = '0123456789';
    const caracteres = '!@#$%^&*()-_=+';
    const todoConteudo = maiusculas + minusculas + numeros + caracteres;

    // Garantir pelo menos um caractere de cada conjunto
    senha += maiusculas[Math.floor(Math.random() * maiusculas.length)];
    senha += minusculas[Math.floor(Math.random() * minusculas.length)];
    senha += numeros[Math.floor(Math.random() * numeros.length)];
    senha += caracteres[Math.floor(Math.random() * caracteres.length)];

    // Preencher o resto do comprimento da senha com caracteres aleatórios
    while (senha.length < comprimento) {
        senha += todoConteudo[Math.floor(Math.random() * todoConteudo.length)];
    }

    // Embaralhar a senha para garantir que os caracteres garantidos estejam distribuídos aleatoriamente
    senha = senha.split('').sort(() => 0.5 - Math.random()).join('');
    senhaE.value = senha;
}

// Evento para gerar a senha ao clicar no botão
btn.addEventListener('click', criarSenha);

// Evento para copiar a senha para a área de transferência
copy.addEventListener('click', () => {
    senhaE.select();
    document.execCommand('copy');
    alert('Copiado para área de transferência');
});
