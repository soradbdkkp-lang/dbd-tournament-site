window.FROGCUP_EVENT = {
  commentatorIntro: "当日の進行、実況\u30fb解説、試合開始時刻を確認できます。MAPプールとボーナスキラーは各詳細ページで確認してください。",
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
        { leftTeam: "にゃんバード", rightTeam: "サミエルず", startTime: "16:00", displayTime: "16:00〜", orderBadge: "先行キラー" },
        { leftTeam: "にゃんバード", rightTeam: "XlytheriN", startTime: "16:45", displayTime: "16:45〜", orderBadge: "先行キラー" },
        { leftTeam: "サミエルず", rightTeam: "XlytheriN", startTime: "17:30", displayTime: "17:30〜", orderBadge: "先行キラー" }
      ]
    },
    {
      stageId: "qualifier-b",
      stageLabel: "予選Bブロック",
      matches: [
        { leftTeam: "白血族", rightTeam: "BLUE族", startTime: "18:15", displayTime: "18:15〜", orderBadge: "先行キラー" },
        { leftTeam: "白血族", rightTeam: "ほたるのいかすみ", startTime: "19:00", displayTime: "19:00〜", orderBadge: "先行キラー" },
        { leftTeam: "BLUE族", rightTeam: "ほたるのいかすみ", startTime: "19:45", displayTime: "19:45〜", orderBadge: "先行キラー" }
      ]
    },
    {
      stageId: "semifinal-1",
      stageLabel: "準決勝1試合目",
      matches: [
        { leftTeam: "予選Aの1位", rightTeam: "予選Bの2位", startTime: "20:40", displayTime: "20:40〜", orderBadge: "先攻\u30FB後攻 選択権あり" }
      ]
    },
    {
      stageId: "semifinal-2",
      stageLabel: "準決勝2試合目",
      matches: [
        { leftTeam: "予選Bの1位", rightTeam: "予選Aの2位", startTime: "21:25", displayTime: "21:25〜", orderBadge: "先攻\u30FB後攻 選択権あり" }
      ]
    },
    {
      stageId: "final",
      stageLabel: "決勝",
      matches: [
        { leftTeam: "準決勝1試合目の勝者", rightTeam: "準決勝2試合目の勝者", startTime: "22:15", displayTime: "22:15〜", orderNote: "先攻\u30FB後攻：試合前のダイスで高い目を出したチームが選択" }
      ]
    }
  ],
  stages: [
    { id: "qualifier-a", label: "予選Aブロック", status: "public" },
    { id: "qualifier-b", label: "予選Bブロック", status: "public" },
    { id: "semifinal-1", label: "準決勝1試合目", status: "public" },
    { id: "semifinal-2", label: "準決勝2試合目", status: "public" },
    { id: "final", label: "決勝", status: "public" }
  ],
  initialStageId: "qualifier-a",
  mapPools: {
    "qualifier-a": {
      status: "public",
      bonusMapStatus: "public",
      bonusMaps: [
        { category: "室内", name: "レリー記念研究所", imageFile: "lerys.webp" },
        { category: "屋外", name: "オーモンド山のリゾートⅡ", imageFile: "mount_ormond_resort.webp" }
      ],
      maps: [
        { category: "室内", name: "ホーキンス国立研究所", imageFile: "underground_complex.webp" },
        { category: "室内", name: "ラクーンシティ東棟", imageFile: "raccoon_city_police_station.webp" },
        { category: "室内", name: "レリー記念研究所", imageFile: "lerys.webp" },
        { category: "屋外", name: "落ちた避難所", imageFile: "fallen_refuge.webp" },
        { category: "屋外", name: "ファザー\u30FBキャンベルズ\u30FBチャペル", imageFile: "father_campbells_chapel.webp" },
        { category: "屋外", name: "死んだ犬の酒場", imageFile: "dead_dawg_saloon.webp" },
        { category: "屋外", name: "オーモンド山のリゾートⅡ", imageFile: "mount_ormond_resort.webp" }
      ]
    },
    "qualifier-b": {
      status: "public",
      bonusMapStatus: "public",
      bonusMaps: [
        { category: "室内", name: "レリー記念研究所", imageFile: "lerys.webp" },
        { category: "屋外", name: "オーモンド山のリゾートⅡ", imageFile: "mount_ormond_resort.webp" }
      ],
      maps: [
        { category: "室内", name: "ホーキンス国立研究所", imageFile: "underground_complex.webp" },
        { category: "室内", name: "ギデオン", imageFile: "gideon.webp" },
        { category: "室内", name: "ミッドウィッチ小学校", imageFile: "midwich.webp" },
        { category: "室内", name: "レリー記念研究所", imageFile: "lerys.webp" },
        { category: "屋外", name: "死んだ犬の酒場", imageFile: "dead_dawg_saloon.webp" },
        { category: "屋外", name: "コールタワーⅠ", imageFile: "coal_tower.webp" },
        { category: "屋外", name: "怒りの聖所", imageFile: "sanctum_of_wrath.webp" },
        { category: "屋外", name: "オーモンド山のリゾートⅡ", imageFile: "mount_ormond_resort.webp" }
      ]
    },
    "semifinal-1": {
      status: "public",
      bonusMapStatus: "public",
      bonusMaps: [{ name: "レリー記念研究所", imageFile: "lerys.webp" }],
      maps: [
        { name: "ミッドウィッチ小学校", imageFile: "midwich.webp" },
        { name: "ラクーンシティ警察署･東棟", imageFile: "raccoon_city_police_station.webp" },
        { name: "レリー記念研究所", imageFile: "lerys.webp" }
      ]
    },
    "semifinal-2": {
      status: "public",
      bonusMapStatus: "public",
      bonusMaps: [{ name: "レリー記念研究所", imageFile: "lerys.webp" }],
      maps: [
        { name: "ホーキンス国立研究所", imageFile: "underground_complex.webp" },
        { name: "ギデオン食肉工場", imageFile: "gideon.webp" },
        { name: "レリー記念研究所", imageFile: "lerys.webp" }
      ]
    },
    final: {
      status: "public",
      bonusMapStatus: "private",
      maps: [
        { name: "忘れ去られた遺跡", imageFile: "forgotten_ruins.webp" },
        { name: "死の砂漠", imageFile: "dead_sands.webp" },
        { name: "落ちた避難所", imageFile: "fallen_refuge.webp" }
      ]
    }
  },
  sponsorQuest: {
    status: "public",
    killerIds: ["spirit", "clown", "doctor"],
    condition: "指定された対象キラーで未通電全滅",
    detailPage: "sponsor-quest.html"
  },
  bonusKillerPools: {
    "qualifier-a": {
      status: "public",
      killerIds: ["onryo", "ghost_face", "shape", "demogorgon", "cenobite", "xenomorph", "houndmaster", "animatronic", "wraith", "deathslinger"]
    },
    "qualifier-b": {
      status: "public",
      killerIds: ["onryo", "ghost_face", "hag", "executioner", "shape", "demogorgon", "cenobite", "xenomorph", "animatronic", "houndmaster", "oni"]
    },
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
