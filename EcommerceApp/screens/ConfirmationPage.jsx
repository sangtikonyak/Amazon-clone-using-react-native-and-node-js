import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { UserType } from "../UserContext";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../redux/CartSlice";
import RazorpayCheckout from "react-native-razorpay";

const ConfirmationPage = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Delivery", content: "Delivery Options" },
    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary" },
  ];
  const { userId } = useContext(UserType);
  const [currentStep, setCurrentStep] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [selectedAdd, setSelectedAdd] = useState("");
  const [option, setOption] = useState("");
  const [selectedPaymentMode, setPaymentMode] = useState("");

  const product = route.params.item;
  const { total } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    fetchAddresses();
  }, []);
  const fetchAddresses = async () => {
    try {
      console.log("fetch called");
      const response = await fetch(
        `http://192.168.0.174:8000/addresses/${userId}`
      );
      const { updateAddresses } = await response.json();
      setAddresses(updateAddresses);
      // console.log(updateAddresses);
    } catch (err) {
      console.log("error : ", err);
    }
  };
  const pay = async () => {
    try {
      const options = {
        description: "Adding To Wallet",
        currency: "INR",
        name: "Amazon",
        key: "rzp_test_V6USlPXC4GBQrc",
        amount: total * 100,
        prefill: {
          email: "void@razorpay.com",
          contact: "9191919191",
          name: "RazorPay Software",
        },
        theme: { color: "#F37254" },
      };
      

      RazorpayCheckout.open(options)
  .then((data) => {
    console.log(`Payment success: ${data.razorpay_payment_id}`);
  })
  .catch((error) => {
    console.log(`Payment error: ${error.code} - ${error.description}`);
  });
      console.log(data);
      const order = {
        userId: userId,
        cartItems: product,
        totalPrice: total,
        shippingAddress: selectedAdd,
        paymentMethod: selectedPaymentMode,
      };
      console.log(order);

      const response = await fetch("http://192.168.0.174:8000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      const responseData = await response.json();
      if (response.ok) {
        console.log("data :", responseData);
        dispatch(removeFromCart(product));
        navigation.navigate("Orders");
      }
    } catch (err) {
      console.log("err : ", err);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const order = {
        userId: userId,
        cartItems: product,
        totalPrice: total,
        shippingAddress: selectedAdd,
        paymentMethod: selectedPaymentMode,
      };
      console.log(order);

      const response = await fetch("http://192.168.0.174:8000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("data :", data);
        dispatch(removeFromCart(product));
        navigation.navigate("Orders");
      }
    } catch (err) {
      console.log("err :", err);
    }
  };
  return (
    <ScrollView style={{ marginTop: 50 }}>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {steps?.map((step, index) => {
            return (
              <View
                style={{ justifyContent: "center", alignItems: "center" }}
                key={index}
              >
                {index > 0 && (
                  <View
                    style={[
                      { flex: 1, height: 2, backgroundColor: "green" },
                      index <= currentStep && { backgroundColor: "green" },
                    ]}
                  />
                )}
                <View
                  style={[
                    {
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      backgroundColor: "#ccc",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                    index < currentStep && { backgroundColor: "green" },
                  ]}
                >
                  {index < currentStep ? (
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      &#10003;
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      {index + 1}
                    </Text>
                  )}
                </View>
                <Text style={{ textAlign: "center", marginTop: 8 }}>
                  {step.title}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
      {currentStep == 0 && (
        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Select Delivery Address
          </Text>
          <Pressable>
            {addresses.map((item, index) => {
              return (
                <Pressable
                  key={index}
                  style={{
                    borderWidth: 1,
                    borderColor: "#D0D0D0",
                    padding: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                    paddingBottom: 17,
                    marginVertical: 7,
                    borderRadius: 6,
                    marginTop: 6,
                  }}
                >
                  {selectedAdd && selectedAdd.id === item?.id ? (
                    <FontAwesome5
                      onPress={() => setSelectedAdd("")}
                      name="dot-circle"
                      size={24}
                      color="#008397"
                    />
                  ) : (
                    <Entypo
                      onPress={() => setSelectedAdd(item)}
                      name="circle"
                      size={24}
                      color="gray"
                    />
                  )}

                  <View style={{ marginLeft: 6 }}>
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
                    {selectedAdd && selectedAdd.id === item?.id && (
                      <Pressable
                        onPress={() => setCurrentStep(1)}
                        style={{
                          justifyContent: "center",
                          alignItems: "center",

                          marginHorizontal: 10,
                          backgroundColor: "#00CED1",
                          borderRadius: 100,
                          borderWidth: 0.2,
                          marginTop: 8,
                          overflow: "hidden",
                        }}
                      >
                        <Text
                          style={{
                            padding: 8,
                            fontSize: 12,
                            fontWeight: "bold",
                            color: "white",
                          }}
                        >
                          Deliver to this Address
                        </Text>
                      </Pressable>
                    )}
                  </View>
                </Pressable>
              );
            })}
          </Pressable>
        </View>
      )}
      {currentStep === 1 && (
        <View
          style={{
            marginVertical: 10,
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Choose your delievery options
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 8,
              gap: 5,
              marginTop: 10,
              backgroundColor: "white",
              borderWidth: 0.2,
              marginHorizontal: 10,
              borderRadius: 5,
              borderColor: "lightgrey",
            }}
          >
            {option ? (
              <FontAwesome5
                onPress={() => setSelectedAdd("")}
                name="dot-circle"
                size={24}
                color="#008397"
              />
            ) : (
              <Entypo
                onPress={() => setOption("prime")}
                name="circle"
                size={24}
                color="gray"
              />
            )}

            <Text style={{ flex: 1 }}>
              <Text style={{ color: "green", fontWeight: "bold" }}>
                Tomoorrow by 10 am
              </Text>
              <Text>- Free Delivery with your Prime Membershipp</Text>
            </Text>
          </View>
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
            onPress={() => setCurrentStep(2)}
          >
            <Text style={{ fontWeight: "bold" }}>Continue</Text>
          </Pressable>
        </View>
      )}

      {currentStep === 2 && (
        <View style={{ flex: 1, marginTop: 10 }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 10,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Choose Your Payment Options
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 8,
                gap: 5,
                marginTop: 10,
                backgroundColor: "white",
                borderWidth: 0.2,
                marginHorizontal: 10,
                borderRadius: 5,
                borderColor: "lightgrey",
              }}
            >
              {selectedPaymentMode === "cash" ? (
                <FontAwesome5
                  onPress={() => setPaymentMode("")}
                  name="dot-circle"
                  size={24}
                  color="#008397"
                />
              ) : (
                <Entypo
                  onPress={() => setPaymentMode("cash")}
                  name="circle"
                  size={24}
                  color="gray"
                />
              )}

              <Text style={{ flex: 1 }}>
                <Text>Cash on delivery</Text>
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 8,
                gap: 5,
                marginTop: 10,
                backgroundColor: "white",
                borderWidth: 0.2,
                marginHorizontal: 10,
                borderRadius: 5,
                borderColor: "lightgrey",
              }}
            >
              {selectedPaymentMode === "upi" ? (
                <FontAwesome5
                  onPress={() => {
                    setPaymentMode("");
                  }}
                  name="dot-circle"
                  size={24}
                  color="#008397"
                />
              ) : (
                <Entypo
                  onPress={() => {
                    setPaymentMode("upi");
                    Alert.alert("UPI/Debit card", "Pay Online", [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel is pressed"),
                      },
                      {
                        text: "OK",
                        onPress: () => pay(),
                      },
                    ]);
                  }}
                  name="circle"
                  size={24}
                  color="gray"
                />
              )}

              <Text style={{ flex: 1 }}>
                <Text>UPI</Text>
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 8,
                gap: 5,
                marginTop: 10,
                backgroundColor: "white",
                borderWidth: 0.2,
                marginHorizontal: 10,
                borderRadius: 5,
                borderColor: "lightgrey",
              }}
            >
              {selectedPaymentMode === "card" ? (
                <FontAwesome5
                  onPress={() => setPaymentMode("")}
                  name="dot-circle"
                  size={24}
                  color="#008397"
                />
              ) : (
                <Entypo
                  onPress={() => setPaymentMode("card")}
                  name="circle"
                  size={24}
                  color="gray"
                />
              )}

              <Text style={{ flex: 1 }}>
                <Text>Credid/Debit Card</Text>
              </Text>
            </View>
          </View>
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
            onPress={() => setCurrentStep(3)}
          >
            <Text style={{ fontWeight: "bold" }}>Continue</Text>
          </Pressable>
        </View>
      )}

      {currentStep === 3 && selectedPaymentMode === "cash" && (
        <View style={{ marginHorizontal: 20 }}>
          <Text
            style={{ fontSize: 20, fontWeight: "bold", alignSelf: "center" }}
          >
            Order Now
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 8,
              gap: 5,
              marginTop: 10,
              backgroundColor: "white",
              borderWidth: 0.2,
              marginHorizontal: 10,
              borderRadius: 5,
              borderColor: "lightgrey",
              flex: 1,
            }}
          >
            <View>
              <Text style={{ fontSize: 14, fontVariant: "bold" }}>
                <Text>Save 50% and never Ran Out</Text>
              </Text>
              <Text style={{ fontSize: 15, color: "gray", marginTop: 5 }}>
                Turn on auto deliveries
              </Text>
            </View>

            <MaterialIcons
              name="keyboard-arrow-right"
              fontSize={24}
              color={"black"}
            />
          </View>
          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 7,
              backgroundColor: "white",
              borderWidth: 0.2,
              marginHorizontal: 10,
              borderRadius: 5,
              borderColor: "lightgrey",
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "bold", color: "grey" }}>
              Shipping to {selectedAdd?.name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <Text
                style={{ fontSize: 12, fontWeight: "bold", color: "black" }}
              >
                Quantity :
              </Text>
              <Text>{product?.quantity}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <Text
                style={{ fontSize: 12, fontWeight: "bold", color: "black" }}
              >
                Delivery charges
              </Text>
              <Text>40</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "black" }}
              >
                Order Total
              </Text>
              <Text>{total}</Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 7,
              backgroundColor: "white",
              borderWidth: 0.2,
              marginHorizontal: 10,
              borderRadius: 5,
              borderColor: "lightgrey",
            }}
          >
            <Text style={{ color: "grey", fontWeight: "bold" }}>Pay with</Text>
            <Text style={{ fontWeight: "bold" }}>Pay on Delivery(cash)</Text>
          </View>
          <TouchableOpacity
            onPress={handlePlaceOrder}
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
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default ConfirmationPage;

const styles = StyleSheet.create({});
