// HTML参照
// IDがresultのHTML要素を取得
const resultArea = document.getElementById("result");
// IDがomikuji-btnのHTML要素を取得
const omikujiBtn = document.getElementById("omikuji-btn");
// ID属性がcolor-infoのHTML要素を取得してcolorInfoElementに代入。
const colorInfoElement = document.getElementById("color-info");

// イベントリスナー
// omikujiBtnをクリックしたら，omikujiFuncの定義がイベントハンドラとして参照される
omikujiBtn.addEventListener("click", omikujiFunc);

/**
 * omikujiBtnのイベントハンドラomikujiFunc
 */
async function omikujiFunc() {
  // 色の初期値をセット
  // #d4af37というカラーをresultAreaというHTML要素が持つstyleオブジェクトのカラープロパティに代入する
  resultArea.style.color = "#d4af37";
  // 今は`???`の結果表示部分に"占い中......"という文字列を代入
  resultArea.textContent = "占い中...";
  // omikujiBtnが通信中はdisabled（無効）をtrueにしておく。
  omikujiBtn.disabled = true;

  // ★追加：コメントを外す＆クラスを追加（震えスタート！）
  // コンテナクラスのHTML要素を取得。containerに代入。
  const container = document.querySelector(".container");
  // ★追加：CSSのアニメーションを適用させるために，クラス属性に追加する。
  // containerのクラス属性の中に，shake-animationというクラスを追加。
  container.classList.add("shake-animation");

  // 時間測定用のコード
  console.time("時間測定");
  // TODO ここ修正
  // 3秒後にresolveする
  // この処理を3秒待たせる処理。後続の処理が3秒間停止できる。
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.timeEnd("時間測定");
  // ★追加：待った終わったので、震えるクラスを外す（スイッチOFF！）
  // containerのクラス属性からshake-animationを削除。containerの揺れを止める。
  container.classList.remove("shake-animation");
  // 結果として表示する文字列を配列でfortunesに代入する
  const fortunes = ["大吉", "吉", "中吉", "小吉", "末吉", "凶"];
  // fortunesの配列の長さに合わせてランダムな数字が生成
  // ランダムな数字がfortunesのインデックスとしてrandomNumに代入される。
  const randomNum = Math.floor(Math.random() * fortunes.length);
  // fortunesの配列のインデックスをrandomNumで指定して，fortunes配列から選ばれた文字列がresultに代入される
  const result = fortunes[randomNum];
  // resultが???の結果表示部分に代入される
  resultArea.textContent = result;

  // もし結果が大吉なら，HTML要素が持つstyleオブジェクトのカラープロパティに#d93d3dの色を代入する
  // 凶だったら，HTML要素が持つstyleオブジェクトのカラープロパティに#333の色を代入する
  // それ以外だったら，HTML要素が持つstyleオブジェクトのカラープロパティに#d4af37の色を代入する
  if (result === "大吉") {
    resultArea.style.color = "#d93d3d";
  } else if (result === "凶") {
    resultArea.style.color = "#333";
  } else {
    resultArea.style.color = "#d4af37";
  }

  // colorInfoElementのHTML要素が持つtextContentプロパティに"ラッキーカラー取得中…"に代入している。
  colorInfoElement.textContent = "ラッキーカラー取得中…";
  try {
    // hex に「000000」から「ffffff」までの6桁の16進文字列を代入する
    // 0から0xffffff（16進で白）までの乱数を生成して整数に直す
    // その結果を16進数の文字列に直す
    // さらにその結果を6桁に揃えて、足りなかったら0からスタートする文字列に直す
    const hex = Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0");
    // TODO:ちょっと理解度怪しい
    // リンクにアクセスしてゲットした結果のHTTPレスポンスオブジェクトをresに入れる
    // hexはシャープをつけないでアクセスする
    const res = await fetch(`https://www.thecolorapi.com/id?hex=${hex}`);
    // okプロパティがfalseだったら自作のエラーメッセージを投げる
    if (!res.ok) {
      throw new Error("APIエラー");
    }
    // HTTPレスポンスオブジェクトであるresのJSON文字列を読み取ってJSのオブジェクトに直して代入
    const colorData = await res.json();
    // colorDataオブジェクトのnameプロパティがあったら、そのオブジェクトのvalueプロパティの値を代入
    // もし値がなかったら名前なしを代入する
    const colorName = colorData.name?.value ?? "名前なし";
    // colorDataオブジェクトのhexプロパティがあったら、そのvalueプロパティの値を代入する
    // なかったら、生成したhexの値にシャープをつけて代入する
    const hexValue = colorData.hex?.value ?? `#${hex}`;
    // 指定の文字列をcolorInfoElementというHTML要素のtextContentプロパティに代入
    colorInfoElement.textContent = `今日のラッキーカラー: ${colorName} (${hexValue})`;
    // hexValueをcolorInfoElementのstyleオブジェクトのcolorプロパティに代入
    // 表示するテキストのカラーを生成したカラーコードの色にしている
    colorInfoElement.style.color = hexValue;
  } catch (error) {
    // TODO: もしエラー投げるところ以外でエラーが出たらどうなるか確認する
    // consoleのerrorメソッドを使用してerrorを表示
    console.error(error);
    colorInfoElement.textContent = "カラーデータを取れませんでした。";
  }

  // omikujiBtnの無効をfalseにする
  omikujiBtn.disabled = false;
}

async function main() {
  const response = await fetch("https://www.thecolorapi.com/id?hex=24B1E0");
  const colorData = await response.json();
  console.log(colorData);
}
