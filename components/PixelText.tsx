import { Text, TextStyle } from 'react-native';

interface PixelTextProps {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
  size?: number;
  color?: string;
}

export default function PixelText({ children, style, size = 12, color = '#FF4D94' }: PixelTextProps) {
  return (
    <Text
      style={[
        {
          fontFamily: 'PressStart2P_400Regular',
          fontSize: size,
          color,
          lineHeight: size * 1.8,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
