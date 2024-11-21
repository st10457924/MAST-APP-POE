// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { useNavigation } from '@react-navigation/native';



// const ChefLogin  = ({ navigation }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
  

//   const handleLogin = () => {
//     if (username === '' || password === '') {
//       Alert.alert('Error', 'Please enter both username and password');
//     } else {
//       Alert.alert('Login Success', `Welcome, ${username}!`);
//       navigation.navigate('Chefmenu');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Chef Login</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         value={username}
//         onChangeText={setUsername}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry 
//       />
//       <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Chefmenu')}>
//         <Text style={styles.buttonText}>Chef Login</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default ChefLogin;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5deb3',
//     padding: 20, 
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     padding: 10,
//     marginVertical: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//   },
//   button: {
//     backgroundColor: '#d2691e',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     marginTop: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     textAlign: 'center', 
//   },
// });
