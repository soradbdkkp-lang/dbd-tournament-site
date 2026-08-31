(function () {
  const data = window.FROGCUP_KILLERS;
  if (!data) return;

  const eventData = window.FROGCUP_EVENT;
  const roots = document.querySelectorAll("[data-killer-cards]");
  if (!roots.length) return;

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

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let lastFocusedCard = null;
  let locateTimer = null;

  const dialog = makeDialog();
  const dialogPanel = dialog.querySelector(".killer-dialog__panel");
  const dialogTitle = dialog.querySelector("#killer-dialog-title");
  const dialogImage = dialog.querySelector(".killer-dialog__image");
  const dialogBadges = dialog.querySelector(".killer-dialog__badges");
  const dialogBody = dialog.querySelector(".killer-dialog__body");
  const closeButton = dialog.querySelector(".killer-dialog__close");

  function hasIndividualRestriction(killer) {
    return killer.status === "banned" || killer.status === "provisional" || killer.restrictions.length > 0;
  }

  function makeBadge(icon, label, className) {
    const badge = document.createElement("span");
    const text = document.createElement("span");
    badge.className = `killer-badge ${className}`;
    if (icon) {
      const iconElement = document.createElement("span");
      iconElement.setAttribute("aria-hidden", "true");
      iconElement.textContent = icon;
      badge.appendChild(iconElement);
    }
    text.textContent = label;
    badge.appendChild(text);
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

  function makeDialog() {
    const dialogElement = document.createElement("div");
    dialogElement.className = "killer-dialog";
    dialogElement.hidden = true;

    const backdrop = document.createElement("div");
    backdrop.className = "killer-dialog__backdrop";
    backdrop.dataset.killerDialogClose = "";

    const panel = document.createElement("section");
    panel.className = "killer-dialog__panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.setAttribute("aria-labelledby", "killer-dialog-title");
    panel.tabIndex = -1;

    const close = document.createElement("button");
    close.className = "killer-dialog__close";
    close.type = "button";
    close.dataset.killerDialogClose = "";
    close.setAttribute("aria-label", "詳細を閉じる");
    close.textContent = "×";

    const header = document.createElement("div");
    header.className = "killer-dialog__header";

    const image = document.createElement("img");
    image.className = "killer-dialog__image";
    image.alt = "";
    image.width = 180;
    image.height = 225;

    const headerText = document.createElement("div");
    const meta = document.createElement("p");
    meta.className = "meta";
    meta.textContent = "キラー詳細";
    const title = document.createElement("h2");
    title.id = "killer-dialog-title";
    const badges = document.createElement("div");
    badges.className = "killer-dialog__badges";
    headerText.append(meta, title, badges);
    header.append(image, headerText);

    const body = document.createElement("div");
    body.className = "killer-dialog__body";

    panel.append(close, header, body);
    dialogElement.append(backdrop, panel);
    document.body.appendChild(dialogElement);
    return dialogElement;
  }

  function addDialogSection(title, content) {
    const section = document.createElement("section");
    section.className = "killer-dialog__section";
    const heading = document.createElement("h3");
    heading.textContent = title;
    section.append(heading, content);
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

  function matchesSearch(killer, query, mode) {
    if (!query) return true;
    if (mode !== "bonus-pool") {
      const bonusStatus = getBonusSearchStatus(query);
      if (bonusStatus) return killer.bonusStatus === bonusStatus;
    }
    return getSearchTarget(killer).includes(query);
  }

  function openDialog(killer, opener, context) {
    const status = statusMeta[killer.status];
    const restriction = getRestrictionBadge(killer);
    const bonus = context?.stageLabel
      ? { icon: "★", label: `${context.stageLabel}のボーナス対象`, className: "is-bonus" }
      : bonusMeta[killer.bonusStatus];
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

  function appendBadgeRow(parent, badges) {
    badges.forEach((badge) => parent.appendChild(makeBadge(badge.icon, badge.label, badge.className)));
  }

  function makeCard(killer, context) {
    const status = statusMeta[killer.status];
    const restriction = getRestrictionBadge(killer);
    const bonus = context?.stageLabel
      ? { icon: "★", label: "ボーナス対象", className: "is-bonus" }
      : bonusMeta[killer.bonusStatus];

    const card = document.createElement("button");
    card.className = "killer-card";
    card.type = "button";
    card.setAttribute("aria-label", `${killer.name}の詳細を見る`);

    const media = document.createElement("span");
    media.className = "killer-card__media";
    const image = document.createElement("img");
    image.src = killer.image;
    image.alt = killer.name;
    image.loading = "lazy";
    image.width = 320;
    image.height = 400;
    media.appendChild(image);

    const overlay = document.createElement("span");
    overlay.className = "killer-card__overlay";
    overlay.setAttribute("aria-hidden", "true");
    const overlayInner = document.createElement("span");
    overlayInner.className = "killer-card__overlay-inner";
    [status, restriction, bonus].forEach((badge) => {
      const text = document.createElement("span");
      text.textContent = `${badge.icon ? `${badge.icon} ` : ""}${badge.cardLabel || badge.label}`;
      overlayInner.appendChild(text);
    });
    const detail = document.createElement("strong");
    detail.textContent = "クリックで詳細";
    overlayInner.appendChild(detail);
    overlay.appendChild(overlayInner);
    media.appendChild(overlay);

    const name = document.createElement("span");
    name.className = "killer-card__name";
    name.textContent = killer.name;

    const statusRow = document.createElement("span");
    statusRow.className = "killer-card__status";
    appendBadgeRow(statusRow, [status, restriction, bonus]);
    const detailLabel = document.createElement("span");
    detailLabel.className = "killer-card__detail";
    detailLabel.textContent = "詳細を見る";
    statusRow.appendChild(detailLabel);

    card.append(media, name, statusRow);
    card.addEventListener("click", () => openDialog(killer, card, context));
    return card;
  }

  function makeSelect(id, label, options) {
    const field = document.createElement("label");
    field.className = "killer-controls__field";
    field.setAttribute("for", id);
    const text = document.createElement("span");
    text.textContent = label;
    const select = document.createElement("select");
    select.id = id;
    options.forEach((option) => {
      const item = document.createElement("option");
      item.value = option.value;
      item.textContent = option.label;
      select.appendChild(item);
    });
    field.append(text, select);
    return field;
  }

  function makeControls(showBonusFilter) {
    const controls = document.createElement("div");
    const id = `killer-controls-${Math.random().toString(36).slice(2)}`;
    controls.className = "killer-controls";

    const searchField = document.createElement("label");
    searchField.className = "killer-controls__field killer-controls__field--search";
    searchField.setAttribute("for", `${id}-search`);
    const searchLabel = document.createElement("span");
    searchLabel.textContent = "キラー名検索";
    const searchInput = document.createElement("input");
    searchInput.id = `${id}-search`;
    searchInput.type = "search";
    searchInput.autocomplete = "off";
    searchInput.inputMode = "search";
    searchInput.placeholder = showBonusFilter ? "キラー名・別名・ボーナス状態" : "キラー名・別名";
    searchField.append(searchLabel, searchInput);

    const actions = document.createElement("div");
    actions.className = "killer-controls__actions";
    [
      ["move", "最初の結果へ移動"],
      ["clear", "検索解除"],
      ["reset", "すべてリセット"]
    ].forEach(([key, label]) => {
      const button = document.createElement("button");
      button.className = "button button--ghost killer-controls__button";
      button.type = "button";
      button.dataset[`killer${key[0].toUpperCase()}${key.slice(1)}`] = "";
      button.textContent = label;
      actions.appendChild(button);
    });

    controls.append(
      searchField,
      actions,
      makeSelect(`${id}-rule-filter`, "個別制限・使用可否", ruleFilterOptions)
    );

    if (showBonusFilter) {
      controls.appendChild(makeSelect(`${id}-bonus-filter`, "ボーナス状態", bonusFilterOptions));
    }
    controls.appendChild(makeSelect(`${id}-sort`, "並び替え", sortOptions));

    const count = document.createElement("p");
    count.className = "killer-controls__count";
    count.setAttribute("aria-live", "polite");
    const empty = document.createElement("p");
    empty.className = "killer-controls__empty";
    empty.setAttribute("aria-live", "polite");
    empty.hidden = true;
    empty.textContent = "該当するキラーが見つかりません";
    controls.append(count, empty);

    return controls;
  }

  function getSortedItems(items, sortValue) {
    return [...items].sort((a, b) => {
      if (sortValue === "name") {
        return a.killer.name.localeCompare(b.killer.name, "ja") || a.index - b.index;
      }
      if (sortValue === "restricted") {
        return Number(hasIndividualRestriction(b.killer)) - Number(hasIndividualRestriction(a.killer)) || a.index - b.index;
      }
      if (sortValue === "status") {
        const rank = { banned: 2, provisional: 1, allowed: 0 };
        return rank[b.killer.status] - rank[a.killer.status] || a.index - b.index;
      }
      if (sortValue.startsWith("bonus-")) {
        const target = {
          "bonus-yes": "public-yes",
          "bonus-no": "public-no",
          "bonus-undecided": "undecided",
          "bonus-secret": "secret"
        }[sortValue];
        return Number(b.killer.bonusStatus === target) - Number(a.killer.bonusStatus === target) || a.index - b.index;
      }
      return a.index - b.index;
    });
  }

  function makeKillerBrowser(root, options = {}) {
    const showBonusFilter = options.mode !== "bonus-pool";
    const controls = makeControls(showBonusFilter);
    const searchInput = controls.querySelector("input[type='search']");
    const ruleFilter = controls.querySelector("select[id$='rule-filter']");
    const bonusFilter = controls.querySelector("select[id$='bonus-filter']");
    const sortSelect = controls.querySelector("select[id$='sort']");
    const countLabel = controls.querySelector(".killer-controls__count");
    const emptyMessage = controls.querySelector(".killer-controls__empty");
    const moveButton = controls.querySelector("[data-killer-move]");
    const clearButton = controls.querySelector("[data-killer-clear]");
    const resetButton = controls.querySelector("[data-killer-reset]");
    const grid = document.createElement("div");
    let visibleItems = [];

    grid.className = options.gridClassName || "killer-card-grid";
    root.append(controls, grid);

    function getBaseItems() {
      const allowedIds = options.killerIds ? new Set(options.killerIds) : null;
      return data.killers
        .map((killer, index) => ({ killer, index }))
        .filter(({ killer }) => !allowedIds || allowedIds.has(killer.id));
    }

    function renderCards() {
      const query = normalizeSearchText(searchInput.value);
      const ruleOption = ruleFilterOptions.find((option) => option.value === ruleFilter.value);
      const bonusOption = bonusFilter
        ? bonusFilterOptions.find((option) => option.value === bonusFilter.value)
        : { matches: () => true };

      visibleItems = getSortedItems(
        getBaseItems().filter(({ killer }) => {
          return matchesSearch(killer, query, options.mode) && ruleOption.matches(killer) && bonusOption.matches(killer);
        }),
        sortSelect.value
      );

      grid.replaceChildren(...visibleItems.map(({ killer }) => makeCard(killer, options.context)));
      countLabel.textContent = `${getBaseItems().length}件中${visibleItems.length}件表示`;
      emptyMessage.hidden = visibleItems.length > 0;
      moveButton.disabled = visibleItems.length === 0;
    }

    function moveToFirstResult() {
      const firstCard = grid.querySelector(".killer-card");
      if (!firstCard) return;

      grid.querySelectorAll(".killer-card.is-located").forEach((card) => {
        card.classList.remove("is-located");
      });

      if (locateTimer) window.clearTimeout(locateTimer);

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
      if (bonusFilter) bonusFilter.value = "all";
      sortSelect.value = "initial";
      renderCards();
      searchInput.focus();
    }

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
    if (bonusFilter) bonusFilter.addEventListener("change", renderCards);
    sortSelect.addEventListener("change", renderCards);
    moveButton.addEventListener("click", moveToFirstResult);
    clearButton.addEventListener("click", clearSearch);
    resetButton.addEventListener("click", resetAll);
    renderCards();
  }

  function getInitialStageId(root) {
    const requested = root.dataset.initialStage || eventData?.initialStageId;
    const requestedStage = eventData?.stages.find((stage) => stage.id === requested);
    if (requestedStage) return requestedStage.id;

    const firstPublic = eventData?.stages.find((stage) => stage.status === "public");
    return firstPublic ? firstPublic.id : eventData?.stages[0]?.id;
  }

  function makeStageTabs(root) {
    if (!eventData) return;

    const initialStageId = getInitialStageId(root);
    const tablist = document.createElement("div");
    const panels = document.createElement("div");
    const tabs = [];
    const panelMap = new Map();
    const idPrefix = "bonus-killer";

    tablist.className = "stage-tabs";
    tablist.setAttribute("role", "tablist");
    tablist.setAttribute("aria-label", "ボーナスキラーのステージ選択");
    panels.className = "stage-panels";

    eventData.stages.forEach((stage) => {
      const selected = stage.id === initialStageId;
      const tab = document.createElement("button");
      tab.className = "stage-tab";
      tab.type = "button";
      tab.id = `${idPrefix}-tab-${stage.id}`;
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-selected", selected ? "true" : "false");
      tab.setAttribute("aria-controls", `${idPrefix}-panel-${stage.id}`);
      tab.tabIndex = selected ? 0 : -1;
      tab.textContent = stage.label;
      tab.addEventListener("click", () => selectTab(stage.id, true));
      tabs.push(tab);
      tablist.appendChild(tab);

      const panel = document.createElement("section");
      panel.className = "stage-panel";
      panel.id = `${idPrefix}-panel-${stage.id}`;
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", tab.id);
      panel.hidden = !selected;
      renderBonusPanel(panel, stage);
      panelMap.set(stage.id, panel);
      panels.appendChild(panel);
    });

    function selectTab(stageId, moveFocus) {
      tabs.forEach((tab) => {
        const selected = tab.id === `${idPrefix}-tab-${stageId}`;
        tab.setAttribute("aria-selected", selected ? "true" : "false");
        tab.tabIndex = selected ? 0 : -1;
        if (selected && moveFocus) tab.focus({ preventScroll: true });
      });

      panelMap.forEach((panel, id) => {
        panel.hidden = id !== stageId;
      });
    }

    tablist.addEventListener("keydown", (event) => {
      const currentIndex = tabs.indexOf(document.activeElement);
      if (currentIndex < 0) return;

      const nextIndexByKey = {
        ArrowRight: (currentIndex + 1) % tabs.length,
        ArrowDown: (currentIndex + 1) % tabs.length,
        ArrowLeft: (currentIndex - 1 + tabs.length) % tabs.length,
        ArrowUp: (currentIndex - 1 + tabs.length) % tabs.length,
        Home: 0,
        End: tabs.length - 1
      };

      if (!(event.key in nextIndexByKey)) return;
      event.preventDefault();
      const nextTab = tabs[nextIndexByKey[event.key]];
      selectTab(nextTab.id.replace(`${idPrefix}-tab-`, ""), true);
    });

    root.append(tablist, panels);
  }

  function renderBonusPanel(panel, stage) {
    const pool = eventData.bonusKillerPools[stage.id];
    const heading = document.createElement("h3");
    heading.textContent = stage.label;
    panel.appendChild(heading);

    if (!pool || pool.status === "locked") {
      const locked = document.createElement("p");
      locked.className = "locked-message";
      locked.textContent = eventData.lockedMessage;
      panel.appendChild(locked);
      return;
    }

    makeKillerBrowser(panel, {
      mode: "bonus-pool",
      killerIds: pool.killerIds,
      gridClassName: "killer-card-grid killer-card-grid--bonus",
      context: { stageLabel: stage.label }
    });
  }

  roots.forEach((root) => {
    if (root.dataset.killerCards === "bonus-pools") {
      makeStageTabs(root);
      return;
    }

    makeKillerBrowser(root);
  });

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
