import React, { useState, useEffect } from "react";
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

export default function RoomScreen({ route }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const { params } = useRoute();
  const [isClick, setisClick] = useState(false);

  const id = params.id;

  const OnClick = () => {
    if (!isClick) {
      setisClick(true);
    } else {
      setisClick(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/rooms/${id}`
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
    <View style={{ backgroundColor: "white" }}>
      <SwiperFlatList data={data.photos} renderItem={({ item }) => {}}>
        <View style={{ flexDirection: "column" }}>
          <Image
            style={styles.img}
            source={{
              uri: data.photos[0].url,
            }}
          />
          <View style={styles.infos}>
            <View style={styles.infosView}>
              <Text style={styles.title} numberOfLines={1}>
                {data.title}
              </Text>

              <View style={styles.ratingView}>
                <View style={{ flexDirection: "row" }}>
                  <Entypo
                    name="star"
                    size={20}
                    style={styles.star}
                    color={data.ratingValue > 0 ? "#fbb30c" : "lightgrey"}
                  />
                  <Entypo
                    name="star"
                    size={20}
                    style={styles.star}
                    color={data.ratingValue > 1 ? "#fbb30c" : "lightgrey"}
                  />
                  <Entypo
                    name="star"
                    size={20}
                    style={styles.star}
                    color={data.ratingValue > 2 ? "#fbb30c" : "lightgrey"}
                  />
                  <Entypo
                    name="star"
                    size={20}
                    style={styles.star}
                    color={data.ratingValue > 3 ? "#fbb30c" : "lightgrey"}
                  />
                  <Entypo
                    name="star"
                    size={20}
                    style={styles.star}
                    color={data.ratingValue > 4 ? "#fbb30c" : "lightgrey"}
                  />
                </View>
                <Text style={styles.review}> {data.reviews} reviews</Text>
              </View>
            </View>
            <Image
              source={{
                uri: data.user.account.photo.url,
              }}
              style={styles.userPic}
            />
          </View>
        </View>
      </SwiperFlatList>
      <View style={styles.desc}>
        {isClick === true ? (
          <>
            <Text numberOfLines={7}>{data.description}</Text>
            <TouchableOpacity onPress={OnClick}>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <Text>show less</Text>
                <AntDesign name="caretup" size={15} />
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text numberOfLines={3}>{data.description}</Text>
            <TouchableOpacity onPress={OnClick}>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                }}
              >
                <Text>Show more</Text>
                <AntDesign name="caretdown" size={15} />
              </View>
            </TouchableOpacity>
          </>
        )}
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 48.856614,
          longitude: 2.3522219,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsUserLocation={true}
      >
        {data.location.map((item, index) => {
          return (
            <MapView.Marker
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
            />
          );
        })}
      </MapView>
    </View>
  );
}
const styles = StyleSheet.create({
  cont: {
    flex: 1,
    justifyContent: "center",
  },
  hori: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  price: {
    color: "white",
    fontSize: 20,
    position: "absolute",
    top: "75%",
    backgroundColor: "black",
    padding: 10,
    paddingHorizontal: 15,
  },
  img: {
    height: 300,
    width: 440,
  },
  infos: {
    marginLeft: 10,
    marginRight: 10,
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userPic: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  infosView: {
    width: "70%",
  },
  ratingView: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
  },
  title: {
    fontSize: 20,
    marginLeft: 15,
    marginBottom: 5,
  },
  star: {
    marginRight: 5,
  },
  review: {
    color: "#bbbbbb",
  },
  desc: {
    marginLeft: 25,
    marginRight: 25,
  },
});
