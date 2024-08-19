import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PhotoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Écran photo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
});
