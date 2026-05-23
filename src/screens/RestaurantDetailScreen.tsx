import React, { memo, useCallback } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useThemeStore } from "../store/useThemeStore";
import { themes } from "../theme/theme";
import { useCartStore } from "../store/useCartStore";
import { useNavigation } from "@react-navigation/native";

 const DishCard = memo(({ item }: { item: any }) => {
  const qty = useCartStore(
    (state) => state.items[String(item.id)]?.quantity || 0,
  );
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const theme = useThemeStore((state) => state.theme);
  const colors = themes[theme];

  return (
    <View style={styles.dishesCard}>
      <Image
        source={{ uri: item.image }}
        style={styles.dishImage}
        resizeMode="cover"
      />

      <View style={styles.infoContainer}>
        <Text style={[styles.title, { color: colors.text }]}>{item.name}</Text>
        <Text style={{ color: colors.text }}>${item.price.toFixed(2)}</Text>
      </View>

      <View style={styles.actionContainer}>
        {qty === 0 ? (
          <Pressable onPress={() => addItem(item)} style={styles.addButton}>
            <Text style={[styles.addButtonText, { color: "white" }]}>add</Text>
          </Pressable>
        ) : (
          <View style={styles.counterContainer}>
            <Pressable
              onPress={() => removeItem(item.id)}
              style={styles.counterButton}
            >
              <Text style={styles.counterText}>-</Text>
            </Pressable>

            <Text style={styles.qtyText}>{qty}</Text>

            <Pressable
              onPress={() => addItem(item.id)}
              style={styles.counterButton}
            >
              <Text style={styles.counterText}>+</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
});
const goToCartBtn = () => {
  return <View></View>;
};

const RestaurantDetailScreen = ({ route }: any) => {
  const { restaurant } = route.params;
  const theme = useThemeStore((state) => state.theme);
  const colors = themes[theme];
  const totalItems = useCartStore((state) => state.totalItems());
  const subtotal = useCartStore((state) => state.subtotal);
  const navigation = useNavigation()

  const HeaderSection = () => {
    return (
      <View>
        <Image source={{ uri: restaurant.bannerImage }} style={styles.image} />

        <View>
          <Text style={[styles.heading, { color: colors.text }]}>
            {restaurant.name}
          </Text>

          <Text style={[styles.headerSectionText, { color: colors.text }]}>
            {restaurant?.tags?.join(" | ")}
          </Text>

          <View style={styles.rowBetween}>
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

  const renderDish = useCallback(({ item }: { item: any }) => {
    return <DishCard item={item} />;
  }, []);

  if (!restaurant?.menuItems) {
    return (
      <View
        style={[styles.emptyContainer, { backgroundColor: colors.background }]}
      >
        <Text style={{ color: colors.text }}>Page Not found</Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <FlatList
        contentContainerStyle={{
          paddingBottom: totalItems > 0 ? 100 : 20,
        }}
        data={restaurant.menuItems}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderDish}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={HeaderSection}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              backgroundColor: colors.primary,
              opacity: 0.2,
            }}
          />
        )}
      />

      {totalItems > 0 && (
        <Pressable
          style={styles.cartBar}
          onPress={() => navigation.navigate("Orders")}
        >
          <View>
            <Text style={styles.cartItemsText}>
              {totalItems} item{totalItems > 1 ? "s" : ""}
            </Text>

            <Text style={styles.cartPriceText}>
              ${subtotal().toFixed(2)}
            </Text>
          </View>

          <Text style={styles.viewCartText}>
            View Cart →
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default RestaurantDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
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
  infoContainer: {
    flex: 1,
    marginHorizontal: 15,
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#a31643",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 10,
  },
  addButtonText: {
    fontWeight: "bold",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#a31643",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  counterButton: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  counterText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  qtyText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    minWidth: 20,
    textAlign: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
  },
  cartBar: {
    position: "absolute",
    bottom: 20,
    left: 15,
    right: 15,

    backgroundColor: "#a3163c",

    borderRadius: 16,

    paddingHorizontal: 18,
    paddingVertical: 14,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    elevation: 10,
  },

  cartItemsText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },

  cartPriceText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },

  viewCartText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
