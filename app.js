// ------------------------------
// UTC 時計
// ------------------------------
function updateUTC() {
  const now = new Date();
  document.getElementById("utc-clock").textContent =
    now.toISOString().slice(11, 19) + " UTC";
}
setInterval(updateUTC, 1000);
updateUTC();


// ------------------------------
// 敵追加ボタン
// ------------------------------
document.getElementById("add-enemy").onclick = () => {
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" placeholder="敵名">
    <input type="text" placeholder="残り時間（MMSS） 例：0130">
    <input type="number" min="1" placeholder="行軍時間（秒）">
  `;
  document.getElementById("enemy-list").appendChild(div);
};


// ------------------------------
// 秒 → MMSS 変換
// ------------------------------
function secToMMSS(sec) {
  sec = ((sec % 3600) + 3600) % 3600; // マイナス対策
  const mm = String(Math.floor(sec / 60)).padStart(2, "0");
  const ss = String(sec % 60).padStart(2, "0");
  return mm + ss;
}


// ------------------------------
// 計算ボタン
// ------------------------------
document.getElementById("calc").onclick = () => {
  const result = document.getElementById("result");
  result.innerHTML = "";

  const enemyDivs = document.querySelectorAll("#enemy-list div");
  const enemies = [];

  enemyDivs.forEach(div => {
    const name = div.children[0].value || "敵";
    const mmss = div.children[1].value;
    const march = Number(div.children[2].value);

    if (mmss.length !== 4 || isNaN(march) || march <= 0) return;

    // MMSS → 秒
    const mm = Number(mmss.slice(0, 2));
    const ss = Number(mmss.slice(2, 4));
    const remainSec = mm * 60 + ss;

    enemies.push({ name, remainSec, march });
  });

  if (enemies.length === 0) {
    result.innerHTML = "敵の情報を入力してください";
    return;
  }

  // 現在UTC（MMSS → 秒）
  const now = new Date();
  const nowSec = now.getUTCMinutes() * 60 + now.getUTCSeconds();

  enemies.forEach(e => {
    const hitRemain = e.remainSec + e.march; // 着弾までの残り秒
    const hitUTCsec = nowSec + hitRemain;    // 着弾UTC（秒）

    const hitUTC = secToMMSS(hitUTCsec);

    result.innerHTML += `<p>${e.name} → 着弾UTC：${hitUTC}</p>`;
  });
  function updateUTC() {
    const now = new Date();
    document.getElementById("utc-clock").textContent =
      now.toISOString().slice(11, 19) + " UTC";
  }
  setInterval(updateUTC, 1000);
  updateUTC();

  
};
