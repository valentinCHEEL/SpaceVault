// filepath: c:\Users\arnau\OneDrive\Documents\Native\SpaceVault\navigation\MainNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../screen/homePage';
import Register from '../screen/register';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const Stack = createStackNavigator();

export default function MainNavigator() {
    const [initialRoute, setInitialRoute] = useState<'HomePage' | 'Register' | null>(null);

  useEffect(() => {
    const checkUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        console.log('User data from AsyncStorage:', userData); // Log the user data
        if (userData) {
          setInitialRoute('HomePage');
        } else {
          setInitialRoute('Register');
        }
      } catch (error) {
        console.error('Error checking user data in AsyncStorage', error);
        setInitialRoute('Register');
      }
    };

    checkUserData();
  }, []);

  if (initialRoute === null) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  return (
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
  );
}