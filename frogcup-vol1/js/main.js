function setupEntryLinks() {
  document.querySelectorAll("[data-entry-link]").forEach((link) => {
    link.removeAttribute("href");
    link.removeAttribute("target");
    link.removeAttribute("rel");
    link.setAttribute("aria-disabled", "true");
    link.setAttribute("role", "link");
    link.textContent = "応募受付は終了しました";
    link.addEventListener("click", (event) => event.preventDefault());
  });
}

setupEntryLinks();
