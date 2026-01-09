// --- JavaScript（ロジックは前のままです） ---
const searchBtn = document.getElementById("search-btn");
const usernameInput = document.getElementById("username-input");
const profileCard = document.getElementById("profile-card");
const messageArea = document.getElementById("message");

searchBtn.addEventListener("click", function () {
  const username = usernameInput.value;
  if (username) {
    getUserData(username);
  }
});

async function getUserData(username) {
  messageArea.textContent = "Searching..."; // 英語っぽく変更
  profileCard.style.display = "none";

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error("User not found");
    }

    const data = await response.json();
    console.log("取得したデータ:", data);
    displayCard(data);
  } catch (error) {
    messageArea.textContent = error.message;
  }
}

function displayCard(data) {
  document.getElementById("user-avatar").src = data.avatar_url;
  document.getElementById("user-name").textContent = data.name || data.login;
  document.getElementById("user-login").textContent = data.login;
  document.getElementById("repo-count").textContent = data.public_repos;
  document.getElementById("follower-count").textContent = data.followers;

  profileCard.style.display = "block";
  messageArea.textContent = "";
}
