import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import axios from "axios";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/log_in",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      const userToken = "secret-token";
      setToken(userToken);
      alert("vous êtes connecté");
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  return (
    <View style={{ marginTop: 23, backgroundColor: "white" }}>
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../assets/airbnblogo.png")}
          style={styles.imgLogo}
        ></Image>
        <Text style={styles.h1}>Sign in</Text>
        <View style={{ marginTop: 120, width: "80%" }}>
          <TextInput
            style={[styles.input, { marginBottom: 35 }]}
            placeholder="email"
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
        </View>
        <View style={{ marginTop: 120 }}>
          <TouchableOpacity style={styles.signButton} onPress={handleSubmit}>
            <Text style={styles.signLetter}>Sign in</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={styles.noAccount}>No account ? Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imgLogo: {
    width: 110,
    height: 120,
    marginTop: 80,
  },
  h1: {
    marginTop: 30,
    fontSize: 25,
    fontWeight: "700",
    color: "#818181",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#FB999C",
    marginBottom: 20,
    fontSize: 18,
    paddingBottom: 8,
  },
  signButton: {
    borderWidth: 3,
    borderColor: "#FB999C",
    borderRadius: 30,
    paddingHorizontal: 80,
    paddingVertical: 15,
    padding: 5,
    marginBottom: 20,
  },
  signLetter: {
    fontSize: 20,
    fontWeight: "600",
    color: "#818181",
  },
  noAccount: {
    color: "#818181",
    fontWeight: "600",
    marginBottom: 80,
  },
});
