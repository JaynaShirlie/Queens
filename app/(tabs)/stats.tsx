import { useCallback, useState, useEffect, useRef } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Animated, Easing, Image } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import PixelText from '@/components/PixelText';
import FloatingDeco, { DecoRow, BackgroundClutter } from '@/components/FloatingDeco';
import PixelButton from '@/components/PixelButton';
import { loadProgress, formatTime, GameProgress, clearProgress } from '@/lib/progress';

const SCREEN_W = Dimensions.get('window').width;

export default function StatsScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState<GameProgress | null>(null);
  const headerAnim = useRef(new Animated.Value(0)).current;
  const cardsAnim = useRef(new Animated.Value(40)).current;
  const cardsOpacity = useRef(new Animated.Value(0)).current;
  const catBounce = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(cardsAnim, { toValue: 0, duration: 600, delay: 200, easing: Easing.out(Easing.back(1)), useNativeDriver: true }),
      Animated.timing(cardsOpacity, { toValue: 1, duration: 400, delay: 200, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(catBounce, { toValue: -6, duration: 800, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
        Animated.timing(catBounce, { toValue: 0, duration: 800, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
      ]),
    ).start();
  }, [headerAnim, cardsAnim, cardsOpacity, catBounce]);

  useFocusEffect(
    useCallback(() => {
      loadProgress().then(setProgress);
    }, []),
  );

  const handleResetProgress = async () => {
    await clearProgress();
    setProgress(null);
    router.replace('/');
  };

  const completed = Object.values(progress?.levelData ?? {}).filter((l) => l.completed);
  const totalAttempts = Object.values(progress?.levelData ?? {}).reduce(
    (sum, l) => sum + (l.attempts ?? 0),
    0,
  );
  const bestLevel = completed.reduce(
    (best, l, i) => (l.bestTime > 0 && (best.time === 0 || l.bestTime < best.time) ? { idx: i, time: l.bestTime } : best),
    { idx: -1, time: 0 },
  );

  return (
    <SafeAreaView style={styles.safe}>
      <BackgroundClutter />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <DecoRow>
          <FloatingDeco variant="flower" size={30} position="left" delay={0} opacity={0.45} />
          <FloatingDeco variant="bow" size={28} position="right" delay={200} opacity={0.4} />
        </DecoRow>

        <Animated.View style={[styles.headerSection, { opacity: headerAnim }]}>
          <PixelText size={16} color="#FF4D94" style={styles.title}>
            STATS
          </PixelText>
          <View style={styles.subtitleRow}>
            <PixelText size={8} color="#FF85A1">✧ your journey ✧</PixelText>
          </View>
        </Animated.View>

        <Animated.View style={[styles.catWrap, { transform: [{ translateY: catBounce }] }]}>
          <View style={styles.catGlow}>
            <Image
              source={require('@/assets/images/cat-kitty-trans.gif')}
              style={styles.catImg}
              resizeMode="contain"
            />
          </View>
        </Animated.View>

        <Animated.View style={[styles.statsGrid, { opacity: cardsOpacity, transform: [{ translateY: cardsAnim }] }]}>
          <StatCard
            label="LEVELS DONE"
            value={`${completed.length}/25`}
            decoVariant="flower"
          />
          <StatCard
            label="TOTAL TIME"
            value={formatTime(progress?.totalTimeSeconds ?? 0)}
            decoVariant="music"
          />
          <StatCard
            label="ATTEMPTS"
            value={`${totalAttempts}`}
            decoVariant="heart"
          />
          <StatCard
            label="BEST TIME"
            value={bestLevel.time > 0 ? formatTime(bestLevel.time) : '--:--'}
            decoVariant="bow"
          />
          <StatCard
            label="PROGRESS"
            value={`${Math.round((completed.length / 25) * 100)}%`}
            decoVariant="flower"
          />
          <StatCard
            label="STATUS"
            value={progress?.completedAll ? 'QUEEN!' : `LVL ${progress?.currentLevel ?? 1}`}
            decoVariant="kitty"
          />
        </Animated.View>

        {progress?.completedAll && (
          <View style={styles.winBanner}>
            <Image
              source={require('@/assets/images/abf639783de504ff3a9c16ebc6278a57.png')}
              style={{ width: 28, height: 22 }}
              resizeMode="contain"
            />
            <PixelText size={9} color="#FF4D94" style={{ textAlign: 'center', lineHeight: 20 }}>
              u completed all 25 levels!!{'\n'}true queen energy ~
            </PixelText>
            <Image
              source={require('@/assets/images/abf639783de504ff3a9c16ebc6278a57.png')}
              style={{ width: 28, height: 22 }}
              resizeMode="contain"
            />
          </View>
        )}

        <DecoRow>
          <FloatingDeco variant="phone" size={36} position="left" delay={100} opacity={0.25} />
          <FloatingDeco variant="heart" size={24} position="center" delay={300} opacity={0.3} />
          <FloatingDeco variant="phone" size={36} position="right" delay={500} opacity={0.25} />
        </DecoRow>

        <PixelButton
          label="⚠ RESET ALL DATA ⚠"
          onPress={handleResetProgress}
          color="#FFB3C6"
          textColor="#CC2970"
          size={8}
          style={{ marginTop: 24, paddingHorizontal: 32, marginBottom: 16 }}
        />

        <PixelText size={7} color="#FFB3C6" style={styles.footer}>
          ✿ keep going bestie! =^.^= ✿
        </PixelText>
      </ScrollView>
    </SafeAreaView>
  );
}

const DECO_IMAGES: Record<string, any> = {
  flower: require('@/assets/images/87a5a7d65ad0cc1979c80b570e3e5834.png'),
  music: require('@/assets/images/6225382138d413af10675ec5deb2d7a2.png'),
  heart: require('@/assets/images/46e76919831133ccb3d19180793100ce.png'),
  bow: require('@/assets/images/abf639783de504ff3a9c16ebc6278a57.png'),
  kitty: require('@/assets/images/download.png'),
};

function StatCard({ label, value, decoVariant = 'flower' }: { label: string; value: string; decoVariant?: string }) {
  return (
    <View style={styles.card}>
      <Image
        source={DECO_IMAGES[decoVariant]}
        style={styles.cardDecoImg}
        resizeMode="contain"
      />
      <PixelText size={6} color="#FF85A1" style={{ marginBottom: 4, textAlign: 'center' }}>
        {label}
      </PixelText>
      <PixelText size={11} color="#FF4D94" style={{ textAlign: 'center' }}>
        {value}
      </PixelText>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF0F5' },
  scroll: { padding: 20, alignItems: 'center', paddingBottom: 50 },
  headerSection: { alignItems: 'center', marginBottom: 8 },
  title: { marginBottom: 4 },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  catWrap: { marginBottom: 16 },
  catGlow: {
    backgroundColor: '#FFE0EC',
    borderRadius: 60,
    padding: 10,
    shadowColor: '#FF85A1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  catImg: { width: 100, height: 100 },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    width: SCREEN_W - 40,
    marginBottom: 16,
  },
  card: {
    width: (SCREEN_W - 40 - 12) / 2,
    backgroundColor: '#FFF',
    borderWidth: 3,
    borderColor: '#FF85A1',
    borderBottomWidth: 6,
    borderRightWidth: 6,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#FF4D94',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  cardDecoImg: {
    width: 20,
    height: 20,
    marginBottom: 4,
    opacity: 0.5,
  },
  winBanner: {
    backgroundColor: '#FFE0EC',
    borderWidth: 3,
    borderColor: '#FF4D94',
    borderRadius: 8,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    padding: 16,
    marginBottom: 16,
    width: SCREEN_W - 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#FF4D94',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  footer: { marginTop: 8 },
});
