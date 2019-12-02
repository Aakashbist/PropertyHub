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
        borderColor: colors.darkWhite1,
        borderWidth: 2,
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
        fontSize: 18,
        color: colors.white
    },
    buttonTextDisabled: {
        fontSize: 18,
        color: colors.darkWhite2
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
    },
    searchBox: {
        width: '95%',
        height: 60,
        margin: 10,
        padding: 5,
        fontSize: 16,
        borderColor: colors.darkWhite2,
        backgroundColor: colors.darkWhite1,
        borderBottomWidth: 1
    },
    suggestion: {
        width: '95%',
        height: 60,
        margin: 10,
        marginTop: 0,
        marginBottom: 0,
        padding: 5,
        fontSize: 16,
        backgroundColor: colors.darkWhite1,
        borderBottomWidth: .25
    },
    map: {
        height: 400,
        marginTop: 80
    }
}
