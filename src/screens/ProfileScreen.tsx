import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from '@react-navigation/elements'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp} from '@react-navigation/native-stack'
import { SafeAreaView } from 'react-native-safe-area-context'

type RootStackParamList = {
  Profile: undefined
  Setting: undefined
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>


const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>()
  return (
    <SafeAreaView>

    <View>
      <Text>ProfileScreen</Text>
     <Pressable onPress={() => navigation.navigate('Setting')}>
      <Text>
        go to setting
      </Text>
     </Pressable>
    </View>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})