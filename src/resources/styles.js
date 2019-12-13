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
    containerFlexRow: {
        flexDirection: 'row',
        borderBottomWidth: 0,
        marginTop: 15,
        justifyContent: 'center',

        fontSize: 20

    },
    containerFlexColumn: {
        flexDirection: 'column',

        justifyContent: 'center',
        backgroundColor: '#f5fcff',

        width: '80%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: colors.black,
        backgroundColor: colors.white,
        borderBottomWidth: 0,


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
    unitInputBox: {
        width: '80%',
        margin: 10,
        paddingLeft: 35,
        fontSize: 16,
        borderColor: colors.darkWhite2,
        backgroundColor: colors.darkWhite1,
        borderBottomWidth: 1,
    },
    buttonNext: {
        flexDirection: 'row',
        width: '20%',
        marginLeft: '80%',
        marginTop: 5,
        padding: 5,
        fontSize: 20,
        borderColor: colors.darkWhite2,
        backgroundColor: colors.green,
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

    buttonWithChevron: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderColor: colors.primary

    },
    buttonWithChevronDisable: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ff6f93'

    },
    card: {
        backgroundColor: colors.white,
        marginBottom: 10,
        marginLeft: '2%',
        width: '96%',
    },
    cardImage: {
        width: '100%',
        height: 200,
        backgroundColor: '#000'

    },
    cardText: {
        padding: 10,
        fontSize: 16
    },
    cardContainer: {
        margin: 20,
        backgroundColor: '#f5fcff'
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

    unitButton: {
        padding: 5,
        margin: 10,
        paddingVertical: 8,
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderColor: colors.primary,
        borderWidth: 1,
        borderRadius: 4,
        minWidth: '30%'
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
        padding: 12,
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
        height: 150,
        marginTop: 20
    }

}
