import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PixelText from '@/components/PixelText';
import PixelButton from '@/components/PixelButton';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!', headerShown: false }} />
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <Image
            source={require('@/assets/images/Cat Meme Sticker for iOS & Android _ GIPHY _ Pixel….png')}
            style={styles.catImg}
            resizeMode="contain"
          />
          <PixelText size={14} color="#FF4D94" style={styles.title}>
            oopsie!
          </PixelText>
          <PixelText size={8} color="#FF85A1" style={styles.subtitle}>
            this page doesn't exist ~
          </PixelText>
          <View style={styles.card}>
            <PixelText size={7} color="#FF6B9D" style={{ textAlign: 'center' }}>
              the queen got lost...{'\n'}let's go back home!
            </PixelText>
          </View>
          <Link href="/" asChild>
            <PixelButton
              label="✿ GO HOME ✿"
              onPress={() => {}}
              color="#FF4D94"
              size={10}
              style={styles.btn}
            />
          </Link>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF0F5' },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  catImg: {
    width: 120,
    height: 120,
    marginBottom: 20,
    opacity: 0.8,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#FFB3C6',
    borderRadius: 8,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    padding: 16,
    marginBottom: 24,
  },
  btn: {
    width: 200,
    borderRadius: 8,
  },
});
