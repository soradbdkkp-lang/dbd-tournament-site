(function () {
    "use strict";

    const ruleBook = window.frogCupVol1BasicRules;

    if (!ruleBook) {
        return;
    }

    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    let highlightTimer;

    function parseLocalDate(dateText) {
        const parts = dateText.split("-").map(Number);

        if (
            parts.length !== 3 ||
            parts.some(Number.isNaN) ||
            parts[0] < 1 ||
            parts[1] < 1 ||
            parts[1] > 12 ||
            parts[2] < 1 ||
            parts[2] > 31
        ) {
            return null;
        }

        const date = new Date(parts[0], parts[1] - 1, parts[2]);

        if (
            date.getFullYear() !== parts[0] ||
            date.getMonth() !== parts[1] - 1 ||
            date.getDate() !== parts[2]
        ) {
            return null;
        }

        date.setHours(0, 0, 0, 0);
        return date;
    }

    function isWithinUpdateNoticePeriod(dateText, today = new Date()) {
        const updateDate = parseLocalDate(dateText);

        if (!updateDate) {
            return false;
        }

        const localToday = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );
        const diffDays = Math.round(
            (localToday.getTime() - updateDate.getTime()) / millisecondsPerDay
        );

        // Future dates remain in the data but are never treated as recent updates.
        return diffDays >= 0 && diffDays <= 2;
    }

    function escapeHtml(value) {
        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function getSortedUpdates() {
        return [...ruleBook.updates].sort((a, b) => b.date.localeCompare(a.date));
    }

    function getRecentUpdates() {
        return getSortedUpdates().filter((update) =>
            isWithinUpdateNoticePeriod(update.date)
        );
    }

    function renderStatus() {
        const recentUpdates = getRecentUpdates();
        const latestUpdate = getSortedUpdates()[0];
        const pageStatus = document.getElementById("page-status");
        const lastUpdated = document.getElementById("rule-last-updated");

        document.getElementById("rule-public-label").textContent = ruleBook.publicLabel;
        document.getElementById("rule-audience").textContent = ruleBook.audience;
        lastUpdated.textContent = latestUpdate.date;
        lastUpdated.dateTime = latestUpdate.date;

        if (recentUpdates.length > 0) {
            pageStatus.textContent = "更新あり";
            pageStatus.className = "status-badge status-badge--updated";
        } else {
            pageStatus.textContent = ruleBook.statusLabel;
            pageStatus.className = "status-badge status-badge--provisional";
        }
    }

    function renderUpdates() {
        const updatesList = document.getElementById("updates-list");
        const updates = getSortedUpdates().slice(0, 3);

        updatesList.innerHTML = updates
            .map((update) => {
                const isRecent = isWithinUpdateNoticePeriod(update.date);
                const recentClass = isRecent ? " update-entry--recent" : "";
                const recentBadge = isRecent
                    ? '<span class="status-badge status-badge--updated">更新あり</span>'
                    : "";

                return `
                    <article class="update-entry${recentClass}">
                        <div class="update-entry__meta">
                            <time datetime="${escapeHtml(update.date)}">${escapeHtml(update.date)}</time>
                            ${recentBadge}
                        </div>
                        <h3>${escapeHtml(update.title)}</h3>
                        <p>${escapeHtml(update.summary)}</p>
                        <a class="target-link" href="#${escapeHtml(update.targetId)}">
                            該当箇所へ
                        </a>
                    </article>
                `;
            })
            .join("");
    }

    function renderTableOfContents() {
        const toc = document.getElementById("rules-toc");
        const recentTargetIds = new Set(getRecentUpdates().map((update) => update.targetId));

        toc.innerHTML = ruleBook.sections
            .map((section) => {
                const hasRecentUpdate =
                    recentTargetIds.has(section.id) ||
                    section.items.some((item) => recentTargetIds.has(item.id));
                let status = "";

                if (section.status === "pending") {
                    status = '<span class="toc-status toc-status--pending">未確定</span>';
                } else if (hasRecentUpdate) {
                    status = '<span class="toc-status toc-status--updated">更新あり</span>';
                }

                return `
                    <li>
                        <a href="#${escapeHtml(section.id)}">
                            <span>${escapeHtml(section.chapter)} ${escapeHtml(section.title)}</span>
                            ${status}
                        </a>
                    </li>
                `;
            })
            .join("");
    }

    function renderParagraphs(paragraphs) {
        return (paragraphs || [])
            .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
            .join("");
    }

    function renderList(items, ordered = false) {
        if (!items || items.length === 0) {
            return "";
        }

        const tag = ordered ? "ol" : "ul";
        return `<${tag}>${items
            .map((item) => `<li>${escapeHtml(item)}</li>`)
            .join("")}</${tag}>`;
    }

    function renderGroups(groups) {
        return (groups || [])
            .map(
                (group) => `
                    <div class="rule-example">
                        <p class="rule-example__label">${escapeHtml(group.label)}</p>
                        ${renderList(group.items)}
                    </div>
                `
            )
            .join("");
    }

    function renderItem(item, recentTargetIds) {
        const isRecent = recentTargetIds.has(item.id);
        const recentClass = isRecent ? " rule-item--updated" : "";
        const recentBadge = isRecent
            ? '<span class="status-badge status-badge--updated">更新あり</span>'
            : "";

        return `
            <section class="rule-item${recentClass}" id="${escapeHtml(item.id)}">
                <div class="rule-item__heading">
                    <h3>${escapeHtml(item.title)}</h3>
                    ${recentBadge}
                </div>
                ${renderParagraphs(item.body)}
                ${renderList(item.list)}
                ${renderList(item.orderedList, true)}
                ${renderGroups(item.groups)}
                ${item.note ? `<p class="rule-note">${escapeHtml(item.note)}</p>` : ""}
            </section>
        `;
    }

    function renderSections() {
        const sectionsContainer = document.getElementById("rule-sections");
        const recentTargetIds = new Set(getRecentUpdates().map((update) => update.targetId));

        sectionsContainer.innerHTML = ruleBook.sections
            .map((section) => {
                const hasRecentUpdate =
                    recentTargetIds.has(section.id) ||
                    section.items.some((item) => recentTargetIds.has(item.id));
                const sectionClasses = [
                    "chapter-card",
                    hasRecentUpdate ? "chapter-card--updated" : "",
                    section.status === "pending" ? "chapter-card--pending" : ""
                ]
                    .filter(Boolean)
                    .join(" ");
                let statusBadge = "";

                if (section.status === "pending") {
                    statusBadge = '<span class="status-badge status-badge--pending">未確定</span>';
                } else if (hasRecentUpdate) {
                    statusBadge = '<span class="status-badge status-badge--updated">更新あり</span>';
                }

                return `
                    <article class="${sectionClasses}" id="${escapeHtml(section.id)}">
                        <header class="chapter-card__heading">
                            <div>
                                <p class="chapter-card__number">${escapeHtml(section.chapter)}</p>
                                <h2>${escapeHtml(section.title)}</h2>
                            </div>
                            ${statusBadge}
                        </header>
                        ${section.summary ? `<p class="chapter-card__summary">${escapeHtml(section.summary)}</p>` : ""}
                        ${renderParagraphs(section.body)}
                        <div class="chapter-card__items">
                            ${section.items
                                .map((item) => renderItem(item, recentTargetIds))
                                .join("")}
                        </div>
                    </article>
                `;
            })
            .join("");
    }

    function highlightTarget(targetId) {
        const target = document.getElementById(targetId);

        if (!target) {
            return;
        }

        document.querySelectorAll(".is-jump-highlighted").forEach((element) => {
            element.classList.remove("is-jump-highlighted");
        });

        target.classList.add("is-jump-highlighted");
        window.clearTimeout(highlightTimer);
        highlightTimer = window.setTimeout(() => {
            target.classList.remove("is-jump-highlighted");
        }, 2400);
    }

    function moveToTarget(targetId, shouldScroll = true) {
        const target = document.getElementById(targetId);

        if (!target) {
            return;
        }

        if (shouldScroll) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        highlightTarget(targetId);
    }

    function setupTargetLinks() {
        document.addEventListener("click", (event) => {
            const link = event.target.closest('a[href^="#"]');

            if (!link) {
                return;
            }

            const targetId = link.getAttribute("href").slice(1);

            if (!document.getElementById(targetId)) {
                return;
            }

            event.preventDefault();
            history.pushState(null, "", `#${targetId}`);
            moveToTarget(targetId);
        });
    }

    function setupTabs() {
        const tabs = [...document.querySelectorAll(".rule-tab")];
        const panels = [...document.querySelectorAll("[data-rule-panel]")];

        tabs.forEach((tab) => {
            tab.addEventListener("click", () => {
                const selectedPanel = tab.dataset.panel;

                tabs.forEach((candidate) => {
                    const isSelected = candidate === tab;
                    candidate.classList.toggle("is-active", isSelected);
                    candidate.setAttribute("aria-selected", String(isSelected));
                });

                panels.forEach((panel) => {
                    panel.hidden = panel.dataset.rulePanel !== selectedPanel;
                });
            });
        });
    }

    function handleInitialHash() {
        const targetId = window.location.hash.slice(1);

        if (targetId) {
            window.requestAnimationFrame(() => moveToTarget(targetId));
        }
    }

    renderStatus();
    renderUpdates();
    renderTableOfContents();
    renderSections();
    setupTargetLinks();
    setupTabs();
    handleInitialHash();

    window.ruleDateUtils = {
        isWithinUpdateNoticePeriod
    };
})();
