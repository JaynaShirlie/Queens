import { useEffect, useRef } from 'react';
import { Stack, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { Audio } from 'expo-av';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    PressStart2P_400Regular,
  });

  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    async function playBGM() {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
        });
        const { sound } = await Audio.Sound.createAsync(
          require('@/assets/sounds/bgm.wav'),
          { shouldPlay: true, isLooping: true, volume: 0.3 }
        );
        soundRef.current = sound;
      } catch (e) {
        console.warn('BGM failed to load:', e);
      }
    }
    playBGM();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#FFF0F5' },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="game"
          options={{
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="complete"
          options={{
            animation: 'fade',
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
