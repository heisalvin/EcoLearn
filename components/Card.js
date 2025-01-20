import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Card({ content, onReadMore }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{content.title}</Text>
      <TouchableOpacity onPress={onReadMore}>
        <Text style={styles.readMore}>Read More...</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 15,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  readMore: {
    marginTop: 10,
    color: 'green',
  },
});
