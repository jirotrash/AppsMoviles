import { StyleSheet, TextInput } from "react-native";

export const appTheme = StyleSheet.create({
    marginGlobal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black"
    },
    textInput: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        backgroundColor: "white",
        borderRadius: 10,
        textAlign: "center",
        fontWeight: "bold",
        height: 50,
        width: 280,
        margin: 5,
        borderWidth: 5,
        borderColor: "violet",
        color: "black"
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 100,
        borderWidth: 5,
        borderColor: "violet"
    },
    menuContainer:{
        alignItems: "center",
        marginHorizontal: 10,
        marginVertical: 10
    },
    menuBtn:{
        marginVertical: 10,
        borderWidth: 2,
        borderRadius: 10,
        width: 180,
        justifyContent: "center",
        borderColor: "violet"
    },
    menuBtnWithImage:{
        marginVertical: 10,
        borderWidth: 2,
        borderRadius: 15,
        width: 180,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "violet",
        backgroundColor: "#f8f8f8",
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    menuIcon:{
        width: 35,
        height: 35,
        marginRight: 10,
        borderRadius: 8,
        resizeMode: 'cover',
    },
    textBtn:{
        fontSize: 18,
        color: "black",
        fontWeight: "bold",
        textAlign: "center",
    },
    textBtnWithImage:{
        fontSize: 16,
        color: "black",
        fontWeight: "bold",
        marginLeft: 5,
    },
    menuBtnBackground:{
        marginVertical: 10,
        width: 180,
        height: 50,
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    backgroundImage:{
        borderRadius: 15,
        resizeMode: 'cover',
    },
    overlay:{
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    textBtnBackground:{
        fontSize: 18,
        color: "black",
        fontWeight: "bold",
        textAlign: "center",
        textShadowColor: 'rgba(255, 255, 255, 0.9)',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 3,
    }
});
