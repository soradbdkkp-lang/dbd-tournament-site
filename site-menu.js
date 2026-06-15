(function () {
    "use strict";

    const menu = document.querySelector(".mobile-menu");

    if (!menu) {
        return;
    }

    const trigger = menu.querySelector(".mobile-menu__trigger");
    const panel = menu.querySelector(".mobile-menu__panel");
    const closeButton = menu.querySelector(".mobile-menu__close");
    const closeTargets = menu.querySelectorAll("[data-menu-close]");
    let restoreFocus = false;

    function setMenuOpen(isOpen) {
        menu.classList.toggle("is-open", isOpen);
        trigger.setAttribute("aria-expanded", String(isOpen));
        panel.setAttribute("aria-hidden", String(!isOpen));
        document.body.classList.toggle("has-open-menu", isOpen);

        if (isOpen) {
            restoreFocus = true;
            closeButton.focus();
        } else if (restoreFocus) {
            restoreFocus = false;
            trigger.focus();
        }
    }

    trigger.addEventListener("click", () => {
        const isOpen = trigger.getAttribute("aria-expanded") === "true";
        setMenuOpen(!isOpen);
    });

    closeTargets.forEach((target) => {
        target.addEventListener("click", () => setMenuOpen(false));
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menu.classList.contains("is-open")) {
            setMenuOpen(false);
        }
    });
})();
