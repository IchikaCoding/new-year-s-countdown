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
const retryBtnElement = document.getElementById("retry-btn");
// イベントリスナー
// omikujiBtnをクリックしたら，omikujiFuncの定義がイベントハンドラとして参照される
omikujiBtn.addEventListener("click", omikujiFunc);
retryBtnElement.addEventListener("click", omikujiFunc);
/**
 * UI初期化（占い開始時）
 */
function setLoadingUI() {
  resultArea.style.color = "#d4af37";
  resultArea.textContent = "占い中...";
  // リトライ後のタイムアウトを消すため
  colorInfoElement.textContent = "";
  //   おみくじボタン押せなくする
  omikujiBtn.disabled = true;
  //   ローディングを表示
  loading.hidden = false;
  container.classList.add("shake-animation");
  hideRetryBtn();
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
  // エラーを表示するときに「占い中・・・」を消すために空文字を入れる
  resultArea.textContent = "";
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
    // どうしてここでエラーを投げるの？
    // →ここでエラーを投げないと、handleOmikuji関数のcatchにエラーを渡す事ができないから！
    throw error;
  } finally {
    // タイムアウトのタイマーをクリアにする
    // fetchが終わったあとにアボートされてしまうのを防ぐため。安全のため。
    // いらなくなった予約は消す。
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
    const colorPromise = fetchLuckyColor(1);
    // 3秒だけ待つ処理なので変数宣言なし
    await waitPromise;
    // ! 分割代入？
    // カラーの名前とカラーコードのオブジェクトを作成
    const { name, code } = await colorPromise;

    const result = getRandomFortune();
    showFortuneResult(result);
    showColorInfo(name, code);
    omikujiBtn.hidden = false;
  } catch (error) {
    console.error(error);

    // 自分で中断した場合はここのエラーになる
    if (error.name === "AbortError") {
      showAbortError();
    } else {
      // APIエラー（サーバーからrejectが返って来た場合）のときや
      // 通信エラーのときなどにこっちのエラーが表示される
      showColorError();
    }

    showRetryBtn();
  } finally {
    resetUI();
  }
}

function showAbortError() {
  // エラーを表示するときに「占い中・・・」を消すために空文字を入れる
  resultArea.textContent = "";
  // タイムアウトかどうか判定したいときは名前を見る
  colorInfoElement.textContent = "タイムアウト";
}

function showRetryBtn() {
  retryBtnElement.hidden = false;
  omikujiBtn.hidden = true;
}

function hideRetryBtn() {
  retryBtnElement.hidden = true;
  omikujiBtn.hidden = false;
}
