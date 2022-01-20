import React, { useEffect, useState } from "react";
import {
  View,
  Dimensions,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Alert,
  AsyncStorage,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import CountDown from "react-native-countdown-component";

import { MyMeetingsAction } from "../redux/action/actions";
// var moment = require('moment');
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";
import Axios from "axios";
import api_url from "../Config/Config";
import { FlatList } from "react-native-gesture-handler";
import store from "../redux/store";

const dimensions = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};

const Meeting = (props) => {
  const navigation = useNavigation();
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(true);
  const [MeetingList, setMeetings] = useState([]);
  const [todayDate, setTodayDate] = useState(new Date());
  // if(props.mymeetings.isLoading){
  //   props.MyMeetingsAction(props.login.cookie);
  // }

  useEffect(() => {
    console.log("use effect called meeting js");
    console.log(props.login.cookie);

    if (isLoading) {
      // alert(event_id)
      let formData = new FormData();
      formData.append("cookie", props.login.cookie);
      formData.append("event_id", props.event.common.event.event_id_single);

      Axios.post(`${api_url.meetingList}`, formData)
        .then((res) => {
          console.log("meeting js");
          console.log("meetings res", res);
          setMeetings(
            res.data.my_meetings
              ? res.data.my_meetings == null
                ? []
                : res.data.my_meetings
              : []
          );
          // alert(res.data.my_meetings[3].meeting_date)
          // alert(moment(res.data.my_meetings[3].meeting_date).format("YYYY-MM-DD") === moment(todayDate).format("YYYY-MM-DD")?
          // (moment(todayDate).format("HH:mm")  >= res.data.my_meetings[3].meeting_start)?res.data.my_meetings[3].status ==='Confirmed'?'Meeting started. It will end soon':'Meeting not yet started':'meetng not confirmed':"today is no meeting")
          setIsLoading(false);
        })
        .catch((e) => console.log(e));
    }

    // if(props.mymeetings.isLoading){
    //   props.MyMeetingsAction(props.login.cookie);
    // }
    // console.log(props.mymeetings.common)

    // setMeetings(props.mymeetings.isLoading?[]:props.mymeetings.common.my_meetings);
    // if(!props.mymeetings.isLoading){

    // console.log('hours', Math.abs(props.mymeetings.common.my_meetings[0].meeting_end.split(":")[0] - moment(todayDate,"HH")))
    // console.log('minutes ',Math.abs(moment(todayDate,"MM")-props.mymeetings.common.my_meetings[0].meeting_end.split(":")[1]  ))
    // alert(Math.abs(props.mymeetings.common.my_meetings[0].meeting_end.split(":")[0] - moment(todayDate,"HH")  ))

    // alert(Math.abs(moment(todayDate,"MM")-props.mymeetings.common.my_meetings[0].meeting_end.split(":")[1]  ))
  }, [
    isLoading,
    props.login.cookie,
    props,
    props.event.common.event.event_id_single,
  ]);

  const [loadmore, setLoadmore] = useState(false);

  const [spage, setSpage] = useState(1);

  const getMore = () => {
    if (MeetingList.length >= 9) {
      console.log("gggggg");
      setLoadmore(true);
      const formData = new FormData();
      //formData.append('cookie',"SHEA|1605863201|oLmnrwbiQk2E3urzBPSEIPF8U3fDvPgjKuyl3DMpBHe|38c7c76135a749d958d7727e31c19067bfd2ef75604f13141b5c1d4c89ecf445");
      formData.append("cookie", props.login.cookie);
      formData.append("spage", spage + 1);
      console.log("spage=", spage + 1);
      formData.append("event_id", props.event.common.event.event_id_single);
      Axios.post(`${api_url.meetingList}`, formData).then((res) => {
        console.log(
          `ending date: ${moment(new Date()).format("YYYY")}-${moment(
            new Date(res.data.my_meetings[0].displayTo)
          ).format("MM-DD")} ${res.data.my_meetings[0].meeting_end}`
        );

        console.log("get more");
        // console.log(res.data.companies);
        console.log(res.data.my_meetings);
        if (res.data.my_meetings) {
          setMeetings(
            res.data.my_meetings
              ? res.data.my_meetings == null
                ? []
                : res.data.my_meetings
              : MeetingList
          );
        }

        setLoadmore(false);
        setSpage(spage + 1);
      });
    }
  };

  const refreshMeetings = () => {
    console.log("refresh");
    setIsLoading(true);

    let formData = new FormData();
    formData.append("cookie", props.login.cookie);
    formData.append("event_id", props.event.common.event.event_id_single);

    Axios.post(`${api_url.meetingList}`, formData).then((res) => {
      console.log("refreshing");
      console.log("refresh res", res);
      setMeetings(
        res.data.my_meetings
          ? res.data.my_meetings == null
            ? []
            : res.data.my_meetings
          : []
      );

      setIsLoading(false);
    });
  };

  const cancelMeeting = (meeting_id) => {
    setIsLoading(true);

    const formData = new FormData();
    // formData.append('cookie', "SHEA|1605863201|oLmnrwbiQk2E3urzBPSEIPF8U3fDvPgjKuyl3DMpBHe|38c7c76135a749d958d7727e31c19067bfd2ef75604f13141b5c1d4c89ecf445");
    formData.append("cookie", props.login.cookie);
    formData.append("meeting_id", meeting_id);
    formData.append("status", "cancel");
    formData.append("status_type", "h");
    formData.append("meetingtype", "more");

    formData.append("event_id", props.event.common.event.event_id_single);

    Axios.post(`${api_url.meeting_status_update}`, formData).then((res) => {
      console.log(res.data);
      Axios.post(`${api_url.meetingList}`, formData).then((res) => {
        console.log("my_meetings", res.data.my_meetings);
        setMeetings(
          res.data.my_meetings
            ? res.data.my_meetings == null
              ? []
              : res.data.my_meetings
            : []
        );
        setIsLoading(false);
      });
    });
  };

  let getTiming = (agendaTime) => {
    var otherDate = moment(agendaTime).format("DD-MM-YYYY HH:mm:ss");
    var today = new Date();
    var ms = moment(otherDate, "DD/MM/YYYY HH:mm:ss").diff(
      moment(today, "DD/MM/YYYY HH:mm:ss")
    );
    // var ms = (moment(otherDate).format("DD/MM/YYYY HH:mm:ss")).diff(moment(today).format("DD/MM/YYYY HH:mm:ss"));
    // var d = moment.duration(ms);
    // var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");

    // alert(ms);
    return ms / 1000;
  };

  let AcceptMeeting = (meeting_id) => {
    const formData = new FormData();
    // formData.append('cookie', "SHEA|1605863201|oLmnrwbiQk2E3urzBPSEIPF8U3fDvPgjKuyl3DMpBHe|38c7c76135a749d958d7727e31c19067bfd2ef75604f13141b5c1d4c89ecf445");
    formData.append("cookie", props.login.cookie);
    formData.append("meeting_id", meeting_id);
    formData.append("status", "accept");
    formData.append("status_type", "p");

    formData.append("event_id", props.event.common.event.event_id_single);
    Axios.post(
      //`https://events.globaldata.com/api/user/meeting_status_update`,
      `${api_url.meeting_status_update}`,
      formData
    )
      .then((res) => {
        console.log(res.data);
        if (res.data.error) {
          Alert.alert("Warning", res.data.error);
        } else if (res.data.status) {
          Alert.alert("Success", res.data.status);
          setIsLoading(true);
          formData.append("spage", spage);
          Axios.post(`${api_url.meetingList}`, formData).then((res) => {
            console.log(res.data.my_meetings);
            // setMeetings(res.data.my_meetings?res.data.my_meetings:MeetingList);
            setMeetings(
              res.data.my_meetings
                ? res.data.my_meetings == null
                  ? []
                  : res.data.my_meetings
                : []
            );
            setIsLoading(false);
          });
        }
      })
      .catch(() => {
        Alert.alert("Warning", "Something went wrong. Please contact Admin");
      });
  };

  let DeclineMeeting = (meeting_id) => {
    const formData = new FormData();
    // formData.append('cookie', "SHEA|1605863201|oLmnrwbiQk2E3urzBPSEIPF8U3fDvPgjKuyl3DMpBHe|38c7c76135a749d958d7727e31c19067bfd2ef75604f13141b5c1d4c89ecf445");
    formData.append("cookie", props.login.cookie);
    formData.append("meeting_id", meeting_id);
    formData.append("status", "decline");
    formData.append("status_type", "p");

    formData.append("event_id", props.event.common.event.event_id_single);
    Axios.post(
      //`https://events.globaldata.com/api/user/meeting_status_update`,
      `${api_url.meeting_status_update}`,
      formData
    )
      .then((res) => {
        // console.log(res.data);
        if (res.data.error) {
          Alert.alert("Warning", res.data.error);
        } else if (res.data.status) {
          Alert.alert("Success", res.data.status);
          setIsLoading(true);
          formData.append("spage", spage);
          Axios.post(`${api_url.meetingList}`, formData).then((res) => {
            // console.log(res.data.my_meetings);

            // setMeetings(res.data.my_meetings?res.data.my_meetings:MeetingList);
            setMeetings(
              res.data.my_meetings
                ? res.data.my_meetings == null
                  ? []
                  : res.data.my_meetings
                : []
            );
            setIsLoading(false);
          });
        }
      })
      .catch(() => {
        Alert.alert("Warning", "Something went wrong. Please contact Admin");
      });
  };

  let CancelMeeting = (meeting_id) => {
    const formData = new FormData();
    // formData.append('cookie',"SHEA|1605863201|oLmnrwbiQk2E3urzBPSEIPF8U3fDvPgjKuyl3DMpBHe|38c7c76135a749d958d7727e31c19067bfd2ef75604f13141b5c1d4c89ecf445");
    formData.append("cookie", props.login.cookie);
    formData.append("meeting_id", meeting_id);
    formData.append("status", "cancel");
    formData.append("status_type", "h");

    formData.append("event_id", props.event.common.event.event_id_single);
    Axios.post(
      //`https://events.globaldata.com/api/user/meeting_status_update`,
      `${api_url.meeting_status_update}`,
      formData
    )
      .then((res) => {
        console.log(res.data);
        if (res.data.error) {
          Alert.alert("Warning", res.data.error);
        } else if (res.data.status) {
          Alert.alert("Success", res.data.status);
          setIsLoading(true);
          formData.append("spage", spage);
          Axios.post(`${api_url.meetingList}`, formData).then((res) => {
            // alert('meetings')
            console.log(res.data.my_meetings);
            setMeetings(
              res.data.my_meetings ? res.data.my_meetings : MeetingList
            );
            setIsLoading(false);
          });
        }
      })
      .catch(() => {
        Alert.alert("Warning", "Something went wrong. Please contact Admin");
      });
  };

  return isLoading ? (
    <ActivityIndicator color="green" size={30} />
  ) : (
    <ScrollView>
      <Ionicons
        onPress={refreshMeetings}
        style={{ alignSelf: "center", marginTop: 20 }}
        color="#000"
        name="refresh"
        size={28}
      />
      {MeetingList ? (
        <FlatList
          onEndReached={() => getMore()}
          keyExtractor={(item, i) => i}
          data={MeetingList}
          renderItem={({ item }) => (
            <View>
              {item.status === "" ? (
                <View></View>
              ) : (
                <View style={styles.card}>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>{item.subject}</Text>
                    <Text style={styles.cardDetails}>
                      {item.meeting_date_time}
                    </Text>
                    <Text style={styles.cardDetails}>
                      <Text style={{ fontWeight: "bold", lineHeight: 18 }}>
                        Meeting BY:
                      </Text>{" "}
                      {item.from_user_name}
                    </Text>
                    <Text style={styles.cardDetails}>
                      {item.meeting_date_time}
                    </Text>
                    <Text style={styles.cardDetails}>
                      <Text style={{ fontWeight: "bold", lineHeight: 18 }}>
                        Meet ID:
                      </Text>{" "}
                      {item.meeting_id}
                    </Text>
                    <Text style={styles.cardDetails}>
                      <Text style={{ fontWeight: "bold", lineHeight: 18 }}>
                        Meeting Type:
                      </Text>{" "}
                      {item.meeting_type}
                    </Text>
                    <Text style={styles.cardDetails}>
                      <Text style={{ fontWeight: "bold", lineHeight: 18 }}>
                        Participants:
                      </Text>{" "}
                      {item.to_users}
                    </Text>
                    <Text style={styles.cardDetails}>
                      <Text style={{ fontWeight: "bold", lineHeight: 18 }}>
                        Status:
                      </Text>{" "}
                      {item.status}
                    </Text>
                    {item.status === "Received Request" ? (
                      <Button
                        style={{ margin: 8 }}
                        color="#00dea5"
                        contentStyle={{ height: 34 }}
                        labelStyle={{ color: "white", fontSize: 12 }}
                        mode="contained"
                        onPress={() => {
                          Alert.alert("Prompt", "Accept meeting ?", [
                            {
                              text: "Accept",
                              onPress: () => AcceptMeeting(item.meeting_id),
                            },
                            {
                              text: "Decline",
                              onPress: () => DeclineMeeting(item.meeting_id),
                            },
                            {
                              text: "Close",
                              onPress: () => console.log("Close"),
                              style: "cancel",
                            },
                          ]);
                        }}
                      >
                        {" "}
                        Accept/Decline Request
                      </Button>
                    ) : (
                      <Text></Text>
                    )}

                    {item.status === "Awaiting for Confirmation" ? (
                      <Button
                        style={{ margin: 8 }}
                        color="#00dea5"
                        contentStyle={{ height: 34 }}
                        labelStyle={{ color: "white", fontSize: 12 }}
                        mode="contained"
                        onPress={() => {
                          Alert.alert("Prompt", "Cancel meeting ?", [
                            {
                              text: "Yes",
                              onPress: () => CancelMeeting(item.meeting_id),
                            },

                            {
                              text: "Close",
                              onPress: () => console.log("Close"),
                              style: "cancel",
                            },
                          ]);
                        }}
                      >
                        {" "}
                        Cancel Request
                      </Button>
                    ) : (
                      <View></View>
                    )}

                    {/* {moment(item.meeting_date, "YYYY-MM-DD") == moment(todayDate, "YYYY-MM-DD")?(moment(todayDate, "HH:mm")  < item.meeting_start)? */}

                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1 }}>
                        {
                          // moment(item.meeting_date, "YYYY-MM-DD") == moment(todayDate, "YYYY-MM-DD")?
                          moment(item.meeting_date).format("YYYY-MM-DD") ===
                            moment(todayDate).format("YYYY-MM-DD") &&
                          moment(todayDate, "HH:mm") >= item.meeting_start ? (
                            <Text></Text>
                          ) : item.status === "Confirmed" ? (
                            <Text
                              style={{
                                justifyContent: "flex-start",
                                paddingLeft: 10,
                                paddingBottom: 5,
                                fontWeight: "bold",
                              }}
                            >
                              {" "}
                              Starts In:{" "}
                            </Text>
                          ) : (
                            <Text></Text>
                          )
                        }
                      </View>
                      {moment(item.meeting_date).format("YYYY-MM-DD") ===
                      moment(todayDate).format("YYYY-MM-DD") ? (
                        moment(todayDate).format("HH:mm") >=
                        item.meeting_start ? (
                          item.status === "Confirmed" ? (
                            <View style={{ flex: 1 }}>
                              <Text
                                style={{
                                  justifyContent: "flex-start",
                                  paddingLeft: 10,
                                  paddingBottom: 5,
                                  fontWeight: "bold",
                                }}
                              >
                                {" "}
                                Ends In:{" "}
                              </Text>
                            </View>
                          ) : (
                            <Text></Text>
                          )
                        ) : (
                          <Text></Text>
                        )
                      ) : (
                        <Text></Text>
                      )}
                    </View>

                    <View style={{ flexDirection: "row", marginBottom: 20 }}>
                      {moment(item.meeting_date).format("YYYY-MM-DD") ===
                        moment(todayDate).format("YYYY-MM-DD") &&
                      moment(todayDate).format("HH:mm") >=
                        item.meeting_start ? (
                        item.status == "Confirmed" ? (
                          <Text style={styles.cardTitle}>Meeting Started</Text>
                        ) : (
                          <Text style={styles.cardTitle}>
                            Meeting not yet Confirmed
                          </Text>
                        )
                      ) : (
                        <View style={{ flex: 1 }}>
                          <CountDown
                            until={getTiming(
                              `${item.meeting_date} ${item.meeting_start}`
                            )}
                            // until={ 10  }
                            // onFinish={() =>
                            //   alert(item.subject, "Meeting Time Started")
                            // }
                            size={15}
                          />
                        </View>
                      )}

                      {moment(item.meeting_date).format("YYYY-MM-DD") ===
                      moment(todayDate).format("YYYY-MM-DD") ? (
                        moment(todayDate).format("HH:mm") >=
                        item.meeting_start ? (
                          item.status === "Confirmed" ? (
                            <View style={{ flex: 1 }}>
                              <CountDown
                                until={getTiming(
                                  `${moment(item.meeting_end_date).format(
                                    "YYYY-MM-DD"
                                  )} ${item.meeting_end}`
                                )}
                                size={15}
                              />
                            </View>
                          ) : (
                            <Text></Text>
                          )
                        ) : (
                          <Text></Text>
                        )
                      ) : (
                        <Text></Text>
                      )}
                    </View>
                    <View style={styles.cardImgWrapper}>
                      <View style={styles.cardImg}>
                        <Button
                          style={{ margin: 8 }}
                          color="#1E1727"
                          disabled={
                            moment(item.meeting_date).format("YYYY-MM-DD") ===
                            moment(todayDate).format("YYYY-MM-DD")
                              ? moment(todayDate).format("HH:mm") >=
                                  item.meeting_start &&
                                getTiming(
                                  `${moment(todayDate).format(
                                    "YYYY-MM-DD HH:mm"
                                  )}`
                                ) <
                                  getTiming(
                                    `${moment(item.meeting_end_date).format(
                                      "YYYY-MM-DD"
                                    )} ${item.meeting_end}`
                                  )
                                ? item.status === "Confirmed"
                                  ? false
                                  : true
                                : true
                              : true
                          }
                          //  disabled={false}
                          contentStyle={{ height: 34 }}
                          labelStyle={{
                            color: "white",
                            fontSize: 15,
                            fontWeight: "bold",
                            textTransform: "capitalize",
                          }}
                          mode="contained"
                          onPress={() =>
                            navigation.navigate("videoscreennew", {
                              token: item.token,
                              type: "meeting",
                              meeting_id: item,
                            })
                          }
                        >
                          Join
                        </Button>
                      </View>

                      <View style={styles.cardImg}>
                        <Button
                          style={{ margin: 8 }}
                          color="#C21383"
                          contentStyle={{ height: 34 }}
                          labelStyle={{
                            color: "white",
                            fontSize: 15,
                            fontWeight: "bold",
                            textTransform: "capitalize",
                          }}
                          mode="contained"
                          disabled={
                            item.status === "Cancelled" ||
                            item.status === "Expired"
                              ? true
                              : false
                          }
                          onPress={() => {
                            Alert.alert(
                              "Confirm",
                              "Are you sure do you want to cancel the meeeting?",
                              [
                                {
                                  text: "NO",
                                  onPress: () => console.warn("NO Pressed"),
                                  style: "cancel",
                                },
                                {
                                  text: "YES",
                                  onPress: () => cancelMeeting(item.meeting_id),
                                },
                              ]
                            );
                          }}
                        >
                          Cancel
                        </Button>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </View>
          )}
        />
      ) : (
        <View></View>
      )}
      {MeetingList.length == 0 ? (
        <View
          style={{
            flex: 1,
            textAlign: "center",
            textAlignVertical: "center",
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Text
            style={{
              flex: 1,
              height: dimensions.height / 1.3,
              textAlign: "center",
              justifyContent: "center",
              alignSelf: "center",
              alignContent: "center",
              alignContent: "center",
              textAlignVertical: "center",
            }}
          >
            No Meetings Available
          </Text>
        </View>
      ) : (
        <View></View>
      )}
      {loadmore ? <ActivityIndicator color="green" size={30} /> : <View></View>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderContainer: {
    height: 250,
    width: "100%",
    marginTop: 12,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 0,
  },

  wrapper: {},
  iconWidth: {
    width: 50,
    height: 50,
    padding: 10,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 8,
  },
  sliderImage: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
  },
  categoryContainer: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    marginTop: 25,
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "stretch",
    flexWrap: "wrap",
  },

  categoryBtn: {
    marginBottom: 8,
    marginTop: 8,
    marginHorizontal: 0,
    alignSelf: "center",
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 75,
    height: 75,
    backgroundColor: "#fff" /* '#FF6347' */,
    borderRadius: 10,
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  categoryBtnTxt: {
    alignSelf: "center",
    marginTop: 10,
    color: "#09BA90",
  },
  cardsWrapper: {
    marginTop: 10,
    width: "90%",
    alignSelf: "center",
  },
  card: {
    width: "90%",
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
    flexDirection: "row",
    borderColor: "#fff",
    borderLeftWidth: 0,

    backgroundColor: "#fff",
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
  cardImg: {
    alignSelf: "flex-start",
    flex: 1,

    borderColor: "#fff",

    borderTopLeftRadius: 0,
    borderLeftWidth: 0,
  },
  cardText: {
    borderRadius: 8,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: "#fff",
    borderLeftWidth: 0,
    borderRadius: 8,
    backgroundColor: "#fff",
    //borderBottomRightRadius: 0,
    //borderTopRightRadius: 0,
  },
  cardTitle: {
    fontWeight: "bold",
    lineHeight: 22,
  },
  cardDetails: {
    fontSize: 12,
    color: "#444",
  },
});

const mapStateToProps = (state) => {
  // console.log(state.MyMeetings)
  return {
    mymeetings: state.MyMeetings,
    login: state.login,
    event: state.Event,
  };
};
export default connect(mapStateToProps, { MyMeetingsAction })(Meeting);
