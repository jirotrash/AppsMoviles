import { StyleSheet } from 'react-native';

export const appTheme = StyleSheet.create({
    marginGlobal: {
        marginHorizontal: 10,
        flex: 1,
        marginTop: 40
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#faf6f6ff',
        alignContent: 'center',
        alignItems: 'center'
    },
    title2: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#000000ff'
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        fontSize: 16,
        backgroundColor: '#fff',
        width: '100%'
    },
    button: {
        backgroundColor: "#cececeff",
        padding: 15,
        borderRadius: 50,
        marginVertical: 10,
        alignItems: 'center',
        width: '100%'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
});