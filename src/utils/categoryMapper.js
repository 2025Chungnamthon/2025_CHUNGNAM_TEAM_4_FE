const categoryMap = {
'일상 속 습관': 'DAILY_HABIT',
'친환경 이동': 'ECO_TRANSPORTATION',
'친환경 소비': 'ECO_CONSUMPTION',
'재활용/자원순환': 'RECYCLING',
'에너지 절약': 'ENERGY_SAVING',
'저탄소 식생활': 'LOW_CARBON_DIET',
'환경 교육/확산': 'ENVIRONMENTAL_EDUCATION',
'지역사회/공동체 활동': 'COMMUNITY_ACTIVITY',
};

export const getEnglishCategory = (koreanCategory) => {
  return categoryMap[koreanCategory] || null;
};