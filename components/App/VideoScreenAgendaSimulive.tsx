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
  BackHandler,
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
import api from "../../api";
import Tray from "../Tray/Tray";
import CallObjectContext from "../../CallObjectContext";
import CopyLinkButton from "../CopyLinkButton/CopyLinkButton";
import theme from "../../theme";
import { useOrientation, Orientation } from "../../useOrientation";
import { ActivityIndicator } from "react-native-paper";
import { connect } from "react-redux";
import Axios from "axios";
import api_url from "../../Config/Config";
import Chat from "./Chat";
import AddQA from "./AddQA";

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

const VideoScreenAgendaSimulive = (props) => {
  console.log("videoscreen simulive props", props);
  const [appState, setAppState] = useState(AppState.Idle);
  const [roomUrl, setRoomUrl] = useState<string | undefined>(undefined);
  const [roomCreateError, setRoomCreateError] = useState<boolean>(false);
  const [callObject, setCallObject] = useState<DailyCall | null>(null);
  const [roomUrlFieldValue, setRoomUrlFieldValue] = useState<
    string | undefined
  >(undefined);
  const [RoomToken, setRoomToken] = useState("");
  const orientation = useOrientation();

  let [messagesList, setMessagesList] = useState([]);
  const [showMsgPanel, setShowMsgPanel] = useState(false);
  let [questionList, setQuestionsList] = useState([]);
  const [showQuestion, setShowQuestionPanel] = useState(false);
  const [roomConfig, setRoomConfig] = useState<any>();
  let [chatNewMessagesCount, setChatNewMessagesCount] = useState(0);

  let [askquestionsCount, setAskQuestions] = useState(0);

  useEffect(() => {
    if (
      props.route.params.meeting_details.apidetails.select_speakers.indexOf(
        props.login.common.user.id.toString()
      ) > -1 ||
      props.event.common.event.event_info.user_role == "presenter"
    ) {
      setRoomConfig(
        props.route.params.meeting_details.apidetails.apidetails
          .backStageRoomConfiguration
      );
    } else {
      setRoomConfig(
        props.route.params.meeting_details.apidetails.apidetails
          .roomConfiguration
      );
    }
  }, []);

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
    if (props.route.params.provider == "Daily") {
      createRoom(props.event, props.login.common.user, props.route.params);
    } else {
      alert("Provider is not available. Please contact system adminstrator");
      props.navigation.goBack();
    }
    // createRoom(props.login.common.user, props.route.params);

    if (!callObject) {
      return;
    }

    const events: DailyEvent[] = [
      "joined-meeting",
      "left-meeting",
      "error",
      "participant-joined",
      "participant-left",
    ];

    function handleNewMeetingState(event?: DailyEventObject) {
      logDailyEvent(event);
      console.log("HandleNewMeetingState", event);

      console.log(callObject.participants());

      if (event && event.action && event.action == "joined-meeting") {
        // console.log("joined meeting calling axios");
        Object.keys(callObject.participants()).forEach((participant: any) => {
          console.log(
            "participant=",
            callObject.participants()[participant].user_name.toLowerCase()
          );
          if (
            callObject
              .participants()
              [participant].user_name.toLowerCase()
              .includes("moderator")
          ) {
            setQASessionStart(false);
          }
        });

        const formData = new FormData();
        formData.append("cookie", props.login.cookie);
        formData.append("event_id", props.event.common.event.event_id_single);
        formData.append("meeting_id", props.route.params.meeting_details.id);
        formData.append(
          "meeting_type",
          props.route.params.meeting_details.apidetails.select_speakers.indexOf(
            props.login.common.user.id.toString()
          ) > -1 || props.event.common.event.event_info.user_role == "presenter"
            ? "agendaSimuliveBackstage"
            : "agendaSimulive"
        );
        Axios.post(`${api_url.chatHistory}`, formData)
          .then((res) => {
            console.log("line 275", res.data);
            let temp = [];
            temp = res.data.data.map((item) => {
              item.displayname = item.display_name;
              item.msg = item.content;
              item.type =
                props.login.common.user.displayname == item.display_name
                  ? "out"
                  : "in";
              return item;
            });
            console.log(temp);
            setMessagesList([...temp]);
            setChatNewMessagesCount(temp.length);
          })
          .catch((e) => console.log(e));

        const formData2 = new FormData();
        formData2.append("cookie", props.login.cookie);
        formData2.append("event_id", props.event.common.event.event_id_single);
        formData2.append(
          "agenda_id",
          props.route.params.meeting_details.apidetails.agend_id
        );
        Axios.post(`${api_url.getQuestionsAndAnswers}`, formData2)
          .then((res) => {
            // console.log("getQuestionsAndAnswers res", res);
            let temp = [];
            temp = res.data.data.map((item) => {
              item.displayname = item.display_name;
              item.msg = item.content;
              item.type =
                props.login.common.user.displayname == item.display_name
                  ? "out"
                  : "in";
              return item;
            });
            setQuestionsList([...temp]);
            setAskQuestions(temp.length);
          })
          .catch((err) => console.log("err", err));
      } else if (
        event &&
        event.action &&
        event.action == "participant-joined"
      ) {
        console.log("participant joined");
        Object.keys(callObject.participants()).forEach((participant: any) => {
          console.log(
            "participant=",
            callObject.participants()[participant].user_name.toLowerCase()
          );
          if (
            callObject
              .participants()
              [participant].user_name.toLowerCase()
              .trim()
              .includes("moderator")
          ) {
            console.log("moderator found");
            setQASessionStart(false);
          }
        });
        const formData2 = new FormData();
        formData2.append("cookie", props.login.cookie);
        formData2.append("event_id", props.event.common.event.event_id_single);
        if (
          props.route.params.meeting_details.apidetails.select_speakers.indexOf(
            props.login.common.user.id.toString()
          ) > -1 ||
          props.event.common.event.event_info.user_role == "presenter"
        ) {
          formData2.append("page_type", "agendaSimuliveBackstage");
        } else {
          formData2.append("page_type", "agendaSimulive");
        }
        formData2.append(
          "page_id",
          props.route.params.meeting_details.apidetails.agend_id
        );
        formData2.append(
          "room_name",
          props.route.params.meeting_details.apidetails.apidetails
            .roomConfiguration.session_name
        );
        formData2.append(
          "daily_room_name",
          props.route.params.meeting_details.apidetails.apidetails
            .roomConfiguration.room_name
        );
        formData2.append("daily_event_action", "participant-joined");
        formData2.append(
          "daily_session_id",
          props.route.params.meeting_details.apidetails.apidetails
            .roomConfiguration.room_id
        );

        console.log("participant simulive formdata join", formData2);

        Axios.post(`${api_url.daily_save_user_log}`, formData2)
          .then((res) => {
            console.log("participant simulive join res", res);
          })
          .catch((err) => console.log("err", err));
      } else if (event && event.action && event.action == "participant-left") {
        let ModeratorFound = 0;
        Object.keys(callObject.participants()).forEach(
          (participant: any, index: any) => {
            console.log(
              "participantAfterLeft=",
              callObject.participants()[participant].user_name.toLowerCase()
            );
            if (
              callObject
                .participants()
                [participant].user_name.toLowerCase()
                .trim()
                .includes("moderator")
            ) {
              console.log("moderator found");
              // setQASessionStart(false);
              ModeratorFound = ModeratorFound + 1;
            }
            console.log(
              index + 1,
              Object.keys(callObject.participants()).length
            );
            if (index + 1 == Object.keys(callObject.participants()).length) {
              console.log(
                index + 1,
                Object.keys(callObject.participants()).length
              );
              if (ModeratorFound > 0) {
                setQASessionStart(false);
              } else {
                setQASessionStart(true);
              }
            }
          }
        );
        const formData2 = new FormData();
        formData2.append("cookie", props.login.cookie);
        formData2.append("event_id", props.event.common.event.event_id_single);
        if (
          props.route.params.meeting_details.apidetails.select_speakers.indexOf(
            props.login.common.user.id.toString()
          ) > -1 ||
          props.event.common.event.event_info.user_role == "presenter"
        ) {
          formData2.append("page_type", "agendaSimuliveBackstage");
        } else {
          formData2.append("page_type", "agendaSimulive");
        }
        formData2.append(
          "page_id",
          props.route.params.meeting_details.apidetails.agend_id
        );
        formData2.append(
          "room_name",
          props.route.params.meeting_details.apidetails.apidetails
            .roomConfiguration.session_name
        );
        formData2.append(
          "daily_room_name",
          props.route.params.meeting_details.apidetails.apidetails
            .roomConfiguration.room_name
        );
        formData2.append("daily_event_action", "participant-left");
        formData2.append(
          "daily_session_id",
          props.route.params.meeting_details.apidetails.apidetails
            .roomConfiguration.room_id
        );

        console.log("participant simulive formdata left", formData2);

        Axios.post(`${api_url.daily_save_user_log}`, formData2)
          .then((res) => {
            console.log("participant simulive left res", res);
          })
          .catch((err) => console.log("err", err));
      } else if (event && event.action && event.action == "error") {
        Alert.alert("Warning", "You have been rejected from the meeting.");
        leaveCall();
      }
      switch (callObject?.meetingState()) {
        case "joined-meeting":
          const formData = new FormData();
          formData.append("cookie", props.login.cookie);
          formData.append("event_id", props.event.common.event.event_id_single);
          if (
            props.route.params.meeting_details.apidetails.select_speakers.indexOf(
              props.login.common.user.id.toString()
            ) > -1 ||
            props.event.common.event.event_info.user_role == "presenter"
          ) {
            formData.append("page_type", "agendaSimuliveBackstage");
          } else {
            formData.append("page_type", "agendaSimulive");
          }
          formData.append(
            "page_id",
            props.route.params.meeting_details.apidetails.agend_id
          );
          formData.append(
            "room_name",
            props.route.params.meeting_details.apidetails.apidetails
              .roomConfiguration.session_name
          );
          formData.append(
            "daily_room_name",
            props.route.params.meeting_details.apidetails.apidetails
              .roomConfiguration.room_name
          );
          formData.append("daily_event_action", "joined-meeting");
          formData.append(
            "daily_session_id",
            props.route.params.meeting_details.apidetails.apidetails
              .roomConfiguration.room_id
          );

          console.log("local simulive formdata", formData);

          Axios.post(`${api_url.daily_save_user_log}`, formData)
            .then((res) => {
              console.log("local simulive join res", res);
            })
            .catch((err) => console.log("err", err));

          setAppState(AppState.Joined);
          break;

        case "left-meeting":
          const formData2 = new FormData();
          formData2.append("cookie", props.login.cookie);
          formData2.append(
            "event_id",
            props.event.common.event.event_id_single
          );
          if (
            props.route.params.meeting_details.apidetails.select_speakers.indexOf(
              props.login.common.user.id.toString()
            ) > -1 ||
            props.event.common.event.event_info.user_role == "presenter"
          ) {
            formData2.append("page_type", "agendaSimuliveBackstage");
          } else {
            formData2.append("page_type", "agendaSimulive");
          }
          formData2.append(
            "page_id",
            props.route.params.meeting_details.apidetails.agend_id
          );
          formData2.append(
            "room_name",
            props.route.params.meeting_details.apidetails.apidetails
              .roomConfiguration.session_name
          );
          formData2.append(
            "daily_room_name",
            props.route.params.meeting_details.apidetails.apidetails
              .roomConfiguration.room_name
          );
          formData2.append("daily_event_action", "left-meeting");
          formData2.append(
            "daily_session_id",
            props.route.params.meeting_details.apidetails.apidetails
              .roomConfiguration.room_id
          );

          console.log("local simulive formdata left", formData2);

          Axios.post(`${api_url.daily_save_user_log}`, formData2)
            .then((res) => {
              console.log("local simulive res left", res);
            })
            .catch((err) => console.log("err", err));

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

  const [qaSessionStart, setQASessionStart] = useState(true);
  const [
    qaSessionStartedByPresenter,
    setQASessionStartedByPresenter,
  ] = useState(false);
  /**
   * Listen for app messages from other call participants.
   * These only show up in the console.
   */
  useEffect(() => {
    if (!callObject) {
      return;
    }

    function handleAppMessage(event?: DailyEventObjectAppMessage) {
      //console.log("eventtttt", event);
      if (event) {
        logDailyEvent(event);
        console.log(`received app message from ${event.fromId}: `, event.data);

        if (event.data.message && event.data.message == "qasessionstarted") {
          setQASessionStart(true);
          setQASessionStartedByPresenter(true);
        } else if (
          event.data.message &&
          event.data.message == "prsenterexist"
        ) {
          setQASessionStart(false);
        } else if (event.data.message && event.data.message == "sessionreset") {
          //sessionreset
          Alert.alert(
            "Warning",
            "Session has been reset by moderator. Please re-join the meeting."
          );
          leaveCall();
        } else {
          messagesList.push({
            msg: event.data.data.data.msg,
            displayname: event.data.data.data.displayname,
            type: "in",
          });
          let msgList = messagesList;
          console.log(msgList);
          setMessagesList([...msgList]);
          let NewMessageCount = messagesList.length;
          console.log("NewMessageCount", NewMessageCount);
          setChatNewMessagesCount(NewMessageCount);
        }
      }
    }

    callObject.on("app-message", handleAppMessage);

    return function cleanup() {
      callObject.off("app-message", handleAppMessage);
    };
  }, [callObject, messagesList, chatNewMessagesCount]);

  useEffect(() => {
    console.log("useeffect showMsgPanel ", showMsgPanel);
    // if(showMsgPanel){
    setChatNewMessagesCount(0);
    // }
  }, [showMsgPanel]);

  useEffect(() => {
    console.log("below message list");
    console.log(messagesList);
  }, [messagesList]);

  useEffect(() => {
    console.log("useeffect questionPanel ", showQuestion);
    // if(showMsgPanel){
    //setChatNewMessagesCount(0);
    setAskQuestions(0);
    // }
  }, [showQuestion]);

  useEffect(() => {
    console.log(" below question listtttt", questionList);
  }, [questionList]);

  const sendMessage = (content) => {
    if (content == "qasessionstarted") {
      callObject.sendAppMessage(
        {
          message: content,
          is_private: false,
          type: "chat",
        },
        "*"
      );
    } else {
      let sessionName =
        props.route.params.meeting_details.apidetails.select_speakers.indexOf(
          props.login.common.user.id.toString()
        ) > -1 || props.event.common.event.event_info.user_role == "presenter"
          ? roomConfig.backstage_session_name
          : roomConfig.session_name;
      console.log("cookie", props.login.cookie);
      console.log("event_id", props.event.common.event.event_id_single);
      console.log("d_session_id", callObject._participants.local.session_id);
      console.log("user_id", props.login.common.user.id);
      console.log("message", content);
      console.log("meeting_id", props.route.params.meeting_details.id);
      console.log("roomName", sessionName);
      console.log("dailyRoomName", roomConfig.room_name);
      console.log("meeting_type", "videochat");
      console.log("is_private_chat", "0");

      const formData = new FormData();
      formData.append("cookie", props.login.cookie);
      formData.append("event_id", props.event.common.event.event_id_single);
      formData.append(
        "d_session_id",
        callObject._participants.local.session_id
      );
      formData.append("user_id", props.login.common.user.id);
      formData.append("message", content);
      formData.append("meeting_id", props.route.params.meeting_details.id);
      formData.append("roomName", sessionName);
      formData.append("dailyRoomName", roomConfig.room_name);
      formData.append(
        "meeting_type",
        props.route.params.meeting_details.apidetails.select_speakers.indexOf(
          props.login.common.user.id.toString()
        ) > -1 || props.event.common.event.event_info.user_role == "presenter"
          ? "agendaSimuliveBackstage"
          : "agendaSimulive"
      );
      formData.append("is_private_chat", "0");
      Axios.post(`${api_url.saveChatLog}`, formData)
        .then((res) => {
          console.log("save_daily_co_chat_log response");
          console.log(res.data);
        })
        .catch((e) => {
          console.log("save_daily_co_chat_log error");
          console.log(e);
        });

      callObject.sendAppMessage(
        {
          data: {
            data: {
              msg: content,
              displayname: props.login.common.user.displayname,
              initial: props.login.common.user.displayname.substring(0, 1),
            },
            is_private: false,
            type: "chat",
          },
        },
        "*"
      );
    }

    messagesList.push({
      msg: content,
      displayname: props.login.common.user.displayname,
      type: "out",
    });
    //  globalMsgList.push({msg: content, displayname:props.login.common.user.displayname});
    let msgList = messagesList;
    //  console.log(msgList)
    setMessagesList([...msgList]);
  };

  useEffect(() => {
    setInterval(() => {
      const formData2 = new FormData();
      formData2.append("cookie", props.login.cookie);
      formData2.append("event_id", props.event.common.event.event_id_single);
      formData2.append(
        "agenda_id",
        props.route.params.meeting_details.apidetails.agend_id
      );
      Axios.post(`${api_url.getQuestionsAndAnswers}`, formData2)
        .then((res) => {
          // console.log("getQuestionsAndAnswers res", res);
          let temp = [];
          temp = res.data.data.map((item) => {
            item.displayname = item.display_name;
            item.msg = item.content;
            item.type =
              props.login.common.user.displayname == item.display_name
                ? "out"
                : "in";
            return item;
          });
          setQuestionsList([...temp]);
          setAskQuestions(temp.length);
        })
        .catch((err) => console.log("err", err));
    }, 5000);
  }, []);
  // submit question click
  const askQuestion = (content) => {
    console.log("question button clicked");

    console.log("cookie", props.login.cookie);
    console.log("event_id", props.event.common.event.event_id_single);
    console.log(
      "agenda_id",
      props.route.params.meeting_details.apidetails.agend_id
    );
    console.log("question", content);

    const formData = new FormData();
    formData.append("cookie", props.login.cookie);
    formData.append("event_id", props.event.common.event.event_id_single);
    formData.append(
      "agenda_id",
      props.route.params.meeting_details.apidetails.agend_id
    );
    formData.append("question", content);

    Axios.post(`${api_url.saveQuestionandAnswer}`, formData)
      .then((res) => {
        console.log("save Q & Ans res", res);
        console.log("save Q & A", res.data);
        Axios.post(`${api_url.getQuestionsAndAnswers}`, formData)
          .then((res) => {
            console.log("after update", res);
            let temp = [];
            temp = res.data.data.map((item) => {
              item.displayname = item.display_name;
              item.msg = item.content;
              item.type =
                props.login.common.user.displayname == item.display_name
                  ? "out"
                  : "in";
              return item;
            });
            setQuestionsList([...temp]);
            setAskQuestions(temp.length);
          })
          .catch((err) => console.log("err", err));
      })
      .catch((err) => {
        console.log("err", err);
      });

    // callObject.sendAppMessage(
    //   {
    //     data: {
    //       data: {
    //         msg: content,
    //         displayname: props.login.common.user.displayname,
    //       },
    //       type: "question",
    //     },
    //   },
    //   "*"
    // );

    // questionList.push({
    //   msg: content,
    //   displayname: props.login.common.user.displayname,
    //   type: "out",
    // });

    // let questList = questionList;
    // console.log("q list", questList);

    // setQuestionsList([...questList]);
  };

  /**
   * Join a call as soon as a callObject is created.
   * This effect must happen *after* the event handlers are attached, above.
   */
  useEffect(() => {
    // alert(roomUrl)
    if (!callObject || !roomUrl) {
      return;
    }
    console.log("=================Room TOken ===========");
    console.log(RoomToken);
    callObject.join({ url: roomUrl, token: RoomToken }).catch((_) => {
      // Doing nothing here since we handle fatal join errors in another way,
      // via our listener attached to the 'error' event
    });
    setAppState(AppState.Joining);
  }, [callObject, roomUrl]);

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
  const createRoom = (events, userdetails, meeting_details) => {
    setRoomCreateError(false);
    setAppState(AppState.Creating);
    api
      .createRoom(events, props.login, meeting_details)
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
      props.navigation.goBack();
      // props.navigation.navigate("Sponsors", { title: "Sponsors"});
    }
  }, [callObject, appState]);

  useEffect(() => {
    if (roomUrlFieldValue) {
      startCall();
    }
  }, [roomUrlFieldValue]);

  // function handleBackButtonClick() {
  //   console.log('back button pressed');
  //   // setAppState(AppState.Leaving);
  //   // callObject.leave();
  //   leaveCall();
  //   props.navigation.goBack();
  //   return true;
  // }

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
  //   return () => {
  //     // BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
  //   };
  // }, []);

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
              {!showQuestion && !showMsgPanel ? (
                <CallPanel
                  roomUrl={roomUrl || ""}
                  meetingDetails={props.route.params}
                  event={props.event}
                />
              ) : showQuestion ? (
                <AddQA
                  questionList={questionList}
                  askQuestion={(content) => askQuestion(content)}
                />
              ) : showMsgPanel ? (
                <View style={{ zIndex: 999999 }}>
                  <Chat
                    messagesList={messagesList}
                    sendMessage={(content) => sendMessage(content)}
                  />

                  {/* {messagesList.map((item, i)=>{
                  return(
                    <Text key={i}>{item.displayname}: {item.msg}</Text>
                  )
                })} */}
                  {/* <TextInput
                onChangeText={(val)=> console.log()}
                /> */}
                </View>
              ) : (
                <CallPanel
                  roomUrl={roomUrl || ""}
                  meetingDetails={props.route.params}
                  event={props.event}
                />
              )}

              <Tray
                onClickLeaveCall={leaveCall}
                disabled={!enableCallButtons}
                meetingDetails={props.route.params}
                event={props.event}
                setShowMsgPanel={(showMsgPanel) => {
                  console.log(messagesList);
                  setShowMsgPanel(showMsgPanel);
                }}
                showMsgPanel={showMsgPanel}
                chatNewMessagesCount={chatNewMessagesCount}
                setShowQuestionPanel={(showQuestion) => {
                  console.log("join session Question list", questionList);
                  setShowQuestionPanel(showQuestion);
                }}
                showQuestion={showQuestion}
                askQuestions={askquestionsCount}
                qaSessionStart={qaSessionStart}
                qaSessionStartedByPresenter={qaSessionStartedByPresenter}
                sendMessage={(content) => sendMessage(content)} //qasessionstarted
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

export default connect(mapStateToProps)(VideoScreenAgendaSimulive);
