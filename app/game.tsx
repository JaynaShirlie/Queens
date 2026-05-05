import { useEffect, useRef, useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet, Animated, Easing, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, RotateCcw, Lightbulb } from 'lucide-react-native';
import PixelText from '@/components/PixelText';
import GameBoard from '@/components/GameBoard';
import TimerDisplay from '@/components/TimerDisplay';
import PixelButton from '@/components/PixelButton';
import FloatingDeco, { BackgroundClutter } from '@/components/FloatingDeco';
import { LEVELS, checkWin, getSolution } from '@/lib/levels';
import { loadProgress, completeLevelProgress, incrementAttempts, saveSessionTime } from '@/lib/progress';
import { Audio } from 'expo-av';

const SCREEN_W = Dimensions.get('window').width;

async function playSound(type: 'queen' | 'cross') {
  try {
    const source =
      type === 'queen'
        ? require('@/assets/sounds/pop.wav')
        : require('@/assets/sounds/click.wav');
    const { sound } = await Audio.Sound.createAsync(source);
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  } catch (e) {
    console.warn('Failed to play sound:', e);
  }
}

export default function GameScreen() {
  const { level: levelParam } = useLocalSearchParams<{ level: string }>();
  const levelId = parseInt(levelParam ?? '1', 10);
  const router = useRouter();

  const level = LEVELS.find((l) => l.id === levelId) ?? LEVELS[0];

  const [placed, setPlaced] = useState<{ row: number; col: number }[]>([]);
  const [marks, setMarks] = useState<{ row: number; col: number }[]>([]);
  const [errors, setErrors] = useState<Set<string>>(new Set());
  const [won, setWon] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [sessionId, setSessionId] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [hintCell, setHintCell] = useState<{ row: number; col: number } | null>(null);
  const [hintCooldown, setHintCooldown] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const winAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const boardEnter = useRef(new Animated.Value(0.9)).current;
  const boardOpacity = useRef(new Animated.Value(0)).current;

  const tapTimer = useRef<NodeJS.Timeout | null>(null);
  const latestState = useRef({ placed, marks });
  useEffect(() => {
    latestState.current = { placed, marks };
  }, [placed, marks]);

  useEffect(() => {
    setPlaced([]);
    setMarks([]);
    setErrors(new Set());
    setWon(false);
    setSeconds(0);
    setAttempts(0);
    setShowHint(false);
    setHintCell(null);
    setHintCooldown(0);
    winAnim.setValue(0);

    boardEnter.setValue(0.9);
    boardOpacity.setValue(0);
    Animated.parallel([
      Animated.spring(boardEnter, { toValue: 1, tension: 80, friction: 10, useNativeDriver: true }),
      Animated.timing(boardOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
  }, [levelId, winAnim, boardEnter, boardOpacity]);

  useEffect(() => {
    loadProgress().then((p) => {
      setSessionId(p.sessionId);
      setTotalSeconds(p.totalTimeSeconds);
      setIsCompleted(p.levelData[levelId]?.completed ?? false);
    });
  }, [levelId]);

  useEffect(() => {
    if (!won) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
        setHintCooldown((c) => Math.max(0, c - 1));
      }, 1000);
      totalIntervalRef.current = setInterval(() => setTotalSeconds((s) => s + 1), 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (totalIntervalRef.current) clearInterval(totalIntervalRef.current);
    };
  }, [won]);

  useEffect(() => {
    if (sessionId) {
      const save = setInterval(() => {
        if (!won) saveSessionTime(sessionId, totalSeconds);
      }, 5000);
      return () => clearInterval(save);
    }
  }, [sessionId, totalSeconds, won]);

  const executeTap = useCallback(
    (row: number, col: number, isDouble: boolean) => {
      const { placed: currentPlaced, marks: currentMarks } = latestState.current;
      const qIndex = currentPlaced.findIndex((q) => q.row === row && q.col === col);
      const mIndex = currentMarks.findIndex((m) => m.row === row && m.col === col);

      let newPlaced = [...currentPlaced];
      let newMarks = [...currentMarks];

      if (isDouble) {
        if (qIndex >= 0) {
          newPlaced.splice(qIndex, 1);
        } else {
          if (mIndex >= 0) newMarks.splice(mIndex, 1);
          newPlaced.push({ row, col });
          playSound('queen');
        }
      } else {
        if (qIndex >= 0) {
          newPlaced.splice(qIndex, 1);
        } else if (mIndex >= 0) {
          newMarks.splice(mIndex, 1);
        } else {
          newMarks.push({ row, col });
          playSound('cross');
        }
      }

      setPlaced(newPlaced);
      setMarks(newMarks);
      setHintCell(null);

      const result = checkWin(newPlaced, level);
      if (result.errors.size > 0) {
        setErrors(result.errors);
        Animated.sequence([
          Animated.timing(shakeAnim, { toValue: 6, duration: 60, useNativeDriver: true }),
          Animated.timing(shakeAnim, { toValue: -6, duration: 60, useNativeDriver: true }),
          Animated.timing(shakeAnim, { toValue: 4, duration: 60, useNativeDriver: true }),
          Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
        ]).start();
      } else {
        setErrors(new Set());
      }

      if (result.valid) {
        setWon(true);
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (totalIntervalRef.current) clearInterval(totalIntervalRef.current);

        Animated.spring(winAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 7,
        }).start();

        const newAttempts = attempts + 1;
        const nextLevel = Math.min(levelId + 1, 25);
        const completedAll = levelId === 25;
        if (sessionId) {
          completeLevelProgress(sessionId, levelId, seconds, newAttempts, nextLevel, completedAll);
          saveSessionTime(sessionId, totalSeconds);
        }

        setTimeout(() => {
          if (levelId === 25) {
            router.replace('/complete');
          } else {
            router.replace({ pathname: '/game', params: { level: nextLevel } });
          }
        }, 2200);
      }
    },
    [level, levelId, seconds, totalSeconds, sessionId, attempts, router, winAnim, shakeAnim]
  );

  const handleCellPress = useCallback(
    (row: number, col: number) => {
      if (won) return;
      if (tapTimer.current) {
        clearTimeout(tapTimer.current);
        tapTimer.current = null;
        executeTap(row, col, true);
      } else {
        tapTimer.current = setTimeout(() => {
          tapTimer.current = null;
          executeTap(row, col, false);
        }, 220);
      }
    },
    [won, executeTap]
  );

  const handleReset = () => {
    setPlaced([]);
    setMarks([]);
    setErrors(new Set());
    setSeconds(0);
    setAttempts((a) => a + 1);
    setHintCell(null);
    if (sessionId) incrementAttempts(sessionId, levelId);
  };

  const handleHint = () => {
    if (hintCooldown > 0) return;
    const solution = getSolution(level);
    if (!solution) return;
    for (const cell of solution) {
      const alreadyPlaced = placed.find((q) => q.row === cell.row && q.col === cell.col);
      if (!alreadyPlaced) {
        setHintCell(cell);
        setShowHint(true);
        setHintCooldown(10);
        setTimeout(() => setShowHint(false), 2000);
        return;
      }
    }
  };

  const winScale = winAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.8, 1.15, 1] });

  const hintPlaced = hintCell ? [...placed, hintCell] : placed;
  const hintErrors = hintCell ? new Set<string>() : errors;

  return (
    <SafeAreaView style={styles.safe}>
      <BackgroundClutter />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
            <ArrowLeft size={20} color="#FF4D94" strokeWidth={2} />
          </TouchableOpacity>
          <View style={styles.levelBadge}>
            <PixelText size={7} color="#FF85A1">
              LEVEL
            </PixelText>
            <PixelText size={20} color="#FF4D94">
              {levelId}
            </PixelText>
          </View>
          <View style={styles.topRight}>
            <TouchableOpacity onPress={handleHint} style={styles.iconBtn}>
              <Lightbulb size={20} color="#FF6B9D" strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleReset} style={styles.iconBtn}>
              <RotateCcw size={20} color="#FF4D94" strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.timers}>
          <TimerDisplay seconds={seconds} label="LEVEL" />
          <View style={styles.timerDivider}>
            <Image
              source={require('@/assets/images/87a5a7d65ad0cc1979c80b570e3e5834.png')}
              style={{ width: 22, height: 22, opacity: 0.5 }}
              resizeMode="contain"
            />
          </View>
          <TimerDisplay seconds={totalSeconds} label="TOTAL" />
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoItem}>
            <PixelText size={6} color="#FF85A1">GRID</PixelText>
            <PixelText size={8} color="#FF4D94">{level.size}x{level.size}</PixelText>
          </View>
          <View style={styles.infoDot} />
          <View style={styles.infoItem}>
            <PixelText size={6} color="#FF85A1">QUEENS</PixelText>
            <PixelText size={8} color="#FF4D94">{placed.length}/{level.size}</PixelText>
          </View>
          <View style={styles.infoDot} />
          <View style={styles.infoItem}>
            <PixelText size={6} color="#FF85A1">TRIES</PixelText>
            <PixelText size={8} color="#FF4D94">{attempts}</PixelText>
          </View>
        </View>

        <Animated.View style={{
          transform: [{ translateX: shakeAnim }, { scale: boardEnter }],
          opacity: boardOpacity,
        }}>
          <GameBoard
            level={level}
            placed={showHint ? hintPlaced : placed}
            marks={marks}
            errors={hintErrors}
            onCellPress={handleCellPress}
          />
        </Animated.View>

        {won && (
          <Animated.View style={[styles.winBanner, { transform: [{ scale: winScale }] }]}>
            <Image
              source={require('@/assets/images/abf639783de504ff3a9c16ebc6278a57.png')}
              style={{ width: 30, height: 22, marginBottom: 6 }}
              resizeMode="contain"
            />
            <PixelText size={12} color="#FF4D94" style={{ textAlign: 'center' }}>
              ✧ you solved it!! ✧
            </PixelText>
            <PixelText size={8} color="#FF6B9D" style={{ marginTop: 8 }}>
              time: {seconds}s
            </PixelText>
            <PixelText size={8} color="#FF85A1" style={{ marginTop: 4 }}>
              {levelId < 25 ? `loading lvl ${levelId + 1}...` : '♛ all done!! :3 ♛'}
            </PixelText>
          </Animated.View>
        )}

        {showHint && hintCell && (
          <View style={styles.hintBanner}>
            <PixelText size={8} color="#FF4D94">
              💡 hint: try row {hintCell.row + 1}, col {hintCell.col + 1} !
            </PixelText>
          </View>
        )}

        <View style={styles.controls}>
          <PixelButton label="✿ RESET" onPress={handleReset} color="#FF85A1" size={8} style={{ borderRadius: 6, flex: 1 }} />
          <PixelButton
            label={hintCooldown > 0 ? `WAIT ${hintCooldown}s` : "💡 HINT"}
            onPress={handleHint}
            color={hintCooldown > 0 ? "#E0C5D5" : "#FFB3C6"}
            textColor={hintCooldown > 0 ? "#FF85A1" : "#FF4D94"}
            size={8}
            style={{ borderRadius: 6, flex: 1 }}
            disabled={hintCooldown > 0}
          />
        </View>

        <View style={styles.levelNav}>
          {levelId > 1 && (
            <TouchableOpacity
              onPress={() => router.replace({ pathname: '/game', params: { level: levelId - 1 } })}
              style={styles.navBtn}
            >
              <PixelText size={7} color="#FF85A1">
                {'◄ prev'}
              </PixelText>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/levels')}
            style={[styles.navBtn, styles.navBtnPrimary]}
          >
            <PixelText size={7} color="#FF4D94">
              all levels
            </PixelText>
          </TouchableOpacity>
          {levelId < 25 && (
            <TouchableOpacity
              onPress={() => router.replace({ pathname: '/game', params: { level: levelId + 1 } })}
              style={[styles.navBtn, { opacity: (isCompleted || won) ? 1 : 0.5 }]}
              disabled={!(isCompleted || won)}
            >
              <PixelText size={7} color={(isCompleted || won) ? "#FF85A1" : "#DDA0B5"}>
                {isCompleted || won ? 'next ►' : 'lock ►'}
              </PixelText>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.bottomDeco}>
          <FloatingDeco variant="flower" size={28} position="left" delay={0} opacity={0.3} />
          <FloatingDeco variant="heart" size={24} position="right" delay={200} opacity={0.3} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF0F5' },
  scroll: { padding: 16, alignItems: 'center', paddingBottom: 40 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
  },
  iconBtn: {
    padding: 10,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#FFB3C6',
    borderRadius: 8,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    shadowColor: '#FF85A1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  levelBadge: { alignItems: 'center' },
  topRight: { flexDirection: 'row', gap: 8 },
  timers: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  timerDivider: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCard: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#FFB3C6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    shadowColor: '#FF85A1',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoItem: { alignItems: 'center', gap: 2 },
  infoDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFB3C6',
  },
  winBanner: {
    marginTop: 16,
    backgroundColor: '#FFF',
    borderWidth: 4,
    borderColor: '#FF4D94',
    borderBottomWidth: 6,
    borderRightWidth: 6,
    borderRadius: 10,
    padding: 22,
    alignItems: 'center',
    width: SCREEN_W - 40,
    shadowColor: '#FF4D94',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  hintBanner: {
    marginTop: 12,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#FF85A1',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  levelNav: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  navBtn: {
    padding: 10,
    borderWidth: 2,
    borderColor: '#FFB3C6',
    backgroundColor: '#FFF',
    borderRadius: 6,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  navBtnPrimary: {
    borderColor: '#FF85A1',
    backgroundColor: '#FFE0EC',
  },
  bottomDeco: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: SCREEN_W - 60,
    marginTop: 12,
  },
});
