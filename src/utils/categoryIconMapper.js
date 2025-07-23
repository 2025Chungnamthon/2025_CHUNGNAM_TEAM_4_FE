import iconLarge1 from '../assets/common/iconLarge/iconL1.png';
import iconLarge2 from '../assets/common/iconLarge/iconL2.png';
import iconLarge3 from '../assets/common/iconLarge/iconL3.png';
import iconLarge4 from '../assets/common/iconLarge/iconL4.png';
import iconLarge5 from '../assets/common/iconLarge/iconL5.png';
import iconLarge6 from '../assets/common/iconLarge/iconL6.png';
import iconLarge7 from '../assets/common/iconLarge/iconL7.png';
import iconLarge8 from '../assets/common/iconLarge/iconL8.png';
import iconSmall1 from '../assets/common/iconSmall/iconS1.png';
import iconSmall2 from '../assets/common/iconSmall/iconS2.png';
import iconSmall3 from '../assets/common/iconSmall/iconS3.png';
import iconSmall4 from '../assets/common/iconSmall/iconS4.png';
import iconSmall5 from '../assets/common/iconSmall/iconS5.png';
import iconSmall6 from '../assets/common/iconSmall/iconS6.png';
import iconSmall7 from '../assets/common/iconSmall/iconS7.png';
import iconSmall8 from '../assets/common/iconSmall/iconS8.png';


const categoryLargeIconMap = {
  '일상 속 습관': iconLarge1,
  '친환경 이동': iconLarge2,
  '친환경 소비': iconLarge3,
  '재활용/자원순환': iconLarge4,
  '에너지 절약': iconLarge5,
  '저탄소 식생활': iconLarge6,
  '환경 교육/확산': iconLarge7,
  '지역사회/공동체 활동': iconLarge8,
};

export function getLargeCategoryIcon(category) {
  return categoryLargeIconMap[category] || null; // 매칭 안 될 경우 null 반환
}

const categorySmallIconMap = {
  '일상 속 습관': iconSmall1,
  '친환경 이동': iconSmall2,
  '친환경 소비': iconSmall3,
  '재활용/자원순환': iconSmall4,
  '에너지 절약': iconSmall5,
  '저탄소 식생활': iconSmall6,
  '환경 교육/확산': iconSmall7,
  '지역사회/공동체 활동': iconSmall8,
};

export function getSmallCategoryIcon(category) {
  return categorySmallIconMap[category] || null; // 매칭 안 될 경우 null 반환
}