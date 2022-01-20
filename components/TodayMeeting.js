import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  AsyncStorage,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import CountDown from "react-native-countdown-component";

import { MyMeetingsAction } from "../redux/action/actions";
var dateFormat = require("dateformat");

import moment from "moment";
import Axios from "axios";
import api_url from "../Config/Config";

const TodayMeetings = (props) => {
  //console.log("Today meeting", props);
  const navigation = useNavigation();
  const theme = useTheme();

  const [MeetingList, setMeetings] = useState([]);
  const [todayDate, setTodayDate] = useState(new Date());

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(api_url.meetingList);
    let formData = new FormData();
    formData.append("cookie", props.login.cookie);

    formData.append("event_id", props.event.common.event.event_id_single);
    // formData.append('cookie',"SHEA|1605863201|oLmnrwbiQk2E3urzBPSEIPF8U3fDvPgjKuyl3DMpBHe|38c7c76135a749d958d7727e31c19067bfd2ef75604f13141b5c1d4c89ecf445");
    Axios.post(`${api_url.meetingList}`, formData).then((res) => {
      //console.log("response",res)
      console.log("res", res.data);
      // console.log(res.data.my_meetings.filter(item=> moment(item.meeting_date, "YYYY-MM-DD") == moment(todayDate, "YYYY-MM-DD")));
      if (res.data.my_meetings == null) {
        setMeetings([]);
      } else {
        setMeetings(
          res.data.my_meetings.filter(
            (item) =>
              moment(item.meeting_date).format("YYYY-MM-DD") ==
                moment(todayDate).format("YYYY-MM-DD") &&
              (item.status == "Confirmed" ||
                item.status == "Awaiting for Confirmation" ||
                item.status == "Received Request")
          )
        );
        console.log("Today Meetings");
        console.log(res.data.my_meetings);
        console.log(
          res.data.my_meetings.filter(
            (item) =>
              moment(item.meeting_date).format("YYYY-MM-DD") ==
                moment(todayDate).format("YYYY-MM-DD") &&
              (item.status == "Confirmed" ||
                item.status == "Awaiting for Confirmation" ||
                item.status == "Received Request")
          )
        );
      }
      setIsLoading(false);
    });

    // setMeetings(props.mymeetings.isLoading?[]:props.mymeetings.common.my_meetings);
  }, [props.login.cookie, props.event.common.event.event_id_single]);

  const cancelMeeting = (meeting_id) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("cookie", props.login.cookie);
    // formData.append('cookie',"SHEA|1605863201|oLmnrwbiQk2E3urzBPSEIPF8U3fDvPgjKuyl3DMpBHe|38c7c76135a749d958d7727e31c19067bfd2ef75604f13141b5c1d4c89ecf445");

    formData.append("meeting_id", meeting_id);
    formData.append("status", "cancel");
    formData.append("status_type", "h");
    formData.append("meetingtype", "more");
    formData.append("event_id", props.event.common.event.event_id_single);

    Axios.post(`${api_url.meeting_status_update}`, formData).then((res) => {
      console.log(res.data);
      Axios.post(`${api_url.meetingList}`, formData).then((res) => {
        if (res.data.my_meetings == null) {
          setMeetings([]);
          setIsLoading(false);
        } else {
          setMeetings(res.data.my_meetings);
          setIsLoading(false);
        }
      });
    });
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
          // formData.append("spage", spage);
          Axios.post(`${api_url.meetingList}`, formData).then((res) => {
            //console.log("response",res)
            console.log("res", res.data);
            // console.log(res.data.my_meetings.filter(item=> moment(item.meeting_date, "YYYY-MM-DD") == moment(todayDate, "YYYY-MM-DD")));
            if (res.data.my_meetings == null) {
              setMeetings([]);
            } else {
              setMeetings(
                res.data.my_meetings.filter(
                  (item) =>
                    moment(item.meeting_date).format("YYYY-MM-DD") ==
                      moment(todayDate).format("YYYY-MM-DD") &&
                    (item.status == "Confirmed" ||
                      item.status == "Awaiting for Confirmation" ||
                      item.status == "Received Request")
                )
              );
              console.log("Today Meetings");
              console.log(res.data.my_meetings);
              console.log(
                res.data.my_meetings.filter(
                  (item) =>
                    moment(item.meeting_date).format("YYYY-MM-DD") ==
                      moment(todayDate).format("YYYY-MM-DD") &&
                    (item.status == "Confirmed" ||
                      item.status == "Awaiting for Confirmation" ||
                      item.status == "Received Request")
                )
              );
            }
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
          // formData.append("spage", spage);
          Axios.post(`${api_url.meetingList}`, formData).then((res) => {
            //console.log("response",res)
            console.log("res", res.data);
            // console.log(res.data.my_meetings.filter(item=> moment(item.meeting_date, "YYYY-MM-DD") == moment(todayDate, "YYYY-MM-DD")));
            if (res.data.my_meetings == null) {
              setMeetings([]);
            } else {
              setMeetings(
                res.data.my_meetings.filter(
                  (item) =>
                    moment(item.meeting_date).format("YYYY-MM-DD") ==
                      moment(todayDate).format("YYYY-MM-DD") &&
                    (item.status == "Confirmed" ||
                      item.status == "Awaiting for Confirmation" ||
                      item.status == "Received Request")
                )
              );
              console.log("Today Meetings");
              console.log(res.data.my_meetings);
              console.log(
                res.data.my_meetings.filter(
                  (item) =>
                    moment(item.meeting_date).format("YYYY-MM-DD") ==
                      moment(todayDate).format("YYYY-MM-DD") &&
                    (item.status == "Confirmed" ||
                      item.status == "Awaiting for Confirmation" ||
                      item.status == "Received Request")
                )
              );
            }
            setIsLoading(false);
          });
        }
      })
      .catch(() => {
        Alert.alert("Warning", "Something went wrong. Please contact Admin");
      });
  };

  let getTiming = (agendaTime) => {
    var otherDate = moment(agendaTime).format("DD-MM-YYYY HH:mm:ss");
    var today = new Date();
    var ms = moment(otherDate, "DD/MM/YYYY HH:mm:ss").diff(
      moment(today, "DD/MM/YYYY HH:mm:ss")
    );
    // var d = moment.duration(ms);
    // var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");

    // alert(ms);
    return ms / 1000;
  };

  return isLoading ? (
    <ActivityIndicator size="large" color="green" />
  ) : (
    <ScrollView>
      {MeetingList ? (
        MeetingList.map((meeting, i) =>
          moment(meeting.meeting_date).format("YYYY-MM-DD") ==
          moment(todayDate).format("YYYY-MM-DD") ? (
            <View key={i}>
              {meeting.status == "Expired" || meeting.status == "Cancelled" ? (
                <View></View>
              ) : meeting.status == "Confirmed" ||
                meeting.status == "Awaiting for Confirmation" ||
                meeting.status == "Received Request" ? (
                <View style={styles.card}>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>{meeting.subject}</Text>
                    <Text style={styles.cardDetails}>
                      {meeting.meeting_date_time}
                    </Text>
                    <Text style={styles.cardDetails}>
                      <Text style={{ fontWeight: "bold", lineHeight: 18 }}>
                        Meeting BY:
                      </Text>{" "}
                      {meeting.from_user_name}
                    </Text>
                    <Text style={styles.cardDetails}>
                      {meeting.meeting_date_time}
                    </Text>
                    <Text style={styles.cardDetails}>
                      <Text style={{ fontWeight: "bold", lineHeight: 18 }}>
                        Meet ID:
                      </Text>{" "}
                      {meeting.meeting_id}
                    </Text>
                    <Text style={styles.cardDetails}>
                      <Text style={{ fontWeight: "bold", lineHeight: 18 }}>
                        Meeting Type:
                      </Text>{" "}
                      {meeting.meeting_type}
                    </Text>
                    <Text style={styles.cardDetails}>
                      <Text style={{ fontWeight: "bold", lineHeight: 18 }}>
                        Participants:
                      </Text>{" "}
                      {meeting.to_users}
                    </Text>
                    <Text style={styles.cardDetails}>
                      <Text style={{ fontWeight: "bold", lineHeight: 18 }}>
                        Status:
                      </Text>{" "}
                      {meeting.status}
                    </Text>
                    {meeting.status === "Received Request" ? (
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
                              onPress: () => AcceptMeeting(meeting.meeting_id),
                            },
                            {
                              text: "Decline",
                              onPress: () => DeclineMeeting(meeting.meeting_id),
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

                    {/* {moment(meeting.meeting_date, "YYYY-MM-DD") == moment(todayDate, "YYYY-MM-DD")?(moment(todayDate, "HH:mm")  < meeting.meeting_start)? */}

                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1 }}>
                        {
                          // moment(meeting.meeting_date, "YYYY-MM-DD") == moment(todayDate, "YYYY-MM-DD")?
                          moment(meeting.meeting_date).format("YYYY-MM-DD") ==
                            moment(todayDate).format("YYYY-MM-DD") &&
                          moment(todayDate).format("HH:mm") >=
                            meeting.meeting_start ? (
                            <Text></Text>
                          ) : meeting.status == "Confirmed" ? (
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
                      {moment(meeting.meeting_date).format("YYYY-MM-DD") ==
                      moment(todayDate).format("YYYY-MM-DD") ? (
                        moment(todayDate).format("HH:mm") >=
                        meeting.meeting_start ? (
                          meeting.status == "Confirmed" ? (
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
                      {moment(meeting.meeting_date).format("YYYY-MM-DD") ==
                        moment(todayDate).format("YYYY-MM-DD") &&
                      moment(todayDate).format("HH:mm") >=
                        meeting.meeting_start ? (
                        meeting.status == "Confirmed" ? (
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
                              `${meeting.meeting_date} ${meeting.meeting_start}`
                            )}
                            // onFinish={() => alert("Meeting Started")}
                            size={15}
                          />
                        </View>
                      )}

                      {moment(meeting.meeting_date).format("YYYY-MM-DD") ==
                      moment(todayDate).format("YYYY-MM-DD") ? (
                        moment(todayDate).format("HH:mm") >=
                        meeting.meeting_start ? (
                          meeting.status == "Confirmed" ? (
                            <View style={{ flex: 1 }}>
                              <CountDown
                                // until={getTiming(
                                //   `${moment((new Date())).format('YYYY')}-${moment((new Date(meeting.displayTo))).format('MM-DD')} ${meeting.meeting_end}`
                                // )}
                                until={getTiming(
                                  `${moment(meeting.meeting_end_date).format(
                                    "YYYY-MM-DD"
                                  )} ${meeting.meeting_end}`
                                )}
                                // onFinish={() => alert("Meeting Finished")}
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
                          // disabled={
                          //   moment(meeting.meeting_date).format("YYYY-MM-DD") ==
                          //   moment(todayDate).format("YYYY-MM-DD")
                          //     ? ((moment(todayDate).format("HH:mm") >=
                          //       meeting.meeting_start))
                          //       ? meeting.status == "Confirmed"
                          //         ? false
                          //         : true
                          //       : true
                          //     : true
                          // }
                          disabled={
                            moment(meeting.meeting_date).format(
                              "YYYY-MM-DD"
                            ) === moment(todayDate).format("YYYY-MM-DD")
                              ? moment(todayDate).format("HH:mm") >=
                                  meeting.meeting_start &&
                                getTiming(
                                  `${moment(todayDate).format(
                                    "YYYY-MM-DD HH:mm"
                                  )}`
                                ) <
                                  getTiming(
                                    `${moment(meeting.meeting_end_date).format(
                                      "YYYY-MM-DD"
                                    )} ${meeting.meeting_end}`
                                  )
                                ? meeting.status === "Confirmed"
                                  ? false
                                  : true
                                : true
                              : true
                          }
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
                              token: meeting.token,
                              type: "meeting",
                              meeting_id: meeting,
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
                                  onPress: () =>
                                    cancelMeeting(meeting.meeting_id),
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
              ) : (
                <Text></Text>
              )}
            </View>
          ) : (
            <View></View>
          )
        )
      ) : (
        <View></View>
      )}
      {/* <TouchableOpacity onPress={()=> navigation.navigate('meetinglist',{title:'Meetings'})}>
         <Text style={{textAlign:'right', width:'50%', padding:10,color:'',fontWeight:"bold",fontSize:16}}>View More</Text>
       </TouchableOpacity> */}
      {!MeetingList.length ? (
        <View style={{ margin: 8, marginLeft: 50 }}>
          <Text>There are no meetings today</Text>
        </View>
      ) : (
        <View></View>
      )}
      {MeetingList.length ? (
        <View style={{ marginRight: 5 }}>
          <Button
            style={{
              marginTop: 10,
              margin: 8,
              width: "30%",
              alignSelf: "flex-end",
            }}
            color="#00DEA5"
            contentStyle={{ height: 34 }}
            labelStyle={{
              color: "#1E1727",
              fontSize: 12,
              textTransform: "capitalize",
            }}
            mode="contained"
            onPress={() =>
              navigation.navigate("meetinglist", { title: "Meetings" })
            }
          >
            View More
          </Button>
        </View>
      ) : (
        <View></View>
      )}
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
    width: "93%",
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
export default connect(mapStateToProps, { MyMeetingsAction })(TodayMeetings);
