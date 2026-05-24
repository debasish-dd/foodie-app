import { create } from "zustand";

import {
  persist,
  createJSONStorage,
} from "zustand/middleware";

import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  id: string;

  name: string;

  email: string;

  password: string;
};

type AuthState = {
  users: User[];

  currentUser: User | null;

  isLoggedIn: boolean;

  signup: (
    name: string,
    email: string,
    password: string
  ) => {
    success: boolean;
    message: string;
  };

  signin: (
    email: string,
    password: string
  ) => {
    success: boolean;
    message: string;
  };

  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      users: [],

      currentUser: null,

      isLoggedIn: false,

      signup: (
        name,
        email,
        password
      ) => {
        const existingUser =
          get().users.find(
            (user) =>
              user.email === email
          );

        if (existingUser) {
          return {
            success: false,
            message:
              "User already exists",
          };
        }

        const newUser: User = {
          id: Date.now().toString(),

          name,

          email,

          password,
        };

        set((state) => ({
          users: [
            ...state.users,
            newUser,
          ],

          currentUser: newUser,

          isLoggedIn: true,
        }));

        return {
          success: true,
          message:
            "Signup successful",
        };
      },

      signin: (email, password) => {
        const user = get().users.find(
          (user) =>
            user.email === email &&
            user.password === password
        );

        if (!user) {
          return {
            success: false,
            message:
              "Invalid credentials",
          };
        }

        set({
          currentUser: user,

          isLoggedIn: true,
        });

        return {
          success: true,
          message:
            "Signin successful",
        };
      },

      logout: () => {
        set({
          currentUser: null,

          isLoggedIn: false,
        });
      },
    }),
    {
      name: "auth-storage",

      storage: createJSONStorage(
        () => AsyncStorage
      ),
    }
  )
);