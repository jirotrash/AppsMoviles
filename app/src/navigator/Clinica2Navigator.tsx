import { createStackNavigator } from "@react-navigation/stack";
import { HomeClinica2 } from "../screens/clinicamedica2/HomeClinica2";
import { FormClinica2 } from "../screens/clinicamedica2/FormClinica2";
import { DetalleClinica2 } from "../screens/clinicamedica2/DetalleClinica2";

export type Clinica2StackParams = {
    HomeClinica2: undefined;
    FormClinica2: { paciente?: any; isEditing?: boolean };
    DetalleClinica2: { paciente: any };
}

const Stack = createStackNavigator<Clinica2StackParams>();

export const Clinica2Navigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen 
                name="HomeClinica2" 
                component={HomeClinica2}
            />
            <Stack.Screen 
                name="FormClinica2" 
                component={FormClinica2}
            />
            <Stack.Screen 
                name="DetalleClinica2" 
                component={DetalleClinica2}
            />
        </Stack.Navigator>
    );
};
