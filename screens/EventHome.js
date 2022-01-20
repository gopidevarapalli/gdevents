import { useNavigation } from "@react-navigation/native";
import Axios from "axios";
import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  AsyncStorage,
} from "react-native";
import { Button } from "react-native-paper";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
// import { Image } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';
import { connect, useDispatch } from "react-redux";
import api_url from "../Config/Config";
// import {decode} from 'html-entities';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import AsyncStorage from '@react-native-community/async-storage';

const EventHome = (props) => {
  console.log("3", props);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [eventsList, setEventsList] = useState([]);

  const [roundLoading, setRoundLoading] = useState(false);
  const [virtualLoading, setVirtualLoading] = useState(false);

  const gotoSession = (event_id) => {
    console.log(event_id);
    AsyncStorage.setItem("event_id", event_id);
    navigation.navigate("HomeDrawer", { screen: "Agenda" });
  };

  const gotoHome = async (event) => {
    console.log(props.loginData.cookie);
    const formData = new FormData();
    formData.append("cookie", props.loginData.cookie);
    formData.append("event_id", event.event_id_single);
    Axios.post(`${api_url.eventInfo}`, formData).then((res) => {
      console.log(res.data.event_info);
      dispatch({
        type: "GET_Event",
        payload: {
          event: { ...event, event_info: res.data.event_info },
          color: "#09BA90",
        },
      });
      AsyncStorage.setItem("event_id", event.event_id_single);
      navigation.navigate("HomeDrawer", { screen: "Home" });
    });
    // if (event.event_id_single == 695) {
    //   console.log("event if");
    //   dispatch({
    //     type: "GET_Event",
    //     payload: {
    //       event: event,
    //       color: "#09BA90",
    //     },
    //   });
    // } else {
    //   console.log("event else");
    //   dispatch({
    //     type: "GET_Event",
    //     payload: {
    //       event: event,
    //       color: "#09BA90",
    //     },
    //   });
    // }
  };

  useEffect(() => {
    console.log("31 event home");
    // RNRestart.Restart();
    const formData = new FormData();

    formData.append("cookie", props.loginData.cookie);
    Axios.post(
      //`https://events.globaldata.com/api/user/get_all_events`,
      `${api_url.eventList}`,
      formData
    ).then((res) => {
      console.log(res.data);
      if (res.data.status == "ok") {
        setEventsList(res.data.event_data);
        setIsLoading(false);
      } else {
        alert("Something went wrong. Please contact system administrator");
      }
    });
  }, [props]);
  return (
    <ScrollView style={styles.container}>
      {eventsList.map((event, i) => (
        <ImageBackground
          imageStyle={{ borderRadius: 8 }}
          key={i}
          style={styles.backgroundImage}
          source={{ uri: `${event._event_banner}` }}
        >
          <View
            style={{
              paddingTop: 40,
              height: 250,
              backgroundColor: "rgba( 0, 0, 0, 0.6 )",
              borderRadius: 16,
            }}
          >
            <Text
              // numberOfLines={2}
              style={{
                paddingHorizontal: 10,
                fontSize: 18,
                color: "#fff",
                marginTop: 15,
                alignSelf: "center",
                opacity: 1,
                zIndex: 1,
                fontWeight: "bold",
                textAlign: "center",
                textTransform: "capitalize",
              }}
            >
              {event.post_title}
            </Text>

            <Text
              style={{
                color: "#fff",
                alignSelf: "center",
                marginTop: 10,
                fontSize: 10,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              From
            </Text>
            <Text
              style={{
                color: "#fff",
                alignSelf: "center",
                fontSize: 12,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {event._event_start_date} {event._event_start_time}
            </Text>
            <Text
              style={{
                color: "#fff",
                alignSelf: "center",
                fontSize: 10,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              To
            </Text>
            <Text
              style={{
                color: "#fff",
                alignSelf: "center",
                fontSize: 12,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {event._event_end_date} {event._event_end_time}
            </Text>

            <View
              style={{
                padding: 16,
                width: "100%",
                position: "absolute",
                bottom: 0,
                alignSelf: "center",
              }}
            >
              {event.event_type == "round_table" ? (
                <Button
                  style={{ borderRadius: 5 }}
                  uppercase={false}
                  // onPress={onPressLearnMore}
                  contentStyle={{ height: 40 }}
                  labelStyle={{ color: "#2F283D", fontSize: 14 }}
                  mode="contained"
                  color="#00dea5"
                  //title={"GO TO THIS EVENT"}
                  onPress={() => gotoSession(event)}
                >
                  {/* {"GO TO THIS EVENT"} */}
                  Go To This Event
                </Button>
              ) : (
                <Button
                  style={{ borderRadius: 5 }}
                  uppercase={false}
                  // onPress={onPressLearnMore}
                  contentStyle={{ height: 40 }}
                  labelStyle={{ color: "#2F283D", fontSize: 14 }}
                  mode="contained"
                  color="#00dea5"
                  onPress={() => gotoHome(event)}
                  //title={"GO TO THIS EVENT"}
                >
                  {/* {"GO TO THIS EVENT"} */}
                  Go To This Event
                </Button>
              )}

              {/* <Button  style={{margin:8,width:'50%',alignSelf:"center"}}
                    // onPress={onPressLearnMore}
                    contentStyle={{ height: 34  }}
                    labelStyle={{ color: '#fff', fontSize: 11 }}mode="contained"
                    color="#00dea5">Go To This Event</Button> */}
            </View>
          </View>
        </ImageBackground>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    //alignItems:"center",
    //justifyContent:"center"
  },
  backgroundImage: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
    width: "100%",
    height: 250,
    opacity: 0.8,
    borderRadius: 5,
    resizeMode: "cover",
    //marginTop:10,
    marginBottom: 20,
  },
});

const mapPropsToState = (state) => ({
  loginData: state.login,
});

export default connect(mapPropsToState)(EventHome);
