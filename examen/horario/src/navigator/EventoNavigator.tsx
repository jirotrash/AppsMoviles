import { createStackNavigator } from "@react-navigation/stack";
import { HomeEvento } from "../screens/HomeEvento";
import { FormEvento } from "../screens/FormEvento";
import { DetalleEvento } from "../screens/DetalleEvento";
import { EventoResponse } from "../interfaces/eventoInterfaces";

export type RootStackParams = {
    HomeEvento: undefined;
    FormEvento: EventoResponse | undefined;
    DetalleEvento: EventoResponse;
}

export const EventoNavigator = () => {
    const Stack = createStackNavigator<RootStackParams>();

    return (
        <Stack.Navigator
            initialRouteName="HomeEvento"
            screenOptions={{
                headerMode: "float",
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="HomeEvento"
                component={HomeEvento}
            />
            <Stack.Screen
                name="FormEvento"
                component={FormEvento}
            />
            <Stack.Screen
                name="DetalleEvento"
                component={DetalleEvento}
            />
        </Stack.Navigator>
    );
};