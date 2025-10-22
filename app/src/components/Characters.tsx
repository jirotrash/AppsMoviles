import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CharacterStackParamList } from '../navigator/CharacterNavigator';
import MarvelAPI from "../api/MarvelAPI";

interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: { path: string; extension: string };
  comicsCount: number;
  seriesCount: number;
  storiesCount: number;
  eventsCount: number;
}

const Characters: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const navigation = useNavigation<StackNavigationProp<CharacterStackParamList, 'Characters'>>();

  useEffect(() => {
    fetchInitialCharacters();
  }, []);

  const fetchInitialCharacters = () => {
    setLoading(true);
    MarvelAPI.getTopCharacters(20)
      .then((res) => {
        setCharacters(res || []);
        setOffset(20);
      })
      .finally(() => setLoading(false));
  };

  const fetchMoreCharacters = () => {
    setLoadingMore(true);
    MarvelAPI.getCharacters(offset, 20)
      .then((newCharacters) => {
        const filteredCharacters = (newCharacters || []).filter((newChar: Character) => 
          !characters.some((existingChar) => existingChar.id === newChar.id)
        );
        
        setCharacters(prev => [...prev, ...filteredCharacters]);
        setOffset(prev => prev + 20);
      })
      .finally(() => setLoadingMore(false));
  };

  return (
    <ImageBackground 
      source={require('../../assets/fondo4.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
      <Text style={styles.title}>Lista de Personajes</Text>
      <FlatList
        data={characters}
        keyExtractor={(item, index) => `character-${item.id}-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('CharacterDetails', { character: item })}
            style={styles.cardContainer}
          >
            <ImageBackground 
              source={require('../../assets/degradado2.jpg')}
              style={styles.card}
              imageStyle={styles.cardImageStyle}
            >
              <Image
                source={{ uri: `${item.thumbnail.path}.${item.thumbnail.extension}` }}
                style={styles.image}
              />
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.comicsCount}>{item.comicsCount} comics</Text>
            </ImageBackground>
          </TouchableOpacity>
        )}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 5, paddingBottom: 20 }}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        onEndReached={fetchMoreCharacters}
        onEndReachedThreshold={0.5}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={10}
        windowSize={10}
        getItemLayout={(data, index) => ({
          length: 140,
          offset: 140 * Math.floor(index / 2),
          index,
        })}
        ListFooterComponent={loadingMore ? (
          <ActivityIndicator size="large" color="red" style={{ marginVertical: 20 }} />
        ) : null}
      />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  row: {
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginBottom: 10,
    color: '#ffffff',
  },
  charactersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
  },
  cardContainer: {
    flex: 1,
    margin: 5,
    maxWidth: '45%',
    minWidth: '45%',
    alignSelf: "center",
    shadowColor: '#d34e4eff', 
    elevation: 12,
  },
  card: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 15,
    borderRadius: 70,
    justifyContent: "center",
    overflow: 'hidden',
  },
  cardImageStyle: {
    borderRadius: 90,
    resizeMode: 'cover',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 8,
  },
  name: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  comicsCount: {
    fontSize: 10,
    color: '#ffcccc',
    textAlign: 'center',
    marginTop: 2,
  },
});

export default Characters;
