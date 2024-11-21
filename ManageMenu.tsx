import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';
import { DishContext } from './DishContext';

const ManageMenuItems = () => {
  const { dishes, addDish, deleteDish } = useContext(DishContext);
  const [dishName, setDishName] = useState('');

  const handleAddDish = () => {
    if (dishName.trim()) {
      addDish(dishName);
      setDishName('');
    } else {
      Alert.alert('Please enter a dish name.');
    }
  };

  const handleDeleteDish = (id: number) => {
    deleteDish(id);
  };

  return (
    <View>
      <Text>Add Menu Item</Text>
      <TextInput
        placeholder="Enter dish name"
        value={dishName}
        onChangeText={setDishName}
      />
      <Button title="Add Dish" onPress={handleAddDish} />

      <Text>Current Menu Items</Text>
      <FlatList
        data={dishes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Button title="Remove" onPress={() => handleDeleteDish(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default ManageMenuItems;
