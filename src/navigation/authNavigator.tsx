import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/login';
import RegisterScreen1 from '../screens/register1';
import RegisterScreen2 from '../screens/register2';
import WelcomeScreen from '../screens/welcome';

import type { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {

  return (
    <Stack.Navigator>

      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Register1"
        component={RegisterScreen1}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Register2"
        component={RegisterScreen2}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}