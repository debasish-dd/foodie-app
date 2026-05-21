import React from 'react'
import { Pressable, Text } from 'react-native'
import { useThemeStore } from '../store/useThemeStore'

const ThemeButton = () => {
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)

  return (
    <Pressable
      onPress={toggleTheme}
      style={{
        padding: 16,
        borderRadius: 12,
        backgroundColor: theme === 'light' ? '#000' : '#FFF',
      }}
    >
      <Text
        style={{
          color: theme === 'light' ? '#FFF' : '#000',
          fontWeight: 'bold',
        }}
      >
        Toggle Theme
      </Text>
    </Pressable>
  )
}

export default ThemeButton