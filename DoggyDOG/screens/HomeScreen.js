import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';

export default function HomeScreen() {
  const navigation = useNavigation();

  const images = [
    require('../assets/chien5.jpg'),
    require('../assets/chien4.jpg'),
    require('../assets/chien6.jpg'),
  ];

  return (
    <ImageBackground source={require('../assets/background.jpg')} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.greeting}>Bonjour,</Text>
          <Text style={styles.subGreeting}>Votre pet-sitter à Hoenheim pour 30€/Jour</Text>
          
          {/* Image Swiper */}
          <Swiper
            style={styles.wrapper}
            showsButtons={true}
            buttonWrapperStyle={styles.buttonWrapper}
            paginationStyle={styles.pagination}
            activeDotColor='#4CAF50'
            dotColor="#998FA2"
            nextButton={
              <View style={styles.nextButton}>
                <Text style={styles.arrowText}>{">"}</Text>
              </View>
            }
            prevButton={
              <View style={styles.prevButton}>
                <Text style={styles.arrowText}>{"<"}</Text>
              </View>
            }
          >
            {images.map((image, index) => (
              <View style={styles.slide} key={index}>
                <Image source={image} style={styles.image} />
              </View>
            ))}
          </Swiper>

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

          <TouchableOpacity
            onPress={() => navigation.navigate('PhotoScreen')}
            style={styles.submitButton}
          >
            <Text style={styles.submitButtonText}>Espaces photos</Text>
          </TouchableOpacity>

          <Text style={styles.readyText}>Alors êtes-vous prêt ?</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('Reservation')}
            style={styles.submitButton}
          >
            <Text style={styles.submitButtonText}>Faire garder mon chien</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const { width: w, height: h } = Dimensions.get('window');

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  greeting: {
    fontSize: 28,
    fontFamily: 'Montserrat_700Bold', // Utilisation de Montserrat Bold
    textAlign: 'left',
    marginBottom: 10,
  },
  subGreeting: {
    fontSize: 18,
    fontFamily: 'Montserrat_400Regular', // Utilisation de Montserrat Regular
    textAlign: 'left',
    marginBottom: 20, // Ajout d'une petite marge pour respirer
  },
  wrapper: {
    height: h * 0.55, // Ajustement pour que le Swiper prenne plus de place
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 0, // Retrait des marges verticales
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 15,
  },
  buttonWrapper: {
    backgroundColor: "transparent",
    flexDirection: "row",
    position: "absolute",
    bottom: 10, // Positionnement ajusté pour coller aux flèches
    left: 0,
    right: 0, // S'assure que les flèches sont bien alignées
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10, // Réduction du padding
  },
  pagination: {
    bottom: 15, // Positionnement ajusté de la pagination
  },
  nextButton: {
    height: 50, // Taille réduite
    borderRadius: 25, 
    alignItems: 'center',
    justifyContent: 'center',
    width: 50, 
    backgroundColor: '#4CAF50',
  },
  prevButton: {
    height: 50, 
    borderRadius: 25, 
    alignItems: 'center',
    justifyContent: 'center',
    width: 50, 
    backgroundColor: '#4CAF50',
    marginHorizontal: 10, 
  },
  arrowText: {
    fontSize: 20, 
    fontWeight: 'bold',
    color: 'white',
  },
  reviewsSection: {
    marginBottom: 30,
  },
  reviewsTitle: {
    fontSize: 22,
    fontFamily: 'Montserrat_700Bold', // Utilisation de Montserrat Bold
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 20,
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
    fontFamily: 'Montserrat_400Regular', // Utilisation de Montserrat Regular
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 35,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    width: '95%',
    alignSelf: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Montserrat_700Bold', // Utilisation de Montserrat Bold
  },
  readyText: {
    fontSize: 18,
    fontFamily: 'Montserrat_400Regular', // Utilisation de Montserrat Regular
    textAlign: 'center',
  },
});
