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
