import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import DashboardScreen from './screens/DashboardScreen';
import CreateTripScreen from './screens/CreateTripScreen';
import TripDetailsScreen from './screens/TripDetailsScreen';
import ItineraryScreen from './screens/ItineraryScreen';
import BudgetScreen from './screens/BudgetScreen';
import MapScreen from './screens/MapScreen';
import { COLORS } from './theme';
import { View, Text } from 'react-native';

const Stack = createStackNavigator();

const linking = {
  prefixes: ['http://localhost:8081', 'tripnest://'],
  config: {
    screens: {
      Login: 'login',
      Signup: 'register',
      Dashboard: 'home',
      CreateTrip: 'create-trip',
      TripDetails: 'trip',
      Itinerary: 'itinerary',
      Budget: 'budget',
      Map: 'map',
    },
  },
};

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: COLORS.background }
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="CreateTrip" component={CreateTripScreen} />
        <Stack.Screen name="TripDetails" component={TripDetailsScreen} />
        <Stack.Screen name="Itinerary" component={ItineraryScreen} />
        <Stack.Screen name="Budget" component={BudgetScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
