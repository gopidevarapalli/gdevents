import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import Video from "react-native-video";
import { Button, ActivityIndicator } from "react-native-paper";
import { connect } from "react-redux";
import Feather from "react-native-vector-icons/Feather";
import Orientation from "react-native-orientation";
import api_url from "../Config/Config";

const AgendaVideo = (props) => {
  const [video, setVideo] = useState();
  const [videoDurationTime, setTime] = useState(0);
  const [paused, setPaused] = useState(false);
  const [speaker, setSpeaker] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [exited, setExited] = useState(false);
  // let exited = false;
  let timeout;
  let player;

  const checkSessionStatus = async () => {
    const formData = new FormData();
    formData.append("cookie", props.login.cookie);
    formData.append("event_id", props.event.common.event.event_id_single);
    formData.append("agenda_id", props.route.params.meeting_details.id);

    let checkInterval = setInterval(() => {
      if (paused) {
        clearInterval(checkInterval);
      } else {
        if (!paused) {
          Axios.post(
            //`https://events.globaldata.com/api/user/simulive_fetch_video_session_data`,
            `${api_url.checkSessionStatus}`,
            formData
          ).then((response) => {
            console.log("videoenablestaus=", response.data);
            setTime(response.data.data.videSessionStartTimeDiff);
          });
        }
      }
    }, 2000);
  };

  useEffect(() => {
    console.log(fullscreen);
    if (fullscreen) {
      Orientation.lockToLandscape();
      // Orientation.unlockAllOrientations()
    } else {
      Orientation.lockToPortrait();
      // Orientation.unlockAllOrientations();
    }
  }, [fullscreen]);
  useEffect(() => {
    console.log("props", props);
    // console.log()
    const formData = new FormData();
    formData.append("cookie", props.login.cookie);
    formData.append("event_id", props.event.common.event.event_id_single);
    formData.append("agenda_id", props.route.params.meeting_details.id);

    console.log(
      props.route.params.meeting_details.apidetails.select_speakers.indexOf(
        props.login.common.user.id.toString()
      )
    );

    if (
      // props.route.params.meeting_details.apidetails.select_speakers.indexOf(
      //   props.login.common.user.id.toString()
      // ) > -1
      props.event.common.event.event_info.user_role == 'presenter'
    ) {
      setSpeaker(true);
    } else {
      setSpeaker(false);
    }

    // checkSessionStatus();

    //  Check whether video session started or not
    Axios.post(
      //`https://events.globaldata.com/api/user/simulive_fetch_video_session_data`,
      `${api_url.checkSessionStatus}`,
      formData
    ).then((response) => {
      console.log("videoenablestaus=", response.data);
      if (response.data.data.videSessionStartTimeDiff) {
        setTime(response.data.data.videSessionStartTimeDiff);
      }

      if (response.data.data.videoenablestaus || response.data.data.videSessionStartTimeDiff) {
        // Video session started
        Axios.get(
          props.route.params.meeting_details.apidetails
            .backStageRecordedVideoData.playlist
        ).then((res) => {
          setVideo(res.data.playlist[0].sources[0].file);
        });
      } else {
        // Video session not yet started
        console.log(
          "speaker",
          props.route.params.meeting_details.apidetails.select_speakers.indexOf(
            props.login.common.user.id.toString()
          )
        );
        if (
          // props.route.params.meeting_details.apidetails.select_speakers.indexOf(
          //   props.login.common.user.id.toString()
          // ) > -1
          props.event.common.event.event_info.user_role == 'presenter'
        ) {
          // if user is speaker
          Alert.alert(
            "Warning!",
            "Video Session is not yet started. Do you want start video session?",
            [
              {
                text: "NO",
                onPress: () => props.navigation.goBack(),
                style: "cancel",
              },
              {
                text: "YES",
                onPress: () => {
                  formData.append(
                    "sessionname",
                    props.route.params.meeting_details.apidetails.agend_title
                  );
                  Axios.post(
                    //`https://events.globaldata.com/api/user/simulive_join_session/`,
                    `${api_url.simuliveJoinSession}`,
                    formData
                  ).then((enableVideoRes) => {
                    console.log(enableVideoRes);
                    if (enableVideoRes.data.status === "ok") {
                      Axios.get(
                        props.route.params.meeting_details.apidetails
                          .backStageRecordedVideoData.playlist
                      ).then((res) => {
                        setVideo(res.data.playlist[0].sources[0].file);
                      });
                    } else {
                      Alert.alert(
                        "Warning!",
                        "Something went wrong. Please contact system administrator"
                      );
                    }
                  });
                },
              },
            ]
          );
        } else {
          // if user is attendee

          Alert.alert(
            "Warning!",
            "Video Session is not yet started. Please try after sometime"
          );
          props.navigation.goBack();
        }
      }
    });
  }, []);

  const ResetSession = () => {
    console.log("Reset session clicked");
    const formData = new FormData();
    formData.append("cookie", props.login.cookie);
    formData.append("event_id", props.event.common.event.event_id_single);
    formData.append("agenda_id", props.route.params.meeting_details.id);
    Axios.post(
      //`https://events.globaldata.com/api/user/simulive_reset_session/`,
      `${api_url.resetSession}`,
      formData
    ).then((resetStatus) => {
      console.log("Reset response", resetStatus.data);
      Axios.post(
        // `https://events.globaldata.com/api/user/simulive_fetch_video_session_data`,
        `${api_url.checkSessionStatus}`,
        formData
      ).then((response) => {
        console.log("session status", response);
        props.navigation.goBack();
      });
    });
  };

  return (
    <View style={styles.container}>
      {/* <Text>jjjjjjjj</Text> */}
      <View style={{ flex: 1, height: 400 }}>
        {/* <Text>hhhhhh</Text> */}
        {video ? (
          <Video
            //fullscreen={true}
            ref={(ref) => {
              player = ref;
            }}
            onLoad={() => player.seek(videoDurationTime)}
            source={{ uri: video }} // Can be a URL or a local file.
            // controls={true}
            style={styles.backgroundVideo}
            resizeMode={fullscreen ? "cover" : "contain"}
            disableFocus={true}
            paused={paused}
            progressUpdateInterval={1000} //calls onProgress after every 1 second
            // onSeek={( seek) => {console.log(seek)}}
            // seek={videoDurationTime}
            onProgress={(progress) => {
              console.log(videoDurationTime, progress.seekableDuration);
              if (videoDurationTime >= progress.seekableDuration) {
                console.log("paused");
                setPaused(true);
                // if(!exited){
                  timeout =  setTimeout(() => {
                    // console.log('exited', exited)
                    // if(!exited){
                      props.navigation.goBack();
                    // }
                  }, 5000);
                // }
                
              } else {
                const formData = new FormData();
                formData.append("cookie", props.login.cookie);
                formData.append(
                  "event_id",
                  props.event.common.event.event_id_single
                );
                formData.append(
                  "agenda_id",
                  props.route.params.meeting_details.id
                );

                Axios.post(
                  //`https://events.globaldata.com/api/user/simulive_fetch_video_session_data`,
                  `${api_url.checkSessionStatus}`,
                  formData
                ).then((response) => {
                  console.log("videoenablestaus=", response.data);
                  if (response.data.data.videoenablestaus || response.data.data.videSessionStartTimeDiff) {
                    setTime(response.data.data.videSessionStartTimeDiff);
                  } else {
                    Alert.alert(
                      "Warning!",
                      "Video session has been stopped. Please try after sometimg"
                    );
                    props.navigation.goBack();
                  }
                });
              }
              console.log(progress);
            }}
            // onVideoSeek={( seek) => {console.log(seek)}}
          />
        ) : (
          //   <WebView
          //   source={{
          //     html:
          //       '<iframe width="100%" height=500 src="https://content.jwplatform.com/previews/UKe6gihR" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
          //   }}
          //   style={{ marginTop: 20 }}
          // />

          <ActivityIndicator color="green" size="large" />
        )}

        {paused ? (
          <View
            style={{
              flex: 1,
              textAlign: "center",
              textAlignVertical: "center",
            }}
          >
            <Text
              style={{
                flex: 1,
                //position: "absolute",
                //top: "50%",
                // left: "25%",
                textAlign: "center",
                textAlignVertical: "center",
                //fontWeight: "bold",
              }}
            >
              Video Session has been completed. Please wait...You will be redirecting to the meeting.
            </Text>
          </View>
        ) : (
          <View></View>
        )}
      </View>
      {paused ? null : (
        <TouchableOpacity
          onPress={() => setFullscreen(!fullscreen)}
          style={{
            height: 20,
            width: 20,
            position: "absolute",
            bottom: fullscreen ? "12%" : "40%",
            right: "10%",
          }}
        >
          <Feather
            style={{ textAlign: "center", fontWeight: "bold" }}
            name={fullscreen ? "minimize" : "maximize"}
            size={17}
            color="black"
          />
        </TouchableOpacity>
      )}
      <View></View>

      {fullscreen ? null : (
        <View
          style={{
            alignSelf: "center",
            marginTop: 30,
            display: "flex",
            flexDirection: "row",
          }}
        >
          {speaker && !paused ? (
            <Button
              style={{
                marginTop: 8,
                marginBottom: 12,
                marginRight: 10,
                width: 90,
                height: 35,
                alignSelf: "center",
                justifyContent: "center",
                borderRadius: 25,
              }}
              color="#00DEA5"
              contentStyle={{ height: 44 }}
              labelStyle={{
                color: "#2F283D",
                fontSize: 15,
                fontWeight: "bold",
              }}
              mode="contained"
              onPress={() => ResetSession()}
            >
              Reset
            </Button>
          ) : null}
          {paused?null:<Button
            style={{
              marginTop: 8,
              marginBottom: 12,
              width: 90,
              height: 35,
              alignSelf: "center",
              justifyContent: "center",
              borderRadius: 25,
            }}
            color="#00DEA5"
            contentStyle={{ height: 44 }}
            labelStyle={{ color: "#2F283D", fontSize: 16, fontWeight: "bold", textTransform: "capitalize" }}
            mode="contained"
            onPress={async() => {
              setExited(true);
              // exited =await true;
              
              setTimeout(() => {
                props.navigation.goBack();
              }, 500);
              
              // return await clearTimeout(timeout);
            }}
          >
            Exit
          </Button>}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

// export default AgendaVideo;

const mapStateToProps = (state) => {
  return {
    login: state.login,
    event: state.Event,
  };
};

export default connect(mapStateToProps)(AgendaVideo);
