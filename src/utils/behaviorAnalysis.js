export const analyzeBehavior = (poseResult, isSimulating) => {
  if (isSimulating.phone) {
    return { status: 'Using Phone ❌', riskLevel: 'high', scoreImpact: -10 };
  }
  if (isSimulating.idle) {
    return { status: 'Idle ⚠️', riskLevel: 'medium', scoreImpact: -5 };
  }
  if (isSimulating.fatigue) {
    return { status: 'Fatigue Detected 😴', riskLevel: 'high', scoreImpact: -8 };
  }

  if (!poseResult || !poseResult.landmarks || poseResult.landmarks.length === 0) {
    return { status: 'No Worker Detected', riskLevel: 'low', scoreImpact: 0 };
  }

  const landmarks = poseResult.landmarks[0];
  // Simple heuristic: Head tilt (nose vs shoulders)
  const nose = landmarks[0];
  const leftShoulder = landmarks[11];
  const rightShoulder = landmarks[12];
  
  const shoulderMidY = (leftShoulder.y + rightShoulder.y) / 2;
  const isHeadDropped = nose.y > shoulderMidY - 0.1; // Head position relative to shoulders

  if (isHeadDropped) {
    return { status: 'Fatigue Detected 😴', riskLevel: 'high', scoreImpact: -8 };
  }

  // Check if shoulders are level (posture)
  const shoulderDiff = Math.abs(leftShoulder.y - rightShoulder.y);
  if (shoulderDiff > 0.1) {
    return { status: 'Unsafe Posture ⚠️', riskLevel: 'medium', scoreImpact: -4 };
  }

  return { status: 'Working ✅', riskLevel: 'none', scoreImpact: 1 }; // Small bonus for staying productive
};

export const calculateScores = (currentScores, impact) => {
  // Use 1000 as the max credit score for the new personnel system
  const newCredit = Math.max(0, Math.min(1000, currentScores.creditScore + impact));
  
  // Risk score logic: increases when fatigue or phone used, decays slowly
  let newRisk = currentScores.riskScore;
  if (impact < -5) newRisk = Math.min(100, newRisk + 12);
  else newRisk = Math.max(0, newRisk - 0.5);

  return {
    creditScore: Number(newCredit.toFixed(1)),
    riskScore: Number(newRisk.toFixed(1)),
  };
};

export const calculateBonus = (creditScore) => {
  return (creditScore * 0.5).toFixed(2);
};
