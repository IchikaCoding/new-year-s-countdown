// HTML要素を参照
// ボタン要素
const omikujiBtnElement = document.getElementById("omikuji-btn");
// 結果表示要素
const resultElement = document.getElementById("result");
// pokeAPIから取得したデータを表示する部分
const pokemonInfoElement = document.getElementById("pokemon-info");

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

  //   TODO これを変数に代入したい
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
  // TODO: エラーを投げてみる
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
    if (!res.ok) {
      throw new Error("APIエラー");
    }
    const data = await res.json();
    console.log(data);
    const name = data.name;
    const height = data.height;
    const weight = data.weight;
    // TODO: なしを体験したい
    const firstAbility = data.abilities?.[0]?.ability?.name ?? "なし";
    pokemonInfoElement.textContent = `お名前：${name}, 高さ：${height}, 重さ：${weight}, 特技：${firstAbility}`;
  } catch (error) {
    console.error(error);
    console.error("ポケモンゲットならず😱");
  }
  omikujiBtnElement.disabled = false;
}

async function main() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
  const data = await res.json();
  console.log(res);
  console.log(data);
}
