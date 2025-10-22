import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MarvelHome from '../screens/marvel/MarvelHome';

export type MarvelStackParams = {
    MarvelHome: undefined;
    // Aquí puedes agregar más pantallas de Marvel en el futuro
    // MarvelDetail: { characterId: number };
}

const Stack = createStackNavigator<MarvelStackParams>();

export const MarvelNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen 
                name="MarvelHome" 
                component={MarvelHome}
            />
        </Stack.Navigator>
    );
};