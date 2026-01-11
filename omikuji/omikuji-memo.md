# 2026-01-03

## API かお正月アプリかで悩む

まず「お正月アプリ」を土台として整える!

- [x] 背景画像を華やかにする
- [x] ボタン押下時に震えるアニメーションを付ける
  - [ ] `.shake-animation`を `container`クラスに実装してカード自体をしゃかしゃかさせる
- [ ] 非同期の練習は「模擬 fetch（ダミー）」から始める

その後、API を足す

- [ ] 無料の簡単なエンドポイント例: https://jsonplaceholder.typicode.com/todos/1（JSON を返すので練習に最適）。
- [ ] fetch で取得 → await res.json() → 中身を結果表示部や console に出す
- [ ] エラーハンドリング（try/catch）とローディング表示を入れて非同期の基本を練習。

---

# 2026-01-05

- [ ] いちかどんゲットだぜ！
- [x] ゆらゆら揺れているときに裏事情が表示されている
- [ ] JS
  - [ ] コードを真似する
    - [x] ふりふり
    - [x] API 通信をする
  - [ ] ポケモンをランダムに取得するコードに修正
  - [ ] 関数分割？をする（1 つ 1 作業にする）

data オブジェクトはこんな感じ 👇️

```js
const data = {
  abilities: [
    {
      ability: { name: "しんりょく", url: "https://..." },
      slot: 1, // これはオマケで入っていることが多い
    },
    {
      ability: { name: "ようりょくそ", url: "https://..." },
      slot: 3,
    },
  ],
  // その他のフィールド
};
```

# 2026-01-06

- [x] HEX のカラーコード一覧を見る
- [x] なぜ`https://www.thecolorapi.com/id?hex=24B1E0`を URL で入力したら colorData のようなものが取れたの？JSON 文字列じゃないの？

## 修正箇所

- [ ] 占い結果がでた瞬間に色も表示したい →fetch じゃ実現できないかも？
- [ ] 音を付けてみたい
  - [ ] 春の海を声で収録して流す
- [ ] ガサガサ感が欲しい
- [ ] 黒だったら見えないかも
- [ ] 非同期処理の練習をする
- [ ] ラッキーカラーを取得中はぐるぐるさせる(finally)
- [ ] エラーになったら「一体どーしよ～」を流してみたい

# 2026-01-07

## やること

- [x] ラッキーカラー取得中はぐるぐる(finally)
  - [x] これのために追加したコードにコメントつける
- [ ] 結果と同時に色表示
  - [ ] 結果が揃ってから表示すれば OK→ これのコード ▶ を読む
- [ ] 非同期処理復習

```js
async function practice() {
  console.time("計測");
  console.log("やきいも");
  // resolveを即座にやってしまうと3秒待機は実現できず、、、
  // 3秒待機させたかったら、コールバックで包む・setTimeoutの第3引数を使う
  const waitIchika = new Promise((resolve) =>
    setTimeout(() => resolve("差し入れのお菓子"), 3000)
  );
  const ichikaDon = await waitIchika;
  console.log(ichikaDon);
  console.log("うなぎ");
  console.timeEnd("計測");
}
```

# 2026-01-08

- [ ] まず復習
  - [ ] Day3、6，7，9、10 ～ 13、
  - [ ] 4
- [ ] practice.js の 34 行目のコードを追加するところからスタート
  - [ ] 結果の表示とラッキーカラー表示を同時にするための修正をしている

## 復習すること

- [ ] 教材を素早く復習すること
- [ ] 自分ができていない部分を言語化できるようにする

```js
/**
 * TODO: 引数に代入はデフォルト？指定がなかったらその値を採用ってこと？
 * ラッキーカラー取得（タイムアウト付き）
 * @param {number} timeoutMs タイムアウト時間（ミリ秒）
 * @returns {Promise<{name: string, code: string}>}
 */
async function fetchLuckyColor(timeoutMs = 5000) {
  const hex = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0");
  // 新しいAbortControllerオブジェクトインスタンスを生成する
  const controller = new AbortController();
  // タイムアウト時間になったらcontroller.abort()を実行してそのタイマーのIDを取得
  const timerId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    // APIでリクエストして、オプションでコントローラーとつなげてHTTPレスポンスオブジェクトをもらう
    const res = await fetch(`https://www.thecolorapi.com/id?hex=${hex}`, {
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error("APIエラー");
    }

    const data = await res.json();
    return {
      name: data.name?.value ?? "カラーネームなし",
      code: data.hex?.value ?? `#${hex}`,
    };
  } catch (error) {
    // タイムアウトかどうか判定したいときは名前を見る
    if (error.name === "AbortError") {
      colorInfo;
    }
    // TODO: どうしてここでエラーを投げるの？
    throw error;
  } finally {
    // タイムアウトのタイマーをクリアにする
    clearTimeout(timerId);
  }
}
```

```js
// ここから下は元の練習コード（そのまま残す例）

async function main() {
  const response = await fetch("https://www.thecolorapi.com/id?hex=24B1E0");
  const colorData = await response.json();
  console.log(colorData);
}

console.log("A");

async function temp() {
  console.log("B");
  await Promise.resolve();
  console.log("C");
}
temp();
console.log("D");

async function practice() {
  console.time("計測");
  console.log("やきいも");

  // Promiseオブジェクトを作成して即座に返す
  // setTimeoutが3秒後にresolve("差し入れのお菓子")を実行▶"差し入れのお菓子"が値として確定（fulfilled）
  // resolveを即座にやってしまうと3秒待機は実現できず、、、
  // 3秒待機させたかったら、コールバックで包む。
  // もしくは、setTimeoutの第3引数に値を入れて、resolve()で即時実行しないようにする
  const waitIchika = new Promise((resolve) =>
    setTimeout(() => {
      return resolve("差し入れのお菓子");
    }, 3000)
  );
  const ichikaDon = await waitIchika;
  console.log(ichikaDon);
  console.log("うなぎ");
  console.timeEnd("計測");
}
```
