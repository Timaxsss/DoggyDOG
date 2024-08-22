import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { AntDesign } from '@expo/vector-icons'; // Importez l'icône
import { TouchableOpacity, Text } from 'react-native'; // Importez Text

import HomeScreen from './screens/HomeScreen';
import ReservationScreen from './screens/Reservation';
import PhotoScreen from './screens/PhotoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return null; // Or a loading indicator
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil' }} />
        <Stack.Screen 
          name="Reservation" 
          component={ReservationScreen} 
          options={({ navigation }) => ({
            title: '', // Supprime le texte 'Accueil'
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
                <AntDesign name="arrowleft" size={24} color="#4CAF50" />
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: 'white',  // Fond blanc pour l'en-tête
            },
          })}
        />
        <Stack.Screen 
          name="PhotoScreen" 
          component={PhotoScreen} 
          options={({ navigation }) => ({
            title: 'Espaces photos',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
                <AntDesign name="arrowleft" size={24} color="#4CAF50" />
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: 'white',  // Fond blanc pour l'en-tête
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
