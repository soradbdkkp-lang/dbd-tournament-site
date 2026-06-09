# Codex Windows PowerShell 安全運用方針

## 目的

Windows PowerShell環境でCodexを安全に使用するための運用方針を定義する。

## 現状

- OS: Windows 10 Home
- Shell: Windows PowerShell 5.1
- Codex: 導入済み
- Git: 導入済み
- Node.js / npm: 未導入
- Docker: 未導入、初期構成では使用しない
- 作業ディレクトリ: `C:\Projects\dbd-tournament-site`
- 現行サイト: 静的HTML/CSS
- 移行先: React + Vite + TypeScript
- パッケージマネージャー: npm

React、Vite、TypeScript、Node.js、npmの導入作業はまだ実施していない。

## 基本方針

Codexは専用の非管理者ユーザから使用する。
作業対象は`C:\Projects\dbd-tournament-site`配下に限定する。
管理者PowerShell、承認回避設定、ワークスペース外への書き込みを常用しない。

## 現在の作業構成

| 項目 | 現在値 |
|---|---|
| Codex実行ユーザ | `cdxuser` |
| 権限 | 非管理者、Usersグループ |
| 作業ディレクトリ | `C:\Projects\dbd-tournament-site` |
| 通常ユーザの役割 | レビュー、GitHub管理、必要に応じた管理者承認 |
| Codexユーザの役割 | ワークスペース内の調査、承認済み編集、検証 |

`docs/issues/open-decisions.md`にあるユーザ名候補など、過去の未決事項は現状と照合して整理する。

## OneDrive外での運用

現在の作業コピーは`C:\Projects\dbd-tournament-site`にあり、OneDrive配下ではない。
これにより、別ユーザからOneDriveへアクセスするためのACL調整や同期中ファイルの影響を避ける。

OneDrive側に別コピーが存在する場合、その同期・正本関係は未決事項として扱う。

## React移行方針

- React + Vite + TypeScriptを採用する。
- パッケージ管理にはnpmを使用する。
- React Router、UIライブラリ、Dockerは初期導入しない。
- 初期ページは`HomePage`、`RulesPage`、`NotFoundPage`とする。
- 大会ルールの正本は`docs`とする。
- 将来の`src/data`は承認済み表示用コピーとする。
- 未確定状態は`status`、公開可否は`isPublished`で管理する。
- GitHub Pages対応を前提とする。
- GitHub Actions設定は別フェーズとする。

## Node.js・npm運用

- Node.jsとnpmの導入は、バージョンと導入方法のユーザ承認後に行う。
- npmコマンドによる依存追加・更新は、実行前に確認する。
- 新規パッケージは、目的、代替案、影響範囲を提示して承認を得る。
- グローバルnpmパッケージを前提にしない。
- `package.json`と`package-lock.json`の整合性を同じ作業内で確認する。
- `npm audit fix`を自動実行しない。

具体的な導入・検証方針は`docs/development/react-vite-setup.md`で管理する。

## 旧ファイルの保護

React移行完了まで以下を保持する。

- `index.html`
- `rules.html`
- `about.html`
- `style.css`

これらをユーザ承認なしに削除、改名、移動、上書きしない。
`about.html`は当面プレースホルダとして扱う。

`_cdxuser-*`は後日の退避対象であり、現時点では削除、移動、変更しない。

CP932の既存ルール草案をUTF-8へ統一する作業は別フェーズとする。

## 禁止する運用

- 管理者PowerShellでCodexを常用する。
- `danger-full-access`相当の権限でCodexを動かす。
- 承認回避系オプションを使う。
- Codexに削除、リセット、クリーンアップを一任する。
- 未確認の外部ライブラリを導入する。
- Docker前提の手順を作る。
- 旧HTML/CSSを移行途中で削除する。
- `_cdxuser-*`を承認なしに削除、移動する。

## 破壊的操作の扱い

削除、強制上書き、履歴改変、権限変更、外部公開に関わる操作は、ユーザの明示承認が必要。

禁止または承認必須の例:

- `Remove-Item`
- `rm`
- `del`
- `rmdir`
- `git reset --hard`
- `git clean`
- `git push --force`
- `docker system prune`
- ACL変更

## trash運用方針

削除ではなく退避を基本とする。
将来的に`tools/trash.ps1`のような安全退避スクリプトを用意し、対象を`_trash/YYYYMMDD-HHMMSS/`へ移動する。

trashスクリプトが未整備の段階では、Codexに削除を実行させない。

## Gitラッパー方針

将来的に`tools/git-safe.ps1`を作成し、よく使うGit操作だけを許可する案がある。

初期許可候補:

- status
- diff
- log
- branch

承認制候補:

- add
- commit
- push

禁止候補:

- reset --hard
- clean
- push --force
- reflog expire
- gc --prune

## Codex作業前チェック

1. 専用の非管理者ユーザで作業しているか。
2. 作業ディレクトリが`C:\Projects\dbd-tournament-site`か。
3. `AGENTS.md`を確認したか。
4. `DESIGN.md`を確認したか。
5. `docs/README.md`と関連文書を確認したか。
6. 作業範囲がユーザ承認済みか。
7. 依存追加、外部通信、破壊的操作が含まれないか。
8. 旧HTML/CSSと`_cdxuser-*`を保護できているか。
9. ルール草案を確定事項として扱っていないか。

## React環境導入前チェック

1. Node.jsのバージョンが決定しているか。
2. Node.jsの導入方法が承認されているか。
3. Viteの構築方法が決定しているか。
4. 既存`index.html`の保持方法が決定しているか。
5. 初期ルーティング方式が決定しているか。
6. GitHubリポジトリ名とPages公開URLが確認されているか。
7. 実行予定のnpmコマンドが承認されているか。

## 残課題

- Node.jsの採用バージョンを決める。
- Node.jsの導入方法を決める。
- 初期ルーティング方式を決める。
- GitHubリポジトリ名とPages公開URLを確認する。
- 旧`index.html`を保持しながらViteを構築する方法を決める。
- `tools/trash.ps1`の仕様を決める。
- `tools/git-safe.ps1`の仕様を決める。
- OneDrive側に別コピーがある場合の正本関係を確認する。
- Windows sandboxの動作確認を継続する。
