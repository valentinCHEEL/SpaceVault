import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../screen/homePage';
import SearchPage from '../screen/searchPage';
import { Ionicons } from '@expo/vector-icons'; // ou react-native-vector-icons/Ionicons si tu l'utilises côté RN

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
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#5833A6',
        tabBarInactiveTintColor: 'gray',
        headerShown: false, // si tu veux enlever le header
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Search" component={SearchPage} />
    </Tab.Navigator>
  );
}
