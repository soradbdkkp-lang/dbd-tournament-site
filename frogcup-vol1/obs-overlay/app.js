(() => {
  'use strict';

  const SCREEN_NAMES = new Set(['standby', 'game', 'break', 'ending']);
  const params = new URLSearchParams(location.search);
  const fixedScene = SCREEN_NAMES.has(params.get('scene')) ? params.get('scene') : 'standby';
  const overlayKey = params.get('key') || '';
  const demoMode = params.get('demo') === '1';
  const config = window.FROGCUP_CONFIG || {};
  const apiBase = String(config.appsScriptUrl || '').trim();
  const pollInterval = Math.max(1000, Number(config.pollIntervalMs) || 2000);

  const RULE_SLIDES = [
    { kicker:'RULE 01 / MATCH RESULT', title:'大会の勝利条件', html:`<div class="rule-grid two"><section class="rule-box"><span class="rule-pill">キラー得点</span><h3>吊り数</h3><p>1吊り 1Pt　／　最大12Pt</p><div class="gold-line">＋ 全滅ボーナス 2Pt</div></section><section class="rule-box"><span class="rule-pill">サバイバー得点</span><h3>修理完了発電機数</h3><p>1台 1Pt　／　最大5Pt</p><div class="gold-line">＋ 脱出人数 1人1Pt</div></section></div><section class="highlight-panel"><span>第1判定</span><strong>キラー得点　＋　サバイバー得点　＝　チーム得点</strong><em>チーム得点が高い側の勝利</em></section><section class="tie-panel"><strong>同点時：キラーゲーム内スコア ＋ サバイバー4名のうち2番目に低いゲーム内スコア</strong><p>合算値が高い側の勝利　／　完全同点は運営判断</p></section>` },
    { kicker:'RULE 02 / SURVIVOR', title:'サバイバーの禁止・制限', html:`<div class="restriction-grid"><section class="restriction-card"><h3>重複制限</h3><ul><li>同一試合の4名間でキャラクター重複禁止</li><li>同一試合の4名間でパーク重複禁止</li><li>レジェンダリーは別キャラクター扱い</li></ul></section><section class="restriction-card"><h3 class="gold">禁止パーク</h3><ul><li>恵みパークはすべて禁止</li><li>安心感・有能の証明・邪気・不動の視力ほか</li><li class="warning">使用前に公式サイトの最新一覧を確認</li></ul></section><section class="restriction-card"><h3>アイテム・オファリング</h3><ul><li>アイテムとアドオンの持ち込み禁止</li><li>試合中に入手したアイテムは使用可能</li><li>鍵は入手方法を問わず使用禁止</li></ul></section><section class="restriction-card"><h3 class="gold">重要ルール</h3><ul><li>呪いのトーテム破壊完了は発電機1台修理後</li><li>AFCによる自力脱出は原則禁止</li><li>挑発目的の屈伸・エモート・ライトは禁止</li></ul></section></div>` },
    { kicker:'RULE 03 / KILLER', title:'キラーの禁止・制限', html:`<div class="restriction-grid"><section class="restriction-card"><h3 class="gold">キラー制限</h3><ul><li>スカルマーチャントは使用禁止</li><li>同一チーム内で同じキラーの再使用禁止</li><li>担当者が変わっても使用履歴を引き継ぐ</li><li>ジャッジメントは使用可能</li></ul></section><section class="restriction-card"><h3>禁止パーク</h3><ul><li>露見する闇・隠れ場なし・捕食者</li><li>狩りの興奮・闇との対面・幻影の震撼</li><li>究極の武器・天界の証人</li></ul></section><section class="restriction-card"><h3>条件付きパーク</h3><ul><li>アンフォーシーン：屋内MAPでは使用禁止</li><li>死人のスイッチ：シンギュラリティでは使用禁止</li><li>共通制限と個別制限を両方確認</li></ul></section><section class="restriction-card"><h3 class="gold">個別制限</h3><ul><li>キラーごとにアドオン・スキン制限あり</li><li>ナースはアンコモン以下のみ</li><li class="warning">使用構成は公式サイトのキラー別カードで確認</li></ul></section></div>` },
    { kicker:'RULE 04 / MAP & ADD-ON', title:'MAP・アドオン制限', html:`<div class="restriction-grid"><section class="restriction-card"><h3>ステージ別MAP</h3><ul><li>予選：屋外MAP1回・屋内MAP1回</li><li>準決勝：指定された屋内MAPプール</li><li>決勝：指定された屋外MAPプール</li></ul></section><section class="restriction-card"><h3 class="gold">MAP共通制限</h3><ul><li>同一チームは同じMAPを再使用できない</li><li>バージョン違いも同一MAPとして扱う</li><li>MAPオファリングは両陣営すべて禁止</li></ul></section><section class="restriction-card"><h3>アドオン</h3><ul><li>キラーごとの個別アドオン制限を適用</li><li>「単体使用」は他アドオンと併用不可</li><li>使用禁止・レアリティ制限に注意</li></ul></section><section class="restriction-card"><h3 class="gold">シークレットボーナス</h3><ul><li>対象MAP：+1Pt ／ 対象キラー：+1Pt</li><li>同一試合で両方獲得可能</li><li class="warning">対象と得点反映方法は公式サイトで確認</li></ul></section></div>` }
  ];

  const demoState = { stage:'予選', matchLabel:'第1試合', half:'前半', teamA:'にゃんバード', teamB:'サミエルず', scoreA:0, scoreB:0, killerSide:'A', killerPlayer:'', showScore:true, showKillerPlayer:true, nextTeamA:'にゃんバード', nextTeamB:'XlytheriN', breakSlide:0, breakAutoplay:true, breakIntervalSeconds:12 };

  document.body.classList.add('overlay-mode');
  applyAssets();
  activateScreen(fixedScene);
  resizeCanvas();
  addEventListener('resize', resizeCanvas);

  let currentState = null;
  let currentSlide = 0;
  let slidePaused = false;
  let lastSlideChange = Date.now();

  if (demoMode) {
    document.getElementById('broadcast-canvas').classList.add('is-demo');
    applyState(demoState);
  } else {
    if (!overlayKey) showFatal('URLに表示用keyがありません。');
    else if (!/^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/.test(apiBase)) showFatal('config.js の appsScriptUrl に /exec URLを設定してください。');
    else {
      poll();
      setInterval(poll, pollInterval);
    }
  }
  setInterval(tickSlides, 500);

  function poll() {
    jsonp(apiBase, overlayKey).then((payload) => {
      if (!payload || payload.error) throw new Error(payload && payload.error ? payload.error : 'データを取得できませんでした。');
      if (payload.state) applyState(payload.state);
    }).catch((error) => console.error('FrogCup overlay poll failed:', error));
  }

  function jsonp(base, key) {
    return new Promise((resolve, reject) => {
      const callback = `FROGCUP_JSONP_${Date.now()}_${Math.floor(Math.random()*100000)}`;
      const script = document.createElement('script');
      const timer = setTimeout(() => cleanup(new Error('Apps Script API timeout')), 10000);
      function cleanup(error, value) {
        clearTimeout(timer);
        try { delete window[callback]; } catch (_) { window[callback] = undefined; }
        script.remove();
        error ? reject(error) : resolve(value);
      }
      window[callback] = (value) => cleanup(null, value);
      script.onerror = () => cleanup(new Error('Apps Script API load failed'));
      script.src = `${base}?api=overlay&key=${encodeURIComponent(key)}&callback=${encodeURIComponent(callback)}&t=${Date.now()}`;
      document.head.appendChild(script);
    });
  }

  function applyState(raw) {
    const state = { ...demoState, ...(raw || {}) };
    currentState = state;
    document.body.classList.add('data-ready');
    setText('game-meta', `${state.stage || ''}　${state.matchLabel || ''}　｜　${state.half || ''}`);
    setText('game-team-a', state.teamA || '');
    setText('game-team-b', state.teamB || '');
    setText('game-score-a', Number(state.scoreA) || 0);
    setText('game-score-b', Number(state.scoreB) || 0);
    const killerPlayer = String(state.killerPlayer || '').trim();
    setText('game-killer-player', killerPlayer ? `キラー担当　${killerPlayer}` : '');
    document.getElementById('game-killer-player').style.visibility = (state.showKillerPlayer !== false && killerPlayer) ? 'visible' : 'hidden';
    document.getElementById('game-score-a').style.visibility = state.showScore === false ? 'hidden' : 'visible';
    document.getElementById('game-score-b').style.visibility = state.showScore === false ? 'hidden' : 'visible';
    document.querySelector('.versus').style.visibility = state.showScore === false ? 'hidden' : 'visible';
    setRole(document.getElementById('game-role-a'), state.killerSide === 'A' ? 'killer' : 'survivor');
    setRole(document.getElementById('game-role-b'), state.killerSide === 'B' ? 'killer' : 'survivor');
    setText('next-meta', 'NEXT MATCH');
    setText('next-team-a', state.nextTeamA || '');
    setText('next-team-b', state.nextTeamB || '');
    if (currentSlide !== Number(state.breakSlide || 0)) {
      currentSlide = Math.max(0, Math.min(RULE_SLIDES.length - 1, Number(state.breakSlide) || 0));
      lastSlideChange = Date.now();
    }
    slidePaused = state.breakAutoplay === false;
    renderRuleSlide(currentSlide);
  }

  function setRole(el, role) {
    const killer = role === 'killer';
    el.classList.toggle('killer', killer); el.classList.toggle('survivor', !killer);
    el.innerHTML = killer ? '<span class="killer-mark" aria-hidden="true">◆</span><strong>KILLER</strong>' : '<span class="survivor-dots" aria-hidden="true">••<br>••</span><strong>SURVIVOR</strong>';
  }

  function tickSlides() {
    if (fixedScene !== 'break' || !currentState || slidePaused || currentState.breakAutoplay === false) return;
    const seconds = Math.max(5, Number(currentState.breakIntervalSeconds) || 12);
    if (Date.now() - lastSlideChange < seconds * 1000) return;
    currentSlide = (currentSlide + 1) % RULE_SLIDES.length;
    lastSlideChange = Date.now();
    renderRuleSlide(currentSlide);
  }

  function renderRuleSlide(index) {
    const slide = RULE_SLIDES[index] || RULE_SLIDES[0];
    setText('rule-kicker', slide.kicker); setText('rule-title', slide.title);
    document.getElementById('rule-slide-content').innerHTML = slide.html;
    document.getElementById('rule-dots').innerHTML = RULE_SLIDES.map((_, i) => `<i class="${i===index?'is-active':''}"></i>`).join('');
  }

  function activateScreen(scene) {
    document.querySelectorAll('.broadcast-screen').forEach((el) => el.classList.remove('is-active'));
    const target = document.getElementById(`screen-${scene}`); if (target) target.classList.add('is-active');
  }

  function applyAssets() {
    const assets = window.FROGCUP_ASSETS || {};
    if (assets.forest) document.documentElement.style.setProperty('--asset-forest', `url("${assets.forest}")`);
    document.querySelectorAll('[data-asset]').forEach((img) => { const src = assets[img.dataset.asset]; if (src) img.src = src; });
  }

  function resizeCanvas() {
    const canvas = document.getElementById('broadcast-canvas');
    const scale = Math.min(innerWidth / 1920, innerHeight / 1080);
    const left = (innerWidth - 1920 * scale) / 2; const top = (innerHeight - 1080 * scale) / 2;
    canvas.style.transform = `translate(${left}px, ${top}px) scale(${scale})`;
  }

  function setText(id, value) { const el = document.getElementById(id); if (el) el.textContent = String(value == null ? '' : value); }
  function showFatal(message) { console.error(message); document.body.dataset.error = message; }
})();
