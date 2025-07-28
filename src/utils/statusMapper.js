// 양방향 매핑 객체
const statusMap = {
  PENDING: '검토중',
  REJECTED: '반려',
  IN_PROGRESS: '진행중',
  COMPLETED: '승인',
};

// 역방향 매핑 자동 생성
const reverseStatusMap = Object.fromEntries(
  Object.entries(statusMap).map(([key, value]) => [value, key])
);

// 영어 → 한글
export const getKoreanStatus = (englishStatus) => {
  return statusMap[englishStatus] || englishStatus;
};

// 한글 → 영어
export const getEnglishStatus = (koreanStatus) => {
  return reverseStatusMap[koreanStatus] || koreanStatus;
};
