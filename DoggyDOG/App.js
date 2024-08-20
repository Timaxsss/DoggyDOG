import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';

import HomeScreen from './screens/HomeScreen';
import ReservationScreen from './screens/Reservation';
import PhotoScreen from './screens/PhotoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil' }} />
        <Stack.Screen name="Reservation" component={ReservationScreen} options={{ title: 'Réservation' }} />
        <Stack.Screen name="PhotoScreen" component={PhotoScreen} options={{ title: 'Espaces photos' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
