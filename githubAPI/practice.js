// HTMLの要素を取得する
const searchBtnElement = document.getElementById("search-btn");
const messageElement = document.getElementById("message");
const profileCardElement = document.getElementById("profile-card");

// Searchボタンが押されたら、ユーザーネームを使用してGithubAPIにリクエストする
searchBtnElement.addEventListener("click", getUsername);

/**
 * 入力されたユーザーネームを取得してAPIにリクエストするための関数に渡す処理
 */
function getUsername() {
  const usernameInputElement = document.getElementById("username-input");
  const username = usernameInputElement.value;
  if (username) {
    // console.log(username);
    getUserData(username);
  }
}

/**
 * ユーザーネームからAPIにリクエストをしてその結果を取得する処理
 * @param {string} username
 */
async function getUserData(username) {
  // 調べる前に過去の表示を消すためにnoneを代入する
  profileCardElement.style.display = "none";
  messageElement.textContent = "お調べ中・・・";
  // fetch▶レスポンスもらって▶その結果が404だったらエラーだして
  // ▶エラーじゃなかったらもらったレスポンスからJSオブジェクトを取得して表示する
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error("404エラー！");
    }
    const data = await response.json();
    console.log(data);
    display(data);
  } catch (error) {
    messageElement.textContent = error.message;
    // ! displayを実行中にエラーが出て中途半端な状態で画面表示されるのを防ぐため。（ちょっと不可解）
    profileCardElement.style.display = "none";
  }
}

/**
 * 画面に表示する処理
 * @param {object} data
 */
function display(data) {
  const userAvatarElement = document.getElementById("user-avatar");
  const userNameElement = document.getElementById("user-name");
  const userLoginElement = document.getElementById("user-login");
  const repoCountElement = document.getElementById("repo-count");
  const followerCountElement = document.getElementById("follower-count");
  // アバターの画像
  userAvatarElement.src = data.avatar_url;
  // 名前（名前がnullの人もいるからそのフォールバックを入れる）
  userNameElement.textContent = data.name || data.login;
  // アットマークの後ろのユーザー名
  userLoginElement.textContent = data.login;
  // リポジトリの数
  repoCountElement.textContent = data.public_repos;
  // フォロワーの数
  followerCountElement.textContent = data.followers;
  //   ポートフォリオを画面に表示
  profileCardElement.style.display = "block";
  messageElement.textContent = "";
}
