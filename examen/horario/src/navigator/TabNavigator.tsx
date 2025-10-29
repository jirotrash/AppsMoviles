import React from 'react';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EventoNavigator } from './EventoNavigator';
import { FormEvento } from '../screens/FormEvento';
import { ScreenII } from '../screens/ScreenII';

const Tab = createBottomTabNavigator<any>();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ff6b9d',
        tabBarStyle: { height: 56 },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={EventoNavigator}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size ?? 20} color={color} />
        }}
      />

      <Tab.Screen
        name="Agregar"
        component={FormEvento}
        options={{
          tabBarLabel: 'Agregar',
          tabBarIcon: ({ color, size }) => <Ionicons name="add-circle-outline" size={size ?? 20} color={color} />
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
