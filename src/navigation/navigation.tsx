import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Image } from 'react-native';
import AuthNavigator from './authNavigator';
import AppNavigator from './appNavigator';
import { useAuth } from '../contexts/authContext';
import { getToken } from '../services/authStorage';
import { verifyToken } from '../api/auth';

const APP_LOADING_IMAGE = require('../assets/images/App_loading.png')

export default function Navigation() {
  const { user, login } = useAuth();
  const [apploading, setApploading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setApploading(true);
        const token = await getToken();

        console.log('Token from storage:', token);

        if (!token) {
          console.log('No token found');
          return;
        }

        const data = await verifyToken(token);

        if (data) {
          console.log('Valid token, proceeding');
          login(data.user);
        } else {
          console.log('Invalid token');
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
      }finally{
        setApploading(false);
      }
    };

    checkAuth();
  }, []);
  if(apploading === true){
    return(
      <Image
      source={APP_LOADING_IMAGE}
      style={{width:'100%', height: '100%'}}
      resizeMode='cover'
      />
    )
  }
  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}