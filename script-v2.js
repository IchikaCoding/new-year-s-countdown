console.log("Hello World");

// 3秒後にログを表示する処理
// 0秒後にログを表示する処理
// function displayLog() {
//   setTimeout(() => {
//     console.log("3秒後バージョン");
//   }, 3000);

//   setTimeout(() => {
//     console.log("0秒後バージョン");
//   }, 0);
// }

// 値を作る：setTimeoutのidを習得する
// 状態管理：setTimeoutのidを返す処理
// 値を表示：setTimeoutでログを表示する処理

/** 工程で分離させて3行メモ（最小でOK）
 * 1) タイマー開始: setTimeout を呼び、timeoutId を取得する
 * 2) IDの保持: timeoutId を変数に保存しておく（あとでキャンセルするため）
 * 3) ログ出力: setTimeout が発火したらtextで受け取った引数をdisplayLog() でログに出す。setTimeout がキャンセルされたらキャンセルログを出す
 */

/**
 * タイマー開始: setTimeout を呼び、timeoutId を取得する
 * @param {number} ms
 * @param {string} label
 * @returns {number} timeoutId
 */
function startCancelableTimer(ms, label) {
  const timeoutId = setTimeout(() => {
    displayLog(label);
  }, ms);
  return timeoutId;
}

/**
 * ログ出力: 発火したらtextで受け取った引数をdisplayLog() でログに出す処理
 * @param {string} text
 */
function displayLog(text) {
  console.log(text);
}

/**
 * idを受け取ってsetTimeoutをキャンセル。キャンセルのログも表示する。
 * @param {number} id
 */
function clearTimer(id) {
  clearTimeout(id);
  displayLog("setTimeoutはキャンセルされました");
}

// TODO 途中！問題の回答になっていない可能性あり

/**
 * タイマーのデモ処理
 */
function RunDemo() {
  const id3 = startCancelableTimer(3000, "3秒のタイマー実行");
  const id0 = startCancelableTimer(0, "0秒のタイマー実行");
  clearTimer(id3);
}
