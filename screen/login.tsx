import React, { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const navigation = useNavigation();

  const handleLogin = async () => {
    const filePath = FileSystem.documentDirectory + "assets/user.json";
    console.log("File path:", filePath);

    try {
      const fileInfo = await FileSystem.getInfoAsync(filePath);
      if (!fileInfo.exists) {
        console.log("User data file does not exist");
        setLoginError(true);
        return;
      }

      const content = await FileSystem.readAsStringAsync(filePath);
      const users = JSON.parse(content);
      const user = users.find((u: any) => (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.password === password);

      if (user) {
        console.log("User found:", user);
        await AsyncStorage.setItem('user', JSON.stringify(user));
        console.log("User data stored in AsyncStorage");
        navigation.navigate('HomePage' as never);
      } else {
        console.log("Invalid credentials");
        setLoginError(true);
      }
    } catch (err) {
      console.error("Error reading user data file", err);
      setLoginError(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username or Email"
        value={usernameOrEmail}
        onChangeText={setUsernameOrEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {loginError && <Text style={styles.errorText}>Invalid credentials</Text>}
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('Register' as never)}>
        <Text style={styles.linkText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141A26',
    paddingTop: 60,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#5833A6',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  linkText: {
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: 20,
  },
});