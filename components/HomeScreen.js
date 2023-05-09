import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the user information from AsyncStorage
    const fetchUserInfo = async () => {
      try {
        const userJSON = await AsyncStorage.getItem('user');

        if (userJSON) {
          const user = JSON.parse(userJSON);
          setUser(user);
        }
      } catch (error) {
        console.log('Error retrieving user information:', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to the Home Screen!</Text>
      {user && (
        <View>
          <Text>User Information:</Text>
          <Text>Name: {user.name}</Text>
          <Text>Email: {user.email}</Text>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
