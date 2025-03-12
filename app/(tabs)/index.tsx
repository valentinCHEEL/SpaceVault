import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, FlatList, Dimensions, ScrollView } from 'react-native';
import axios from 'axios';

interface ImageData {
  nasa_id: string;
  title: string;
}

const { width } = Dimensions.get('window');

const HomePage = () => {
  const [imagesFirst, setImagesFirst] = useState<ImageData[]>([]);
  const [imagesSecond, setImagesSecond] = useState<ImageData[]>([]);
  const [imagesThree, setImagesThree] = useState<ImageData[]>([]);
  

  const [loadingFirst, setLoadingFirst] = useState<boolean>(true);
  const [loadingSecond, setLoadingSecond] = useState<boolean>(true);
  const [loadingThree, setLoadingThree] = useState<boolean>(true);

  const [errorFirst, setErrorFirst] = useState<string | null>(null);
  const [errorSecond, setErrorSecond] = useState<string | null>(null);
  const [errorThree, setErrorThree] = useState<string | null>(null);

  const fetchImages = async (query: string, setImages: Function, setLoading: Function, setError: Function) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get('https://images-api.nasa.gov/search', {
        params: {
          q: query,
          media_type: 'image',
          page: Math.floor(Math.random() * 100) + 1,
          page_size: 10,
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
    fetchImages('galaxy', setImagesFirst, setLoadingFirst, setErrorFirst);
    fetchImages('mars', setImagesSecond, setLoadingSecond, setErrorSecond);
    fetchImages('Star', setImagesThree, setLoadingThree, setErrorThree);

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
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Page Home</Text>

      <Text style={styles.sectionTitle}>Galaxies</Text>
      {loadingFirst ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : errorFirst ? (
        <Text style={styles.error}>{errorFirst}</Text>
      ) : (
        <FlatList
          data={imagesFirst}
          renderItem={renderItem}
          keyExtractor={(item) => item.nasa_id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          style={styles.flatList}
        />
      )}

      <Text style={styles.sectionTitle}>Mars</Text>
      {loadingSecond ? (
        <ActivityIndicator size="large" color="#FF5722" />
      ) : errorSecond ? (
        <Text style={styles.error}>{errorSecond}</Text>
      ) : (
        <FlatList
          data={imagesSecond}
          renderItem={renderItem}
          keyExtractor={(item) => item.nasa_id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          style={styles.flatList}
        />
      )}

      <Text style={styles.sectionTitle}>Star</Text>
      {loadingThree ? (
        <ActivityIndicator size="large" color="#FF5722" />
      ) : errorThree ? (
        <Text style={styles.error}>{errorThree}</Text>
      ) : (
        <FlatList
          data={imagesThree}
          renderItem={renderItem}
          keyExtractor={(item) => item.nasa_id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          style={styles.flatList}
        />
      )}
    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141A26',
    paddingTop: 60,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#5833A6',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 20,
    color: '#5833A6',
    textAlign: 'center',
  },
  flatList: {
    flexGrow: 0,
  },
  card: {
    width: width - 40,
    marginHorizontal: 10,
    backgroundColor: '#8679D9',
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
