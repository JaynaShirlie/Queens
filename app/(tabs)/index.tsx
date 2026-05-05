import { useEffect, useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { useRef } from 'react';
import PixelText from '@/components/PixelText';
import PixelButton from '@/components/PixelButton';
import FloatingDeco, { DecoRow, BackgroundClutter } from '@/components/FloatingDeco';
import { loadProgress, formatTime, GameProgress } from '@/lib/progress';
import { SafeAreaView } from 'react-native-safe-area-context';

const SCREEN_W = Dimensions.get('window').width;

export default function HomeScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState<GameProgress | null>(null);
  const floatAnim = useRef(new Animated.Value(0)).current;
  const sparkle = useRef(new Animated.Value(0)).current;
  const titleScale = useRef(new Animated.Value(0.8)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const cardSlide = useRef(new Animated.Value(40)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(titleScale, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.parallel([
      Animated.timing(cardSlide, {
        toValue: 0,
        duration: 700,
        delay: 300,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 500,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -12, duration: 1400, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
        Animated.timing(floatAnim, { toValue: 0, duration: 1400, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(sparkle, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(sparkle, { toValue: 0.3, duration: 900, useNativeDriver: true }),
      ]),
    ).start();
  }, [floatAnim, sparkle, titleScale, titleOpacity, cardSlide, cardOpacity]);

  useFocusEffect(
    useCallback(() => {
      loadProgress().then(setProgress);
    }, []),
  );

  const completedCount = progress
    ? Object.values(progress.levelData).filter((l) => l.completed).length
    : 0;

  return (
    <SafeAreaView style={styles.safe}>
      <BackgroundClutter />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <DecoRow>
          <FloatingDeco variant="flower" size={36} position="left" delay={0} opacity={0.5} />
          <FloatingDeco variant="bow" size={32} position="center" delay={200} opacity={0.4} />
          <FloatingDeco variant="flower" size={28} position="right" delay={400} opacity={0.5} />
        </DecoRow>

        <Animated.View style={[styles.header, { opacity: titleOpacity, transform: [{ scale: titleScale }] }]}>
          <PixelText size={9} color="#FF85A1">
            ✿ pixel queens ✿
          </PixelText>
          <PixelText size={22} color="#FF4D94" style={styles.title}>
            QUEENS
          </PixelText>
          <PixelText size={8} color="#FF6B9D">
            a cute logic puzzle
          </PixelText>
        </Animated.View>

        <Animated.View style={[styles.imageWrap, { transform: [{ translateY: floatAnim }] }]}>
          <View style={styles.imageGlow}>
            <Image
              source={require('@/assets/images/download.png')}
              style={styles.heroImage}
              resizeMode="contain"
            />
          </View>
        </Animated.View>

        <Animated.View style={[styles.sparkleRow, { opacity: sparkle }]}>
          <PixelText size={10} color="#FFB3C6">✦</PixelText>
          <PixelText size={14} color="#FF85A1">✧</PixelText>
          <PixelText size={10} color="#FFB3C6">✦</PixelText>
        </Animated.View>

        <Animated.View style={[styles.card, { opacity: cardOpacity, transform: [{ translateY: cardSlide }] }]}>
          <View style={styles.cardHeader}>
            <Image
              source={require('@/assets/images/87a5a7d65ad0cc1979c80b570e3e5834.png')}
              style={styles.cardDecoImg}
              resizeMode="contain"
            />
            <PixelText size={8} color="#FF85A1">
              YOUR PROGRESS
            </PixelText>
            <Image
              source={require('@/assets/images/87a5a7d65ad0cc1979c80b570e3e5834.png')}
              style={styles.cardDecoImg}
              resizeMode="contain"
            />
          </View>
          <View style={styles.progressBarOuter}>
            <View style={styles.progressBar}>
              <View
                style={[styles.progressFill, { width: `${(completedCount / 25) * 100}%` }]}
              />
            </View>
          </View>
          <PixelText size={10} color="#FF4D94" style={{ marginTop: 10 }}>
            {completedCount} / 25 LEVELS
          </PixelText>
          {progress && (
            <View style={styles.timeRow}>
              <PixelText size={7} color="#FF85A1">
                ⏱ total: {formatTime(progress.totalTimeSeconds)}
              </PixelText>
            </View>
          )}
        </Animated.View>

        <DecoRow>
          <FloatingDeco variant="heart" size={30} position="left" delay={100} opacity={0.35} />
          <FloatingDeco variant="music" size={42} position="center" delay={300} opacity={0.3} />
          <FloatingDeco variant="heart" size={30} position="right" delay={500} opacity={0.35} />
        </DecoRow>

        <Animated.View style={[styles.buttons, { opacity: cardOpacity, transform: [{ translateY: cardSlide }] }]}>
          <PixelButton
            label={completedCount === 0 ? '♛ START GAME ♛' : '♛ CONTINUE ♛'}
            onPress={() =>
              router.push({
                pathname: '/game',
                params: { level: progress?.currentLevel ?? 1 },
              })
            }
            color="#FF4D94"
            size={10}
            style={styles.mainBtn}
          />
          <PixelButton
            label="✿ ALL LEVELS ✿"
            onPress={() => router.push('/(tabs)/levels')}
            color="#FF85A1"
            size={9}
            style={styles.secBtn}
          />
        </Animated.View>

        <View style={styles.catRow}>
          <Animated.View style={{ opacity: sparkle }}>
            <PixelText size={20} color="#FF4D94">
              =^.^=
            </PixelText>
          </Animated.View>
          <Image
            source={require('@/assets/images/abf639783de504ff3a9c16ebc6278a57.png')}
            style={{ width: 40, height: 30 }}
            resizeMode="contain"
          />
          <Animated.View style={{ opacity: sparkle.interpolate({ inputRange: [0, 1], outputRange: [1, 0.3] }) }}>
            <PixelText size={20} color="#FF85A1">
              =^.^=
            </PixelText>
          </Animated.View>
        </View>

        <View style={styles.ruleCard}>
          <View style={styles.ruleHeader}>
            <Image
              source={require('@/assets/images/46e76919831133ccb3d19180793100ce.png')}
              style={styles.ruleDecoImg}
              resizeMode="contain"
            />
            <PixelText size={8} color="#FF4D94">
              HOW TO PLAY
            </PixelText>
            <Image
              source={require('@/assets/images/46e76919831133ccb3d19180793100ce.png')}
              style={styles.ruleDecoImg}
              resizeMode="contain"
            />
          </View>
          <View style={styles.ruleList}>
            <View style={styles.ruleItem}>
              <PixelText size={10} color="#FFB3C6">♛</PixelText>
              <PixelText size={7} color="#FF6B9D" style={styles.ruleText}>
                place 1 queen per row
              </PixelText>
            </View>
            <View style={styles.ruleItem}>
              <PixelText size={10} color="#FFB3C6">♛</PixelText>
              <PixelText size={7} color="#FF6B9D" style={styles.ruleText}>
                place 1 queen per col
              </PixelText>
            </View>
            <View style={styles.ruleItem}>
              <PixelText size={10} color="#FFB3C6">♛</PixelText>
              <PixelText size={7} color="#FF6B9D" style={styles.ruleText}>
                1 queen per color zone
              </PixelText>
            </View>
            <View style={styles.ruleItem}>
              <PixelText size={10} color="#FFB3C6">♛</PixelText>
              <PixelText size={7} color="#FF6B9D" style={styles.ruleText}>
                queens cant touch!
              </PixelText>
            </View>
          </View>
        </View>

        <DecoRow>
          <FloatingDeco variant="phone" size={38} position="left" delay={200} opacity={0.3} />
          <FloatingDeco variant="kitty" size={40} position="center" delay={400} opacity={0.25} />
          <FloatingDeco variant="phone" size={38} position="right" delay={600} opacity={0.3} />
        </DecoRow>

        <View style={styles.footerRow}>
          <PixelText size={7} color="#FFB3C6">
            ✿ ~ made with luv ~ ✿
          </PixelText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF0F5' },
  scroll: { padding: 20, paddingBottom: 50, alignItems: 'center' },
  header: { alignItems: 'center', marginBottom: 8, marginTop: 4 },
  title: { marginVertical: 6, letterSpacing: 2 },
  imageWrap: { marginVertical: 8 },
  imageGlow: {
    backgroundColor: '#FFE0EC',
    borderRadius: 80,
    padding: 12,
    shadowColor: '#FF85A1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  heroImage: { width: 140, height: 140 },
  sparkleRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 12,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFF',
    borderWidth: 3,
    borderColor: '#FF85A1',
    borderBottomWidth: 6,
    borderRightWidth: 6,
    borderRadius: 8,
    padding: 18,
    width: SCREEN_W - 40,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#FF4D94',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  cardDecoImg: { width: 22, height: 22 },
  progressBarOuter: {
    width: '100%',
    backgroundColor: '#FFE0EC',
    borderWidth: 2,
    borderColor: '#FF85A1',
    borderRadius: 6,
    padding: 2,
  },
  progressBar: {
    width: '100%',
    height: 14,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF4D94',
    borderRadius: 4,
  },
  timeRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttons: { width: SCREEN_W - 40, gap: 10, marginBottom: 14 },
  mainBtn: { width: '100%', borderRadius: 8 },
  secBtn: { width: '100%', borderRadius: 8 },
  catRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 14 },
  ruleCard: {
    backgroundColor: '#FFF',
    borderWidth: 3,
    borderColor: '#FF85A1',
    borderBottomWidth: 6,
    borderRightWidth: 6,
    borderRadius: 8,
    padding: 18,
    width: SCREEN_W - 40,
    marginBottom: 12,
    shadowColor: '#FF4D94',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  ruleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 14,
  },
  ruleDecoImg: { width: 20, height: 20 },
  ruleList: { gap: 8 },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ruleText: { flex: 1 },
  footerRow: {
    marginTop: 8,
    alignItems: 'center',
    opacity: 0.7,
  },
});
