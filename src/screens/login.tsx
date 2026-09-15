import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
import {Login} from '../api/auth';
import { useAuth } from '../contexts/authContext';
import { saveToken } from '../services/authStorage';
import { useAuthNavigation } from '../navigation/hooks';
import styles from "../styles/loginstyles"
import { H1, P, Cap } from '../components/typography';


export default function LoginScreen() {
  const navigation = useAuthNavigation();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

const handleLogin = async () => {
  try {
    setError('');

    const data = await Login(username, password);

    const user = data.user;
    const token = data.token;

    login(user);
    saveToken(token);
  } catch (error) {
    console.error('Login error:', error);
    setError('Invalid username or password');
  }
};

    return (
        <View style={styles.container}>
          <View style={styles.topsection}>
            <View style={styles.topsectiontext}>
              <H1 style={styles.heading}>Login</H1>
              <P style={styles.subtext}>Get into your account quickly</P>
            </View>

            <View style={styles.form}>
                <Cap style={styles.label}>Username</Cap>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <View style={styles.labeldoubletext}>
                    <Cap style={styles.label}>Password</Cap>
                    <Pressable>
                        <Cap style={styles.forgotText}>forgot password ?</Cap>
                    </Pressable>
                </View>
                <View style={styles.passwordWrapper}>
                    <TextInput
                        style={styles.passwordInput}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <Pressable
                        style={styles.eyeButton}
                        onPress={() => setShowPassword((prev) => !prev)}
                    >
                        <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁'}</Text>
                    </Pressable>
                </View>
                <Pressable style={styles.loginButton} onPress={handleLogin}>
                  <Text style={styles.loginButtonText}>Login</Text>
                </Pressable>
            </View>
          </View>
          <View style={styles.bottomsection}>
            <Pressable onPress={() => navigation.navigate('Register1')} style={styles.registerRow}>
                <Cap style={styles.registerText}>
                    Don't have an account ? <Cap style={styles.registerLink}>register</Cap>
                </Cap>
            </Pressable>
          </View>
        </View>
    );
};