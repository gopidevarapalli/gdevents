import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import Axios from "axios";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Button } from "react-native-paper";
import IonIcon from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import { connect } from "react-redux";
import store from "../redux/store";
import api_url from "../Config/Config";

const SpeakersCard = (props) => {
  const theme = useTheme();
  const navigation = useNavigation();

  console.log("speakers card", props);
  const [speakers, setSpeakers] = useState(props.Speakers);
  const [loadMore, setLoadmore] = useState(false);
  const [spage, setSpage] = useState(1);

  useEffect(() => {
    // console.log(speakers)
  }, []);

  const getMore = () => {
    console.log("get more called");
    setLoadmore(true);
    const formData = new FormData();
    formData.append("cookie", store.getState().login.cookie);
    formData.append("event_id", props.event.common.event.event_id_single);
    formData.append("spage", spage + 1);
    Axios.post(`${api_url.speakersList}`, formData).then((res) => {
      console.log("speakers get more", res.data.speakers_list);
      setSpeakers(res.data.speakers_list);
      setSpage(spage + 1);
      setLoadmore(false);
    });
  };

  return speakers.length == 0 ? (
    <View style={{ flex: 1, textAlign: "center", textAlignVertical: "center" }}>
      <Text
        style={{ flex: 1, textAlign: "center", textAlignVertical: "center" }}
      >
        No Speakers available
      </Text>
    </View>
  ) : (
    <ScrollView style={styles.container}>
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
      <View style={styles.cardsWrapper}>
        <FlatList
          onEndReached={() => getMore()}
          data={speakers}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("userDetails", {
                    user_id: item.user_id,
                    type: "speakers",
                  })
                }
              >
                <View style={styles.card}>
                  <View style={styles.cardImgWrapper1}>
                    <View style={styles.cardImg1}>
                      <Image
                        source={{ uri: item.profile_pic }}
                        resizeMode="cover"
                        style={styles.iconWidth}
                      />
                    </View>
                  </View>
                  <View style={styles.cardInfo}>
                    <Text numberOfLines={1} style={styles.cardTitle}>
                      {item.speaker_name}
                    </Text>
                    <Text numberOfLines={1} style={styles.cardDesg}>
                      {item.job_title}
                    </Text>
                    <Text numberOfLines={1} style={styles.cardDetails}>
                      {item.session_title}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        style={styles.attendeeBtn}
                        onPress={() =>
                          Linking.openURL(
                            item.fb_link.indexOf("http") < 0
                              ? "https://" + item.fb_link
                              : item.fb_link
                          )
                        }
                      >
                        <View
                          style={{
                            marginTop: 8,
                            padding: 2,
                            marginLeft: 5,
                          }}
                        >
                          <Entypo name="facebook" size={25} color="#3b5998" />
                          {/* <Image
              source={require('../assets/icons/facebook.png')}
              resizeMode="cover"
              style={styles.attendeeSize}
            /> */}
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.attendeeBtn}
                        onPress={() =>
                          Linking.openURL(
                            item.linkedin_link.indexOf("http") < 0
                              ? "https://" + item.linkedin_link
                              : item.linkedin_link
                          )
                        }
                      >
                        <View
                          style={{
                            marginTop: 8,
                            padding: 2,
                            marginLeft: 5,
                          }}
                        >
                          <AntDesign name="linkedin-square" size={25} />
                          {/* <Entypo name="linkedin" size={25} color="#00acee"   /> */}
                          {/* <Image
              source={require('../assets/icons/linkedin.png')}
              resizeMode="cover"
              style={styles.attendeeSize}
            /> */}
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.attendeeBtn}
                        onPress={() =>
                          Linking.openURL(
                            item.twitter_link.indexOf("http") < 0
                              ? "https://" + item.twitter_link
                              : item.twitter_link
                          )
                        }
                      >
                        <View
                          style={{
                            marginTop: 8,
                            padding: 2,
                            marginLeft: 5,
                          }}
                        >
                          <Entypo name="twitter" size={25} color="#00acee" />
                          {/* <Image
              source={require('../assets/icons/twi.png')}
              resizeMode="cover"
              style={styles.attendeeSize}
              
            /> */}
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.cardImgWrapper}>
                    <View style={styles.cardImg}>
                      <TouchableOpacity style={styles.attendeeBtn}>
                        <TouchableOpacity
                          style={styles.speakerIcon}
                          onPress={() =>
                            navigation.navigate("meetinglist", {
                              screen: "Request",
                              id: item.user_id,
                              name: item.speaker_name,
                            })
                          }
                        >
                          <AntDesign
                            name="videocamera"
                            size={25}
                            color="#1E1727"
                          />
                          {/* <IonIcon name="ios-arrow-forward" size={25} color="#1E1727" /> */}
                        </TouchableOpacity>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        {/* {loadMore ? (
          <ActivityIndicator size="large" color="green" />
        ) : (
          <View></View>
        )} */}
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    event: state.Event,
  };
};

export default connect(mapStateToProps)(SpeakersCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  cardsWrapper: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
  },
  card: {
    flex: 1,
    //height: 130,
    width: "98%",
    alignSelf: "center",
    justifyContent: "center",
    marginVertical: 10,
    flexDirection: "row",
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    //borderWidth: 0.2,
    borderRadius: 8,
  },
  cardImgWrapper: {
    flex: 1,
    //padding:10,
    borderColor: "#fff",
    borderLeftWidth: 0,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
  iconWidth: {
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 14,
    width: 55,
    height: 55,
    marginLeft: 10,
    borderRadius: 30,
  },
  cardImg: {
    height: "100%",
    width: "100%",
    borderColor: "#fff",
    alignSelf: "center",
    borderRadius: 8,
    flexDirection: "column",

    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderLeftWidth: 0,
  },
  cardImgWrapper1: {
    flex: 1,
    borderRightWidth: 0,
    borderColor: "#fff",
    borderLeftWidth: 0,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardImg1: {
    height: "100%",
    width: "100%",
    borderColor: "#fff",
    alignSelf: "center",
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    borderLeftWidth: 0,
  },
  cardText: {
    borderRadius: 8,
  },
  cardInfo: {
    flex: 3,
    padding: 10,
    borderColor: "#fff",
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 24,
  },
  cardDetails: {
    fontSize: 13,
    // fontWeight:'600',
    color: "#444",
  },
  cardDesg: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
    lineHeight: 20,
  },
  attendeeSize: {
    width: 20,
    height: 20,
    marginRight: 15,
  },
  attendeeIcon: {
    marginTop: 8,
    //  marginRight:35
  },
  speakerIcon: {
    marginTop: 10,
    alignSelf: "flex-end",
    paddingRight: 15,
  },
});
