import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native';
import MarvelAPI from '../../api/MarvelAPI';

interface MarvelCharacter {
  id: number;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

const MarvelHome = () => {
  const [characters, setCharacters] = useState<MarvelCharacter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  const fetchCharacters = () => {
    if (isFetching) return; // Evitar múltiples calls simultáneos
    
    setIsFetching(true);
    setLoading(true);
    MarvelAPI.getTopCharacters(20, offset)
      .then((newCharacters) => {
        if (newCharacters && newCharacters.length > 0) {
          setCharacters((prev) => {
            // Filtrar duplicados basados en ID
            const existingIds = new Set(prev.map(char => char.id));
            const uniqueNewCharacters = newCharacters.filter(char => !existingIds.has(char.id));
            return [...prev, ...uniqueNewCharacters];
          });
          setOffset((prev) => prev + 20);
        }
      })
      .catch((err) => {
        console.error('Error fetching Marvel API:', err);
        setError('No se pudieron cargar los personajes. Intenta de nuevo más tarde.');
      })
      .finally(() => {
        setLoading(false);
        setIsFetching(false);
      });
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
      <View style={styles.container}>
        <FlatList
          data={characters}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          ListHeaderComponent={<Text style={styles.header}>Personajes de Marvel</Text>}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({ item, index }) => (
            <View style={styles.card} key={`character-${item.id}-${index}`}>
              <Image
                source={{ uri: `${item.thumbnail.path}.${item.thumbnail.extension}`.replace('http://', 'https://') }}
                style={styles.image}
              />
              <Text style={styles.name}>{item.name}</Text>
            </View>
          )}
          onEndReached={fetchCharacters}
          onEndReachedThreshold={0.2}
          ListFooterComponent={loading ? (
            <ActivityIndicator
              style={{ height: 120 }}
              size={60}
              color="red"
            />
          ) : null}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#e2e2e2ff',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    fontSize: 60,
    marginHorizontal: 10,
    color: 'white',
    textAlign: 'center',
  },
  card: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    width: 120,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  name: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffffff',
  },
  loadingText: {
    marginTop: 10,
    color: '#ffffff',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default MarvelHome;