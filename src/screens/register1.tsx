import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
} from 'react-native';

import { useAuthNavigation } from '../navigation/hooks';
import styles from '../styles/registerstyles';
import { H1, Cap, P } from '../components/typography';
import { sendOTP, verifyOTP } from '../api/services';

// Attach your API functions here later

export default function RegisterScreen1() {
  const navigation = useAuthNavigation();

  const [email, setEmail] = useState('');
  const [OTP, setOTP] = useState('');
  const [emailstatus, setEmailstatus] = useState(null);
  const [otpstatus, setOtpstatus] = useState(null);
  const [emailsuccess, setEmailsuccess] = useState(false);
  const [otpsuccess, setOtpsuccess] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);


  const handlesetemail = (e) => {
    setEmail(e);
    setEmailstatus(null);
  };



  // -------------------------
  // OTP TIMER
  // -------------------------

  useEffect(() => {
    if (timer <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // -------------------------
  // GET OTP
  // -------------------------

  const handleGetOTP = async () => {
    if (!email.trim()) {
      return;
    }

    try {
      setLoading(true);
      setEmailsuccess(false);

      const response = await sendOTP(email.trim());

      console.log('Send OTP response:', response);

      setEmailstatus(response.message);

      if (response.success === true) {
        setOtpSent(true);
        setEmailsuccess(true);
        setTimer(60);
        setOTP('');
      }

    } catch (error: any) {
      console.log('OTP sending error:', error);

      setEmailsuccess(false);
      setEmailstatus(error.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // VERIFY OTP
  // -------------------------

  const handleVerifyOTP = async () => {
    if (OTP.trim().length !== 6) {
      return;
    }

    try {
      setLoading(true);
      setOtpsuccess(false);

      const response = await verifyOTP(
        email.trim(),
        OTP.trim()
      );

      console.log('Verify OTP response:', response);

      setOtpstatus(response.message);

      if (response.success === true) {
        setOtpsuccess(true);

        navigation.navigate('Register2', {
          email: response.email,
        });
      }

    } catch (error: any) {
      console.log('OTP verification error:', error);

      setOtpsuccess(false);
      setOtpstatus(error.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // BUTTON
  // -------------------------

  const handleButtonPress = () => {
    // First click → send OTP
    if (!otpSent || timer === 0) {
      handleGetOTP();
      return;
    }

    // OTP entered → verify
    if (OTP.trim().length === 6) {
      handleVerifyOTP();
    }
  };

  // -------------------------
  // BUTTON TEXT
  // -------------------------

  const getButtonText = () => {
    if (loading) {
      return 'Please wait...';
    }

    // Initial state / timer expired
    if (!otpSent || timer === 0) {
      return 'Get OTP';
    }

    // OTP entered
    if (OTP.trim().length === 6) {
      return 'Continue';
    }

    // OTP sent but not entered yet
    return `Enter OTP (${timer}s)`;
  };

  // -------------------------
  // BUTTON DISABLED STATE
  // -------------------------

  const isButtonDisabled = () => {
    if (loading) {
      return true;
    }

    if (!email.trim()) {
      return true;
    }

    // OTP has been sent and timer is running,
    // but user hasn't entered a 6-digit OTP yet.
    if (
      otpSent &&
      timer > 0 &&
      OTP.trim().length !== 6
    ) {
      return true;
    }

    return false;
  };

  return (
    <View style={styles.container}>

      <View style={styles.topsection}>

        <View style={styles.topsectiontext}>
          <H1 style={styles.heading}>
            Register
          </H1>

          <P style={styles.subtext}>
            Let's quickly verify your email.{'\n'}
            this will later help in account recovery{'\n'}
            or while changing password.
          </P>
        </View>

        <View style={styles.form}>

          {/* EMAIL */}

          <Cap style={styles.label}>
            Email
          </Cap>

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(e) => {handlesetemail(e)}}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            editable={!otpSent || timer === 0}
          />
          {emailstatus && (
            <Cap
              style={{
                color: emailsuccess ? 'green' : 'red',
              }}
            >
              {emailstatus}
            </Cap>
          )}


          {/* OTP */}

          <Cap style={styles.label}>
            Enter 6 digit OTP
          </Cap>

          <TextInput
            style={styles.input}
            value={OTP}
            onChangeText={setOTP}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={6}
          />
          {otpstatus && (
            <Cap
              style={{
                color: otpsuccess ? 'green' : 'red',
              }}
            >
              {otpstatus}
            </Cap>
          )}

          {/* BUTTON */}

          <Pressable
            style={[
              styles.loginButton,
              isButtonDisabled() && { opacity: 0.8 },
            ]}
            onPress={handleButtonPress}
            disabled={isButtonDisabled()}
          >
            <Text style={styles.loginButtonText}>
              {getButtonText()}
            </Text>
          </Pressable>

        </View>
      </View>

      <View style={styles.bottomsection}>
        <Pressable
          onPress={() => navigation.navigate('Login')}
          style={styles.registerRow}
        >
          <Cap style={styles.registerText}>
            Already have an account ?{' '}
            <Cap style={styles.registerLink}>
              Login
            </Cap>
          </Cap>
        </Pressable>
      </View>

    </View>
  );
}