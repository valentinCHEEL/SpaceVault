import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, FlatList, Dimensions } from 'react-native';
import axios from 'axios';

interface ImageData {
  nasa_id: string;
  title: string;
}

const { width } = Dimensions.get('window');

const HomePage = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get('https://images-api.nasa.gov/search', {
        params: {
          q: 'galaxy', // thème
          media_type: 'image',
          page: Math.floor(Math.random() * 100) + 1,
          page_size: 10, // on récupère 10 images
        },
      });

      const items = response.data.collection.items;

      if (items && items.length > 0) {
        const data = items.map((item: any) => ({
          nasa_id: item.data[0].nasa_id,
          title: item.data[0].title,
        }));

        setImages(data);
      } else {
        setError('Aucune image trouvée.');
      }
    } catch (err) {
      console.log(err);
      setError("Erreur lors de la récupération des images.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const renderItem = ({ item }: { item: ImageData }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Image
        source={{ uri: `https://images-assets.nasa.gov/image/${item.nasa_id}/${item.nasa_id}~orig.jpg` }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Page Home</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={(item) => item.nasa_id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          style={styles.flatList}
        />
      )}
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f9',
    paddingTop: 60,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  flatList: {
    flexGrow: 0,
  },
  card: {
    width: width - 40, // taille de la carte
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    backgroundColor: '#ccc',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
