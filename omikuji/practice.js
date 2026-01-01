// HTML要素を参照
// ボタン要素
const omikujiBtnElement = document.getElementById("omikuji-btn");
// 結果表示要素
const resultElement = document.getElementById("result");
// 文字表示要素

// イベントを追加
// omikujiBtnElementを押したら，おみくじのロジックが動くイベント

omikujiBtnElement.addEventListener("click", omikujiFunc);

// omikujiFuncという関数を定義
// ボタン押されたらsetTimeoutで3秒間待つ（画面には「占い中・・・」を表示）
// 表示したい結果の配列を作成「大吉・中吉・笑吉・いちかどん吉」
// 配列から，インデック番号がランダムで選ばれる
// その選ばれた配列のなかの文字列がresultElementに表示される

async function omikujiFunc() {
  const waitString = "占い中・・・";
  omikujiBtnElement.disabled = true;
  resultElement.textContent = waitString;
  console.log(waitString);
  //   TODO これを変数に代入したい
  const doneMessage = await new Promise((resolve) => {
    setTimeout(() => {
      resolve("3秒の待ち時間終了");
    }, 3000);
  });
  console.log(doneMessage);
  const messageArray = ["大吉", "中吉", "笑吉", "いちかどん吉"];
  const randomNumIndex = Math.floor(Math.random() * messageArray.length);
  console.log({ randomNumIndex });
  const result = messageArray[randomNumIndex];
  resultElement.textContent = result;
  console.log(result);
  if (result === "いちかどん吉") {
    resultElement.style.color = "#ff0000";
  }
  {
    resultElement.style.color = "#d4af37";
  }
  omikujiBtnElement.disabled = false;
}
