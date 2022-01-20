import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { List } from "react-native-paper";
import moment from "moment";
import * as AddCalendarEvent from "react-native-add-calendar-event";
import Axios from "axios";
import store from "../redux/store";
import api_url from "../Config/Config";
import { connect } from "react-redux";
var dateFormat = require("dateformat");

const TodayAgenda = (props) => {
  console.log("Today Agenda props", props);
  // console.log(15)
  // console.log(props.AgendaData)
  const [AgendaData, setAgendaData] = useState(props.AgendaData);

  const [todayDate, setTodayDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme();

  const navigation = useNavigation();

  useEffect(() => {
    const formData = new FormData();
    // formData.append('cookie', store.getState().login.cookie);

    // formData.append('event_id',props.event.common.event.event_id_single);
    formData.append(
      "cookie",
      // `yoganath1265|1607497047|fDCk2aTwkeoI8L203M3OthVonmFefQPeGSRpsOS8GQr|1a0d8bf324ba1de0db949060813b612c12f7f68777289d40ccbf5760ef896d22`
      props.login.cookie
    );
    formData.append("event_id", props.event.common.event.event_id_single);
    Axios.post(
      //`https://ind-ew-events-website.pantheonsite.io/api/user/get_agenda_v1`,
      //`https://events.globaldata.com/api/user/get_agenda_list`,
      `${api_url.agendaListNew}`,
      formData
    ).then((res) => {
      console.log("Today Agenda res", res);
      // console.log(res.data)
      if (res.data.agenda == null) {
        setAgendaData([]);
      } else {
        // console.log("ressssss", res.data.agenda);
        // console.log(res.data.agenda.filter( (evnt) => moment(todayDate).format("DD-MM-YYYY") == moment(evnt.twf_session_start_time).format("DD-MM-YYYY"))[0].events)

        // console.log( res.data.agenda.filter( (evnt) => moment(todayDate).format("DD-MM-YYYY") == moment(evnt.twf_session_start_time).format("DD-MM-YYYY")) )
        setAgendaData(
          res.data.agenda.filter(
            (evnt) =>
              moment(todayDate).format("DD-MM-YYYY") ==
              moment(evnt.agenda_session_start_time).format("DD-MM-YYYY")
          )
        );
        console.log(
          "dddddddddd",
          res.data.agenda.filter(
            (evnt) =>
              moment(todayDate).format("DD-MM-YYYY") ==
              moment(evnt.agenda_session_start_time).format("DD-MM-YYYY")
          )
        );
        // alert(AgendaData.length)
      }
      // console.log("moment date", moment(todayDate).format("DD-MM-YYYY"));
      // console.log(
      //   "session date",
      //   moment(res.data.agenda.agenda_session_start_time).format("DD-MM-YYYY")
      // );
      // console.log("eeeee", res.data.agenda.agenda_session_start_time)
      setIsLoading(false);
    });
  }, [props.login.cookie, props.event.common.event.event_id_single]);

  useEffect(() => {
    console.log("Today agenda data");
    console.log(AgendaData);
    // console.log(AgendaData.length, moment(todayDate).format("DD-MM-YYYY") == AgendaData[0].agenda_date )
  }, [AgendaData]);

  const utcDateToString = (momentInUTC) => {
    let s = moment
      .utc(momentInUTC)
      .add(-5.49, "hours")
      .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    return s;
  };

  const addCalender = (title, startDate, endDate) => {
    startDate = utcDateToString(startDate);
    endDate = utcDateToString(endDate);
    const eventConfig = {
      title: title,
      startDate: startDate,
      endDate: endDate,
    };
    AddCalendarEvent.presentEventCreatingDialog(eventConfig).then((res) => {
      if (res.action == "CANCELED") {
        Alert.alert("Not Saved", res.action);
      } else {
        Alert.alert("Success", res.action);
      }

      console.log("add to calender");
      console.log(res);
    });
  };

  return isLoading ? (
    <ActivityIndicator size="large" color="green" />
  ) : (
    <ScrollView style={styles.container}>
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />

      {AgendaData.length &&
      moment(todayDate).format("DD-MM-YYYY") == AgendaData[0].agenda_date ? (
        <View>
          <View style={styles.cardsWrapper}>
            {/* <Text style={{ alignSelf: 'flex-start', fontSize: 15,fontWeight: 'bold',color: '#1E1727',paddingBottom:6,paddingTop:6}}>
        Agenda Sessions
        </Text>
  */}
            {AgendaData.map((agenda, i) => {
              return (
                <View key={i}>
                  {agenda.Alltracks ? (
                    agenda.Alltracks.map((evnt, j) => {
                      return (
                        <View key={j}>
                          <View>
                            {evnt.earlier_today ? (
                              evnt.earlier_today.map((todayevnt, k) => {
                                console.log("todayevnt", todayevnt);
                                return moment(todayDate).format("DD-MM-YYYY") ==
                                  moment(
                                    todayevnt.agenda_session_start_time
                                  ).format("DD-MM-YYYY") ? (
                                  <TouchableOpacity
                                    style={styles.card}
                                    key={k}
                                    onPress={() =>
                                      navigation.navigate("AgendaDetails", {
                                        id: todayevnt.agend_id,
                                        apidetails: todayevnt,
                                        provider:
                                          todayevnt.apidetails.webinar_channel,
                                        showCalender: 0,
                                      })
                                    }
                                  >
                                    <View style={styles.cardInfo}>
                                      {todayevnt.add_track ? (
                                        <View
                                          style={{
                                            //flex: 1,
                                            //width: 80,
                                            backgroundColor: "#f1f1f1",
                                            borderRadius: 5,
                                            padding: 4,
                                            marginBottom: 5,
                                          }}
                                        >
                                          <Text
                                            //numberOfLines={1}
                                            style={{
                                              textAlign: "center",
                                              fontSize: 12,
                                              color: "#dd0000",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            {todayevnt.add_track}
                                            {/* jrijirj bejijieji ijtijtijti iejijeijt eijtijtijtij ooooooo jdfjj jdijigjid jigdjijdgij dijigdjigjidj idigjijgdigji digj igjijij */}
                                          </Text>
                                        </View>
                                      ) : (
                                        <View></View>
                                      )}
                                      <View
                                        style={{
                                          flex: 1,
                                          justifyContent: "space-between",
                                          flexDirection: "row",
                                        }}
                                      >
                                        <View style={styles.agendaCardDetails}>
                                          <Text
                                            numberOfLines={1}
                                            style={{
                                              textAlign: "center",
                                              color: "#444",
                                              fontSize: 12,
                                              fontWeight: "bold",
                                            }}
                                          >
                                            {moment(
                                              todayevnt.agenda_session_start_time
                                            ).format("hh:mm A")}{" "}
                                            -{" "}
                                            {moment(
                                              todayevnt.agenda_session_end_time
                                            ).format("hh:mm A")}
                                          </Text>
                                        </View>
                                      </View>

                                      <Text
                                        numberOfLines={3}
                                        style={styles.cardDetails}
                                      >
                                        {todayevnt.agend_title}
                                      </Text>
                                      <View style={{ flexDirection: "row" }}>
                                        {/* <TouchableOpacity
                                          style={{
                                            width: 130,
                                            backgroundColor: "#00dea5",
                                            marginLeft: 4,
                                            marginRight: 4,
                                            paddingTop: 4,
                                            paddingLeft: 5,
                                            paddingRight: 5,
                                            paddingBottom: 4,
                                            marginTop: 8,
                                            borderRadius: 5,
                                          }}
                                        >
                                          <Text
                                            style={{
                                              fontSize: 12,
                                              color: "white",
                                              fontWeight: "bold",
                                              textAlign: "center",
                                            }}
                                            onPress={() =>
                                              addCalender(
                                                todayevnt.agend_title,
                                                todayevnt.agenda_session_start_time,
                                                todayevnt.agenda_session_end_time
                                              )
                                            }
                                          >
                                            Add to Calender
                                          </Text>
                                        </TouchableOpacity> */}
                                      </View>
                                    </View>
                                  </TouchableOpacity>
                                ) : (
                                  <View></View>
                                );
                              })
                            ) : (
                              <View></View>
                            )}
                          </View>

                          <View>
                            {evnt.happening_now ? (
                              evnt.happening_now.map((todayevnt, l) => {
                                console.log(
                                  moment(todayDate).format("DD-MM-YYYY"),
                                  moment(
                                    todayevnt.agenda_session_start_time
                                  ).format("DD-MM-YYYY")
                                );
                                return moment(todayDate).format("DD-MM-YYYY") ==
                                  moment(
                                    todayevnt.agenda_session_start_time
                                  ).format("DD-MM-YYYY") ? (
                                  <TouchableOpacity
                                    style={styles.card}
                                    key={l}
                                    onPress={() =>
                                      navigation.navigate("AgendaDetails", {
                                        id: todayevnt.agend_id,
                                        apidetails: todayevnt,
                                        provider:
                                          todayevnt.apidetails.webinar_channel,
                                        showCalender: 0,
                                      })
                                    }
                                  >
                                    <View style={styles.cardInfo}>
                                      {todayevnt.add_track ? (
                                        <View
                                          style={{
                                            //flex: 1,
                                            //width: 80,
                                            backgroundColor: "#f1f1f1",
                                            borderRadius: 5,
                                            padding: 4,
                                            marginBottom: 5,
                                          }}
                                        >
                                          <Text
                                            //numberOfLines={1}
                                            style={{
                                              textAlign: "center",
                                              fontSize: 12,
                                              color: "#dd0000",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            {todayevnt.add_track}
                                            {/* jrijirj bejijieji ijtijtijti iejijeijt eijtijtijtij ooooooo jdfjj jdijigjid jigdjijdgij dijigdjigjidj idigjijgdigji digj igjijij */}
                                          </Text>
                                        </View>
                                      ) : (
                                        <View></View>
                                      )}
                                      <View
                                        style={{
                                          flex: 1,
                                          justifyContent: "space-between",
                                          flexDirection: "row",
                                        }}
                                      >
                                        <View style={styles.agendaCardDetails}>
                                          <Text
                                            numberOfLines={1}
                                            style={{
                                              textAlign: "center",
                                              color: "#444",
                                              fontSize: 12,
                                              fontWeight: "bold",
                                            }}
                                          >
                                            {moment(
                                              todayevnt.agenda_session_start_time
                                            ).format("hh:mm A")}{" "}
                                            -{" "}
                                            {moment(
                                              todayevnt.agenda_session_end_time
                                            ).format("hh:mm A")}
                                          </Text>
                                        </View>
                                      </View>

                                      <Text
                                        numberOfLines={3}
                                        style={styles.cardDetails}
                                      >
                                        {todayevnt.agend_title}
                                      </Text>
                                      <View style={{ flexDirection: "row" }}>
                                        {/* <TouchableOpacity
                                          style={{
                                            width: 130,
                                            backgroundColor: "#00dea5",
                                            marginLeft: 4,
                                            marginRight: 4,
                                            paddingTop: 4,
                                            paddingLeft: 5,
                                            paddingRight: 5,
                                            paddingBottom: 4,
                                            marginTop: 8,
                                            borderRadius: 5,
                                          }}
                                        >
                                          <Text
                                            style={{
                                              fontSize: 12,
                                              color: "white",
                                              fontWeight: "bold",
                                              textAlign: "center",
                                            }}
                                            onPress={() =>
                                              addCalender(
                                                todayevnt.agend_title,
                                                todayevnt.agenda_session_start_time,
                                                todayevnt.agenda_session_end_time
                                              )
                                            }
                                          >
                                            Add to Calender
                                          </Text>
                                        </TouchableOpacity> */}
                                      </View>
                                    </View>
                                  </TouchableOpacity>
                                ) : (
                                  <View></View>
                                );
                              })
                            ) : (
                              <View></View>
                            )}
                          </View>

                          <View>
                            {evnt.upcoming ? (
                              evnt.upcoming.map((todayevnt, m) => {
                                return moment(todayDate).format("DD-MM-YYYY") ==
                                  moment(
                                    todayevnt.agenda_session_start_time
                                  ).format("DD-MM-YYYY") ? (
                                  <TouchableOpacity
                                    style={styles.card}
                                    key={m}
                                    onPress={() =>
                                      navigation.navigate("AgendaDetails", {
                                        id: todayevnt.agend_id,
                                        apidetails: todayevnt,
                                        provider:
                                          todayevnt.apidetails.webinar_channel,
                                        showCalender: 1,
                                      })
                                    }
                                  >
                                    <View style={styles.cardInfo}>
                                      {todayevnt.add_track ? (
                                        <View
                                          style={{
                                            //flex: 1,
                                            //width: 80,
                                            backgroundColor: "#f1f1f1",
                                            borderRadius: 5,
                                            padding: 4,
                                            marginBottom: 5,
                                          }}
                                        >
                                          <Text
                                            //numberOfLines={1}
                                            style={{
                                              textAlign: "center",
                                              fontSize: 12,
                                              color: "#dd0000",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            {todayevnt.add_track}
                                            {/* jrijirj bejijieji ijtijtijti iejijeijt eijtijtijtij ooooooo jdfjj jdijigjid jigdjijdgij dijigdjigjidj idigjijgdigji digj igjijij */}
                                          </Text>
                                        </View>
                                      ) : (
                                        <View></View>
                                      )}
                                      <View
                                        style={{
                                          flex: 1,
                                          justifyContent: "space-between",
                                          flexDirection: "row",
                                        }}
                                      >
                                        <View style={styles.agendaCardDetails}>
                                          <Text
                                            numberOfLines={1}
                                            style={{
                                              textAlign: "center",
                                              color: "#444",
                                              fontSize: 12,
                                              fontWeight: "bold",
                                            }}
                                          >
                                            {moment(
                                              todayevnt.agenda_session_start_time
                                            ).format("hh:mm A")}{" "}
                                            -{" "}
                                            {moment(
                                              todayevnt.agenda_session_end_time
                                            ).format("hh:mm A")}
                                          </Text>
                                        </View>
                                      </View>

                                      <Text
                                        numberOfLines={3}
                                        style={styles.cardDetails}
                                      >
                                        {todayevnt.agend_title}
                                      </Text>
                                      <View style={{ flexDirection: "row" }}>
                                        <TouchableOpacity
                                          style={{
                                            width: 130,
                                            backgroundColor: "#00dea5",
                                            marginLeft: 4,
                                            marginRight: 4,
                                            paddingTop: 4,
                                            paddingLeft: 5,
                                            paddingRight: 5,
                                            paddingBottom: 4,
                                            marginTop: 8,
                                            borderRadius: 5,
                                          }}
                                        >
                                          <Text
                                            style={{
                                              fontSize: 12,
                                              color: "#444",
                                              fontWeight: "bold",
                                              textAlign: "center",
                                            }}
                                            onPress={() =>
                                              addCalender(
                                                todayevnt.agend_title,
                                                todayevnt.agenda_session_start_time,
                                                todayevnt.agenda_session_end_time
                                              )
                                            }
                                          >
                                            Add to Calender
                                          </Text>
                                        </TouchableOpacity>
                                      </View>
                                    </View>
                                  </TouchableOpacity>
                                ) : (
                                  <View></View>
                                );
                              })
                            ) : (
                              <View></View>
                            )}
                          </View>
                        </View>
                      );
                    })
                  ) : (
                    <View></View>
                  )}
                  {/* on demand started*/}
                  {agenda.OnDemand ? (
                    agenda.OnDemand.map((evnt, j) => {
                      return (
                        <View key={j}>
                          <View>
                            {evnt.earlier_today ? (
                              evnt.earlier_today.map((todayevnt, k) => {
                                console.log("todayevnt", todayevnt);
                                return moment(todayDate).format("DD-MM-YYYY") ==
                                  moment(
                                    todayevnt.agenda_session_start_time
                                  ).format("DD-MM-YYYY") ? (
                                  <TouchableOpacity
                                    style={styles.card}
                                    key={k}
                                    onPress={() =>
                                      navigation.navigate("AgendaDetails", {
                                        id: todayevnt.agend_id,
                                        apidetails: todayevnt,
                                        provider:
                                          todayevnt.apidetails.webinar_channel,
                                        showCalender: 0,
                                      })
                                    }
                                  >
                                    <View style={styles.cardInfo}>
                                      {todayevnt.add_track ? (
                                        <View
                                          style={{
                                            //flex: 1,
                                            //width: 80,
                                            backgroundColor: "#f1f1f1",
                                            borderRadius: 5,
                                            padding: 4,
                                            marginBottom: 5,
                                          }}
                                        >
                                          <Text
                                            //numberOfLines={1}
                                            style={{
                                              textAlign: "center",
                                              fontSize: 12,
                                              color: "#dd0000",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            {todayevnt.add_track}
                                            {/* jrijirj bejijieji ijtijtijti iejijeijt eijtijtijtij ooooooo jdfjj jdijigjid jigdjijdgij dijigdjigjidj idigjijgdigji digj igjijij */}
                                          </Text>
                                        </View>
                                      ) : (
                                        <View></View>
                                      )}
                                      <View
                                        style={{
                                          flex: 1,
                                          justifyContent: "space-between",
                                          flexDirection: "row",
                                        }}
                                      >
                                        <View style={styles.agendaCardDetails}>
                                          <Text
                                            numberOfLines={1}
                                            style={{
                                              textAlign: "center",
                                              color: "#444",
                                              fontSize: 12,
                                              fontWeight: "bold",
                                            }}
                                          >
                                            {moment(
                                              todayevnt.agenda_session_start_time
                                            ).format("hh:mm A")}{" "}
                                            -{" "}
                                            {moment(
                                              todayevnt.agenda_session_end_time
                                            ).format("hh:mm A")}
                                          </Text>
                                        </View>
                                      </View>

                                      <Text
                                        numberOfLines={3}
                                        style={styles.cardDetails}
                                      >
                                        {todayevnt.agend_title}
                                      </Text>
                                      <View style={{ flexDirection: "row" }}>
                                        {/* <TouchableOpacity
                                          style={{
                                            width: 130,
                                            backgroundColor: "#00dea5",
                                            marginLeft: 4,
                                            marginRight: 4,
                                            paddingTop: 4,
                                            paddingLeft: 5,
                                            paddingRight: 5,
                                            paddingBottom: 4,
                                            marginTop: 8,
                                            borderRadius: 5,
                                          }}
                                        >
                                          <Text
                                            style={{
                                              fontSize: 12,
                                              color: "white",
                                              fontWeight: "bold",
                                              textAlign: "center",
                                            }}
                                            onPress={() =>
                                              addCalender(
                                                todayevnt.agend_title,
                                                todayevnt.agenda_session_start_time,
                                                todayevnt.agenda_session_end_time
                                              )
                                            }
                                          >
                                            Add to Calender
                                          </Text>
                                        </TouchableOpacity> */}
                                      </View>
                                    </View>
                                  </TouchableOpacity>
                                ) : (
                                  <View></View>
                                );
                              })
                            ) : (
                              <View></View>
                            )}
                          </View>

                          <View>
                            {evnt.happening_now ? (
                              evnt.happening_now.map((todayevnt, l) => {
                                console.log(
                                  moment(todayDate).format("DD-MM-YYYY"),
                                  moment(
                                    todayevnt.agenda_session_start_time
                                  ).format("DD-MM-YYYY")
                                );
                                return moment(todayDate).format("DD-MM-YYYY") ==
                                  moment(
                                    todayevnt.agenda_session_start_time
                                  ).format("DD-MM-YYYY") ? (
                                  <TouchableOpacity
                                    style={styles.card}
                                    key={l}
                                    onPress={() =>
                                      navigation.navigate("AgendaDetails", {
                                        id: todayevnt.agend_id,
                                        apidetails: todayevnt,
                                        provider:
                                          todayevnt.apidetails.webinar_channel,
                                        showCalender: 0,
                                      })
                                    }
                                  >
                                    <View style={styles.cardInfo}>
                                      {todayevnt.add_track ? (
                                        <View
                                          style={{
                                            //flex: 1,
                                            //width: 80,
                                            backgroundColor: "#f1f1f1",
                                            borderRadius: 5,
                                            padding: 4,
                                            marginBottom: 5,
                                          }}
                                        >
                                          <Text
                                            //numberOfLines={1}
                                            style={{
                                              textAlign: "center",
                                              fontSize: 12,
                                              color: "#dd0000",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            {todayevnt.add_track}
                                            {/* jrijirj bejijieji ijtijtijti iejijeijt eijtijtijtij ooooooo jdfjj jdijigjid jigdjijdgij dijigdjigjidj idigjijgdigji digj igjijij */}
                                          </Text>
                                        </View>
                                      ) : (
                                        <View></View>
                                      )}

                                      <View
                                        style={{
                                          flex: 1,
                                          justifyContent: "space-between",
                                          flexDirection: "row",
                                        }}
                                      >
                                        <View style={styles.agendaCardDetails}>
                                          <Text
                                            numberOfLines={1}
                                            style={{
                                              textAlign: "center",
                                              color: "#444",
                                              fontSize: 12,
                                              fontWeight: "bold",
                                            }}
                                          >
                                            {moment(
                                              todayevnt.agenda_session_start_time
                                            ).format("hh:mm A")}{" "}
                                            -{" "}
                                            {moment(
                                              todayevnt.agenda_session_end_time
                                            ).format("hh:mm A")}
                                          </Text>
                                        </View>
                                      </View>

                                      <Text
                                        numberOfLines={3}
                                        style={styles.cardDetails}
                                      >
                                        {todayevnt.agend_title}
                                      </Text>
                                      <View style={{ flexDirection: "row" }}>
                                        {/* <TouchableOpacity
                                          style={{
                                            width: 130,
                                            backgroundColor: "#00dea5",
                                            marginLeft: 4,
                                            marginRight: 4,
                                            paddingTop: 4,
                                            paddingLeft: 5,
                                            paddingRight: 5,
                                            paddingBottom: 4,
                                            marginTop: 8,
                                            borderRadius: 5,
                                          }}
                                        >
                                          <Text
                                            style={{
                                              fontSize: 12,
                                              color: "white",
                                              fontWeight: "bold",
                                              textAlign: "center",
                                            }}
                                            onPress={() =>
                                              addCalender(
                                                todayevnt.agend_title,
                                                todayevnt.agenda_session_start_time,
                                                todayevnt.agenda_session_end_time
                                              )
                                            }
                                          >
                                            Add to Calender
                                          </Text>
                                        </TouchableOpacity> */}
                                      </View>
                                    </View>
                                  </TouchableOpacity>
                                ) : (
                                  <View></View>
                                );
                              })
                            ) : (
                              <View></View>
                            )}
                          </View>

                          <View>
                            {evnt.upcoming ? (
                              evnt.upcoming.map((todayevnt, m) => {
                                return moment(todayDate).format("DD-MM-YYYY") ==
                                  moment(
                                    todayevnt.agenda_session_start_time
                                  ).format("DD-MM-YYYY") ? (
                                  <TouchableOpacity
                                    style={styles.card}
                                    key={m}
                                    onPress={() =>
                                      navigation.navigate("AgendaDetails", {
                                        id: todayevnt.agend_id,
                                        apidetails: todayevnt,
                                        provider:
                                          todayevnt.apidetails.webinar_channel,
                                        showCalender: 1,
                                      })
                                    }
                                  >
                                    <View style={styles.cardInfo}>
                                      {todayevnt.add_track ? (
                                        <View
                                          style={{
                                            //flex: 1,
                                            //width: 80,
                                            backgroundColor: "#f1f1f1",
                                            borderRadius: 5,
                                            padding: 4,
                                            marginBottom: 5,
                                          }}
                                        >
                                          <Text
                                            //numberOfLines={1}
                                            style={{
                                              textAlign: "center",
                                              fontSize: 12,
                                              color: "#dd0000",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            {todayevnt.add_track}
                                            {/* jrijirj bejijieji ijtijtijti iejijeijt eijtijtijtij ooooooo jdfjj jdijigjid jigdjijdgij dijigdjigjidj idigjijgdigji digj igjijij */}
                                          </Text>
                                        </View>
                                      ) : (
                                        <View></View>
                                      )}

                                      <View
                                        style={{
                                          flex: 1,
                                          justifyContent: "space-between",
                                          flexDirection: "row",
                                        }}
                                      >
                                        <View style={styles.agendaCardDetails}>
                                          <Text
                                            numberOfLines={1}
                                            style={{
                                              textAlign: "center",
                                              color: "#444",
                                              fontSize: 12,
                                              fontWeight: "bold",
                                            }}
                                          >
                                            {moment(
                                              todayevnt.agenda_session_start_time
                                            ).format("hh:mm A")}{" "}
                                            -{" "}
                                            {moment(
                                              todayevnt.agenda_session_end_time
                                            ).format("hh:mm A")}
                                          </Text>
                                        </View>
                                      </View>

                                      <Text
                                        numberOfLines={3}
                                        style={styles.cardDetails}
                                      >
                                        {todayevnt.agend_title}
                                      </Text>
                                      <View style={{ flexDirection: "row" }}>
                                        <TouchableOpacity
                                          style={{
                                            width: 130,
                                            backgroundColor: "#00dea5",
                                            marginLeft: 4,
                                            marginRight: 4,
                                            paddingTop: 4,
                                            paddingLeft: 5,
                                            paddingRight: 5,
                                            paddingBottom: 4,
                                            marginTop: 8,
                                            borderRadius: 5,
                                          }}
                                        >
                                          <Text
                                            style={{
                                              fontSize: 12,
                                              color: "#444",
                                              fontWeight: "bold",
                                              textAlign: "center",
                                            }}
                                            onPress={() =>
                                              addCalender(
                                                todayevnt.agend_title,
                                                todayevnt.agenda_session_start_time,
                                                todayevnt.agenda_session_end_time
                                              )
                                            }
                                          >
                                            Add to Calender
                                          </Text>
                                        </TouchableOpacity>
                                      </View>
                                    </View>
                                  </TouchableOpacity>
                                ) : (
                                  <View></View>
                                );
                              })
                            ) : (
                              <View></View>
                            )}
                          </View>
                        </View>
                      );
                    })
                  ) : (
                    <View></View>
                  )}
                  {/* on demand end*/}
                </View>
              );
            })}

            {/* <TouchableOpacity onPress={()=> navigation.navigate('Agenda')}>
                          <Text style={{marginLeft:290,fontWeight:"bold",fontSize:16}}>{'More >>'}</Text>
                          </TouchableOpacity> */}
          </View>
          <View
            style={{
              alignItems: "flex-end",
              flex: 1,
              alignSelf: "flex-end",
              justifyContent: "flex-end",
              marginBottom: 20,
              marginRight:5
            }}
          >
            <Button
              style={{
                margin: 8,
                width: "30%",
                alignSelf: "flex-end",
                justifyContent: "flex-end",
              }}
              color="#00DEA5"
              contentStyle={{ height: 34 }}
              labelStyle={{
                color: "#1E1727",
                fontSize: 12,
                textTransform: "capitalize",
              }}
              mode="contained"
              onPress={() => navigation.navigate("Agenda")}
            >
              View More
            </Button>
          </View>
        </View>
      ) : (
        <View style={{ margin: 8, marginLeft: 50 }}>
          <Text>There are no sessions today</Text>
        </View>
      )}
    </ScrollView>
  );
};

// export default TodayAgenda;

const mapStateToProps = (state) => {
  // console.log(state.MyMeetings)
  return {
    login: state.login,
    event: state.Event,
  };
};
export default connect(mapStateToProps)(TodayAgenda);

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
    marginTop: 0,
    width: "93%",
    alignSelf: "center",
  },
  card: {
    height: "auto",
    width: "100%",
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

    borderColor: "#fff",
    borderLeftWidth: 0,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
  cardImg: {
    height: "100%",
    width: "100%",
    borderColor: "#fff",
    alignSelf: "center",
    borderRadius: 8,
    borderBottomLeftRadius: 0,
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
  agendaCardDetails: {
    backgroundColor: "#00dea5",
    width: 140,
    color: "white",
    textAlign: "center",
    padding: 2,
    marginLeft: 2,
    marginBottom: 5,
    borderRadius: 5,
    marginTop: 2,
  },
});
