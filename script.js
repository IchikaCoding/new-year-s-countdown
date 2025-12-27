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

//  キャンセル関数を返すstartCancelableTimer バージョン

function startCancelableTimer() {
  const id = setTimeout(() => {
    alert("焼き芋完成✨️");
  }, 3000);
  console.log(id);
  return function () {
    clearTimeout(id);
  };
}

/**
 * 2秒後にキャンセルする処理
 */
const cancel = startCancelableTimer();
setTimeout(() => {
  cancel();
  console.log("キャンセルされましたわよ～！！");
}, 2000);
