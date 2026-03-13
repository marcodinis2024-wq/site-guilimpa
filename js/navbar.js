/**
 * GUI LIMPA - NAVBAR GERAL
 * Estrutura Consolidada: Fetch + Mobile Toggle + Dropdowns Fixos + Hash Scroll
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. GESTÃO DE CAMINHOS (Tratamento para subpastas /pages/)
    const isPages = window.location.pathname.includes("/pages/");
    const navbarPath = isPages ? "../components/navbar.html" : "components/navbar.html";

    // 2. CARREGAMENTO ASSÍNCRONO DA NAVBAR
    fetch(navbarPath)
        .then(res => {
            if (!res.ok) throw new Error("Erro ao carregar a navbar.");
            return res.text();
        })
        .then(html => {
            // Insere a navbar no topo do body
            document.body.insertAdjacentHTML("afterbegin", html);
            
            // Inicializa as funções após o HTML existir no DOM
            initNavbar();
            handleHashScroll();
        })
        .catch(err => console.error(err));

    /**
     * FUNÇÃO PRINCIPAL: Lógica de Interação
     */
    function initNavbar() {
        const navLinks = document.querySelector(".navbar-links");
        const toggleBtn = document.getElementById("navbarToggle") || document.querySelector('.navbar-toggle');
        const dropdowns = document.querySelectorAll(".nav-item.dropdown");

        /* --- CONTROLO DO MENU MOBILE (Hambúrguer) --- */
        if (toggleBtn) {
            toggleBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                navLinks.classList.toggle("active");
            });
        }

        /* --- LÓGICA DE SUBMENUS (Dropdowns) --- */
        // Esta lógica resolve o seu problema: o menu fixa ao clicar
        dropdowns.forEach(drop => {
            const btn = drop.querySelector(".dropdown-toggle");

            if (btn) {
                btn.addEventListener("click", (e) => {
                    // Impede o salto de página e a propagação para o document
                    e.preventDefault(); 
                    e.stopPropagation();

                    const isActive = drop.classList.contains("active");

                    // 1. Fecha outros dropdowns que possam estar abertos (limpeza)
                    dropdowns.forEach(d => {
                        if (d !== drop) d.classList.remove("active");
                    });

                    // 2. Alterna o estado do menu clicado (Fixa/Desafixa)
                    if (isActive) {
                        drop.classList.remove("active");
                    } else {
                        drop.classList.add("active");
                    }
                });
            }
        });

        /* --- FECHAR TUDO AO CLICAR FORA --- */
        // Se clicar em qualquer parte do site que não seja a navbar, os menus fecham
        document.addEventListener("click", (e) => {
            if (!e.target.closest(".navbar")) {
                navLinks?.classList.remove("active");
                dropdowns.forEach(d => d.classList.remove("active"));
            }
        });

        /* --- FECHAR AO CLICAR NUM LINK DE SERVIÇO --- */
        // Garante que ao escolher um serviço, o menu não fica aberto sobre a página
        const menuLinks = document.querySelectorAll(".dropdown-menu a, .navbar-links a:not(.dropdown-toggle)");
        menuLinks.forEach(link => {
            link.addEventListener("click", () => {
                navLinks?.classList.remove("active");
                dropdowns.forEach(d => d.classList.remove("active"));
            });
        });
    }

    /**
     * FUNÇÃO DE SCROLL: Ajuste para a Navbar Fixa
     */
    function handleHashScroll() {
        // Verifica se existe um # na URL ao carregar a página
        const hash = window.location.hash;
        if (!hash) return;

        // Pequeno delay para garantir que o conteúdo da página carregou
        setTimeout(() => {
            const target = document.querySelector(hash);
            if (!target) return;

            const navbar = document.querySelector(".navbar");
            const navHeight = navbar ? navbar.offsetHeight : 100;
            
            // Cálculo da posição (Ponto de destino - altura da navbar - margem extra)
            const topPos = target.offsetTop - navHeight - 20;

            window.scrollTo({
                top: topPos,
                behavior: "smooth"
            });
        }, 300);
    }
});