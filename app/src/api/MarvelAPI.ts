import * as crypto from "crypto-js";

const publicKey = "4516273de10363844b57c9f0de15b9de";
const privateKey = "0afb0ee2bc5e1090880e1407a68cbfa57751002e";

const getCharacters = async (offset = 0, limit = 20) => {
  try {
    const ts = new Date().getTime().toString();
    const hash = crypto.MD5(ts + privateKey + publicKey).toString();

    const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${offset}&orderBy=-modified`;

    const response = await fetch(url);
    
    const data = await response.json();
    
    const charactersWithExtraInfo = data.data.results.map((character: any) => ({
      ...character,
      comicsCount: character.comics?.available || 0,
      seriesCount: character.series?.available || 0,
      storiesCount: character.stories?.available || 0,
      eventsCount: character.events?.available || 0,
    }));
    
    const sortedCharacters = charactersWithExtraInfo.sort((a: any, b: any) => 
      b.comicsCount - a.comicsCount
    );
    
    return sortedCharacters;
  } catch (error) {
    
  }
};

const getCharacterById = async (characterId: number) => {
  try {
    const ts = new Date().getTime().toString();
    const hash = crypto.MD5(ts + privateKey + publicKey).toString();

    const url = `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    const response = await fetch(url);
    
    const data = await response.json();
    return data.data.results[0];
  } catch (error) {
    
  }
};

const getComicsByCharacter = async (characterId: number) => {
  try {
    const ts = new Date().getTime().toString();
    const hash = crypto.MD5(ts + privateKey + publicKey).toString();

    const url = `https://gateway.marvel.com/v1/public/characters/${characterId}/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=10`;

    const response = await fetch(url);
    
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    
  }
};

const getTopCharacters = async (limit = 20, offset = 0) => {
  try {
    // Si ya tenemos un offset, usar la función getCharacters normal con paginación
    if (offset > 0) {
      return await getCharacters(offset, limit);
    }
    
    // Para la primera carga, usar la lógica de personajes populares
    const ts = new Date().getTime().toString();
    const hash = crypto.MD5(ts + privateKey + publicKey).toString();

    const popularSearches = [
      'Spider-Man',
      'Spider',
      'Moon Knight',
      'Iron Man',
      'Captain America',
      'Thor',
      'Hulk',
      'Wolverine',
      'Deadpool',
      'Black Widow',
      'Daredevil',
      'Punisher'
    ];
    
    const allCharacters = [];
    
    for (const searchTerm of popularSearches) {
      try {
        const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${searchTerm}&limit=10`;
        const response = await fetch(url);
        const data = await response.json();
        allCharacters.push(...data.data.results);
      } catch (error) {
        // Error silencioso
      }
    }
    
    const popularIds = [1009610, 1009220, 1009368, 1009664];
    
    for (const id of popularIds) {
      try {
        const url = `https://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
        const response = await fetch(url);
        const data = await response.json();
        allCharacters.push(...data.data.results);
      } catch (error) {
      }
    }
    
    const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}&orderBy=-modified`;
    const response = await fetch(url);
    const data = await response.json();
    allCharacters.push(...data.data.results);
    
    const uniqueCharacters = allCharacters.filter((character, index, self) => 
      index === self.findIndex(c => c.id === character.id)
    );
    
    const charactersWithExtraInfo = uniqueCharacters.map((character: any) => ({
      ...character,
      comicsCount: character.comics?.available || 0,
      seriesCount: character.series?.available || 0,
      storiesCount: character.stories?.available || 0,
      eventsCount: character.events?.available || 0,
    }));
    
    const sortedCharacters = charactersWithExtraInfo.sort((a: any, b: any) => {
      const isPriorityA = a.name.toLowerCase().includes('spider') || a.name.toLowerCase().includes('moon knight');
      const isPriorityB = b.name.toLowerCase().includes('spider') || b.name.toLowerCase().includes('moon knight');
      
      return b.comicsCount - a.comicsCount;
    });
    
    return sortedCharacters.slice(0, limit);
  } catch (error) {
    
  }
};

export default {
  getCharacters,
  getTopCharacters,
  getCharacterById,
  getComicsByCharacter
};