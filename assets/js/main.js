const cabecalho = document.getElementById("cabecalho");
const menuBotao = document.getElementById("menuMobile");
const menu = document.getElementById("menu");
const menuBackdrop = document.getElementById("menuBackdrop");
const breakpointMobile = window.matchMedia("(max-width: 960px)");

function definirMenuAberto(aberto, devolverFoco = false) {
  if (!menu || !menuBotao) return;

  menu.classList.toggle("ativo", aberto);
  menuBotao.classList.toggle("ativo", aberto);
  menuBackdrop?.classList.toggle("ativo", aberto);
  menuBackdrop?.setAttribute("aria-hidden", String(!aberto));

  document.body.classList.toggle("menu-aberto", aberto);
  menuBotao.setAttribute("aria-expanded", String(aberto));
  menuBotao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");

  if (aberto) {
    menu.querySelector("a[href]")?.focus({ preventScroll: true });
  } else if (devolverFoco) {
    menuBotao.focus({ preventScroll: true });
  }
}

const ano = document.getElementById("ano");
if (ano) ano.textContent = String(new Date().getFullYear());

if (cabecalho) {
  const atualizarCabecalho = () => {
    cabecalho.classList.toggle("rolando", window.scrollY > 30);
  };

  atualizarCabecalho();
  window.addEventListener("scroll", atualizarCabecalho, { passive: true });
}

if (menuBotao && menu) {
  menuBotao.addEventListener("click", () => {
    definirMenuAberto(menuBotao.getAttribute("aria-expanded") !== "true");
  });

  menu.querySelectorAll("a[href]").forEach((link) => {
    link.addEventListener("click", () => {
      definirMenuAberto(false, link.target === "_blank");
    });
  });

  menuBackdrop?.addEventListener("click", () => definirMenuAberto(false, true));

  document.addEventListener("keydown", (evento) => {
    if (menuBotao.getAttribute("aria-expanded") !== "true") return;

    if (evento.key === "Escape") {
      evento.preventDefault();
      definirMenuAberto(false, true);
      return;
    }

    if (evento.key !== "Tab") return;

    const links = [...menu.querySelectorAll("a[href]")];
    const primeiroLink = links[0];
    const ultimoLink = links[links.length - 1];

    if (evento.shiftKey && document.activeElement === primeiroLink) {
      evento.preventDefault();
      ultimoLink?.focus();
    } else if (!evento.shiftKey && document.activeElement === ultimoLink) {
      evento.preventDefault();
      primeiroLink?.focus();
    }
  });

  breakpointMobile.addEventListener("change", () => definirMenuAberto(false));
  definirMenuAberto(false);
}

if ("IntersectionObserver" in window) {
  const elementosRevelados = document.querySelectorAll(".revelar");
  const observador = new IntersectionObserver(
    (entradas, observadorAtual) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        entrada.target.classList.add("visivel");
        observadorAtual.unobserve(entrada.target);
      });
    },
    { threshold: 0.14 }
  );

  elementosRevelados.forEach((elemento) => observador.observe(elemento));
} else {
  document.querySelectorAll(".revelar").forEach((elemento) => elemento.classList.add("visivel"));
}