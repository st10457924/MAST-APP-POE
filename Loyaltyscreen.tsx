import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LoyaltyScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loyalty Program</Text>
      <Text style={styles.description}>
        Earn points for every order and redeem exciting rewards!
      </Text>
    </View>
  );
};

export default LoyaltyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
});
