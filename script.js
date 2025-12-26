const countdownDaysElement = document.getElementById("countdown-days");
const countdownTimerElement = document.getElementById("countdown-timer");

console.log(countdownDaysElement);
console.log(countdownTimerElement);

const target = new Date("2026-01-01T00:00:00+09:00");
const today = Date.now();

console.log(target.getTime());
console.log(today);
console.log(typeof today);

const remainingDays = Math.floor(
  (target.getTime() - today) / (1000 * 60 * 60 * 24)
);
console.log(remainingDays);

countdownDaysElement.textContent = `残りの日数は ${remainingDays} 日`;
