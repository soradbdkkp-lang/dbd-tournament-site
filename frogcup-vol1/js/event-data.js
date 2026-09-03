window.FROGCUP_EVENT = {
  commentatorIntro: "当日の進行、実況\u30fb解説、試合開始時刻を確認できます。MAPプールとボーナスキラーは各詳細ページで確認してください。",
  lockedMessage: "当選チームの発表と同時に公開します。",
  bonusMapNotice: "\u203bボーナスMAPは各MAPプールの試合が全て終了するまで公開されません。",
  prize: "優勝賞金 12,000円",
  commentators: [
    {
      id: "nepechi",
      name: "Nepechi",
      imageFile: "nepechi.webp",
      links: {
        x: "https://x.com/goodjob_Nepechi",
        twitch: "https://www.twitch.tv/nepechi"
      }
    },
    {
      id: "shin",
      name: "SHIN",
      imageFile: "shin.jpg",
      links: {
        x: "https://x.com/vSHlNv",
        twitch: "https://www.twitch.tv/shin_official"
      }
    }
  ],
  timetable: [
    {
      stageId: "qualifier-a",
      stageLabel: "予選Aブロック",
      matches: [
        { matchup: "A1 vs A2", startTime: "16:00", displayTime: "16:00〜" },
        { matchup: "A1 vs A3", startTime: "16:45", displayTime: "16:45〜" },
        { matchup: "A2 vs A3", startTime: "17:30", displayTime: "17:30〜" }
      ]
    },
    {
      stageId: "qualifier-b",
      stageLabel: "予選Bブロック",
      matches: [
        { matchup: "B1 vs B2", startTime: "18:15", displayTime: "18:15〜" },
        { matchup: "B1 vs B3", startTime: "19:00", displayTime: "19:00〜" },
        { matchup: "B2 vs B3", startTime: "19:45", displayTime: "19:45〜" }
      ]
    },
    {
      stageId: "semifinal-1",
      stageLabel: "準決勝1試合目",
      matches: [
        { matchup: "予選Aの1位 vs 予選Bの2位", startTime: "20:40", displayTime: "20:40〜" }
      ]
    },
    {
      stageId: "semifinal-2",
      stageLabel: "準決勝2試合目",
      matches: [
        { matchup: "予選Bの1位 vs 予選Aの2位", startTime: "21:25", displayTime: "21:25〜" }
      ]
    },
    {
      stageId: "final",
      stageLabel: "決勝",
      matches: [
        { matchup: "準決勝1試合目の勝者 vs 準決勝2試合目の勝者", startTime: "22:15", displayTime: "22:15〜" }
      ]
    }
  ],
  stages: [
    { id: "qualifier-a", label: "予選Aブロック", status: "locked" },
    { id: "qualifier-b", label: "予選Bブロック", status: "locked" },
    { id: "semifinal-1", label: "準決勝1試合目", status: "public" },
    { id: "semifinal-2", label: "準決勝2試合目", status: "public" },
    { id: "final", label: "決勝", status: "public" }
  ],
  initialStageId: "semifinal-1",
  mapPools: {
    "qualifier-a": { status: "locked", bonusMapStatus: "secret", maps: [] },
    "qualifier-b": { status: "locked", bonusMapStatus: "secret", maps: [] },
    "semifinal-1": {
      status: "public",
      bonusMapStatus: "secret",
      maps: [
        { name: "ミッドウィッチ小学校", imageFile: "midwich.webp" },
        { name: "ラクーンシティ警察署･東棟", imageFile: "raccoon_city_police_station.webp" },
        { name: "レリー記念研究所", imageFile: "lerys.webp" }
      ]
    },
    "semifinal-2": {
      status: "public",
      bonusMapStatus: "secret",
      maps: [
        { name: "ホーキンス国立研究所", imageFile: "underground_complex.webp" },
        { name: "ギデオン食肉工場", imageFile: "gideon.webp" },
        { name: "レリー記念研究所", imageFile: "lerys.webp" }
      ]
    },
    final: {
      status: "public",
      bonusMapStatus: "secret",
      maps: [
        { name: "忘れ去られた遺跡", imageFile: "forgotten_ruins.webp" },
        { name: "死の砂漠", imageFile: "dead_sands.webp" },
        { name: "落ちた避難所", imageFile: "fallen_refuge.webp" }
      ]
    }
  },
  bonusKillerPools: {
    "qualifier-a": { status: "locked", killerIds: [] },
    "qualifier-b": { status: "locked", killerIds: [] },
    "semifinal-1": {
      status: "public",
      killerIds: ["hag", "shape", "good_guy", "executioner", "ghost_face", "onryo"]
    },
    "semifinal-2": {
      status: "public",
      killerIds: ["demogorgon", "shape", "xenomorph", "cenobite", "ghost_face", "onryo"]
    },
    final: {
      status: "public",
      killerIds: ["demogorgon", "judgment", "plague", "animatronic", "unknown", "houndmaster"]
    }
  }
};
