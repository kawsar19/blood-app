import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('https://note-app-kawsar19.vercel.app/api/login-volunteer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        Alert.alert('Login Success', 'You have successfully logged in.');
        console.log(data)
        const data = await response.json();
        const user = data.user; // Assuming the API response contains a 'user' object
        const token = data.token; // Assuming the API response contains a 'token' field

        // Store the token and user information locally
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('user', JSON.stringify(user));

        // Store the token in your preferred storage mechanism (e.g., AsyncStorage, Redux store)
        // For simplicity, this example uses useState to store the token in memory
        onLogin(token); // Notify the parent component that the user has logged in and pass the token
        
        // Show success alert
        
        setLoginStatus(true); 
      } else {
        // Handle the login error here
        // You can display an error message or perform other actions based on the API response
        // Show error alert
        Alert.alert('Login Failed', 'Invalid email or password.');
        console.log('failed')
        setLoginStatus(false); 
      }
    } catch (error) {
      // Handle network or other errors here
      console.log('Error occurred:', error);
      // Show error alert
      Alert.alert('Login Error', 'An error occurred during login. Please try again later.');
      setLoginStatus(false); 
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ width: 200, height: 40, borderWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={{ width: 200, height: 40, borderWidth: 1 }}
        secureTextEntry
      />
      <Button title="Log in" onPress={handleLogin} />
      {loginStatus && <Text>Login Successful!</Text>}
    </View>
  );
};

export default AuthScreen;
