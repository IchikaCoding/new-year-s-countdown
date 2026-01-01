// HTML参照
// IDがresultのHTML要素を取得
const resultArea = document.getElementById("result");
// IDがomikuji-btnのHTML要素を取得
const omikujiBtn = document.getElementById("omikuji-btn");

// イベントリスナー
// omikujiBtnをクリックしたら，omikujiFuncの定義がイベントハンドラとして参照される
omikujiBtn.addEventListener("click", omikujiFunc);

/**
 * omikujiBtnのイベントハンドラomikujiFunc
 */
async function omikujiFunc() {
  // 今は???の結果表示部分に"神様と通信中..."という文字列を代入
  resultArea.textContent = "神様と通信中...";
  // omikujiBtnが通信中はdisabled（無効）をtrueにしておく。
  omikujiBtn.disabled = true;

  // 3秒後にresolveする
  // この処理は3秒待たせるだけの処理。後続の処理を3秒間停止させておく。
  console.time("時間測定");
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.timeEnd("時間測定");
  // 結果として表示する文字列を配列でfortunesに代入する
  const fortunes = ["大吉", "吉", "中吉", "小吉", "末吉", "凶"];
  // fortunesの配列の長さに合わせてランダムな数字が生成
  // ランダムな数字がfortunesのインデックスとしてrandomNumに代入される。
  const randomNum = Math.floor(Math.random() * fortunes.length);
  // fortunesの配列のインデックスをrandomNumで指定して，fortunes配列から選ばれた文字列がresultに代入される
  const result = fortunes[randomNum];
  // resultが???の結果表示部分に代入される
  resultArea.textContent = result;

  // もし結果が大吉なら，HTMLElement のサブクラスにある color に#d93d3dの色を代入する
  // 大吉以外だったら，HTMLElement のサブクラスにある color に#d4af37の色を代入する
  // TODO resultArea.style.colorの出処がわからない！
  if (result === "大吉") {
    resultArea.style.color = "#d93d3d";
  } else {
    resultArea.style.color = "#d4af37";
  }
  // omikujiBtnの無効をfalseにする
  omikujiBtn.disabled = false;
}
