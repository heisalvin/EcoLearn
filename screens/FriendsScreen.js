import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Linking, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

const leaderboardData = [
  { rank: 1, name: 'Alice', points: 1200 },
  { rank: 2, name: 'Bob', points: 950 },
  { rank: 3, name: 'Charlie', points: 800 },
];

export default function FriendsScreen() {
  const handleReferFriend = () => {
    const subject = encodeURIComponent("Join Me on Eco-Learn!");
    const body = encodeURIComponent(
      "Hey! Join me to help clean our environment and make it a better place. Please join me on Eco-Learn to have some fun while learning about sustainability!"
    );
    const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
    
    Linking.openURL(mailtoLink);
  };

  const openTelegramBot = () => {
    Linking.openURL('https://t.me/ecobin_bot'); // Example Telegram link
  };

  return (
    <ImageBackground
      source={require('../assets/background.jpg')} // Update the path to your image file
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Leaderboard</Text>
        <FlatList
          data={leaderboardData}
          keyExtractor={(item) => item.rank.toString()}
          renderItem={({ item }) => (
            <View style={styles.leaderboardItem}>
              <Text>{item.rank}. {item.name}</Text>
              <Text>{item.points} points</Text>
            </View>
          )}
        />
        
        {/* Refer a Friend Button */}
        <TouchableOpacity style={styles.referralButton} onPress={handleReferFriend}>
          <Text style={styles.referralText}>Refer a Friend (via Email)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkButton} onPress={openTelegramBot}>
          <Text style={styles.linkText}>Go to EcoBin Bot</Text>
        </TouchableOpacity>

        <Text style={styles.footerLinks}>More Educational Content:</Text>

        {/* YouTube Button with Icon */}
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => Linking.openURL('https://youtu.be/PJnJ8mK3Q3g?si=iQsKswqnjooLPUl1')} // Replace with actual video URL
        >
          <Icon name="youtube-play" size={24} color="red" />
          <Text style={styles.iconText}>Watch on YouTube</Text>
        </TouchableOpacity>

        {/* Web Browser Button with Icon */}
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => Linking.openURL('https://everydayrecycler.com/blog/')} // Replace with actual resource URL
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
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  leaderboardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
});

