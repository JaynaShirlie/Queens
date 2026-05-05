import { useEffect, useRef, useState } from 'react';
import { View, ScrollView, StyleSheet, Animated, Easing, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import PixelText from '@/components/PixelText';
import PixelButton from '@/components/PixelButton';
import FloatingDeco, { DecoRow, BackgroundClutter } from '@/components/FloatingDeco';
import { loadProgress, formatTime } from '@/lib/progress';

const SCREEN_W = Dimensions.get('window').width;

export default function CompleteScreen() {
  const router = useRouter();
  const [totalTime, setTotalTime] = useState(0);

  const titleBounce = useRef(new Animated.Value(0)).current;
  const starsAnim = useRef(new Animated.Value(0)).current;
  const catScale = useRef(new Animated.Value(0)).current;
  const textFade = useRef(new Animated.Value(0)).current;
  const sparkle1 = useRef(new Animated.Value(0)).current;
  const sparkle2 = useRef(new Animated.Value(0)).current;
  const float1 = useRef(new Animated.Value(0)).current;
  const float2 = useRef(new Animated.Value(0)).current;
  const confettiAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadProgress().then((p) => setTotalTime(p.totalTimeSeconds));

    Animated.sequence([
      Animated.spring(catScale, {
        toValue: 1,
        useNativeDriver: true,
        tension: 60,
        friction: 6,
      }),
      Animated.timing(textFade, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(titleBounce, {
          toValue: -14,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.quad),
        }),
        Animated.timing(titleBounce, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.quad),
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(starsAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(starsAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(sparkle1, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(sparkle1, { toValue: 0.2, duration: 700, useNativeDriver: true }),
      ]),
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(sparkle2, { toValue: 0.2, duration: 500, useNativeDriver: true }),
        Animated.timing(sparkle2, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(float1, { toValue: -14, duration: 1000, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
        Animated.timing(float1, { toValue: 0, duration: 1000, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
      ]),
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(float2, { toValue: 14, duration: 1400, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
        Animated.timing(float2, { toValue: 0, duration: 1400, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(confettiAnim, { toValue: 1, duration: 1500, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
        Animated.timing(confettiAnim, { toValue: 0, duration: 1500, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
      ]),
    ).start();
  }, [catScale, textFade, titleBounce, starsAnim, sparkle1, sparkle2, float1, float2, confettiAnim]);

  return (
    <SafeAreaView style={styles.safe}>
      <BackgroundClutter />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <DecoRow>
          <FloatingDeco variant="bow" size={36} position="left" delay={0} opacity={0.5} />
          <FloatingDeco variant="flower" size={30} position="center" delay={200} opacity={0.5} />
          <FloatingDeco variant="bow" size={36} position="right" delay={400} opacity={0.5} />
        </DecoRow>

        <View style={styles.decoRow}>
          <Animated.View style={{ opacity: sparkle1 }}>
            <PixelText size={20} color="#FF4D94">✦</PixelText>
          </Animated.View>
          <Animated.View style={{ opacity: sparkle2 }}>
            <PixelText size={16} color="#FF85A1">✧</PixelText>
          </Animated.View>
          <Animated.View style={{ opacity: sparkle1 }}>
            <PixelText size={24} color="#FFB3C6">✦</PixelText>
          </Animated.View>
        </View>

        <Animated.View style={{ transform: [{ translateY: titleBounce }] }}>
          <PixelText size={18} color="#FF4D94" style={styles.mainTitle}>
            ♛ YOU WIN! ♛
          </PixelText>
        </Animated.View>

        <Animated.View
          style={[styles.starsRow, { opacity: starsAnim.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1] }) }]}
        >
          <PixelText size={18} color="#FF4D94">{'★'}</PixelText>
          <PixelText size={22} color="#FF85A1">{'★'}</PixelText>
          <PixelText size={18} color="#FF4D94">{'★'}</PixelText>
        </Animated.View>

        <Animated.View style={[styles.catGifWrap, { transform: [{ scale: catScale }] }]}>
          <View style={styles.catGlow}>
            <Image
              source={require('@/assets/images/cat-kitty-trans.gif')}
              style={styles.catGif}
              resizeMode="contain"
            />
          </View>
        </Animated.View>

        <DecoRow>
          <FloatingDeco variant="music" size={40} position="left" delay={100} opacity={0.35} />
          <FloatingDeco variant="phone" size={44} position="center" delay={300} opacity={0.3} />
          <FloatingDeco variant="music" size={40} position="right" delay={500} opacity={0.35} />
        </DecoRow>

        <Animated.View style={[styles.messageBox, { opacity: textFade }]}>
          <Image
            source={require('@/assets/images/87a5a7d65ad0cc1979c80b570e3e5834.png')}
            style={{ width: 28, height: 28, marginBottom: 8, opacity: 0.7 }}
            resizeMode="contain"
          />
          <PixelText size={9} color="#FF4D94" style={styles.msgLine}>
            hey you did all
          </PixelText>
          <PixelText size={9} color="#FF4D94" style={styles.msgLine}>
            the levels?
          </PixelText>
          <PixelText size={9} color="#FF6B9D" style={[styles.msgLine, { marginTop: 10 }]}>
            proud of u
          </PixelText>
          <PixelText size={9} color="#FF6B9D" style={styles.msgLine}>
            here is a dancing
          </PixelText>
          <PixelText size={9} color="#FF6B9D" style={styles.msgLine}>
            cat that celebrates
          </PixelText>
          <PixelText size={9} color="#FF6B9D" style={styles.msgLine}>
            u :3
          </PixelText>
          <Image
            source={require('@/assets/images/87a5a7d65ad0cc1979c80b570e3e5834.png')}
            style={{ width: 28, height: 28, marginTop: 8, opacity: 0.7 }}
            resizeMode="contain"
          />
        </Animated.View>

        <View style={styles.heartsRow}>
          <Animated.View style={{ transform: [{ translateY: float1 }] }}>
            <PixelText size={22} color="#FF4D94">{'♥'}</PixelText>
          </Animated.View>
          <Animated.View style={{ transform: [{ translateY: float2 }] }}>
            <PixelText size={16} color="#FF85A1">{'♥'}</PixelText>
          </Animated.View>
          <Animated.View style={{ transform: [{ translateY: float1 }] }}>
            <PixelText size={22} color="#FFB3C6">{'♥'}</PixelText>
          </Animated.View>
        </View>

        <View style={styles.statsBox}>
          <View style={styles.statsHeader}>
            <Image
              source={require('@/assets/images/abf639783de504ff3a9c16ebc6278a57.png')}
              style={{ width: 24, height: 18 }}
              resizeMode="contain"
            />
            <PixelText size={8} color="#FF85A1">
              FINAL STATS
            </PixelText>
            <Image
              source={require('@/assets/images/abf639783de504ff3a9c16ebc6278a57.png')}
              style={{ width: 24, height: 18 }}
              resizeMode="contain"
            />
          </View>
          <PixelText size={11} color="#FF4D94" style={{ marginTop: 8 }}>
            25 / 25 LEVELS
          </PixelText>
          <PixelText size={9} color="#FF6B9D" style={{ marginTop: 8 }}>
            total: {formatTime(totalTime)}
          </PixelText>
          <PixelText size={7} color="#FF85A1" style={{ marginTop: 8 }}>
            true queen energy !! ♛
          </PixelText>
        </View>

        <Animated.View style={{
          transform: [{
            scale: confettiAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.95, 1.05],
            }),
          }],
        }}>
          <View style={styles.kittyWrap}>
            <Image
              source={require('@/assets/images/download.png')}
              style={styles.decoImg}
              resizeMode="contain"
            />
          </View>
        </Animated.View>

        <DecoRow>
          <FloatingDeco variant="heart" size={28} position="left" delay={100} opacity={0.4} />
          <FloatingDeco variant="flower" size={32} position="center" delay={300} opacity={0.4} />
          <FloatingDeco variant="heart" size={28} position="right" delay={500} opacity={0.4} />
        </DecoRow>

        <View style={styles.buttons}>
          <PixelButton
            label="♛ PLAY AGAIN ♛"
            onPress={() => router.replace({ pathname: '/game', params: { level: 1 } })}
            color="#FF4D94"
            size={10}
            style={styles.btn}
          />
          <PixelButton
            label="✿ HOME ✿"
            onPress={() => router.replace('/(tabs)')}
            color="#FF85A1"
            size={10}
            style={styles.btn}
          />
        </View>

        <View style={styles.bottomDeco}>
          <Animated.View style={{ opacity: sparkle2 }}>
            <PixelText size={12} color="#FF4D94">{'~✦~'}</PixelText>
          </Animated.View>
          <Animated.View style={{ opacity: sparkle1 }}>
            <PixelText size={10} color="#FF85A1">{'=^.^='}</PixelText>
          </Animated.View>
          <Animated.View style={{ opacity: sparkle2 }}>
            <PixelText size={12} color="#FF4D94">{'~✦~'}</PixelText>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF0F5' },
  scroll: { padding: 20, alignItems: 'center', paddingBottom: 60 },
  decoRow: { flexDirection: 'row', gap: 16, marginBottom: 8 },
  mainTitle: { textAlign: 'center', marginBottom: 8 },
  starsRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  catGifWrap: { marginBottom: 8 },
  catGlow: {
    backgroundColor: '#FFE0EC',
    borderRadius: 70,
    padding: 10,
    shadowColor: '#FF85A1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  catGif: { width: 120, height: 120 },
  messageBox: {
    backgroundColor: '#FFF',
    borderWidth: 3,
    borderColor: '#FF85A1',
    borderBottomWidth: 6,
    borderRightWidth: 6,
    borderRadius: 10,
    padding: 22,
    alignItems: 'center',
    width: SCREEN_W - 44,
    marginBottom: 16,
    shadowColor: '#FF4D94',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  msgLine: { textAlign: 'center', marginBottom: 4 },
  heartsRow: { flexDirection: 'row', gap: 18, marginBottom: 16, alignItems: 'center' },
  statsBox: {
    backgroundColor: '#FFF',
    borderWidth: 3,
    borderColor: '#FF85A1',
    borderBottomWidth: 6,
    borderRightWidth: 6,
    borderRadius: 10,
    padding: 22,
    alignItems: 'center',
    width: SCREEN_W - 44,
    marginBottom: 16,
    shadowColor: '#FF4D94',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  kittyWrap: {
    backgroundColor: '#FFE0EC',
    borderRadius: 50,
    padding: 10,
    marginBottom: 12,
    shadowColor: '#FF85A1',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  decoImg: { width: 80, height: 80 },
  buttons: { width: SCREEN_W - 44, gap: 10, marginBottom: 16 },
  btn: { width: '100%', borderRadius: 8 },
  bottomDeco: { flexDirection: 'row', gap: 16, alignItems: 'center' },
});
