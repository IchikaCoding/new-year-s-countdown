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

  colorInfoElement.textContent = "ラッキーカラー取得中…";
  // ここからの処理はエラーが発生したら即座にcatchでキャッチされる
  try {
    // https://pokeapi.co/api/v2/pokemon/ditto のリンクからデータを非同期的に取得し，その結果をresに代入。
    // https://pokeapi.co/api/v2/pokemon?limit=0のリンクにアクセス
    // ポケモンのデータは0件だけどアクセスの返答がくる！（ちなみにまだJSON文字列）
    const res = await fetch("https://www.thecolorapi.com/id?hex=24B1E0");
    // もしリンクからのレスポンスのステータスがOKじゃなかったら，APIエラーというエラーを手動で作成してエラーをcatchに投げる。
    if (!res.ok) {
      throw new Error("APIエラー");
    }
    const colorData = await res.json();
    console.log(colorData.name.value);
  } catch (error) {
    // tryでエラーが起きたらすべてここに入る
    // エラーをコンソールにコンソールのerrorプロパティを使用して表示する
    console.error(error);
    // pokemonInfoのHTML要素のtextContentにデータが取得できなかったことを示す文字列を追加。
    colorInfoElement.textContent = "カラーデータを取れませんでした。";
  }
  // ★ここまでPokeAPI追加

  // omikujiBtnの無効をfalseにする
  omikujiBtn.disabled = false;
}

async function main() {
  const response = await fetch("https://www.thecolorapi.com/id?hex=24B1E0");
  const colorData = await response.json();
  console.log(colorData);
}
