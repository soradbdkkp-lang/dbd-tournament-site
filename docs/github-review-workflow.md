# GitHubレビュー運用

## 基本方針

1つの意味ある作業単位が完了したら、GitHub push候補として扱う。

## push前に必ず確認すること

- 変更ファイル一覧
- 変更要約
- 検証結果
- 未決事項
- commit message案
- `git status --short`
- `git diff --stat`
- `git diff`

## 禁止事項

ユーザー承認なしに以下を実行しない。

- `git add`
- `git commit`
- `git push`
- `git push --force`
- `git reset --hard`
- `git clean`

## 推奨タイミング

以下のタイミングでpush候補化する。

- デザイン更新が完了したとき
- ルール表示を更新したとき
- 新ページを追加したとき
- React移行など構成変更を行ったとき
- GitHub Pages公開設定を変更したとき

## commit message例

- `style: refresh static tournament pages`
- `docs: add github review workflow`
- `chore: initialize repository`
