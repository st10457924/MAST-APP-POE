Home:
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  FullMenu: undefined;
  ChefLogin: undefined;
  ManageMenuItems: undefined; 
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const Home = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Image source={require('../assets/ChefLogo.jpg')} style={styles.logo} />

      <Text style={styles.title}>Shongwe Eats</Text>
      <Text style={styles.slogan}>Savor every moment</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Fullmenu')}>
          <Text style={styles.buttonText}>Full Menu</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('loginchef')}>
          <Text style={styles.buttonText}>Chef Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5deb3', 
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 20, 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  slogan: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#555',
    marginBottom: 30,
    paddingHorizontal: 20, 
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  button: {
    backgroundColor: '#d2691e',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginVertical: 10,
    flex: 1,
    marginHorizontal: 15,
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

App:
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Fullmenu from './screens/Fullmenu';
import ChefMenu from './screens/Chefmenu'
import loginChef from './screens/loginchef';
import { DishProvider } from './screens/DishContext';
import Reservations from './screens/Reservations';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <DishProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name='Fullmenu' component={Fullmenu}/>
        <Stack.Screen name="ChefMenu" component={ChefMenu} />
        <Stack.Screen name='loginchef' component={loginChef}/>
        <Stack.Screen name='Reservations' component={Reservations}/>
        </Stack.Navigator>
    </NavigationContainer>
    </DishProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

loginchef:
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  ChefMenu: undefined;
};

type LoginChefNavigationProp = StackNavigationProp<RootStackParamList, 'ChefMenu'>;

interface Props {
  navigation: LoginChefNavigationProp;
}

const LoginChef = ({ navigation }: Props) => {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');

  const handleLogin = () => {
    if (username === '' || description === '') {
      Alert.alert('Error', 'Please enter username and description');
    } else {
      Alert.alert('Login Success', `Welcome, ${username}!`);
      navigation.navigate('ChefMenu');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Chef</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      <TextInput
        style={[styles.input, styles.descriptionInput]} 
        placeholder="Password"
        value={description}
        onChangeText={(text) => setDescription(text)}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginChef;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5deb3',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8, 
    backgroundColor: '#fff',
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  descriptionInput: {
    textAlignVertical: 'top', 
  },
  button: {
    backgroundColor: '#d2691e',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

chefmenu:
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { DishContext } from './DishContext';

const ChefMenu = () => {
  const { addDish, deleteDish, dishes } = useContext(DishContext)!;
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Starter');

  const handleAddDish = () => {
    if (dishName === '' || description === '' || price === '' || category === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newDish = {
      id: Math.random(),
      name: dishName,
      description,
      price: parseFloat(price),
      category,
    };

    addDish(newDish);

    Alert.alert(
      'Dish Added',
      `Dish: ${dishName}\nCategory: ${category}\nDescription: ${description}\nPrice: R${price}`
    );

    clearInputs();
  };

  const clearInputs = () => {
    setDishName('');
    setDescription('');
    setPrice('');
    setCategory('Starter');
  };

  const handleRemoveDish = (id: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this dish?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            deleteDish(id);
            Alert.alert('Dish Removed', `Dish has been removed`);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Dish</Text>

      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        placeholderTextColor="black"
        value={dishName}
        onChangeText={setDishName}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        placeholderTextColor="black"
        value={description}
        onChangeText={setDescription}
      />

      <TextInput
        style={styles.input}
        placeholder="Price"
        placeholderTextColor="black"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="Starter" value="Starter" />
        <Picker.Item label="Main" value="Main" />
        <Picker.Item label="Dessert" value="Dessert" />
      </Picker>

      <TouchableOpacity style={styles.buttonAdd} onPress={handleAddDish}>
        <Text style={styles.buttonText}>Add Dish</Text>
      </TouchableOpacity>

      <ScrollView style={styles.dishList}>
        {dishes.map((dish) => (
          <View key={dish.id} style={styles.dishCard}>
            <Text style={styles.dishName}>{dish.name}</Text>
            <Text style={styles.dishCategory}>Category: {dish.category}</Text>
            <Text style={styles.dishDescription}>{dish.description}</Text>
            <Text style={styles.dishPrice}>Price: R{dish.price.toFixed(2)}</Text>

            <TouchableOpacity
              style={styles.buttonRemove}
              onPress={() => handleRemoveDish(dish.id)}
            >
              <Text style={styles.buttonText}>Remove Dish</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ChefMenu;

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
  input: {
    width: '100%',
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  picker: {
    width: '100%',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  buttonAdd: {
    backgroundColor: '#d2691e',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dishList: {
    marginTop: 20,
  },
  dishCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dishCategory: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  dishDescription: {
    fontSize: 16,
    marginTop: 5,
  },
  dishPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  buttonRemove: {
    backgroundColor: '#d2691e',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
});

reserve:
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

fullmenu:
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DishContext } from './DishContext';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  FullMenu: undefined;
  Reservations: undefined;
};

type FullMenuNavigationProp = StackNavigationProp<RootStackParamList, 'Reservations'>;

const FullMenu = () => {
  const { dishes, reserveDishes } = useContext(DishContext)!;
  const [filter, setFilter] = useState('All');
  const [selectedDishes, setSelectedDishes] = useState<number[]>([]);
  const [averagePrice, setAveragePrice] = useState<number | null>(null);
  const navigation = useNavigation<FullMenuNavigationProp>();


  useEffect(() => {
    if (dishes.length > 0) {
      const total = dishes.reduce((sum, dish) => sum + dish.price, 0);
      const avg = total / dishes.length;
      setAveragePrice(avg);
    } else {
      setAveragePrice(null); 
    }
  }, [dishes]);

  const filteredDishes = dishes.filter((dish) => {
    if (filter === 'All') return true;
    return dish.category === filter;
  });

  const toggleDishSelection = (dishId: number) => {
    setSelectedDishes((prevSelectedDishes) =>
      prevSelectedDishes.includes(dishId)
        ? prevSelectedDishes.filter((id) => id !== dishId)
        : [...prevSelectedDishes, dishId]
    );
  };

  const handleReserve = () => {
    const selectedDishObjects = dishes.filter((dish) => selectedDishes.includes(dish.id));
    reserveDishes(selectedDishObjects);
    navigation.navigate('Reservations');
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton} onPress={() => setFilter('All')}>
          <Text style={styles.filterButtonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => setFilter('Starter')}>
          <Text style={styles.filterButtonText}>Starters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => setFilter('Main')}>
          <Text style={styles.filterButtonText}>Main</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => setFilter('Dessert')}>
          <Text style={styles.filterButtonText}>Dessert</Text>
        </TouchableOpacity>
      </View>

      {/* Display average price */}
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>Average Price of Dishes: </Text>
        {averagePrice !== null ? (
          <Text style={styles.priceValue}>R{averagePrice.toFixed(2)}</Text>
        ) : (
          <Text style={styles.noData}>No dishes available</Text>
        )}
      </View>

      <ScrollView style={styles.scrollContainer}>
        {filteredDishes.map((dish) => (
          <View key={dish.id} style={styles.dishContainer}>
            <TouchableOpacity
              style={[
                styles.checkbox,
                selectedDishes.includes(dish.id) && styles.checkboxSelected,
              ]}
              onPress={() => toggleDishSelection(dish.id)}
            >
              {selectedDishes.includes(dish.id) && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleDishSelection(dish.id)} style={styles.dishDetails}>
              <Text style={styles.item}>{dish.name}</Text>
              <Text style={styles.description}>{dish.description}</Text>
              <Text style={styles.price}>R{dish.price}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.reserveButton} onPress={handleReserve}>
        <Text style={styles.reserveButtonText}>Reserve</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FullMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5deb3',
    padding: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: '#d2691e',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  priceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d2691e',
  },
  noData: {
    fontSize: 18,
    color: '#777',
  },
  dishContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 4,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  checkboxSelected: {
    backgroundColor: '#d2691e',
  },
  checkmark: {
    fontSize: 18,
    color: '#fff',
  },
  dishDetails: {
    flex: 1,
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
  reserveButton: {
    backgroundColor: '#d2691e',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  reserveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

dishcontext:
import React, { createContext, useState, ReactNode } from 'react';

interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string; 
}

interface DishContextType {
  dishes: Dish[];
  addDish: (dish: Dish) => void;
  deleteDish: (id: number) => void;
  reserveDishes: (dishes: Dish[]) => void;
  setReservedDishes: (dishes: Dish[]) => void;
  reservedDishes: Dish[];
  getAveragePriceByCourse: (course: string) => number;
}

export const DishContext = createContext<DishContextType | undefined>(undefined);

export const DishProvider = ({ children }: { children: ReactNode }) => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [reservedDishes, setReservedDishes] = useState<Dish[]>([]);

  const addDish = (dish: Dish) => {
    setDishes((prevDishes) => [...prevDishes, dish]);
  };

  const deleteDish = (id: number) => {
    setDishes((prevDishes) => prevDishes.filter(dish => dish.id !== id));
  };

  const reserveDishes = (dishes: Dish[]) => {
    setReservedDishes(dishes);
  };

 
  const getAveragePriceByCourse = (course: string): number => {
    const filteredDishes = dishes.filter(dish => dish.category === course);
    if (filteredDishes.length === 0) return 0;
    const total = filteredDishes.reduce((sum, dish) => sum + dish.price, 0);
    return total / filteredDishes.length;
  };

  return (
    <DishContext.Provider value={{ dishes, addDish, deleteDish, reserveDishes, setReservedDishes, reservedDishes, getAveragePriceByCourse }}>
      {children}
    </DishContext.Provider>
  );
};



