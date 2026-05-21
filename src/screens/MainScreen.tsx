import React from "react";
import {
  Button,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { themes } from "../theme/theme";
import { useThemeStore } from "../store/useThemeStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { restaurantsData } from "../../data";

const restaurants = restaurantsData.restaurants;

const sortRestaurantsByDistance = (restaurants: unknown) => {
  // 1. Defend against invalid payloads
  if (!Array.isArray(restaurants)) {
    console.warn(
      "sortRestaurantsByDistance expected an array but received:",
      typeof restaurants,
    );
    return [];
  }

  // 2. Map, Sort, Map (Schwartzian Transform) for O(N) string parsing
  const mapped = restaurants.map((restaurant) => {
    // Extract the number, ignoring the " km" string
    const parsedDist = parseFloat(restaurant?.distance);

    return {
      originalRef: restaurant,
      numericValue: isNaN(parsedDist) ? Infinity : parsedDist,
    };
  });

  // 3. Perform the mathematical sort
  mapped.sort((a, b) => a.numericValue - b.numericValue);

  // 4. Return an array of the original objects in the new order
  return mapped.map((item) => item.originalRef);
};

const HomeScreen = () => {
  // getting data from the store
  const theme = useThemeStore((state) => state.theme);
  const colors = themes[theme];
  const sortedRestaurants = sortRestaurantsByDistance(restaurants);

  const renderFeaturedItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: colors.primary }]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={[styles.cardTitle, { color: colors.text }]}>
        {item.name}
      </Text>
      <Text style={[styles.cardText, { color: colors.text }]}>
        {item.cuisine.join(" · ")}
      </Text>
      <Text style={[styles.cardText, { color: colors.text }]}>
        {item.rating} ⭐ · {item.deliveryTime} · {item.priceLevel}
      </Text>
    </View>
  );

  const renderPopularItem = ({ item }) => (
    <View style={[styles.sideCard, { backgroundColor: colors.primary }]}>
      <Image source={{ uri: item.image }} style={styles.sideCardImage} />
      <View style={styles.sideCardContent}>
        <Text style={[styles.sideCardTitle, { color: colors.text }]}>
          {item.name}
        </Text>
        <Text style={[styles.cardText, { color: colors.text }]}>
          {item.cuisine.join(" · ")}
        </Text>
        <Text style={[styles.cardText, { color: colors.text }]}>
          {item.rating} ⭐ · {item.deliveryTime} · {item.priceLevel}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <FlatList
          data={sortedRestaurants}
          keyExtractor={(restaurant) => restaurant.id}
          renderItem={renderPopularItem}
          ListHeaderComponent={
            <>
              {/* Search Section */}
              <View
                style={[
                  styles.searchContainer,
                  { backgroundColor: colors.card, borderColor: colors.primary },
                ]}
              >
                <Ionicons
                  name="search"
                  size={20}
                  color={colors.text}
                  style={styles.searchIcon}
                />
                <TextInput
                  placeholder="Search restaurant or dish"
                  placeholderTextColor={colors.text}
                  style={[styles.inputBar, { color: colors.text }]}
                />
              </View>

              {/* Featured Restaurants Section */}
              <Text style={[styles.heading, { color: colors.text }]}>
                Featured Restaurants
              </Text>
              <FlatList
                data={restaurants}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(restaurant) => restaurant.id}
                renderItem={renderFeaturedItem}
              />

              {/* Near You Section */}
              <Text style={[styles.heading, { color: colors.text }]}>
                Popular Near You
              </Text>
            </>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 3,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    paddingHorizontal: 14,
    elevation: 3,
    padding: 10,
    borderRadius: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  inputBar: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 5,
  },
  card: {
    height: 220,
    width: 200,
    margin: 5,
    borderRadius: 10,
    alignItems: "flex-start",
    elevation: 5,
  },
  cardText: {
    marginLeft: 10,
  },
  cardTitle: {
    fontWeight: "600",
    marginTop: 5,
    marginBottom: 2,
    marginLeft: 10,
    textAlign: "left",
  },
  image: {
    height: 150,
    width: "100%",
    borderRadius: 10,
  },
  sideCard: {
    height: 100,
    width: "100%",
    margin: 5,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
  },
  sideCardImage: {
    height: "100%",
    width: 100,
    borderRadius: 10,
  },
  sideCardContent: {
    flex: 1,
    justifyContent: "center",
  },
  sideCardTitle: {
    fontWeight: "600",
    marginBottom: 2,
    marginLeft: 10,
    fontSize: 17,
  },
});

export default HomeScreen;
