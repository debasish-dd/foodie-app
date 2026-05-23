import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import React from "react";

import { useCartStore } from "../store/useCartStore";
import { useThemeStore } from "../store/useThemeStore";
import { themes } from "../theme/theme";

const Divider = () => (
  <View
    style={{
      height: 1,
      backgroundColor: "#e5e7eb",
      marginVertical: 12,
    }}
  />
);

const OrderScreen = () => {
  const cartItems = useCartStore((state) => state.items);

  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);

  const totalItems = useCartStore((state) => state.totalItems);
  const subtotal = useCartStore((state) => state.subtotal);

  const theme = useThemeStore((state) => state.theme);
  const colors = themes[theme];

  const allCartItems = Object.entries(cartItems);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <FlatList
        data={allCartItems}
        keyExtractor={([id]) => id}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        ListFooterComponent={
            <Divider/>
        }
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const [id, cartItem] = item;

          return (
            <View style={[styles.card, {backgroundColor: colors.card}]}>
              {/* left section */}
              <View style={styles.infoContainer}>
                <Text
                  style={[
                    styles.name,
                    { color: colors.text },
                  ]}
                >
                  {cartItem.name}
                </Text>

                <Text
                  style={[
                    styles.price,
                    { color: colors.text },
                  ]}
                >
                  ${Number(cartItem.price).toFixed(2)}
                </Text>
              </View>

              {/* counter section */}
              <View style={[styles.counterContainer, {backgroundColor: colors.primary}]}>
                <Pressable
                  style={styles.counterButton}
                  onPress={() => removeItem(id)}
                >
                  <Text style={styles.counterText}>
                    -
                  </Text>
                </Pressable>

                <Text style={styles.quantityText}>
                  {cartItem.quantity}
                </Text>

                <Pressable
                  style={styles.counterButton}
                  onPress={() =>
                    addItem({
                      id,
                      name: cartItem.name,
                      price: cartItem.price,
                    })
                  }
                >
                  <Text style={styles.counterText}>
                    +
                  </Text>
                </Pressable>
              </View>
            </View>
          );
        }}
      />

      {/* bottom total bar */}
      {allCartItems.length > 0 && (
        <View style={[styles.bottomBar , {backgroundColor: colors.card}]}>
          <View>
            <Text style={[styles.totalLabel , {color: colors.text}]}>
              {totalItems()} items
            </Text>

            <Text style={[styles.totalPrice ,{color: colors.text}]}>
              ${subtotal().toFixed(2)}
            </Text>
          </View>

          <Pressable style={[styles.checkoutButton , {backgroundColor: colors.primary}]}>
            <Text style={[styles.checkoutText, {color: colors.text}]}>
              Checkout
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  card: {
    minHeight: 100,
    marginHorizontal: 10,
    marginVertical: 6,
    padding: 15,
    borderRadius: 14,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  infoContainer: {
    flex: 1,
  },

  name: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 4,
  },

  price: {
    fontSize: 15,
    marginBottom: 4,
  },

  counterContainer: {
    flexDirection: "row",
    alignItems: "center",

    borderRadius: 12,

    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  counterButton: {
    paddingHorizontal: 10,
  },

  counterText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },

  quantityText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",

    minWidth: 25,
    textAlign: "center",
  },

  bottomBar: {
    position: "absolute",

    bottom: 20,
    left: 15,
    right: 15,
    borderRadius: 16,

    paddingHorizontal: 20,
    paddingVertical: 15,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: {
    color: "white",
    fontSize: 13,
  },

  totalPrice: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },

  checkoutButton: {
    backgroundColor: "white",

    paddingHorizontal: 20,
    paddingVertical: 10,

    borderRadius: 10,
  },

  checkoutText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});