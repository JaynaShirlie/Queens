import { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import PixelText from './PixelText';

export default function PixelCat() {
  const bounce = useRef(new Animated.Value(0)).current;
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounce, { toValue: -18, duration: 300, useNativeDriver: true }),
        Animated.timing(bounce, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(spin, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(spin, { toValue: -1, duration: 400, useNativeDriver: true }),
        Animated.timing(spin, { toValue: 0, duration: 400, useNativeDriver: true }),
      ]),
    ).start();
  }, [bounce, spin]);

  const rotate = spin.interpolate({ inputRange: [-1, 1], outputRange: ['-15deg', '15deg'] });

  return (
    <Animated.View style={[styles.cat, { transform: [{ translateY: bounce }, { rotate }] }]}>
      <View style={styles.body}>
        <View style={styles.ears}>
          <View style={[styles.ear, styles.earLeft]} />
          <View style={[styles.ear, styles.earRight]} />
        </View>
        <View style={styles.head}>
          <View style={styles.eyeRow}>
            <View style={styles.eye} />
            <View style={styles.eye} />
          </View>
          <View style={styles.nose} />
          <View style={styles.whiskerRow}>
            <View style={[styles.whisker, styles.whiskerLeft]} />
            <View style={[styles.whisker, styles.whiskerRight]} />
          </View>
        </View>
        <View style={styles.torso} />
        <View style={styles.pawRow}>
          <View style={styles.paw} />
          <View style={styles.paw} />
        </View>
        <View style={styles.tail} />
      </View>
      <View style={styles.hearts}>
        <PixelText size={16} color="#FF4D94">
          {'<3'}
        </PixelText>
        <PixelText size={12} color="#FF85A1">
          {'<3'}
        </PixelText>
      </View>
    </Animated.View>
  );
}

const PINK = '#FF85A1';
const DEEP_PINK = '#FF4D94';
const LIGHT = '#FFF0F5';

const styles = StyleSheet.create({
  cat: {
    alignItems: 'center',
  },
  body: {
    alignItems: 'center',
    position: 'relative',
  },
  ears: {
    flexDirection: 'row',
    marginBottom: -6,
    zIndex: 1,
    paddingHorizontal: 8,
  },
  ear: {
    width: 22,
    height: 22,
    backgroundColor: PINK,
    borderWidth: 3,
    borderColor: DEEP_PINK,
  },
  earLeft: {
    marginRight: 20,
    transform: [{ rotate: '-10deg' }],
  },
  earRight: {
    transform: [{ rotate: '10deg' }],
  },
  head: {
    width: 72,
    height: 72,
    backgroundColor: LIGHT,
    borderWidth: 3,
    borderColor: DEEP_PINK,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  eyeRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 6,
  },
  eye: {
    width: 10,
    height: 10,
    backgroundColor: DEEP_PINK,
    borderWidth: 2,
    borderColor: '#8B0040',
  },
  nose: {
    width: 8,
    height: 6,
    backgroundColor: PINK,
    borderWidth: 2,
    borderColor: DEEP_PINK,
    marginBottom: 4,
  },
  whiskerRow: {
    flexDirection: 'row',
    gap: 4,
  },
  whisker: {
    width: 20,
    height: 2,
    backgroundColor: DEEP_PINK,
  },
  whiskerLeft: { transform: [{ rotate: '-10deg' }] },
  whiskerRight: { transform: [{ rotate: '10deg' }] },
  torso: {
    width: 60,
    height: 50,
    backgroundColor: LIGHT,
    borderWidth: 3,
    borderColor: DEEP_PINK,
    borderTopWidth: 0,
    marginTop: -3,
  },
  pawRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: -3,
  },
  paw: {
    width: 22,
    height: 18,
    backgroundColor: PINK,
    borderWidth: 3,
    borderColor: DEEP_PINK,
  },
  tail: {
    position: 'absolute',
    right: -20,
    bottom: 18,
    width: 14,
    height: 40,
    backgroundColor: PINK,
    borderWidth: 3,
    borderColor: DEEP_PINK,
    transform: [{ rotate: '20deg' }],
  },
  hearts: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 8,
  },
});
