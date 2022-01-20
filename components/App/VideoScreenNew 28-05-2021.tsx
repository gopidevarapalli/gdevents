import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  TextInput,
  YellowBox,
  Text,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
} from "react-native";
import Daily, {
  DailyEvent,
  DailyCall,
  DailyEventObject,
  DailyEventObjectAppMessage,
} from "@daily-co/react-native-daily-js";
import CallPanel from "../CallPanel/CallPanel";
import Button from "../Button/Button";
import StartButton from "../StartButton/StartButton";
import { logDailyEvent } from "../../utils";
import api from "../../meetingApi";
import Tray from "../Tray/Tray";
import CallObjectContext from "../../CallObjectContext";
import CopyLinkButton from "../CopyLinkButton/CopyLinkButton";
import theme from "../../theme";
import { useOrientation, Orientation } from "../../useOrientation";
import { ActivityIndicator } from "react-native-paper";
import { connect } from "react-redux";

declare const global: { HermesInternal: null | {} };

// Silence an annoying warning about a harmless require cycle in React Native's
// fetch library.
// See https://github.com/facebook/react-native/issues/23130.
YellowBox.ignoreWarnings(["Require cycle: node_modules"]);

// Uncomment during development to temporarily intentionally ignore errors,
// preventing the red screen from popping up
// (console as any).reportErrorsAsExceptions = false;

enum AppState {
  Idle,
  Creating,
  Joining,
  Joined,
  Leaving,
  Error,
}

const VideoScreenNew = (props) => {
  // console.log("videoscreen props", props);
  const [appState, setAppState] = useState(AppState.Idle);
  const [roomUrl, setRoomUrl] = useState<string | undefined>(undefined);
  const [roomCreateError, setRoomCreateError] = useState<boolean>(false);
  const [callObject, setCallObject] = useState<DailyCall | null>(null);
  const [roomUrlFieldValue, setRoomUrlFieldValue] = useState<
    string | undefined
  >(undefined);
  const [RoomToken, setRoomToken] = useState("");
  const orientation = useOrientation();

  let [waitingParticipants, setWaitingParticipants] = useState<any>([]);
  let waitingListClearInterval:any;

  /**
   * Uncomment to set up debugging globals.
   */
  // useEffect(() => {
  //   const g = global as any;
  //   g.Daily = Daily;
  //   g.callObject = callObject;
  // }, [callObject]);

  /**
   * Uncomment to attach debugging events handlers.
   */
  // useEffect(() => {
  //   if (!callObject) {
  //     return;
  //   }

  //   const events: DailyEvent[] = ['loading', 'load-attempt-failed', 'loaded'];

  //   for (const event of events) {
  //     callObject.on(event, logDailyEvent);
  //   }

  //   return () => {
  //     for (const event of events) {
  //       callObject.off(event, logDailyEvent);
  //     }
  //   };
  // }, [callObject]);

  /**
   * Attach lifecycle event handlers.
   */
  useEffect(() => {
    // console.log(props.login.common.user.username)
    // console.log(props.login.common.user.email)
    // console.log('videoscreenew.js')
    createRoom(props.login, props.route.params.meeting_id, props.route.params.token);

    if (!callObject) {
      return;
    }

    const events: DailyEvent[] = ["joined-meeting", "left-meeting", "error", 'waiting-participant-added'];

    function handleNewMeetingState(event?: DailyEventObject) {
      console.log('switch called')
      // console.log(callObject?.meetingState())
      if(event && event.action && event.action == 'waiting-participant-added'){
        console.log('_waitingParticipants list below')
             console.log(callObject.waitingParticipants());
              const waitingListFromCallObject = Object.keys(callObject.waitingParticipants());
        if(waitingListFromCallObject.length){  // we are receiving waiting participants in _waitingParticipants key under callObject.
          // console.log(callObject._waitingParticipants)
          
          // const entries = Object.entries(callObject._waitingParticipants)
          // console.log(entries)
          waitingListFromCallObject.forEach((item:any)=>{  // iterating each waiting participant
            Alert.alert(
              'Warning',
              callObject.waitingParticipants()[item].name+" is requesting to enter the meeting?",
              [
                {text: 'Reject', onPress: async() => {
                  await callObject.updateWaitingParticipant(callObject.waitingParticipants()[item].id, {grantRequestedAccess:false});
                  
                }, style: 'cancel'},
                {text: 'Accept', onPress: async() =>{
                  console.log(callObject.waitingParticipants()[item].id)
                  await callObject.updateWaitingParticipant(callObject.waitingParticipants()[item].id, {grantRequestedAccess:true});
                 
                } },
              ]
            );

            // if(waitingParticipants.length && waitingParticipants.find((f)=> f.id === callObject._waitingParticipants[item].id)){
            //   console.log('waiting participant existed in array')
            // }else{
            //   waitingParticipants.push(callObject._waitingParticipants[item]);
            //   setWaitingParticipants([...waitingParticipants])
            // }
          })
        }
       
      }
      logDailyEvent(event);
      switch (callObject?.meetingState()) {
        case "joined-meeting":
          setAppState(AppState.Joined);
          break;
        case "left-meeting":
          callObject?.destroy().then(() => {
            setRoomUrl(undefined);
            setCallObject(null);
            setAppState(AppState.Idle);
          });
          break;
        case "error":
          setAppState(AppState.Error);
          break;
        default:
          break;
      }
    }

    // Use initial state
    handleNewMeetingState();

    // Listen for changes in state
    for (const event of events) {
      callObject.on(event, handleNewMeetingState);
    }

    // Stop listening for changes in state
    return function cleanup() {
      for (const event of events) {
        callObject.off(event, handleNewMeetingState);
      }
    };
  }, [callObject]);

  /**
   * Listen for app messages from other call participants.
   * These only show up in the console.
   */
  useEffect(() => {
    if (!callObject) {
      return;
    }

    function handleAppMessage(event?: DailyEventObjectAppMessage) {
      if (event) {
        logDailyEvent(event);
        console.log(`received app message from ${event.fromId}: `, event.data);
      }
    }

    callObject.on("app-message", handleAppMessage);

    return function cleanup() {
      callObject.off("app-message", handleAppMessage);
    };
  }, [callObject]);

  /**
   * Join a call as soon as a callObject is created.
   * This effect must happen *after* the event handlers are attached, above.
   */
  useEffect(() => {
    // alert(roomUrl)
    if (!callObject || !roomUrl) {
      return;
    }
    // console.log("=================Room TOken ===========");
    // console.log(RoomToken);
    callObject.join({ url: roomUrl, token: RoomToken }).catch((_) => {
      // Doing nothing here since we handle fatal join errors in another way,
      // via our listener attached to the 'error' event
    })
    
    setAppState(AppState.Joining);
  }, [callObject, roomUrl]);

  // useEffect(()=>{
  //   console.log('waitingParticipants array')
  //   console.log(waitingParticipants)
  //      if(waitingParticipants.length){
  //       Alert.alert(
  //         'Warning',
  //         waitingParticipants[0].name+" is requesting to enter the meeting?",
  //         [
  //           {text: 'Reject', onPress: async() => {
  //             await callObject.updateWaitingParticipant(waitingParticipants[0].id, {grantRequestedAccess:false});
  //             await waitingParticipants.splice(0,1)
  //              setWaitingParticipants([...waitingParticipants])
  //           }, style: 'cancel'},
  //           {text: 'Accept', onPress: async() =>{
  //             await callObject.updateWaitingParticipant(waitingParticipants[0].id, {grantRequestedAccess:true});
  //             await waitingParticipants.splice(0,1)
  //              setWaitingParticipants([...waitingParticipants])
  //           } },
  //         ]
  //       );
        
  //      }
  // }, [waitingParticipants])

  /**
   * Create the callObject as soon as we have a roomUrl.
   * This will trigger the call starting.
   */
  useEffect(() => {
    // alert('189')
    if (!roomUrl) {
      return;
    }
    const newCallObject = Daily.createCallObject();
    setCallObject(newCallObject);
  }, [roomUrl]);

  /**
   * Create a temporary room that will become available to join.
   */
  const createRoom = (userdetails, meeting_id, token) => {
    setRoomCreateError(false);
    setAppState(AppState.Creating);
    api
      .createRoom(
        userdetails,
        props.event.common.event.event_id_single,
        meeting_id,
        token
      )
      .then((room) => {
        setRoomUrlFieldValue(room.url);
        setRoomToken(room.token);
        setAppState(AppState.Idle);
        // startCall();
      })
      .catch(() => {
        setRoomCreateError(true);
        setRoomUrlFieldValue(undefined);
        setAppState(AppState.Idle);
      });
  };

  /**
   * Join the room provided by the user or the temporary room created by createRoom
   */
  const startCall = () => {
    // alert('start call')
    setRoomUrl(roomUrlFieldValue);
    setAppState(AppState.Joined);

    // setAppState(AppState.Joining);
  };

  /**
   * Leave the current call.
   * If we're in the error state (AppState.Error), we've already "left", so just
   * clean up our state.
   */
  const leaveCall = useCallback(() => {
    if (!callObject) {
      return;
    }
    if (appState === AppState.Error) {
      callObject.destroy().then(() => {
        setRoomUrl(undefined);
        setRoomUrlFieldValue(undefined);
        setCallObject(null);
        setAppState(AppState.Idle);
      });
    } else {
      setAppState(AppState.Leaving);
      callObject.leave();
    }
  }, [callObject, appState]);

  const showCallPanel = [
    AppState.Joining,
    AppState.Joined,
    AppState.Error,
  ].includes(appState);
  const enableCallButtons = [AppState.Joined, AppState.Error].includes(
    appState
  );
  const isAppStateIdle = appState === AppState.Idle;
  const startButtonDisabled = !isAppStateIdle || !roomUrlFieldValue;

  return appState === AppState.Creating ? (
    <ActivityIndicator size="large" color="green" />
  ) : appState === AppState.Joining ? (
    <ActivityIndicator size="large" color="green" />
  ) : (
    <CallObjectContext.Provider value={callObject}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {showCallPanel ? (
            <View
              style={[
                styles.callContainerBase,
                orientation === Orientation.Landscape
                  ? styles.callContainerLandscape
                  : null,
              ]}
            >
              <CallPanel roomUrl={roomUrl || ""} />
              <Tray
                onClickLeaveCall={leaveCall}
                disabled={!enableCallButtons}
              />
            </View>
          ) : appState === AppState.Joined ? (
            <ActivityIndicator size="large" color="green" />
          ) : (
            <ScrollView
              contentContainerStyle={
                orientation === Orientation.Portrait
                  ? styles.homeContainerPortrait
                  : styles.homeContainerLandscape
              }
              alwaysBounceVertical={false}
            >
              {/* <Image
                style={styles.logo}
                source={require('../../assets/logo.png')}
              /> */}
              <View style={styles.buttonContainer}>
                {/* <Text style={styles.bodyText}>
                  To get started, enter an existing room URL
                </Text> */}
                <View
                  style={[
                    styles.demoInputContainer,
                    !!roomUrlFieldValue && styles.shortContainer,
                  ]}
                >
                  {/* <TextInput
                    style={styles.roomUrlField}
                    placeholder="Room URL"
                    placeholderTextColor={theme.colors.greyDark}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="url"
                    editable={isAppStateIdle}
                    value={roomUrlFieldValue}
                    onChangeText={(text) => {
                      setRoomUrlFieldValue(text);
                      setRoomCreateError(false);
                    }}
                  /> */}
                  {/* {!!roomUrlFieldValue && (
                    <TouchableWithoutFeedback
                      onPress={() => setRoomUrlFieldValue(undefined)}
                    >
                      <Image
                        style={styles.closeIcon}
                        source={require('../../assets/close.png')}
                      />
                    </TouchableWithoutFeedback>
                  )} */}
                </View>
                {roomCreateError && (
                  <View style={styles.textRow}>
                    <Image source={require("../../assets/error.png")} />
                    <Text style={styles.errorText}>
                      Oops! A room couldn't be created.
                    </Text>
                  </View>
                )}
                {roomUrlFieldValue ? (
                  // <CopyLinkButton roomUrl={roomUrlFieldValue} />
                  <View></View>
                ) : (
                  <Button
                    type="secondary"
                    onPress={createRoom}
                    label={
                      appState === AppState.Creating
                        ? "Creating room..."
                        : "Create demo room"
                    }
                  />
                )}
                {/* {AppState.Joined?<View></View>: */}
                {roomUrl ? (
                  <ActivityIndicator color="green" size="large" />
                ) : (
                  <StartButton
                    onPress={startCall}
                    disabled={startButtonDisabled}
                    starting={appState === AppState.Joining}
                  />
                )}
                {/* } */}
              </View>
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    </CallObjectContext.Provider>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.greyLightest,
  },
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  callContainerBase: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  callContainerLandscape: {
    flexDirection: "row",
  },
  textRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  bodyText: {
    fontSize: theme.fontSize.base,
    marginBottom: 8,
    fontFamily: theme.fontFamily.body,
  },
  startContainer: {
    flexDirection: "column",
  },
  homeContainerPortrait: {
    paddingHorizontal: 24,
  },
  homeContainerLandscape: {
    paddingHorizontal: "20%",
  },
  buttonContainer: {
    justifyContent: "center",
    marginTop: 40,
  },
  logo: {
    alignSelf: "flex-start",
    marginVertical: 40,
  },
  roomUrlField: {
    borderRadius: 8,
    marginVertical: 8,
    padding: 12,
    backgroundColor: theme.colors.white,
    fontFamily: theme.fontFamily.body,
    color: theme.colors.greyDark,
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: theme.fontSize.base,
    borderWidth: 1,
    borderColor: theme.colors.grey,
    width: "100%",
  },
  errorText: {
    fontSize: theme.fontSize.base,
    color: theme.colors.red,
    marginLeft: 8,
  },
  demoInputContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  shortContainer: {
    width: "90%",
  },
  closeIcon: {
    height: 16,
    width: 16,
    marginLeft: 16,
  },
});

// export default VideoScreenNew;

const mapStateToProps = (state) => {
  return {
    login: state.login,
    event: state.Event,
  };
};

export default connect(mapStateToProps)(VideoScreenNew);
