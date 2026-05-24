import React from "react";

import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useThemeStore } from "../store/useThemeStore";

import { useAuthStore } from "../store/useAuthStore";

import { themes } from "../theme/theme";

const ProfileScreen = () => {
  const theme = useThemeStore(
    (state) => state.theme
  );

  const colors = themes[theme];

  const currentUser = useAuthStore(
    (state) => state.currentUser
  );

  const logout = useAuthStore(
    (state) => state.logout
  );

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },

        {
          text: "Logout",

          style: "destructive",

          onPress: logout,
        },
      ]
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            colors.background,
        },
      ]}
    >
      {/* HEADER */}

      <View
        style={[
          styles.profileCard,
          {
            backgroundColor:
              colors.card,
          },
        ]}
      >
        {/* AVATAR */}

        <View
          style={[
            styles.avatar,
            {
              backgroundColor:
                colors.primary,
            },
          ]}
        >
          <Text style={styles.avatarText}>
            {currentUser?.name
              ?.charAt(0)
              ?.toUpperCase()}
          </Text>
        </View>

        {/* USER INFO */}

        <Text
          style={[
            styles.name,
            {
              color: colors.text,
            },
          ]}
        >
          {currentUser?.name}
        </Text>

        <Text
          style={[
            styles.email,
            {
              color: colors.text,
            },
          ]}
        >
          {currentUser?.email}
        </Text>
      </View>

      {/* MENU SECTION */}

      <View
        style={[
          styles.menuContainer,
          {
            backgroundColor:
              colors.card,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.menuItem}
        >
          <View style={styles.menuLeft}>
            <Ionicons
              name="person-outline"
              size={22}
              color={colors.text}
            />

            <Text
              style={[
                styles.menuText,
                {
                  color: colors.text,
                },
              ]}
            >
              Edit Profile
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.text}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
        >
          <View style={styles.menuLeft}>
            <Ionicons
              name="settings-outline"
              size={22}
              color={colors.text}
            />

            <Text
              style={[
                styles.menuText,
                {
                  color: colors.text,
                },
              ]}
            >
              Settings
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.text}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
        >
          <View style={styles.menuLeft}>
            <Ionicons
              name="moon-outline"
              size={22}
              color={colors.text}
            />

            <Text
              style={[
                styles.menuText,
                {
                  color: colors.text,
                },
              ]}
            >
              Theme: {theme}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* LOGOUT BUTTON */}

      <TouchableOpacity
        style={[
          styles.logoutButton,
          {
            backgroundColor:
              colors.primary,
          },
        ]}
        onPress={handleLogout}
      >
        <Ionicons
          name="log-out-outline"
          size={22}
          color="white"
        />

        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 20,
  },

  profileCard: {
    alignItems: "center",

    paddingVertical: 32,

    borderRadius: 24,

    marginBottom: 24,
  },

  avatar: {
    width: 90,

    height: 90,

    borderRadius: 45,

    justifyContent: "center",

    alignItems: "center",

    marginBottom: 16,
  },

  avatarText: {
    color: "white",

    fontSize: 36,

    fontWeight: "bold",
  },

  name: {
    fontSize: 24,

    fontWeight: "700",

    marginBottom: 6,
  },

  email: {
    fontSize: 15,

    opacity: 0.7,
  },

  menuContainer: {
    borderRadius: 24,

    paddingVertical: 8,
  },

  menuItem: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent:
      "space-between",

    paddingHorizontal: 18,

    paddingVertical: 18,
  },

  menuLeft: {
    flexDirection: "row",

    alignItems: "center",

    gap: 12,
  },

  menuText: {
    fontSize: 16,

    fontWeight: "500",
  },

  logoutButton: {
    marginTop: "auto",

    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    gap: 10,

    paddingVertical: 18,

    borderRadius: 18,
  },

  logoutText: {
    color: "white",

    fontSize: 16,

    fontWeight: "700",
  },
});