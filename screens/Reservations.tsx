import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
  FlatList,
} from 'react-native';
import { DishContext } from './DishContext';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';

const Reservations = () => {
  const { reservedDishes, setReservedDishes } = useContext(DishContext)!;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [reservationConfirmed, setReservationConfirmed] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [people, setPeople] = useState<string[]>([]);

  const total = reservedDishes.reduce((acc, dish) => acc + parseFloat(dish.price), 0);
  const itemCount = reservedDishes.length;

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const handleReserve = () => {
    if (people.length === 0) {
      Alert.alert('No Guests Added', 'Please add at least one person.');
      return;
    }

    if (itemCount > 0) {
      setReservedDishes([]);
      setReservationConfirmed(true);
      Alert.alert(
        'Reservation Confirmed!',
        `Reservation for ${itemCount} dishes has been confirmed.\nGuests: ${people.join(', ')}\nDate: ${
          selectedDate ? format(selectedDate, 'yyyy-MM-dd HH:mm') : 'Not Selected'
        }`
      );
      setPeople([]); 
    } else {
      Alert.alert('No Dishes Reserved', 'Please select dishes to reserve.');
    }
  };

  const handleAddPerson = () => {
    if (nameInput.trim() === '') {
      Alert.alert('Invalid Name', 'Please enter a valid name.');
      return;
    }
    setPeople((prev) => [...prev, nameInput.trim()]);
    setNameInput('');
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reserved Dishes</Text>

      {itemCount > 0 ? (
        <>
          <ScrollView style={styles.scrollContainer}>
            {reservedDishes.map((dish, index) => (
              <View key={index} style={styles.dishContainer}>
                <Text style={styles.item}>{dish.name}</Text>
                <Text style={styles.description}>{dish.description}</Text>
                <Text style={styles.price}>R{dish.price}</Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Total Items: {itemCount}</Text>
            <Text style={styles.footerText}>Total: R{total.toFixed(2)}</Text>
          </View>

          <TouchableOpacity style={styles.dateButton} onPress={showDatePicker}>
            <Text style={styles.dateButtonText}>
              {selectedDate
                ? `Selected Date: ${format(selectedDate, 'yyyy-MM-dd HH:mm')}`
                : 'Select Date and Time'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.addPersonButton} onPress={toggleModal}>
            <Text style={styles.addPersonButtonText}>
              {people.length > 0
                ? `Guests: ${people.length}`
                : 'Add Guests'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.reserveButton} onPress={handleReserve}>
            <Text style={styles.reserveButtonText}>Confirm Reservation</Text>
          </TouchableOpacity>

          {reservationConfirmed && <Text style={styles.confirmationText}>Reservation confirmed!</Text>}

          {/* Modal for adding people */}
          <Modal visible={isModalVisible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Add Guest</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter name"
                  value={nameInput}
                  onChangeText={setNameInput}
                />
                <TouchableOpacity style={styles.addButton} onPress={handleAddPerson}>
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>

                <FlatList
                  data={people}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => <Text style={styles.guestItem}>{item}</Text>}
                />

                <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      ) : (
        <Text style={styles.noReservation}>No dishes reserved.</Text>
      )}

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default Reservations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5deb3',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 20,
  },
  dishContainer: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  item: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#555',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  noReservation: {
    fontSize: 18,
    color: '#ff0000',
    textAlign: 'center',
    marginTop: 20,
  },
  footer: {
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateButton: {
    backgroundColor: '#d2691e',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 10,
  },
  dateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addPersonButton: {
    backgroundColor: '#8B0000',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 10,
  },
  addPersonButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reserveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  reserveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmationText: {
    fontSize: 16,
    color: '#007BFF',
    marginTop: 10,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    width: '100%',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  guestItem: {
    fontSize: 16,
    marginVertical: 5,
  },
  closeButton: {
    backgroundColor: '#d2691e',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
