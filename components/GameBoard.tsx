import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LevelConfig, REGION_COLORS } from '@/lib/levels';
import PixelText from './PixelText';

interface GameBoardProps {
  level: LevelConfig;
  placed: { row: number; col: number }[];
  marks: { row: number; col: number }[];
  errors: Set<string>;
  onCellPress: (row: number, col: number) => void;
}

const SCREEN_W = Dimensions.get('window').width;

export default function GameBoard({ level, placed, marks, errors, onCellPress }: GameBoardProps) {
  const boardPad = 20;
  const maxSize = Math.min(SCREEN_W - boardPad * 2, 400);
  const cellSize = Math.floor(maxSize / level.size);
  const boardSize = cellSize * level.size;

  const placedSet = new Set(placed.map((q) => `${q.row},${q.col}`));
  const marksSet = new Set(marks.map((m) => `${m.row},${m.col}`));

  return (
    <View style={[styles.boardOuter]}>
      <View style={[styles.board, { width: boardSize, height: boardSize }]}>
        {Array.from({ length: level.size }, (_, row) => (
          <View key={row} style={styles.row}>
            {Array.from({ length: level.size }, (_, col) => {
              const key = `${row},${col}`;
              const region = level.colorRegions[row][col];
              const hasQueen = placedSet.has(key);
              const hasMark = marksSet.has(key);
              const isError = errors.has(key);
              const baseColor = REGION_COLORS[region % REGION_COLORS.length];

              const topSame = row > 0 && level.colorRegions[row - 1][col] === region;
              const bottomSame = row < level.size - 1 && level.colorRegions[row + 1][col] === region;
              const leftSame = col > 0 && level.colorRegions[row][col - 1] === region;
              const rightSame = col < level.size - 1 && level.colorRegions[row][col + 1] === region;

              return (
                <TouchableOpacity
                  key={col}
                  activeOpacity={0.7}
                  onPress={() => onCellPress(row, col)}
                  style={[
                    styles.cell,
                    {
                      width: cellSize,
                      height: cellSize,
                      backgroundColor: isError ? '#FF6B8A' : baseColor,
                      borderTopWidth: topSame ? 0.5 : 2,
                      borderBottomWidth: bottomSame ? 0.5 : 2,
                      borderLeftWidth: leftSame ? 0.5 : 2,
                      borderRightWidth: rightSame ? 0.5 : 2,
                      borderTopColor: topSame ? 'rgba(255,255,255,0.3)' : (isError ? '#CC0040' : darkenColor(baseColor)),
                      borderBottomColor: bottomSame ? 'rgba(255,255,255,0.3)' : (isError ? '#CC0040' : darkenColor(baseColor)),
                      borderLeftColor: leftSame ? 'rgba(255,255,255,0.3)' : (isError ? '#CC0040' : darkenColor(baseColor)),
                      borderRightColor: rightSame ? 'rgba(255,255,255,0.3)' : (isError ? '#CC0040' : darkenColor(baseColor)),
                    },
                  ]}
                >
                  {hasQueen && (
                    <View style={[
                      styles.queenContainer,
                      {
                        backgroundColor: isError ? '#FF3366' : 'rgba(255,255,255,0.6)',
                        width: cellSize * 0.65,
                        height: cellSize * 0.65,
                        borderRadius: cellSize * 0.33,
                      },
                    ]}>
                      <PixelText
                        size={cellSize * 0.35}
                        color={isError ? '#FFF0F5' : '#8B0040'}
                        style={styles.queenIcon}
                      >
                        {'\u265B'}
                      </PixelText>
                    </View>
                  )}
                  {!hasQueen && hasMark && (
                    <View style={styles.markContainer}>
                      <PixelText size={cellSize * 0.4} color="rgba(255, 77, 148, 0.4)">
                        {'\u2715'}
                      </PixelText>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

function darkenColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${Math.max(0, r - 40)},${Math.max(0, g - 40)},${Math.max(0, b - 40)})`;
}

const styles = StyleSheet.create({
  boardOuter: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 6,
    shadowColor: '#FF4D94',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  board: {
    borderWidth: 3,
    borderColor: '#FF4D94',
    borderRadius: 6,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  queenContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF4D94',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  queenIcon: {
    textAlign: 'center',
  },
  markContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
