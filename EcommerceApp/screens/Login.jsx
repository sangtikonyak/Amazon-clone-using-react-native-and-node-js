import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decode as atob } from "base-64";
import { UserType } from "../UserContext";
import axios from "axios";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserId } = useContext(UserType);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        console.log(token);

        if (token) {
          const parts = token.split(".");
          const header = JSON.parse(atob(parts[0]));
          const payload = JSON.parse(atob(parts[1]));

          setUserId(payload.userId);
          navigation.replace("Main");
        }
      } catch (err) {
        console.log("error occured", err);
      }
    };
    checkLoginStatus();
    // const userDto = {
    //   userid: "DMP-SCLX1000",
    //   password: "test2403",
    // };
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.post(
    //       "https://symbiosapp.azurewebsites.net/api/Auth/login",
    //       userDto,
    //       {
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );

    //     if (response.status === 200) {
    //       console.log(response.data);
    //     } else {
    //       console.log("Error:", response.data);
    //     }
    //   } catch (error) {
    //     console.log("Error:", error.message);
    //   }
    // };
    // fetchData();
  }, []);

  const handleLogin = async () => {
    const user = {
      email: email,
      password: password,
    };
    try {
      const response = await fetch("http://192.168.0.174:8000/login", {
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
        return;
      }
      const token = data.token;
      console.log(data);
      console.log(token);
      AsyncStorage.setItem("token", token);
      const parts = token.split(".");
      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1]));
      console.log("Header:", header);
      console.log("Payload:", payload.userId);
      setUserId(payload.userId);
      navigation.replace("Main");
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
          <Text style={styles.text}>Login To Your Account</Text>
        </View>

        <View style={{ marginTop: 30 }}>
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
        <TouchableOpacity style={styles.login} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <Pressable
          style={{ marginTop: 18 }}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={{ color: "grey", textAlign: "center", fontSize: 16 }}>
            Dont have an account? signup
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 120,
  },
  text: {
    color: "#041E42",
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 6,
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
