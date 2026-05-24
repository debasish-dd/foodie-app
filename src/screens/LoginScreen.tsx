import React, { useState } from "react";

import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useAuthStore } from "../store/useAuthStore";

const LoginScreen = ({
  navigation,
}: any) => {
  const signin = useAuthStore(
    (state) => state.signin
  );

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSignin = () => {
    if (!email || !password) {
      Alert.alert(
        "Error",
        "All fields required"
      );

      return;
    }

    const result = signin(
      email,
      password
    );

    Alert.alert(
      result.success
        ? "Success"
        : "Error",
      result.message
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome Back
      </Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSignin}
      >
        <Text style={styles.buttonText}>
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            "Signup"
          )
        }
      >
        <Text>
          Don't have account?
          Signup
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",

    padding: 20,
  },

  title: {
    fontSize: 32,

    fontWeight: "bold",

    marginBottom: 24,
  },

  input: {
    borderWidth: 1,

    borderColor: "#ccc",

    borderRadius: 12,

    padding: 14,

    marginBottom: 16,
  },

  button: {
    backgroundColor: "black",

    padding: 16,

    borderRadius: 12,

    alignItems: "center",
  },

  buttonText: {
    color: "white",

    fontWeight: "bold",
  },
});