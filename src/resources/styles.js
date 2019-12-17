import colors from "./colors";
import { calculateString } from "bytebuffer";

export default {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerLeft: {
        flex: 1,
        alignItems: 'flex-start',
        padding: 16,

    },
    containerFull: {
        flex: 1,
        alignItems: 'center'

    },
    containerFlexRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        fontSize: 20,
        margin: 10
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
    inputBoxFull: {
        width: '100%',
        padding: 15,
        fontSize: 16,
        borderColor: colors.darkWhite2,
        backgroundColor: colors.darkWhite1,
        borderBottomWidth: 1,
        marginBottom: 10
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


    card: {
        backgroundColor: colors.white,
        width: '100%',
        marginBottom: 10

    },
    cardImage: {
        width: '100%',
        height: 200,
    },
    cardText: {
        padding: 5,
        fontSize: 16
    },
    cardContainer: {
        backgroundColor: colors.darkWhite2,
        width: '100%',
        marginTop: 20

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

    searchBox: {
        width: '100%',
        height: 60,
        padding: 12,
        fontSize: 16,
        borderColor: colors.darkWhite2,
        backgroundColor: colors.darkWhite2,
        borderBottomWidth: 1
    },
    suggestion: {
        flex: 1,
        alignItems: 'flex-start',
        padding: 16,
        height: 60,
        marginTop: 0,
        marginBottom: 0,
        padding: 5,
        backgroundColor: colors.darkWhite1,
        borderBottomWidth: .25
    },
    map: {
        height: 150

    },


    // To show pink text like "Sign up" under login button
    primaryText: {
        color: colors.primary,
        fontSize: 14
    },
    text: {
        fontSize: 14
    },
    textSubHeading: {
        fontSize: 18
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
