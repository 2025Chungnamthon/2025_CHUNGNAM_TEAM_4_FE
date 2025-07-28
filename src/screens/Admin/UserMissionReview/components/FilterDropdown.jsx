import React from 'react';
import { Dimensions } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { moderateScale } from 'react-native-size-matters';

const {width,height} = Dimensions.get('window');

const FilterDropdown = ({ onSelectSort, selectedValue  }) => {
  return (
    <RNPickerSelect
      value={selectedValue} // 선택된 값 명시
      onValueChange={(value) => {
        // 나중에 날짜순/이름순 등 정렬 처리
        onSelectSort(value); // 임시
      }}
      placeholder={{ label: '선택', value: '' }}
      items={[
        // { label: '시간순(모두)', value: '' },
        { label: '대기', value: 'PENDING' },
        { label: '승인', value: 'COMPLETED' },
        { label: '반려', value: 'REJECTED' },                
      ]}
      
      useNativeAndroidPickerStyle={false}
      style={pickerStyles}
    />
  );
};

export default FilterDropdown;

const pickerStyles = {
  inputIOS: {
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#189D66',
    borderRadius: 8,
    color: '#000',
    marginBottom: moderateScale(12),
  },
  inputAndroid: {
    width:width*0.25,
    fontSize: 14,
    paddingVertical: moderateScale(6),
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#189D66',
    backgroundColor:'#189D66',
    borderRadius: 12,
    fontSize: moderateScale(14),
    color: '#fff',
    marginBottom: moderateScale(12),
    marginRight: 12,
  },
};