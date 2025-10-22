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
        width: 30,
        height: 30,
        marginRight: 8,
        borderRadius: 15,
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
    }
});
