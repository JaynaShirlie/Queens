import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const SESSION_KEY = 'queens_progress_v1';

export interface GameProgress {
  sessionId: string;
  currentLevel: number;
  totalTimeSeconds: number;
  completedAll: boolean;
  levelData: Record<number, { completed: boolean; bestTime: number; attempts: number }>;
}

const DEFAULT_PROGRESS = (): GameProgress => ({
  sessionId: `local_${Date.now()}`,
  currentLevel: 1,
  totalTimeSeconds: 0,
  completedAll: false,
  levelData: {},
});

let memoryProgress: GameProgress | null = null;

export async function loadProgress(): Promise<GameProgress> {
  if (memoryProgress) return memoryProgress;

  try {
    const jsonValue = await AsyncStorage.getItem(SESSION_KEY);
    if (jsonValue != null) {
      memoryProgress = JSON.parse(jsonValue) as GameProgress;
      return memoryProgress;
    }
  } catch (e) {
    console.warn('[Queens] Failed to load progress from AsyncStorage:', e);
  }

  const newProgress = DEFAULT_PROGRESS();
  memoryProgress = newProgress;
  await saveProgressToStorage(newProgress);
  return newProgress;
}

async function saveProgressToStorage(progress: GameProgress): Promise<void> {
  try {
    const jsonValue = JSON.stringify(progress);
    await AsyncStorage.setItem(SESSION_KEY, jsonValue);
  } catch (e) {
    console.warn('[Queens] Failed to save progress to AsyncStorage:', e);
  }
}

export async function saveSessionTime(sessionId: string, totalSeconds: number): Promise<void> {
  if (!memoryProgress) await loadProgress();
  if (memoryProgress) {
    memoryProgress.totalTimeSeconds = totalSeconds;
    await saveProgressToStorage(memoryProgress);
  }
}

export async function completeLevelProgress(
  sessionId: string,
  level: number,
  timeSeconds: number,
  attempts: number,
  nextLevel: number,
  completedAll: boolean,
): Promise<void> {
  if (!memoryProgress) await loadProgress();
  
  if (memoryProgress) {
    const existing = memoryProgress.levelData[level];
    memoryProgress.levelData[level] = {
      completed: true,
      bestTime: existing
        ? (existing.bestTime === 0 ? timeSeconds : Math.min(existing.bestTime, timeSeconds))
        : timeSeconds,
      attempts: (existing?.attempts ?? 0) + attempts,
    };
    memoryProgress.currentLevel = nextLevel;
    memoryProgress.completedAll = completedAll;
    
    await saveProgressToStorage(memoryProgress);
  }
}

export async function incrementAttempts(sessionId: string, level: number): Promise<void> {
  if (!memoryProgress) await loadProgress();

  if (memoryProgress) {
    const existing = memoryProgress.levelData[level];
    if (existing) {
      existing.attempts += 1;
    } else {
      memoryProgress.levelData[level] = { completed: false, bestTime: 0, attempts: 1 };
    }
    await saveProgressToStorage(memoryProgress);
  }
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export async function clearProgress(): Promise<void> {
  try {
    await AsyncStorage.removeItem(SESSION_KEY);
    memoryProgress = null;
  } catch (e) {
    console.warn('[Queens] Failed to clear progress:', e);
  }
}
