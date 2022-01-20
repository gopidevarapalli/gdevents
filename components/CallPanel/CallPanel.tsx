import React, {
  useEffect,
  useReducer,
  useMemo,
  useCallback,
  useState,
} from "react";
import { View, StyleSheet, ScrollView, Text, Platform } from "react-native";
import { logDailyEvent } from "../../utils";
import { DailyEvent } from "@daily-co/react-native-daily-js";
import {
  callReducer,
  initialCallState,
  PARTICIPANTS_CHANGE,
  CAM_OR_MIC_ERROR,
  FATAL_ERROR,
  isScreenShare,
  isLocal,
  containsScreenShare,
  participantCount,
  getMessage,
} from "./callState";
import Tile, { TileType } from "../Tile/Tile";
import CallMessage from "../CallMessage/CallMessage";
import { useCallObject } from "../../useCallObject";
import { TRAY_HEIGHT as TRAY_THICKNESS } from "../Tray/Tray";
// import CopyLinkButton from "../CopyLinkButton/CopyLinkButton";
import { useOrientation, Orientation } from "../../useOrientation";
import { useSelector } from "react-redux";
import WebView from "react-native-webview";
// import Video from "react-native-video";
// import {  NodePlayerView } from 'react-native-nodemediaclient';
// import YoutubePlayer from "react-native-youtube-iframe";

type Props = {
  roomUrl: string;
  meetingDetails?: any;
  event?:any;
};

const THUMBNAIL_EDGE_LENGTH = 196;

const CallPanel = (props: Props) => {
  // console.log("callpaneltsx", props);
  const callObject = useCallObject();
  const [callState, dispatch] = useReducer(callReducer, initialCallState);
  const [usingFrontCamera, setUsingFrontCamera] = useState(true); // default
  const orientation = useOrientation();
  const profileData = useSelector((state) => state.login);
  let player;
  let vp;

  /**4.
   * Start listening for participant changes, when the callObject is set.
   */
  useEffect(() => {
    console.log("meetingDetails callpaneltsx", props.meetingDetails);
    if (!callObject) {
      return;
    }

    const events: DailyEvent[] = [
      "participant-joined",
      "participant-updated",
      "participant-left",
      'waiting-participant-added',
      'waiting-participant-updated',
      'waiting-participant-removed'
    ];

    const handleNewParticipantsState = (event?: any) => {
      event && logDailyEvent(event);
      dispatch({
        type: PARTICIPANTS_CHANGE,
        participants: callObject.participants(),
      });
    };

    // Use initial state
    handleNewParticipantsState();

    // Listen for changes in state
    for (const event of events) {
      callObject.on(event, handleNewParticipantsState);
    }

    // Stop listening for changes in state
    return function cleanup() {
      for (const event of events) {
        callObject.off(event, handleNewParticipantsState);
      }
    };
  }, [callObject]);

  /**
   * Start listening for call errors, when the callObject is set.
   */
  useEffect(() => {
    if (!callObject) {
      return;
    }

    function handleCameraErrorEvent(event?: any) {
      logDailyEvent(event);
      dispatch({
        type: CAM_OR_MIC_ERROR,
        message:
          (event && event.errorMsg && event.errorMsg.errorMsg) || "Unknown",
      });
    }

    // We're making an assumption here: there is no camera error when callObject
    // is first assigned.

    callObject.on("camera-error", handleCameraErrorEvent);

    return function cleanup() {
      callObject.off("camera-error", handleCameraErrorEvent);
    };
  }, [callObject]);

  /**
   * Start listening for fatal errors, when the callObject is set.
   */
  useEffect(() => {
    if (!callObject) {
      return;
    }

    function handleErrorEvent(event?: any) {
      logDailyEvent(event);
      dispatch({
        type: FATAL_ERROR,
        message: (event && event.errorMsg) || "Unknown",
      });
    }

    // We're making an assumption here: there is no error when callObject is
    // first assigned.

    callObject.on("error", handleErrorEvent);

    return function cleanup() {
      callObject.off("error", handleErrorEvent);
    };
  }, [callObject]);

  /**
   * Toggle between front and rear cameras.
   */
  const flipCamera = useCallback(async () => {
    if (!callObject) {
      return;
    }
    const { device } = await callObject.cycleCamera();
    if (device) {
      setUsingFrontCamera(device.facingMode === "user");
    }
  }, [callObject]);

  /**
   * Send an app message to the remote participant whose tile was clicked on.
   */
  const sendHello = useCallback(
    (participantId: string) => {
      callObject &&
        callObject.sendAppMessage({ hello: "world" }, participantId);
    },
    [callObject]
  );

  /**
   * Get lists of large tiles and thumbnail tiles to render.
   */
  const [largeTiles, thumbnailTiles] = useMemo(() => {
    
    if(callObject){
      console.log(callObject.participants());
      console.log(callState.callItems)
    }
    
    let larges: JSX.Element[] = [];
    let thumbnails: JSX.Element[] = [];
    Object.entries(callState.callItems).forEach(([id, callItem]) => {
      console.log(id)
      let tileType: TileType;
      if (isScreenShare(id)) {
        tileType = TileType.Full;
      } else if (isLocal(id) || containsScreenShare(callState.callItems)) {
        tileType = TileType.Thumbnail;
      } else if (participantCount(callState.callItems) <= 3) {
        tileType = TileType.Full;
      } else {
        tileType = TileType.Half;
      }
      const tile = (
        <Tile
          key={id}
          videoTrack={callItem.videoTrack}
          audioTrack={callItem.audioTrack}
          user_name={callItem.user_name}
          mirror={usingFrontCamera && isLocal(id)}
          type={tileType}
          isLoading={callItem.isLoading}
          onPress={
            isLocal(id)
              ? flipCamera
              : () => {
                  sendHello(id);
                }
          }
        />
      );
      if (tileType === TileType.Thumbnail) {
        if (props.meetingDetails) {
          // if (callObject){
          //   console.log('is owner?',callObject, id);
          // }
          if(callObject && callObject.participants()){
            console.log(callObject.participants())
          }
          
          if((callObject && callObject.participants() && callObject.participants()[id] && callObject.participants()[id].owner) || id.includes('-screen')) {
            // if either simulive or webinar admin should have enabled either audio or video then only showing to the users
            (props.meetingDetails.meeting_details.apidetails.select_speakers.indexOf(
              profileData.common.user.id.toString()
            ) > -1 || props.event.common.event.event_info.user_role == 'presenter')
              ? thumbnails.push(tile)
              : props.meetingDetails.meeting_details.apidetails.agenda_type ==
                "roundtable"
              ? thumbnails.push(tile)
              : null;
          }
        } else {
          thumbnails.push(tile);
        }
      } else {
        if (
          props.meetingDetails &&
          (props.meetingDetails.meeting_details.apidetails.agenda_type ==
            "simulive" ||
            props.meetingDetails.meeting_details.apidetails.agenda_type ==
              "webinar")
        ) {
          // if (callItem.videoTrack || callItem.audioTrack) {
            if( (callObject && callObject.participants() && callObject.participants()[id] && callObject.participants()[id].owner) || id.includes('-screen')){
            // if either simulive or webinar admin should have enabled either audio or video then only showing to the users

            (props.meetingDetails.meeting_details.apidetails.select_speakers.indexOf(
              profileData.common.user.id.toString()
            ) > -1 || props.event.common.event.event_info.user_role == 'presenter')
              ? larges.push(tile)
              : larges.push(tile);
          } else if (
            props.meetingDetails.meeting_details.apidetails.agenda_type ==
            "roundtable"
          ) {
            larges.push(tile);
          }
        } else {
          larges.push(tile);
        }
      }
    });
    return [larges, thumbnails];
  }, [callState.callItems, flipCamera, sendHello, usingFrontCamera]);

  const message = getMessage(callState, props.roomUrl);
  const showCopyLinkButton = message && !message.isError;

  return   (props.meetingDetails && props.meetingDetails.meeting_details.apidetails.streaming_enable == "1" && props.meetingDetails.meeting_details.apidetails.streaming_type == "hybridstreaming" && props.meetingDetails.meeting_details.apidetails.hybrid_streaming_url != "")?
  <>
  {/* {props.meetingDetails.meeting_details.apidetails.streaming_platform == "youtube"? */}
    <WebView
    source={{ html: `<iframe width='100%' height='80%' src=${props.meetingDetails.meeting_details.apidetails.hybrid_streaming_url+'?&autoplay=1'} frameborder='0' allow='autoplay;' allowfullscreen></iframe>` }}
    style={{ width: "100%", height: "100%",  }}
    cacheEnabled={true}
    allowsInlineMediaPlayback={true}
    allowsFullscreenVideo={true}
    resizeMode={"contain"}
    
   mediaPlaybackRequiresUserAction={((Platform.OS !== 'android') || (Platform.Version >= 17)) ? false : undefined}
   userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
    />
    {/* <View style={{marginTop:100}}>
    <YoutubePlayer
        height={300}
        play={true}
        videoId={props.meetingDetails.meeting_details.apidetails.hybrid_streaming_url.split("/")[props.meetingDetails.meeting_details.apidetails.hybrid_streaming_url.split("/").length-1]}
      />
      </View> */}
    {/* <View style={{marginTop:100}}>
    <NodePlayerView 
  style={{ height: 200, innerWidth:400, innerHeight:400}}
  ref={(vp) => { vp = vp }}
  inputUrl={props.meetingDetails.meeting_details.apidetails.hybrid_streaming_url+'?&autoplay=1'}
  scaleMode={"ScaleAspectFit"}
  bufferTime={300}
  maxBufferTime={1000}
  autoplay={true}
/>
</View> */}

{/* <Video 
       source={{uri: props.meetingDetails.meeting_details.apidetails.hybrid_streaming_url+'?&autoplay=1'}}   
       ref={(ref) => {
        player = ref
       }}  
       style={styles.backgroundVideo} /> */}
     
    {/*: <WebView
    source={{ html: `<iframe width='100%' height='500px' src=${props.meetingDetails.meeting_details.apidetails.hybrid_streaming_url+'?&autoplay=1'} frameborder='0' allow='autoplay;' allowfullscreen></iframe>` }}
    style={{ width: "100%", height: "100%", flex:1 }}
    cacheEnabled={true}
    allowsInlineMediaPlayback={true}
    allowsFullscreenVideo={true}
    resizeMode={"contain"}
    mediaPlaybackRequiresUserAction={((Platform.OS !== 'android') || (Platform.Version >= 17)) ? false : undefined}
    userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
    />
  } */}

 
  </>: props.meetingDetails &&
    props.meetingDetails.meeting_details.apidetails.agenda_type ==
      "simulive" ? (
    props.meetingDetails &&
    props.meetingDetails.meeting_details.apidetails.agenda_type == "simulive" &&
    props.meetingDetails.meeting_details.apidetails.select_speakers.indexOf(
      profileData.common.user.id.toString()
    ) == -1 && props.event.common.event.event_info.user_role !== 'presenter' ? (<>
    {largeTiles.length? // If he is attendee and there are speakers in the large tiles then show it else show just text
      <View
      style={[
        styles.mainContainer,
        message ? styles.messageContainer : styles.largeTilesContainerOuter,
      ]}
    >
      {message ? (
        <>
          {/* <CallMessage
          header={message.header}
          detail={message.detail}
          isError={message.isError}
        /> */}
          {/* {showCopyLinkButton 
        && <CopyLinkButton roomUrl={props.roomUrl} />
        } */}
        </>
      ) : (
        <ScrollView
          alwaysBounceVertical={false}
          alwaysBounceHorizontal={false}
          horizontal={orientation === Orientation.Landscape}
        >
          <View
            style={[
              styles.largeTilesContainerInnerBase,
              orientation === Orientation.Portrait
                ? styles.largeTilesContainerInnerPortrait
                : styles.largeTilesContainerInnerLandscape,
            ]}
          >
            {largeTiles}
          </View>
        </ScrollView>
      )}
    </View>:<View
        style={{
          position: "absolute",
          top: "40%",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text style={{}}>{"You are joined in "}</Text>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          {props.meetingDetails.meeting_details.apidetails.agend_title}
        </Text>
      </View>}
   </> ) : (
      <>
        <View
          style={[
            styles.mainContainer,
            message ? styles.messageContainer : styles.largeTilesContainerOuter,
          ]}
        >
          {message ? (
            <>
              {/* <CallMessage
              header={message.header}
              detail={message.detail}
              isError={message.isError}
            /> */}
              {/* {showCopyLinkButton 
            && <CopyLinkButton roomUrl={props.roomUrl} />
            } */}
            </>
          ) : (
            <ScrollView
              alwaysBounceVertical={false}
              alwaysBounceHorizontal={false}
              horizontal={orientation === Orientation.Landscape}
            >
              <View
                style={[
                  styles.largeTilesContainerInnerBase,
                  orientation === Orientation.Portrait
                    ? styles.largeTilesContainerInnerPortrait
                    : styles.largeTilesContainerInnerLandscape,
                ]}
              >
                {largeTiles}
              </View>
            </ScrollView>
          )}
        </View>
        <View
          style={[
            styles.thumbnailContainerOuterBase,
            orientation === Orientation.Portrait
              ? styles.thumbnailContainerOuterPortrait
              : styles.thumbnailContainerOuterLandscape,
          ]}
        >
          <ScrollView
            horizontal={orientation === Orientation.Portrait}
            alwaysBounceHorizontal={false}
            alwaysBounceVertical={false}
          >
            <View
              style={
                orientation === Orientation.Portrait
                  ? styles.thumbnailContainerInnerPortrait
                  : styles.thumbnailContainerInnerLandscape
              }
            >
              {thumbnailTiles}
            </View>
          </ScrollView>
        </View>
      </>
    )
  ) :


  
  (
    <>
      <View
        style={[
          styles.mainContainer,
          message ? styles.messageContainer : styles.largeTilesContainerOuter,
        ]}
      >
        {message ? (
          <>
            {/* <CallMessage
          header={message.header}
          detail={message.detail}
          isError={message.isError}
        /> */}
            {/* {showCopyLinkButton 
        && <CopyLinkButton roomUrl={props.roomUrl} />
        } */}
          </>
        ) : (
          <ScrollView
            alwaysBounceVertical={false}
            alwaysBounceHorizontal={false}
            horizontal={orientation === Orientation.Landscape}
          >
            <View
              style={[
                styles.largeTilesContainerInnerBase,
                orientation === Orientation.Portrait
                  ? styles.largeTilesContainerInnerPortrait
                  : styles.largeTilesContainerInnerLandscape,
              ]}
            >
              {largeTiles}
            </View>
          </ScrollView>
        )}
      </View>
      <View
        style={[
          styles.thumbnailContainerOuterBase,
          orientation === Orientation.Portrait
            ? styles.thumbnailContainerOuterPortrait
            : styles.thumbnailContainerOuterLandscape,
        ]}
      >
        <ScrollView
          horizontal={orientation === Orientation.Portrait}
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
        >
          <View
            style={
              orientation === Orientation.Portrait
                ? styles.thumbnailContainerInnerPortrait
                : styles.thumbnailContainerInnerLandscape
            }
          >
            {thumbnailTiles}
          </View>
        </ScrollView>
        {largeTiles.length ? null : (
          <View
            style={{
              position: "relative",
              top: "40%",
              alignItems: "center",
              width: "100%",
            }}
          >{props.meetingDetails &&
            props.meetingDetails.meeting_details.apidetails.agenda_type ==
              "webinar"?
              thumbnailTiles.length?null:
              <View
              style={{
                position: "absolute",
                top: "40%",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text style={{}}>{"Begins Shortly "}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                {props.meetingDetails.meeting_details.apidetails.agend_title}
              </Text>
            </View>:
              (callObject && 
                callObject.accessState() && 
                callObject.accessState().access && 
                callObject.accessState().access.level == "lobby")?
              <View>
                <Text style={{ fontWeight: "bold", textAlign:"center" }}>Meeting Locked By Owner.</Text>
                <Text style={{ textAlign:"center" }}> The Meeting owner has been notifified that you'd like to join</Text>
              </View>:
            <Text style={{ fontWeight: "bold" }}>
              
            "You are here. Waiting for others to join"
          </Text>



              }
            
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    position: "absolute",
    width: "100%",
    height: "90%",
    padding: 12,
  },
  thumbnailContainerOuterBase: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  thumbnailContainerOuterPortrait: {
    width: "100%",
    height: THUMBNAIL_EDGE_LENGTH,
    paddingTop: 12,
  },
  thumbnailContainerOuterLandscape: {
    height: "100%",
    width: THUMBNAIL_EDGE_LENGTH,
    paddingLeft: 12,
  },
  thumbnailContainerInnerPortrait: {
    marginLeft: 12,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  thumbnailContainerInnerLandscape: {
    marginTop: 12,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  messageContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  largeTilesContainerOuter: {
    justifyContent: "center",
  },
  largeTilesContainerInnerBase: {
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  largeTilesContainerInnerPortrait: {
    flexDirection: "row",
    marginTop: THUMBNAIL_EDGE_LENGTH,
    marginBottom: TRAY_THICKNESS,
  },
  largeTilesContainerInnerLandscape: {
    flexDirection: "column",
    marginLeft: THUMBNAIL_EDGE_LENGTH,
    marginRight: TRAY_THICKNESS,
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height:500,
    width:400
  },
});

export default CallPanel;
