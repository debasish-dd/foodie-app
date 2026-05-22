import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import ProfileScreen from '../screens/ProfileScreen'
import SettingsScreen from '../screens/SettingScreen'

const Stack = createNativeStackNavigator()

const ProfileStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerTitleAlign: "center",
          title: "Profile",
          headerShown: false
        }}
      />

      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
      />
    </Stack.Navigator>
  )
}

export default ProfileStackNavigation