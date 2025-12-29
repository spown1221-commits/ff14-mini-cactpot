function loadProfile() {
  return JSON.parse(localStorage.getItem("ff14Profile")) || {
    plays: 0,
    riskBias: 1.0
  };
}

function saveProfile(p) {
  localStorage.setItem("ff14Profile", JSON.stringify(p));
}

function expectedValue(line, cells) {
  let sum = 0;
  let unknown = 0;
  line.forEach(i=>{
    if (cells[i] === null) unknown++;
    sum += cells[i] || 0;
  });

  if (unknown === 0) return payout[sum] || 0;

  // 簡化期望（足夠實用）
  return 150;
}

function solveWithLearning(cells) {
  let profile = loadProfile();
  let scores = [];

  lines.forEach((line, idx)=>{
    let ev = expectedValue(line, cells);
    let riskAdjusted = ev * profile.riskBias;
    scores.push({ idx, score: riskAdjusted });
  });

  scores.sort((a,b)=>b.score - a.score);

  // 學習：慢慢微調偏好
  profile.plays++;
  profile.riskBias += 0.002;
  if (profile.riskBias > 1.2) profile.riskBias = 1.2;
  saveProfile(profile);

  return {
    best: scores[0].idx,
    second: scores[1] ? scores[1].idx : null,
    bestScore: scores[0].score
  };
}
