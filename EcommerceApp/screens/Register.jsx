import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegister = async () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    //Send a post request to the backend
    try {
      const response = await fetch("http://192.168.0.174:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        Alert.alert("Registration failed", ` ${JSON.stringify(data.message)}`);
      }
      console.log(data);
      Alert.alert(
        "Registration successful",
        ` ${JSON.stringify(data.message)}`
      );
      navigation.replace("Login");
    } catch (error) {
      Alert.alert("Registration failed", "An error occurred while registering");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={{ width: 150, height: 100 }}
          source={{
            uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
          }}
        />
      </View>

      <KeyboardAvoidingView>
        <View>
          <Text style={styles.text}>Register To Your Account</Text>
        </View>

        <View style={{ marginTop: 10 }}>
          <View style={styles.inputContainer}>
            <Ionicons
              name="person-sharp"
              style={{ marginLeft: 8 }}
              size={24}
              color="grey"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Username"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputContainer}>
            <MaterialIcons
              name="email"
              style={{ marginLeft: 8 }}
              size={24}
              color="grey"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              style={{ marginLeft: 8 }}
              name="onepassword"
              size={24}
              color="grey"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Your Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </View>

        <View style={styles.forgotPassword}>
          <Text>Keep Me Logged In</Text>
          <Text style={styles.forgotPasswordText}>Forgot Password</Text>
        </View>
        <View style={{ marginTop: 20 }} />
        <TouchableOpacity style={styles.login} onPress={handleRegister}>
          <Text style={styles.loginText}>Register</Text>
        </TouchableOpacity>
        <Pressable
          style={{ marginTop: 18 }}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={{ color: "grey", textAlign: "center", fontSize: 16 }}>
            Already have an account? sign in
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 70,
  },
  text: {
    color: "#041E42",
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 2,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#d0d0d0",
    paddingVertical: 4,
    marginTop: 28,
    borderRadius: 5,
  },
  input: {
    color: "grey",
    width: 250,
    marginVertical: 10,
  },
  forgotPassword: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  forgotPasswordText: {
    color: "#007FFF",
    fontWeight: "500",
  },
  login: {
    width: 120,
    backgroundColor: "#FEBE10",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 12,
    borderRadius: 5,
  },
  loginText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
