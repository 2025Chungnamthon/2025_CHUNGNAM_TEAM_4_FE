// components/common/ToastMessage.js

import Toast from "react-native-root-toast";

const showToast = (message = '알 수 없는 오류가 발생했습니다.', options = {}) => {
  if (!message) return;

  Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.TOP,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    ...options,
  });
  
};

export default showToast;
