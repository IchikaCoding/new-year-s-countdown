const countdownDaysElement = document.getElementById("countdown-days");
const countdownTimerElement = document.getElementById("countdown-timer");

console.log(countdownDaysElement);
console.log(countdownTimerElement);

const target = new Date("2026-01-01T00:00:00+09:00");
const today = Date.now();

console.log(target.getTime());
console.log(today);
console.log(typeof today);

const remainingDays = Math.floor(
  (target.getTime() - today) / (1000 * 60 * 60 * 24)
);
console.log(remainingDays);

countdownDaysElement.textContent = `残りの日数は ${remainingDays} 日`;

// 2025-12-28
//  setTimeout タイマー: 5 秒後にメッセージを表示し、途中でキャンセルできる関数 startCancelableTimer を作る。

// function startCancelableTimer() {
//   const id = setTimeout(() => {
//     alert("やっほー！こんちか♪");
//   }, 5000);
//   console.log(id);
//   setTimeout(() => {
//     clearTimeout(id);
//     console.log("キャンセルしました");
//   }, 2000);
// }
// startCancelableTimer();

/**
 * キャンセル関数を返すバージョンのstartCancelableTimer
 * @returns {() => void} タイマーをキャンセルする関数
 * 3秒後に焼き芋完成する
 * キャンセル関数を返す
 */
// function startCancelableTimer() {
//   const id = setTimeout(() => {
//     alert("焼き芋完成✨️");
//   }, 3000);
//   console.log(id);
//   return function () {
//     clearTimeout(id);
//   };
// }

/**
 * 2秒後にキャンセルする処理（即時実行関数バージョン）
 * グローバルスコープより，関数や即時実行関数（IIFE）で包んでローカルスコープに閉じるのが良き
 */
// (() => {
//   const cancel = startCancelableTimer();
//   setTimeout(() => {
//     cancel();
//     console.log("キャンセルされましたわよ～！！");
//   }, 1000);
// })();

// ---------関数定義バージョン---------
// 関数定義より，変数に代入はけっこう見やすいのかもしれない？

// const cancelFlow = () => {
//   const cancel = startCancelableTimer();
//   setTimeout(() => {
//     cancel();
//     console.log("キャンセルされましたわよ～！！");
//   }, 1000);
// };

// cancelFlow();

// ーーーーーイベントループでログがどの順に出るかを確認するコードーーーーーー
// 実行順番は「同期ログ → マイクロタスク(Promise.then) → タスク(setTimeout)」
console.log("1番目は自己紹介。いちかどんは焼き芋が好き🍠");

// setTimeoutはタスクキューに追加されるから後回し。
setTimeout(() => {
  console.log("5つ目の処理");
}, 0);

// Promiseチケットの発行
const ichikaTicket = Promise.resolve("3つ目に実行される。");
console.log("ichikaTicket:", ichikaTicket);

// Promiseチケットの発行
const pochiFriendsTicket = Promise.resolve("4つ目に実行される。");
console.log("pochiFriendsTicket:", pochiFriendsTicket);

setTimeout(() => {
  console.log("6つ目の処理");
}, 0);

// Promiseチケットはファストパスなので，setTimeoutより前に実行される
ichikaTicket.then((message) => {
  console.log(message);
});

pochiFriendsTicket.then((message) => {
  console.log(message);
});

setTimeout(() => {
  console.log("7つ目の処理");
}, 0);

// 後回しの処理の前に実行される。
console.log("2つ目に実行される");
