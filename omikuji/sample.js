// HTML参照
// IDがresultのHTML要素を取得
const resultArea = document.getElementById("result");
// IDがomikuji-btnのHTML要素を取得
const omikujiBtn = document.getElementById("omikuji-btn");
// ID属性がcolor-infoのHTML要素を取得してcolorInfoElementに代入。
const colorInfoElement = document.getElementById("color-info");
// HTML要素を参照できるようにloadingの変数に代入
const loading = document.getElementById("loading");
// コンテナクラスのHTML要素を取得。containerに代入。
const container = document.querySelector(".container");

// イベントリスナー
// omikujiBtnをクリックしたら，omikujiFuncの定義がイベントハンドラとして参照される
omikujiBtn.addEventListener("click", omikujiFunc);

/**
 * UI初期化（占い開始時）
 */
function setLoadingUI() {
  resultArea.style.color = "#d4af37";
  resultArea.textContent = "占い中...";
  //   おみくじボタン押せなくする
  omikujiBtn.disabled = true;
  //   ローディングを表示
  loading.hidden = false;
  container.classList.add("shake-animation");
}

/**
 * UI後片付け（必ず最後に呼ぶ）
 */
function resetUI() {
  // 読み込み中を削除
  loading.hidden = true;
  //   おみくじボタン無効化を消す＝押せるようにする
  omikujiBtn.disabled = false;
  container.classList.remove("shake-animation");
}

/**
 * おみくじ結果を表示
 */
function showFortuneResult(result) {
  resultArea.textContent = result;
  resultArea.style.color = result === "いちかどん吉" ? "#ff0000" : "#d4af37";
}

/**
 * ラッキーカラー表示
 */
function showColorInfo(name, code) {
  colorInfoElement.textContent = `あなたのラッキーカラー：${name} (${code})`;
  colorInfoElement.style.color = code;
}

/**
 * エラー表示
 */
function showColorError() {
  colorInfoElement.textContent = "ラッキーカラー取得できず・・・";
}

/**
 * 3秒待機（演出用）
 * @returns {Promise}
 */
function waitThreeSeconds() {
  return new Promise((resolve) => setTimeout(resolve, 3000));
}

/**
 * ラッキーカラー取得
 * TODO fetch が長く止まるときに中断（タイムアウト）する仕組み（AbortController）を追加する
 * TODO おみくじボタンを再度押す＝リトライをいれる
 */
/**
 * 引数に時間が渡されなかったら5000msを採用する
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
      colorInfoElement.textContent = "タイムアウト";
    }
    // どうしてここでエラーを投げるの？
    // →ここでエラーを投げないと、handleOmikuji関数のcatchにエラーを渡す事ができないから！
    throw error;
  } finally {
    // タイムアウトのタイマーをクリアにする
    clearTimeout(timerId);
  }
}

/**
 *  おみくじの中身を作る
 * TODO JSDocの書き方配列バージョンわからない！
 * @return {Array}
 */
function getRandomFortune() {
  const messageArray = ["大吉", "中吉", "笑吉", "いちかどん吉"];
  return messageArray[Math.floor(Math.random() * messageArray.length)];
}

/**
 * omikujiBtnのイベントハンドラomikujiFunc
 */
async function omikujiFunc() {
  setLoadingUI();

  try {
    const waitPromise = waitThreeSeconds();
    const colorPromise = fetchLuckyColor();
    // 3秒だけ待つ処理なので変数宣言なし
    await waitPromise;
    // ! 分割代入？
    // カラーの名前とカラーコードのオブジェクトを作成
    const { name, code } = await colorPromise;

    const result = getRandomFortune();
    showFortuneResult(result);
    showColorInfo(name, code);
  } catch (error) {
    console.error(error);
    showColorError();
  } finally {
    resetUI();
  }
}

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
