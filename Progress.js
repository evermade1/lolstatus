import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles'; // 앞서 정의한 스타일 파일을 임포트합니다.

const ProgressBar = ({ max,value, color }) => {
  const progressPercentage = `${Math.min(100, Math.max(0, (value/max)*100))}%`;

  return (
    <View style={{width: '70%',
    height: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden'}}>
      <View style={{height: '100%',
      borderRadius: 3,
      backgroundColor: color, width: progressPercentage }}>
        <Text style={{ fontSize: 10, marginLeft: 3 }}>{value.toLocaleString()}</Text>
        </View>
    </View>
  );
};

export default ProgressBar;
