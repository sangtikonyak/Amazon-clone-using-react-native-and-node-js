import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Image,
  TextInput,
  SafeAreaView,
} from "react-native";
import React from "react";
import Header from "../component/Header";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../redux/CartSlice";
import { useNavigation } from "@react-navigation/native";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const total = cart
    ?.map((item) => item.quantity * item.price)
    .reduce((current, acc) => acc + current, 0);
  return (
    <>
      <View style={{ marginTop: 45 }} />
      <Header />
      {cart?.length !== 0 ? (
        <ScrollView style={{ marginTop: 30, flex: 1, backgroundColor: "#fff" }}>
          <View style={{ marginHorizontal: 10 }}>
            {cart?.map((item) => {
              return (
                <View
                  key={item?.id}
                  style={{
                    marginTop: 20,
                    flexDirection: "row",
                    gap: 10,
                    padding: 5,
                    backgroundColor: "whitesmoke",
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  <View>
                    <Pressable>
                      <Image
                        source={{ uri: item.image }}
                        style={{
                          width: 120,
                          height: 120,
                          resizeMode: "contain",
                        }}
                      />
                    </Pressable>

                    <View
                      style={{ flexDirection: "row", gap: 2, marginTop: 8 }}
                    >
                      <Pressable
                        onPress={() => {
                          dispatch(decrementQuantity(item));
                        }}
                      >
                        <AntDesign
                          name="minuscircleo"
                          size={24}
                          color="black"
                        />
                      </Pressable>
                      <TextInput
                        value={item.quantity.toString()}
                        style={{
                          flexGrow: 1,
                          textAlign: "center",
                        }}
                      />
                      <Pressable
                        onPress={() => {
                          dispatch(incrementQuantity(item));
                        }}
                      >
                        <AntDesign name="pluscircleo" size={24} color="black" />
                      </Pressable>
                      <Pressable
                        style={{
                          alignItems: "center",
                          marginLeft: 10,
                          justifyContent: "center",
                          padding: 8,
                          backgroundColor: "rgba(255, 0, 0, 0.4)",
                          borderRadius: 20,
                        }}
                        onPress={() => {
                          dispatch(removeFromCart(item));
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            fontSize: 12,
                            fontWeight: "600",
                          }}
                        >
                          Remove
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                  <View style={{ marginTop: 15, flex: 1 }}>
                    <Text
                      numberOfLines={3}
                      style={{
                        fontSize: 14,
                        fontWeight: "300",
                        flexWrap: "wrap",
                      }}
                    >
                      {item?.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "500",
                        flexWrap: "wrap",
                        marginTop: 5,
                      }}
                    >
                      Price : {item.price}
                    </Text>

                    <TouchableOpacity
                      style={{
                        backgroundColor: "#FFC72C",
                        padding: 10,
                        borderRadius: 3,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 10,
                        marginLeft: 0, // Updated marginLeft to 0
                        width: 100,
                        marginTop: 15,
                      }}
                      onPress={() =>
                        navigation.navigate("Confirm", { item, total })
                      }
                    >
                      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                        Buy
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
            <Text
              style={{
                height: 1,
                borderColor: "lightgrey",
                borderWidth: 1,
                marginTop: 15,
              }}
            />
            <View
              style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "400" }}>
                SubTotal :{" "}
              </Text>

              <Text style={{ fontSize: 20, fontWeight: "500" }}>{total} </Text>
            </View>
            <Text style={{ marginHorizontal: 10 }}>EMI available</Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#FFC72C",
                padding: 10,
                borderRadius: 3,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                marginHorizontal: 10,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Proceed to by {cart.length} items
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            No Items in the Cart !
          </Text>
        </View>
      )}
    </>
  );
};

export default Cart;

const styles = StyleSheet.create({});
