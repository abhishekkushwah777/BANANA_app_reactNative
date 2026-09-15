import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import type {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import type { RouteProp } from '@react-navigation/native';

import type {
  AppStackParamList,
  AuthStackParamList,
} from './types';


// ====================
// App Navigation
// ====================

export type AppNavigationProp =
  NativeStackNavigationProp<AppStackParamList>;

export const useAppNavigation = () => {
  return useNavigation<AppNavigationProp>();
};

export const useAppRoute = <
  T extends keyof AppStackParamList
>() => {
  return useRoute<RouteProp<AppStackParamList, T>>();
};


// ====================
// Auth Navigation
// ====================

export type AuthNavigationProp =
  NativeStackNavigationProp<AuthStackParamList>;

export const useAuthNavigation = () => {
  return useNavigation<AuthNavigationProp>();
};

export const useAuthRoute = <
  T extends keyof AuthStackParamList
>() => {
  return useRoute<RouteProp<AuthStackParamList, T>>();
};