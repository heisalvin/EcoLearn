import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PointsProvider } from './context/PointsContext'; // Context Provider
import TabNavigator from './navigation/TabNavigator'; // Tab Navigator
import FriendsScreen from './screens/FriendsScreen'; // Friends Screen

const Stack = createStackNavigator(); // Stack Navigator

export default function App() {
  return (
    <PointsProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {/* Main Tab Navigation */}
          <Stack.Screen
            name="MainTabs"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          {/* Friends Screen with Leaderboard */}
          <Stack.Screen
            name="Friends"
            component={FriendsScreen}
            options={{ title: 'Friends & Leaderboard' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PointsProvider>
  );
}
