import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';

import HomeScreen from '../screens/home';
import ChatScreen from '../screens/chat';
import addFriendsScreen from '../screens/addfriends';
import MyProfile from "../screens/myprofile";
import Requests from '../screens/requests';
import LocalSearch from '../screens/localsearch';

import { connectSocket, disconnectSocket } from '../socket/socket';

import type { AppStackParamList } from './types';
import { useAuth } from '../contexts/authContext';

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppNavigator() {
  const user = useAuth();

  useEffect(() => {
    console.log(user);
    const connect = async () => {
      try {
        await connectSocket();
      } catch (error) {
        console.error("Socket connection failed:", error);
      }
    };

    connect();

    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <Stack.Navigator>

      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="AddFriends"
        component={addFriendsScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="MyProfile"
        component={MyProfile}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Requests"
        component={Requests}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="LocalSearch"
        component={LocalSearch}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}