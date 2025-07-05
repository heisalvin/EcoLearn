import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Linking, ImageBackground, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const leaderboardData = [
  { rank: 1, name: 'Alice', points: 3200 },
  { rank: 2, name: 'Test', points: 3180},
  { rank: 3, name: 'Bob', points: 1050 },
  { rank: 4, name: 'Charlie', points: 800 },
];

const friendsData = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

export default function FriendsScreen({ route }) {
  // Get points from route params (passed from parent navigator)
  const { homePoints = 0, quizPoints = 0 } = route.params || {};
  const [isModalVisible, setModalVisible] = useState(false);
  
  // Calculate total points from both sources
  const totalPoints = homePoints + quizPoints;

  <Text style={styles.totalPointsText}>Total Points: {totalPoints}</Text>

  const handleReferFriend = () => {
    const subject = encodeURIComponent("Join Me on Eco-Learn!");
    const body = encodeURIComponent(
      "Hey! Join me to help clean our environment and make it a better place. Please join me on Eco-Learn to have some fun while learning about sustainability!"
    );
    const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
    Linking.openURL(mailtoLink);
  };

  const openTelegramBot = () => {
    Linking.openURL('https://t.me/Eco_Bin_bot');
  };


  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Progress Tracker */}
        <View style={styles.progressTracker}>
          <Icon name="trophy" size={50} color="#FFD700" />
          <Text style={styles.progressText}>Your Progress: 3/10 Referrals</Text>
          <Text style={styles.totalPointsText}>Total Points: 3150</Text>
        </View>

        {/* Leaderboard */}
        <Text style={styles.heading}>Leaderboard</Text>
        <View style={styles.leaderboardHeader}>
          <Text style={styles.leaderboardTitle}>Rank</Text>
          <Text style={styles.leaderboardTitle}>Name</Text>
          <Text style={styles.leaderboardTitle}>Points</Text>
        </View>
        <FlatList
          data={leaderboardData}
          keyExtractor={(item) => item.rank.toString()}
          renderItem={({ item }) => (
            <View style={styles.leaderboardItem}>
              <Text>{item.rank}</Text>
              <Text>{item.name}</Text>
              <Text>{item.points}</Text>
            </View>
          )}
        />

        {/* Friends Section */}
        <View style={styles.friendsContainer}>
          <Text style={styles.friendsText}>Friends (3)</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.fullListText}>Full List</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.noFriendsContainer}>
          <Text>You have 3 referrals</Text>
        </View>

        {/* Full List Modal */}
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Your Friends</Text>
              <FlatList
                data={friendsData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.friendItem}>
                    <Text>{item.name}</Text>
                  </View>
                )}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Remaining Buttons */}
        <TouchableOpacity style={styles.referralButton} onPress={handleReferFriend}>
          <Text style={styles.referralText}>Refer a Friend (via Email)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkButton} onPress={openTelegramBot}>
          <Text style={styles.linkText}>Go to EcoBin Bot</Text>
        </TouchableOpacity>

        <Text style={styles.footerLinks}>More Educational Content:</Text>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => Linking.openURL('https://youtu.be/PJnJ8mK3Q3g?si=iQsKswqnjooLPUl1')}
        >
          <Icon name="youtube-play" size={24} color="red" />
          <Text style={styles.iconText}>Watch on YouTube</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => Linking.openURL('https://everydayrecycler.com/blog/')}
        >
          <Icon name="globe" size={24} color="blue" />
          <Text style={styles.iconText}>More Resources</Text>
        </TouchableOpacity>
      </View>
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
  progressTracker: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#4caf50',
    borderRadius: 8,
    marginBottom: 20,
  },
  progressText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  totalPointsText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  leaderboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: '#4caf50',
    borderRadius: 5,
  },
  leaderboardTitle: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  leaderboardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  friendsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },
  friendsText: {
    fontWeight: 'bold',
  },
  fullListText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  noFriendsContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
  },
  referralButton: {
    backgroundColor: '#ff9800',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
  },
  referralText: {
    color: 'white',
    fontWeight: 'bold',
  },
  linkButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  linkText: {
    color: 'white',
    fontWeight: 'bold',
  },
  footerLinks: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 10,
  },
  iconText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  friendItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
