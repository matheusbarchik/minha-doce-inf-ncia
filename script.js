//carrossel de locais
const imagens = [
  { src: 'foto (38).jpeg', legenda: 'Fachada' },
  { src: 'parqueLateral.jpeg', legenda: 'Parque lateral' },
  { src: 'parqueFundos.jpeg', legenda: 'Parque fundos' },
  { src: 'secretaria.jpeg', legenda: 'Secretaria' },
  { src: 'solario.jpeg', legenda: 'Solário' },
  { src: 'sala de aula.jpeg', legenda: 'Sala de aula' },
  { src: 'refeitorio.jpeg', legenda: 'Refeitório' },
  { src: 'fraldario.jpeg', legenda: 'Fraldário' },
];

let indiceAtual = 0;

function mudarImagem(direcao) {
  indiceAtual += direcao;

  if (indiceAtual < 0) {
    indiceAtual = imagens.length - 1;
  } else if (indiceAtual >= imagens.length) {
    indiceAtual = 0;
  }

  document.getElementById('imagem').src = imagens[indiceAtual].src;
  document.getElementById('imagem').alt = imagens[indiceAtual].legenda;
  document.getElementById('legenda').textContent = imagens[indiceAtual].legenda;
}

// Botão flutuante rola até contato
document.getElementById('btnContato').addEventListener('click', () => {
  document.getElementById('contato').scrollIntoView({ behavior: 'smooth' });
});

// Validação do formulário de contato
document.getElementById('formContato').addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();
  const status = document.getElementById('mensagemStatus');

  if (!nome || !email || !mensagem) {
    status.textContent = 'Por favor, preencha todos os campos.';
    status.style.color = 'red';
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    status.textContent = 'Por favor, insira um e-mail válido.';
    status.style.color = 'red';
    return;
  }

  fetch('https://script.google.com/macros/s/AKfycbx-ewdoc6dbA3RaXa91zs3bFmJSkRfi9sDa5EiEXEMe65hqhNDQIkXbDA1tyNypWY5K0g/exec?', {
    method: 'POST',
    body: JSON.stringify({ nome, email, mensagem }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(data => {
    if (data.status === 'sucesso') {
      status.textContent = 'Mensagem enviada com sucesso!';
      status.style.color = 'green';
      document.getElementById('formContato').reset();
    } else {
      status.textContent = 'Erro ao enviar. Tente novamente.';
      status.style.color = 'red';
    }
  })
  .catch(() => {
    status.textContent = 'Erro de conexão. Tente novamente.';
    status.style.color = 'red';
  });
});


  // Limpa os campos
  document.getElementById('formContato').reset();
