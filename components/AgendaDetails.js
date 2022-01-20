import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Alert,
  AsyncStorage,
} from "react-native";
import HTML from "react-native-render-html";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation, useTheme } from "@react-navigation/native";
import Axios from "axios";
import store from "../redux/store";

import { Button } from "react-native-paper";
import moment from "moment";
import CountDown from "react-native-countdown-component";
import * as AddCalendarEvent from "react-native-add-calendar-event";
import api_url from "../Config/Config";
import { connect } from "react-redux";
import { SpeakersAction, SponsorsAction } from "../redux/action/actions";

const AgendaDetails = (props) => {
  console.log("Agenda details props", props);
  const theme = useTheme();

  const navigation = useNavigation();

  // console.log(props)
  const [agendaData, setagendaData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [todayDate, setTodayDate] = useState(new Date());

  const [speaker, setSpeaker] = useState([]);
  const [speakerList, setSpeakerList] = useState([]);
  const [sponsorsList, setSponsorsList] = useState([]);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    console.log(props.route.params);
    // console.log("aaaaaa");
    // console.log(props.speakers.isLoading)
    if (props.speakers.isLoading) {
      props.SpeakersAction(
        props.login.cookie,
        props.event.common.event.event_id_single
      );
    } else {
      // console.log('================ speaker list =====================')
      // console.log(props.speakers.common.speakers_list);
      setSpeakerList(props.speakers.common.speakers_list);
    }

    if (props.sponsors.isLoading) {
      props.SponsorsAction(
        props.login.cookie,
        props.event.common.event.event_id_single
      );
    } else {
      // console.log(props.login.cookie);
      // console.log("================ sponsors list =====================");
      // console.log(props.sponsors.common.sponsors_list);
      setSponsorsList(props.sponsors.common.sponsors_list);
    }

    let formData = new FormData();
    // formData.append('cookie', props.login.cookie);
    formData.append("agend_id", props.route.params.id);
    // formData.append('event_id',props.event.common.event.event_id_single);

    formData.append(
      "cookie",
      // `yoganath1265|1607497047|fDCk2aTwkeoI8L203M3OthVonmFefQPeGSRpsOS8GQr|1a0d8bf324ba1de0db949060813b612c12f7f68777289d40ccbf5760ef896d22`
      props.login.cookie
    );
    formData.append("event_id", props.event.common.event.event_id_single);

    // Axios.post(`https://ind-ew-events-website.pantheonsite.io/api/user/get_agenda_v1`, formData)
    // alert(event_id)

    // console.log(store.getState().login.common.user.id)

    // Axios.post(`${api_url.agendaDetails}`,formData)
    Axios.post(`${api_url.agendaDetails}`, formData).then((res) => {
      // console.log('55')
      console.log("agenda details res", res);
      // console.log(res.data);

      if (res.data.agenda == null) {
        setagendaData([]);
        setSpeaker([]);
        setIsLoading(false);
      } else {
        console.log(res.data.agenda);
        setagendaData(
          res.data.agenda.length ? res.data.agenda[0].Alltracks[0] : []
        );
        // setSpeaker(
        //   res.data.agenda.length
        //     ? res.data.agenda[0].speakerlist.filter(
        //         (item) => item.speakerId == props.login.common.user.id
        //       )
        //     : []
        // );
        console.log("Today Date", moment(todayDate).format("DD-MM-YYYY"));
        console.log(
          "start time",
          moment(agendaData.agenda_session_start_time).format("DD-MM-YYYY")
        );
        console.log("Hourr", moment(todayDate).format("HH:mm"));
        console.log(
          "ffff",
          res.data.agenda[0].Alltracks[0].agenda_session_start_time
        );
        console.log(
          " 2nd Start Time",
          moment(agendaData.agenda_session_start_time).format("HH:mm")
        );
        setIsLoading(false);
      }
      // console.log(res.data.agenda[0].speakerlist)
      // console.log(res.data.agenda[0].speakerlist.filter(item=>item.speakerId == 120))
      // if(res.data.agenda[0].speakerlist.indexOf(store.getState().login.common.user.id) > -1){
      //   setSpeaker([
      //     {
      //       user_id:store.getState().login.common.user.id
      //     }
      //   ])
      // }
      //  console.log(res.data.agenda[0].speakerlist.indexOf(store.getState().login.common.user.id))

      // console.log(res.data.agenda[0].speakerlist)

      // setIsLoading(false);
      // console.log('agenda details')
    });
  }, [props.route.params.id, props.speakers.isLoading]);

  const getTiming = (agendaTime) => {
    var otherDate = moment(agendaTime).format("DD-MM-YYYY HH:mm:ss");
    var today = new Date();
    var ms = moment(otherDate, "DD/MM/YYYY HH:mm:ss").diff(
      moment(today, "DD/MM/YYYY HH:mm:ss")
    );
    var d = moment.duration(ms);
    var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");

    // alert(ms);
    return ms / 1000;
  };

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

  // .then((eventInfo: { calendarItemIdentifier: string, eventIdentifier: string }) => {
  //   // handle success - receives an object with `calendarItemIdentifier` and `eventIdentifier` keys, both of type string.
  //   // These are two different identifiers on iOS.
  //   // On Android, where they are both equal and represent the event id, also strings.
  //   // when { action: 'CANCELED' } is returned, the dialog was dismissed
  //   console.warn(JSON.stringify(eventInfo));
  // })
  // .catch((error: string) => {
  //   // handle error such as when user rejected permissions
  //   console.warn(error);
  // });

  return isLoading ? (
    <ActivityIndicator color="green" size="large" />
  ) : (
    <ScrollView style={styles.container}>
      <View
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      ></View>
      <View style={{ marginTop: 10 }}>
        <Text
          style={{
            fontSize: 16,
            color: "#00dea5",
            fontWeight: "bold",
          }}
        >
          {agendaData.agend_title}
        </Text>
      </View>
      {agendaData.add_track ? (
        <View
          style={{
            marginTop: 10,
            //width: 80,
            backgroundColor: "#f1f1f1",
            borderRadius: 5,
            padding: 6,
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
              flexWrap: "wrap",
            }}
          >
            {agendaData.add_track}
          </Text>
        </View>
      ) : (
        <View></View>
      )}

      <View style={{ flex: 1, flexDirection: "row", marginTop: 10 }}>
        <View style={styles.agendaCardDetails}>
          <Text
            style={{
              fontSize: 12,
              color: "#444",
              fontWeight: "bold",
              textAlign: "center",
              paddingTop: 4,
              paddingBottom: 3,
            }}
          >
            {agendaData.session_start_date_time +
              " " +
              moment(agendaData.agenda_session_start_time).format(
                "hh:mm A"
              )}{" "}
            - {moment(agendaData.agenda_session_end_time).format("hh:mm A")}
          </Text>
        </View>
        {props.route.params.showCalender ? (
          <TouchableOpacity style={styles.addToCalendar}>
            <Text
              style={{
                fontSize: 12,
                color: "#444",
                fontWeight: "bold",
                textAlign: "center",
                paddingTop: 4,
                paddingBottom: 3,
              }}
              onPress={() =>
                addCalender(
                  agendaData.agend_title,
                  agendaData.agenda_session_start_time,
                  agendaData.agenda_session_end_time
                )
              }
            >
              Add to Calender
            </Text>
          </TouchableOpacity>
        ) : (
          <Text></Text>
        )}
      </View>

      <View style={{ marginBottom: 5 }}>
        {/* <CountDown
                                    until={ (  Math.abs(Math.abs(moment(todayDate).format("DD") - moment(agendaData.agenda_session_start_time).format("DD")) ) *24*60*60 )  + (Math.abs(moment(todayDate).format('HH') - moment(agendaData.agenda_session_start_time).format("HH"))*60*60 ) +     (Math.abs(moment(todayDate).format("MM") - moment(agendaData.agenda_session_start_time).format("MM")  ) *60 )             }
                                    onFinish={() => alert('Meeting Started')}
                                    onPress={() => alert('hello')}
                                    size={15}
                                  /> */}

        {moment(todayDate).format("DD-MM-YYYY") >
        moment(agendaData.agenda_session_start_time).format("DD-MM-YYYY") ? (
          <Text></Text>
        ) : moment(todayDate).format("DD-MM-YYYY") ==
            moment(agendaData.agenda_session_start_time).format("DD-MM-YYYY") &&
          moment(todayDate).format("HH:mm") >=
            moment(agendaData.agenda_session_start_time).format("HH:mm") ? (
          <View>
            {/* <Text>Meeting Started</Text> */}
            {/* <Text></Text> */}

            <Text
              style={{
                marginVertical: 10,
                fontWeight: "bold",
                fontSize: 16,
                color: "#444",
              }}
            >
              Meeting End In:
            </Text>
            <CountDown
              until={getTiming(agendaData.agenda_session_end_time)}
              onFinish={() => setEnded(true)}
              size={15}
            />
          </View>
        ) : moment(todayDate).format("DD-MM-YYYY HH:mm:ss") <
            moment(agendaData.agenda_session_start_time).format(
              "DD-MM-YYYY HH:mm:ss"
            ) &&
          agendaData.agenda_type !== "recorded_session_live" &&
          agendaData.agenda_type !== "recorded_session" ? (
          <View>
            <Text
              style={{
                marginVertical: 10,
                fontWeight: "bold",
                fontSize: 16,
                color: "#444",
              }}
            >
              Meeting Starts In:
            </Text>
            <CountDown
              until={getTiming(agendaData.agenda_session_start_time)}
              // onFinish={() => alert("Meeting Started")}
              size={15}
            />
          </View>
        ) : (
          <Text></Text>
        )}

        {props.route.params.provider === "Daily" ? (
          agendaData.agenda_type == "simulive" ? (
            <Button
              style={{ marginVertical: 10 }}
              color="#be1818"
              // disabled={
              //   moment(todayDate).format("DD-MM-YYYY") ==
              //     moment(agendaData.agenda_session_start_time).format(
              //       "DD-MM-YYYY"
              //     ) &&
              //   moment(todayDate).format("HH:mm") >=
              //     moment(agendaData.agenda_session_start_time).format("HH:mm")
              //     ? false
              //     : true
              // }
              disabled={
                ended ||
                (moment(todayDate).format("DD-MM-YYYY") ==
                  moment(agendaData.agenda_session_start_time).format(
                    "DD-MM-YYYY"
                  ) &&
                  moment(todayDate).format("HH:mm") >=
                    moment(agendaData.agenda_session_end_time).format(
                      "HH:mm"
                    )) ||
                moment(todayDate).format("DD-MM-YYYY") >
                  moment(agendaData.agenda_session_start_time).format(
                    "DD-MM-YYYY"
                  )
                  ? true
                  : false
                  ? true
                  : false
              }
              contentStyle={{ height: 44 }}
              labelStyle={{
                color: "white",
                fontSize: 15,
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
              mode="contained"
              onPress={() => {
                console.log(agendaData);
                if (
                  agendaData.agenda_type == "recorded_session" ||
                  agendaData.agenda_type == "recorded_session_live"
                ) {
                  navigation.navigate("AgendaRecordedVideo", {
                    type: "meeting",
                    meeting_id: props.route.params.id,
                    meeting_details: props.route.params,
                  });
                } else {
                  navigation.navigate("VideoScreenAgendaSimulive", {
                    token: agendaData.token,
                    type: "meeting",
                    meeting_id: props.route.params.id,
                    meeting_details: props.route.params,
                    provider: props.route.params.provider,
                  });
                }
              }}
            >
              {props.route.params.apidetails.select_speakers.indexOf(
                props.login.common.user.id.toString()
              ) > -1 ||
              props.event.common.event.event_info.user_role == "presenter"
                ? "Join Backstage"
                : "Join"}
            </Button>
          ) : (
            <Button
              style={{ marginVertical: 10 }}
              color="#be1818"
              // disabled={
              //   moment(todayDate).format("DD-MM-YYYY") >=
              //     moment(agendaData.agenda_session_start_time).format(
              //       "DD-MM-YYYY"
              //     ) &&
              //   moment(todayDate).format("HH:mm") >=
              //     moment(agendaData.agenda_session_end_time).format("HH:mm")
              //     ? true
              //     : false
              // }
              disabled={
                ended ||
                (moment(todayDate).format("DD-MM-YYYY") ==
                  moment(agendaData.agenda_session_start_time).format(
                    "DD-MM-YYYY"
                  ) &&
                  moment(todayDate).format("HH:mm") >=
                    moment(agendaData.agenda_session_end_time).format(
                      "HH:mm"
                    )) ||
                moment(todayDate).format("DD-MM-YYYY") >
                  moment(agendaData.agenda_session_start_time).format(
                    "DD-MM-YYYY"
                  )
                  ? true
                  : false
                  ? true
                  : false
              }
              contentStyle={{ height: 44 }}
              labelStyle={{
                color: "white",
                fontSize: 15,
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
              mode="contained"
              onPress={() => {
                console.log(agendaData);
                if (
                  agendaData.agenda_type == "recorded_session" ||
                  agendaData.agenda_type == "recorded_session_live"
                ) {
                  navigation.navigate("AgendaRecordedVideo", {
                    type: "meeting",
                    meeting_id: props.route.params.id,
                    meeting_details: props.route.params,
                  });
                } else {
                  navigation.navigate("VideoScreenNewAgenda", {
                    token: agendaData.token,
                    type: "meeting",
                    meeting_id: props.route.params.id,
                    meeting_details: props.route.params,
                    provider: props.route.params.provider,
                  });
                }
              }}
            >
              {props.route.params.apidetails.select_speakers.indexOf(
                props.login.common.user.id.toString()
              ) > -1 ||
              props.event.common.event.event_info.user_role == "presenter"
                ? agendaData.agenda_type == "recorded_session" ||
                  agendaData.agenda_type == "recorded_session_live"
                  ? "View Recording"
                  : agendaData.agenda_type == "roundtable"
                  ? "Join"
                  : "Join Backstage"
                : agendaData.agenda_type == "recorded_session" ||
                  agendaData.agenda_type == "recorded_session_live"
                ? "View Recording"
                : "Join"}
            </Button>
          )
        ) : (
          <Text
            style={{ textAlign: "center", fontWeight: "bold", marginTop: 10 }}
          >
            Note: This Meeting can join in web only
          </Text>
        )}
      </View>

      <View>
        <HTML
          tagsStyles={{ p: { marginBottom: 10 } }}
          html={"<p>" + agendaData.agend_content + "</p>"}
          imagesMaxWidth={Dimensions.get("window").width}
        />
      </View>

      <View>
        {agendaData.select_speakers == undefined ||
        (agendaData.select_speakers &&
          agendaData.select_speakers.length === 0) ? (
          <View></View>
        ) : (
          <View>
            <Text
              style={{ fontWeight: "bold", fontSize: 16, color: "#00dea5" }}
            >
              Speakers
            </Text>
            {agendaData.select_speakers.map((speaker, i) => {
              var findSpeaker = [];
              findSpeaker = speakerList.filter(
                (item) => item.user_id == speaker
              );
              if (findSpeaker.length) {
                // console.log(
                //   "=========================speaker pic==========================="
                // );
                //console.log("speakersssss", findSpeaker[0]);
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("userDetails", {
                        user_id: speaker,
                      })
                    }
                    key={i}
                  >
                    <View style={styles.card1}>
                      <View style={styles.cardImgWrapper}>
                        <View style={styles.cardImg1}>
                          <Image
                            source={{
                              uri:
                                findSpeaker[0].profile_pic == ""
                                  ? `${api_url.neutralImage}`
                                  : findSpeaker[0].profile_pic,
                            }}
                            resizeMode="cover"
                            style={styles.iconWidth}
                          />
                        </View>
                      </View>
                      <View style={styles.cardInfo}>
                        <Text numberOfLines={1} style={styles.cardTitle}>
                          {/* {speaker.fname} {speaker.lname} */}
                          {findSpeaker[0].speaker_name}
                        </Text>
                        <Text numberOfLines={1} style={styles.cardDesg}>
                          {findSpeaker[0].job_title}
                        </Text>
                        {/* <Text numberOfLines={2} style={styles.cardDetails}>
               {speaker.profileurl}
              </Text> */}
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }
            })}
          </View>
        )}
      </View>

      {agendaData.webinar_embedded_code == "" ||
      agendaData.webinar_embedded_code == null ? (
        <View></View>
      ) : (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: "bold" }}>Recorded Video</Text>
          <HTML
            tagsStyles={{
              p: { lineHeight: 22, padding: 0, marginBottom: 10 },
            }}
            html={agendaData.webinar_embedded_code}
            imagesMaxWidth={Dimensions.get("window").width}
          />
        </View>
      )}
      <View style={{ marginBottom: 20 }}>
        {agendaData ? (
          agendaData.select_sponsors && agendaData.select_sponsors.length ? (
            <View>
              <Text
                style={{ fontWeight: "bold", fontSize: 16, color: "#00dea5" }}
              >
                Sponsors
              </Text>
              {agendaData.select_sponsors.map((sponsor, i) => {
                var findBronze = [];
                findBronze = sponsorsList.Bronze
                  ? sponsorsList.Bronze.filter((item) => item.id == sponsor)
                  : [];
                if (findBronze.length) {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("SponsorDetail", {
                          id: sponsor,
                        })
                      }
                      key={i}
                    >
                      <View style={styles.card}>
                        <View style={styles.cardImgWrapper1}>
                          <Image
                            source={{ uri: findBronze[0].SponsorLogo }}
                            resizeMode="contain"
                            style={styles.iconWidthSponsor}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }

                var findGold = [];
                findGold = sponsorsList.Gold
                  ? sponsorsList.Gold.filter((item) => item.id == sponsor)
                  : [];
                if (findGold.length) {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("SponsorDetail", {
                          id: sponsor,
                        })
                      }
                      key={i}
                    >
                      <View style={styles.card}>
                        <View style={styles.cardImgWrapper1}>
                          <Image
                            source={{ uri: findGold[0].SponsorLogo }}
                            resizeMode="contain"
                            style={styles.iconWidthSponsor}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }
                var findPlatinum = [];
                findPlatinum = sponsorsList.Platinum
                  ? sponsorsList.Platinum.filter((item) => item.id == sponsor)
                  : [];
                if (findPlatinum.length) {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("SponsorDetail", {
                          id: sponsor,
                        })
                      }
                      key={i}
                    >
                      <View style={styles.card}>
                        <View style={styles.cardImgWrapper1}>
                          <Image
                            source={{ uri: findPlatinum[0].SponsorLogo }}
                            resizeMode="contain"
                            style={styles.iconWidthSponsor}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }
                var findSilver = [];
                findSilver = sponsorsList.Silver
                  ? sponsorsList.Silver.filter((item) => item.id == sponsor)
                  : [];
                if (findSilver.length) {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("SponsorDetail", {
                          id: sponsor,
                        })
                      }
                      key={i}
                    >
                      <View style={styles.card}>
                        <View style={styles.cardImgWrapper1}>
                          <Image
                            source={{ uri: findSilver[0].SponsorLogo }}
                            resizeMode="contain"
                            style={styles.iconWidthSponsor}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }
              })}
            </View>
          ) : (
            <View></View>
          )
        ) : (
          <View></View>
        )}
      </View>

      <View style={{ display: "none" }}>
        <CountDown
          until={getTiming(agendaData.agenda_session_end_time)}
          onFinish={() => {
            // alert("on finished");
            setEnded(true);
          }}
          size={15}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    height: "auto",
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
  card1: {
    flex: 1,
    height: "auto",
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
  iconWidth: {
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 14,
    width: 60,
    height: 60,
    marginLeft: 10,
    borderRadius: 30,
  },
  iconWidthSponsor: {
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 14,
    marginBottom: 14,
    width: 70,
    height: 75,
    //borderRadius:150
    // marginLeft:10,
  },
  cardImg: {
    height: "100%",
    width: "100%",
    borderColor: "#fff",
    alignSelf: "center",
    borderRadius: 8,
    flexDirection: "column",

    borderBottomLeftRadius: 0,
    // borderTopLeftRadius: 0,
    //borderLeftWidth: 0,
  },
  cardImgWrapper: {
    //height: 210,
    //width: "100%",
    flex: 1,
    borderRightWidth: 0,
    borderColor: "#fff",
    borderLeftWidth: 0,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardImgWrapper1: {
    //height: 210,
    //width: "100%",
    flex: 1,
    borderRightWidth: 0,
    borderColor: "#fff",
    borderLeftWidth: 0,
    borderRadius: 8,
    backgroundColor: "#fff",
    //borderBottomRightRadius: 0,
    //borderTopRightRadius: 0,
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
  cardDesg: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
    lineHeight: 20,
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
  cardImg1: {
    height: "100%",
    width: "100%",
    borderColor: "#fff",
    alignSelf: "center",
    borderRadius: 8,
    //borderBottomRightRadius: 0,
    //borderTopRightRadius: 0,
    //borderLeftWidth: 0,
    marginBottom: 15,
  },

  cardBody: {
    backgroundColor: "#fff",
    padding: 16,
    flexDirection: "row",
    borderRadius: 15,
    borderColor: "#fff",
    borderWidth: 1,
  },
  cardDetails: {
    // paddingHorizontal: 20
    fontSize: 13,
    color: "#444",
  },
  headDetails: {
    flexDirection: "row",
  },
  textBody: {
    fontWeight: "bold",
    // flexDirection:"row"
  },
  designation: {
    fontSize: 12,
  },
  company: {
    fontSize: 11,
    fontWeight: "bold",
  },
  optionss: {
    //backgroundColor: '#fff',
    //marginTop:15,
    paddingTop: 10,
    height: 35,
    borderColor: "#f2f2f2",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  agendaCardDetails: {
    backgroundColor: "#00dea5",
    width: "62%",
    color: "white",
    textAlign: "center",
    padding: 2,
    //marginLeft: 3,
    //marginBottom: 5,
    borderRadius: 5,
    marginTop: 2,
  },
  addToCalendar: {
    backgroundColor: "#00dea5",
    width: "35%",
    color: "white",
    textAlign: "center",
    padding: 2,
    marginLeft: "3%",
    //marginBottom: 5,
    borderRadius: 5,
    marginTop: 2,
  },
});

const mapStateToProps = (state) => {
  //console.log("eeeeeee", state);
  return {
    login: state.login,
    event: state.Event,
    speakers: state.Speakers,
    sponsors: state.Sponsors,
  };
};

// export default AgendaDetails;

export default connect(mapStateToProps, { SpeakersAction, SponsorsAction })(
  AgendaDetails
);
