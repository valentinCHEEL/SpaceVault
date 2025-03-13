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
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: "100%",
    padding: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  errorText: {
    color: "red",
    marginBottom: 16,
  },
  linkText: {
    color: "blue",
    marginTop: 16,
  },
});