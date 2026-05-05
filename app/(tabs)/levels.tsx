import { useCallback, useState, useEffect, useRef } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Animated, Easing, Image } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Lock, CircleCheck as CheckCircle, Play } from 'lucide-react-native';
import PixelText from '@/components/PixelText';
import FloatingDeco, { DecoRow, BackgroundClutter } from '@/components/FloatingDeco';
import { loadProgress, formatTime, GameProgress } from '@/lib/progress';

const SCREEN_W = Dimensions.get('window').width;
const COLS = 5;
const GAP = 10;
const CELL = (SCREEN_W - 44 - (COLS - 1) * GAP) / COLS;

export default function LevelsScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState<GameProgress | null>(null);
  const headerAnim = useRef(new Animated.Value(0)).current;
  const gridAnim = useRef(new Animated.Value(30)).current;
  const gridOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(gridAnim, { toValue: 0, duration: 600, delay: 200, easing: Easing.out(Easing.back(1)), useNativeDriver: true }),
      Animated.timing(gridOpacity, { toValue: 1, duration: 400, delay: 200, useNativeDriver: true }),
    ]).start();
  }, [headerAnim, gridAnim, gridOpacity]);

  useFocusEffect(
    useCallback(() => {
      loadProgress().then(setProgress);
    }, []),
  );

  const currentLevel = progress?.currentLevel ?? 1;
  const completedCount = Object.values(progress?.levelData ?? {}).filter((l) => l.completed).length;

  return (
    <SafeAreaView style={styles.safe}>
      <BackgroundClutter />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <DecoRow>
          <FloatingDeco variant="bow" size={30} position="left" delay={0} opacity={0.4} />
          <FloatingDeco variant="flower" size={24} position="right" delay={200} opacity={0.45} />
        </DecoRow>

        <Animated.View style={[styles.headerSection, { opacity: headerAnim }]}>
          <PixelText size={16} color="#FF4D94" style={styles.title}>
            LEVELS
          </PixelText>
          <View style={styles.subtitleRow}>
            <Image
              source={require('@/assets/images/87a5a7d65ad0cc1979c80b570e3e5834.png')}
              style={{ width: 18, height: 18 }}
              resizeMode="contain"
            />
            <PixelText size={8} color="#FF85A1">
              {completedCount} / 25 done
            </PixelText>
            <Image
              source={require('@/assets/images/87a5a7d65ad0cc1979c80b570e3e5834.png')}
              style={{ width: 18, height: 18 }}
              resizeMode="contain"
            />
          </View>
        </Animated.View>

        <Animated.View style={{ opacity: gridOpacity, transform: [{ translateY: gridAnim }] }}>
          <View style={styles.grid}>
            {Array.from({ length: 25 }, (_, i) => {
              const lvl = i + 1;
              const isCompleted = progress?.levelData[lvl]?.completed ?? false;
              const isUnlocked = lvl === 1 || isCompleted || (progress?.levelData[lvl - 1]?.completed ?? false);
              const isCurrent = lvl === currentLevel;
              const bestTime = progress?.levelData[lvl]?.bestTime ?? 0;

              return (
                <TouchableOpacity
                  key={lvl}
                  onPress={() =>
                    isUnlocked &&
                    router.push({ pathname: '/game', params: { level: lvl } })
                  }
                  activeOpacity={isUnlocked ? 0.7 : 1}
                  style={[
                    styles.cell,
                    isCompleted && styles.cellDone,
                    isCurrent && !isCompleted && styles.cellCurrent,
                    !isUnlocked && styles.cellLocked,
                  ]}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle size={16} color="#CC2970" strokeWidth={2} />
                      <PixelText size={8} color="#CC2970">
                        {lvl}
                      </PixelText>
                      {bestTime > 0 && (
                        <PixelText size={5} color="#FF4D94">
                          {formatTime(bestTime)}
                        </PixelText>
                      )}
                    </>
                  ) : isUnlocked ? (
                    <>
                      <Play size={14} color="#FF4D94" strokeWidth={2} />
                      <PixelText size={8} color="#FF4D94">
                        {lvl}
                      </PixelText>
                    </>
                  ) : (
                    <>
                      <Lock size={14} color="#D4A5C9" strokeWidth={2} />
                      <PixelText size={8} color="#D4A5C9">
                        {lvl}
                      </PixelText>
                    </>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </Animated.View>

        <View style={styles.legendCard}>
          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: '#FF4D94' }]} />
            <PixelText size={7} color="#FF6B9D">
              done
            </PixelText>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: '#FFD6E7' }]} />
            <PixelText size={7} color="#FF6B9D">
              unlocked
            </PixelText>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: '#F0E0E8' }]} />
            <PixelText size={7} color="#FF6B9D">
              locked
            </PixelText>
          </View>
        </View>

        <DecoRow>
          <FloatingDeco variant="heart" size={28} position="left" delay={100} opacity={0.3} />
          <FloatingDeco variant="kitty" size={46} position="center" delay={300} opacity={0.2} />
          <FloatingDeco variant="heart" size={28} position="right" delay={500} opacity={0.3} />
        </DecoRow>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF0F5' },
  scroll: { padding: 20, alignItems: 'center', paddingBottom: 50 },
  headerSection: { alignItems: 'center', marginBottom: 16 },
  title: { marginBottom: 8 },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
    justifyContent: 'flex-start',
    width: SCREEN_W - 40,
    marginBottom: 16,
  },
  cell: {
    width: CELL,
    height: CELL,
    backgroundColor: '#FFD6E7',
    borderWidth: 3,
    borderColor: '#FF85A1',
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    shadowColor: '#FF85A1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  cellDone: {
    backgroundColor: '#FFB3C6',
    borderColor: '#FF4D94',
  },
  cellCurrent: {
    backgroundColor: '#FF85A1',
    borderColor: '#FF4D94',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  cellLocked: {
    backgroundColor: '#F5E8EF',
    borderColor: '#E0C5D5',
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  legendCard: {
    flexDirection: 'row',
    gap: 18,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#FFB3C6',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#FF4D94',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 12,
    height: 12,
    borderWidth: 2,
    borderColor: '#FF4D94',
    borderRadius: 3,
  },
});
