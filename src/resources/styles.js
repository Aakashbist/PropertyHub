import colors from "./colors";

export default {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerFull: {
        flex: 1,
        alignItems: 'center'
    },
    inputBox: {
        width: '80%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: colors.darkWhite2,
        backgroundColor: colors.darkWhite1,
        borderBottomWidth: 1,
    },
    buttonDisabled: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 8,
        alignItems: 'center',
        backgroundColor: colors.darkWhite2,
        borderColor: colors.darkWhite2,
        borderWidth: 1,
        borderRadius: 4,
        width: '50%',
    },
    button: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 8,
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderColor: colors.primary,
        borderWidth: 1,
        borderRadius: 4,
        minWidth: '50%'
    },
    buttonText: {
        fontSize: 20,
        color: '#fff'
    },

    // To show pink text like "Sign up" under login button
    primaryText: {
        color: colors.primary,
        fontSize: 14
    },
    primaryTextHeading: {
        color: colors.primary,
        fontSize: 24
    },
    drawerIcon: {
        width: 20,
        height: 20
    }
}
