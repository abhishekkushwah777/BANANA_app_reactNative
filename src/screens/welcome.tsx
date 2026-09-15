import { Image, Pressable, Text, View } from 'react-native';
import { useAuthNavigation } from '../navigation/hooks';
import { H1, H2SB, H3, P, Cap } from '../components/typography';
import styles from "../styles/welcomestyles"
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// TODO: replace with your actual poster image asset
const POSTER_IMAGE = require('../assets/images/welcomeposter.png');

export default function WelcomeScreen() {
    const navigation = useAuthNavigation();
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, {
            paddingBottom: Math.max(insets.bottom, 12),
        }]}>
            <View style={styles.poster}>
                <Image
                    source={POSTER_IMAGE}
                    style={styles.posterImage}
                    resizeMode="cover"
                />
            </View>

            <View style={styles.content}>
                <H2SB>Heyyy 👀</H2SB>
                <P style={styles.subtext}>
                    You're just one tap away from finding your people & starting the convo.
                </P>
                <P style={styles.tagline}>
                    Stay connected.{'\n'}Talk more. Scroll less.
                </P>
            </View>

            <View style={styles.bottomSection}>
                <Pressable style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </Pressable>

                <Pressable onPress={() => navigation.navigate('Register1')} style={styles.registerRow}>
                    <Cap>
                        Don't have an account ? <Cap style={styles.registerLink}>register</Cap>
                    </Cap>
                </Pressable>
            </View>
        </View>
    );
};