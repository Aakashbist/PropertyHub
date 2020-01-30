import colors from "./colors";

export default {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerLeft: {
        flex: 1,
        alignItems: 'flex-start',
    },
    containerFull: {
        flex: 1,
        alignItems: 'center'
    },
    containerFlexRow: {
        flex: 1,
        flexDirection: 'row'
    },
    chatContainer: {
        flex: 1,
        width: '100%',
    },
    flatView: {
        justifyContent: 'center',
        paddingTop: 30,
        borderRadius: 2,
    },
    boxCenter: {
        justifyContent: 'center',
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
    inputBoxFull: {
        alignSelf: 'stretch',
        fontSize: 16,
        borderColor: colors.darkWhite2,
        backgroundColor: colors.darkWhite1,
        borderBottomWidth: 1,
        marginBottom: 16
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
        backgroundColor: colors.darkWhite1,
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
        width: '100%'
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
        flexDirection: 'row',
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
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },
    customActionsContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    dashboardViewWithShadow: {
        margin: 16,
        alignSelf: 'stretch',
        borderRadius: 8,
        backgroundColor: colors.white,
        borderRadius: 2,
        borderColor: '#ddd',
        //ios    
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0
        },
        //android
        elevation: 4
    },
    timelineContainer: {
        flex: 1,
        padding: 20,
        paddingTop: 65,
        backgroundColor: colors.white,
        width: '100%',

    },
    timelineList: {
        flex: 1,
        marginTop: 20,
    },
    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        //backgroundColor:'black'
    },
    // To show pink text like "Sign up" under login button
    overline: {
        fontSize: 14,
        textTransform: 'uppercase'
    },
    primaryText: {
        color: colors.primary,
        fontSize: 14
    },
    text: {
        fontSize: 14
    },
    textSubHeading: {
        fontSize: 17
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
