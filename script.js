/* Cledson Ligio Guambe — Portfólio | script.js */

const header = document.querySelector(".site-header");
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("mainNavigation");
const navigationLinks = document.querySelectorAll(".main-navigation a");
const themeToggle = document.getElementById("themeToggle");

/* Menu mobile */
function setMenuIcon(open) {
  const lines = menuToggle.querySelectorAll("span");
  lines[0].style.transform = open ? "translateY(6px) rotate(45deg)" : "";
  lines[1].style.opacity = open ? "0" : "1";
  lines[2].style.transform = open ? "translateY(-6px) rotate(-45deg)" : "";
  menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
  menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
}

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("active");
    setMenuIcon(isOpen);
  });

  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("active");
      setMenuIcon(false);
    });
  });
}

/* Header ao fazer scroll */
function updateHeader() {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 30);
}
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

/* Ano automático no footer */
const currentYear = document.getElementById("currentYear");
if (currentYear) currentYear.textContent = new Date().getFullYear();

/* Navegação suave */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (event) {
    const targetId = this.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    const headerHeight = header ? header.offsetHeight : 0;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top: targetPosition, behavior: "smooth" });
  });
});

/* Revelação das seções ao entrar na área visível */
const revealSelector = [
  ".section-header", ".about-grid", ".journey-item", ".recognition-feature",
  ".recognition-secondary", ".project", ".education-item", ".capability",
  ".technologies-list", ".contact-inner",
].join(", ");

const revealElements = document.querySelectorAll(revealSelector);
revealElements.forEach((el) => el.classList.add("reveal-element"));

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealElements.forEach((el) => revealObserver.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("is-visible"));
}

/* Atraso escalonado entre itens de uma mesma lista */
function stagger(selector, step) {
  document.querySelectorAll(selector).forEach((item, index) => {
    item.style.setProperty("--reveal-delay", `${index * step}ms`);
  });
}
stagger(".journey-item", 80);
stagger(".education-item", 80);
stagger(".capability", 70);
stagger(".project", 100);

/* Indicação da secção atual no menu */
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window && sections.length && navigationLinks.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const currentId = entry.target.getAttribute("id");
        navigationLinks.forEach((link) => {
          link.classList.toggle("current", link.getAttribute("href") === `#${currentId}`);
        });
      });
    },
    { rootMargin: "-30% 0px -60% 0px" }
  );
  sections.forEach((section) => sectionObserver.observe(section));
}

/* Movimento sutil na foto, apenas em dispositivos com rato */
const portrait = document.querySelector(".hero-portrait");
const supportsHover = window.matchMedia("(hover: hover)").matches;

if (portrait && supportsHover) {
  portrait.addEventListener("mousemove", (event) => {
    const rect = portrait.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    portrait.style.transform = `translate(${(x - 0.5) * 5}px, ${(y - 0.5) * 5}px)`;
  });
  portrait.addEventListener("mouseleave", () => {
    portrait.style.transform = "";
  });
}

/* Esc fecha o menu / fecha ao redimensionar para desktop */
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation?.classList.contains("active")) {
    navigation.classList.remove("active");
    setMenuIcon(false);
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 680 && navigation) {
    navigation.classList.remove("active");
    setMenuIcon(false);
  }
});

/* Modo escuro, com preferência guardada no dispositivo */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeToggle.querySelector("span").textContent = theme === "dark" ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro");
}

if (themeToggle) {
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (prefersDark ? "dark" : "light"));

  themeToggle.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("theme", next);
  });
}

/* Reduzir movimento, se preferido pelo utilizador */
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("reduce-motion");
}

document.documentElement.classList.add("js-enabled");
