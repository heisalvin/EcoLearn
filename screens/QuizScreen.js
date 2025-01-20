import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome for the star icon

const quizQuestions = [
  {
    question: 'What is the best way to dispose of plastic waste?',
    options: ['Burn it', 'Recycle it', 'Throw it in the ocean'],
    answer: 1,
  },
  {
    question: 'Which of these is an eco-friendly habit?',
    options: ['Using plastic bags', 'Recycling', 'Leaving lights on'],
    answer: 1,
  },
  {
    question: 'What does reducing your carbon footprint mean?',
    options: ['Driving more', 'Using less energy', 'Buying more things'],
    answer: 1,
  },
  {
    question: 'Which of these helps reduce waste?',
    options: ['Composting', 'Throwing food away', 'Burning garbage'],
    answer: 0,
  },
  {
    question: 'What is the most sustainable energy source?',
    options: ['Fossil fuels', 'Solar energy', 'Coal'],
    answer: 1,
  },
];

export default function QuizScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [points, setPoints] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionPress = (index) => {
    setSelectedOption(index);
    if (index === quizQuestions[currentQuestion].answer) {
      setPoints((prevPoints) => prevPoints + 20); // Ensure proper state updates
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setSelectedOption(null);
    } else {
      alert(`Quiz completed! You scored ${points} points.`);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Points Container */}
          <View style={styles.pointsContainer}>
            <FontAwesome name="star" size={24} color="gold" />
            <Text style={styles.pointsText}>{points} Points</Text>
          </View>

          {/* Quiz Question */}
          <Text style={styles.question}>{quizQuestions[currentQuestion].question}</Text>

          {/* Quiz Options */}
          {quizQuestions[currentQuestion].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedOption === index && styles.selectedOption,
              ]}
              onPress={() => handleOptionPress(index)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}

          {/* Next Button */}
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  pointsContainer: {
    position: 'absolute', // Keep it at the top-right
    top: 10, // Adjusted closer to the top
    right: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 10, // Keep it above other content
  },
  pointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 5,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50, // Ensures space below the points container
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: 'lightgreen',
  },
  optionText: {
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  nextText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
