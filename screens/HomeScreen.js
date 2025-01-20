import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome for the star icon
import Card from '../components/Card'; // Assuming Card component exists
import { dummyContent } from '../data/dummyData';

const slides = [
  {
    title: 'Welcome to Eco-Learn',
    subtitle: 'Your guide to responsible waste disposal.',
  },
  {
    title: 'Refer a Friend via Gmail',
    subtitle: 'Earn 1000 eco points and an honor badge.',
  },
  {
    title: 'Your Friend Joins Eco-Learn',
    subtitle: 'Let’s keep the environment clean and healthy!',
  },
];

export default function HomeScreen() {
  const [points, setPoints] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [relatedIndex, setRelatedIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleReadMore = (content) => {
    setSelectedContent(content);
    setRelatedIndex(0);
    setPoints(points + 10); // Increment points when content is read
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  const handleNext = () => {
    const hasMoreContent = selectedContent?.relatedContent && relatedIndex < selectedContent.relatedContent.length;
    if (hasMoreContent) {
      setRelatedIndex((prevIndex) => prevIndex + 1);
    } else {
      closeModal();
    }
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const currentContent =
    relatedIndex === 0
      ? selectedContent
      : selectedContent?.relatedContent?.[relatedIndex - 1];

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.background}
    >
      <ScrollView style={styles.container}>
        {/* Points Display */}
        <View style={styles.pointsContainer}>
          <FontAwesome name="star" size={24} color="gold" />
          <Text style={styles.pointsText}>{points} Points</Text>
        </View>

        {/* Slide Show */}
        <TouchableOpacity style={styles.slideContainer} onPress={handleNextSlide}>
          <View style={styles.slide}>
            <Text style={styles.slideTitle}>{slides[currentSlide].title}</Text>
            <Text style={styles.slideSubtitle}>{slides[currentSlide].subtitle}</Text>
            <Text style={styles.tapText}>(Tap anywhere to continue)</Text>
          </View>
        </TouchableOpacity>

        {/* Reward Button */}
        <TouchableOpacity style={styles.rewardButton} onPress={() => setPoints(points + 10)}>
          <Text style={styles.rewardText}>Reap Reward</Text>
        </TouchableOpacity>

        {/* Content Cards */}
        <View style={styles.cards}>
          {dummyContent.map((item, index) => (
            <Card key={index} content={item} onReadMore={() => handleReadMore(item)} />
          ))}
        </View>

        {/* Popup Modal */}
        {currentContent && (
          <Modal visible={modalVisible} transparent animationType="fade">
            <View style={styles.popupOverlay}>
              <View style={styles.popupContent}>
                <Text style={styles.popupTitle}>{currentContent.title}</Text>
                <Text style={styles.popupText}>{currentContent.description}</Text>
                <View style={styles.buttonContainer}>
                  <Button title="Close" onPress={closeModal} />
                  <Button
                    title="Next"
                    onPress={handleNext}
                    disabled={
                      !selectedContent.relatedContent ||
                      relatedIndex >= selectedContent.relatedContent.length
                    }
                  />
                </View>
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent for readability
  },
  pointsContainer: {
    position: 'absolute', // Keep it fixed at the top-right
    top: 10, // Adjusted for better placement
    right: 15,
    flexDirection: 'row', // Aligns star icon and text
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 1, // Keeps it above other elements
  },
  pointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 5,
  },
  slideContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60, // Reduced to prevent unnecessary gaps
    marginBottom: 20,
  },
  slide: {
    width: '100%',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  slideTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  slideSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  tapText: {
    fontSize: 14,
    color: 'gray',
  },
  rewardButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  rewardText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cards: {
    flex: 1,
  },
  popupOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  popupText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
