import React from "react";
import { TouchableOpacity } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import MainScreen from "../screens/MainScreen";
import OrderScreen from "../screens/OrderScreen";
import StackNavigation from "./StackNavigation";

import { themes } from "../theme/theme";
import { useThemeStore } from "../store/useThemeStore";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const theme = useThemeStore((state) => state.theme);

  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const colors = themes[theme];

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTitleAlign: "center",
        headerTintColor: colors.text,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: "transparent",
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "gray",
        sceneStyle: {
          backgroundColor: colors.background,
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={toggleTheme}
            style={{
              marginRight: 16,
            }}
            hitSlop={{
              top: 10,
              bottom: 10,
              left: 10,
              right: 10,
            }}
          >
            <Ionicons
              name={theme === "dark" ? "moon" : "sunny"}
              size={24}
              color={colors.text}
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Tab.Screen
        name="Home"
        component={MainScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Orders"
        component={OrderScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="clipboard" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={StackNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
