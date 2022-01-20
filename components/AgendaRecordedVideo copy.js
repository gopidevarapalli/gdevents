import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import Video from 'react-native-video';
import { Button } from "react-native-paper";
import { connect } from "react-redux";
import { ActivityIndicator } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Orientation from 'react-native-orientation'; 
 
const AgendaRecordedVideo = (props) => {
  
  const [video, setVideo] = useState();
  const [videoDurationTime, setTime] = useState(0);
  const [paused, setPaused] = useState(false);
  const [speaker, setSpeaker] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  let player;

  useEffect(()=>{
    console.log(fullscreen)
      if(fullscreen){
        // player.presentFullscreenPlayer();
        Orientation.lockToLandscape();
        // Orientation.unlockAllOrientations()
      }else{
        Orientation.lockToPortrait()
        Orientation.unlockAllOrientations()
      }
  }, [fullscreen])
   
  useEffect(() => {
       
        console.log("props", props);
        // console.log()
        const formData = new FormData();
        formData.append('cookie', props.login.cookie);
        formData.append('event_id', props.event.common.event.event_id_single);
        formData.append('agenda_id', props.route.params.meeting_details.apidetails.agend_id);

        // console.log(props.route.params.meeting_details.apidetails.select_speakers.indexOf(
        //   props.login.common.user.id.toString()
        // ))
          
        // if(props.route.params.meeting_details.apidetails.select_speakers.indexOf(
        //   props.login.common.user.id.toString()
        // ) > -1){
        //   setSpeaker(true)
        // }else{
        //   setSpeaker(false)
        // }

        // checkSessionStatus();
 

        //  Check whether video session started or not
      
              Axios.get(props.route.params.meeting_details.apidetails.RecordedVideoData
                .playlist)
                .then((res)=>{
                  console.log(res.data.playlist[0].sources[1].file)
                  setVideo(res.data.playlist[0].sources[1].file);  
                })
        
        // })

        
        
  }, []);

  const ResetSession = () =>{
    console.log('Reset session clicked');
    const formData = new FormData();
        formData.append('cookie', props.login.cookie);
        formData.append('event_id', props.event.common.event.event_id_single);
        formData.append('agenda_id', props.route.params.meeting_details.id);
    Axios.post(`https://events.globaldata.com/api/user/simulive_reset_session/`, formData)
    .then((resetStatus)=>{
        console.log('Reset response',resetStatus.data);
        Axios.post(`https://events.globaldata.com/api/user/simulive_fetch_video_session_data`, formData)
        .then((response)=>{
          console.log('session status',response)
          props.navigation.goBack()
        })
    })
  }


  return (
    <View style={styles.container}>
      {/* <Text>jjjjjjjj</Text> */}
      <View  style={{ flex: 1, height: 400 }}>
          {/* <Text>hhhhhh</Text> */}
          {video?
          <Video 
          ref={(ref) => { player = ref }}
          // onLoad={() =>  player.seek(videoDurationTime)}
          source={{uri: video}}   // Can be a URL or a local file.
          controls={true} 
          hideShutterView={true}
          fullscreenAutorotate={true}
          fullscreen={true}
          style={styles.backgroundVideo}
          resizeMode={fullscreen?"cover":"contain"} 
          disableFocus={true}
          paused={paused}
          // progressUpdateInterval={1000} //calls onProgress after every 1 second
          // onSeek={( seek) => {console.log(seek)}}
          // seek={videoDurationTime}
           
          // onVideoSeek={( seek) => {console.log(seek)}}
          
           />
           
        //   <WebView
        //   source={{
        //     html:
        //       '<iframe width="100%" height=500 src="https://content.jwplatform.com/previews/UKe6gihR" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
        //   }}
        //   style={{ marginTop: 20 }}
        // />
        
        :<ActivityIndicator color="green" />}
         {/* <Feather
                  style={{ textAlign: "center", marginTop: 5 }}
                  name="maximize"
                  size={16}
                  color="black"
                /> */}
        {paused?<Text>Video Session has been completed</Text>:<View></View>}  

        <TouchableOpacity onPress={()=> setFullscreen(!fullscreen) } style={{  zIndex:99999, height:20, width:20, position:"absolute", bottom:fullscreen?"80%":"57%", right:"4%", backgroundColor:"black"  }} >
        <Feather
                  style={{ zIndex:99999,textAlign: "center", fontWeight:"bold" }}
                  name={fullscreen?"minimize":"maximize"}
                  size={17}
                  color="white"
                  
                />
        </TouchableOpacity>

      </View>

    
      {fullscreen?null:<View style={{ alignSelf: "center", marginTop: 30 }}>
     {speaker?<Button
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
          labelStyle={{ color: "#2F283D", fontSize: 15, fontWeight: "bold" }}
          mode="contained" 
          onPress={()=> ResetSession() }
        >
          Reset Video
        </Button>:null}
        <Button
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
          labelStyle={{ color: "#2F283D", fontSize: 15, fontWeight: "bold" }}
          mode="contained" 
          onPress={()=> props.navigation.goBack()}
        >
          Exit
        </Button>
      </View>}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:16
  },
  backgroundVideo: { 
    position:"absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0, 
  }
});

// export default AgendaVideo;

const mapStateToProps = (state) => {
  return {
    login: state.login,
    event: state.Event,
  };
};

export default connect(mapStateToProps)(AgendaRecordedVideo);