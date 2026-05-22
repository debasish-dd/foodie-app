import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeStore } from "../store/useThemeStore";
import { themes } from "../theme/theme";

const RestaurantDetailScreen = ({ route }: any) => {
  const { restaurant } = route.params;
  const theme = useThemeStore((state) => state.theme);
  const colors = themes[theme];

  const headerSection = () => {
    return (
      <View>
        <Image src={restaurant.bannerImage} style={styles.image} />
        {/* header section  */}
        <View>
          <Text style={[styles.heading, { color: colors.text }]}>
            {restaurant.name}
          </Text>
          <Text style={[styles.headerSectionText, { color: colors.text }]}>
            {restaurant?.tags?.join(" | ")}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 5,
            }}
          >
            <Text style={[styles.headerSectionText, { color: colors.text }]}>
              {restaurant.rating}⭐ ({restaurant.reviewsCount} reviews)
            </Text>
            <Text style={[styles.headerSectionText, { color: colors.text }]}>
              {restaurant.distance} · {restaurant.priceLevel}
            </Text>
          </View>
          <Text style={[styles.headerSectionText, { color: colors.text }]}>
            {restaurant.description}
          </Text>
        </View>
        <Text style={[styles.heading, { color: colors.text }]}>Dishes</Text>
      </View>
    );
  };
  const DishCard = memo(({ item }) => (
    <View style={styles.dishesCard}>
      <View>
        <Image
          source={{ uri: item.image }}
          style={styles.dishImage}
          resizeMode="cover"
        />
      </View>
      <View style={{ marginHorizontal: 15 }}>
        <Text style={[styles.title , {color:colors.text}]}>{item.name}</Text>
        <Text style={[ {color:colors.text}]}>${item.price.toFixed(2)}</Text>
      </View>
    </View>
  ));
  const renderDish = useCallback(({ item }) => {
    return <DishCard item={item} />;
  }, []);

  if (!restaurant?.menuItems)
    return (
      <View>
        <Text style={{ color: colors.text }}> Page Not found</Text>
      </View>
    );

  return (
    <FlatList
      style={[styles.container, { backgroundColor: colors.background }]}
      data={restaurant.menuItems}
      key={restaurant.menuItems?.id}
      renderItem={renderDish}
      ItemSeparatorComponent={() => (
    <View style={{ borderWidth: 1, borderColor: colors.primary }} />
  )}
      ListHeaderComponent={headerSection}
    />
  );
};

export default RestaurantDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 150,
    width: "100%",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 5,
  },
  headerSectionText: {
    marginHorizontal: 5,
    fontWeight: "500",
  },
  dishesCard: {
    flexDirection: "row",
    height: 100,
    margin: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  dishImage: {
    height: 80,
    width: 100,
    borderRadius: 15,
  },
  title:{
    fontWeight: '600'
  }
});
