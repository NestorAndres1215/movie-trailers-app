// Toggle del menú móvil
document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (!menuBtn || !mobileMenu) return; // Salir si no existen los elementos

    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
        // Opcional: alternar aria-expanded para accesibilidad
        const expanded = menuBtn.getAttribute("aria-expanded") === "true";
        menuBtn.setAttribute("aria-expanded", (!expanded).toString());
    });
});


tailwind.config = {
    theme: {
        extend: {
            colors: {
                netflix: {
                    red: '#E50914',
                    black: '#141414',
                    dark: '#221f1f',
                }
            },
            fontFamily: {
                sans: ['"Bebas Neue"', 'sans-serif'],
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const title = document.getElementById("main-title");
    const filmIcon = document.getElementById("film-icon");
    const text = document.getElementById("main-text");
    const buttons = document.getElementById("main-buttons");
    const buttonItems = buttons.querySelectorAll("a");

    // Animación título y icono
    setTimeout(() => {
        title.classList.remove("opacity-0", "translate-y-10");
        filmIcon.classList.remove("scale-0");
        // Bounce del icono
        filmIcon.classList.add("animate-bounce");
    }, 100);

    // Animación texto
    setTimeout(() => text.classList.remove("opacity-0", "translate-y-6"), 300);

    // Animación botones secuencial
    setTimeout(() => {
        buttons.classList.remove("opacity-0", "translate-y-6");
        buttonItems.forEach((btn, i) => {
            setTimeout(() => {
                btn.classList.add("scale-105");
                setTimeout(() => btn.classList.remove("scale-105"), 300);
            }, i * 200); // delay entre botones
        });
    }, 500);
});