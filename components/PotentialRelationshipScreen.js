import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { useState } from "react";
import Axios from "axios";
import store from "../redux/store";
import api_url from "../Config/Config";
import { connect } from "react-redux";

const PotentialRelationshipScreen = (props) => {
  const theme = useTheme();
  const navigation = useNavigation();

  const [attendees, setAttendees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [spage, setSpage] = useState(1);

  useEffect(() => {
    const formData = new FormData();
    formData.append("cookie", props.login.cookie);
    formData.append("event_id", props.event.common.event.event_id_single);
    //formData.append("spage", spage + 1);
    Axios.post(`${api_url.potentialRelation}`, formData).then((res) => {
      console.log("potential relationships", res.data.potentialrelationships);
      setAttendees(
        res.data.potentialrelationships
          ? res.data.potentialrelationships == null
            ? []
            : res.data.potentialrelationships
          : []
      );
      //console.log("pppp", res.data.potentialrelationships);
      //setSpage(spage + 1);
      setIsLoading(false);
    });
  }, []);

  const getMore = () => {
    console.log("potential get more");
    // setIsLoading(true);
    const formData = new FormData();
    formData.append("cookie", props.login.cookie);
    formData.append("event_id", props.event.common.event.event_id_single);
    formData.append("spage", spage + 1);
    Axios.post(`${api_url.potentialRelation}`, formData).then((res) => {
      console.log("rreee", res.data.potentialrelationships);
      setAttendees(
        res.data.potentialrelationships
          ? res.data.potentialrelationships == null
            ? []
            : res.data.potentialrelationships.forEach((user, i) => {
                attendees.push(user);
              })
          : []
      );
      setIsLoading(false);
      //attendees.push(attendees);
      setAttendees(attendees);
      setSpage(spage + 1);
      console.log("full", attendees);
    });
  };

  return isLoading ? (
    <ActivityIndicator size="large" color="green" />
  ) : (
    <ScrollView style={styles.container}>
      <View style={styles.cardsWrapper}>
        <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
        <FlatList
          onEndReached={() => getMore()}
          data={attendees}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  navigation.navigate("userDetails", {
                    user_id: item.user_id,
                  })
                }
              >
                <View style={styles.cardImgWrapper1}>
                  <View style={styles.cardImg1}>
                    <Image
                      source={{ uri: item.profilepic }}
                      resizeMode="cover"
                      style={styles.iconWidth}
                    />
                  </View>
                </View>
                <View style={styles.cardInfo}>
                  <Text numberOfLines={1} style={styles.cardTitle}>
                    {item.display_name}
                  </Text>
                  <Text numberOfLines={1} style={styles.cardDesg}>
                    {item.job_title}
                  </Text>
                  <Text numberOfLines={1} style={styles.cardDetails}>
                    {item.company_name}
                  </Text>
                  <View style={{ flexDirection: "row" }}></View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        {/* {isLoading ? <ActivityIndicator color="green" size="large" /> : null} */}
        {/* <View style={styles.cardsWrapper}>
        {attendees.length ? (
          attendees.map((attendee, i) => (
            <TouchableOpacity
              style={styles.card}
              key={i}
              onPress={() =>
                navigation.navigate("userDetails", {
                  user_id: attendee.user_id,
                })
              }
            >
              <View style={styles.cardImgWrapper1}>
                <View style={styles.cardImg1}>
                  <Image
                    source={{ uri: attendee.profilepic }}
                    resizeMode="cover"
                    style={styles.iconWidth}
                  />
                </View>
              </View>
              <View style={styles.cardInfo}>
                <Text numberOfLines={1} style={styles.cardTitle}>
                  {attendee.display_name}
                </Text>
                <Text numberOfLines={1} style={styles.cardDesg}>
                  {attendee.job_title}
                </Text>
                <Text numberOfLines={1} style={styles.cardDetails}>
                  {attendee.company_name}
                </Text>
                <View style={{ flexDirection: "row" }}></View>
              </View>
              <View style={styles.cardImgWrapper}>
                <View style={styles.cardImg}>
                  <TouchableOpacity style={styles.attendeeBtn}>
                    <View style={styles.attendeeIcon}></View>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text
            style={{
              flex: 1,
              textAlign: "center",
              textAlignVertical: "center",
            }}
          >
            No Data Found
          </Text>
        )}
      </View> */}
      </View>
    </ScrollView>
  );
};

// export default PotentialRelationshipScreen;

const mapStateToProps = (state) => {
  // console.log(state.MyMeetings)
  return {
    login: state.login,
    event: state.Event,
  };
};
export default connect(mapStateToProps)(PotentialRelationshipScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 16,
  },

  cardsWrapper: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
  },
  card: {
    flex: 1,
    //height: 90,
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
    // borderWidth: 0.2,
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
  attendeeIcon: {},

  cardImg: {
    height: "100%",
    width: "100%",
    borderColor: "#fff",
    alignSelf: "center",
    borderRadius: 8,
    flexDirection: "row",

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
    //borderBottomRightRadius: 0,
    //borderTopRightRadius: 0,
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
    width: 25,
    height: 25,
    margin: 4,
  },
  attendeeIcon: {
    marginTop: 10,
  },
  attendeeSize1: {
    // width:30,
    height: 28,

    marginTop: 5,
    marginRight: 15,
  },
});
