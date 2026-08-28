(function () {
  const root = document.querySelector("[data-killer-cards]");
  const data = window.FROGCUP_KILLERS;

  if (!root || !data) return;

  const statusMeta = {
    allowed: { label: "使用可能", cardLabel: "使用可能", icon: "", className: "is-ok" },
    banned: { label: "使用禁止", cardLabel: "使用禁止", icon: "!", className: "is-danger" },
    provisional: { label: "暫定使用可能", cardLabel: "暫定使用可能", icon: "?", className: "is-pending" }
  };

  const bonusMeta = {
    "public-yes": { label: "ボーナスあり", icon: "★", className: "is-bonus" },
    "public-no": { label: "ボーナスなし", icon: "−", className: "is-muted" },
    undecided: { label: "ボーナス未確定", icon: "?", className: "is-pending" },
    secret: { label: "ボーナス非公開", icon: "−", className: "is-muted" }
  };

  const aliases = {
    onryo: ["怨霊", "貞子"],
    mastermind: ["マスターマインド", "ウェスカー"],
    slasher: ["ジェイソン"]
  };

  const ruleFilterOptions = [
    { value: "all", label: "すべて", matches: () => true },
    { value: "restricted", label: "個別制限あり", matches: (killer) => hasIndividualRestriction(killer) },
    { value: "unrestricted", label: "個別制限なし", matches: (killer) => !hasIndividualRestriction(killer) },
    { value: "banned", label: "使用禁止", matches: (killer) => killer.status === "banned" },
    { value: "provisional", label: "暫定使用可能", matches: (killer) => killer.status === "provisional" }
  ];

  const bonusFilterOptions = [
    { value: "all", label: "ボーナス状態すべて", matches: () => true },
    { value: "public-yes", label: "ボーナスあり", matches: (killer) => killer.bonusStatus === "public-yes" },
    { value: "public-no", label: "ボーナスなし", matches: (killer) => killer.bonusStatus === "public-no" },
    { value: "undecided", label: "ボーナス未確定", matches: (killer) => killer.bonusStatus === "undecided" },
    { value: "secret", label: "ボーナス非公開", matches: (killer) => killer.bonusStatus === "secret" }
  ];

  const sortOptions = [
    { value: "initial", label: "初期順" },
    { value: "name", label: "名前順" },
    { value: "restricted", label: "個別制限ありを優先" },
    { value: "status", label: "使用禁止・暫定使用可能を優先" },
    { value: "bonus-yes", label: "ボーナスありを優先" },
    { value: "bonus-no", label: "ボーナスなしを優先" },
    { value: "bonus-undecided", label: "ボーナス未確定を優先" },
    { value: "bonus-secret", label: "ボーナス非公開を優先" }
  ];

  const bonusSearchKeywords = {
    "public-yes": ["ボーナスあり", "あり"],
    "public-no": ["ボーナスなし", "なし"],
    undecided: ["ボーナス未確定", "未確定"],
    secret: ["ボーナス非公開", "非公開"]
  };

  let lastFocusedCard = null;
  let visibleItems = [];
  let locateTimer = null;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function hasIndividualRestriction(killer) {
    return killer.status === "banned" || killer.status === "provisional" || killer.restrictions.length > 0;
  }

  function makeBadge(icon, label, className) {
    const badge = document.createElement("span");
    badge.className = `killer-badge ${className}`;
    badge.innerHTML = `${icon ? `<span aria-hidden="true">${icon}</span>` : ""}<span>${label}</span>`;
    return badge;
  }

  function makeList(items, emptyText) {
    if (!items.length) {
      const p = document.createElement("p");
      p.className = "killer-dialog__empty";
      p.textContent = emptyText;
      return p;
    }

    const ul = document.createElement("ul");
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });
    return ul;
  }

  function makeSelect(id, label, options) {
    return `
      <label class="killer-controls__field" for="${id}">
        <span>${label}</span>
        <select id="${id}">
          ${options.map((option) => `<option value="${option.value}">${option.label}</option>`).join("")}
        </select>
      </label>
    `;
  }

  function makeControls() {
    const controls = document.createElement("div");
    const id = `killer-controls-${Math.random().toString(36).slice(2)}`;
    controls.className = "killer-controls";
    controls.innerHTML = `
      <label class="killer-controls__field killer-controls__field--search" for="${id}-search">
        <span>キラー名検索</span>
        <input id="${id}-search" type="search" autocomplete="off" inputmode="search" placeholder="キラー名・別名・ボーナス状態">
      </label>
      <div class="killer-controls__actions">
        <button class="button button--ghost killer-controls__button" type="button" data-killer-move>最初の結果へ移動</button>
        <button class="button button--ghost killer-controls__button" type="button" data-killer-clear>検索解除</button>
        <button class="button button--ghost killer-controls__button" type="button" data-killer-reset>すべてリセット</button>
      </div>
      ${makeSelect(`${id}-rule-filter`, "個別制限・使用可否", ruleFilterOptions)}
      ${makeSelect(`${id}-bonus-filter`, "ボーナス状態", bonusFilterOptions)}
      ${makeSelect(`${id}-sort`, "並び替え", sortOptions)}
      <p class="killer-controls__count" aria-live="polite"></p>
      <p class="killer-controls__empty" aria-live="polite" hidden>該当するキラーが見つかりません</p>
    `;
    return controls;
  }

  function makeDialog() {
    const dialog = document.createElement("div");
    dialog.className = "killer-dialog";
    dialog.hidden = true;
    dialog.innerHTML = `
      <div class="killer-dialog__backdrop" data-killer-dialog-close></div>
      <section class="killer-dialog__panel" role="dialog" aria-modal="true" aria-labelledby="killer-dialog-title" tabindex="-1">
        <button class="killer-dialog__close" type="button" data-killer-dialog-close aria-label="詳細を閉じる">×</button>
        <div class="killer-dialog__header">
          <img class="killer-dialog__image" alt="" width="180" height="225">
          <div>
            <p class="meta">キラー詳細</p>
            <h2 id="killer-dialog-title"></h2>
            <div class="killer-dialog__badges"></div>
          </div>
        </div>
        <div class="killer-dialog__body"></div>
      </section>
    `;
    document.body.appendChild(dialog);
    return dialog;
  }

  const controls = makeControls();
  const searchInput = controls.querySelector("input[type='search']");
  const ruleFilter = controls.querySelector("select[id$='rule-filter']");
  const bonusFilter = controls.querySelector("select[id$='bonus-filter']");
  const sortSelect = controls.querySelector("select[id$='sort']");
  const countLabel = controls.querySelector(".killer-controls__count");
  const emptyMessage = controls.querySelector(".killer-controls__empty");
  const moveButton = controls.querySelector("[data-killer-move]");
  const clearButton = controls.querySelector("[data-killer-clear]");
  const resetButton = controls.querySelector("[data-killer-reset]");

  const dialog = makeDialog();
  const dialogPanel = dialog.querySelector(".killer-dialog__panel");
  const dialogTitle = dialog.querySelector("#killer-dialog-title");
  const dialogImage = dialog.querySelector(".killer-dialog__image");
  const dialogBadges = dialog.querySelector(".killer-dialog__badges");
  const dialogBody = dialog.querySelector(".killer-dialog__body");
  const closeButton = dialog.querySelector(".killer-dialog__close");

  function addDialogSection(title, content) {
    const section = document.createElement("section");
    section.className = "killer-dialog__section";
    const heading = document.createElement("h3");
    heading.textContent = title;
    section.appendChild(heading);
    section.appendChild(content);
    dialogBody.appendChild(section);
  }

  function getRestrictionBadge(killer) {
    const restricted = hasIndividualRestriction(killer);
    return {
      icon: restricted ? "!" : "✓",
      label: restricted ? "個別制限あり" : "個別制限なし",
      className: restricted ? "is-warning" : "is-ok"
    };
  }

  function getTermNotes(killer) {
    return (killer.terms || []).map((termId) => data.addonTerms[termId]).filter(Boolean);
  }

  function normalizeSearchText(value) {
    return value.normalize("NFKC").toLowerCase().replace(/\s+/g, "");
  }

  function getSearchTarget(killer) {
    return normalizeSearchText([killer.name, ...(aliases[killer.id] || [])].join(" "));
  }

  function getBonusSearchStatus(query) {
    return Object.entries(bonusSearchKeywords).find(([, keywords]) => {
      return keywords.some((keyword) => normalizeSearchText(keyword) === query);
    })?.[0] || null;
  }

  function matchesSearch(killer, query) {
    if (!query) return true;

    const bonusStatus = getBonusSearchStatus(query);
    if (bonusStatus) return killer.bonusStatus === bonusStatus;

    return getSearchTarget(killer).includes(query);
  }

  function openDialog(killer, opener) {
    const status = statusMeta[killer.status];
    const restriction = getRestrictionBadge(killer);
    const bonus = bonusMeta[killer.bonusStatus];
    const restrictionItems = [...killer.restrictions, ...getTermNotes(killer)];

    lastFocusedCard = opener;
    dialogTitle.textContent = killer.name;
    dialogImage.src = killer.image;
    dialogImage.alt = `${killer.name}のキラー画像`;
    dialogBadges.replaceChildren(
      makeBadge(status.icon, status.label, status.className),
      makeBadge(restriction.icon, restriction.label, restriction.className),
      makeBadge(bonus.icon, bonus.label, bonus.className)
    );
    dialogBody.replaceChildren();

    addDialogSection("使用可否", makeList([status.label], ""));
    addDialogSection("キラー固有の制限", makeList(restrictionItems, "個別制限なし"));
    addDialogSection("共通キラールール", makeList(data.commonRules, ""));
    addDialogSection("共通禁止パーク", makeList(data.commonBannedPerks, ""));
    addDialogSection("共通条件付きパーク", makeList(data.commonConditionalPerks, ""));
    addDialogSection("ボーナス状態", makeList([bonus.label], ""));

    document.body.classList.add("is-dialog-open");
    dialog.hidden = false;
    closeButton.focus();
  }

  function closeDialog() {
    if (dialog.hidden) return;
    dialog.hidden = true;
    document.body.classList.remove("is-dialog-open");
    if (lastFocusedCard) lastFocusedCard.focus();
  }

  function keepFocusInDialog(event) {
    if (dialog.hidden || event.key !== "Tab") return;

    const focusable = [...dialogPanel.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')]
      .filter((element) => !element.disabled && element.offsetParent !== null);
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function makeCard(killer) {
    const status = statusMeta[killer.status];
    const restriction = getRestrictionBadge(killer);
    const bonus = bonusMeta[killer.bonusStatus];

    const card = document.createElement("button");
    card.className = "killer-card";
    card.type = "button";
    card.setAttribute("aria-label", `${killer.name}の詳細を見る`);
    card.innerHTML = `
      <span class="killer-card__media">
        <img src="${killer.image}" alt="${killer.name}" loading="lazy" width="320" height="400">
        <span class="killer-card__overlay" aria-hidden="true">
          <span class="killer-card__overlay-inner">
            <span>${status.icon ? `${status.icon} ` : ""}${status.cardLabel}</span>
            <span>${restriction.icon} ${restriction.label}</span>
            <span>${bonus.icon} ${bonus.label}</span>
            <strong>クリックで詳細</strong>
          </span>
        </span>
      </span>
      <span class="killer-card__name">${killer.name}</span>
      <span class="killer-card__status">
        <span class="killer-badge ${status.className}">${status.icon ? `<span aria-hidden="true">${status.icon}</span>` : ""}<span>${status.cardLabel}</span></span>
        <span class="killer-badge ${restriction.className}"><span aria-hidden="true">${restriction.icon}</span><span>${restriction.label}</span></span>
        <span class="killer-badge ${bonus.className}"><span aria-hidden="true">${bonus.icon}</span><span>${bonus.label}</span></span>
        <span class="killer-card__detail">詳細を見る</span>
      </span>
    `;
    card.addEventListener("click", () => openDialog(killer, card));
    return card;
  }

  function getSortedItems(items) {
    return [...items].sort((a, b) => {
      if (sortSelect.value === "name") {
        return a.killer.name.localeCompare(b.killer.name, "ja") || a.index - b.index;
      }
      if (sortSelect.value === "restricted") {
        return Number(hasIndividualRestriction(b.killer)) - Number(hasIndividualRestriction(a.killer)) || a.index - b.index;
      }
      if (sortSelect.value === "status") {
        const rank = { banned: 2, provisional: 1, allowed: 0 };
        return rank[b.killer.status] - rank[a.killer.status] || a.index - b.index;
      }
      if (sortSelect.value.startsWith("bonus-")) {
        const target = {
          "bonus-yes": "public-yes",
          "bonus-no": "public-no",
          "bonus-undecided": "undecided",
          "bonus-secret": "secret"
        }[sortSelect.value];
        return Number(b.killer.bonusStatus === target) - Number(a.killer.bonusStatus === target) || a.index - b.index;
      }
      return a.index - b.index;
    });
  }

  function renderCards() {
    const query = normalizeSearchText(searchInput.value);
    const ruleOption = ruleFilterOptions.find((option) => option.value === ruleFilter.value);
    const bonusOption = bonusFilterOptions.find((option) => option.value === bonusFilter.value);

    visibleItems = getSortedItems(data.killers
      .map((killer, index) => ({ killer, index }))
      .filter(({ killer }) => matchesSearch(killer, query) && ruleOption.matches(killer) && bonusOption.matches(killer)));

    grid.replaceChildren(...visibleItems.map(({ killer }) => makeCard(killer)));
    countLabel.textContent = `${data.killers.length}件中${visibleItems.length}件表示`;
    emptyMessage.hidden = visibleItems.length > 0;
    moveButton.disabled = visibleItems.length === 0;
  }

  function moveToFirstResult() {
    const firstCard = grid.querySelector(".killer-card");
    if (!firstCard) return;

    grid.querySelectorAll(".killer-card.is-located").forEach((card) => {
      card.classList.remove("is-located");
    });

    if (locateTimer) {
      window.clearTimeout(locateTimer);
    }

    firstCard.scrollIntoView({
      block: "center",
      behavior: reducedMotion.matches ? "auto" : "smooth"
    });

    firstCard.focus({ preventScroll: true });
    firstCard.classList.add("is-located");

    locateTimer = window.setTimeout(() => {
      firstCard.classList.remove("is-located");
      locateTimer = null;
    }, 1400);
  }

  function clearSearch() {
    searchInput.value = "";
    renderCards();
    searchInput.focus();
  }

  function resetAll() {
    searchInput.value = "";
    ruleFilter.value = "all";
    bonusFilter.value = "all";
    sortSelect.value = "initial";
    renderCards();
    searchInput.focus();
  }

  const grid = document.createElement("div");
  grid.className = "killer-card-grid";
  root.append(controls, grid);
  renderCards();

  searchInput.addEventListener("input", renderCards);
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      moveToFirstResult();
    } else if (event.key === "Escape" && dialog.hidden) {
      event.preventDefault();
      clearSearch();
    }
  });
  ruleFilter.addEventListener("change", renderCards);
  bonusFilter.addEventListener("change", renderCards);
  sortSelect.addEventListener("change", renderCards);
  moveButton.addEventListener("click", moveToFirstResult);
  clearButton.addEventListener("click", clearSearch);
  resetButton.addEventListener("click", resetAll);

  dialog.addEventListener("click", (event) => {
    if (event.target.closest("[data-killer-dialog-close]")) closeDialog();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !dialog.hidden) {
      closeDialog();
      return;
    }
    keepFocusInDialog(event);
  });
})();
