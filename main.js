const btn = document.getElementById('btn');
const senhaE = document.getElementById('senha');
const copy = document.getElementById('copy');

// btn.addEventListener('click', () => {
//     const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+';
//     let senhaAleatoria = '';
//     for (let i = 0; i < 12; i++) {
//       const randomIndex = Math.floor(Math.random() * caracteres.length);
//       senhaAleatoria += caracteres[randomIndex];
//     }
//     senha.value = senhaAleatoria;
//   });
  
//   copy.addEventListener('click', () => {
//     senha.select();
//     document.execCommand('copy');
//     alert('Copiado para area de transferencia');
//   });

const criarSenha = () => {
    const comprimento = 12;
    let senha = '';
    const maiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const minusculas = 'abcdefghijklmnopqrstuvwxyz';
    // const minusculas2 = maiusculas.toLocaleLowerCase;
    const numeros = '0123456789';
    const caracteres = '!@#$%^&*()-_=+'
    const todoConteudo = maiusculas + minusculas + numeros + caracteres;

    senha += maiusculas[Math.floor(Math.random() * maiusculas.length)];
    senha += minusculas[Math.floor(Math.random() * minusculas.length)];
    senha += numeros[Math.floor(Math.random() * numeros.length)];
    senha += caracteres[Math.floor(Math.random() * caracteres.length)];

    while(comprimento > senha.length) {
        senha += todoConteudo[Math.floor(Math.random () * todoConteudo.length)]
    }

    senhaE.value = senha


}

btn.addEventListener('click',criarSenha);

copy.addEventListener('click', () => {
        senha.select();
        document.execCommand('copy');
});