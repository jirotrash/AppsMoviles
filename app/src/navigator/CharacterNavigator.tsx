import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Characters from '../components/Characters';
import CharacterDetails from '../screens/CharacterDetails';
import { Text, StyleSheet } from 'react-native';

export type CharacterStackParamList = {
  Characters: undefined;
  CharacterDetails: { character: { 
    id:          number; 
    name:        string; 
    description: string; 
    thumbnail: { 
      path:      string; 
      extension: string 
    } 
  }
 };
};

const Stack = createStackNavigator<CharacterStackParamList>();

const CharacterNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        cardStyle: styles.card,
      }}
    >
      <Stack.Screen 
        name="Characters" 
        component={Characters} 
        options={{ title: 'MARVEL' }}
      />
      <Stack.Screen 
        name="CharacterDetails" 
        component={CharacterDetails} 
        options={({ route }) => ({ title: route.params.character.name })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ff0000ff',
  },
  headerTitle: {
    color: '#ffffffff',
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  card: {
    backgroundColor: '#1B0641',
  },
});

export default CharacterNavigator;  