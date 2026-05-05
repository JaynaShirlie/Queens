import { useEffect, useRef } from 'react';
import { View, Image, Animated, Easing, StyleSheet, Dimensions } from 'react-native';

const SCREEN_W = Dimensions.get('window').width;

interface FloatingDecoProps {
  variant?: 'bow' | 'flower' | 'phone' | 'music' | 'heart' | 'kitty';
  size?: number;
  position?: 'left' | 'right' | 'center' | 'absolute';
  delay?: number;
  opacity?: number;
  style?: any;
}

const IMAGES: Record<string, any> = {
  bow: require('@/assets/images/abf639783de504ff3a9c16ebc6278a57.png'),
  flower: require('@/assets/images/87a5a7d65ad0cc1979c80b570e3e5834.png'),
  phone: require('@/assets/images/d19469023450c8bcb895455de5acca4e.png'),
  music: require('@/assets/images/6225382138d413af10675ec5deb2d7a2.png'),
  heart: require('@/assets/images/46e76919831133ccb3d19180793100ce.png'),
  kitty: require('@/assets/images/download.png'),
};

export default function FloatingDeco({
  variant = 'flower',
  size = 50,
  position = 'right',
  delay = 0,
  opacity = 0.35,
  style,
}: FloatingDecoProps) {
  const floatY = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: opacity,
      duration: 800,
      delay,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatY, {
          toValue: -8,
          duration: 2000 + Math.random() * 1000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin),
        }),
        Animated.timing(floatY, {
          toValue: 8,
          duration: 2000 + Math.random() * 1000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin),
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 4000 + Math.random() * 2000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin),
        }),
        Animated.timing(rotateAnim, {
          toValue: -1,
          duration: 4000 + Math.random() * 2000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin),
        }),
      ]),
    ).start();
  }, [floatY, rotateAnim, fadeIn, delay, opacity]);

  const rotate = rotateAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-8deg', '8deg'],
  });

  const positionStyle = position === 'absolute' 
    ? { position: 'absolute' as const }
    : {
        left: { alignSelf: 'flex-start' as const, marginLeft: 8 },
        right: { alignSelf: 'flex-end' as const, marginRight: 8 },
        center: { alignSelf: 'center' as const },
      }[position];

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        position !== 'absolute' && styles.container,
        positionStyle,
        style,
        {
          opacity: fadeIn,
          transform: [{ translateY: floatY }, { rotate }],
        },
      ]}
    >
      <Image
        source={IMAGES[variant]}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
    </Animated.View>
  );
}

export function DecoRow({ children }: { children: React.ReactNode }) {
  return <View style={styles.decoRow}>{children}</View>;
}

export function DecoSpacer({ height = 8 }: { height?: number }) {
  return <View style={{ height }} />;
}

export function BackgroundClutter() {
  return (
    <View style={[StyleSheet.absoluteFill, { zIndex: 0 }]} pointerEvents="none">
      <FloatingDeco variant="flower" size={40} position="absolute" delay={100} opacity={0.15} style={{ top: '8%', left: '6%' }} />
      <FloatingDeco variant="bow" size={35} position="absolute" delay={300} opacity={0.2} style={{ top: '22%', right: '10%' }} />
      <FloatingDeco variant="heart" size={28} position="absolute" delay={500} opacity={0.15} style={{ top: '38%', left: '15%' }} />
      <FloatingDeco variant="music" size={32} position="absolute" delay={200} opacity={0.2} style={{ bottom: '35%', right: '12%' }} />
      <FloatingDeco variant="phone" size={45} position="absolute" delay={400} opacity={0.15} style={{ bottom: '15%', left: '10%' }} />
      <FloatingDeco variant="kitty" size={50} position="absolute" delay={600} opacity={0.12} style={{ bottom: '8%', right: '6%' }} />
      <FloatingDeco variant="flower" size={25} position="absolute" delay={150} opacity={0.2} style={{ top: '15%', right: '35%' }} />
      <FloatingDeco variant="heart" size={35} position="absolute" delay={350} opacity={0.15} style={{ bottom: '25%', left: '42%' }} />
      <FloatingDeco variant="bow" size={40} position="absolute" delay={700} opacity={0.15} style={{ top: '48%', right: '35%' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
  decoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SCREEN_W - 40,
    paddingHorizontal: 4,
    marginVertical: 4,
  },
});
