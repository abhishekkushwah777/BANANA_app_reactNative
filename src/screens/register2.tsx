import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
} from 'react-native';
import { useAuth } from '../contexts/authContext';
import { validateUsername } from '../api/services.js';
import { useAuthNavigation, useAuthRoute } from '../navigation/hooks';
import styles from '../styles/registerstyles';
import { H1, Cap, P } from '../components/typography';
import { Register } from '../api/auth.js';
import { saveToken } from '../services/authStorage.js';

export default function RegisterScreen2() {
  const navigation = useAuthNavigation();
  const { login } = useAuth();
  const route = useAuthRoute<'Register2'>();

  const email = route.params?.email;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [isavailable, setIsavailable] = useState<boolean | null>(null);
  const [usernamestatus, setUsernamestatus] = useState('');

  // -------------------------
  // USERNAME VALIDATION
  // -------------------------

  useEffect(() => {
    const trimmedUsername = username.trim();

    // Don't check usernames shorter than 3 characters
    if (trimmedUsername.length < 3) {
      setIsavailable(null);
      setUsernamestatus('');
      return;
    }

    // Show checking state
    setIsavailable(null);
    setUsernamestatus('Checking username...');

    // Debounce API request
    const timer = setTimeout(async () => {
      try {
        const data = await validateUsername(trimmedUsername);

        if (data.available === true) {
          setIsavailable(true);
        } else {
          setIsavailable(false);
        }

        setUsernamestatus(data.message);

      } catch (error) {
        setIsavailable(false);
        setUsernamestatus("error checking username");
      }
    }, 500);

    // Cancel previous timer
    return () => clearTimeout(timer);

  }, [username]);

  // -------------------------
  // REGISTER
  // -------------------------

  const handleRegister = async () => {
    const trimmedUsername = username.trim();

    if (!email) {
      console.log('Email is missing');
      return;
    }

    if (trimmedUsername.length < 3) {
      console.log('Username must be at least 3 characters');
      return;
    }

    if (isavailable !== true) {
      console.log('Username is not available');
      return;
    }

    if (!password) {
      console.log('Password is required');
      return;
    }

    if (password !== password2) {
      console.log('Passwords do not match');
      return;
    }

    try {
      const data = await Register(
        username.trim(),
        email.trim(),
        password
      );
      const user = data.user;
      const token = data.token;

      console.log(data.message);

      // Navigate after successful registration
      login(user);
      saveToken(token);

    } catch (error) {
      console.error("Registration error:", error);
    }
  };

// -------------------------
// BUTTON STATE
// -------------------------

const buttonDisabled =
  isavailable !== true ||
  !password ||
  !password2 ||
  password !== password2;

return (
  <View style={styles.container}>

    <View style={styles.topsection}>

      <View style={styles.topsectiontext}>
        <H1 style={styles.heading}>
          Register
        </H1>

        <P style={styles.subtext}>
          Set a cool username for your account{'\n'}
          and protect it with a strong password.
        </P>
      </View>

      <View style={styles.form}>

        {/* USERNAME */}

        <Cap style={styles.label}>
          Username
        </Cap>

        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
        />

        {/* USERNAME STATUS */}

        {usernamestatus !== '' && (
          <Cap
            style={{
              color:
                isavailable === true
                  ? 'green'
                  : isavailable === false
                    ? 'red'
                    : 'gray',
            }}
          >
            {usernamestatus}
          </Cap>
        )}

        {/* PASSWORD */}

        <Cap style={styles.label}>
          Set Password
        </Cap>

        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />

        {/* CONFIRM PASSWORD */}

        <Cap style={styles.label}>
          Enter password again
        </Cap>

        <TextInput
          style={styles.input}
          value={password2}
          onChangeText={setPassword2}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />

        {/* PASSWORD STATUS */}

        {password2.length > 0 && (
          <Cap
            style={{
              color:
                password === password2
                  ? 'green'
                  : 'red',
            }}
          >
            {password === password2
              ? 'Passwords match'
              : 'Passwords do not match'}
          </Cap>
        )}

        {/* COMPLETE */}

        <Pressable
          style={[
            styles.loginButton,
            buttonDisabled && { opacity: 0.5 },
          ]}
          onPress={handleRegister}
          disabled={buttonDisabled}
        >
          <Text style={styles.loginButtonText}>
            Complete
          </Text>
        </Pressable>

      </View>
    </View>

  </View>
);
}