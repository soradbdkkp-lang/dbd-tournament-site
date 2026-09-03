(function () {
  const eventData = window.FROGCUP_EVENT;
  if (!eventData) return;

  function joinPath(base, file) {
    return `${base.replace(/\/?$/, "/")}${file}`;
  }

  function getInitialStageId(root) {
    const requested = root.dataset.initialStage || eventData.initialStageId;
    const requestedStage = eventData.stages.find((stage) => stage.id === requested);
    if (requestedStage) return requestedStage.id;

    const firstPublic = eventData.stages.find((stage) => stage.status === "public");
    return firstPublic ? firstPublic.id : eventData.stages[0].id;
  }

  function makeTabs(root, options) {
    const initialStageId = getInitialStageId(root);
    const tablist = document.createElement("div");
    const panels = document.createElement("div");
    const tabs = [];
    const panelMap = new Map();

    tablist.className = "stage-tabs";
    tablist.setAttribute("role", "tablist");
    tablist.setAttribute("aria-label", options.label);
    panels.className = "stage-panels";

    eventData.stages.forEach((stage) => {
      const selected = stage.id === initialStageId;
      const tab = document.createElement("button");
      tab.className = "stage-tab";
      tab.type = "button";
      tab.id = `${options.idPrefix}-tab-${stage.id}`;
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-selected", selected ? "true" : "false");
      tab.setAttribute("aria-controls", `${options.idPrefix}-panel-${stage.id}`);
      tab.tabIndex = selected ? 0 : -1;
      tab.textContent = stage.label;
      tab.addEventListener("click", () => selectTab(stage.id, true));
      tabs.push(tab);
      tablist.appendChild(tab);

      const panel = document.createElement("section");
      panel.className = "stage-panel";
      panel.id = `${options.idPrefix}-panel-${stage.id}`;
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", tab.id);
      panel.hidden = !selected;
      options.renderPanel(panel, stage, root);
      panelMap.set(stage.id, panel);
      panels.appendChild(panel);
    });

    function selectTab(stageId, moveFocus) {
      tabs.forEach((tab) => {
        const selected = tab.id === `${options.idPrefix}-tab-${stageId}`;
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
      selectTab(nextTab.id.replace(`${options.idPrefix}-tab-`, ""), true);
    });

    root.append(tablist, panels);
  }

  function renderCommentators() {
    document.querySelectorAll("[data-commentators]").forEach((root) => {
      const imageBase = root.dataset.commentatorImageBase || "";
      const grid = document.createElement("div");
      grid.className = "commentator-grid";

      eventData.commentators.forEach((person) => {
        const card = document.createElement("article");
        const image = document.createElement("img");
        const name = document.createElement("h3");
        const links = document.createElement("div");
        const xLink = document.createElement("a");
        const twitchLink = document.createElement("a");

        card.className = "commentator-card";
        image.src = joinPath(imageBase, person.imageFile);
        image.alt = `${person.name}の画像`;
        image.loading = "lazy";
        image.decoding = "async";
        image.width = 240;
        image.height = 240;
        name.textContent = person.name;
        links.className = "commentator-links";

        xLink.href = person.links.x;
        xLink.target = "_blank";
        xLink.rel = "noopener noreferrer";
        xLink.setAttribute("aria-label", `${person.name}のXを開く`);
        xLink.textContent = "X";

        twitchLink.href = person.links.twitch;
        twitchLink.target = "_blank";
        twitchLink.rel = "noopener noreferrer";
        twitchLink.setAttribute("aria-label", `${person.name}のTwitchを開く`);
        twitchLink.textContent = "Twitch";

        links.append(xLink, twitchLink);
        card.append(image, name, links);
        grid.appendChild(card);
      });

      root.replaceChildren(grid);
    });
  }

  function renderTimetable() {
    const root = document.querySelector("[data-event-timetable]");
    if (!root) return;

    eventData.timetable.forEach((group) => {
      const section = document.createElement("section");
      const heading = document.createElement("h3");
      const list = document.createElement("ol");

      section.className = "timeline-group";
      heading.textContent = group.stageLabel;
      list.className = "timeline-list";

      group.matches.forEach((match) => {
        const item = document.createElement("li");
        const time = document.createElement("time");
        const matchup = document.createElement("span");

        item.className = "timeline-item";
        time.className = "timeline-item__time";
        time.dateTime = match.startTime;
        time.textContent = match.displayTime;
        matchup.className = "timeline-item__match";
        matchup.textContent = match.matchup;

        item.append(time, matchup);
        list.appendChild(item);
      });

      section.append(heading, list);
      root.appendChild(section);
    });
  }

  function renderMapPanel(panel, stage, root) {
    const imageBase = root.dataset.mapImageBase || "";
    const pool = eventData.mapPools[stage.id];
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

    const note = document.createElement("p");
    note.className = "secret-note";
    note.textContent = eventData.bonusMapNotice;
    panel.appendChild(note);

    const grid = document.createElement("div");
    grid.className = "map-card-grid";

    pool.maps.forEach((map) => {
      const card = document.createElement("article");
      const image = document.createElement("img");
      const title = document.createElement("h4");

      card.className = "map-card";
      image.src = joinPath(imageBase, map.imageFile);
      image.alt = map.name;
      image.loading = "lazy";
      image.decoding = "async";
      image.width = 640;
      image.height = 360;
      title.textContent = map.name;

      card.append(image, title);
      grid.appendChild(card);
    });

    panel.appendChild(grid);
  }

  function renderMapPools() {
    document.querySelectorAll("[data-map-pools]").forEach((root) => {
      makeTabs(root, {
        idPrefix: "map-pool",
        label: "MAPプールのステージ選択",
        renderPanel: renderMapPanel
      });
    });
  }

  renderCommentators();
  renderTimetable();
  renderMapPools();
})();
