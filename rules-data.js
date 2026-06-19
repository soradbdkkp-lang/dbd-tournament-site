window.frogCupVol1BasicRules = {
    id: "frogcup-vol1-basic",
    title: "Dead by Daylight 大会ルールブック",
    volumeLabel: "ふろぐCup Vol.1",
    publicLabel: "Vol.1 基本ルール",
    statusLabel: "暫定",
    audience: "参加者・運営",
    updates: [
        {
            date: "2026-06-13",
            title: "切断・クラッシュルールを修正",
            summary: "6-3. ペナルティありの再試合の内容を調整しました。",
            targetId: "basic-6-3"
        },
        {
            date: "2026-06-10",
            title: "順位決定ルールを追記",
            summary: "第11章の比較順を追加しました。",
            targetId: "basic-11-1"
        },
        {
            date: "2026-06-08",
            title: "基本ルール草案を公開",
            summary: "Vol.1 基本ルールの初版を掲載しました。",
            targetId: "basic-chapter-1"
        }
    ],
    sections: [
        {
            id: "basic-chapter-1",
            chapter: "第1章",
            title: "大会概要",
            items: [
                {
                    id: "basic-1-1",
                    title: "1-1. 開催情報",
                    body: [
                        "開催日は2026/09/12です。",
                        "試合開始時刻は後日発表します。",
                        "エントリー期間は後日発表します。",
                        "募集チーム数は6チームです。応募多数の場合、最大8チームまで拡張する場合があります。",
                        "応募多数の場合、ご希望に添えない場合があります。",
                        "賞品・賞金はありません。"
                    ]
                },
                {
                    id: "basic-1-2",
                    title: "1-2. 参加条件",
                    body: [
                        "対応プラットフォームは PS4 / PS5 / Steam 限定です。",
                        "メンバー全員が Discord に参加できる必要があります。",
                        "メンバー全員が X アカウントを所持している必要があります。",
                        "鍵アカウントでの参加はできません。",
                        "参加地域は日本・韓国在住です。",
                        "未成年は保護者同意がある場合に参加可能です。",
                        "VCは配信に載せません。"
                    ]
                },
                {
                    id: "basic-1-3",
                    title: "1-3. Discord案内",
                    body: [
                        "当選チームの代表者には、XのDMで大会用DiscordサーバーのURLを送付します。",
                        "各メンバーは、代表者から共有されたURLよりDiscordサーバーへ入室します。"
                    ]
                }
            ]
        },
        {
            id: "basic-chapter-2",
            chapter: "第2章",
            title: "チーム登録",
            items: [
                {
                    id: "basic-2-1",
                    title: "2-1. チーム人数",
                    body: [
                        "登録人数は最大5名です。",
                        "最低参加人数は4名です。",
                        "4人チームでも参加可能です。",
                        "ただし、万が一に備えて補欠を用意することを推奨します。"
                    ]
                },
                {
                    id: "basic-2-2",
                    title: "2-2. 控え選手",
                    body: [
                        "控え選手は事前登録者のみ参加可能です。",
                        "未登録の選手を当日追加することはできません。",
                        "個人参加枠はありません。"
                    ]
                },
                {
                    id: "basic-2-3",
                    title: "2-3. キラー担当",
                    body: [
                        "キラー交代は、登録メンバー内であれば、誰が何回担当しても構いません。"
                    ],
                    groups: [
                        {
                            label: "登録人数",
                            items: ["最大5名", "最低4名", "控え選手は事前登録者のみ可"]
                        },
                        {
                            label: "キラー担当例",
                            items: [
                                "予選1戦目キラー担当：選手A",
                                "予選2戦目キラー担当：選手B",
                                "準決勝キラー担当：選手C",
                                "決勝キラー担当：選手D"
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: "basic-chapter-3",
            chapter: "第3章",
            title: "構成提出について",
            summary: "キラー担当は使用するキラー、アドオン、MAPを以下の通り提出するものとする。",
            items: [
                {
                    id: "basic-3-1",
                    title: "3-1. 提出期限",
                    status: "attention",
                    statusLabel: "調整中",
                    body: ["構成提出期限は現在調整中です。確定後に案内します。"]
                },
                {
                    id: "basic-3-2",
                    title: "3-2. 修正期限",
                    status: "attention",
                    statusLabel: "調整中",
                    body: ["構成修正期限は現在調整中です。確定後に案内します。"]
                },
                {
                    id: "basic-3-3",
                    title: "3-3. 提出形式",
                    status: "attention",
                    statusLabel: "調整中",
                    body: ["構成提出ページは現在準備中です。公開まではComing soonとして表示します。"]
                },
                {
                    id: "basic-3-4",
                    title: "3-4. オファリング",
                    body: ["両陣営とも使用禁止。"]
                },
                {
                    id: "basic-3-5",
                    title: "3-5. MAP制限",
                    body: [
                        "MAPはポイント制ではありません。",
                        "使用できるMAPは、キラーごとに運営が指定したMAPプール内のみです。",
                        "キラーによって使用可能なMAPプールが異なります。"
                    ]
                },
                {
                    id: "basic-3-6",
                    title: "3-6. キラーとMAPの選択とアドオンポイント",
                    body: [
                        "キラー自体はポイント制ではありません。",
                        "使用できるMAPは、選択したキラーに対して運営が指定したMAPのみです。",
                        "キラー、またはMAPを選択すると、その組み合わせに応じたアドオンポイントが付与されます。",
                        "キラー側は、付与されたアドオンポイント内でアドオンを選択できます。"
                    ]
                }
            ]
        },
        {
            id: "basic-chapter-4",
            chapter: "第4章",
            title: "新チャプター・アップデート",
            items: [
                {
                    id: "basic-4-1",
                    title: "4-1. 新キラーの扱い",
                    body: [
                        "8月実装予定の新キラーについては、使用可否を検討中です。",
                        "ジェイソンは使用可能です。"
                    ]
                },
                {
                    id: "basic-4-2",
                    title: "4-2. パーク",
                    body: [
                        "大会開催2週間前までに実装されていたパークのみ使用可能。",
                        "大会開催2週間以内に新たに実装されたパークは使用不可。"
                    ]
                },
                {
                    id: "basic-4-3",
                    title: "4-3. 使用制限",
                    body: ["以下の場合、運営判断で使用制限または禁止を行う場合がある。"],
                    list: [
                        "不具合が確認されているもの",
                        "極端なバランス問題があるもの",
                        "大会進行に支障をきたすもの"
                    ]
                },
                {
                    id: "basic-4-4",
                    title: "4-4. アップデート対応",
                    body: [
                        "大会開催2週間前以降にキラーまたはパークの性能変更が行われた場合、運営判断で使用制限を行う場合がある。",
                        "その際は構成再提出を認める。"
                    ]
                }
            ]
        },
        {
            id: "basic-chapter-5",
            chapter: "第5章",
            title: "試合進行",
            status: "pending",
            summary: "日程確定後に記載",
            items: []
        },
        {
            id: "basic-chapter-6",
            chapter: "第6章",
            title: "回線切断",
            items: [
                {
                    id: "basic-6-1",
                    title: "6-1. 共通対応",
                    body: [
                        "切断・クラッシュが発生した場合は、原則として運営をVCに呼びます。",
                        "味方が切断・クラッシュした場合、他メンバーは切断せず、行動を停止して運営を呼びます。"
                    ]
                },
                {
                    id: "basic-6-2",
                    title: "6-2. ペナルティなしの再試合",
                    body: [
                        "1吊り前、かつ発電機1台修理前、かつ初回の場合は、ペナルティなしで再試合です。",
                        "サバイバー側が該当する場合、サバイバー側はパーク変更不可、キラー側はパーク変更可です。",
                        "キラー側が該当する場合、キラー側はパーク変更不可、サバイバー側はパーク変更可です。"
                    ]
                },
                {
                    id: "basic-6-3",
                    title: "6-3. ペナルティありの再試合",
                    body: [
                        "2回目以降、または1吊り後、または発電機1台修理後の場合は、ペナルティありの再試合です。",
                        "サバイバー側が該当する場合、サバイバー側は全員3パーク、パーク変更不可です。キラー側はパーク変更可です。",
                        "キラー側が該当する場合、キラー側は3パーク、パーク変更不可です。サバイバー側はパーク変更可です。"
                    ]
                },
                {
                    id: "basic-6-4",
                    title: "6-4. その他トラブル",
                    body: ["サーバー不調やその他のトラブルは運営判断とします。"]
                },
                {
                    id: "basic-6-5",
                    title: "6-5. Discord・VCトラブル",
                    body: [
                        "試合進行に支障がある場合は、VCに運営を呼んでください。",
                        "ゲーム切断は切断・クラッシュ時の対応を適用します。"
                    ]
                }
            ]
        },
        {
            id: "basic-chapter-7",
            chapter: "第7章",
            title: "不具合・バグ",
            items: [
                {
                    id: "basic-7-1",
                    title: "7-1. マップスタック",
                    body: ["全員停止。", "VCで運営をメンション。", "画面共有で確認。"]
                },
                {
                    id: "basic-7-2",
                    title: "7-2. 行動不能バグ",
                    body: ["全員停止。", "VCで運営をメンション。", "画面共有で確認。"]
                },
                {
                    id: "basic-7-3",
                    title: "7-3. UIバグ",
                    body: ["原則続行。", "支障が大きい場合のみ確認。"]
                },
                {
                    id: "basic-7-4",
                    title: "7-4. 発電機修理不可",
                    body: ["即運営へ報告。", "画面共有確認。", "運営判断で再試合調整。"]
                },
                {
                    id: "basic-7-5",
                    title: "7-5. フック不可",
                    body: ["即運営へ報告。", "画面共有確認。", "運営が最終判断を行う。"]
                },
                {
                    id: "basic-7-6",
                    title: "7-6. 治療不可",
                    body: ["全員停止。", "運営へ報告。", "画面共有確認。"]
                },
                {
                    id: "basic-7-7",
                    title: "7-7. バグ・グリッチ利用",
                    body: [
                        "運営が把握しているバグ・グリッチは事前に全体告知します。",
                        "告知済みのバグ・グリッチを利用した場合はペナルティ対象です。",
                        "運営が把握していないバグ・グリッチで、故意性が認められない場合は厳重注意とします。",
                        "以降は使用禁止として全体にアナウンスします。",
                        "悪質または故意と判断される場合は、運営判断でペナルティとします。"
                    ]
                },
                {
                    id: "basic-7-8",
                    title: "7-8. 異議申し立て",
                    body: [
                        "異議申し立てには動画等の証拠が必要です。",
                        "試合中に起こったことへの異議申し立ては、次の試合に移る前までに証拠とともに行ってください。",
                        "急を要する場合は、VCに運営を呼んでも構いません。"
                    ]
                }
            ]
        },
        {
            id: "basic-chapter-8",
            chapter: "第8章",
            title: "配信",
            items: [
                {
                    id: "basic-8-1",
                    title: "8-1. ミラー配信",
                    body: ["事前申請制。"]
                }
            ]
        },
        {
            id: "basic-chapter-9",
            chapter: "第9章",
            title: "禁止事項",
            items: [
                {
                    id: "basic-9-1",
                    title: "9-1. 煽り行為",
                    body: ["以下は禁止とする。"],
                    list: [
                        "不必要な屈伸",
                        "ライトカチカチ",
                        "ゲート内ムーンウォーク",
                        "不必要な板・窓越え",
                        "不必要なロッカー開閉",
                        "その他運営が煽りと判断した行為"
                    ],
                    groups: [
                        {
                            label: "違反対応",
                            items: [
                                "動画で確認できた場合は、違反側の敗北とします。",
                                "動画等の証拠がない場合は、厳重注意とします。",
                                "今後の出場を禁止する場合があります。"
                            ]
                        }
                    ]
                },
                {
                    id: "basic-9-2",
                    title: "9-2. ゴースティング",
                    body: ["疑われる行為は控えること。"]
                },
                {
                    id: "basic-9-3",
                    title: "9-3. チート",
                    body: ["確認できた場合："],
                    list: ["即失格", "今後の大会出禁", "他大会運営へ共有"]
                },
                {
                    id: "basic-9-4",
                    title: "9-4. グリッチ利用",
                    body: [
                        "告知済みのバグ・グリッチを利用した場合はペナルティ対象です。",
                        "悪質または故意と判断される場合は、運営判断でペナルティとします。"
                    ]
                }
            ]
        },
        {
            id: "basic-chapter-10",
            chapter: "第10章",
            title: "VC・観戦",
            items: [
                {
                    id: "basic-10-1",
                    title: "10-1. チームVC",
                    body: ["出場選手のみ入室可能。"]
                },
                {
                    id: "basic-10-2",
                    title: "10-2. 部外者",
                    body: ["試合中以外は1名まで入室可能。"]
                },
                {
                    id: "basic-10-3",
                    title: "10-3. 観戦枠",
                    body: ["なし。"]
                }
            ]
        },
        {
            id: "basic-chapter-11",
            chapter: "第11章",
            title: "順位決定",
            items: [
                {
                    id: "basic-11-1",
                    title: "11-1. 予選同率順位",
                    body: ["以下の順に比較する。"],
                    orderedList: [
                        "勝利数",
                        "予選全体の吊り数 ＋ 発電機修理数の合計",
                        "予選全体のキラースコア ＋ 2番目に低いサバイバースコアの合計"
                    ],
                    note: "本戦出場権は各予選上位2チーム。"
                },
                {
                    id: "basic-11-2",
                    title: "11-2. 本戦",
                    body: ["準決勝："],
                    list: ["予選A1位 vs 予選B2位", "予選A2位 vs 予選B1位"]
                }
            ]
        },
        {
            id: "basic-chapter-12",
            chapter: "第12章",
            title: "運営裁定",
            body: [
                "本ルールに記載のない事項は運営が協議し裁定を行う。",
                "異議申し立ては動画等の客観的証拠がある場合のみ受理する。",
                "最終決定権は主催者であるsoraが有する。"
            ],
            items: []
        }
    ]
};

window.frogCupVol1KillerRules = {
    sections: [
        {
            id: "killer-overview",
            title: "キラー制限ルールの概要",
            body: [
                "本大会では、キラーごとに使用可能MAPとアドオンに制限を設ける。",
                "キラーを選択する際は、あわせて使用するMAPも指定する。",
                "選択したMAPに応じて、使用可能なアドオンポイントが決まる。",
                "公平性と多様な戦略を重視したルールである。"
            ]
        },
        {
            id: "killer-selection-flow",
            title: "キラー選択の流れ",
            steps: [
                "キラーを選択する",
                "使用するMAPを選択する",
                "MAPに応じた使用可能ポイントを確認する",
                "ポイント内でアドオンを選択する",
                "内容を確認し提出する"
            ]
        },
        {
            id: "killer-preliminary-map-release",
            title: "予選時のMAP公開方式",
            status: "現在調整中",
            body: [
                "予選のみ、対戦表が発表されるタイミングで、そのチームのキラーが使用するMAPを公開する予定。",
                "対戦表の発表は、大会開催日の2週間前を予定している。",
                "本戦・決勝等で同じ方式を採用するかは現在調整中。"
            ]
        },
        {
            id: "killer-map-settings",
            title: "MAP設定ルール",
            status: "現在調整中",
            body: [
                "1キラーにつき、室内戦用3MAP、屋外戦用3MAPの計6MAPを用意する。",
                "MAPを複数用意している理由は、MAPごとに使用可能アドオンを整理するため。",
                "もう一つの理由は、他の試合で同じMAPをピックできないようにすることで、MAP選択に制限を持たせるため。",
                "ただし、各キラーの具体的なMAP候補は現在調整中。"
            ]
        },
        {
            id: "killer-map-limit",
            title: "MAPリミット",
            status: "現在調整中",
            body: [
                "MAPリミットは現在調整中。",
                "現段階では、一度使用したMAPは、その試合以降、別キラーであっても使用不可とする案を検討している。",
                "詳細な確定仕様は現在調整中。"
            ]
        },
        {
            id: "killer-limit",
            title: "キラーリミット",
            status: "現在調整中",
            body: [
                "キラーリミットは現在調整中。",
                "現段階では、一度使用したキラーは、その試合以降、キラー担当が変わった場合でも使用不可とする案を検討している。",
                "詳細な確定仕様は現在調整中。"
            ]
        },
        {
            id: "killer-addon-points",
            title: "アドオンポイント制",
            status: "現在調整中",
            body: [
                "アドオン点数は暫定1〜3ptとして調整中。",
                "MAP側のポイント上限は、5pt / 4pt / 3pt を基本案として調整中。",
                "MAP候補とアドオン点数が未確定のため、整合性は決定後に再調整する。",
                "具体的な使用可能アドオン、単品限定アドオン、その他制限項目は現在調整中。"
            ]
        },
        {
            id: "killer-restriction-list",
            title: "キラー別制限一覧",
            status: "現在調整中",
            body: [
                "キラー別制限一覧は現在調整中。",
                "各キラーの使用可能MAP、アドオンポイント、使用可能アドオン、単品限定アドオン、その他制限は現在調整中。",
                "確定後、キラー別制限ページまたは関連ページで公開する予定。"
            ]
        }
    ]
};

(function () {
    "use strict";

    const basicRules = window.frogCupVol1BasicRules;
    const killerRules = window.frogCupVol1KillerRules;

    function addBasicSection(section) {
        if (!basicRules || basicRules.sections.some((current) => current.id === section.id)) {
            return;
        }
        basicRules.sections.push(section);
    }

    function upsertKillerSection(nextSection) {
        if (!killerRules) {
            return;
        }
        const current = killerRules.sections.find((section) => section.id === nextSection.id);
        if (current) {
            Object.assign(current, nextSection);
        } else {
            killerRules.sections.push(nextSection);
        }
    }

    if (basicRules) {
        basicRules.publicLabel = "ふろぐCup Vol.1 公開ルール";
        basicRules.statusLabel = "公開";
        basicRules.audience = "参加者・運営";

        if (!basicRules.updates.some((update) => update.date === "2026-06-20" && update.targetId === "basic-chapter-13")) {
            basicRules.updates.unshift({
                date: "2026-06-20",
                title: "公開ルール、FAQ、問い合わせ導線を反映",
                summary: "大会概要、基本ルール、サバイバー制限、キラー制限、FAQ、問い合わせ導線を公開対象として整理しました。",
                targetId: "basic-chapter-13"
            });
        }

        addBasicSection({
            id: "basic-chapter-13",
            chapter: "第13章",
            title: "調整中項目",
            status: "attention",
            statusLabel: "調整中",
            items: [
                {
                    id: "basic-13-1",
                    title: "13-1. 得点・脱出・ペナルティ",
                    status: "attention",
                    statusLabel: "調整中",
                    list: [
                        "フックボーナスは調整中です。",
                        "非通電時のハッチ脱出は調整中です。",
                        "非通電時のゲート脱出は調整中です。",
                        "禁止構成使用時の具体ペナルティは調整中です。",
                        "提出内容違反時の具体ペナルティは調整中です。",
                        "軽微違反・重大違反の線引きは調整中です。"
                    ]
                }
            ]
        });
    }

    if (killerRules) {
        killerRules.sections.forEach((section) => {
            if (section.status === "現在調整中") {
                section.status = "attention";
                section.statusLabel = "調整中";
            }
        });

        upsertKillerSection({
            id: "killer-overview",
            title: "基本方針",
            body: [
                "競技性とキラーの多様性を両立するため、キラーごとにMAP・アドオン制限を設定します。",
                "強力なキラーも使用可能ですが、アドオンやMAPによって調整します。",
                "使用率が低いキラーは、アドオン制限やMAPプールによって調整します。"
            ]
        });
        upsertKillerSection({
            id: "killer-basic-limits",
            title: "基本制限",
            body: [
                "禁止キラー：スカルマーチャント",
                "すべてのキラーは4パーク使用可能です。",
                "同じチームが、同一大会内で同じキラーを再使用することは禁止です。"
            ]
        });
        upsertKillerSection({
            id: "killer-under-review",
            title: "調整中項目",
            status: "attention",
            statusLabel: "調整中",
            body: [
                "ジャッジメントの使用可否は調整中です。",
                "喰種使用時の死人のスイッチは調整中です。"
            ]
        });
        upsertKillerSection({
            id: "killer-banned-perks",
            title: "禁止キラーパーク",
            status: "attention",
            statusLabel: "調整中",
            body: [
                "禁止キラーパークは現在調整中です。",
                "現時点では、露見する闇、隠れ場なし、捕食者、狩りの興奮、幻影の震撼を禁止候補として扱います。"
            ]
        });
        upsertKillerSection({
            id: "killer-conditional-perks",
            title: "条件付き禁止キラーパーク",
            status: "attention",
            statusLabel: "調整中",
            body: [
                "アンフォーシーンは屋内MAPでは使用禁止です。",
                "死人のスイッチは、ナース、ブライト、ヒルビリー、その他キラーは使用可、シンギュラリティは使用不可、喰種は調整中です。"
            ]
        });
        upsertKillerSection({
            id: "killer-map-settings",
            title: "MAP制限",
            status: "attention",
            statusLabel: "調整中",
            body: [
                "キラーごとに使用可能MAPプールを設定します。",
                "キラー側は、使用するキラーに対応したMAPプールの中からMAPを選択します。",
                "MAPプールに含まれていないMAPは使用不可です。",
                "各キラーの具体的な使用可能MAPは現在調整中です。"
            ]
        });
        upsertKillerSection({
            id: "killer-map-limit",
            title: "MAP再使用制限",
            body: [
                "同じチームが、一度使用したMAPを再使用することは禁止です。",
                "MAP再使用制限はチーム単位で適用します。",
                "他チームが使用したMAPを、自チームが使用することは可能です。",
                "MAPオファリングは、キラー・サバイバーともに使用禁止です。"
            ]
        });
        upsertKillerSection({
            id: "killer-addon-points",
            title: "アドオン制限",
            status: "attention",
            statusLabel: "調整中",
            body: [
                "アドオンポイント上限はキラーとMAPの組み合わせごとに設定します。",
                "各アドオンのポイントは個別性能を基準に設定します。",
                "併用禁止アドオンはキラーとMAPの組み合わせごとに設定します。",
                "ノーアドオンは選択可能です。",
                "各キラーのMAPプール、各キラーとMAPの組み合わせごとのポイント上限、各アドオンのポイント、併用禁止アドオン一覧は調整中です。"
            ]
        });
    }

    window.frogCupVol1Overview = {
        sections: [
            {
                id: "overview-event",
                title: "開催情報",
                items: [
                    { id: "overview-event-date", title: "開催日", body: ["2026/09/12"] },
                    { id: "overview-start-time", title: "試合開始時刻", status: "attention", statusLabel: "調整中", body: ["後日発表"] },
                    { id: "overview-entry-period", title: "エントリー期間", status: "attention", statusLabel: "調整中", body: ["後日発表"] },
                    { id: "overview-teams", title: "募集チーム数・賞品", list: ["募集チーム数は6チームです。", "応募多数の場合、最大8チームまで拡張する場合があります。", "応募多数の場合、ご希望に添えない場合があります。", "賞品・賞金はありません。"] }
                ]
            },
            {
                id: "overview-eligibility",
                title: "参加条件",
                list: ["対応プラットフォームは PS4 / PS5 / Steam 限定です。", "メンバー全員が Discord に参加できる必要があります。", "メンバー全員が X アカウントを所持している必要があります。", "鍵アカウントでの参加はできません。", "参加地域は日本・韓国在住です。", "未成年は保護者同意がある場合に参加可能です。", "VCは配信に載せません。"],
                note: "当選チームの代表者には、XのDMで大会用DiscordサーバーのURLを送付します。各メンバーは、代表者から共有されたURLよりDiscordサーバーへ入室します。"
            },
            { id: "overview-team", title: "チーム構成", list: ["登録人数は最大5名です。", "最低参加人数は4名です。", "控え選手は事前登録者のみ参加可能です。", "個人参加枠はありません。", "キラー交代は、登録メンバー内であれば、誰が何回担当しても構いません。", "4人チームでも参加可能です。", "ただし、万が一に備えて補欠を用意することを推奨します。"] },
            {
                id: "overview-entry",
                title: "エントリー方法",
                status: "attention",
                statusLabel: "調整中",
                body: ["エントリーはGoogleフォームから受け付けます。", "システム的に対応可能な場合、今後サイト内フォームからの応募にも対応予定です。"],
                list: ["チーム名", "代表者名", "代表者Xアカウント", "選手名", "各選手のXアカウント", "各選手の対応プラットフォーム", "各選手の未成年確認", "チーム紹介文は任意"],
                note: "エントリー用GoogleフォームURLは未設定です。URLは確定後に掲載します。"
            },
            { id: "overview-announcement", title: "当選発表", list: ["Xで発表します。", "大会サイトへ掲載します。", "代表者へDMで連絡します。", "予選ブロックは運営が割り振ります。", "応募多数の場合、ご希望に添えない場合があります。"] }
        ]
    };

    window.frogCupVol1SurvivorRules = {
        sections: [
            { id: "survivor-basic", title: "基本制限", list: ["同一パークはチーム内で重複禁止です。", "サバイバーキャラクターはチーム内で重複禁止です。", "レジェンダリースキンは別キャラクター扱いです。", "アイテム持ち込みは全禁止です。", "サバイバーオファリングは全禁止です。"] },
            { id: "survivor-perks", title: "サバイバーパーク制限", groups: [{ label: "禁止サバイバーパーク", items: ["安心感", "ベビーシッター", "恵みパーク全般", "重責"] }, { label: "制限サバイバーパーク", items: ["解放", "邪気", "解放と邪気は、同じチーム内で同時に採用できません。", "同じパークを複数人が採用することもできません。"] }] },
            { id: "survivor-items", title: "アイテム・オファリング", list: ["サバイバーのアイテム持ち込みは全禁止です。", "チェストから入手したアイテムは使用可能です。", "劇作法など、試合中に生成されたアイテムも使用可能です。", "ただし鍵は使用禁止です。", "鍵はチェストから入手した場合や、試合中に生成された場合でも使用できません。", "サバイバーのオファリングは全禁止です。"] },
            { id: "survivor-totem", title: "トーテム", list: ["発電機が1台修理完了するまで、呪いのトーテムを破壊することは禁止です。", "無力なトーテムは、試合開始直後から破壊可能です。", "恵みパークは禁止のため、恵みのトーテム作成はできません。"] },
            { id: "survivor-cenobite-unexpected", title: "セノバイトの箱と予想外の展開", list: ["セノバイトの箱を所持した状態で、予想外の展開を使用する行為は禁止です。"] },
            { id: "survivor-actions", title: "AFC・回避行動・エモート", list: ["AFCによる自力脱出は、原則としてサバイバーパーク効果によるもののみ可能です。", "通電後のゲート付近における自力脱出は可能です。", "ブライトの突進やヒルビリーのチェーンソーに対するしゃがみ回避は可能です。", "エモートは、板の中央で倒れる場合、またはゲート内で脱出を目的として使用する場合のみ可能です。", "明らかに煽りを目的としたエモートは禁止です。"] },
            { id: "survivor-manners", title: "煽り行為の禁止", list: ["屈伸、エモート、ライトカチカチ等、明らかに煽りを目的とした行為は禁止です。", "動画で確認できた場合は、違反側の敗北とします。", "動画等の証拠がない場合は、厳重注意とします。"] }
        ]
    };

    window.frogCupVol1Faq = {
        sections: [
            { id: "faq-about", title: "大会について", items: [{ id: "faq-about-date", title: "Q. 開催日はいつですか？", body: ["A. 開催日は2026/09/12です。試合開始時刻は後日発表します。"] }, { id: "faq-about-prize", title: "Q. 賞品や賞金はありますか？", body: ["A. 賞品・賞金はありません。"] }, { id: "faq-about-teams", title: "Q. 募集チーム数はいくつですか？", body: ["A. 募集チーム数は6チームです。応募多数の場合、最大8チームまで拡張する場合があります。"] }, { id: "faq-about-many", title: "Q. 応募多数の場合はどうなりますか？", body: ["A. 応募多数の場合、ご希望に添えない場合があります。"] }] },
            { id: "faq-eligibility", title: "参加条件について", items: [{ id: "faq-platform", title: "Q. 対応プラットフォームは何ですか？", body: ["A. PS4 / PS5 / Steam限定です。"] }, { id: "faq-discord", title: "Q. Discordは必要ですか？", body: ["A. メンバー全員がDiscordに参加できる必要があります。当選チームの代表者へXのDMでDiscordサーバーURLを送付します。"] }, { id: "faq-x", title: "Q. Xアカウントは必要ですか？", body: ["A. メンバー全員がXアカウントを所持している必要があります。鍵アカウントでの参加はできません。"] }, { id: "faq-minor", title: "Q. 未成年でも参加できますか？", body: ["A. 保護者の同意がある場合は参加可能です。大会参加、配信・アーカイブ、Discord・Xの利用について、事前に同意を得てください。"] }, { id: "faq-solo", title: "Q. 個人参加はできますか？", body: ["A. 個人参加枠はありません。チーム単位で応募してください。"] }] },
            { id: "faq-entry", title: "エントリーについて", items: [{ id: "faq-entry-method", title: "Q. エントリー方法は何ですか？", body: ["A. Googleフォームから受け付けます。サイト内フォームからの応募については現在調整中です。"] }, { id: "faq-entry-size", title: "Q. チームは何人まで登録できますか？", body: ["A. 1チーム最大5名まで登録できます。最低参加人数は4名です。"] }, { id: "faq-entry-four", title: "Q. 4人チームでも参加できますか？", body: ["A. 参加可能です。ただし、万が一に備えて補欠を用意することを推奨します。"] }, { id: "faq-entry-sub", title: "Q. 控え選手は使えますか？", body: ["A. 事前登録されたメンバーのみ控え選手として参加可能です。未登録の選手を当日追加することはできません。"] }] },
            { id: "faq-rules", title: "試合ルールについて", items: [{ id: "faq-killer-repeat", title: "Q. 同じキラーを複数回使えますか？", body: ["A. 使えません。同じチームが、同一大会内で同じキラーを再使用することは禁止です。"] }, { id: "faq-killer-player", title: "Q. キラー担当は固定ですか？", body: ["A. 固定ではありません。登録メンバー内であれば、誰が何回キラーを担当しても構いません。"] }, { id: "faq-map-repeat", title: "Q. 同じMAPを複数回使えますか？", body: ["A. 同じチームが、一度使用したMAPを再使用することは禁止です。MAP再使用制限はチーム単位で適用します。"] }, { id: "faq-item-carry", title: "Q. サバイバーのアイテム持ち込みはできますか？", body: ["A. できません。サバイバーのアイテム持ち込みは全禁止です。"] }, { id: "faq-chest-item", title: "Q. チェストから出たアイテムは使えますか？", body: ["A. 使用可能です。ただし、鍵は使用禁止です。チェストから入手した場合や試合中に生成された場合でも使用できません。"] }, { id: "faq-cenobite", title: "Q. セノバイトの箱を持った状態で予想外の展開を使えますか？", body: ["A. 使用できません。セノバイトの箱を所持した状態で、予想外の展開を使用する行為は禁止です。"] }, { id: "faq-no-power-exit", title: "Q. 非通電時のハッチ・ゲート脱出はどう扱いますか？", status: "attention", statusLabel: "調整中", body: ["A. 現在調整中です。確定次第、ルールページとお知らせで案内します。"] }] },
            { id: "faq-progress", title: "試合進行・違反対応について", items: [{ id: "faq-check-who", title: "Q. 試合前の構成確認は誰が行いますか？", body: ["A. 運営がVCで確認します。"] }, { id: "faq-check-when", title: "Q. 構成確認はいつ行いますか？", body: ["A. ロビー入室前に行います。"] }, { id: "faq-check-change", title: "Q. 構成確認後に変更できますか？", body: ["A. できません。確認後の構成変更は原則禁止です。"] }, { id: "faq-start-call", title: "Q. 試合開始は誰が合図しますか？", body: ["A. 運営がゲーム内チャットにて合図します。"] }, { id: "faq-result-shot", title: "Q. リザルトスクリーンショットは必要ですか？", body: ["A. 必要です。試合終了後、両チームがリザルト画面のスクリーンショットを提出してください。"] }, { id: "faq-recording", title: "Q. 録画は必要ですか？", body: ["A. 異議申し立ての証拠として必要になる場合があります。必要に応じて確認できるよう、各自ウィンドウ録画を行ってください。"] }, { id: "faq-objection-limit", title: "Q. 異議申し立てはいつまで可能ですか？", body: ["A. 試合中に起こったことへの異議申し立ては、次の試合に移る前までに証拠とともに行ってください。"] }, { id: "faq-urgent", title: "Q. 急を要するトラブルが起きた場合はどうすればよいですか？", body: ["A. VCに運営を呼んでください。"] }, { id: "faq-score", title: "Q. スコア違いの異議申し立てはできますか？", body: ["A. リザルトスクリーンショットが提出されていない場合、スコア違いに関する異議申し立てはできません。"] }, { id: "faq-penalty", title: "Q. 禁止構成を使った場合はどうなりますか？", status: "attention", statusLabel: "調整中", body: ["A. ペナルティ対象です。具体的なペナルティ内容は現在調整中です。"] }, { id: "faq-manner", title: "Q. 煽り行為は禁止ですか？", body: ["A. 禁止です。屈伸、エモート、ライトカチカチ等、明らかに煽りを目的としたプレイは禁止です。動画で確認できた場合は、違反側の敗北とします。また、今後の出場を禁止する場合があります。"] }] },
            { id: "faq-submit-contact", title: "構成提出・問い合わせについて", items: [{ id: "faq-submit-page", title: "Q. 構成提出ページはいつ使えますか？", body: ["A. 現在準備中です。公開まではComing soonとして表示します。"] }, { id: "faq-simulator", title: "Q. MAP・アドオンシミュレーターは使えますか？", body: ["A. 現在準備中です。公開後は、キラーごとの使用可能MAPやアドオンポイントを確認できるようにします。"] }, { id: "faq-contact-how", title: "Q. FAQにない内容を確認したい場合はどうすればよいですか？", body: ["A. 問い合わせフォームからご連絡ください。全体に関係する内容は、必要に応じてFAQへ追記し、お知らせで更新内容を掲示します。"] }] }
        ]
    };

    window.frogCupVol1Contact = {
        sections: [
            { id: "contact-route", title: "問い合わせフォーム", status: "attention", statusLabel: "調整中", body: ["初期方式は Googleフォームへ遷移する想定です。", "問い合わせ対象者は誰でも可能です。", "問い合わせ内容を確認し、全体に関係する内容はFAQへ随時追加します。", "FAQ更新時はサイトのお知らせにも更新内容を掲示します。"], note: "問い合わせ用GoogleフォームURLは未設定です。URLは確定後に掲載します。" },
            { id: "contact-future", title: "将来検討中の方式", status: "attention", statusLabel: "調整中", list: ["Googleフォーム埋め込み", "サイト内フォームからGoogleフォーム送信", "Googleスプレッドシート連携", "結果順位表の自動反映", "運営用入力ページ"] },
            { id: "contact-fields", title: "問い合わせフォーム項目", list: ["チーム名：該当者のみ", "名前：必須", "Xアカウント：必須", "問い合わせ種別：必須", "問い合わせ内容：必須"] },
            { id: "contact-types", title: "問い合わせ種別", list: ["エントリーについて", "参加条件について", "基本ルールについて", "サバイバー制限について", "キラー制限について", "MAP・構成提出について", "サイト表示について", "その他"] }
        ]
    };
})();
