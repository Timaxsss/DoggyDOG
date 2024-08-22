import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';

export default function PhotoScreen() {
  const [loading, setLoading] = useState(true);
  
  const images = [
    require('../assets/feed1.jpg'),
    require('../assets/feed2.jpg'),
    require('../assets/feed3.jpg'),
    require('../assets/feed4.jpg'),
    require('../assets/feed5.jpg'),
    require('../assets/feed6.jpg'),
    require('../assets/feed7.jpg'),
    require('../assets/feed8.jpg'),
    require('../assets/feed9.jpg'),
    require('../assets/feed10.jpg'),

  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Photos des chiens gardés</Text>
      <View style={styles.container}>
        {images.map((image, index) => (
          <View key={index} style={styles.imageWrapper}>
            {loading && <ActivityIndicator size="large" color="#4CAF50" />}
            <Image
              source={image}
              style={styles.image}
              onLoad={() => setLoading(false)}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#4CAF50',
    fontFamily: 'Montserrat_700Bold', // Utilisation de Montserrat Bold
  },
  container: {
    alignItems: 'center',
  },
  imageWrapper: {
    marginBottom: 40,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
  },
});
