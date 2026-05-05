import { View, StyleSheet } from 'react-native';
import PixelText from './PixelText';
import { formatTime } from '@/lib/progress';

interface TimerDisplayProps {
  seconds: number;
  label?: string;
}

export default function TimerDisplay({ seconds, label = 'TIME' }: TimerDisplayProps) {
  return (
    <View style={styles.container}>
      <PixelText size={7} color="#FF85A1" style={styles.label}>
        {label}
      </PixelText>
      <View style={styles.box}>
        <PixelText size={14} color="#FF4D94">
          {formatTime(seconds)}
        </PixelText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  label: {
    marginBottom: 4,
  },
  box: {
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#FFB3C6',
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    shadowColor: '#FF85A1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
});
