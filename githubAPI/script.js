const searchBtnElement = document.getElementById("search-btn");
const usernameInputElement = document.getElementById("username-input");
const profileCardElement = document.getElementById("profile-card");
const messageAreaElement = document.getElementById("message");

// searchBtnElementをclickしたときのイベントリスナー
searchBtnElement.addEventListener("click", function () {
  // usernameInputElementで入力された値をusernameに代入
  const username = usernameInputElement.value;
  console.log(username);
  // usernameがあったら、getUserDataを実行する。引数はusername
  if (username) {
    getUserData(username);
  }
});

/**
 * ユーザー名を使用してAPI通信をする、エラー処理つき関数
 * @param {string} username
 */
async function getUserData(username) {
  // "Searching..."をmessageAreaElementのHTML要素のtextContentプロパティに追加
  messageAreaElement.textContent = "Searching...";
  // profileCardElementのHTML要素のstyleプロパティの中のオブジェクトのdisplayプロパティに"none"を代入
  profileCardElement.style.display = "none";

  try {
    // usernameをリンクに追加して、GithubのAPIにリクエストする
    // awaitして待って、HTTPレスポンスオブジェクトが返ってきたらresponseに代入
    const response = await fetch(`https://api.github.com/users/${username}`);
    // responseのオブジェクトのOKプロパティがfalseだったらエラー投げる
    // ! 404 など失敗時は自分でエラーを投げる
    if (!response.ok) {
      throw new Error("User not found");
    }
    // responseのオブジェクトのjson()メソッドを使用して、
    // JSON文字列をパースしてJSのオブジェクトにする
    // そのオブジェクトをdataに入れる
    const data = await response.json();
    console.log("取得したデータ:", data);
    // displayCardを実行する。引数はdata
    displayCard(data);
  } catch (error) {
    // tryの中でエラーが起きたらここが実行される
    // messageAreaElementの表示部分にerror.messageを表示
    messageAreaElement.textContent = error.message;
  }
}

/**
 * API通信で取得したdataを表示するための関数
 * @param {object} data
 */
function displayCard(data) {
  // user-avatarのHTML要素のsrc属性にdataオブジェクトのavatar_urlプロパティの値を代入
  document.getElementById("user-avatar").src = data.avatar_url;

  // dataオブジェクトの中にnameプロパティの値があったらそれを使う
  // なかったら loginプロパティ（ユーザー名）の値を使う
  // 論理和演算子ではあるけど、ブール値を返す論理和じゃなくて値を返す
  //truthy（空文字や null/undefined でない）ならその値を返す
  // null合体演算子は、null/undefined だけを判定するので空文字は採用されちゃう
  document.getElementById("user-name").textContent = data.name || data.login;
  // ユーザー名
  document.getElementById("user-login").textContent = data.login;
  document.getElementById("repo-count").textContent = data.public_repos;
  document.getElementById("follower-count").textContent = data.followers;
  // "block"でprofileCardElementのHTML要素を表示する
  profileCardElement.style.display = "block";
  // messageAreaElementのHTML要素の表示部分に空文字を代入
  messageAreaElement.textContent = "";
}
