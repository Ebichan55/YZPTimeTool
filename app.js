// ------------------------------
// UTC 時計
// ------------------------------
function updateUTC() {
  const now = new Date();
  document.getElementById("utc-clock").textContent =
    now.toISOString().replace("T", " ").slice(0, 19) + " UTC";
}
setInterval(updateUTC, 1000);
updateUTC();


// ------------------------------
// ユーザー追加ボタン
// ------------------------------
document.getElementById("add-user").onclick = () => {
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" placeholder="ユーザー名">
    <input type="number" min="1" placeholder="行軍時間（秒）">
  `;
  document.getElementById("march-list").appendChild(div);
};


// ------------------------------
// 計算ボタン
// ------------------------------
document.getElementById("calc").onclick = () => {
  const list = document.querySelectorAll("#march-list div");
  const result = document.getElementById("result");
  result.innerHTML = "";

  const marchTimes = [];

  // 入力された行軍時間を取得
  list.forEach(div => {
    const name = div.children[0].value || "名無し";
    const sec = Number(div.children[1].value);

    if (!sec || sec <= 0) return;

    marchTimes.push({ name, sec });
  });

  if (marchTimes.length === 0) {
    alert("行軍時間（秒）を入力してください");
    return;
  }

  // 最長行軍時間（秒）
  const maxSec = Math.max(...marchTimes.map(x => x.sec));

  // 遅延秒数を計算
  marchTimes.forEach(user => {
    const delay = maxSec - user.sec;
    result.innerHTML += `<p>${user.name} → ${delay} 秒後に出発</p>`;
  });
};
