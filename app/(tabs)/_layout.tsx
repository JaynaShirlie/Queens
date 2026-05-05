import { Tabs } from 'expo-router';
import { Crown, LayoutGrid, Star } from 'lucide-react-native';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFF5F9',
          borderTopWidth: 3,
          borderTopColor: '#FFB3C6',
          height: Platform.OS === 'ios' ? 84 : 68,
          paddingBottom: Platform.OS === 'ios' ? 24 : 10,
          paddingTop: 8,
          shadowColor: '#FF85A1',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: 10,
        },
        tabBarActiveTintColor: '#FF4D94',
        tabBarInactiveTintColor: '#D4A5C9',
        tabBarLabelStyle: {
          fontFamily: 'PressStart2P_400Regular',
          fontSize: 7,
          marginTop: 3,
        },
        tabBarItemStyle: {
          paddingVertical: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '♛ HOME',
          tabBarIcon: ({ size, color }) => <Crown size={size} color={color} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="levels"
        options={{
          title: '✿ LEVELS',
          tabBarIcon: ({ size, color }) => <LayoutGrid size={size} color={color} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: '★ STATS',
          tabBarIcon: ({ size, color }) => <Star size={size} color={color} strokeWidth={2} />,
        }}
      />
    </Tabs>
  );
}
