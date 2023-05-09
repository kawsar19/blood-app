import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Alert, Button, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './components/HomeScreen';
import SettingsScreen from './components/SettingsScreen';
import AuthScreen from './components/AuthScreen';
import DonorScreen from './components/DonorScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setLoggedIn(true);
        setToken(storedToken);
      }
      setLoading(false);
    };

    checkLoginStatus();
  }, []);

  const handleLogin = (token) => {
    setLoggedIn(true);
    setToken(token);
    AsyncStorage.setItem('token', token);
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: async () => {
          setLoggedIn(false);
          setToken('');
          await AsyncStorage.removeItem('token');
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {loggedIn ? (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} 
          options={{
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="home" color={color} size={size} />
      ),
    }}
          />
          <Tab.Screen name="Add donor" component={SettingsScreen} 
          options={{
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="add" color={color} size={size} />
      ),
    }}
          />
          <Tab.Screen name="Donor" component={DonorScreen} 
          options={{
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="person" color={color} size={size} />
      ),
    }}
          />
<Tab.Screen
    name="Logout"
    component={AuthScreen}
    listeners={({ navigation }) => ({
      tabPress: (e) => {
        e.preventDefault(); // Prevents the default tab navigation
        handleLogout(navigation); // Call your logout function here with the navigation object
      },
    })}
    options={{
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="log-out" color={color} size={size} />
      ),
    }}
  />
        </Tab.Navigator>
      ) : (
        <AuthScreen onLogin={handleLogin} />
      )}
    </NavigationContainer>
  );
};

export default App;
