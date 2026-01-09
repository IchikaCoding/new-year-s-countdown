// orderCoffee: 1秒後に「☕ ホットコーヒー」を返す
function orderCoffee() {
  //  orderCoffeeの返り値
  // Promiseオブジェクトが即座に渡される。
  // setTimeoutが1秒後に実行▶resolve("☕ ホットコーヒー")が呼ばれる
  // 結果ができたよとタスクキューに入る
  // コールスタックが空いたらすぐにthenの中身が実行
  return new Promise((resolve) => {
    setTimeout(() => resolve("☕ ホットコーヒー"), 1000);
  });
}

// drink: 飲む動作
// coffeeが引数
function drink(coffee) {
  console.log(coffee + " を飲みました。おいしい！");
}

// orderCoffeeを実行して、チケット(Promiseオブジェクト)をもらう
const ticket = orderCoffee();
console.log(ticket);
// 2. チケットに「窓口」をつける
// チケット(Promiseオブジェクト)が成功したらその結果をcoffeeに渡して、それを使う
ticket.then((coffee) => {
  // 3. 成功(Fulfilled)したら、ここが実行される！
  console.log("☕ 受け取りました:", coffee);
  drink(coffee);
});

// ーーーーーーーーーーーーーーーーーーーーーーー

// Promiseオブジェクトがresolveされてfulfilledになって成功済みとして作られる▶"🍕 ピザ"という値でresolveされて、.thenの中身が動く
Promise.resolve("🍕 ピザ")
  .then((food) => {
    // fulfilledしたらこのコードが実行される
    console.log("1. 受け取った:", food);
    return food + " 🧀 チーズ追加";
  })
  //   上でリターンした結果がfoodに渡される
  .then((food) => {
    console.log("2. 加工した:", food);
  });

//   ーーーーーーーーーーーーー
// ticketというPromiseオブジェクトがある
// fulfilledしたら.thenの中身を動かす
// rejectになったら.catchが動く
ticket
  .then((coffee) => {
    console.log("☕ 成功！:", coffee);
  })
  .catch((error) => {
    // 失敗(Rejected)したら、ここが実行される！
    console.log("😢 失敗...:", error);
  });

//   ーーーーーーーーーーーーーーーーーーーーーーーーーー
// download: データをダウンロードするフリ
function download() {
  // Promiseオブジェクトを作成。
  // setTimeoutで1秒後にresolve関数を実行。
  // そしたら.thenの処理がタスクキューに入る。
  // コールスタックが空いたら実行される。
  return new Promise((resolve) =>
    setTimeout(() => resolve("ダウンロードデータ"), 1000)
  );
}

// process: データを加工するフリ
function process(data) {
  return new Promise((resolve) =>
    // 1秒後にresolveが実行される
    setTimeout(() => resolve(data + "を加工しました"), 1000)
  );
}

// display: 表示するフリ
function display(data) {
  // data表示
  console.log("画面に表示:", data);
  //   TODO:　プロミスチェーンだからPromiseオブジェクトを返さなくちゃいけないの？
  // ▶ 「必ずPromiseを返す関数」という約束を守るため
  //   即座に解決(resolve)されるPromiseを返す。
  //   待ち時間はなし。値はundefinedが返る。
  return Promise.resolve();
}

download()
  // 成功したらコールスタックが空いてから.thenの中身実行
  .then((data) => {
    console.log("1. ダウンロード完了！");
    // process関数にdataを渡して返り値とする
    return process(data);
  })
  //   さっきの返り値をprocessedが受け取る
  .then((processed) => {
    console.log("2. 加工完了！");
    // 次の処理（表示）を返す
    return display(processed);
  })
  .then(() => {
    console.log("3. 表示完了！");
    console.log("🎉 すべて完了！");
  })
  //   今までのthenの中身の中でrejectやエラーがおきたらここが実行される
  .catch((error) => {
    console.log("⚠️ どこかでエラーが起きました:", error);
  });

//   -------------------------------

// ! 焼き芋を3秒で焼いて提供する

function yakiimo() {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve("焼き芋🍠");
      //   reject("焼き芋こげた・・・😭");
    }, 3000)
  );
}
function eat(food) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${food}を食べました`);
    }, 2000);
  });
}

yakiimo()
  .then((food) => {
    console.log(`${food}ができた`);
    return eat(food);
  })
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error(error);
  });

//   -----------------------------------

// 約束チケット姉さんの仕事場（関数の中身）
/**
 *
 * @returns {Promise<string>} コーヒーの文字列を返す
 */
function orderCoffee() {
  // 「新しいチケット(Promise)」が返り値
  // 引数には、成功(resolve)と失敗(reject)の関数が渡される
  return new Promise((resolve, reject) => {
    console.log("約束チケット姉さん「今からコーヒーを淹れますよ...」");

    // 2. 何か時間がかかる処理（ここでは3秒待つ）
    setTimeout(() => {
      // 今回は成功したとする！
      const isSuccess = false;

      if (isSuccess) {
        // 3. 成功したら resolve(成功データ) を呼ぶ！
        resolve("☕ ホットコーヒー");
      } else {
        // 4. 失敗したら reject(エラー理由) を呼ぶ！
        reject("💥 豆がない！");
      }
    }, 3000);
  });
}

// 実際に注文してみよう！（コピペして実行できます）
console.log("🛎️ すみませーん、コーヒーください");

// orderCoffeeを実行
orderCoffee()
  // fulfilledしたら.thenの中身が実行される
  .then((coffee) => {
    console.log("✨ 受け取りました:", coffee);
  })
  //  rejectが確定したら、以下のコードが動く
  .catch((error) => {
    console.log("😭 エラーです:", error);
  });

Promise.resolve();
new Promise((resolve) => resolve);
