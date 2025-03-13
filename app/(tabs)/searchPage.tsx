import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';

interface ImageData {
  nasa_id: string;
  title: string;
  imageUrl: string;
}

const SearchPage = () => {
  const [query, setQuery] = useState<string>(''); // Mot-clé recherché
  const [images, setImages] = useState<ImageData[]>([]); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null); 

  // Fonction pour récupérer les images de la NASA selon un mot-clé
  const fetchImages = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setImages([]); // Si la requête est vide, on vide les résultats
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('https://images-api.nasa.gov/search', {
        params: {
          q: searchQuery, 
          media_type: 'image', 
          page_size: 10, 
        },
      });

      const items = response.data.collection.items;

      if (items && items.length > 0) {
        const data = items.map((item: any) => ({
          nasa_id: item.data[0].nasa_id,
          title: item.data[0].title,
          imageUrl: `https://images-assets.nasa.gov/image/${item.data[0].nasa_id}/${item.data[0].nasa_id}~orig.jpg`, // L'URL de l'image
        }));

        setImages(data);
      } else {
        setError('Aucune image trouvée.');
      }
    } catch (err) {
      console.log(err);
      setError('Erreur lors de la récupération des images.');
    } finally {
      setLoading(false);
    }
  };

  // Fonction qui est appelée lors de la saisie dans la barre de recherche
  const handleSearch = (text: string) => {
    setQuery(text);
    fetchImages(text);
  };

  // Rendu de chaque élément dans la FlatList
  const renderItem = ({ item }: { item: ImageData }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recherche d'images de la NASA !</Text>

    
      <TextInput
        style={styles.searchInput}
        value={query}
        onChangeText={handleSearch}
        placeholder="Entrez un mot-clé..."
      />

      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={(item) => item.nasa_id}
          style={styles.flatList}
        />
      )}
    </View>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141A26',
    paddingTop: 60,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#5833A6',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
    fontSize: 16,
    color: '#5833A6',
  },
  loader: {
    marginTop: 20,
  },
  flatList: {
    flex: 1,
  },
  card: {
    backgroundColor: '#8679D9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 10,
    backgroundColor: '#ccc',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
