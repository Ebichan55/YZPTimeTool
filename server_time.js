// UTC補正値（秒）を取得
function getOffset() {
  return Number(localStorage.getItem("utc_offset") || 0);
}

// 補正後の現在UTC（UNIX秒）
function getServerNow() {
  const offset = getOffset();
  return Math.floor(Date.now() / 1000) + offset;
}

// 補正値を保存
function setOffset(additional) {
  const current = Number(localStorage.getItem("utc_offset") || 0);
  const updated = current + additional;
  localStorage.setItem("utc_offset", updated);
}

