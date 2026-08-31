window.FROGCUP_KILLERS = {
  commonRules: [
    "同一チームは大会全体を通して同じキラーを再使用できない。担当者が変わっても使用履歴を引き継ぐ。",
    "無効試合・未実施試合のキラーは使用済みにしない。"
  ],
  commonBannedPerks: [
    "露見する闇",
    "隠れ場なし",
    "捕食者",
    "狩りの興奮",
    "闇との対面",
    "幻影の震撼",
    "究極の武器",
    "天界の証人※8/27追加"
  ],
  commonConditionalPerks: [
    "アンフォーシーン：屋内MAPでは使用禁止。"
  ],
  addonTerms: {
    soloUse: "「単体使用」とは、そのアドオンを使用する場合に、他のアドオンを併用できないことを指す。"
  },
  bonusLabels: {
    "public-yes": "ボーナスあり",
    "public-no": "ボーナスなし",
    "undecided": "ボーナス未確定",
    "secret": "ボーナス非公開"
  },
  killers: [
    { id: "trapper", name: "トラッパー", image: "../assets/images/killers/trapper.webp", status: "allowed", bonusStatus: "undecided", restrictions: [] },
    { id: "wraith", name: "レイス", image: "../assets/images/killers/wraith.webp", status: "allowed", bonusStatus: "undecided", restrictions: [] },
    { id: "hillbilly", name: "ヒルビリー", image: "../assets/images/killers/hillbilly.webp", status: "allowed", bonusStatus: "undecided", restrictions: ["「玉虫色の彫刻」「軽量チェーン」使用時、併用するもう一方はアンコモン以下のみ。"] },
    { id: "nurse", name: "ナース", image: "../assets/images/killers/nurse.webp", status: "allowed", bonusStatus: "undecided", restrictions: ["アンコモン以下のみ使用可能。", "禁止スキン：「コレクターの呪い」。"] },
    { id: "huntress", name: "ハントレス", image: "../assets/images/killers/huntress.webp", status: "allowed", bonusStatus: "undecided", restrictions: ["ギデオン使用時「玉虫色の刃」は使用禁止。", "禁止スキン：「鹿女」「フェイスメルターエディ」。"] },
    { id: "shape", name: "シェイプ", image: "../assets/images/killers/shape.webp", status: "allowed", bonusStatus: "undecided", restrictions: [] },
    { id: "hag", name: "ハグ", image: "../assets/images/killers/hag.webp", status: "allowed", bonusStatus: "undecided", restrictions: [] },
    { id: "doctor", name: "ドクター", image: "../assets/images/killers/doctor.webp", status: "allowed", bonusStatus: "undecided", restrictions: [] },
    { id: "cannibal", name: "カニバル", image: "../assets/images/killers/cannibal.webp", status: "allowed", bonusStatus: "undecided", restrictions: [] },
    { id: "nightmare", name: "ナイトメア", image: "../assets/images/killers/nightmare.webp", status: "allowed", bonusStatus: "undecided", restrictions: [] },
    { id: "pig", name: "ピッグ", image: "../assets/images/killers/pig.webp", status: "allowed", bonusStatus: "undecided", restrictions: [] },
    { id: "clown", name: "クラウン", image: "../assets/images/killers/clown.webp", status: "allowed", bonusStatus: "undecided", restrictions: [] },
    { id: "spirit", name: "スピリット", image: "../assets/images/killers/spirit.webp", status: "allowed", bonusStatus: "undecided", restrictions: ["「母娘の指輪」は単体使用のみ。"], terms: ["soloUse"] },
    { id: "legion", name: "リージョン", image: "../assets/images/killers/legion.webp", status: "allowed", bonusStatus: "undecided", restrictions: [] },
    { id: "plague", name: "プレイグ", image: "../assets/images/killers/plague.webp", status: "allowed", bonusStatus: "undecided", restrictions: ["「黒のお香」は単体使用のみ。"], terms: ["soloUse"] },
    { id: "ghost_face", name: "ゴーストフェイス", image: "../assets/images/killers/ghost_face.webp", status: "allowed", bonusStatus: "undecided", restrictions: [] },
    { id: "demogorgon", name: "デモゴルゴン", image: "../assets/images/killers/demogorgon.webp", status: "allowed", bonusStatus: "undecided", restrictions: [] },
    { id: "oni", name: "鬼", image: "../assets/images/killers/oni.webp", status: "allowed", bonusStatus: "undecided", restrictions: [] },
    { id: "deathslinger", name: "デススリンガー", image: "../assets/images/killers/deathslinger.webp", status: "allowed", bonusStatus: "undecided", restrictions: [] },
    { id: "executioner", name: "エクセキューショナー", image: "../assets/images/killers/executioner.webp", status: "allowed", bonusStatus: "undecided", restrictions: [] },
    { id: "blight", name: "ブライト", image: "../assets/images/killers/blight.webp", status: "allowed", bonusStatus: "undecided", restrictions: ["「化合物33」は単体使用のみ。", "「玉虫色のラベル」「錬金術師の指輪」は使用禁止。"], terms: ["soloUse"] },
    { id: "twins", name: "ツインズ", image: "../assets/images/killers/twins.webp", status: "allowed", bonusStatus: "undecided", restrictions: ["「沈黙の布」は単体使用のみ。"], terms: ["soloUse"] },
    { id: "trickster", name: "トリックスター", image: "../assets/images/killers/trickster.webp", status: "allowed", bonusStatus: "undecided", restrictions: [] },
    { id: "nemesis", name: "ネメシス", image: "../assets/images/killers/nemesis.webp", status: "allowed", bonusStatus: "undecided", restrictions: [] },
    { id: "cenobite", name: "セノバイト", image: "../assets/images/killers/cenobite.webp", status: "allowed", bonusStatus: "undecided", restrictions: ["「技師の犬歯」は単体使用のみ。"], terms: ["soloUse"] },
    { id: "artist", name: "アーティスト", image: "../assets/images/killers/artist.webp", status: "allowed", bonusStatus: "undecided", restrictions: [] },
    { id: "onryo", name: "怨霊（貞子）", image: "../assets/images/killers/onryo.webp", status: "allowed", bonusStatus: "undecided", restrictions: [] },
    { id: "dredge", name: "ドレッジ", image: "../assets/images/killers/dredge.webp", status: "allowed", bonusStatus: "undecided", restrictions: [] },
    { id: "mastermind", name: "マスターマインド（ウェスカー）", image: "../assets/images/killers/mastermind.webp", status: "allowed", bonusStatus: "undecided", restrictions: [] },
    { id: "knight", name: "ナイト", image: "../assets/images/killers/knight.webp", status: "allowed", bonusStatus: "undecided", restrictions: [] },
    { id: "skull_merchant", name: "スカルマーチャント", image: "../assets/images/killers/skull_merchant.webp", status: "banned", bonusStatus: "undecided", restrictions: ["使用禁止キラー。"] },
    { id: "singularity", name: "シンギュラリティ", image: "../assets/images/killers/singularity.webp", status: "allowed", bonusStatus: "undecided", restrictions: ["「拒否された請求フォーム」は単体使用のみ。", "死人のスイッチ：シンギュラリティでは使用禁止。"], terms: ["soloUse"] },
    { id: "xenomorph", name: "ゼノモーフ", image: "../assets/images/killers/xenomorph.webp", status: "allowed", bonusStatus: "undecided", restrictions: [] },
    { id: "good_guy", name: "グッドガイ", image: "../assets/images/killers/good_guy.webp", status: "allowed", bonusStatus: "undecided", restrictions: [] },
    { id: "unknown", name: "アンノウン", image: "../assets/images/killers/unknown.webp", status: "allowed", bonusStatus: "undecided", restrictions: [] },
    { id: "lich", name: "リッチ", image: "../assets/images/killers/lich.webp", status: "allowed", bonusStatus: "undecided", restrictions: [] },
    { id: "dark_lord", name: "ダークロード", image: "../assets/images/killers/dark_lord.webp", status: "allowed", bonusStatus: "undecided", restrictions: ["「アンフアゥグリアの犬歯」は使用禁止。"] },
    { id: "houndmaster", name: "ハウンドマスター", image: "../assets/images/killers/houndmaster.webp", status: "allowed", bonusStatus: "undecided", restrictions: [] },
    { id: "ghoul", name: "喰種", image: "../assets/images/killers/ghoul.webp", status: "allowed", bonusStatus: "undecided", restrictions: ["「ヤモリのマスク」は使用禁止。", "「赤頭のムカデ」は単体使用のみ。"], terms: ["soloUse"] },
    { id: "krasue", name: "ガスー", image: "../assets/images/killers/krasue.webp", status: "allowed", bonusStatus: "undecided", restrictions: ["「ニワトリの頭」使用時、併用するもう一方はアンコモン以下のみ。", "「ボロボロのガウン」「観劇用の双眼鏡」「ブタの目」は使用禁止。"] },
    { id: "animatronic", name: "アニマトロニック", image: "../assets/images/killers/animatronic.webp", status: "allowed", bonusStatus: "undecided", restrictions: [] },
    { id: "first", name: "ファースト", image: "../assets/images/killers/first.webp", status: "allowed", bonusStatus: "undecided", restrictions: ["「玉虫色のソテリアチップ」「クロゴケグモ」「電極キャップ」は使用禁止。"] },
    { id: "slasher", name: "ジェイソン", image: "../assets/images/killers/slasher.webp", status: "allowed", bonusStatus: "undecided", restrictions: ["「パーティーホーン」「寝袋」は使用禁止。"] },
    { id: "judgment", name: "ジャッジメント", image: "../assets/images/killers/judgment.webp", status: "allowed", bonusStatus: "undecided", restrictions: [] }
  ]
};
