const resultArea = document.getElementById("result");
const omikujiBtn = document.getElementById("omikuji-btn");

omikujiBtn.addEventListener("click", async function () {
  resultArea.textContent = "神様と通信中...";
  omikujiBtn.disabled = true;

  await new Promise((resolve) => setTimeout(resolve, 3000));

  const fortunes = ["大吉", "吉", "中吉", "小吉", "末吉", "凶"];

  const randomNum = Math.floor(Math.random() * fortunes.length);

  const result = fortunes[randomNum];

  resultArea.textContent = result;

  if (result === "大吉") {
    resultArea.style.color = "#d93d3d";
  } else {
    resultArea.style.color = "#d4af37";
  }

  omikujiBtn.disabled = false;
});
