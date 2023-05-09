import React, { useState } from 'react';
import { TextInput, Button } from 'react-native';
import { Alert } from 'react-native';


const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePress = () => {
  // Call the onLogin function passed from AuthScreen
  const message = `Email: ${email}\nPassword: ${password}`;
  Alert.alert('Login Details', message);

  onLogin(email, password);
};


  return (
    <>
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
      <Button title="Log in" onPress={handlePress} />
    </>
  );
};

export default LoginForm;
