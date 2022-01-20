import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from "react-native-agora";

const dimensions = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};

function VideoMeeting(props) {
  // _engine? RtcEngine;
  const [_engine, set_engine] = useState(RtcEngine);
  const [init, setInit] = useState();
  const [appId, setappId] = useState("8a7f844762b04289badf4c7679c0710b");
  const [token, setToken] = useState("");
  const [roomName, setRoomName] = useState("meeting");
  const [joinSucceed, setjoinSucceed] = useState(false);
  const [peerIds, setpeerIds] = useState([]);
  const [audMute, setaudMute] = useState(true);
  const [vidMute, setvidMute] = useState(true);
  const [screenHeight, setscreenHeight] = useState(0);

  useEffect(() => {
    setInit();
  }, []);

  const startCall = async () => {
    console.log("start call");
    await _engine.joinChannel(token, roomName, null, 0);
  };

  const endCall = async () => {
    console.log("end call");
    await _engine.leaveChannel();
    setpeerIds({ peerIds: [] });
    setjoinSucceed(false);
  };

  const toggleAudio = async () => {
    let audMuted = audMute;
    console.log("Audio toggle", audMuted);

    if (audMute === true) {
      await _engine?.disab;
      setaudMute(true);
    } else {
    }
    setaudMute(!audMuted);
  };

  const toggleVideo = async () => {
    let vidMuted = vidMute;
    console.log("Video toggle", vidMuted);

    if (vidMuted === true) {
      await _engine.setvidMute(true);
    } else {
    }
    setvidMute(!vidMuted);
  };

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };

  const _renderVideos = () => {
    console.log("render videos");
    const { joinSucceed } = this.state;
    return joinSucceed ? (
      <ScrollView>
        <View style={styles.fullView}>
          <RtcLocalView.SurfaceView
            style={styles.max}
            channelId={roomName}
            renderMode={VideoRenderMode.Hidden}
          />
          {_renderRemoteVideos()}
        </View>
      </ScrollView>
    ) : null;
  };

  const _renderRemoteVideos = () => {
    console.log("render remote videos");
    //const { peerIds } = this.state;
    const { peerIds } = peerIds;
    //setpeerIds([""]);
    const scrollEnabled = this.state.screenHeight > height;
    return (
      <ScrollView
        style={styles.remoteContainer}
        contentContainerStyle={{ paddingVertical: 150, flexGrow: 1 }}
        scrollEnabled={scrollEnabled}
        onContentSizeChange={this.onContentSizeChange}
        horizontal={false}
      >
        {peerIds.map((value) => {
          return (
            <RtcRemoteView.SurfaceView
              style={styles.remote}
              uid={value}
              channelId={roomName}
              renderMode={VideoRenderMode.Hidden}
              zOrderMediaOverlay={true}
            />
          );
        })}
      </ScrollView>
    );
  };

  return (
    <ScrollView>
      <View style={styles.max}>
        <View style={styles.max}>
          {_renderVideos()}
          <View style={styles.buttonHolder}>
            {/* <TouchableOpacity onPress={startCall} style={styles.button}>
            <Text style={styles.buttonText}> Start Call </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={endCall} style={styles.button}>
            <Text style={styles.buttonText}> End Call </Text>
          </TouchableOpacity> */}
            {joinSucceed ? null : (
              <TouchableOpacity onPress={startCall} style={styles.button}>
                <Text style={styles.buttonText}> Join </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={toggleAudio} style={styles.button}>
              {audMute ? (
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
            <TouchableOpacity onPress={toggleVideo} style={styles.button}>
              <Text style={styles.buttonText}>
                {" "}
                {vidMute ? (
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
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={endCall} style={styles.button}>
              <Text style={styles.buttonText}>
                <Image
                  style={[styles.tinyLogo, { tintColor: "red" }]}
                  source={require("../../assets/iconExit.png")}
                />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  max: {
    flex: 1,
  },
  buttonHolder: {
    height: 100,
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#0093E9",
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
  },
  fullView: {
    width: dimensions.width,
    height: dimensions.height - 100,
  },
  remoteContainer: {
    width: "100%",
    height: 150,
    position: "absolute",
    top: 5,
  },
  remote: {
    width: 150,
    height: 150,
    marginHorizontal: 2.5,
  },
  noUserText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#0093E9",
  },
});

const mapStateToProps = (state) => {
  return {
    login: state.login,
    event: state.Event,
  };
};
export default connect(mapStateToProps)(VideoMeeting);
