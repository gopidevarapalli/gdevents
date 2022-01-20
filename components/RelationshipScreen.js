import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";

import { useNavigation, useTheme } from "@react-navigation/native";
import { ActivityIndicator, Button } from "react-native-paper";
import { useState } from "react";
import { FlatList, RectButton } from "react-native-gesture-handler";
import Axios from "axios";
import store from "../redux/store";
import api_url from "../Config/Config";
import Swipeable from "react-native-gesture-handler/Swipeable";
// import Animated from 'react-native-reanimated';

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";

const RelationshipScreen = (props) => {
  console.log("recommended props", props);
  const theme = useTheme();
  const navigation = useNavigation();
  const [attendees, setAttendees] = useState(props.relationshipData);
  const [spage, setSpage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  let [attendeeTemp, setattendeeTemp] = useState([]);

  useEffect(() => {
    try {
      setAttendees(attendees);
    } catch (e) {}
  }, attendeeTemp);

  const getMore = () => {
    if (attendees.length > 4) {
      console.log("get more called");
      setIsLoading(true);
      const formData = new FormData();
      formData.append("cookie", props.login.cookie);
      formData.append("spage", spage + 1);
      formData.append("event_id", props.event.common.event.event_id_single);
      Axios.post(`${api_url.myRelations}`, formData).then((res) => {
        console.log("load more");
        console.log(res.data.myrelationships.length);
        setAttendees(res.data.myrelationships);
        setSpage(spage + 1);
        console.log(spage + 1);
        setIsLoading(false);
      });
    }
  };

  const renderLeftActions = (progress, dragX, item) => {
    //  console.log(props)
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <RectButton
        onPress={() => {
          console.log(item.user_id);
          const formData = new FormData();
          formData.append("cookie", props.login.cookie);
          formData.append("id", item.user_id);
          formData.append("type", "my-relationships");
          formData.append("event_id", props.event.common.event.event_id_single);

          Axios.post(
            //`https://events.globaldata.com/api/user/ignore_connections`,
            `${api_url.ignoreConnections}`,
            formData
          ).then((res) => {
            console.log("Recommended", res);
            // console.log(res.data);
            formData.append("spage", spage);
            let temp = attendees.splice(attendees.indexOf(item), 1);
            temp = attendees;
            // console.log(temp);
            setAttendees(temp);
            setattendeeTemp([]);
          });
        }}
      >
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }],
            },
            {
              // backgroundColor:"red",
              height: 65,
              marginTop: 20,
              padding: 15,
              borderRadius: 5,
            },
          ]}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "red",
            }}
          >
            Remove
          </Text>
          {/* <MaterialCommunityIcons name="delete-forever-outline" size={30} color="white" /> */}
        </Animated.Text>
      </RectButton>
    );
  };
  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
      <View style={styles.cardsWrapper}>
        <FlatList
          onEndReached={() => getMore()}
          keyExtractor={(item, i) => i}
          data={attendees}
          renderItem={({ item }) => (
            <Swipeable
              renderLeftActions={(progress, dragX) =>
                renderLeftActions(progress, dragX, item)
              }
            >
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  navigation.navigate("userDetails", { user_id: item.user_id })
                }
              >
                <View style={styles.cardImgWrapper1}>
                  <View style={styles.cardImg1}>
                    <Image
                      source={{
                        uri:
                          //"https://events.globaldata.com" + item.profilepic,
                          //`${api_url.live_url}` + item.profilepic,
                          item.profilepic == null
                            ? api_url.neutralImage
                            : item.profilepic,
                      }}
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
                  <Text numberOfLines={2} style={styles.cardDetails}>
                    {item.company_name}
                  </Text>
                </View>
                <View style={styles.cardImgWrapper}>
                  <View style={styles.cardImg}>
                    <TouchableOpacity style={styles.attendeeBtn}>
                      <View style={styles.attendeeIcon}>
                        <Text
                          style={{
                            color: "#00DEA5",
                            backgroundColor: "#2F283D",
                            padding: 8,
                            borderRadius: 10,
                          }}
                        >
                          {Math.floor(item.score_value)}%
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </Swipeable>
          )}
        />

        {isLoading ? (
          <ActivityIndicator color="green" size={30} />
        ) : (
          <Text></Text>
        )}
        {/* <View style={{ alignSelf: 'flex-end',}}>
        <Button style={{marginTop:8,marginBottom:12 ,width:120,borderRadius:15}} color="#00DEA5"
          contentStyle={{ height: 34,  }}
          labelStyle={{ color: "#2F283D", fontSize: 12 }}mode="contained" onPress={() => console.log('Pressed')}>
           View More
          </Button> 
        </View> */}
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return { login: state.login, event: state.Event };
};

// export default AgendaDetails;

export default connect(mapStateToProps)(RelationshipScreen);

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
