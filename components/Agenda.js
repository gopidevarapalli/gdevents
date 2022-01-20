import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { List } from "react-native-paper";
import moment from "moment";
import * as AddCalendarEvent from "react-native-add-calendar-event";
import { event } from "react-native-reanimated";
import globalstyleConfig from "../Config/globalstyleConfig";

const Agenda = (props) => {
  // console.log(15)
  console.log("Agendaa", props);
  const [AgendaData, setAgendaData] = useState(props.AgendaData[0]);
  const theme = useTheme();

  const navigation = useNavigation();

  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

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

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
      {AgendaData.length && AgendaData[0].Alltracks ? (
        <View style={styles.cardsWrapper}>
          <Text style={globalstyleConfig.agenda.tracks}>All Tracks</Text>

          {AgendaData.length &&
          AgendaData[0].Alltracks &&
          AgendaData[0].Alltracks[0].earlier_today ? (
            <>
              <Text style={globalstyleConfig.agenda.tracksSub}>
                Earlier Today
              </Text>
              <List.Section>
                {AgendaData.map((agenda, i) => {
                  return (
                    <View style={globalstyleConfig.agenda.listSection} key={i}>
                      <List.Accordion
                        key={i}
                        title={agenda.agenda_date}
                        theme={{ colors: { primary: "#00dea5" } }}
                        // left={(props) => <List.Icon {...props} icon="folder" />}
                      >
                        {agenda.Alltracks ? (
                          agenda.Alltracks.map((evnt, j) => {
                            //console.log("all tracks", evnt);
                            return (
                              <View key={j}>
                                {evnt.earlier_today ? (
                                  evnt.earlier_today.map((todayevnt, k) => {
                                    //console.log("Today event", evnt);
                                    return (
                                      <TouchableOpacity
                                        style={globalstyleConfig.agenda.card}
                                        key={k}
                                        onPress={() =>
                                          navigation.navigate("AgendaDetails", {
                                            id: todayevnt.agend_id,
                                            apidetails: todayevnt,
                                            provider:
                                              todayevnt.apidetails
                                                .webinar_channel,
                                            showCalender: 0,
                                          })
                                        }
                                      >
                                        <View
                                          style={
                                            globalstyleConfig.agenda.cardInfo
                                          }
                                        >
                                          {/* <Text
                                      style={{
                                        //fontSize: 15,
                                       // marginLeft: 18,
                                        fontWeight: "bold",
                                        alignSelf:"flex-end",
                                        color: "red",
                                        marginRight:10
                                       // width: "20%",
                                        // borderBottomWidth: 3,
                                        // borderBottomColor: "#00dea5",
                                      }}
                                    >
                                      {todayevnt.add_track}
                                    </Text> */}
                                          {todayevnt.add_track ? (
                                            <View
                                              style={
                                                globalstyleConfig.agenda
                                                  .addTrack
                                              }
                                            >
                                              <Text
                                                //numberOfLines={1}
                                                style={
                                                  globalstyleConfig.agenda
                                                    .addTrackText
                                                }
                                              >
                                                {todayevnt.add_track}
                                                {/* jrijirj bejijieji ijtijtijti iejijeijt eijtijtijtij ooooooo jdfjj jdijigjid jigdjijdgij dijigdjigjidj idigjijgdigji digj igjijij */}
                                              </Text>
                                            </View>
                                          ) : (
                                            <View></View>
                                          )}
                                          <View
                                            style={
                                              globalstyleConfig.agenda
                                                .dateTimeParent1
                                            }
                                          >
                                            <View
                                              style={
                                                globalstyleConfig.agenda
                                                  .dateTimeParent2
                                              }
                                            >
                                              <Text
                                                numberOfLines={1}
                                                style={
                                                  globalstyleConfig.agenda
                                                    .dateTimeText
                                                }
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
                                            style={
                                              globalstyleConfig.agenda
                                                .agendaTitle
                                            }
                                          >
                                            {todayevnt.agend_title}
                                          </Text>
                                          <View
                                            style={{ flexDirection: "row" }}
                                          >
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
                                            {/* <TouchableOpacity
                              style={{backgroundColor:'#1E1727', color:'white', paddingTop: 4, paddingLeft:5,paddingRight:5, paddingBottom:4, marginTop:8,borderRadius:5 }}
                              
                                >
                            <Text style={{fontSize:10,color:'white'}}>Add to my Schedule</Text>
                          </TouchableOpacity> */}
                                          </View>
                                        </View>
                                      </TouchableOpacity>
                                    );
                                  })
                                ) : (
                                  <View style={{ marginBottom: 20 }}>
                                    <Text
                                      style={
                                        globalstyleConfig.agenda.noSessions
                                      }
                                    >
                                      No Sessions Found
                                    </Text>
                                  </View>
                                )}
                              </View>
                            );
                          })
                        ) : (
                          <View></View>
                        )}
                      </List.Accordion>
                    </View>
                  );
                })}
              </List.Section>
            </>
          ) : null}

          {AgendaData.length &&
          AgendaData[0].Alltracks &&
          AgendaData[0].Alltracks[0].happening_now ? (
            <>
              <Text style={globalstyleConfig.agenda.tracksSub}>
                Happening Now
              </Text>

              <List.Section>
                {AgendaData.map((agenda, k) => {
                  return (
                    <View style={globalstyleConfig.agenda.listSection} key={k}>
                      <List.Accordion
                        key={k}
                        title={agenda.agenda_date}
                        theme={{ colors: { primary: "#00dea5" } }}
                        // left={(props) => <List.Icon {...props} icon="folder" />}
                      >
                        {agenda.Alltracks ? (
                          agenda.Alltracks.map((evnt, j) => {
                            //console.log("all tracks", evnt);
                            return (
                              <View key={j}>
                                {evnt.happening_now ? (
                                  evnt.happening_now.map((todayevnt, l) => {
                                    console.log("Today event", evnt);
                                    return (
                                      <TouchableOpacity
                                        style={globalstyleConfig.agenda.card}
                                        key={l}
                                        onPress={() =>
                                          navigation.navigate("AgendaDetails", {
                                            id: todayevnt.agend_id,
                                            apidetails: todayevnt,
                                            provider:
                                              todayevnt.apidetails
                                                .webinar_channel,
                                            showCalender: 0,
                                          })
                                        }
                                      >
                                        <View
                                          style={
                                            globalstyleConfig.agenda.cardInfo
                                          }
                                        >
                                          {todayevnt.add_track ? (
                                            <View
                                              style={
                                                globalstyleConfig.agenda
                                                  .addTrack
                                              }
                                            >
                                              <Text
                                                //numberOfLines={1}
                                                style={
                                                  globalstyleConfig.agenda
                                                    .addTrackText
                                                }
                                              >
                                                {todayevnt.add_track}
                                                {/* jrijirj bejijieji ijtijtijti iejijeijt eijtijtijtij ooooooo jdfjj jdijigjid jigdjijdgij dijigdjigjidj idigjijgdigji digj igjijij */}
                                              </Text>
                                            </View>
                                          ) : (
                                            <View></View>
                                          )}

                                          <View
                                            style={
                                              globalstyleConfig.agenda
                                                .dateTimeParent1
                                            }
                                          >
                                            <View
                                              style={
                                                globalstyleConfig.agenda
                                                  .dateTimeParent2
                                              }
                                            >
                                              <Text
                                                numberOfLines={1}
                                                style={
                                                  globalstyleConfig.agenda
                                                    .dateTimeText
                                                }
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
                                            style={
                                              globalstyleConfig.agenda
                                                .agendaTitle
                                            }
                                          >
                                            {todayevnt.agend_title}
                                          </Text>
                                          <View
                                            style={{ flexDirection: "row" }}
                                          >
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
                                    );
                                  })
                                ) : (
                                  <View style={{ marginBottom: 20 }}>
                                    <Text
                                      style={
                                        globalstyleConfig.agenda.noSessions
                                      }
                                    >
                                      No Sessions Found
                                    </Text>
                                  </View>
                                )}
                              </View>
                            );
                          })
                        ) : (
                          <View></View>
                        )}
                      </List.Accordion>
                    </View>
                  );
                })}
              </List.Section>
            </>
          ) : null}

          {AgendaData.length &&
          AgendaData[0].Alltracks &&
          AgendaData[0].Alltracks[0].upcoming ? (
            <>
              <Text style={globalstyleConfig.agenda.tracksSub}>Upcoming</Text>

              <List.Section>
                {AgendaData.map((agenda, m) => {
                  return (
                    <View style={globalstyleConfig.agenda.listSection} key={m}>
                      <List.Accordion
                        key={m}
                        title={agenda.agenda_date}
                        theme={{ colors: { primary: "#00dea5" } }}
                        // left={(props) => <List.Icon {...props} icon="folder" />}
                      >
                        {/* <Text
                    style={{
                      //fontSize: 15,
                      marginLeft: 18,
                      fontWeight: "bold",
                      color: "#1E1727",
                      width: "20%",
                      borderBottomWidth: 3,
                      borderBottomColor: "#00dea5",
                    }}
                  >
                    {agenda.Alltracks[0].earlier_today[0].add_track}
                  </Text> */}

                        {agenda.Alltracks ? (
                          agenda.Alltracks.map((evnt, n) => {
                            //console.log("all tracks", evnt);
                            return (
                              <View key={n}>
                                {evnt.upcoming ? (
                                  evnt.upcoming.map((todayevnt, o) => {
                                    //console.log("Today event", evnt);
                                    return (
                                      <TouchableOpacity
                                        style={globalstyleConfig.agenda.card}
                                        key={o}
                                        onPress={() =>
                                          navigation.navigate("AgendaDetails", {
                                            id: todayevnt.agend_id,
                                            apidetails: todayevnt,
                                            provider:
                                              todayevnt.apidetails
                                                .webinar_channel,
                                            showCalender: 1,
                                          })
                                        }
                                      >
                                        <View
                                          style={
                                            globalstyleConfig.agenda.cardInfo
                                          }
                                        >
                                          {todayevnt.add_track ? (
                                            <View
                                              style={
                                                globalstyleConfig.agenda
                                                  .addTrack
                                              }
                                            >
                                              <Text
                                                //numberOfLines={1}
                                                style={
                                                  globalstyleConfig.agenda
                                                    .addTrackText
                                                }
                                              >
                                                {todayevnt.add_track}
                                                {/* jrijirj bejijieji ijtijtijti iejijeijt eijtijtijtij ooooooo jdfjj jdijigjid jigdjijdgij dijigdjigjidj idigjijgdigji digj igjijij */}
                                              </Text>
                                            </View>
                                          ) : (
                                            <View></View>
                                          )}
                                          <View
                                            style={
                                              globalstyleConfig.agenda
                                                .dateTimeParent1
                                            }
                                          >
                                            <View
                                              style={
                                                globalstyleConfig.agenda
                                                  .dateTimeParent2
                                              }
                                            >
                                              <Text
                                                numberOfLines={1}
                                                style={
                                                  globalstyleConfig.agenda
                                                    .dateTimeText
                                                }
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
                                            style={
                                              globalstyleConfig.agenda
                                                .agendaTitle
                                            }
                                          >
                                            {todayevnt.agend_title}
                                          </Text>
                                          <View
                                            style={{ flexDirection: "row" }}
                                          >
                                            <TouchableOpacity
                                              style={
                                                globalstyleConfig.agenda
                                                  .addToCalendarParent
                                              }
                                            >
                                              <Text
                                                style={
                                                  globalstyleConfig.agenda
                                                    .addToCalendarText
                                                }
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
                                    );
                                  })
                                ) : (
                                  <View style={{ marginBottom: 20 }}>
                                    <Text
                                      style={
                                        globalstyleConfig.agenda.noSessions
                                      }
                                    >
                                      No Sessions Found
                                    </Text>
                                  </View>
                                )}
                              </View>
                            );
                          })
                        ) : (
                          <View></View>
                        )}
                      </List.Accordion>
                    </View>
                  );
                })}
              </List.Section>
            </>
          ) : null}
        </View>
      ) : null}
      {/* on Demand start */}

      {AgendaData.length && AgendaData[0].OnDemand ? (
        <View style={styles.cardsWrapper}>
          <Text style={globalstyleConfig.agenda.tracks}>On Demand</Text>

          {AgendaData.length &&
          AgendaData[0].OnDemand &&
          AgendaData[0].OnDemand[0].earlier_today ? (
            <>
              <Text style={globalstyleConfig.agenda.tracksSub}>
                Earlier Today
              </Text>
              <List.Section>
                {AgendaData.map((agenda, i) => {
                  return (
                    <View style={globalstyleConfig.agenda.listSection} key={i}>
                      <List.Accordion
                        key={i}
                        title={agenda.agenda_date}
                        theme={{ colors: { primary: "#00dea5" } }}
                        // left={(props) => <List.Icon {...props} icon="folder" />}
                      >
                        {agenda.OnDemand ? (
                          agenda.OnDemand.map((evnt, j) => {
                            //console.log("all tracks", evnt);
                            return (
                              <View key={j}>
                                {evnt.earlier_today ? (
                                  evnt.earlier_today.map((todayevnt, k) => {
                                    //console.log("Today event", evnt);
                                    return (
                                      <TouchableOpacity
                                        style={globalstyleConfig.agenda.card}
                                        key={k}
                                        onPress={() =>
                                          navigation.navigate("AgendaDetails", {
                                            id: todayevnt.agend_id,
                                            apidetails: todayevnt,
                                            provider:
                                              todayevnt.apidetails
                                                .webinar_channel,
                                            showCalender: 0,
                                          })
                                        }
                                      >
                                        <View
                                          style={
                                            globalstyleConfig.agenda.cardInfo
                                          }
                                        >
                                          {todayevnt.add_track ? (
                                            <View
                                              style={
                                                globalstyleConfig.agenda
                                                  .addTrack
                                              }
                                            >
                                              <Text
                                                //numberOfLines={1}
                                                style={
                                                  globalstyleConfig.agenda
                                                    .addTrackText
                                                }
                                              >
                                                {todayevnt.add_track}
                                                {/* jrijirj bejijieji ijtijtijti iejijeijt eijtijtijtij ooooooo jdfjj jdijigjid jigdjijdgij dijigdjigjidj idigjijgdigji digj igjijij */}
                                              </Text>
                                            </View>
                                          ) : (
                                            <View></View>
                                          )}
                                          {/* <Text
                                      style={{
                                        //fontSize: 15,
                                       // marginLeft: 18,
                                        fontWeight: "bold",
                                        alignSelf:"flex-end",
                                        color: "red",
                                        marginRight:10
                                       // width: "20%",
                                        // borderBottomWidth: 3,
                                        // borderBottomColor: "#00dea5",
                                      }}
                                    >
                                      {todayevnt.add_track}
                                    </Text> */}
                                          <View
                                            style={
                                              globalstyleConfig.agenda
                                                .dateTimeParent1
                                            }
                                          >
                                            <View
                                              style={
                                                globalstyleConfig.agenda
                                                  .dateTimeParent2
                                              }
                                            >
                                              <Text
                                                numberOfLines={1}
                                                style={
                                                  globalstyleConfig.agenda
                                                    .dateTimeText
                                                }
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
                                            style={
                                              globalstyleConfig.agenda
                                                .agendaTitle
                                            }
                                          >
                                            {todayevnt.agend_title}
                                          </Text>
                                          <View
                                            style={{ flexDirection: "row" }}
                                          >
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
                                            {/* <TouchableOpacity
                              style={{backgroundColor:'#1E1727', color:'white', paddingTop: 4, paddingLeft:5,paddingRight:5, paddingBottom:4, marginTop:8,borderRadius:5 }}
                              
                                >
                            <Text style={{fontSize:10,color:'white'}}>Add to my Schedule</Text>
                          </TouchableOpacity> */}
                                          </View>
                                        </View>
                                      </TouchableOpacity>
                                    );
                                  })
                                ) : (
                                  <View style={{ marginBottom: 20 }}>
                                    <Text
                                      style={
                                        globalstyleConfig.agenda.noSessions
                                      }
                                    >
                                      No Sessions Found
                                    </Text>
                                  </View>
                                )}
                              </View>
                            );
                          })
                        ) : (
                          <View></View>
                        )}
                      </List.Accordion>
                    </View>
                  );
                })}
              </List.Section>
            </>
          ) : null}

          {AgendaData.length &&
          AgendaData[0].OnDemand &&
          AgendaData[0].OnDemand[0].happening_now ? (
            <>
              <Text style={globalstyleConfig.agenda.tracksSub}>
                Happening Now
              </Text>

              <List.Section>
                {AgendaData.map((agenda, k) => {
                  return (
                    <View style={globalstyleConfig.agenda.listSection} key={k}>
                      <List.Accordion
                        key={k}
                        title={agenda.agenda_date}
                        theme={{ colors: { primary: "#00dea5" } }}
                        // left={(props) => <List.Icon {...props} icon="folder" />}
                      >
                        {agenda.OnDemand ? (
                          agenda.OnDemand.map((evnt, j) => {
                            //console.log("all tracks", evnt);
                            return (
                              <View key={j}>
                                {evnt.happening_now ? (
                                  evnt.happening_now.map((todayevnt, l) => {
                                    console.log("Today event", evnt);
                                    return (
                                      <TouchableOpacity
                                        style={globalstyleConfig.agenda.card}
                                        key={l}
                                        onPress={() =>
                                          navigation.navigate("AgendaDetails", {
                                            id: todayevnt.agend_id,
                                            apidetails: todayevnt,
                                            provider:
                                              todayevnt.apidetails
                                                .webinar_channel,
                                            showCalender: 0,
                                          })
                                        }
                                      >
                                        <View
                                          style={
                                            globalstyleConfig.agenda.cardInfo
                                          }
                                        >
                                          {todayevnt.add_track ? (
                                            <View
                                              style={
                                                globalstyleConfig.agenda
                                                  .addTrack
                                              }
                                            >
                                              <Text
                                                //numberOfLines={1}
                                                style={
                                                  globalstyleConfig.agenda
                                                    .addTrackText
                                                }
                                              >
                                                {todayevnt.add_track}
                                                {/* jrijirj bejijieji ijtijtijti iejijeijt eijtijtijtij ooooooo jdfjj jdijigjid jigdjijdgij dijigdjigjidj idigjijgdigji digj igjijij */}
                                              </Text>
                                            </View>
                                          ) : (
                                            <View></View>
                                          )}

                                          <View
                                            style={
                                              globalstyleConfig.agenda
                                                .dateTimeParent1
                                            }
                                          >
                                            <View
                                              style={
                                                globalstyleConfig.agenda
                                                  .dateTimeParent2
                                              }
                                            >
                                              <Text
                                                numberOfLines={1}
                                                style={
                                                  globalstyleConfig.agenda
                                                    .dateTimeText
                                                }
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
                                            style={
                                              globalstyleConfig.agenda
                                                .agendaTitle
                                            }
                                          >
                                            {todayevnt.agend_title}
                                          </Text>
                                          <View
                                            style={{ flexDirection: "row" }}
                                          >
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
                                    );
                                  })
                                ) : (
                                  <View style={{ marginBottom: 20 }}>
                                    <Text
                                      style={
                                        globalstyleConfig.agenda.noSessions
                                      }
                                    >
                                      No Sessions Found
                                    </Text>
                                  </View>
                                )}
                              </View>
                            );
                          })
                        ) : (
                          <View></View>
                        )}
                      </List.Accordion>
                    </View>
                  );
                })}
              </List.Section>
            </>
          ) : null}

          {AgendaData.length &&
          AgendaData[0].OnDemand &&
          AgendaData[0].OnDemand[0].upcoming ? (
            <>
              <Text style={globalstyleConfig.agenda.tracksSub}>Upcoming</Text>

              <List.Section>
                {AgendaData.map((agenda, m) => {
                  return (
                    <View style={globalstyleConfig.agenda.listSection} key={m}>
                      <List.Accordion
                        key={m}
                        title={agenda.agenda_date}
                        theme={{ colors: { primary: "#00dea5" } }}
                        // left={(props) => <List.Icon {...props} icon="folder" />}
                      >
                        {/* <Text
                    style={{
                      //fontSize: 15,
                      marginLeft: 18,
                      fontWeight: "bold",
                      color: "#1E1727",
                      width: "20%",
                      borderBottomWidth: 3,
                      borderBottomColor: "#00dea5",
                    }}
                  >
                    {agenda.Alltracks[0].earlier_today[0].add_track}
                  </Text> */}

                        {agenda.OnDemand ? (
                          agenda.OnDemand.map((evnt, n) => {
                            //console.log("all tracks", evnt);
                            return (
                              <View key={n}>
                                {evnt.upcoming ? (
                                  evnt.upcoming.map((todayevnt, o) => {
                                    //console.log("Today event", evnt);
                                    return (
                                      <TouchableOpacity
                                        style={globalstyleConfig.agenda.card}
                                        key={o}
                                        onPress={() =>
                                          navigation.navigate("AgendaDetails", {
                                            id: todayevnt.agend_id,
                                            apidetails: todayevnt,
                                            provider:
                                              todayevnt.apidetails
                                                .webinar_channel,
                                            showCalender: 1,
                                          })
                                        }
                                      >
                                        <View
                                          style={
                                            globalstyleConfig.agenda.cardInfo
                                          }
                                        >
                                          {todayevnt.add_track ? (
                                            <View
                                              style={
                                                globalstyleConfig.agenda
                                                  .addTrack
                                              }
                                            >
                                              <Text
                                                //numberOfLines={1}
                                                style={
                                                  globalstyleConfig.agenda
                                                    .addTrackText
                                                }
                                              >
                                                {todayevnt.add_track}
                                                {/* jrijirj bejijieji ijtijtijti iejijeijt eijtijtijtij ooooooo jdfjj jdijigjid jigdjijdgij dijigdjigjidj idigjijgdigji digj igjijij */}
                                              </Text>
                                            </View>
                                          ) : (
                                            <View></View>
                                          )}
                                          <View
                                            style={
                                              globalstyleConfig.agenda
                                                .dateTimeParent1
                                            }
                                          >
                                            <View
                                              style={
                                                globalstyleConfig.agenda
                                                  .dateTimeParent2
                                              }
                                            >
                                              <Text
                                                numberOfLines={1}
                                                style={
                                                  globalstyleConfig.agenda
                                                    .dateTimeText
                                                }
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
                                            style={
                                              globalstyleConfig.agenda
                                                .agendaTitle
                                            }
                                          >
                                            {todayevnt.agend_title}
                                          </Text>
                                          <View
                                            style={{ flexDirection: "row" }}
                                          >
                                            <TouchableOpacity
                                              style={
                                                globalstyleConfig.agenda
                                                  .addToCalendarParent
                                              }
                                            >
                                              <Text
                                                style={
                                                  globalstyleConfig.agenda
                                                    .addToCalendarText
                                                }
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
                                    );
                                  })
                                ) : (
                                  <View style={{ marginBottom: 20 }}>
                                    <Text
                                      style={
                                        globalstyleConfig.agenda.noSessions
                                      }
                                    >
                                      No Sessions Found
                                    </Text>
                                  </View>
                                )}
                              </View>
                            );
                          })
                        ) : (
                          <View></View>
                        )}
                      </List.Accordion>
                    </View>
                  );
                })}
              </List.Section>
            </>
          ) : null}
        </View>
      ) : null}
      {/* on Demand end*/}

      {/* Track 1  */}
      {AgendaData.length && AgendaData[0].Track1 ? (
        <View style={styles.cardsWrapper}>
          <Text style={globalstyleConfig.agenda.tracks}>Track 1</Text>

          {AgendaData.length &&
          AgendaData[0].Track1 &&
          AgendaData[0].Track1[0].earlier_today ? (
            <>
              <Text style={globalstyleConfig.agenda.tracksSub}>
                Earlier Today
              </Text>
              <List.Section>
                {AgendaData.map((agenda, i) => {
                  return (
                    <View style={globalstyleConfig.agenda.listSection} key={i}>
                      <List.Accordion
                        key={i}
                        title={agenda.agenda_date}
                        theme={{ colors: { primary: "#00dea5" } }}
                        // left={(props) => <List.Icon {...props} icon="folder" />}
                      >
                        {agenda.Track1 ? (
                          agenda.Track1.map((evnt, j) => {
                            //console.log("all tracks", evnt);
                            return (
                              <View key={j}>
                                {evnt.earlier_today ? (
                                  evnt.earlier_today.map((todayevnt, k) => {
                                    //console.log("Today event", evnt);
                                    return (
                                      <TouchableOpacity
                                        style={globalstyleConfig.agenda.card}
                                        key={k}
                                        onPress={() =>
                                          navigation.navigate("AgendaDetails", {
                                            id: todayevnt.agend_id,
                                            apidetails: todayevnt,
                                            provider:
                                              todayevnt.apidetails
                                                .webinar_channel,
                                            showCalender: 0,
                                          })
                                        }
                                      >
                                        <View
                                          style={
                                            globalstyleConfig.agenda.cardInfo
                                          }
                                        >
                                          {todayevnt.add_track ? (
                                            <View
                                              style={
                                                globalstyleConfig.agenda
                                                  .addTrack
                                              }
                                            >
                                              <Text
                                                //numberOfLines={1}
                                                style={
                                                  globalstyleConfig.agenda
                                                    .addTrackText
                                                }
                                              >
                                                {todayevnt.add_track}
                                                {/* jrijirj bejijieji ijtijtijti iejijeijt eijtijtijtij ooooooo jdfjj jdijigjid jigdjijdgij dijigdjigjidj idigjijgdigji digj igjijij */}
                                              </Text>
                                            </View>
                                          ) : (
                                            <View></View>
                                          )}
                                          {/* <Text
                                      style={{
                                        //fontSize: 15,
                                       // marginLeft: 18,
                                        fontWeight: "bold",
                                        alignSelf:"flex-end",
                                        color: "red",
                                        marginRight:10
                                       // width: "20%",
                                        // borderBottomWidth: 3,
                                        // borderBottomColor: "#00dea5",
                                      }}
                                    >
                                      {todayevnt.add_track}
                                    </Text> */}
                                          <View
                                            style={
                                              globalstyleConfig.agenda
                                                .dateTimeParent1
                                            }
                                          >
                                            <View
                                              style={
                                                globalstyleConfig.agenda
                                                  .dateTimeParent2
                                              }
                                            >
                                              <Text
                                                numberOfLines={1}
                                                style={
                                                  globalstyleConfig.agenda
                                                    .dateTimeText
                                                }
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
                                            style={
                                              globalstyleConfig.agenda
                                                .agendaTitle
                                            }
                                          >
                                            {todayevnt.agend_title}
                                          </Text>
                                          <View
                                            style={{ flexDirection: "row" }}
                                          >
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
                                            {/* <TouchableOpacity
                              style={{backgroundColor:'#1E1727', color:'white', paddingTop: 4, paddingLeft:5,paddingRight:5, paddingBottom:4, marginTop:8,borderRadius:5 }}
                              
                                >
                            <Text style={{fontSize:10,color:'white'}}>Add to my Schedule</Text>
                          </TouchableOpacity> */}
                                          </View>
                                        </View>
                                      </TouchableOpacity>
                                    );
                                  })
                                ) : (
                                  <View style={{ marginBottom: 20 }}>
                                    <Text
                                      style={
                                        globalstyleConfig.agenda.noSessions
                                      }
                                    >
                                      No Sessions Found
                                    </Text>
                                  </View>
                                )}
                              </View>
                            );
                          })
                        ) : (
                          <View></View>
                        )}
                      </List.Accordion>
                    </View>
                  );
                })}
              </List.Section>
            </>
          ) : null}
          {AgendaData.length &&
          AgendaData[0].Track1 &&
          AgendaData[0].Track1[0].happening_now ? (
            <>
              <Text style={globalstyleConfig.agenda.tracksSub}>
                Happening Now
              </Text>

              <List.Section>
                {AgendaData.map((agenda, k) => {
                  return (
                    <View style={globalstyleConfig.agenda.listSection} key={k}>
                      <List.Accordion
                        key={k}
                        title={agenda.agenda_date}
                        theme={{ colors: { primary: "#00dea5" } }}
                        // left={(props) => <List.Icon {...props} icon="folder" />}
                      >
                        {agenda.Track1 ? (
                          agenda.Track1.map((evnt, j) => {
                            //console.log("all tracks", evnt);
                            return (
                              <View key={j}>
                                {evnt.happening_now ? (
                                  evnt.happening_now.map((todayevnt, l) => {
                                    //console.log("Today event", evnt);
                                    return (
                                      <TouchableOpacity
                                        style={globalstyleConfig.agenda.card}
                                        key={l}
                                        onPress={() =>
                                          navigation.navigate("AgendaDetails", {
                                            id: todayevnt.agend_id,
                                            apidetails: todayevnt,
                                            provider:
                                              todayevnt.apidetails
                                                .webinar_channel,
                                            showCalender: 0,
                                          })
                                        }
                                      >
                                        <View
                                          style={
                                            globalstyleConfig.agenda.cardInfo
                                          }
                                        >
                                          {todayevnt.add_track ? (
                                            <View
                                              style={
                                                globalstyleConfig.agenda
                                                  .addTrack
                                              }
                                            >
                                              <Text
                                                //numberOfLines={1}
                                                style={
                                                  globalstyleConfig.agenda
                                                    .addTrackText
                                                }
                                              >
                                                {todayevnt.add_track}
                                                {/* jrijirj bejijieji ijtijtijti iejijeijt eijtijtijtij ooooooo jdfjj jdijigjid jigdjijdgij dijigdjigjidj idigjijgdigji digj igjijij */}
                                              </Text>
                                            </View>
                                          ) : (
                                            <View></View>
                                          )}
                                          <View
                                            style={
                                              globalstyleConfig.agenda
                                                .dateTimeParent1
                                            }
                                          >
                                            <View
                                              style={
                                                globalstyleConfig.agenda
                                                  .dateTimeParent2
                                              }
                                            >
                                              <Text
                                                numberOfLines={1}
                                                style={
                                                  globalstyleConfig.agenda
                                                    .dateTimeText
                                                }
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
                                            style={
                                              globalstyleConfig.agenda
                                                .agendaTitle
                                            }
                                          >
                                            {todayevnt.agend_title}
                                          </Text>
                                          <View
                                            style={{ flexDirection: "row" }}
                                          >
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
                                    );
                                  })
                                ) : (
                                  <View style={{ marginBottom: 20 }}>
                                    <Text
                                      style={
                                        globalstyleConfig.agenda.noSessions
                                      }
                                    >
                                      No Sessions Found
                                    </Text>
                                  </View>
                                )}
                              </View>
                            );
                          })
                        ) : (
                          <View></View>
                        )}
                      </List.Accordion>
                    </View>
                  );
                })}
              </List.Section>
            </>
          ) : null}

          {AgendaData.length &&
          AgendaData[0].Track1 &&
          AgendaData[0].Track1[0].upcoming ? (
            <>
              <Text style={globalstyleConfig.agenda.tracksSub}>Upcoming</Text>

              <List.Section>
                {AgendaData.map((agenda, m) => {
                  return (
                    <View style={globalstyleConfig.agenda.listSection} key={m}>
                      <List.Accordion
                        key={m}
                        title={agenda.agenda_date}
                        theme={{ colors: { primary: "#00dea5" } }}
                        // left={(props) => <List.Icon {...props} icon="folder" />}
                      >
                        {agenda.Track1 ? (
                          agenda.Track1.map((evnt, n) => {
                            //console.log("all tracks", evnt);
                            return (
                              <View key={n}>
                                {evnt.upcoming ? (
                                  evnt.upcoming.map((todayevnt, o) => {
                                    //console.log("Today event", evnt);
                                    return (
                                      <TouchableOpacity
                                        style={globalstyleConfig.agenda.card}
                                        key={o}
                                        onPress={() =>
                                          navigation.navigate("AgendaDetails", {
                                            id: todayevnt.agend_id,
                                            apidetails: todayevnt,
                                            provider:
                                              todayevnt.apidetails
                                                .webinar_channel,
                                            showCalender: 1,
                                          })
                                        }
                                      >
                                        <View
                                          style={
                                            globalstyleConfig.agenda.cardInfo
                                          }
                                        >
                                          {todayevnt.add_track ? (
                                            <View
                                              style={
                                                globalstyleConfig.agenda
                                                  .addTrack
                                              }
                                            >
                                              <Text
                                                //numberOfLines={1}
                                                style={
                                                  globalstyleConfig.agenda
                                                    .addTrackText
                                                }
                                              >
                                                {todayevnt.add_track}
                                                {/* jrijirj bejijieji ijtijtijti iejijeijt eijtijtijtij ooooooo jdfjj jdijigjid jigdjijdgij dijigdjigjidj idigjijgdigji digj igjijij */}
                                              </Text>
                                            </View>
                                          ) : (
                                            <View></View>
                                          )}

                                          <View
                                            style={
                                              globalstyleConfig.agenda
                                                .dateTimeParent1
                                            }
                                          >
                                            <View
                                              style={
                                                globalstyleConfig.agenda
                                                  .dateTimeParent2
                                              }
                                            >
                                              <Text
                                                numberOfLines={1}
                                                style={
                                                  globalstyleConfig.agenda
                                                    .dateTimeText
                                                }
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
                                            style={
                                              globalstyleConfig.agenda
                                                .agendaTitle
                                            }
                                          >
                                            {todayevnt.agend_title}
                                          </Text>
                                          <View
                                            style={{ flexDirection: "row" }}
                                          >
                                            <TouchableOpacity
                                              style={
                                                globalstyleConfig.agenda
                                                  .addToCalendarParent
                                              }
                                            >
                                              <Text
                                                style={
                                                  globalstyleConfig.agenda
                                                    .addToCalendarText
                                                }
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
                                    );
                                  })
                                ) : (
                                  <View style={{ marginBottom: 20 }}>
                                    <Text
                                      style={
                                        globalstyleConfig.agenda.noSessions
                                      }
                                    >
                                      No Sessions Found
                                    </Text>
                                  </View>
                                )}
                              </View>
                            );
                          })
                        ) : (
                          <View></View>
                        )}
                      </List.Accordion>
                    </View>
                  );
                })}
              </List.Section>
            </>
          ) : null}
        </View>
      ) : null}
      {AgendaData.length && AgendaData[0].Track2 ? (
        <View style={styles.cardsWrapper}>
          <Text style={globalstyleConfig.agenda.tracks}>Track 2</Text>
          {AgendaData.length &&
          AgendaData[0].Track2 &&
          AgendaData[0].Track2[0].earlier_today ? (
            <>
              <Text style={globalstyleConfig.agenda.tracksSub}>
                Earlier Today
              </Text>

              <List.Section>
                {AgendaData.map((agenda, i) => {
                  return (
                    <View style={globalstyleConfig.agenda.listSection} key={i}>
                      <List.Accordion
                        key={i}
                        title={agenda.agenda_date}
                        theme={{ colors: { primary: "#00dea5" } }}
                        // left={(props) => <List.Icon {...props} icon="folder" />}
                      >
                        {agenda.Track2 ? (
                          agenda.Track2.map((evnt, j) => {
                            //console.log("all tracks", evnt);
                            return (
                              <View key={j}>
                                {evnt.earlier_today ? (
                                  evnt.earlier_today.map((todayevnt, k) => {
                                    //console.log("Today event", evnt);
                                    return (
                                      <TouchableOpacity
                                        style={globalstyleConfig.agenda.card}
                                        key={k}
                                        onPress={() =>
                                          navigation.navigate("AgendaDetails", {
                                            id: todayevnt.agend_id,
                                            apidetails: todayevnt,
                                            provider:
                                              todayevnt.apidetails
                                                .webinar_channel,
                                            showCalender: 0,
                                          })
                                        }
                                      >
                                        <View
                                          style={
                                            globalstyleConfig.agenda.cardInfo
                                          }
                                        >
                                          {todayevnt.add_track ? (
                                            <View
                                              style={
                                                globalstyleConfig.agenda
                                                  .addTrack
                                              }
                                            >
                                              <Text
                                                //numberOfLines={1}
                                                style={
                                                  globalstyleConfig.agenda
                                                    .addTrackText
                                                }
                                              >
                                                {todayevnt.add_track}
                                                {/* jrijirj bejijieji ijtijtijti iejijeijt eijtijtijtij ooooooo jdfjj jdijigjid jigdjijdgij dijigdjigjidj idigjijgdigji digj igjijij */}
                                              </Text>
                                            </View>
                                          ) : (
                                            <View></View>
                                          )}
                                          {/* <Text
                                      style={{
                                        //fontSize: 15,
                                       // marginLeft: 18,
                                        fontWeight: "bold",
                                        alignSelf:"flex-end",
                                        color: "red",
                                        marginRight:10
                                       // width: "20%",
                                        // borderBottomWidth: 3,
                                        // borderBottomColor: "#00dea5",
                                      }}
                                    >
                                      {todayevnt.add_track}
                                    </Text> */}
                                          <View
                                            style={
                                              globalstyleConfig.agenda
                                                .dateTimeParent1
                                            }
                                          >
                                            <View
                                              style={
                                                globalstyleConfig.agenda
                                                  .dateTimeParent2
                                              }
                                            >
                                              <Text
                                                numberOfLines={1}
                                                style={
                                                  globalstyleConfig.agenda
                                                    .dateTimeText
                                                }
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
                                            style={
                                              globalstyleConfig.agenda
                                                .agendaTitle
                                            }
                                          >
                                            {todayevnt.agend_title}
                                          </Text>
                                          <View
                                            style={{ flexDirection: "row" }}
                                          >
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
                                            {/* <TouchableOpacity
                              style={{backgroundColor:'#1E1727', color:'white', paddingTop: 4, paddingLeft:5,paddingRight:5, paddingBottom:4, marginTop:8,borderRadius:5 }}
                              
                                >
                            <Text style={{fontSize:10,color:'white'}}>Add to my Schedule</Text>
                          </TouchableOpacity> */}
                                          </View>
                                        </View>
                                      </TouchableOpacity>
                                    );
                                  })
                                ) : (
                                  <View style={{ marginBottom: 20 }}>
                                    <Text
                                      style={
                                        globalstyleConfig.agenda.noSessions
                                      }
                                    >
                                      No Sessions Found
                                    </Text>
                                  </View>
                                )}
                              </View>
                            );
                          })
                        ) : (
                          <View></View>
                        )}
                      </List.Accordion>
                    </View>
                  );
                })}
              </List.Section>
            </>
          ) : null}
          {AgendaData.length &&
          AgendaData[0].Track2 &&
          AgendaData[0].Track2[0].happening_now ? (
            <>
              <Text style={globalstyleConfig.agenda.tracksSub}>
                Happening Now
              </Text>

              <List.Section>
                {AgendaData.map((agenda, k) => {
                  return (
                    <View style={globalstyleConfig.agenda.listSection} key={k}>
                      <List.Accordion
                        key={k}
                        title={agenda.agenda_date}
                        theme={{ colors: { primary: "#00dea5" } }}
                        // left={(props) => <List.Icon {...props} icon="folder" />}
                      >
                        {agenda.Track2 ? (
                          agenda.Track2.map((evnt, j) => {
                            //console.log("all tracks", evnt);
                            return (
                              <View key={j}>
                                {evnt.happening_now ? (
                                  evnt.happening_now.map((todayevnt, l) => {
                                    //console.log("Today event", evnt);
                                    return (
                                      <TouchableOpacity
                                        style={globalstyleConfig.agenda.card}
                                        key={l}
                                        onPress={() =>
                                          navigation.navigate("AgendaDetails", {
                                            id: todayevnt.agend_id,
                                            apidetails: todayevnt,
                                            provider:
                                              todayevnt.apidetails
                                                .webinar_channel,
                                            showCalender: 0,
                                          })
                                        }
                                      >
                                        <View
                                          style={
                                            globalstyleConfig.agenda.cardInfo
                                          }
                                        >
                                          {todayevnt.add_track ? (
                                            <View
                                              style={
                                                globalstyleConfig.agenda
                                                  .addTrack
                                              }
                                            >
                                              <Text
                                                //numberOfLines={1}
                                                style={
                                                  globalstyleConfig.agenda
                                                    .addTrackText
                                                }
                                              >
                                                {todayevnt.add_track}
                                                {/* jrijirj bejijieji ijtijtijti iejijeijt eijtijtijtij ooooooo jdfjj jdijigjid jigdjijdgij dijigdjigjidj idigjijgdigji digj igjijij */}
                                              </Text>
                                            </View>
                                          ) : (
                                            <View></View>
                                          )}
                                          <View
                                            style={
                                              globalstyleConfig.agenda
                                                .dateTimeParent1
                                            }
                                          >
                                            <View
                                              style={
                                                globalstyleConfig.agenda
                                                  .dateTimeParent2
                                              }
                                            >
                                              <Text
                                                numberOfLines={1}
                                                style={
                                                  globalstyleConfig.agenda
                                                    .dateTimeText
                                                }
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
                                            style={
                                              globalstyleConfig.agenda
                                                .agendaTitle
                                            }
                                          >
                                            {todayevnt.agend_title}
                                          </Text>
                                          <View
                                            style={{ flexDirection: "row" }}
                                          >
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
                                    );
                                  })
                                ) : (
                                  <View style={{ marginBottom: 20 }}>
                                    <Text
                                      style={
                                        globalstyleConfig.agenda.noSessions
                                      }
                                    >
                                      No Sessions Found
                                    </Text>
                                  </View>
                                )}
                              </View>
                            );
                          })
                        ) : (
                          <View></View>
                        )}
                      </List.Accordion>
                    </View>
                  );
                })}
              </List.Section>
            </>
          ) : null}
          {AgendaData.length &&
          AgendaData[0].Track2 &&
          AgendaData[0].Track2[0].upcoming ? (
            <>
              <Text style={globalstyleConfig.agenda.tracksSub}>Upcoming</Text>

              <List.Section>
                {AgendaData.map((agenda, m) => {
                  return (
                    <View style={globalstyleConfig.agenda.listSection} key={m}>
                      <List.Accordion
                        key={m}
                        title={agenda.agenda_date}
                        theme={{ colors: { primary: "#00dea5" } }}
                        // left={(props) => <List.Icon {...props} icon="folder" />}
                      >
                        {agenda.Track2 ? (
                          agenda.Track2.map((evnt, n) => {
                            //console.log("all tracks", evnt);
                            return (
                              <View key={n}>
                                {evnt.upcoming ? (
                                  evnt.upcoming.map((todayevnt, o) => {
                                    //console.log("Today event", evnt);
                                    return (
                                      <TouchableOpacity
                                        style={globalstyleConfig.agenda.card}
                                        key={o}
                                        onPress={() =>
                                          navigation.navigate("AgendaDetails", {
                                            id: todayevnt.agend_id,
                                            apidetails: todayevnt,
                                            provider:
                                              todayevnt.apidetails
                                                .webinar_channel,
                                            showCalender: 1,
                                          })
                                        }
                                      >
                                        <View
                                          style={
                                            globalstyleConfig.agenda.cardInfo
                                          }
                                        >
                                          {todayevnt.add_track ? (
                                            <View
                                              style={
                                                globalstyleConfig.agenda
                                                  .addTrack
                                              }
                                            >
                                              <Text
                                                //numberOfLines={1}
                                                style={
                                                  globalstyleConfig.agenda
                                                    .addTrackText
                                                }
                                              >
                                                {todayevnt.add_track}
                                                {/* jrijirj bejijieji ijtijtijti iejijeijt eijtijtijtij ooooooo jdfjj jdijigjid jigdjijdgij dijigdjigjidj idigjijgdigji digj igjijij */}
                                              </Text>
                                            </View>
                                          ) : (
                                            <View></View>
                                          )}
                                          <View
                                            style={
                                              globalstyleConfig.agenda
                                                .dateTimeParent1
                                            }
                                          >
                                            <View
                                              style={
                                                globalstyleConfig.agenda
                                                  .dateTimeParent2
                                              }
                                            >
                                              <Text
                                                numberOfLines={1}
                                                style={
                                                  globalstyleConfig.agenda
                                                    .dateTimeText
                                                }
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
                                            style={
                                              globalstyleConfig.agenda
                                                .agendaTitle
                                            }
                                          >
                                            {todayevnt.agend_title}
                                          </Text>
                                          <View
                                            style={{ flexDirection: "row" }}
                                          >
                                            <TouchableOpacity
                                              style={
                                                globalstyleConfig.agenda
                                                  .addToCalendarParent
                                              }
                                            >
                                              <Text
                                                style={
                                                  globalstyleConfig.agenda
                                                    .addToCalendarText
                                                }
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
                                    );
                                  })
                                ) : (
                                  <View style={{ marginBottom: 20 }}>
                                    <Text
                                      style={
                                        globalstyleConfig.agenda.noSessions
                                      }
                                    >
                                      No Sessions Found
                                    </Text>
                                  </View>
                                )}
                              </View>
                            );
                          })
                        ) : (
                          <View></View>
                        )}
                      </List.Accordion>
                    </View>
                  );
                })}
              </List.Section>
            </>
          ) : null}
        </View>
      ) : null}
    </ScrollView>
  );
};

export default Agenda;

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
    marginTop: 20,
    width: "95%",
    alignSelf: "center",
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

  card: {
    //width: 400,
    // backgroundColor:"#f2f2f2",
    alignSelf: "center",
    justifyContent: "center",
    marginVertical: 10,
    flexDirection: "row",
    shadowColor: "#999",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    // elevation: 2,
    // borderWidth: 1,
    borderRadius: 8,
    //marginRight: 115,
    padding: 15,
  },
  cardInfo: {
    // marginRight:20,
    flex: 2,
    padding: 8,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#f2f2f2",
    //elevation: 5,
    // borderBottomRightRadius: 0,
    // borderTopRightRadius: 0,
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
    height: 22,
    backgroundColor: "#00dea5",
    //width: 145,
    paddingHorizontal: 10,
    color: "white",
    textAlign: "center",
    padding: 2,
    marginLeft: 2,
    marginBottom: 5,
    borderRadius: 5,
    marginTop: 2,
  },
});
