// HTML参照
// IDがresultのHTML要素を取得
const resultArea = document.getElementById("result");
// IDがomikuji-btnのHTML要素を取得
const omikujiBtn = document.getElementById("omikuji-btn");
// ID属性がcolor-infoのHTML要素を取得してcolorInfoElementに代入。
const colorInfoElement = document.getElementById("color-info");
// HTML要素を参照できるようにloadingの変数に代入
const loading = document.getElementById("loading");
// イベントリスナー
// omikujiBtnをクリックしたら，omikujiFuncの定義がイベントハンドラとして参照される
omikujiBtn.addEventListener("click", omikujiFunc);

/**
 * omikujiBtnのイベントハンドラomikujiFunc
 */
async function omikujiFunc() {
  // 色の初期値をセット
  // #d4af37というカラーをresultAreaというHTML要素が持つstyleオブジェクトのカラープロパティに代入する
  resultArea.style.color = "#d4af37";
  // 今は`???`の結果表示部分に"占い中......"という文字列を代入
  resultArea.textContent = "占い中...";
  // omikujiBtnが通信中はdisabled（無効）をtrueにしておく。
  omikujiBtn.disabled = true;

  // hiddenに代入ってできるの？→要素が持っている真偽値プロパティだから代入可能
  // tryの前に書くのはなぜ？tryの処理開始直前にぐるぐるを出したいから
  // ここで表示
  loading.hidden = false;

  // ★追加：コメントを外す＆クラスを追加（震えスタート！）
  // コンテナクラスのHTML要素を取得。containerに代入。
  const container = document.querySelector(".container");
  // ★追加：CSSのアニメーションを適用させるために，クラス属性に追加する。
  // containerのクラス属性の中に，shake-animationというクラスを追加。
  container.classList.add("shake-animation");

  // 時間測定用のコード
  console.time("時間測定");

  // Promiseは作った瞬間に返ってきて、タイマーもその瞬間に走り出し、3秒後にresolve。
  // await waitPromise はその完了を待つだけ。
  // JS全体は止まらず、他の処理や描画は進む

  // Promiseチケットが即座に返ってくる。タイマーはその時にスタートする。3秒後にresolveされる。▶awaitして3秒待機が終わるのを待って完了。
  // 3秒後にresolveする→そこから続きの処理がマイクロタスクキューに入る→その間はブラウザは動き回れるよ
  // この処理の行が3秒待機するPromiseオブジェクト。JS全体が止まっているわけじゃない
  const waitPromise = new Promise((resolve) => setTimeout(resolve, 3000));

  // colorPromiseに非同期処理の関数を即時実行して結果を代入。
  const colorPromise = (async () => {
    // 16進数で0からffffffまでの乱数を生成して整数に直す
    // その結果を16進数の文字列に直す
    // 更にその結果を6桁に揃える。もし5桁なら、先頭に0を追加して、hexに代入
    const hex = Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0");
    // リンクにアクセスして、その返答をres（HTTPレスポンスオブジェクト）に代入
    // awaitしているから返答が返ってくるまで待機する
    const res = await fetch(`https://www.thecolorapi.com/id?hex=${hex}`);
    console.log(res);
    // 返答のokプロパティがfalseなら、APIエラーを投げる
    if (!res.ok) {
      throw new Error("APIエラー");
    }
    // 返答のHTTPレスポンスオブジェクトのjsonメソッドを実行▶JSON文字列をパースしてJSのオブジェクトをdataに代入
    // 時間がかかるからawaitして非同期処理にする
    const data = await res.json();
    // colorPromiseの関数はnameプロパティとcodeプロパティを持っているオブジェクトが返り値
    return {
      // dataオブジェクトのnameプロパティがあったら、そのvalueプロパティの値を使う。なかったら、"カラーネームなし"
      name: data.name?.value ?? "カラーネームなし",
      // dataオブジェクトのhexプロパティがあったら、そのvalueプロパティの値を使う。なかったら、`#${hex}`をcodeプロパティの値にする。
      code: data.hex?.value ?? `#${hex}`,
    };
  })();
  // console.log(await colorPromise);

  try {
    // 3秒待っている間にAPIの処理が進んでいる。3秒後にresolveされる。
    await waitPromise;
    // colorPromiseの返り値を取得して分割代入でオブジェクトの変数それぞれに代入する。
    const { name, code } = await colorPromise; // ここでカラー結果取得
    // コンテナのアニメーションを削除
    container.classList.remove("shake-animation");
    // 配列を作成してmessageArrayに代入
    const messageArray = ["大吉", "中吉", "笑吉", "いちかどん吉"];
    // 0からmessageArrayの配列の長さまでの乱数を生成して整数に直す▶その結果がインデックスとなる
    // ランダムなインデックスで指定されたおみくじの結果をresultに代入する
    const result =
      messageArray[Math.floor(Math.random() * messageArray.length)];
    // おみくじの結果のresultを画面に表示
    resultArea.textContent = result;
    // おみくじの結果のresultが"いちかどん吉"だったら、"#ff0000"の色を文字のカラーにする。
    // それ以外だったら、"#d4af37"を代入
    resultArea.style.color = result === "いちかどん吉" ? "#ff0000" : "#d4af37";
    // colorInfoElementの表示部分に`あなたのラッキーカラー：${name} (${code})`;を代入
    colorInfoElement.textContent = `あなたのラッキーカラー：${name} (${code})`;
    // colorInfoElementの文字カラーもhexのカラーコードのcodeを代入する
    colorInfoElement.style.color = code;
  } catch (error) {
    // tryの中でエラーが出たら引数errorに渡されて、それを表示する
    console.error(error);
    // colorInfoElementのHTMLの表示部分に"ラッキーカラー取得できず・・・"
    colorInfoElement.textContent = "ラッキーカラー取得できず・・・";
  } finally {
    // 必ず実行される処理
    // 「ぐるぐる」のhiddenプロパティにtrueを代入
    loading.hidden = true;
    // omikujiBtnのdisabled（無効）をfalseにする
    omikujiBtn.disabled = false;
  }
}
// })();
// console.timeEnd("時間測定");
// // ★追加：待った終わったので、震えるクラスを外す（スイッチOFF！）
// // containerのクラス属性からshake-animationを削除。containerの揺れを止める。
// container.classList.remove("shake-animation");
// // 結果として表示する文字列を配列でfortunesに代入する
// const fortunes = ["大吉", "吉", "中吉", "小吉", "末吉", "凶"];
// // fortunesの配列の長さに合わせてランダムな数字が生成
// // ランダムな数字がfortunesのインデックスとしてrandomNumに代入される。
// const randomNum = Math.floor(Math.random() * fortunes.length);
// // fortunesの配列のインデックスをrandomNumで指定して，fortunes配列から選ばれた文字列がresultに代入される
// const result = fortunes[randomNum];
// // resultが???の結果表示部分に代入される
// resultArea.textContent = result;

// // もし結果が大吉なら，HTML要素が持つstyleオブジェクトのカラープロパティに#d93d3dの色を代入する
// // 凶だったら，HTML要素が持つstyleオブジェクトのカラープロパティに#333の色を代入する
// // それ以外だったら，HTML要素が持つstyleオブジェクトのカラープロパティに#d4af37の色を代入する
// if (result === "大吉") {
//   resultArea.style.color = "#d93d3d";
// } else if (result === "凶") {
//   resultArea.style.color = "#333";
// } else {
//   resultArea.style.color = "#d4af37";
// }

// // colorInfoElementのHTML要素が持つtextContentプロパティに"ラッキーカラー取得中…"に代入している。
// colorInfoElement.textContent = "ラッキーカラー取得中…";

// try {
//   // hex に「000000」から「ffffff」までの6桁の16進文字列を代入する
//   // 0から0xffffff（16進で白）までの乱数を生成して整数に直す
//   // その結果を16進数の文字列に直す
//   // さらにその結果を6桁に揃えて、足りなかったら0からスタートする文字列に直す
//   const hex = Math.floor(Math.random() * 0xffffff)
//     .toString(16)
//     .padStart(6, "0");

//   // リンクにアクセスしてゲットした結果のHTTPレスポンスオブジェクトをresに入れる
//   // hexはシャープをつけないでアクセスする
//   const res = await fetch(`https://www.thecolorapi.com/id?hex=${hex}`);
//   // okプロパティがfalseだったら自作のエラーメッセージを投げる
//   if (!res.ok) {
//     throw new Error("APIエラー");
//   }
//   // HTTPレスポンスオブジェクトであるresのJSON文字列を読み取ってJSのオブジェクトに直して代入
//   const colorData = await res.json();
//   // colorDataオブジェクトのnameプロパティがあったら、そのオブジェクトのvalueプロパティの値を代入
//   // もし値がなかったら名前なしを代入する
//   const colorName = colorData.name?.value ?? "名前なし";
//   // colorDataオブジェクトのhexプロパティがあったら、そのvalueプロパティの値を代入する
//   // なかったら、生成したhexの値にシャープをつけて代入する
//   const hexValue = colorData.hex?.value ?? `#${hex}`;
//   // 指定の文字列をcolorInfoElementというHTML要素のtextContentプロパティに代入
//   colorInfoElement.textContent = `今日のラッキーカラー: ${colorName} (${hexValue})`;
//   // hexValueをcolorInfoElementのstyleオブジェクトのcolorプロパティに代入
//   // 表示するテキストのカラーを生成したカラーコードの色にしている
//   colorInfoElement.style.color = hexValue;
// } catch (error) {
//   // consoleのerrorメソッドを使用してerrorを表示
//   console.error(error);
//   colorInfoElement.textContent = "カラーデータを取れませんでした。";
// } finally {
//   // loadingというHTML要素が持っているhiddenプロパティ（真偽値プロパティ）にtrueを代入して「ぐるぐる表示」を消す
//   loading.hidden = true;
//   // omikujiBtnの無効をfalseにする
//   omikujiBtn.disabled = false;
// }

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
