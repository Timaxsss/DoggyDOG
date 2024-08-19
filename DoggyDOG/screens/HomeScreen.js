import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  const images = [
    require('../assets/chien5.jpg'),
    require('../assets/chien4.jpg'),
    require('../assets/chien6.jpg'),
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      handleNextImage();
    }, 7000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Bonjour,</Text>
      <Text style={styles.subGreeting}>Votre pet-sitter à Hoenheim</Text>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={handlePreviousImage} style={styles.arrowButton}>
          <View style={styles.arrowCircle}>
            <Text style={styles.arrowText}>{"<"}</Text>
          </View>
        </TouchableOpacity>
        <Image source={images[currentImageIndex]} style={styles.image} />
        <TouchableOpacity onPress={handleNextImage} style={styles.arrowButton}>
          <View style={styles.arrowCircle}>
            <Text style={styles.arrowText}>{">"}</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.reviewsSection}>
        <Text style={styles.reviewsTitle}>Avis des clients</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.reviewsContainer}>
          <View style={styles.reviewCard}>
            <Image source={require('../assets/client2.jpg')} style={styles.reviewImage} />
            <Text style={styles.reviewText}>"Excellent service ! Mon chien a adoré." - Sophie L.</Text>
          </View>
          <View style={styles.reviewCard}>
            <Image source={require('../assets/client4.jpg')} style={styles.reviewImage} />
            <Text style={styles.reviewText}>"Très professionnel et attentionné. Je recommande vivement." - Marc D.</Text>
          </View>
          <View style={styles.reviewCard}>
            <Image source={require('../assets/client5.jpg')} style={styles.reviewImage} />
            <Text style={styles.reviewText}>"Service impeccable, merci pour tout !" - Clara M.</Text>
          </View>
        </ScrollView>
      </View>

      {/* Ajouter le bouton Espaces photos */}
      <TouchableOpacity
        onPress={() => navigation.navigate('PhotoScreen')} // Remplacez 'PhotoScreen' par le nom exact de votre screen
        style={styles.submitButton}
      >
        <Text style={styles.submitButtonText}>Espaces photos</Text>
      </TouchableOpacity>

      {/* Ajouter le texte Alors êtes-vous prêt ? */}
      <Text style={styles.readyText}>Alors êtes-vous prêt ?</Text>

      {/* Ajouter le bouton Faire garder mon chien */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Reservation')}
        style={styles.submitButton}
      >
        <Text style={styles.submitButtonText}>Faire garder mon chien</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
  },
  subGreeting: {
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  image: {
    width: '85%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 15,
  },
  arrowButton: {
    width: '7%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  arrowText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  reviewsSection: {
    marginBottom: 30,
  },
  reviewsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  reviewsContainer: {
    flexDirection: 'row',
  },
  reviewCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  reviewImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  reviewText: {
    fontSize: 14,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    width: '95%',
    alignSelf: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  readyText: {
    fontSize: 18,
    textAlign: 'center',
  },
  questionText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
