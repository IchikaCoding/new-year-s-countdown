// HTML要素を参照
// ボタン要素
const omikujiBtnElement = document.getElementById("omikuji-btn");
// 結果表示要素
const resultElement = document.getElementById("result");
// The color APIから取得したデータを表示する部分
const colorInfoElement = document.getElementById("color-info");

// イベントを追加
// omikujiBtnElementを押したら，おみくじのロジックが動くイベント

omikujiBtnElement.addEventListener("click", omikujiFunc);

// omikujiFuncという関数を定義
// ボタン押されたらsetTimeoutで3秒間待つ（画面には「占い中・・・」を表示）
// 表示したい結果の配列を作成「大吉・中吉・笑吉・いちかどん吉」
// 配列から，インデック番号がランダムで選ばれる
// その選ばれた配列のなかの文字列がresultElementに表示される

async function omikujiFunc() {
  resultElement.style.color = "#d4af37";
  const waitString = "占い中・・・";
  omikujiBtnElement.disabled = true;
  resultElement.textContent = waitString;
  console.log(waitString);

  // ボタンのアニメーションを追加
  const containerElement = document.querySelector(".container");
  containerElement.classList.add("shake-animation");

  const doneMessage = await new Promise((resolve) => {
    setTimeout(() => {
      resolve("3秒の待ち時間終了");
    }, 3000);
  });
  console.log(doneMessage);
  // 3秒間待ち時間が終わったらアニメーションは削除する
  containerElement.classList.remove("shake-animation");
  const messageArray = ["大吉", "中吉", "笑吉", "いちかどん吉"];
  const randomNumIndex = Math.floor(Math.random() * messageArray.length);
  console.log({ randomNumIndex });
  const result = messageArray[randomNumIndex];
  resultElement.textContent = result;
  console.log(result);
  if (result === "いちかどん吉") {
    resultElement.style.color = "#ff0000";
  } else {
    resultElement.style.color = "#d4af37";
  }
  // pokeAPIからデータ取得して、エラーになったら投げる
  // resをJSのオブジェクトに戻すとどうしてポケモンのデータになるの？

  try {
    // hexの16進数の0からffffff（白）までのランダムな数字を生成
    // 0x は「これから書く数は16進数だよ」という接頭辞
    // 0b は 2 進数、0o は 8 進数の接頭辞
    const hex = Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0");
    const res = await fetch(`https://www.thecolorapi.com/id?hex=${hex}`);
    if (!res.ok) {
      throw new Error("APIエラー");
    }
    const data = await res.json();
    console.log(data);
    // dataから使いたいデータ(名前、カラーコード)を変数に代入
    const colorName = data.name?.value ?? "カラーネームなし";
    const colorCode = data.hex?.value ?? `#${hex}`;
    // その変数をcolorInfoElementに代入する
    colorInfoElement.textContent = `あなたのラッキーカラー：${colorName}(${colorCode})`;
    colorInfoElement.style.color = colorCode;
  } catch (error) {
    console.error(error);
    console.error("ラッキーカラー取得できず・・・");
  }
  omikujiBtnElement.disabled = false;
}
