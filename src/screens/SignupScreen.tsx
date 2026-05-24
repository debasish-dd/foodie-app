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

const SignupScreen = ({
  navigation,
}: any) => {
  const signup = useAuthStore(
    (state) => state.signup
  );

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSignup = () => {
    if (
      !name ||
      !email ||
      !password
    ) {
      Alert.alert(
        "Error",
        "All fields required"
      );

      return;
    }

    const result = signup(
      name,
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
        Create Account
      </Text>

      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

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
        onPress={handleSignup}
      >
        <Text style={styles.buttonText}>
          Signup
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            "Login"
          )
        }
      >
        <Text>
          Already have account?
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

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