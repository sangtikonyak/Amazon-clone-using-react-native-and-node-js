import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Header from "../component/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { Alert } from "react-native";
import { UserType } from "../UserContext";
import { Entypo } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

const AddAddress = ({ navigation }) => {
  const { userId } = useContext(UserType);
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    try {
      const fetchAddresses = async () => {
        const response = await fetch(
          `http://192.168.0.174:8000/addresses/${userId}`
        );
        const { addresses } = await response.json();
        setAddresses(addresses);
      };
      fetchAddresses();
    } catch (err) {
      Alert.alert("error fetching data");
    }
  }, []);

  // refresh the addressses when the components comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    })
  );

  return (
    <SafeAreaView style={{ marginTop: 30 }}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Add Address</Text>
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              paddingVertical: 7,
              paddingHorizontal: 5,
              borderLeftWidth: 0,
              borderRightWidth: 0,
            }}
            onPress={() => {
              navigation.navigate("Address");
            }}
          >
            <Text style={{ textAlign: "center" }}>Add New Address</Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </Pressable>
          {/* all the added address */}
          <Pressable>
            {/* all the added adresses */}
            {addresses?.map((item, index) => {
              return (
                <Pressable
                  key={index}
                  style={{
                    borderWidth: 1,
                    borderColor: "#D0D0D0",
                    padding: 10,
                    flexDirection: "column",
                    gap: 5,
                    marginVertical: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                      {item?.name}
                    </Text>
                    <Entypo name="location-pin" size={24} color="red" />
                  </View>

                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    {item?.houseNo}, {item?.landmark}
                  </Text>

                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    {item?.street}
                  </Text>

                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    India, Bangalore
                  </Text>

                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    phone No : {item?.mobileNo}
                  </Text>
                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    pin code : {item?.postalCode}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      marginTop: 7,
                    }}
                  >
                    <Pressable
                      style={{
                        backgroundColor: "#F5F5F5",
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 5,
                        borderWidth: 0.9,
                        borderColor: "#D0D0D0",
                      }}
                    >
                      <Text>Edit</Text>
                    </Pressable>

                    <Pressable
                      style={{
                        backgroundColor: "#F5F5F5",
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 5,
                        borderWidth: 0.9,
                        borderColor: "#D0D0D0",
                      }}
                    >
                      <Text>Remove</Text>
                    </Pressable>

                    <Pressable
                      style={{
                        backgroundColor: "#F5F5F5",
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 5,
                        borderWidth: 0.9,
                        borderColor: "#D0D0D0",
                      }}
                    >
                      <Text>Set as Default</Text>
                    </Pressable>
                  </View>
                </Pressable>
              );
            })}
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddAddress;

const styles = StyleSheet.create({});
