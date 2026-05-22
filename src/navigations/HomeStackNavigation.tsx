import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/MainScreen'
import RestaurantDetailScreen from '../screens/RestaurantDetailScreen'

const Stack = createNativeStackNavigator()

const HomeStackNavigation = () => {
  return (
    <Stack.Navigator>
      
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="Restaurant"
        component={RestaurantDetailScreen}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}

export default HomeStackNavigation