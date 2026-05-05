import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import PixelText from './PixelText';

interface PixelButtonProps {
  label: string;
  onPress: () => void;
  color?: string;
  textColor?: string;
  size?: number;
  style?: ViewStyle;
  disabled?: boolean;
}

export default function PixelButton({
  label,
  onPress,
  color = '#FF4D94',
  textColor = '#FFF0F5',
  size = 10,
  style,
  disabled = false,
}: PixelButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        styles.btn,
        {
          backgroundColor: disabled ? '#E0C5D5' : color,
          borderColor: disabled ? '#D4A5C9' : darken(color),
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
    >
      <PixelText size={size} color={textColor}>
        {label}
      </PixelText>
    </TouchableOpacity>
  );
}

function darken(hex: string): string {
  const map: Record<string, string> = {
    '#FF4D94': '#CC2970',
    '#FFB3C6': '#FF85A1',
    '#FF85A1': '#FF4D94',
    '#FF6B9D': '#CC3B70',
  };
  return map[hex] ?? '#CC2970';
}

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderWidth: 3,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF4D94',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});
