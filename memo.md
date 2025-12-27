## アウトプットしたいこと

- setTimeOut とかのタイマー
- イベントループ
- Promise と async/await
- try-catch, throw new Error()
- fetch
- for await...of

## お正月カラー

レッド: #DC143C
ホワイト: #F8F8FF
ブラック: #000000
ゴールド: #FFD700

## 1 日 1 回、やること

1. それぞれのメソッドとかにチートシート作ってそれを見る

2. AI に「この技術を使う課題」を 1 つ出させる

3. 同じ型で実装してみる

4. 動いたら終わり(完成度 60%で OK)

## AI からの課題

ご要望の「1 日 1 問ずつ、機能に集中できる課題」を用意しました。
アウトプット確認用に、それぞれ動作すれば 60%で OK の形にしています。

課題セット（各 1 問）

- setTimeout タイマー: 5 秒後にメッセージを表示し、途中でキャンセルできる関数 startCancelableTimer を作る。
- キャンセル時と完了時で別メッセージを出す。

  - startCancelableTimer
  - まずは 5 秒後にメッセージを表示できるかどうか？
  - 次に，アボートで実行をキャンセルする？

- イベントループ: setTimeout(0) と Promise.resolve().then(...) のログ順序を説明するデモコードを作り、実行結果をコメントに書く。

- Promise / async-await: API 風関数 fetchUser() を Promise 版と async/await 版の 2 パターンで実装し、成功と失敗（throw）を両方テストする。

- try-catch, throw new Error(): divide(a, b) を実装し、0 除算時に throw new Error("Cannot divide by zero")。呼び出し側で try-catch して、エラー時は代替値を返す。

- fetch: https://jsonplaceholder.typicode.com/todos/1 を取得し、タイトルを表示。ネットワーク失敗をシミュレートするために、わざと URL を間違えたパスでも試し、catch でメッセージ表示。

- for await...of: async function\* ticker(n) で 1〜n を 0.5 秒間隔で yield し、for await...of で受け取って表示。途中で break したときの動作も確認。

## おすすめの回し方（1 日ループ）

- ステップ: (1) 簡易チートシート作成 → (2) 上の課題から 1 問選ぶ → (3) 同じ型で実装 → (4) 動作確認して終了。
- 回数: 1 日 1〜2 問で OK。時間がある日は 2 問、忙しい日は 1 問を確実に。
- 順番: 上から順にやるか、苦手なものを優先してピックアップで OK。

## わからない時は？

- まず自分でシンプルに試す（調べる前）
- うまくいかなければ:
  - 前に学んだコードを軽く見返して、最低限のヒントだけ拾う
  - コピペはしない
- まだよくわからなかったら MDN をチェック

## 悩み

- キャンセルしたのに焼き芋が完成しちゃう

```js
function startCancelableTimer() {
  const id = setTimeout(() => {
    alert("焼き芋完成✨️");
  }, 3000);
  console.log(id);
  return function () {
    clearTimeout(id);
  };
}
function cancelTimer() {
  setTimeout(() => {
    const cancel = startCancelableTimer();
    cancel();
    console.log("キャンセルされましたわよ～！！");
  }, 2000);
}

cancelTimer();
// cancel();
```
