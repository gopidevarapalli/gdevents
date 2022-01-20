import React, { Component } from "react";
import {
  Platform,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from "react-native-agora";
import requestCameraAndAudioPermission from "./Permission";
import styles from "./Style";

export default class VideoScreen3 extends Component {
  constructor(props) {
    super(props);
    /**
     * @name init
     * @description Function to initialize the Rtc Engine, attach event listeners and actions
     */
    this.init = async () => {
      const { appId } = this.state;
      this._engine = await RtcEngine.create(appId);
      await this._engine.enableVideo();
      this._engine.addListener("Warning", (warn) => {
        console.log("Warning", warn);
      });
      this._engine.addListener("Error", (err) => {
        console.log("Error", err);
      });
      this._engine.addListener("UserJoined", (uid, elapsed) => {
        console.log("UserJoined", uid, elapsed);
        // Get current peer IDs
        const { peerIds } = this.state;
        // If new user
        if (peerIds.indexOf(uid) === -1) {
          this.setState({
            // Add peer ID to state array
            peerIds: [...peerIds, uid],
          });
        }
      });
      this._engine.addListener("UserOffline", (uid, reason) => {
        console.log("UserOffline", uid, reason);
        const { peerIds } = this.state;
        this.setState({
          // Remove peer ID from state array
          peerIds: peerIds.filter((id) => id !== uid),
        });
      });
      // If Local user joins RTC channel
      this._engine.addListener(
        "JoinChannelSuccess",
        (channel, uid, elapsed) => {
          console.log("JoinChannelSuccess", channel, uid, elapsed);
          // Set state variable to true
          this.setState({
            joinSucceed: true,
          });
        }
      );
    };
    /**
     * @name startCall
     * @description Function to start the call
     */
    this.startCall = async () => {
      var _a;
      // Join Channel using null token and channel name
      await ((_a = this._engine) === null || _a === void 0
        ? void 0
        : _a.joinChannel(this.state.token, this.state.channelName, null, 0));
    };
    /**
     * @name endCall
     * @description Function to end the call
     */
    this.endCall = async () => {
      var _a;
      await ((_a = this._engine) === null || _a === void 0
        ? void 0
        : _a.leaveChannel());
      this.setState({ peerIds: [], joinSucceed: false });
    };
    this._renderVideos = () => {
      const { joinSucceed } = this.state;
      return joinSucceed
        ? React.createElement(
            View,
            { style: styles.fullView },
            React.createElement(RtcLocalView.SurfaceView, {
              style: styles.max,
              channelId: this.state.channelName,
              renderMode: VideoRenderMode.Hidden,
            }),
            this._renderRemoteVideos()
          )
        : null;
    };
    this._renderRemoteVideos = () => {
      const { peerIds } = this.state;
      return React.createElement(
        ScrollView,
        {
          style: styles.remoteContainer,
          contentContainerStyle: { paddingHorizontal: 2.5 },
          horizontal: true,
        },
        peerIds.map((value) => {
          return React.createElement(RtcRemoteView.SurfaceView, {
            style: styles.remote,
            uid: value,
            channelId: this.state.channelName,
            renderMode: VideoRenderMode.Hidden,
            zOrderMediaOverlay: true,
          });
        })
      );
    };
    this.state = {
      appId: "8a7f844762b04289badf4c7679c0710b",
      token: "",
      channelName: "meeting",
      joinSucceed: false,
      peerIds: [],
    };
    // if (Platform.OS === "android") {
    //   // Request required permissions from Android
    //   requestCameraAndAudioPermission().then(() => {
    //     console.log("requested!");
    //   });
    // }
  }
  componentDidMount() {
    this.init();
  }
  render() {
    return React.createElement(
      View,
      { style: styles.max },
      React.createElement(
        View,
        { style: styles.max },
        React.createElement(
          View,
          { style: styles.buttonHolder },
          React.createElement(
            TouchableOpacity,
            { onPress: this.startCall, style: styles.button },
            React.createElement(
              Text,
              { style: styles.buttonText },
              " Start Call "
            )
          ),
          React.createElement(
            TouchableOpacity,
            { onPress: this.endCall, style: styles.button },
            React.createElement(
              Text,
              { style: styles.buttonText },
              " End Call "
            )
          )
        ),
        this._renderVideos()
      )
    );
  }
}
// const mapStateToProps = state =>{
//     return({
//       login:state.login,
//       event: state.Event
//     })
//   }
//   export default connect(mapStateToProps)(VideoScreen2);
