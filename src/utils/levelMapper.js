const koreanToLevel = {
  '하': 'LOW',
  '중': 'MIDDLE',
  '상': 'HIGH',
};

export const getEnglishLevel = (koreanLevel) => {
  return koreanToLevel[koreanLevel] || null;
};
