const config = window.SITE_CONFIG ?? {};
const cabecalho = document.querySelector(".site-header, #cabecalho");
const menuBotao = document.querySelector(".menu-toggle, #menuMobile");
const menu = document.getElementById("menu-principal") ?? document.getElementById("menu");
const menuBackdrop = document.getElementById("menuBackdrop");
const menuAntigo = menu?.id === "menu";
const breakpointMobile = window.matchMedia("(max-width: 960px)");

function preencherTexto(seletor, valor) {
  if (!valor) return;

  document.querySelectorAll(seletor).forEach((elemento) => {
    elemento.textContent = valor;
  });
}

function configurarWhatsApp() {
  const numero = String(config.whatsappNumber ?? "").replace(/\D/g, "");
  const numeroValido = /^\d{10,15}$/.test(numero);

  if (!numeroValido) {
    document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
      link.addEventListener("click", (evento) => {
        evento.preventDefault();
        window.alert("O WhatsApp ainda não foi configurado para este site.");
      });
    });
    return "";
  }

  const mensagem = encodeURIComponent(
    "Olá! Gostaria de consultar as condições para coleta de eletrônicos."
  );

  document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    link.href = `https://wa.me/${numero}?text=${mensagem}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  return numero;
}

function configurarContatos(numeroWhatsApp) {
  const email = String(config.email ?? "").trim();

  document.querySelectorAll("[data-email-link]").forEach((link) => {
    if (!email) return;
    link.href = `mailto:${email}`;
    link.textContent = email;
    link.hidden = false;
  });

  document.querySelectorAll("[data-phone-link]").forEach((link) => {
    if (!numeroWhatsApp) return;
    link.href = `tel:+${numeroWhatsApp}`;
    link.textContent = `+${numeroWhatsApp}`;
    link.hidden = false;
  });
}

function definirMenuAberto(aberto, devolverFoco = false) {
  if (!menu || !menuBotao) return;

  if (menuAntigo) {
    menu.classList.toggle("ativo", aberto);
    menuBotao.classList.toggle("ativo", aberto);
    menuBackdrop?.classList.toggle("ativo", aberto);
    menuBackdrop?.setAttribute("aria-hidden", String(!aberto));
  } else {
    menu.classList.toggle("is-open", aberto);
    menu.hidden = breakpointMobile.matches && !aberto;
  }

  document.body.classList.toggle("menu-aberto", aberto);
  menuBotao.setAttribute("aria-expanded", String(aberto));
  menuBotao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");

  const textoAcessivel = menuBotao.querySelector(".sr-only");
  if (textoAcessivel) {
    textoAcessivel.textContent = aberto ? "Fechar menu" : "Abrir menu";
  }

  if (aberto) {
    menu.querySelector("a[href]")?.focus({ preventScroll: true });
  } else if (devolverFoco) {
    menuBotao.focus({ preventScroll: true });
  }
}

preencherTexto("[data-business-name]", config.businessName);
preencherTexto("[data-region]", config.region);
configurarContatos(configurarWhatsApp());

const ano = document.getElementById("current-year") ?? document.getElementById("ano");
if (ano) ano.textContent = String(new Date().getFullYear());

if (cabecalho) {
  const atualizarCabecalho = () => {
    const classe = menuAntigo ? "rolando" : "is-scrolled";
    cabecalho.classList.toggle(classe, window.scrollY > 30);
  };

  atualizarCabecalho();
  window.addEventListener("scroll", atualizarCabecalho, { passive: true });
}

if (menuBotao && menu) {
  const seletorLinksMenu = menuAntigo ? "a[href]" : 'a[href^="#"]';

  menuBotao.addEventListener("click", () => {
    definirMenuAberto(menuBotao.getAttribute("aria-expanded") !== "true");
  });

  menu.querySelectorAll(seletorLinksMenu).forEach((link) => {
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

    if (!menuAntigo || evento.key !== "Tab") return;

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
  // Sem IntersectionObserver: mostra todo o conteúdo de imediato (não fica oculto).
  document.querySelectorAll(".revelar").forEach((elemento) => elemento.classList.add("visivel"));
}

const siteUrl = String(config.siteUrl ?? "").replace(/\/$/, "");
if (siteUrl.startsWith("https://")) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: config.businessName || "Coleta de Eletrônicos",
    url: siteUrl,
    description: config.description || ""
  };

  if (config.email) organization.email = config.email;
  if (config.publicAddress) {
    organization.address = {
      "@type": "PostalAddress",
      streetAddress: config.publicAddress
    };
  }

  const dadosEstruturados = document.createElement("script");
  dadosEstruturados.type = "application/ld+json";
  dadosEstruturados.textContent = JSON.stringify(organization);
  document.head.append(dadosEstruturados);
}
