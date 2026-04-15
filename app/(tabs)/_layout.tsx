// ============================================================
// ZenRadar — Tab Navigator Layout
// app/(tabs)/_layout.tsx
// ============================================================

import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet } from 'react-native';
import { Colors, Typography, Layout, Shadows } from '../../src/theme';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

interface TabConfig {
  name:       string;
  title:      string;
  icon:       IoniconName;
  iconActive: IoniconName;
}

const TABS: TabConfig[] = [
  { name: 'index',         title: 'Discover', icon: 'briefcase-outline',   iconActive: 'briefcase' },
  { name: 'saved',         title: 'Saved',    icon: 'bookmark-outline',    iconActive: 'bookmark' },
  { name: 'tracker',       title: 'Tracker',  icon: 'stats-chart-outline', iconActive: 'stats-chart' },
  { name: 'notifications', title: 'Alerts',   icon: 'notifications-outline', iconActive: 'notifications' },
  { name: 'settings',      title: 'Profile',  icon: 'person-outline',      iconActive: 'person' },
];

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor:   Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle:  styles.tabItem,
      }}
    >
      {TABS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? tab.iconActive : tab.icon}
                size={24}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: Layout.navHeight,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingBottom: Platform.OS === 'ios' ? Layout.safeAreaBottom / 2 : 8,
    paddingTop: 8,
    ...Shadows.nav,
  },
  tabLabel: {
    fontFamily: Typography.fontFamilyMedium,
    fontSize: 10,
    marginTop: 2,
  },
  tabItem: {
    minHeight: Layout.tapMin,
  },
});
