import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { addToCart } from "../redux/CartSlice";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const ProductItem = ({ item, goToProductInfo }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleAddToCart = () => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };

  const [addedToCart, setAddedToCart] = useState(false);
  return (
    <View
      style={{
        marginHorizontal: 6,
        marginVertical: 8,
        backgroundColor: "whitesmoke",
        padding: 12,
        borderRadius: 10,
      }}
    >
      <Pressable onPress={() => navigation.navigate("ProductInfo", { item })}>
        <Image
          style={{ width: 140, height: 140, resizeMode: "contain" }}
          source={{ uri: item?.image }}
        />
        <Text numberOfLines={1} style={{ width: 140, marginTop: 10 }}>
          {item?.title}
        </Text>
        <View
          style={{
            marginTop: 5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            {item?.price}
          </Text>
          <Text style={{ color: "green", fontWeight: "bold" }}>
            {item?.rating.rate}
          </Text>
        </View>
      </Pressable>
      <Pressable
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 10,
        }}
        onPress={handleAddToCart}
      >
        {addedToCart ? <Text>Added To Cart</Text> : <Text>Add To Cart</Text>}
      </Pressable>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
