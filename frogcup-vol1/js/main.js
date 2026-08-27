const ENTRY_FORM_URL = "https://forms.gle/X2tXc4W1FcSjMnoN9";

function setupEntryLinks() {
  document.querySelectorAll("[data-entry-link]").forEach((link) => {
    if (ENTRY_FORM_URL) {
      link.setAttribute("href", ENTRY_FORM_URL);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
      link.removeAttribute("aria-disabled");
      link.textContent = link.dataset.entryLabel || link.textContent;
      return;
    }

    link.removeAttribute("href");
    link.setAttribute("aria-disabled", "true");
    link.setAttribute("role", "link");
    link.textContent = "応募フォーム準備中";
    link.addEventListener("click", (event) => event.preventDefault());
  });
}

setupEntryLinks();
