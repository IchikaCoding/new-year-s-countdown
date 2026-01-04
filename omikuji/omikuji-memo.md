# 2026-01-03

## API かお正月アプリかで悩む

まず「お正月アプリ」を土台として整える!

- [x] 背景画像を華やかにする
- [ ] ボタン押下時に震えるアニメーションを付ける
  - [ ] `.shake-animation`を `container`クラスに実装してカード自体をしゃかしゃかさせる
- [ ] 非同期の練習は「模擬 fetch（ダミー）」から始める

その後、API を足す

- [ ] 無料の簡単なエンドポイント例: https://jsonplaceholder.typicode.com/todos/1（JSON を返すので練習に最適）。
- [ ] fetch で取得 → await res.json() → 中身を結果表示部や console に出す
- [ ] エラーハンドリング（try/catch）とローディング表示を入れて非同期の基本を練習。
