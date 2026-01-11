// HTML要素を参照
// ボタン要素
const omikujiBtnElement = document.getElementById("omikuji-btn");
// 結果表示要素
const resultElement = document.getElementById("result");
// The color APIから取得したデータを表示する部分
const colorInfoElement = document.getElementById("color-info");
const loadingElement = document.getElementById("loading");
// ボタンのアニメーションを追加
const containerElement = document.querySelector(".container");
// イベントを追加
// omikujiBtnElementを押したら，おみくじのロジックが動くイベント

omikujiBtnElement.addEventListener("click", handleOmikuji);

// omikujiFuncという関数を定義
// ボタン押されたらsetTimeoutで3秒間待つ（画面には「占い中・・・」を表示）
// 表示したい結果の配列を作成「大吉・中吉・笑吉・いちかどん吉」
// 配列から，インデック番号がランダムで選ばれる
// その選ばれた配列のなかの文字列がresultElementに表示される

async function handleOmikuji() {
  setLoadingUI();

  try {
    const waitPromise = waitThreeSeconds();
    const colorObject = fetchLuckyColor();
    // 3秒だけ待つ処理なので変数宣言なし
    await waitPromise;
    // ! 分割代入？
    // カラーの名前とカラーコードのオブジェクトを作成
    const { colorName, colorCode } = await colorObject;
    const result = getRandomFortune();
    showFortuneResult(result);
    showColorInfo(colorName, colorCode);
  } catch (error) {
    console.error(error);
    showColorError();
  } finally {
    resetUI();
  }
}

/**
 * ローディング中のぐるぐるを表示する関数
 */
function setLoadingUI() {
  resultElement.style.color = "#d4af37";

  omikujiBtnElement.disabled = true;
  resultElement.textContent = "占い中・・・";

  // loadingElement要素のhiddenプロパティにfalseを代入→ぐるぐる表示が見えるようにする
  loadingElement.hidden = false;

  containerElement.classList.add("shake-animation");
}

/**
 *　setTimeoutによって3秒後にresolveする関数
 * @returns {Promise} 3秒間待つ
 */
async function waitThreeSeconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("3秒の待ち時間終了");
    }, 3000);
  });
}

/**
 * ラッキーカラーを取得する関数
 * TODO JSDocの書き方怪しい！！
 * @returns {{colorName:string, colorCode:string}}
 */
async function fetchLuckyColor() {
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
  // dataから使いたいデータ(名前、カラーコード)を変数に代入
  return {
    colorName: data.name?.value ?? "カラーネームなし",
    colorCode: data.hex?.value ?? `#${hex}`,
  };
}
/**
 *  おみくじの中身を作る
 * TODO JSDocの書き方配列バージョンわからない！
 * @return {Array}
 */
function getRandomFortune() {
  const messageArray = ["大吉", "中吉", "笑吉", "いちかどん吉"];
  const randomNumIndex = Math.floor(Math.random() * messageArray.length);
  return messageArray[randomNumIndex];
}
/**
 * おみくじの結果を画面に表示する関数
 * @param {string} result
 */
function showFortuneResult(result) {
  resultElement.textContent = result;
  console.log(result);
  resultElement.style.color = result === "いちかどん吉" ? "#ff0000" : "#d4af37";
}

/**
 *
 * @param {string} colorName
 * @param {string} colorCode
 */
function showColorInfo(colorName, colorCode) {
  // その変数をcolorInfoElementに代入する
  colorInfoElement.textContent = `あなたのラッキーカラー：${colorName}(${colorCode})`;
  colorInfoElement.style.color = colorCode;
}
/**
 * ラッキーカラーのエラーを画面に表示する関数
 */
function showColorError() {
  colorInfoElement.textContent = "ラッキーカラー取得できず・・・";
}

/**
 * 画面のリセットをする関数
 */
function resetUI() {
  // ぐるぐるを消す
  loadingElement.hidden = true;
  // ボタンの無効化を解除する
  omikujiBtnElement.disabled = false;
  // 3秒間待ち時間が終わったらアニメーションは削除する
  containerElement.classList.remove("shake-animation");
}
