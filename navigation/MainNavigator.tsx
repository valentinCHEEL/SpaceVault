import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Register from '../screen/register';
import TabNavigator from './TabNavigator';  // TabNavigator qui contient la barre
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default function MainNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkUserData = async () => {
      const userData = await AsyncStorage.getItem('user');
      console.log('User data from AsyncStorage:', userData);
      if (userData) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkUserData();
  }, []);

  if (isLoggedIn === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return isLoggedIn ? (
    <TabNavigator /> // Barre en bas (Home + SearchPage)
  ) : (
    <Stack.Navigator>
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}
