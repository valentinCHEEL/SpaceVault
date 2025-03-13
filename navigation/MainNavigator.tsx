import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import HomePage from '../screen/homePage';
import Register from '../screen/register';
import Login from '../screen/login';
import { View, ActivityIndicator } from 'react-native';

const Stack = createStackNavigator();

export default function MainNavigator() {
  const [initialRoute, setInitialRoute] = useState<'HomePage' | 'Register' | 'Login' | null>(null);

  useEffect(() => {
    const checkUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        const closeCounter = await AsyncStorage.getItem('closeCounter');
        let counter = closeCounter ? parseInt(closeCounter) : 0;

        console.log('User data from AsyncStorage:', userData);
        console.log('App close counter:', counter);

        const filePath = FileSystem.documentDirectory + "assets/user.json";
        const fileInfo = await FileSystem.getInfoAsync(filePath);
        if (fileInfo.exists) {
          const content = await FileSystem.readAsStringAsync(filePath);
          console.log('Contents of user.json:', content);
        } else {
          console.log('user.json file does not exist');
        }

        if (counter >= 3) {
          await AsyncStorage.clear();
          console.log('AsyncStorage cleared after 3 app closes');
          counter = 0;
        } else {
          counter += 1;
        }

        await AsyncStorage.setItem('closeCounter', counter.toString());

        if (userData) {
          setInitialRoute('HomePage');
        } else {
          setInitialRoute('Login');
        }
      } catch (error) {
        console.error('Error checking user data in AsyncStorage', error);
        setInitialRoute('Login');
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
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
  );
}