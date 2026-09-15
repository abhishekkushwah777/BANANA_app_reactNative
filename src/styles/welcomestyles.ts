import { StyleSheet } from "react-native";

const PURPLE = '#845DCC';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    poster: {
        height: "50%",
        width: "100%",
        borderRadius: 28,
        backgroundColor: PURPLE,
        overflow: 'hidden',
    },
    posterImage: {
        width: '100%',
        height: '100%',
    },
    content: {
        marginTop: 40,
        justifyContent: 'center',
        paddingHorizontal: 25,
    },
    subtext: {
        width: '80%',
        marginTop: 10,
        lineHeight: 21,
    },
    tagline: {
        fontFamily: "kumbh-sans(6)",
        marginTop: 25,
    },
    bottomSection: {
        marginTop: 'auto',
        marginBottom: 24,
        paddingHorizontal: 25,
    },
    loginButton: {
        backgroundColor: PURPLE,
        borderRadius: 14,
        paddingVertical: 16,
        marginBottom: 30,
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#ffffff',
        fontSize: 17,
        fontWeight: '700',
    },
    registerRow: {
        marginTop: 16,
        alignItems: 'center',
    },
    registerText: {
        fontSize: 14,
        color: '#4a4a4a',
    },
    registerLink: {
        fontWeight: '700',
        color: '#1a1a1a',
        textDecorationLine: 'underline',
    },
});

export default styles;