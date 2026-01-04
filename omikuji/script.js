// HTML参照
// IDがresultのHTML要素を取得
const resultArea = document.getElementById("result");
// IDがomikuji-btnのHTML要素を取得
const omikujiBtn = document.getElementById("omikuji-btn");

// ★ここからPokeAPI追加
const pokemonInfo = document.getElementById("pokemon-info");
// ★ここまでPokeAPI追加

// イベントリスナー
// omikujiBtnをクリックしたら，omikujiFuncの定義がイベントハンドラとして参照される
omikujiBtn.addEventListener("click", omikujiFunc);

/**
 * omikujiBtnのイベントハンドラomikujiFunc
 */
async function omikujiFunc() {
  // ★追加：カラーのリセット
  // シンプルだから関数切り出ししないでいく
  resultArea.style.color = "#d4af37";
  // 今は???の結果表示部分に"神様と通信中..."という文字列を代入
  resultArea.textContent = "占い中...";
  // omikujiBtnが通信中はdisabled（無効）をtrueにしておく。
  omikujiBtn.disabled = true;

  // ★追加：コメントを外す＆クラスを追加（震えスタート！）
  const container = document.querySelector(".container");
  container.classList.add("shake-animation"); // ← これを追加！

  // 3秒後にresolveする
  // この処理は3秒待たせるだけの処理。後続の処理を3秒間停止させておく。
  console.time("時間測定");
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.timeEnd("時間測定");
  // ★追加：待った終わったので、震えるクラスを外す（スイッチOFF！）
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

  // もし結果が大吉なら，HTMLElement のサブクラスにある color に#d93d3dの色を代入する
  // 大吉以外だったら，HTMLElement のサブクラスにある color に#d4af37の色を代入する
  if (result === "大吉") {
    resultArea.style.color = "#d93d3d";
  } else if (result === "凶") {
    resultArea.style.color = "#333";
  } else {
    resultArea.style.color = "#d4af37";
  }

  // ★ここからPokeAPI追加：Dittoのデータ取得
  pokemonInfo.textContent = "ポケモンデータ取得中...";
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
    if (!res.ok) {
      throw new Error("APIエラー");
    }
    const data = await res.json();
    // 使いたい項目だけピックアップ
    const name = data.name;
    const height = data.height;
    const weight = data.weight;
    const firstAbility = data.abilities?.[0]?.ability?.name ?? "なし";
    pokemonInfo.textContent = `名前: ${name} / 高さ: ${height} / 重さ: ${weight} / 特性: ${firstAbility}`;
  } catch (error) {
    console.error(error);
    pokemonInfo.textContent = "ポケモンデータを取れませんでした。";
  }
  // ★ここまでPokeAPI追加

  // omikujiBtnの無効をfalseにする
  omikujiBtn.disabled = false;
}
