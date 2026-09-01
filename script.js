```javascript
/* =========================================================
   CLEDSON LIGIO GUAMBE
   PORTFÓLIO — JAVASCRIPT
   Interações e comportamento
   ========================================================= */


/* =========================================================
   01. ELEMENTOS PRINCIPAIS
   ========================================================= */

const header = document.querySelector(".site-header");
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("mainNavigation");
const navigationLinks = document.querySelectorAll(
    ".main-navigation a"
);


/* =========================================================
   02. MENU MOBILE
   ========================================================= */

if (menuToggle && navigation) {

    menuToggle.addEventListener("click", function () {

        const isOpen =
            navigation.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Fechar menu"
                : "Abrir menu"
        );

        /*
         * Transformação visual dos três traços
         * em um "X".
         */

        const lines =
            menuToggle.querySelectorAll("span");

        if (isOpen) {

            lines[0].style.transform =
                "translateY(6px) rotate(45deg)";

            lines[1].style.opacity = "0";

            lines[2].style.transform =
                "translateY(-6px) rotate(-45deg)";

        } else {

            lines[0].style.transform = "";

            lines[1].style.opacity = "1";

            lines[2].style.transform = "";
        }

    });


    /*
     * Fecha o menu quando o utilizador
     * escolhe uma seção.
     */

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navigation.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Abrir menu"
            );

            const lines =
                menuToggle.querySelectorAll("span");

            lines[0].style.transform = "";
            lines[1].style.opacity = "1";
            lines[2].style.transform = "";

        });

    });

}


/* =========================================================
   03. HEADER AO FAZER SCROLL
   ========================================================= */

function updateHeader() {

    if (!header) {
        return;
    }

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


/*
 * Executa imediatamente para evitar
 * um pequeno atraso visual.
 */

updateHeader();


window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);


/* =========================================================
   04. ANO AUTOMÁTICO NO FOOTER
   ========================================================= */

const currentYear =
    document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   05. NAVEGAÇÃO SUAVE
   ========================================================= */

const internalLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );

internalLinks.forEach(function (link) {

    link.addEventListener(
        "click",
        function (event) {

            const targetId =
                this.getAttribute("href");

            /*
             * Ignora links vazios.
             */

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }


            event.preventDefault();


            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        }
    );

});


/* =========================================================
   06. REVELAÇÃO DAS SEÇÕES
   ========================================================= */

/*
 * A página não deve aparecer toda de uma vez.
 *
 * O IntersectionObserver permite revelar
 * elementos apenas quando entram na área
 * visível do navegador.
 */

const revealElements =
    document.querySelectorAll(
        ".section-header, " +
        ".about-grid, " +
        ".journey-item, " +
        ".recognition-feature, " +
        ".recognition-secondary, " +
        ".project, " +
        ".education-item, " +
        ".capability, " +
        ".technologies-list, " +
        ".contact-inner"
    );


/*
 * Criamos a classe inicial diretamente
 * pelo JavaScript para que, caso o JS
 * esteja desativado, o conteúdo continue
 * completamente visível.
 */

revealElements.forEach(function (element) {

    element.classList.add("reveal-element");

});


/*
 * Só ativamos a animação se o navegador
 * suportar IntersectionObserver.
 */

if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "is-visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -40px 0px"
            }
        );


    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });

} else {

    /*
     * Fallback para navegadores antigos.
     */

    revealElements.forEach(function (element) {

        element.classList.add(
            "is-visible"
        );

    });

}


/* =========================================================
   07. ATRASO NATURAL DOS ITENS
   ========================================================= */

/*
 * Os elementos de uma mesma lista entram
 * ligeiramente separados.
 *
 * Isso cria movimento sem parecer
 * uma animação exagerada.
 */

const journeyItems =
    document.querySelectorAll(
        ".journey-item"
    );

journeyItems.forEach(
    function (item, index) {

        item.style.setProperty(
            "--reveal-delay",
            (index * 80) + "ms"
        );

    }
);


const educationItems =
    document.querySelectorAll(
        ".education-item"
    );

educationItems.forEach(
    function (item, index) {

        item.style.setProperty(
            "--reveal-delay",
            (index * 80) + "ms"
        );

    }
);


const capabilityItems =
    document.querySelectorAll(
        ".capability"
    );

capabilityItems.forEach(
    function (item, index) {

        item.style.setProperty(
            "--reveal-delay",
            (index * 70) + "ms"
        );

    }
);


const projectItems =
    document.querySelectorAll(
        ".project"
    );

projectItems.forEach(
    function (item, index) {

        item.style.setProperty(
            "--reveal-delay",
            (index * 100) + "ms"
        );

    }
);


/* =========================================================
   08. INDICAÇÃO DA SEÇÃO ATUAL
   ========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


if (
    "IntersectionObserver" in window &&
    sections.length > 0 &&
    navigationLinks.length > 0
) {

    const sectionObserver =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const currentId =
                        entry.target.getAttribute("id");


                    navigationLinks.forEach(
                        function (link) {

                            const linkTarget =
                                link.getAttribute("href");


                            if (
                                linkTarget ===
                                "#" + currentId
                            ) {

                                link.classList.add(
                                    "current"
                                );

                            } else {

                                link.classList.remove(
                                    "current"
                                );

                            }

                        }
                    );

                });

            },
            {
                rootMargin:
                    "-30% 0px -60% 0px"
            }
        );


    sections.forEach(function (section) {

        sectionObserver.observe(section);

    });

}


/* =========================================================
   09. EFEITO DE MOVIMENTO MUITO SUTIL NA FOTO
   ========================================================= */

/*
 * Não usamos um efeito de "3D" exagerado.
 *
 * Apenas uma pequena variação baseada
 * no movimento do cursor.
 *
 * Em dispositivos touch este efeito
 * simplesmente não é utilizado.
 */

const portrait =
    document.querySelector(
        ".hero-portrait"
    );


const supportsHover =
    window.matchMedia(
        "(hover: hover)"
    ).matches;


if (
    portrait &&
    supportsHover
) {

    portrait.addEventListener(
        "mousemove",
        function (event) {

            const rect =
                portrait.getBoundingClientRect();


            const x =
                (event.clientX - rect.left) /
                rect.width;


            const y =
                (event.clientY - rect.top) /
                rect.height;


            const moveX =
                (x - 0.5) * 5;


            const moveY =
                (y - 0.5) * 5;


            portrait.style.transform =
                "translate(" +
                moveX +
                "px, " +
                moveY +
                "px)";

        }
    );


    portrait.addEventListener(
        "mouseleave",
        function () {

            portrait.style.transform =
                "";

        }
    );

}


/* =========================================================
   10. EFEITO DE HOVER NOS PROJETOS
   ========================================================= */

const projects =
    document.querySelectorAll(
        ".project"
    );


if (supportsHover) {

    projects.forEach(function (project) {

        const visual =
            project.querySelector(
                ".project-placeholder"
            );


        if (!visual) {
            return;
        }


        project.addEventListener(
            "mouseenter",
            function () {

                project.classList.add(
                    "project-hover"
                );

            }
        );


        project.addEventListener(
            "mouseleave",
            function () {

                project.classList.remove(
                    "project-hover"
                );

            }
        );

    });

}


/* =========================================================
   11. ESC PARA FECHAR O MENU
   ========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            navigation &&
            navigation.classList.contains(
                "active"
            )
        ) {

            navigation.classList.remove(
                "active"
            );


            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );


                const lines =
                    menuToggle.querySelectorAll(
                        "span"
                    );


                lines[0].style.transform = "";
                lines[1].style.opacity = "1";
                lines[2].style.transform = "";

            }

        }

    }
);


/* =========================================================
   12. FECHAR MENU AO REDIMENSIONAR
   ========================================================= */

window.addEventListener(
    "resize",
    function () {

        /*
         * Quando voltamos para desktop,
         * removemos o estado mobile.
         */

        if (
            window.innerWidth > 680 &&
            navigation
        ) {

            navigation.classList.remove(
                "active"
            );


            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );


                const lines =
                    menuToggle.querySelectorAll(
                        "span"
                    );


                lines[0].style.transform = "";
                lines[1].style.opacity = "1";
                lines[2].style.transform = "";

            }

        }

    }
);


/* =========================================================
   13. PROTEÇÃO PARA REDUÇÃO DE MOVIMENTO
   ========================================================= */

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (reducedMotion.matches) {

    document.documentElement.classList.add(
        "reduce-motion"
    );

}


/* =========================================================
   14. ESTADO INICIAL
   ========================================================= */

document.documentElement.classList.add(
    "js-enabled"
);
```
