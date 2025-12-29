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
// console.log("1番目は自己紹介。いちかどんは焼き芋が好き🍠");

// // setTimeoutはタスクキューに追加されるから後回し。
// setTimeout(() => {
//   console.log("5つ目の処理");
// }, 0);

// // Promiseチケットの発行
// const ichikaTicket = Promise.resolve("3つ目に実行される。");
// console.log("ichikaTicket:", ichikaTicket);

// // Promiseチケットの発行
// const pochiFriendsTicket = Promise.resolve("4つ目に実行される。");
// console.log("pochiFriendsTicket:", pochiFriendsTicket);

// setTimeout(() => {
//   console.log("6つ目の処理");
// }, 0);

// // Promiseチケットはファストパスなので，setTimeoutより前に実行される
// ichikaTicket.then((message) => {
//   console.log(message);
// });

// pochiFriendsTicket.then((message) => {
//   console.log(message);
// });

// setTimeout(() => {
//   console.log("7つ目の処理");
// }, 0);

// // 後回しの処理の前に実行される。
// console.log("2つ目に実行される");

// ーーーーーーーーーーーPromise / async-awaitの練習ーーーーーーー

// fetchUser(id)を作る
// idが正の整数なら成功→成功しました！！
// それ以外は失敗→有効なIDではありません

// const sweetPotato = Promise.resolve("🍠");

// sweetPotato.then((value) => {
//   console.log(`${value}がもらえたよ♪`);
// });

// function eating() {
//   return new Promise((resolve) =>
//     setTimeout(() => {
//       resolve("こんちか");
//     }, 1000)
//   );
// }

// eating().then((value) => {
//   console.log(`${value}♪`);
// });

// function fetchUser(id) {
//   return new Promise((resolve, reject) => {
//     if (id > 0) {
//       setTimeout(() => {
//         resolve({ id: id, name: `User ${id}` });
//       }, 3000);
//     } else {
//       reject("Invalid user id");
//     }
//   });
// }

// function changeId(id) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const changedNum = id * 10;
//       resolve(changedNum);
//     }, 2000);
//   });
// }

// changeId(15).then((value) => {
//   console.log(value);
// });

// ------Promise版のコード-------

// fetchUser(-5)
//   .then((value) => {
//     console.log(value);
//     return changeId(value.id);
//   })
//   .then((changedValue) => {
//     console.log(`IDは ${changedValue} に変更されました`);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// ------async / await 版のコード-------

// async function main(id) {
//   try {
//     console.log("ーーー実行中ですーーー");
//     console.time("計測");
//     const user = await fetchUser(id);
//     console.log("user", user);
//     const processedId = await changeId(user.id);
//     console.log("processedId", processedId);
//   } catch (error) {
//     console.error(error);
//     console.log("エラーです！！");
//   } finally {
//     console.timeEnd("計測");
//     console.log("---おつちか✨️----");
//   }
// }

// a→10，ｂ→2。ｂが0のとき，エラーにする

// function divide(a, b) {
//   if (b === 0) {
//     throw new Error("Cannot divide by zero");
//   } else {
//     const result = a / b;
//     return result;
//   }
// }

// function safeDivide(a, b) {
//   try {
//     const dividedValue = divide(a, b);
//     return dividedValue;
//   } catch (error) {
//     console.error(error);
//     return 0;
//   }
// }

// (() => {
//   try {
//     const dividedValue = divide(10, 0);
//     console.log(dividedValue);
//     return dividedValue;
//   } catch (error) {
//     console.error(error);
//     return 0;
//   }
// })();

// https://jsonplaceholder.typicode.com/todos/1　のリンクを取得
// やりたいこと：URLからタイトル取得→表示する
async function displayTitle() {
  // responseでJSON文字列をゲット
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const objDate = await response.json();
  console.log(objDate);
  console.log(objDate.title);
}
