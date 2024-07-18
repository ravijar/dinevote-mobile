import { View, Text, Button } from 'react-native';
import React from 'react';
import { signOut } from './Login';

export default function Home({ navigation }) {
  const handleLogout = async () => {
    signOut();
    navigation.navigate('Login');
  }

  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Text>Welcome to the Home Page</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
