import React, { Component } from "react";
import {
  Platform,
  Dimensions,
  ScrollView,
  Image,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from "react-native-agora";
import requestCameraAndAudioPermission from "./Permission";
import styles from "./Style";
import { Picker } from "@react-native-community/picker";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const { height } = Dimensions.get("window");
const dimensions = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};

interface Props {}

interface State {
  appId: string;
  token: string;
  channelName: string;
  joinSucceed: boolean;
  peerIds: number[];
  audMute: boolean;
  vidMute: boolean;
  showchat: boolean;
  // data: [
  //   { id: 1; message: "Lorem ipsum dolor sit amet" },
  //   { id: 2; message: "Lorem ipsum dolor sit amet" },
  //   { id: 3; message: "Lorem ipsum dolor sit a met" },
  //   { id: 4; message: "Lorem ipsum dolor sit a met" },
  //   { id: 5; message: "Lorem ipsum dolor sit a met" },
  //   { id: 6; message: "Lorem ipsum dolor sit a met" },
  //   { id: 7; message: "Lorem ipsum dolor sit a met" },
  //   { id: 8; message: "Lorem ipsum dolor sit a met" },
  //   { id: 9; message: "Lorem ipsum dolor sit a met" }
  // ];
  screenHeight: 0;
  check: boolean;
}

export class VideoScreen2 extends Component<Props, State> {
  _engine?: RtcEngine;

  constructor(props) {
    super(props);
    this.state = {
      appId: "8a7f844762b04289badf4c7679c0710b",
      token: "",
      channelName: "meeting3",
      joinSucceed: false,
      peerIds: [],
      audMute: true,
      vidMute: true,
      showchat: true,
      screenHeight: 0,
      check: false,
      // data: [
      //   { id: 1, message: "Lorem ipsum dolor sit amet" },
      //   { id: 2, message: "Lorem ipsum dolor sit amet" },
      //   { id: 3, message: "Lorem ipsum dolor sit a met" },
      //   { id: 4, message: "Lorem ipsum dolor sit a met" },
      //   { id: 5, message: "Lorem ipsum dolor sit a met" },
      //   { id: 6, message: "Lorem ipsum dolor sit a met" },
      //   { id: 7, message: "Lorem ipsum dolor sit a met" },
      //   { id: 8, message: "Lorem ipsum dolor sit a met" },
      //   { id: 9, message: "Lorem ipsum dolor sit a met" },
      // ],
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

  /**
   * @name init
   * @description Function to initialize the Rtc Engine, attach event listeners and actions
   */
  init = async () => {
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
    this._engine.addListener("JoinChannelSuccess", (channel, uid, elapsed) => {
      console.log("JoinChannelSuccess", channel, uid, elapsed);
      // Set state variable to true
      this.setState({
        joinSucceed: true,
      });
    });
    this.startCall();
  };

  /**
   * @name startCall
   * @description Function to start the call
   */
  startCall = async () => {
    console.log("start call");
    // Join Channel using null token and channel name
    await this._engine?.joinChannel(
      this.state.token,
      this.state.channelName,
      null,
      0
    );
  };

  /**
   * @name endCall
   * @description Function to end the call
   */
  endCall = async () => {
    console.log("end call");
    await this._engine?.leaveChannel();
    this.setState({ peerIds: [], joinSucceed: false });
  };

  toggleAudio = async () => {
    let audMuted = this.state.audMute;
    console.log("Audio toggle", audMuted);

    if (audMuted === true) {
      await this._engine?.disableAudio();
      this.setState({
        audMute: true,
      });
    } else {
      await this._engine?.enableAudio();
    }
    this.setState({
      audMute: !audMuted,
    });
  };

  toggleVideo = async () => {
    let vidMuted = this.state.vidMute;
    console.log("Video toggle", vidMuted);
    if (vidMuted === true) {
      await this._engine?.disableVideo();
      this.setState({
        vidMute: true,
      });
    } else {
      await this._engine?.enableVideo();
    }
    this.setState({
      vidMute: !vidMuted,
    });
  };

  chat = () => {
    let chatShow = this.state.showchat;
    console.log("chat", chatShow);
    if (chatShow === true) {
      console.log("show chat");
      alert("jjjjj");
      this.setState({
        showchat: true,
      });
    } else {
      showchat: false;
    }
    this.setState({
      showchat: !chatShow,
    });
  };

  maxi = () => {
    console.log("other user");
    this.setState({ check: !this.state.check });
    //alert("clicked");
    {
      this._renderRemoteVideos2();
    }
  };

  _renderRemoteVideos2 = () => {
    console.log("render remote full screen");
    const { peerIds } = this.state;
    const scrollEnabled = this.state.screenHeight > height;
    // return (
    <View style={[styles.fullView, { position: "relative", flex: 1 }]}>
      {/* <Image
            style={{ width: 30, height: 30 }}
            source={require("../../assets/GlobalData.png")}
          /> */}
      {peerIds.filter((peerId) => {
        console.log("peers remote", peerIds);
        return (
          <View style={styles.fullView}>
            <RtcRemoteView.SurfaceView
              style={styles.fullView}
              uid={peerId}
              channelId={this.state.channelName}
              renderMode={VideoRenderMode.Hidden}
              zOrderMediaOverlay={true}
            />
          </View>
        );
      })}
    </View>;
    // );
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.max}>
          <View style={styles.max}>
            {this._renderVideos()}
            <View style={styles.buttonHolder}>
              <TouchableOpacity onPress={this.maxi}>
                {/* <Image
                  style={{ width: 25, height: 25, marginBottom: 430 }}
                  source={require("../../assets/GlobalData.png")}
                /> */}
              </TouchableOpacity>
              {this.state.joinSucceed ? null : (
                <TouchableOpacity
                  onPress={this.startCall}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}> Join </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={this.toggleAudio}
                style={styles.button}
              >
                {this.state.audMute ? (
                  <Image
                    style={styles.tinyLogo}
                    source={require("../../assets/microphoneOn.png")}
                  />
                ) : (
                  <Image
                    style={styles.tinyLogo}
                    source={require("../../assets/microphoneOffRed.png")}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.toggleVideo}
                style={styles.button}
              >
                {this.state.vidMute ? (
                  <Image
                    style={styles.tinyLogo}
                    source={require("../../assets/cameraOn.png")}
                  />
                ) : (
                  <Image
                    style={styles.tinyLogo}
                    source={require("../../assets/cameraOffRed.png")}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={this.endCall} style={styles.button}>
                <Image
                  style={[styles.tinyLogo, { tintColor: "red" }]}
                  source={require("../../assets/iconExit.png")}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={this.chat} style={styles.chatButton}>
                {this.state.showchat ? (
                  <Image
                    style={styles.tinyLogo}
                    source={require("../../assets/chat2.png")}
                  />
                ) : (
                  <Image
                    style={styles.tinyLogo}
                    source={require("../../assets/chathide.png")}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };

  _renderVideos = () => {
    console.log("render videos");
    const { joinSucceed } = this.state;
    return joinSucceed ? (
      <ScrollView>
        <View style={styles.fullView}>
          <RtcLocalView.SurfaceView
            style={styles.max}
            channelId={this.state.channelName}
            renderMode={VideoRenderMode.Hidden}
          />
          {/* <TouchableOpacity onPress={this.endCall} style={styles.button}>
          <Text style={styles.buttonText}> End Call </Text>
        </TouchableOpacity> */}
          {this._renderRemoteVideos()}
        </View>
      </ScrollView>
    ) : null;
  };

  _renderRemoteVideos = () => {
    console.log("render remote videos");
    const { peerIds } = this.state;
    const scrollEnabled = this.state.screenHeight > height;
    var middleStyle =
      this.state.check === false
        ? { width: 0, height: 0 }
        : { width: dimensions.width, height: dimensions.height };
    return (
      <ScrollView
        style={styles.remoteContainer}
        // contentContainerStyle={{ paddingVertical: 150, flexGrow: 1 }}
        scrollEnabled={scrollEnabled}
        onContentSizeChange={this.onContentSizeChange}
        horizontal={false}
      >
        <View>
          {/* <Image
            style={{ width: 30, height: 30 }}
            source={require("../../assets/GlobalData.png")}
          /> */}
          {peerIds.map((value, index, array) => {
            console.log("peers", peerIds);
            return (
              <TouchableOpacity onPress={this.maxi}>
                <View>
                  {/* <Text
                  style={{
                    position: "absolute",
                    zIndex: 6,
                    marginTop: 20,
                    marginLeft: 35,
                  }}
                >
                  dropdown
                </Text> */}
                  {/* <FontAwesome5
                  onPress={this.maxi}
                  name="ellipsis-v"
                  style={{
                    position: "absolute",
                    marginTop: 22,
                    marginLeft: 160,
                    zIndex: 6,
                  }}
                  size={20}
                > */}
                  {/* <Picker
                    selectedValue={this.state.dropdown1}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ dropdown1: itemValue })
                    }
                  >
                    <Picker.Item label="name" value="sravan" />
                    <Picker.Item label="Maximize" value="Maximize" />
                  </Picker> */}
                  {/* </FontAwesome5> */}
                  <View
                    style={[middleStyle, { backgroundColor: "seagreen" }]}
                  />

                  <RtcRemoteView.SurfaceView
                    style={styles.remote}
                    uid={value}
                    channelId={this.state.channelName}
                    renderMode={VideoRenderMode.Hidden}
                    zOrderMediaOverlay={true}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    event: state.Event,
  };
};

export default connect(mapStateToProps)(VideoScreen2);
