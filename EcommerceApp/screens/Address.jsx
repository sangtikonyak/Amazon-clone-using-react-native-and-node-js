import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserType } from "../UserContext";

const Address = () => {
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const { userId } = useContext(UserType);

  const updateAddress = async () => {
    console.log("called udpate Address");
    const address = {
      name: name,
      mobileNo: mobileNo,
      houseNo: houseNo,
      street: street,
      landmark: landmark,
      postalCode: postalCode,
      country: country,
    };
    try {
      const response = await fetch(
        `http://192.168.0.174:8000/add-address/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(address),
        }
      );
      const data = await response.json();
      Alert.alert("success : ", ` ${JSON.stringify(data.message)}`);
    } catch (err) {
      Alert.alert(err.toString());
    }
  };

  return (
    <SafeAreaView style={{ marginTop: 20 }}>
      <View style={{ backgroundColor: "#00CED1", height: 40 }} />
      <ScrollView>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Address</Text>
          <TextInput
            placeholder="India"
            placeholderTextColor={"black"}
            value={country}
            onChangeText={setCountry}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
          <View style={{ marginVertical: 8 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Enter Full Name
            </Text>
            <TextInput
              placeholder="Enter Your Name"
              placeholderTextColor={"black"}
              value={name}
              onChangeText={setName}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
            />
          </View>
          <View style={{ marginVertical: 8 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Enter Mobile Number
            </Text>
            <TextInput
              placeholder="Mobile Number"
              placeholderTextColor={"black"}
              value={mobileNo}
              onChangeText={setMobileNo}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
            />
          </View>
          <View style={{ marginVertical: 8 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Flat,HouseNo or Building
            </Text>
            <TextInput
              placeholderTextColor={"black"}
              value={houseNo}
              onChangeText={setHouseNo}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
            />
          </View>
          <View style={{ marginVertical: 8 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Street or area
            </Text>
            <TextInput
              placeholderTextColor={"black"}
              placeholder="street"
              value={street}
              onChangeText={setStreet}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
            />
          </View>
          <View style={{ marginVertical: 8 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Landmark</Text>
            <TextInput
              placeholderTextColor={"black"}
              value={landmark}
              onChangeText={setLandmark}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder="Landmark"
            />
          </View>
          <View style={{ marginVertical: 8 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Enter PinCode
            </Text>
            <TextInput
              placeholderTextColor={"black"}
              value={postalCode}
              onChangeText={setPostalCode}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder="Pincode"
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#FFC72C",
              padding: 10,
              borderRadius: 20,
              marginHorizontal: 10,
              marginBottom: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={updateAddress}
          >
            <Text>Add Address</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Address;

const styles = StyleSheet.create({});
