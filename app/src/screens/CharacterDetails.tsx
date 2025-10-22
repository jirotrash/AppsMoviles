import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const CharacterDetails = ({ route }: any) => {
  const { character } = route.params;

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
      <Text style={styles.name}>{character.name}</Text>
      {character.thumbnail && (
        <Image
          source={{ uri: `${character.thumbnail.path}.${character.thumbnail.extension}` }}
          style={styles.image}
        />
      )}
            <Text style={styles.description}>{character.description || 'Sin descripción disponible.'}</Text>
      
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Estadísticas:</Text>
        <View style={styles.statsRow}>
          <Text style={styles.statItem}>{character.comicsCount || 0} Comics</Text>
          <Text style={styles.statItem}>{character.seriesCount || 0} Series</Text>
        </View>
        <View style={styles.statsRow}>
          <Text style={styles.statItem}>{character.storiesCount || 0} Historias</Text>
          <Text style={styles.statItem}>{character.eventsCount || 0} Eventos</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#ffffffff',
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 125,
    marginBottom: 20,
    borderWidth: 5,
    borderColor: '#000000ff',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#ffffffff',
    lineHeight: 24,
    marginBottom: 20,
  },
  statsContainer: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    marginTop: 10,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statItem: {
    fontSize: 16,
    color: '#cccccc',
    flex: 1,
    textAlign: 'center',
  },
});

export default CharacterDetails;