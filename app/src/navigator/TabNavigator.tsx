import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// Toda la navegación va dentro de un componente llamado Navigation Container
import { NavigationContainer } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from 'react-native';

// Importar screens
import { ScreenI } from '../screens/stack/ScreenI';
import { ScreenII } from '../screens/stack/ScreenII';
import { ScreenIII } from '../screens/stack/ScreenIII';

// Crear una función para bottom tab navigation 
const Tab = createBottomTabNavigator();
const StackNavigator = createNativeStackNavigator();

function MyStack(){
    return (
        <StackNavigator.Navigator
            initialRouteName="HomeStack"
        >
            <StackNavigator.Screen
                name="HomeStack"
                component={ScreenI}
                options={{
                    headerShown: false
                }}
            />
        </StackNavigator.Navigator> 
    )
}

function Galeria1Stack(){
    return (
        <StackNavigator.Navigator>
            <StackNavigator.Screen
                name="Galeria1Main"
                component={ScreenII}
                options={({ navigation }) => ({
                    title: "Primera Galería",
                    headerStyle: {
                        backgroundColor: "#ff6b9d",
                    },
                    headerTitleStyle: {
                        fontWeight: "bold",
                        color: "white",
                        fontSize: 18
                    },
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Home')}
                            style={{ 
                                marginLeft: 15,
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                borderRadius: 20,
                                padding: 8
                            }}
                        >
                            <MaterialIcons name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                    ),
                })}
            />
        </StackNavigator.Navigator> 
    )
}

function Galeria2Stack(){
    return (
        <StackNavigator.Navigator>
            <StackNavigator.Screen
                name="Galeria2Main"
                component={ScreenIII}
                options={({ navigation }) => ({
                    title: "Segunda Galería",
                    headerStyle: {
                        backgroundColor: "#ff6b9d",
                    },
                    headerTitleStyle: {
                        fontWeight: "bold",
                        color: "white",
                        fontSize: 18
                    },
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Home')}
                            style={{ 
                                marginLeft: 15,
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                borderRadius: 20,
                                padding: 8
                            }}
                        >
                            <MaterialIcons name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                    ),
                })}
            />
        </StackNavigator.Navigator> 
    )
}

// Crear componente MyTabs
function MyTabs(){
    return(
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: "#ff6b9d",
                tabBarInactiveTintColor: "#666",
                tabBarStyle: {
                    backgroundColor: "white",
                    borderTopWidth: 2,
                    borderTopColor: "#ff6b9d",
                    height: 60
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "bold"
                },
                headerStyle: {
                    backgroundColor: "#ff6b9d",
                    borderBottomWidth: 0,
                },
                headerTitleStyle: {
                    fontWeight: "bold",
                    color: "white",
                    fontSize: 20,
                },
                headerTintColor: "white",
            }}
        >
            <Tab.Screen 
                name="Home"
                component={MyStack}
                options={{
                    tabBarLabel: "Inicio",
                    headerTitle: "INICIO",
                    tabBarIcon: ({color, size}) => (
                        <MaterialIcons name="home" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="Galeria1"
                component={Galeria1Stack}
                options={{
                    tabBarLabel: "Galería 1",
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <MaterialIcons name="photo-library" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen 
                name="Galeria2" 
                component={Galeria2Stack}
                options={{
                    tabBarLabel: "Galería 2", 
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <MaterialIcons name="collections" size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

// Exportar default function Navigation
export default function Navigation(){
    return(
        <NavigationContainer>
            {/* Agregar la función MyTabs */}
            <MyTabs/>
        </NavigationContainer>
    )
}