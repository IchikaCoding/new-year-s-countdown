console.log("Hello World");

// 3秒後にログを表示する処理
// 0秒後にログを表示する処理
function displayLog() {
  setTimeout(() => {
    console.log("3秒後バージョン");
  }, 3000);

  setTimeout(() => {
    console.log("0秒後バージョン");
  }, 0);
}

// 値を作る：setTimeOutのidを習得する
// 状態管理：setTimeOutのidを返す処理
// 値を表示：setTimeOutでログを表示する処理

/** 工程で分離させて3行メモ（最小でOK）
 * 1) タイマー開始: setTimeout を呼び、timeoutId を取得する
 * 2) IDの保持: timeoutId を変数に保存しておく（あとでキャンセルするため）
 * 3) ログ出力: 発火したらログを出す。キャンセルしたらキャンセルログを出す
 */
