import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const navigation = useNavigation();
  const { userId } = useContext(UserType);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  useLayoutEffect(() => {
    fetchProfile();
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#00CED1",
      },
      headerLeft: () => (
        <Image
          style={{ width: 140, height: 120, resizeMode: "contain" }}
          source={{
            uri: "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png",
          }}
        />
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginRight: 12,
          }}
        >
          <Ionicons name="notifications-outline" size={24} color="black" />

          <AntDesign name="search1" size={24} color="black" />
        </View>
      ),
    });
  }, []);

  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("auth token cleared");
    navigation.replace("Login");
  };
  const [user, setUser] = useState();
  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.174:8000/profile/${userId}`
      );
      const { user } = response.data;
      setUser(user);
    } catch (err) {
      console.log("err : ", err);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://192.168.0.174:8000/orders/${userId}`
      );
      const data = await response.json();
      setOrders(data.orders);
      setLoading(false);
      console.log("data orders : ", data.orders[0].products);
    } catch (err) {
      console.log("err : ", err);
    }
  };
  useEffect(() => {
    fetchProfile();
    fetchOrders();
  }, []);
  return (
    <ScrollView style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
        Welcome {user?.name}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 12,
        }}
      >
        <Pressable
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center" }}>Yours Orders</Text>
        </Pressable>
        <Pressable
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center" }}>Your Account</Text>
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 12,
        }}
      >
        <Pressable
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center" }}>Buy Again</Text>
        </Pressable>
        <Pressable
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center" }}>Logout</Text>
        </Pressable>
      </View>
      <View>
        {loading ? (
          <View>
            <Text>Loading...</Text>
          </View>
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <View
              style={{
                alignItems: "center",
                marginTop: 20,
              }}
              key={order._id}
            >
              {order.products.slice(0, 1).map((product) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 10,

                    justifyContent: "space-between", // Align items to start and end
                    paddingHorizontal: 4, // Add padding for better spacing
                    width: "90%", //
                  }}
                  key={product._id}
                >
                  <Image
                    source={{ uri: product.image }}
                    style={{
                      width: 100,
                      height: 100,
                      resizeMode: "contain",
                    }}
                  />
                  <Text style={{ flex: 1, paddingLeft: 10 }}>
                    {product.name}
                  </Text>
                </View>
              ))}
            </View>
          ))
        ) : (
          <Text>No orders found</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
