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

// /**
//  * タイマー開始: setTimeout を呼び、timeoutId を取得する
//  * @param {number} ms
//  * @param {string} label
//  * @returns {number} timeoutId
//  */
// function startCancelableTimer(ms, label) {
//   const timeoutId = setTimeout(() => {
//     displayLog(label);
//   }, ms);
//   return timeoutId;
// }

/**
 * タイマー開始: setTimeout を呼び、timeoutId を取得する
 * @param {number} ms
 * @param {string} label
 * @returns {id: number, cancel: () => void}
 */
function startCancelableTimer(ms, label) {
  const timeoutId = setTimeout(() => {
    displayLog(label);
  }, ms);
  return {
    id: timeoutId,
    cancel: () => {
      clearTimeout(timeoutId);
      console.log(`${label}（キャンセル）`);
    },
  };
}

/**
 * ログ出力: 発火したらtextで受け取った引数をdisplayLog() でログに出す処理
 * @param {string} text
 */
function displayLog(text) {
  console.log(text);
}

// /**
//  * idを受け取ってsetTimeoutをキャンセル。キャンセルのログも表示する。
//  * @param {number} id
//  * @param {string} text
//  */
// function clearTimer(id, text) {
//   clearTimeout(id);
//   displayLog(text);
// }

/**
 * タイマーのデモ処理
 * ログの内容：「"setTimeoutはキャンセルされました"」，「"0秒のタイマー実行"」, 「"3秒のタイマー実行"」，の順番で表示される
 */
function RunDemo() {
  const threeObj = startCancelableTimer(3000, "3秒のタイマー実行");
  const threeObjV1 = startCancelableTimer(3000, "3秒のタイマー実行");
  const zeroObj = startCancelableTimer(0, "0秒のタイマー実行");
  console.log(threeObj);
  console.log(threeObjV1);
  console.log(zeroObj);

  threeObj.cancel();
}
