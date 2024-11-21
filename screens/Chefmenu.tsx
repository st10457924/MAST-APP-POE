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
