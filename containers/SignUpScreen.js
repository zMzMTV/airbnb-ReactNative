import React, { useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/core";

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/sign_up",
        {
          email,
          password,
          username,
          description,
          confirmPassword,
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
    <SafeAreaView>
      <View>
        <View style={styles.container}>
          <Image
            style={styles.img}
            source={require("../assets/airbnblogo.png")}
          ></Image>
          <Text style={styles.title}>Sign up</Text>
          <View style={{ width: "80%" }}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
            <TextInput
              style={styles.username}
              placeholder="Username"
              onChangeText={(text) => {
                setUsername(text);
              }}
            />
            <TextInput
              style={styles.area}
              placeholder="Describe yourself in a few words"
              onChangeText={(text) => {
                setDescription(text);
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Comfirm password"
              secureTextEntry={true}
              onChangeText={(text) => {
                setConfirmPassword(text);
              }}
            />
          </View>
          <View>
            <TouchableOpacity onPress={handleSubmit}>
              <Text style={styles.button}> Sign up </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={styles.account}>
              Already have an account ? Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  img: {
    height: 120,
    width: 113,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    color: "#b1B1b1",
    fontWeight: "700",
    marginBottom: 10,
    marginTop: 15,
  },
  input: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "red",
    marginBottom: 30,
    paddingBottom: 8,
  },
  button: {
    color: "#818181",
    borderColor: "#f9696e",
    borderWidth: 3,
    borderRadius: 25,
    padding: 5,
    paddingHorizontal: 50,
    paddingVertical: 6,
    fontSize: 25,
    fontWeight: "500",
    marginBottom: 15,
  },
  account: {
    fontSize: 15,
    color: "#818181",
    fontWeight: "600",
  },
  area: {
    fontSize: 18,
    textAlignVertical: "top",
    height: 100,
    borderWidth: 1,
    borderColor: "#f9696e",
    marginBottom: 10,
  },
  username: {
    marginBottom: 30,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#f9696e",
    paddingBottom: 8,
  },
});
