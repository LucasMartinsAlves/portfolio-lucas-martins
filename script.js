const botaoMenu = document.querySelector(".botao-menu");
const menu = document.querySelector(".menu");
const formulario = document.querySelector(".formulario");
const retorno = document.querySelector(".retorno");
const mensagemPreview = document.querySelector(".mensagem-preview");

// Controla a abertura do menu em telas menores.
botaoMenu.addEventListener("click", () => {
  const menuEstaAberto = menu.classList.toggle("aberto");
  botaoMenu.setAttribute("aria-expanded", String(menuEstaAberto));
});

document.querySelectorAll(".menu a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
  });
});

// Exibe mensagens de erro ao lado de cada campo do formulário.
function definirErro(campo, mensagem) {
  const erro = document.querySelector(`[data-erro="${campo}"]`);
  erro.textContent = mensagem;
}

function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Monta a prévia da mensagem sem enviar dados para servidor.
function adicionarCampoPreview(lista, rotulo, valor) {
  const grupo = document.createElement("div");
  const titulo = document.createElement("dt");
  const conteudo = document.createElement("dd");

  titulo.textContent = rotulo;
  conteudo.textContent = valor;

  grupo.append(titulo, conteudo);
  lista.appendChild(grupo);
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = formulario.nome.value.trim();
  const email = formulario.email.value.trim();
  const mensagem = formulario.mensagem.value.trim();
  let valido = true;

  // Limpa mensagens anteriores para validar o estado atual do formulário.
  definirErro("nome", "");
  definirErro("email", "");
  definirErro("mensagem", "");
  retorno.textContent = "";

  if (nome.length < 2) {
    definirErro("nome", "Informe seu nome.");
    valido = false;
  }

  if (!emailValido(email)) {
    definirErro("email", "Informe um e-mail válido.");
    valido = false;
  }

  if (mensagem.length < 10) {
    definirErro("mensagem", "Escreva uma mensagem com pelo menos 10 caracteres.");
    valido = false;
  }

  if (!valido) {
    retorno.textContent = "Revise os campos destacados antes de enviar.";
    return;
  }

  const listaPreview = document.createElement("dl");
  mensagemPreview.replaceChildren(listaPreview);
  adicionarCampoPreview(listaPreview, "Nome", nome);
  adicionarCampoPreview(listaPreview, "Email", email);
  adicionarCampoPreview(listaPreview, "Mensagem", mensagem);

  formulario.reset();
  retorno.textContent = "Mensagem enviada com sucesso!";
});
