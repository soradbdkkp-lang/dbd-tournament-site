# docs README

## 目的

このディレクトリは、大会用サイト、大会ルール、フロントエンド設計、開発・公開手順に関するドキュメントを管理する。
実装、修正、デザイン変更、ルール変更を行う前に、必ず関連ドキュメントを確認する。

## 現在の状態

- 現行サイトは静的HTML/CSSで構成されている。
- 移行先としてReact + Vite + TypeScriptを採用している。
- パッケージ管理にはnpmを使用する。
- React Router、UIライブラリ、Dockerは初期導入しない。
- React本体、Node.js、npm、Viteはまだ導入していない。
- 既存ルール文書には内容の重複、草案、検討中事項が残っている。
- 旧HTML/CSSは移行完了まで保持する。

## 正本と実装データ

- 大会ルール、キラー制限、MAP、ポイント制度の正本は`docs`とする。
- 将来作成する`src/data`は、ユーザが公開を承認した内容だけを保持する表示用コピーとする。
- `src/data`から`docs`へ仕様を逆輸入しない。
- `docs`と表示用コピーが矛盾する場合は、実装を停止してユーザへ確認する。
- 未確定状態は`status`、公開可否は`isPublished`で別に管理する。
- `isPublished: false`の内容を公開画面へ表示しない。

## ドキュメント分類方針

| ディレクトリ | 用途 |
|---|---|
| `docs/requirements` | 要件、引き継ぎ、イベント概要、業務ルール |
| `docs/architecture` | 設計、インフラ、データモデル、処理フロー |
| `docs/ux` | 画面設計、UX方針、導線設計 |
| `docs/ui` | テーマ、コンポーネント、スタイル、見た目の仕様 |
| `docs/features` | 機能仕様、画面別仕様、操作仕様 |
| `docs/integrations` | 外部API、外部サービス、データ連携 |
| `docs/development` | 環境構築、テストデータ、開発メモ、ドキュメント方針 |
| `docs/issues` | 課題、リスク、未決事項 |
| `docs/operations` | リリース、バックアップ、復旧、本番運用手順 |

## 要件

| ファイル | 内容 |
|---|---|
| `docs/requirements/event-naming.md` | サイト名、大会シリーズ名、開催回の名称体系と将来拡張方針 |
| `docs/requirements/event-overview.md` | ふろぐCup Vol.1の公開可能な大会概要と開催予定日 |

## ルール草案

| ファイル | 内容 | 現時点の扱い |
|---|---|---|
| `docs/addon-points.md` | アドオンポイント、強力アドオン候補 | 草案。公開前に確認が必要 |
| `docs/killer-points.md` | キラーポイント、分類、ポイントドラフト案 | 重複あり。公開前に確認が必要 |
| `docs/map-pool.md` | MAPプール、室内・屋外MAP候補 | 草案。候補と確定の分離が必要 |
| `docs/point-system.md` | ポイントドラフトシステム | 見出し重複あり。整理候補 |
| `docs/tournament-rule.md` | 大会概要、勝敗判定、サバイバー・キラールール | 公開ルールと運営メモの分離候補 |

上記の既存草案はCP932を含む。UTF-8への統一はReact移行とは別フェーズで行う。

## アーキテクチャ

| ファイル | 内容 |
|---|---|
| `docs/architecture/frontend-architecture.md` | React + Vite + TypeScriptの構成、責務、移行方針 |
| `docs/architecture/public-data-model.md` | 公開データの型、正本関係、承認フロー |

## 機能仕様

| ファイル | 内容 |
|---|---|
| `docs/features/initial-pages.md` | HomePage、RulesPage、NotFoundPageの初期仕様 |

## UI仕様

| ファイル | 内容 |
|---|---|
| `docs/DESIGN-claude.md` | フォント、余白、雰囲気、世界観、画面全体の印象、文体トーンの参考資料 |
| `docs/DESIGN-cohere.md` | 配色、カラートークン、背景色、強調色、警告色、状態色の参考資料 |
| `docs/ui/design-references.md` | デザイン参考資料の役割、参照優先順位、矛盾時の扱い |
| `docs/ui/getdesign-implementation-instructions.md` | getdesign由来の具体的な実装指示の記録先。現時点では実指示未投入 |
| `docs/ui/component-guidelines.md` | 共通コンポーネント、状態表示、アクセシビリティ方針 |

## 開発

| ファイル | 内容 |
|---|---|
| `docs/development/codex-windows-setup.md` | Windows PowerShell前提のCodex安全運用方針 |
| `docs/development/react-vite-setup.md` | React + Vite + TypeScriptの導入・検証方針 |

## 課題・未決事項

| ファイル | 内容 |
|---|---|
| `docs/issues/open-decisions.md` | 決定済み方針と確認待ち項目 |

## 運用

| ファイル | 内容 |
|---|---|
| `docs/operations/github-pages-release.md` | GitHub Pagesの公開、検証、復旧方針 |

## 作業ルール

- 実装前に`docs`配下を確認する。
- デザイン変更前にルート直下の`DESIGN.md`を確認する。
- デザイン変更時は`docs/ui/design-references.md`と対象の参考資料も確認する。
- 色の判断では`docs/DESIGN-cohere.md`、フォント、雰囲気、質感、演出方向では`docs/DESIGN-claude.md`を優先する。
- getdesign由来の具体的な指示は`docs/ui/getdesign-implementation-instructions.md`へ記録し、`DESIGN.md`へ全文を集約しない。
- デザイン資料または既存docsが矛盾する場合は、実装せずユーザへ確認する。
- Codex作業前にルート直下の`AGENTS.md`を確認する。
- ドキュメント追加、移動、改名、削除を行う場合は、この索引を更新する。
- 既存ドキュメントは、内容確認なしに削除しない。
- 検討中事項を確定事項として扱わない。
- React移行中も旧`index.html`、`rules.html`、`about.html`、`style.css`を保持する。
- `_cdxuser-*`は後日の退避対象とし、承認なしに削除、移動しない。
- Node.js、npm、Vite、Reactの導入と依存追加は、ユーザ承認後に行う。

## GitHub定期レビュー

- 1つの意味ある作業単位が完了したらpush候補とする。
- push単位は、ドキュメント整備、React環境導入、ページ移植、データ化などのフェーズ単位とする。
- push前に`git status`と`git diff`相当を確認する。
- Codexは変更要約、影響範囲、検証結果、未決事項、commit message案を報告する。
- `git add`、`git commit`、`git push`はユーザの明示承認後にのみ実行する。
- force pushは禁止する。reset hard、git clean、rebaseなどは、禁止または個別の明示承認必須とする。
- GitHubレビューの指摘は`docs/issues`または該当するdocsへ反映する。

## 次に整理する候補

1. Node.jsの採用バージョンと導入方法を決定する。
2. 初期ルーティング方式を決定する。
3. GitHubリポジトリ名とPages公開URLを確認する。
4. 初期`RulesPage`へ公開するルールを承認する。
5. `tournament-rule.md`を公開ルールと運営メモに分離する。
6. `killer-points.md`と`point-system.md`の重複を整理する。
7. MAP、キラー、パーク、アドオン制限を個別仕様へ整理する。
8. 変更履歴の管理方法を決定する。
