import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  Alert,
  BackHandler,
} from "react-native";
import { logDailyEvent } from "../../utils";
import { DailyCall } from "@daily-co/react-native-daily-js";
import { useCallObject } from "../../useCallObject";
import theme from "../../theme";
import TrayButton from "../TrayButton/TrayButton";
import { useOrientation, Orientation } from "../../useOrientation";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useSelector } from "react-redux";
import Axios from "axios";
import api_url from "../../Config/Config";

/**
 * Gets [isCameraMuted, isMicMuted].
 * This function is declared outside Tray() so it's not recreated every render
 * (which would require us to declare it as a useEffect dependency).
 */
const dimensions = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};

function getStreamStates(callObject: DailyCall) {
  console.log("changes", callObject);
  let isCameraMuted = false,
    isMicMuted = false;
  if (
    callObject &&
    callObject.participants() &&
    callObject.participants().local
  ) {
    const localParticipant = callObject.participants().local;
    isCameraMuted = !localParticipant.video;
    isMicMuted = !localParticipant.audio;
  }
  return [isCameraMuted, isMicMuted];
}

type Props = {
  onClickLeaveCall: () => void;
  disabled: boolean;
  meetingDetails: any;
  roomUrl?: any;
  event?: any;
  setShowMsgPanel?: any;
  showMsgPanel?: any;
  setShowQuestionPanel?: any;
  showQuestion?: any;
  chatNewMessagesCount?: any;
  askQuestions?: any;
};

export const TRAY_HEIGHT = 90;

export default function Tray({
  disabled,
  onClickLeaveCall,
  meetingDetails,
  roomUrl,
  event,
  setShowMsgPanel,
  showMsgPanel,
  setShowQuestionPanel,
  showQuestion,
  chatNewMessagesCount,
  askQuestions,
}: Props) {
  // console.log(event.common.event.event_id_single)
  console.log("eeee", event);
  const navigation = useNavigation();
  const profileData = useSelector((state) => state.login);
  console.log("Tray.tsx meeting detils", meetingDetails);
  // console.log('Tray.tsx login details', profileData)

  //console.log("mmmmmm", meetingDetails.meeting_details.apidetails.agenda_type)
  const callObject = useCallObject();
  const [isCameraMuted, setCameraMuted] = useState(false);
  const [isMicMuted, setMicMuted] = useState(false);
  const [isVideo, setVideo] = useState(false);
  const orientation = useOrientation();
  let checkVideoStatusTime = useRef<any>();
  const [intervalCount, setIntervalCount] = useState(0);

  const toggleCamera = useCallback(() => {
    callObject?.setLocalVideo(isCameraMuted);
  }, [callObject, isCameraMuted]);

  const toggleMic = useCallback(() => {
    callObject?.setLocalAudio(isMicMuted);
  }, [callObject, isMicMuted]);

  const videoclick = () => {
    console.log("videooooooo");
    navigation.navigate("AgendaVideo", meetingDetails);
  };

  /**
   * Start listening for participant changes when callObject is set (i.e. when the component mounts).
   * This event will capture any changes to your audio/video mute state.
   */
  useEffect(() => {
    if (checkVideoStatusTime.current) {
      clearInterval(checkVideoStatusTime.current);
    }

    if (
      meetingDetails &&
      meetingDetails.meeting_details.apidetails.agenda_type == "simulive" &&
      (meetingDetails.meeting_details.apidetails.select_speakers.indexOf(
        profileData.common.user.id.toString()
      ) > -1 ||
        event.common.event.event_info.user_role == "presenter") &&
      meetingDetails.meeting_details.apidetails.apidetails.roomConfiguration
        .room_url !== roomUrl
    ) {
      console.log("Simulive and speaker/moderator and backstage");
      checkVideoStatusTime.current = setInterval(() => {
        const formData = new FormData();
        formData.append("cookie", profileData.cookie);
        formData.append("event_id", event.common.event.event_id_single);
        formData.append("agenda_id", meetingDetails.meeting_details.id);

        Axios.post(
          //`https://events.globaldata.com/api/user/simulive_fetch_video_session_data`,
          `${api_url.checkSessionStatus}`,
          formData
        ).then((response) => {
          console.log("videoenablestaus=", response.data);
          // if (response.data.data.videSessionStartTimeDiff) {
          //   setTime(response.data.data.videSessionStartTimeDiff);
          // }

          if (
            response.data.data.videoenablestaus ||
            response.data.data.videSessionStartTimeDiff
          ) {
            clearInterval(checkVideoStatusTime.current);
            videoclick();
          }
        });
        setIntervalCount(intervalCount + 1);
      }, 2000);
    } else if (
      meetingDetails &&
      meetingDetails.meeting_details.apidetails.agenda_type == "simulive" &&
      meetingDetails.meeting_details.apidetails.select_speakers.indexOf(
        profileData.common.user.id.toString()
      ) == -1
    ) {
      console.log("simulive and attendee");
      checkVideoStatusTime.current = setInterval(() => {
        const formData = new FormData();
        formData.append("cookie", profileData.cookie);
        formData.append("event_id", event.common.event.event_id_single);
        formData.append("agenda_id", meetingDetails.meeting_details.id);

        Axios.post(
          //`https://events.globaldata.com/api/user/simulive_fetch_video_session_data`,
          `${api_url.checkSessionStatus}`,
          formData
        ).then((response) => {
          console.log("videoenablestaus=", response.data);
          // if (response.data.data.videSessionStartTimeDiff) {
          //   setTime(response.data.data.videSessionStartTimeDiff);
          // }

          if (
            response.data.data.videoenablestaus ||
            response.data.data.videSessionStartTimeDiff
          ) {
            clearInterval(checkVideoStatusTime.current);
            videoclick();
          }
        });
        setIntervalCount(intervalCount + 1);
      }, 2000);
    }

    function handleBackButtonClick() {
      console.log("back button pressed");
      console.log(checkVideoStatusTime.current);
      onClickLeaveCall();
      if (checkVideoStatusTime.current) {
        clearInterval(checkVideoStatusTime.current);
      }

      return true;
    }

    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    // console.log(meetingDetails.meeting_details.apidetails.apidetails.roomConfiguration.room_url)
    if (!callObject) {
      return;
    }

    const handleNewParticipantsState = (event?: any) => {
      // console.log("event Tray", event);
      event && logDailyEvent(event);
      const [cameraMuted, micMuted] = getStreamStates(callObject);
      setCameraMuted(cameraMuted);
      setMicMuted(micMuted);
    };

    // Use initial state
    handleNewParticipantsState();

    // Listen for changes in state
    callObject.on("participant-updated", handleNewParticipantsState);

    // Stop listening for changes in state
    return function cleanup() {
      console.log("off");
      callObject.off("participant-updated", handleNewParticipantsState);
    };
  }, [callObject]);

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
  //   return () => {
  //     // BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
  //   };
  // }, []);

  return (
    <SafeAreaView
      style={[
        styles.containerBase,
        orientation === Orientation.Portrait
          ? styles.containerPortrait
          : styles.containerLandscape,
      ]}
    >
      {meetingDetails ? (
        meetingDetails.meeting_details.apidetails.select_speakers.indexOf(
          profileData.common.user.id.toString()
        ) > -1 ||
        event.common.event.event_info.user_role == "presenter" ||
        meetingDetails.meeting_details.apidetails.agenda_type ==
          "roundtable" ? (
          <View
            style={[
              meetingDetails.meeting_details.apidetails.agenda_type ==
              "roundtable"
                ? styles.iconNormalCenter
                : styles.iconCenter,
              orientation === Orientation.Portrait
                ? styles.controlsPortrait
                : styles.controlsLandscape,
            ]}
          >
            <TrayButton
              disabled={disabled}
              onPress={toggleMic}
              muted={isMicMuted}
              text={isMicMuted ? "Unmute" : "Mute"}
              type="mic"
            />
            <TrayButton
              disabled={disabled}
              onPress={toggleCamera}
              muted={isCameraMuted}
              text={isCameraMuted ? "Turn on" : "Turn off"}
              type="camera"
            />

            {/* {meetingDetails &&
            meetingDetails.meeting_details.apidetails.agenda_type ==
              "simulive" ? (
              <TouchableOpacity onPress={() => videoclick()}>
                <View
                  style={{
                    alignItems: "center",
                    height: 50,
                    width: 50,
                    backgroundColor: "rgba(0, 0, 0, 0.747)",
                    borderRadius: 9,
                    marginLeft: 5,
                  }}
                >
                  <FontAwesome
                    style={{ alignSelf: "center", marginTop: 15 }}
                    color="white"
                    name="film"
                    size={20}
                  />
                </View>
                <Text
                  style={{
                    color: "white",
                    fontSize: 11,
                    margin: 5,
                    paddingLeft: 4,
                    textAlign: "center",
                  }}
                >
                  View Video
                </Text>
              </TouchableOpacity>
            ) : (
              <View></View>
            )} */}

            {meetingDetails &&
            meetingDetails.meeting_details.apidetails.agenda_type ==
              "webinar" ? (
              roomUrl &&
              meetingDetails.meeting_details.apidetails.apidetails
                .roomConfiguration.room_url === roomUrl ? (
                <View></View>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    // console.log('go to webinar')
                    // console.log(meetingDetails.meeting_details)

                    Alert.alert(
                      "Warning!",
                      "Do you want to join Live session which will take you to live audience for LIVE presentation? Please check with Moderator/Host",
                      [
                        {
                          text: "NO",
                          // onPress: () => navigation.goBack(),
                          style: "cancel",
                        },
                        {
                          text: "YES",
                          onPress: () => {
                            if (checkVideoStatusTime.current) {
                              clearInterval(checkVideoStatusTime.current);
                            }
                            onClickLeaveCall();
                            navigation.navigate("VideoScreenAgendaWebinar", {
                              // token: agendaData.token,
                              type: "meeting",
                              meeting_id: meetingDetails.meeting_details.id,
                              meeting_details: meetingDetails.meeting_details,
                              provider: meetingDetails.meeting_details.provider,
                            });
                          },
                        },
                      ]
                    );
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      height: 50,
                      width: 50,
                      backgroundColor: "rgba(0, 0, 0, 0.747)",
                      borderRadius: 9,
                      marginLeft: 15,
                    }}
                  >
                    <FontAwesome
                      style={{ alignSelf: "center", marginTop: 15 }}
                      color="white"
                      name="play"
                      size={20}
                    />
                  </View>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 11,
                      margin: 5,
                      paddingLeft: 4,
                      textAlign: "center",
                    }}
                  >
                    Join Session
                  </Text>
                </TouchableOpacity>
              )
            ) : (
              <View></View>
            )}

            

            {/* Chat start*/}
            <TouchableOpacity
              onPress={() => {
                console.log("466 line", showMsgPanel);
                setShowMsgPanel(!showMsgPanel);
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  height: 50,
                  width: 50,
                  backgroundColor: "rgba(0, 0, 0, 0.747)",
                  borderRadius: 9,
                  //marginLeft: 15,
                  marginLeft: dimensions.width * 0.05,
                }}
              >
                <AntDesign
                  style={{ alignSelf: "center", marginTop: 15 }}
                  color={
                    chatNewMessagesCount > 0 && showMsgPanel == false
                      ? "red"
                      : "white"
                  }
                  name="message1"
                  size={20}
                />
              </View>
              <Text
                style={{
                  color: "white",
                  fontSize: 11,
                  margin: 5,
                  paddingLeft: 4,
                  textAlign: "center",
                }}
              >
                {showMsgPanel ? "Hide Chat" : "Chat"}
              </Text>
            </TouchableOpacity>
            {/* Chat end*/}

            {/* Ask a Question start*/}

            {(meetingDetails &&
              meetingDetails.meeting_details.apidetails.agenda_type ==
                "simulive") ||
            "roundtable" ||
            "webinar" ? (
              roomUrl &&
              meetingDetails.meeting_details.apidetails.apidetails
                .roomConfiguration.room_url === roomUrl ? null : (
                <TouchableOpacity
                  onPress={() => {
                    console.log("545 Ask a question", showQuestion);
                    setShowQuestionPanel(!showQuestion);
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      height: 50,
                      width: 50,
                      backgroundColor: "rgba(0, 0, 0, 0.747)",
                      borderRadius: 9,
                      marginLeft: 15,
                    }}
                  >
                    <FontAwesome
                      style={{ alignSelf: "center", marginTop: 12 }}
                      // color={
                      //   chatNewMessagesCount > 0 && showQuestion == false
                      //     ? "red"
                      //     : "white"
                      // }
                      color="white"
                      name="question-circle"
                      size={24}
                    />
                  </View>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 11,
                      margin: 5,
                      paddingLeft: 4,
                      textAlign: "center",
                    }}
                  >
                    {showQuestion ? "Hide Question" : "Ask a Question"}
                  </Text>
                </TouchableOpacity>
              )
            ) : null}

            {/* Ask a Question end*/}

            {/* for webinar After Join session start */}
            {meetingDetails &&
            meetingDetails.meeting_details.apidetails.agenda_type ==
              "webinar" ? (
              roomUrl &&
              !meetingDetails.meeting_details.apidetails.apidetails
                .roomConfiguration.room_url === !roomUrl ? (
                <TouchableOpacity
                  onPress={() => {
                    console.log("545 Ask a question attendee", showQuestion);
                    setShowQuestionPanel(!showQuestion);
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      height: 50,
                      width: 50,
                      backgroundColor: "rgba(0, 0, 0, 0.747)",
                      borderRadius: 9,
                      marginLeft: 15,
                    }}
                  >
                    <FontAwesome
                      style={{ alignSelf: "center", marginTop: 12 }}
                      // color={
                      //   chatNewMessagesCount > 0 && showQuestion == false
                      //     ? "red"
                      //     : "white"
                      // }
                      color="white"
                      name="question-circle"
                      size={24}
                    />
                  </View>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 11,
                      margin: 5,
                      paddingLeft: 4,
                      textAlign: "center",
                    }}
                  >
                    {showQuestion ? "Hide Question" : "Ask a Question"}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View></View>
              )
            ) : (
              <View></View>
            )}
            {/* for webinar After Join session end */}

            {meetingDetails &&
            meetingDetails.meeting_details.apidetails.agenda_type ==
              "simulive" ? (
              roomUrl &&
              meetingDetails.meeting_details.apidetails.apidetails
                .roomConfiguration.room_url === roomUrl ? (
                <View></View>
              ) : (
                <TouchableOpacity
                  //style={styles.connnnn}
                  onPress={() => {
                    // console.log('go to QA simulive')
                    // console.log(meetingDetails.meeting_details)

                    Alert.alert(
                      "Warning!",
                      "Do you want to join Q&A session which will take to live audience for Q&A Session? Please check with Moderator/Host",
                      [
                        {
                          text: "NO",
                          // onPress: () => navigation.goBack(),
                          style: "cancel",
                        },
                        {
                          text: "YES",
                          onPress: () => {
                            onClickLeaveCall();
                            navigation.navigate("VideoScreenAgendaQASimulive", {
                              // token: agendaData.token,
                              type: "meeting",
                              meeting_id: meetingDetails.meeting_details.id,
                              meeting_details: meetingDetails.meeting_details,
                              provider: meetingDetails.meeting_details.provider,
                            });
                          },
                        },
                      ]
                    );
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      height: 50,
                      width: 50,
                      backgroundColor: "rgba(0, 0, 0, 0.747)",
                      borderRadius: 9,
                      marginLeft: 38,
                    }}
                  >
                    <FontAwesome
                      style={{ alignSelf: "center", marginTop: 15 }}
                      color="white"
                      name="play"
                      size={20}
                    />
                  </View>
                  <Text
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      //alignSelf:"flex-end",
                      color: "white",
                      fontSize: 11,
                      margin: 5,
                      paddingLeft: 24,
                      textAlign: "center",
                    }}
                  >
                    Join Q&A
                  </Text>
                </TouchableOpacity>
              )
            ) : (
              <View></View>
            )}

{meetingDetails &&
            meetingDetails.meeting_details.apidetails.agenda_type ==
              "simulive" ? (
              roomUrl &&
              meetingDetails.meeting_details.apidetails.apidetails
                .roomConfiguration.room_url === roomUrl ? (
                <View></View>
              ) : (
                <View style={{}}>
                  <TouchableOpacity onPress={() => videoclick()}>
                    <View
                      style={{
                        alignItems: "center",
                        height: 50,
                        width: 50,
                        backgroundColor: "rgba(0, 0, 0, 0.747)",
                        borderRadius: 9,
                        // marginLeft: 15,
                      }}
                    >
                      <FontAwesome
                        style={{ alignSelf: "center", marginTop: 15 }}
                        color="white"
                        name="film"
                        size={20}
                      />
                    </View>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 11,
                        // margin: 5,
                        paddingLeft: 0,
                        textAlign: "center",
                      }}
                    >
                      View Videos
                    </Text>
                  </TouchableOpacity>
                </View>
              )
            ) : (
              <View></View>
            )}
            <TrayButton
              disabled={disabled}
              onPress={onClickLeaveCall}
              text="Leave"
              type="leave"
            />
          </View>
        ) : (
          <View
            style={[
              styles.iconsimuliveCenter,
              orientation === Orientation.Portrait
                ? styles.controlsPortrait
                : styles.controlsLandscape,
            ]}
          >
            {/* <TrayButton
       disabled={disabled}
       onPress={toggleMic}
       muted={isMicMuted}
       text={isMicMuted ? "Unmute" : "Mute"}
       type="mic"
     />
     <TrayButton
       disabled={disabled}
       onPress={toggleCamera}
       muted={isCameraMuted}
       text={isCameraMuted ? "Turn on" : "Turn off"}
       type="camera"
     /> */}

            {meetingDetails &&
            meetingDetails.meeting_details.apidetails.agenda_type ==
              "simulive" ? (
              <TouchableOpacity onPress={() => videoclick()}>
                <View
                  style={{
                    alignItems: "center",
                    height: 50,
                    width: 50,
                    backgroundColor: "rgba(0, 0, 0, 0.747)",
                    borderRadius: 9,
                    marginLeft: 15,
                  }}
                >
                  <FontAwesome
                    style={{ alignSelf: "center", marginTop: 15 }}
                    color="white"
                    name="film"
                    size={20}
                  />
                  {/* <Image
             style={{ height:40,width:40,backgroundColor:"#333" }}
             source={require("../../assets/cameraOn.png")}
           /> */}
                </View>
                <Text
                  style={{
                    color: "white",
                    fontSize: 11,
                    margin: 5,
                    paddingLeft: 4,
                    textAlign: "center",
                  }}
                >
                  View Video
                </Text>
              </TouchableOpacity>
            ) : (
              <View></View>
            )}

            <TouchableOpacity
              onPress={() => {
                console.log("466 line", showMsgPanel);
                setShowMsgPanel(!showMsgPanel);
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  height: 50,
                  width: 50,
                  backgroundColor: "rgba(0, 0, 0, 0.747)",
                  borderRadius: 9,
                  marginLeft: 15,
                }}
              >
                <AntDesign
                  style={{ alignSelf: "center", marginTop: 15 }}
                  color={
                    chatNewMessagesCount > 0 && showMsgPanel == false
                      ? "red"
                      : "white"
                  }
                  name="message1"
                  size={20}
                />
              </View>
              <Text
                style={{
                  color: "white",
                  fontSize: 11,
                  margin: 5,
                  paddingLeft: 4,
                  textAlign: "center",
                }}
              >
                {showMsgPanel ? "Hide Chat" : "Chat"}
              </Text>
            </TouchableOpacity>

            {/* Ask a Question start*/}
            {meetingDetails &&
            meetingDetails.meeting_details.apidetails.agenda_type !==
              "simulive" ? (
              roomUrl &&
              meetingDetails.meeting_details.apidetails.apidetails
                .roomConfiguration.room_url === roomUrl ? (
                <View></View>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    console.log("545 Ask a question attendee", showQuestion);
                    setShowQuestionPanel(!showQuestion);
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      height: 50,
                      width: 50,
                      backgroundColor: "rgba(0, 0, 0, 0.747)",
                      borderRadius: 9,
                      marginLeft: 15,
                    }}
                  >
                    <FontAwesome
                      style={{ alignSelf: "center", marginTop: 12 }}
                      // color={
                      //   chatNewMessagesCount > 0 && showQuestion == false
                      //     ? "red"
                      //     : "white"
                      // }
                      color="white"
                      name="question-circle"
                      size={24}
                    />
                  </View>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 11,
                      margin: 5,
                      paddingLeft: 4,
                      textAlign: "center",
                    }}
                  >
                    {showQuestion ? "Hide Question" : "Ask a Question"}
                  </Text>
                </TouchableOpacity>
              )
            ) : (
              <View></View>
            )}
            {/* Ask a Question end*/}

            <TrayButton
              disabled={disabled}
              onPress={onClickLeaveCall}
              text="Leave"
              type="leave"
            />
          </View>
        )
      ) : (
        <View
          style={[
            styles.iconNormalCenter,
            orientation === Orientation.Portrait
              ? styles.controlsPortrait
              : styles.controlsLandscape,
          ]}
        >
          <TrayButton
            disabled={disabled}
            onPress={toggleMic}
            muted={isMicMuted}
            text={isMicMuted ? "Unmute" : "Mute"}
            type="mic"
          />
          <TrayButton
            disabled={disabled}
            onPress={toggleCamera}
            muted={isCameraMuted}
            text={isCameraMuted ? "Turn on" : "Turn off"}
            type="camera"
          />

          {meetingDetails &&
          meetingDetails.meeting_details.apidetails.agenda_type ==
            "simulive" ? (
            <TouchableOpacity onPress={() => videoclick()}>
              <View
                style={{
                  alignItems: "center",
                  height: 50,
                  width: 50,
                  backgroundColor: "rgba(0, 0, 0, 0.747)",
                  borderRadius: 9,
                  marginLeft: 15,
                }}
              >
                <FontAwesome
                  style={{ alignSelf: "center", marginTop: 15 }}
                  color="white"
                  name="film"
                  size={20}
                />
                {/* <Image
             style={{ height:40,width:40,backgroundColor:"#333" }}
             source={require("../../assets/cameraOn.png")}
           /> */}
              </View>
              <Text
                style={{
                  color: "white",
                  fontSize: 11,
                  margin: 5,
                  paddingLeft: 4,
                  textAlign: "center",
                }}
              >
                View Video
              </Text>
            </TouchableOpacity>
          ) : (
            <View></View>
          )}

          <TouchableOpacity
            onPress={() => {
              setShowMsgPanel(!showMsgPanel);
            }}
          >
            <View
              style={{
                alignItems: "center",
                height: 50,
                width: 50,
                backgroundColor: "rgba(0, 0, 0, 0.747)",
                borderRadius: 9,
                marginLeft: 15,
              }}
            >
              <AntDesign
                style={{ alignSelf: "center", marginTop: 15 }}
                color={
                  chatNewMessagesCount > 0 && showMsgPanel == false
                    ? "red"
                    : "white"
                }
                name="message1"
                size={20}
              />
            </View>
            <Text
              style={{
                color: "white",
                fontSize: 11,
                margin: 5,
                paddingLeft: 4,
                textAlign: "center",
              }}
            >
              {showMsgPanel ? "Hide Chat" : "Chat"}
            </Text>
          </TouchableOpacity>

          <TrayButton
            disabled={disabled}
            onPress={onClickLeaveCall}
            text="Leave"
            type="leave"
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerBase: {
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: theme.colors.greyLight,
    backgroundColor: "#058e6d",
    borderTopColor: theme.colors.grey,
    borderBottomColor: theme.colors.grey,
  },
  containerPortrait: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    borderTopWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  containerLandscape: {
    height: "100%",
    position: "absolute",
    right: 0,
    flexDirection: "column-reverse",
    borderLeftWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  controlsPortrait: {
    flexDirection: "row",
  },
  controlsLandscape: {
    flexDirection: "column-reverse",
  },
  iconCenter: {
    // marginLeft: 5,
    // textAlign:"center"
    //alignSelf:"center",
    flex: 1,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  connnnn: {
    flex: 1,
    marginLeft: 15,
    //alignSelf: "center",
    //justifyContent: "center",
  },
  iconsimuliveCenter: {
    //marginLeft: 120,
    flex: 1,
    justifyContent: "space-between"
    
  },
  iconNormalCenter: {
    //marginLeft: 55,
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
});
