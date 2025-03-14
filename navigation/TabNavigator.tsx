import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../screen/homePage';
import SearchPage from '../screen/searchPage';
import CameraPage from '../screen/cameraPage';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string = '';
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Search') {
            iconName = 'search-outline';
          } else if (route.name === 'Camera') {
            iconName = 'camera-outline'; // Icône pour la caméra
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#5833A6',
        tabBarInactiveTintColor: 'gray',
        headerShown: false, // Pour cacher les headers dans la tabBar
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Search" component={SearchPage} />
      <Tab.Screen name="Camera" component={CameraPage} />
    </Tab.Navigator>
  );
}
