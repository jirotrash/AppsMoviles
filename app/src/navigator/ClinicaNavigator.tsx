import { createStackNavigator } from "@react-navigation/stack";
import { HomeClinica } from "../screens/clinica/HomeClinica";
import { FormClinica } from "../screens/clinica/FormClinica";
import { DetalleClinica } from "../screens/clinica/DetalleClinica";

export type ClinicaStackParams = {
    HomeClinica: undefined;
    FormClinica: { paciente?: any; isEditing?: boolean; onUpdate?: (paciente: any) => void };
    DetalleClinica: { paciente: any };
}

const Stack = createStackNavigator<ClinicaStackParams>();

export const ClinicaNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: '#3B82F6',
                    elevation: 4,
                    shadowColor: '#3B82F6',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                },
                headerTintColor: '#ffffff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 18,
                },
                cardStyle: {
                    backgroundColor: '#F0F8FF',
                },
            }}
        >
            <Stack.Screen 
                name="HomeClinica" 
                component={HomeClinica}
                options={{
                    title: 'Clínica Médica',
                }}
            />
            <Stack.Screen 
                name="FormClinica" 
                component={FormClinica}
                options={{
                    title: 'Historia Clínica',
                }}
            />
            <Stack.Screen 
                name="DetalleClinica" 
                component={DetalleClinica}
                options={{
                    title: 'Detalle del Paciente',
                }}
            />
        </Stack.Navigator>
    );
};