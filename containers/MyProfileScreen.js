import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import MapView from "react-native-maps";
import {
  ActivityIndicator,
  Button,
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/core";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";
import axios from "axios";

export default function SettingsScreen({ setToken }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const { params } = useRoute();
  const id = params.id;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        ` https://express-airbnb-api.herokuapp.com/user/${id}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <View style={[styles.cont, styles.hori]}>
      <ActivityIndicator size="large" color="red" />
    </View>
  ) : (
    <View>
      <Button
        title="Log Out"
        onPress={() => {
          setToken(null);
        }}
      />
    </View>
  );
}
