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