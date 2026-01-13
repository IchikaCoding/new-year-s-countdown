const sparkleContainerElement = document.getElementById("sparkle-container");
const sparkleCount = 40;

// きらきらを作る
for (let i = 0; i < sparkleCount; i++) {
  // div要素を作成する
  const dot = document.createElement("div");
  dot.className = "sparkle";
  //   <div class="sparkle"></div>をsparkleContainerElementの子要素として追加する
  sparkleContainerElement.appendChild(dot);
  // TODO: 乱数×ウィンドウの内部の幅（ピクセル単位）でランダムな幅の値を作成
  const x = Math.random() * window.innerWidth;
  //   1から1000までの数値を作成。落ちてくるスピードをランダムにするための処理。
  const delay = Math.random() * 1000;
  //   落ちてくる時間
  // 　2000~4000までのランダムな値を代入。
  const duration = 2000 + Math.random() * 2000;

  anime({
    targets: dot,
    translateX: x,
    // 画面の高さの50上の位置から50下まで落ちる
    translateY: [-50, window.innerHeight + 50],
    // 少し小さめスタートでだんだん大きくなる。
    scale: [0.5, 1],
    opacity: [1, 0],
    duration,
    delay,
    loop: true,
    easing: "linear",
  });
}
