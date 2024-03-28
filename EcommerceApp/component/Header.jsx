import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
const Header = () => {
  return (
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
  );
};

export default Header;

const styles = StyleSheet.create({});
