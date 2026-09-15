import { StyleSheet } from "react-native";

const PURPLE = "#845DCC"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 25,
    },
    topsection: {
        flex: 1,
        justifyContent: 'center'
    },
    bottomsection: {
        bottom: 0,
        marginTop: 'auto',
        marginBottom: 0,
    },
    topsectiontext: {
        marginBottom: 20,
    },
    form: {
    },
    labeldoubletext:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },

    heading: {
        fontSize: 44,
        fontWeight: '400',
        color: '#1a1a1a',
    },
    subtext: {
    },
    field: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: '#1a1a1a',
        marginBottom: 6,
    },
    labelRow: {
    },
    forgotText: {
        fontSize: 13,
        color: '#1a1a1a',
        textDecorationLine: 'underline',
    },
    input: {
        borderWidth: 1,
        borderColor: '#1a1a1a',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 15,
    },
    passwordWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#1a1a1a',
        borderRadius: 10,
        paddingHorizontal: 14,
    },
    passwordInput: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
        color: 'black',
    },
    eyeButton: {
        paddingLeft: 8,
    },
    eyeIcon: {
        fontSize: 16,
    },
    loginButton: {
        backgroundColor: PURPLE,
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 40,
    },
    loginButtonText: {
        color: '#ffffff',
        fontSize: 17,
        fontWeight: '700',
    },
    registerRow: {
        marginTop: 'auto',
        marginBottom: 24,
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