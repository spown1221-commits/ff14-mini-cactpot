const payout = {
  6:10000, 7:36, 8:720, 9:360, 10:80,
  11:252, 12:108, 13:72, 14:54,
  15:180, 16:72, 17:180, 18:119
};

const lines = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

let cells = Array(9).fill(null);

// 點格子輸入數字（手機用）
document.querySelectorAll(".cell").forEach(cell => {
  cell.addEventListener("click", () => {
    const v = prompt("輸入 1–9（留空清除）");
    const id = parseInt(cell.dataset.id);
    if (v === null || v === "") {
      cells[id] = null;
      cell.textContent = "";
    } else {
      cells[id] = parseInt(v);
      cell.textContent = v;
    }
  });
});

document.getElementById("calcBtn").onclick = () => {
  document.querySelectorAll(".cell").forEach(c=>{
    c.classList.remove("best","second");
  });

  const result = solveWithLearning(cells);

  // 標示最佳線
  lines[result.best].forEach(i=>{
    document.querySelector(`.cell[data-id="${i}"]`).classList.add("best");
  });

  // 次佳線
  if (result.second !== null) {
    lines[result.second].forEach(i=>{
      document.querySelector(`.cell[data-id="${i}"]`).classList.add("second");
    });
  }

  document.getElementById("result").textContent =
    `推薦線：${result.best + 1}（個人化評分 ${result.bestScore.toFixed(1)}）`;
};
