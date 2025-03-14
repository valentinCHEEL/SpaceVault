import React, { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [fileContent, setFileContent] = useState("");

  const navigation = useNavigation();

  const handleRegister = async () => {
    // Handle registration logic here
    if (password !== confirmPassword) {
      setPasswordError(true);
      console.log("Passwords do not match");
      return;
    }
    setPasswordError(false);
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);

    // Save user data to user.json
    const userData = { username, email, password };
    const directoryPath = FileSystem.documentDirectory + "assets";
    const filePath = directoryPath + "/user.json";
    console.log("File path:", filePath);

    try {
      // Ensure the directory exists
      const dirInfo = await FileSystem.getInfoAsync(directoryPath);
      if (!dirInfo.exists) {
        console.log("Directory does not exist, creating directory");
        await FileSystem.makeDirectoryAsync(directoryPath, { intermediates: true });
      }

      console.log("Checking if file exists:", filePath);
      const fileInfo = await FileSystem.getInfoAsync(filePath);
      console.log("File info:", fileInfo);

      if (fileInfo.exists) {
        // File exists, read and update it
        console.log("File exists, reading content");
        const content = await FileSystem.readAsStringAsync(filePath);
        console.log("File content:", content);
        const data = JSON.parse(content);
        data.push(userData);
        console.log("Writing updated data to file");
        await FileSystem.writeAsStringAsync(filePath, JSON.stringify(data, null, 2));
      } else {
        // File does not exist, create it
        console.log("File does not exist, creating new file");
        await FileSystem.writeAsStringAsync(filePath, JSON.stringify([userData], null, 2));
      }
      console.log("User data saved successfully");

      // Store user data in AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      console.log("User data stored in AsyncStorage");

      // Navigate to HomePage
      navigation.navigate('HomePage' as never);
    } catch (err) {
      console.error("Error writing to file", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Text>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Text>Confirm Password</Text>
      <TextInput
        style={[styles.input, passwordError && styles.errorInput]}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
      <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
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
  errorInput: {
    borderColor: 'red',
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