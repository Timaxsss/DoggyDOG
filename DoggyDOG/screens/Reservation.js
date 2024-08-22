import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';  // Pour l'icône de la flèche

export default function ReservationScreen() {
  const [numAnimals, setNumAnimals] = useState('');
  const [animalType, setAnimalType] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [animalDetails, setAnimalDetails] = useState([]);  // Pour stocker les détails spécifiques à chaque animal
  const [expandedIndexes, setExpandedIndexes] = useState([]);  // Pour gérer l'expansion ou la réduction des sections

  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartPicker(false);
    setStartDate(currentDate);
  };

  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndPicker(false);
    setEndDate(currentDate);
  };

  const handleNumAnimalsChange = (text) => {
    if (text.length <= 2) { // Limiter à 2 caractères
      const num = parseInt(text);
      if (!isNaN(num) && num <= 4) {
        setNumAnimals(text);
        setAnimalDetails(Array(num).fill({ age: '', name: '', dogFriendly: null, catFriendly: null, notes: '' }));
        setExpandedIndexes(Array(num).fill(true));  // Tous les animaux sont étendus par défaut
      } else if (text === '') {
        setNumAnimals('');
        setAnimalDetails([]); // Réinitialiser les détails des animaux si le champ est vide
        setExpandedIndexes([]);  // Réinitialiser les états d'expansion
      } else {
        alert('Le nombre maximum d\'animaux est 4.');
      }
    }
  };

  const handleAnimalDetailChange = (index, key, value) => {
    const details = [...animalDetails];
    details[index] = {
      ...details[index],
      [key]: value,
    };
    setAnimalDetails(details);
  };

  const toggleExpand = (index) => {
    const newExpandedIndexes = [...expandedIndexes];
    newExpandedIndexes[index] = !newExpandedIndexes[index];
    setExpandedIndexes(newExpandedIndexes);
  };

  const renderAnimalFields = () => {
    return animalDetails.map((animal, i) => (
      <View key={i} style={styles.animalContainer}>
        <TouchableOpacity onPress={() => toggleExpand(i)} style={styles.animalHeader}>
          <Text style={styles.label}>Animal {i + 1}</Text>
          <AntDesign name={expandedIndexes[i] ? 'up' : 'down'} size={24} color="black" />
        </TouchableOpacity>
        {expandedIndexes[i] && (
          <View>
            <Text style={styles.label}>Âge de l'animal {i + 1}</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Entrez l'âge"
              value={animal.age}
              onChangeText={(text) => handleAnimalDetailChange(i, 'age', text)}
            />

            <Text style={styles.label}>Nom de l'animal {i + 1}</Text>
            <TextInput
              style={styles.input}
              placeholder="Entrez le nom"
              value={animal.name}
              onChangeText={(text) => handleAnimalDetailChange(i, 'name', text)}
            />

            <Text style={styles.label}>Est-il sociable avec les chiens ?</Text>
            <View style={styles.choiceContainer}>
              <TouchableOpacity
                style={[styles.choiceButton, animal.dogFriendly === true && styles.selectedChoice]}
                onPress={() => handleAnimalDetailChange(i, 'dogFriendly', true)}
              >
                <Text style={[styles.choiceText, animal.dogFriendly === true && styles.selectedChoiceText]}>Oui</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.choiceButton, animal.dogFriendly === false && styles.selectedChoice]}
                onPress={() => handleAnimalDetailChange(i, 'dogFriendly', false)}
              >
                <Text style={[styles.choiceText, animal.dogFriendly === false && styles.selectedChoiceText]}>Non</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.choiceButton, animal.dogFriendly === 'unsure' && styles.selectedChoice]}
                onPress={() => handleAnimalDetailChange(i, 'dogFriendly', 'unsure')}
              >
                <Text style={[styles.choiceText, animal.dogFriendly === 'unsure' && styles.selectedChoiceText]}>Pas sûr</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Est-il sociable avec les chats ?</Text>
            <View style={styles.choiceContainer}>
              <TouchableOpacity
                style={[styles.choiceButton, animal.catFriendly === true && styles.selectedChoice]}
                onPress={() => handleAnimalDetailChange(i, 'catFriendly', true)}
              >
                <Text style={[styles.choiceText, animal.catFriendly === true && styles.selectedChoiceText]}>Oui</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.choiceButton, animal.catFriendly === false && styles.selectedChoice]}
                onPress={() => handleAnimalDetailChange(i, 'catFriendly', false)}
              >
                <Text style={[styles.choiceText, animal.catFriendly === false && styles.selectedChoiceText]}>Non</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.choiceButton, animal.catFriendly === 'unsure' && styles.selectedChoice]}
                onPress={() => handleAnimalDetailChange(i, 'catFriendly', 'unsure')}
              >
                <Text style={[styles.choiceText, animal.catFriendly === 'unsure' && styles.selectedChoiceText]}>Pas sûr</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Indiquer si il y a des choses à savoir sur l'animal</Text>
            <TextInput
              style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
              multiline
              placeholder="Entrez les détails ici"
              value={animal.notes}
              onChangeText={(text) => handleAnimalDetailChange(i, 'notes', text)}
            />
          </View>
        )}
      </View>
    ));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Réservez votre pet-sitter</Text>

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.label}>Combien d'animaux ?</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={numAnimals}
            onChangeText={handleNumAnimalsChange}
            placeholder="Entrez le nombre d'animaux"
          />

          <Text style={styles.label}>Quel animal ?</Text>
          <TextInput
            style={styles.input}
            value={animalType}
            onChangeText={setAnimalType}
            placeholder="Entrez le type d'animal"
          />

          <Text style={styles.label}>Mon numéro de téléphone</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Entrez votre numéro de téléphone"
          />

          {renderAnimalFields()}

          <Text style={styles.label}>Date de début</Text>
          <TouchableOpacity onPress={() => setShowStartPicker(true)} style={styles.dateButton}>
            <Text style={styles.dateButtonText}>{startDate.toDateString()}</Text>
          </TouchableOpacity>
          {showStartPicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={handleStartDateChange}
            />
          )}

          <Text style={styles.label}>Date de fin</Text>
          <TouchableOpacity onPress={() => setShowEndPicker(true)} style={styles.dateButton}>
            <Text style={styles.dateButtonText}>{endDate.toDateString()}</Text>
          </TouchableOpacity>
          {showEndPicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={handleEndDateChange}
            />
          )}

          <TouchableOpacity style={styles.submitButton} onPress={() => alert('Réservation effectuée')}>
            <Text style={styles.submitButtonText}>Réserver</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#4CAF50',
    textAlign: 'center',
    fontFamily: 'Montserrat_700Bold',
  },
  scrollViewContent: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
    fontFamily: 'Montserrat_400Regular',
  },
  input: {
    height: 40,
    borderColor: '#4CAF50',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  dateButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 20,
  },
  dateButtonText: {
    color: '#4CAF50',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    
  },
  choiceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  choiceButton: {
    borderColor: '#4CAF50',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  selectedChoice: {
    backgroundColor: '#4CAF50',
  },
  selectedChoiceText: {
    color: 'white',
  },
  choiceText: {
    color: '#4CAF50',
    fontSize: 16,
    fontFamily: 'Montserrat_400Regular',
  },
  animalContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 5,
    padding: 10,
  },
  animalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

