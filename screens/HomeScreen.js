import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  ImageBackground,
  ScrollView,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../components/Card';
import { dummyContent } from '../data/dummyData';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const slides = [
  {
    title: 'Welcome to Eco-Learn📖',
    subtitle: 'Your guide to responsible waste disposal.',
  },
  {
    title: 'Refer a Friend via Gmail',
    subtitle: 'Earn 1000 eco points and an honor badge🌟.',
  },
  {
    title: 'Your Friend Joins Eco-Learn',
    subtitle: 'Let’s keep the environment clean and healthy!♻️🌍',
  },
  {
    title: 'Boost Your Impact with EcoBin🤖',
    subtitle: 'Complete real-world challenges via Telegram to earn bonus points🌍!',
  },
];


const REWARD_COOLDOWN = 30 * 60 * 1000; // 30 minutes in milliseconds

export default function HomeScreen({ route }) {
  const { initialPoints = 0 } = route.params || {};
  const [points, setPoints] = useState(initialPoints);
  const [lastRewardClaimed, setLastRewardClaimed] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [relatedIndex, setRelatedIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const glowAnim = useState(new Animated.Value(0))[0];
  

  const canClaimReward = () => {
    if (!lastRewardClaimed) return true;
    return Date.now() - lastRewardClaimed > REWARD_COOLDOWN;
  };

  useEffect(() => {
    const loadLastClaim = async () => {
      const savedTime = await AsyncStorage.getItem('lastRewardClaimed');
      if (savedTime) setLastRewardClaimed(parseInt(savedTime));
    };
    loadLastClaim();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000); // 5000ms = 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentSlide]); // Reset timer when slide changes

  useEffect(() => {
    if (canClaimReward()) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      glowAnim.setValue(0);
    }
  }, [lastRewardClaimed]); // ✅ CORRECT: Use state variable instead
  

  // Keep existing handleNextSlide for manual taps

  

  const handleRewardPress = async () => {
    if (canClaimReward()) {
      const newTime = Date.now();
      await AsyncStorage.setItem('lastRewardClaimed', newTime.toString());
      setLastRewardClaimed(newTime);
      setPoints(points + 10);
      Alert.alert('Reward Claimed!', 'Come back in 30 minutes for more points!');
    } else {
      const nextAvailable = lastRewardClaimed + REWARD_COOLDOWN;
      const minutesLeft = Math.ceil((nextAvailable - Date.now()) / 60000);
      Alert.alert('Reward Cooldown', `Next reward available in ${minutesLeft} minutes`);
    }
  };

  const handleReadMore = (content) => {
    setSelectedContent(content);
    setRelatedIndex(0);
    setPoints(points + 10);
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


  const handleNextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const currentContent =
  relatedIndex === 0
    ? selectedContent
    : selectedContent?.relatedContent?.[relatedIndex - 1];

  return (
    <ImageBackground source={require('../assets/background.jpg')} style={styles.background}>
      <ScrollView style={styles.container}>
        <View style={styles.pointsContainer}>
          <FontAwesome name="star" size={24} color="gold" />
          <Text style={styles.pointsText}>{points} Points</Text>
        </View>

        <TouchableOpacity style={styles.slideContainer} onPress={handleNextSlide}>
          <View style={styles.slide}>
            <Text style={styles.slideTitle}>{slides[currentSlide].title}</Text>
            <Text style={styles.slideSubtitle}>{slides[currentSlide].subtitle}</Text>
            <Text style={styles.tapText}>(Tap anywhere to continue)</Text>
          </View>
        </TouchableOpacity>
          {/* Add this below the slide component */}
          <View style={styles.indicatorContainer}>
            {slides.map((_, index) => (
              <View 
                key={index}
                style={[
                  styles.indicator,
                  index === currentSlide && styles.activeIndicator
                ]}
              />
            ))}
          </View>

         <Animated.View 
          style={[
            styles.glowContainer,
            {
              shadowOpacity: glowAnim.interpolate({ inputRange: [0, 1], outputRange: [0.2, 1] }),
              shadowRadius: glowAnim.interpolate({ inputRange: [0, 1], outputRange: [5, 15] }),
              borderColor: 'gold',
            }
          ]}
          >
          <TouchableOpacity 
            style={[styles.rewardButton, !canClaimReward() && styles.disabledButton]} 
            onPress={handleRewardPress}
            disabled={!canClaimReward()}
          >
            <Text style={styles.rewardText}>
              {canClaimReward() ? 'Reap Reward' : 'Come Back Later'}
            </Text>
          </TouchableOpacity>
        </Animated.View>


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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  pointsContainer: {
    position: 'absolute',
    top: 2,
    right: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 1,
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
    marginTop: 60,
    marginBottom: 30,  // Increased from 20 to create more space
  },
  slide: {
    width: '100%',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
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
  disabledButton: {
    backgroundColor: '#6b8e23',
    opacity: 0.7,
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
indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,     // Increased from 10
    marginBottom: 15,  // Added bottom margin
  },
indicator: {
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: '#ccc',
  marginHorizontal: 4,
},
activeIndicator: {
  backgroundColor: '#4CAF50',
},
rewardButtonContainer: {
    backgroundColor: 'green',
    borderRadius: 5,
    padding: 10,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 15,  // Reduced from 20
    marginTop: 10,     // Added top margin
  },
  glowOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'gold',
    borderRadius: 5,
  },
  rewardText: {
    color: 'white',
    fontWeight: 'bold',
    position: 'relative',
    zIndex: 1,
  },
  slideSubtitle: {
  fontSize: 16,
  textAlign: 'center',
  marginBottom: 20,
  // Add line height for better spacing
  lineHeight: 24,
},
});
