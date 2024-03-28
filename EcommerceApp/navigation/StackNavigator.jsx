import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ProductInfo from "../screens/ProductInfo";
import AddAddress from "../screens/AddAddress";
import Address from "../screens/Address";
import ProductItemWithoutCarousel from "../component/ProductItemWithoutCarousel";
import Profile from "../screens/Profile";
import Cart from "../screens/Cart";
import ConfirmationPage from "../screens/ConfirmationPage";
import Orders from "../screens/Orders";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) => {
              return focused ? (
                <Entypo name="home" size={24} color="008E97" />
              ) : (
                <AntDesign name="home" size={24} color="black" />
              );
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: "Profile",
            tabBarLabelStyle: { color: "#008E97" },

            tabBarIcon: ({ focused }) => {
              return focused ? (
                <Ionicons name="person" size={24} color="008E97" />
              ) : (
                <Ionicons name="person-outline" size={24} color="black" />
              );
            },
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarLabel: "Cart",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) => {
              return focused ? (
                <AntDesign
                  name="shoppingcart"
                  size={24}
                  color="rgba(0, 142, 151, 1)"
                />
              ) : (
                <AntDesign name="shoppingcart" size={24} color="black" />
              );
            },
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Info"
          component={ProductInfo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddAddress"
          component={AddAddress}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Address"
          component={Address}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductInfo"
          component={ProductItemWithoutCarousel}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Orders"
          component={Orders}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Confirm"
          component={ConfirmationPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
