import {
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  View,
  ImageBackground,
  Dimensions,
  Image,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartSlice";
const ProductItemWithoutCarousel = () => {
  const route = useRoute();
  const { width } = Dimensions.get("window");
  const height = (width * 100) / 100;
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    setAddedToCart(true);
    dispatch(addToCart(route.params.item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };
  const [addedToCart, setAddedToCart] = useState(false);

  return (
    <ScrollView
      style={{ marginTop: 55, flex: 1, backgroundColor: "#fff" }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          backgroundColor: "#00CED1",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 8,
            backgroundColor: "white",
            borderRadius: 3,
            height: 40,
            flex: 1,
          }}
          onPress={() => {}}
        >
          <AntDesign
            style={{ paddingLeft: 10 }}
            name="search1"
            size={24}
            color="black"
          />
          <TextInput placeholder="search" style={{ height: "100%" }} />
        </Pressable>
        <Pressable>
          <Feather name="mic" size={24} color="black" />
        </Pressable>
      </View>

      <Image
        source={{ uri: route.params.item.image }}
        style={{ width: "100%", height: 300, resizeMode: "contain" }}
      />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>
          {route.params.item.title}
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "300", marginTop: 8 }}>
          {route.params.item.description}.
        </Text>
        <Text style={{ marginTop: 6, fontSize: 18, fontWeight: "600" }}>
          {route.params.item.price} $
        </Text>
      </View>
      <Text
        style={{
          height: 1,
          borderColor: "lightgrey",
          borderWidth: 1,
        }}
      />
      <View style={{ padding: 10 }}>
        <Text>Total : {route.params.item.price}</Text>
        <Text style={{ color: "#00CED1" }}>Free Delivery tomorrow by 3pm</Text>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 5,
            alignItems: "center",
            gap: 5,
          }}
        >
          <Entypo name="location-pin" size={24} color="black" />
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Deliver to Test100 - 000000
          </Text>
        </View>
      </View>
      <Text
        style={{
          color: "green",
          marginHorizontal: 20,
          fontWeight: "500",
          marginVertical: 5,
        }}
      >
        In Stock
      </Text>
      <Pressable
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 20,
          marginHorizontal: 10,
          marginVertical: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={handleAddToCart}
      >
        {addedToCart ? (
          <Text style={{ fontWeight: "bold" }}>Added To Cart</Text>
        ) : (
          <Text style={{ fontWeight: "bold" }}>Add to Cart</Text>
        )}
      </Pressable>
      <Pressable
        style={{
          backgroundColor: "lightgreen",
          padding: 10,
          borderRadius: 20,
          marginHorizontal: 10,
          marginVertical: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Buy Now</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProductItemWithoutCarousel;

const styles = StyleSheet.create({});
