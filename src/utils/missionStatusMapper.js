export const missionStatusMapper = {
  IN_PROGRESS: '진행중',
  SUBMITTED: '검토중',
  EXPIRED: '기간만료',
};

export const getKoreanMissionStatus = (statusCode) => {
  return missionStatusMapper[statusCode] || '알 수 없음';
};

// 또는 역방향 매핑이 필요하다면 아래도 추가
export const getMissionEnglishStatus = (koreanStatus) => {
  const entry = Object.entries(missionStatusMapper).find(([_, value]) => value === koreanStatus);
  return entry ? entry[0] : null;
};
