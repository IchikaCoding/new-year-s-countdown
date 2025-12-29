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
