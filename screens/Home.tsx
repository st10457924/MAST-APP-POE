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
