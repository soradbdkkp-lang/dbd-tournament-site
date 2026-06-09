# AGENTS.md

## プロジェクト概要

このリポジトリは、Dead by Daylight 大会用サイトおよび大会ルール管理用ドキュメントを扱う。
参加者がルール、MAP、キラー制限、ポイント制、告知を確認しやすいサイトを目指す。
現行サイトは静的HTML/CSSで構成されており、React + Vite + TypeScriptへ段階的に移行する。

## 最優先方針

- 競技性に重きを置きつつ、多様なキラーが活躍できる環境を目指す。
- 参加者に誤解を与えないよう、未確定事項は「未定」「検討中」と明記する。
- 実装よりも、既存ルール・既存ドキュメントとの整合性を優先する。
- 不明点、未定義事項、判断が分かれる事項は、推測で実装せずユーザに確認する。

## 作業前の必須確認

実装、修正、削除、リネーム、移動、設定変更、依存関係追加を行う前に、必ずプロジェクトルートの `docs` 配下を確認する。
記憶、推測、ファイル名だけで判断してはならない。

PowerShell 環境では、最低限以下に相当する確認を行う。

```powershell
Get-Location
Get-ChildItem -Force
Get-ChildItem .\docs -Recurse -File | Sort-Object FullName | Select-Object FullName, Length, LastWriteTime
Get-ChildItem .\docs -Recurse -File | Sort-Object FullName | ForEach-Object {
  Write-Host "`n===== $($_.FullName) ====="
  Get-Content $_.FullName -Raw
}
```

調査結果を読んでから、判断、実装、検証に進むこと。

## 作業フェーズ

作業は原則として以下の順に分ける。

1. 調査
   - 現状ファイル、既存ドキュメント、既存仕様、影響範囲を確認する。
2. 判断
   - 変更方針、未確定事項、ユーザ確認が必要な点を整理する。
3. 実装
   - ユーザの承認後に、最小範囲で変更する。
4. 検証
   - 表示、リンク、ルール文言、既存機能の影響を確認する。
5. 後片付け
   - 一時ファイル、不要ログ、未使用ファイルを整理する。
   - ドキュメント索引と関連リンクを更新する。

現状確認や実装確認を依頼された場合、同じ返答・同じ作業内で実装まで進めない。
まず確認結果を読み、解釈と次の方針を提示する。

## ドキュメント配置ルール

`docs/README.md` をドキュメント索引として維持する。
ドキュメントの追加、移動、改名、削除を行う場合は、同じ作業内で `docs/README.md` と関連リンクも更新する。

目的別の配置は以下とする。

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

プロジェクトルート直下に Markdown を作成するのは原則 `README.md` のみとする。
例外として、このプロジェクトでは以下をルート直下に置く。

- `AGENTS.md`: Codex および開発エージェント向け作業指示
- `DESIGN.md`: サイト全体のデザイン方針

## 既存ドキュメントの扱い

既存ドキュメントは履歴と意図を残す。
内容の重複、古い案、検討中事項があっても、ユーザ確認なしに削除しない。
再編する場合は、先に内容を確認し、移動理由と移動先を明示する。

## ルール文言の扱い

大会ルールは参加者に直接影響するため、以下を守る。

- 確定事項と検討中事項を混在させない。
- 禁止、制限、例外、加算条件は明確に書く。
- 変更履歴または変更理由を可能な限り残す。
- ゲームバージョンやチャプター範囲に依存する事項は、更新確認が必要であることを明記する。

## 実装時の制約

移行先のフロントエンドはReact + Vite + TypeScriptとし、パッケージ管理にはnpmを使用する。
React Router、UIライブラリ、Dockerは初期構成へ導入しない。
Node.js、npm、Vite、Reactなどの導入や更新は、ユーザ承認がある場合のみ行う。

実装時は以下を避ける。

- 既存HTML/CSSの大幅な全面書き換え
- ルール文言の意味が変わる変更
- 未確認の外部ライブラリ追加
- 未承認のビルドツール導入
- 既存ファイル削除

## Node.js・npm運用

- Node.jsとnpmの導入は、採用バージョンと導入方法を確認してから行う。
- `npm install`、`npm update`、`npm audit fix`は依存関係を変更する操作として扱い、実行前にユーザ確認を行う。
- 新規パッケージを追加する場合は、目的、代替案、影響範囲を提示して承認を得る。
- `package.json`と`package-lock.json`は同じ作業内で整合性を確認する。
- グローバルnpmパッケージを前提としない。
- React Router、UIライブラリ、テストライブラリは、初期導入対象に含めない。

## 公開データ管理

- 大会ルール、キラー制限、MAP、ポイント制度の正本は`docs`とする。
- 将来作成する`src/data`は、ユーザが公開を承認した内容だけを保持する表示用コピーとする。
- 草案、検討中事項、運営メモを推測で`src/data`へ転記しない。
- 未確定状態は`status`で管理し、公開可否は`isPublished`で別に管理する。
- `isPublished: false`のデータは公開画面へ表示しない。
- `docs`と`src/data`が矛盾する場合は実装を停止し、ユーザへ確認する。
- `src/data`の内容を根拠として`docs`のルールを変更しない。

## React移行中の既存ファイル

- `index.html`、`rules.html`、`about.html`、`style.css`は移行完了まで比較・復旧用に保持する。
- 旧HTML/CSSをユーザ承認なしに削除、改名、移動、上書きしない。
- `about.html`は当面プレースホルダとして扱う。
- `_cdxuser-*`は後日の退避対象とし、ユーザ承認なしに変更、削除、移動しない。
- CP932の既存ルール草案をUTF-8へ統一する作業は、React移行とは別フェーズで行う。

## React実装時の検証

- TypeScriptエラーがないことを確認する。
- Viteのビルドが成功することを確認する。
- 初期ページの`HomePage`、`RulesPage`、`NotFoundPage`を確認する。
- GitHub Pagesの`base`配下でリンクとアセットが解決することを確認する。
- スマホ幅とPC幅の双方を確認する。
- 確定、検討中、未定、非公開の扱いが仕様どおりであることを確認する。

## PowerShell 前提

ユーザは PowerShell で開発している。
Linux系コマンドを提示する場合は PowerShell に読み替える。

例:

| Linux系 | PowerShell |
|---|---|
| `ls -la` | `Get-ChildItem -Force` |
| `cat file` | `Get-Content file -Raw` |
| `grep` | `Select-String` |
| `rm` | 原則禁止。削除ではなく退避または trash 運用を検討する |

## 破壊的コマンドの禁止

以下の操作は禁止する。必要な場合は、理由、影響範囲、復旧方法を提示し、ユーザの明示承認を得る。

- `Remove-Item`
- `rm`
- `del`
- `erase`
- `rmdir`
- `rd`
- `git reset --hard`
- `git clean`
- `git checkout -- <path>`
- `git restore <path>` による未保存変更の破棄
- `git push --force`
- `docker rm`
- `docker rmi`
- `docker volume rm`
- `docker system prune`
- `format`
- `diskpart`
- 権限変更、所有者変更、ACL変更

削除が必要な場合は、削除ではなく `_trash` または専用 trash コマンドによる退避を優先する。
ただし trash コマンドやラッパーが未整備の場合は、ユーザに確認する。

## Git運用

安全確認として以下は許可する。

- `git status`
- `git diff`
- `git log --oneline --decorate --graph -n 20`
- `git branch`

以下はユーザ確認後に実行する。

- `git add`
- `git commit`
- `git push`
- ブランチ作成
- リモート設定変更

以下は禁止または明示承認必須とする。

- force push
- reset hard
- clean
- 未確認のrebase
- 履歴改変

### GitHub定期レビュー運用

- 1つの意味ある作業単位が完了した時点をpush候補とする。
- push単位は「ドキュメント整備」「React環境導入」「ページ移植」「データ化」などのフェーズ単位とする。
- commitまたはpushを提案する前に、必ず`git status`と`git diff`相当で変更対象と差分を確認する。
- Codexは、変更要約、影響範囲、検証結果、未決事項、commit message案をユーザへ提示する。
- `git add`、`git commit`、`git push`は、commit message案を提示した後、ユーザの明示承認を得てから実行する。
- Codexは定期レビュー運用を理由に無断でcommitまたはpushしない。
- force pushは禁止する。
- `git reset --hard`、`git clean`、rebaseなど、履歴または未保存変更へ影響する操作は禁止または個別の明示承認必須とする。
- GitHubレビューで指摘された内容は、`docs/issues`または該当する`docs`へ反映し、必要に応じて未決事項として管理する。

## Codex運用

Codex は原則として専用の非管理者ユーザからのみ使用する。
既存の通常ユーザでの Codex 実装作業は、専用ユーザと権限設計が完了するまで避ける。

Codexの実行時は、次の方針を守る。

- `danger-full-access` 相当の権限は使用しない。
- `--yolo` や承認回避系オプションは使用しない。
- 作業対象はプロジェクトワークスペース内に限定する。
- ネットワークアクセス、依存関係追加、外部API利用は事前確認する。
- Codexに実装を依頼する前に、必ず `docs` と `DESIGN.md` を読ませる。

## デザイン変更時の参照

UI、見た目、配色、レイアウト、レスポンシブ対応、コンポーネント変更を行う前に、必ず `DESIGN.md` を確認する。

デザイン参考資料とgetdesign由来の指示は、次の順序で確認する。

1. `DESIGN.md`で全体方針と参照先を確認する。
2. `docs/ui/design-references.md`で参考資料の役割と優先順位を確認する。
3. getdesign由来の具体的な実装指示がある場合は、`docs/ui/getdesign-implementation-instructions.md`を確認する。

- `docs/DESIGN-claude.md`は、主にフォント、余白、雰囲気、世界観、画面全体の印象、文体トーンの参考とする。
- `docs/DESIGN-cohere.md`は、主に色遣い、配色、カラートークン、背景色、強調色、警告色、状態色の参考とする。
- 色に関する判断では`docs/DESIGN-cohere.md`を優先する。
- フォント、雰囲気、質感、演出方向では`docs/DESIGN-claude.md`を優先する。
- 両資料、`DESIGN.md`、既存docs、getdesign指示が矛盾する場合は実装せず、矛盾点を整理してユーザへ確認する。
- getdesign由来の指示には、取得日、対象画面、適用範囲、未適用項目、実装時の注意点を記録する。
- getdesign指示を実装へ反映した場合は、変更履歴または該当するdocsへ反映する。

## 未定義事項の確認

以下に該当する場合は、ユーザに質問する。

- ルールとして確定しているか不明
- 禁止、制限、例外の扱いが不明
- 表示文言のトーンが不明
- デザイン方針と実装方針が衝突する
- 既存文書間で内容が矛盾する
- 破壊的操作、移動、削除、権限変更が必要
- 外部サービス、API、ビルドツール、ライブラリの導入が必要

## 期待する回答形式

開発支援時は、原則として以下の順に説明する。

1. 確認した内容
2. 判断
3. 変更方針
4. 実装手順
5. 検証手順
6. 残課題
