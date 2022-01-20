import React, {   useEffect, useState, Component } from 'react';
import { View,ScrollView, ActivityIndicator,Dimensions } from 'react-native';
import {  OTSession, OTPublisher, OTSubscriber,OTSubscriberView  } from 'opentok-react-native';

import { TouchableOpacity ,TouchableHighlight} from 'react-native-gesture-handler'

// import Subscriber from './Subscriber';
// import Publisher from './Publisher';
import Axios from 'axios';
import { connect } from 'react-redux';

import FontAwesome from "react-native-vector-icons/FontAwesome"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Ionicons from "react-native-vector-icons/Ionicons"


let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

class VideoScreen extends Component{
 
  constructor(props){
    super(props);

      this.state = {
        navigation:props.navigation,
        apiKey:"",
        sessionId:"",
        token:"",
        isLoading:true,
        streamProperties: {},

        publishAudio:true,
        publishVideo:true,
        cameraPosition:'front' 
      }

      this.getToken();

  this.subscriberProperties = {
    subscribeToAudio: true,
    subscribeToVideo: true,
  };

  this.sessionEventHandlers = {
    streamCreated: event => {
      const streamProperties = {...this.state.streamProperties, [event.streamId]: {
        subscribeToAudio: true,
        subscribeToVideo: true,
        style: {
          width: 100,
          height: 100,
          flex:1,
          flexDirection:"row"
        },
      }};
      this.setState({ streamProperties });
    },
  };

  this.subscriberEventHandlers = {
    error: (error) => {
      console.log(`There was an error with the subscriber: ${error}`);
    },
  };

}

 
 
  getToken(){ 
   let formData = new FormData();
   formData.append('cookie', this.props.login.cookie);
   formData.append('token', this.props.route.params.token);
    Axios.post(`https://ind-backend-events-website.pantheonsite.io/api/user/launch_meeting`,formData)
    .then(res=>{
      
      this.setState({
        token:res.data.data.token,
        sessionId:res.data.data.session,
        apiKey:res.data.data.apiKey,
        isLoading:false
      })
 
    })

  }


  EndMeeting(){
    alert('Meeting ending'); 
    this.props.navigation.goBack(); 
}

publisherEventHandlers = {
  streamCreated: event => {
    console.log('Publisher stream created!', event);
  },
  streamDestroyed: event => {
    console.log('Publisher stream destroyed!', event);
  }
};
setAudioToggle(){
  this.setState({
    publishAudio:!this.state.publishAudio
  });
}
setVideoToggle(){
  this.setState({
    publishVideo:!this.state.publishVideo
  })
}
setCameraPosition(){
  this.setState({
    cameraPosition:this.state.cameraPosition==='front'?'back':'front'
  })
}


// subscriber stream manage
handleStreamPress(streamId){
  console.log(streamId)
  alert(streamId)
}

// Render prop function

renderSubscribers = (subscribers) => {
  return subscribers.map((streamId) => { console.log(streamId)
    return (
    <TouchableOpacity
      onPress={() => this.handleStreamPress(streamId)}
      key={streamId}
      style={{   
        marginLeft:10,
        padding:0,
        borderRadius:50,
        width:120 ,
   
        
      }}
    >
      <OTSubscriberView streamId={streamId} style={{
        height:120,
        width:120,
        borderRadius:50,
       
      }} />
    </TouchableOpacity>
  )}
  
  );
};


 
 render() {
   if(!this.state.isLoading){
     console.log('stream properties ')
     console.log(this.state.streamProperties)
   }
    return (this.state.isLoading?<ActivityIndicator size="large" color="green" />:
    <View style={{ flex: 1, flexDirection: 'row',position:"absolute" }}>
     
  <OTSession apiKey={this.state.apiKey} sessionId={this.state.sessionId} token={this.state.token} eventHandlers={this.sessionEventHandlers} >
  
    <View style={{borderColor:"yellow", borderWidth:6,width:"100%", zIndex:1000,flex:1,flexDirection:"row"}}>
    <ScrollView horizontal={true}>
      <OTSubscriber>
        {this.renderSubscribers}
      </OTSubscriber>
      </ScrollView> 
    </View>  
        
      {/* <Subscriber />  */}
      {/* <OTStreams> */}
      {/* <OTSubscriber key={1} 
          properties={this.subscriberProperties}
          eventHandlers={this.subscriberEventHandlers}
          style={{ width: 100, height: 100 }}
          streamProperties={this.state.streamProperties} 
        /> */}
{/* </OTStreams> */}
       {/* <Publisher navigation={this.state.navigation} /> */}


       <View style={{  width: deviceWidth,  height: deviceHeight,position:'absolute' }}> 
        <OTPublisher
          properties={{
                            publishAudio: this.state.publishAudio, 
                            publishVideo: this.state.publishVideo,
                            cameraPosition: this.state.cameraPosition
                          }}
          eventHandlers={this.publisherEventHandlers}
          style={{ width: deviceWidth,  height: deviceHeight
          
          }}
        />
         <View style={{ flexDirection:"row", justifyContent:"center", position: 'relative' ,zIndex:9999,bottom:250}}>
           <TouchableHighlight  onPress={()=> this.setAudioToggle()}>        
            <View style={{ height: 50, width: 50, borderRadius:40,alignSelf:'center', backgroundColor:"#fff"}}>
                <FontAwesome style={{alignSelf:'center',textAlignVertical: 'center',alignItems: 'center',marginTop:10}} name={ this.state.publishAudio ? 'microphone' : 'microphone-slash' } size={25} color={this.state.publishAudio ? '#2F283D':'#09BA90'} />
            </View>
            </TouchableHighlight>

            <TouchableOpacity onPress={()=> this.setVideoToggle()}>  
            <View style={{ height: 50, width: 50, borderRadius:40, backgroundColor:"#fff", marginLeft:30}}>
                <MaterialIcons style={{alignSelf:'center',textAlignVertical: 'center',alignItems: 'center',marginTop:10}} name={ this.state.publishVideo ? 'videocam' : 'videocam-off'} size={25} color={this.state.publishVideo ? '#2F283D':'#09BA90'}/>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.setCameraPosition()}>  
            <View style={{ height: 50, width: 50, borderRadius:40, backgroundColor:"#fff", marginLeft:30}}>
                <Ionicons style={{alignSelf:'center',textAlignVertical: 'center',alignItems: 'center',marginTop:10}} name={ this.state.cameraPosition === 'front' ? 'camera' : 'ios-camera-reverse-sharp'} size={25} color={this.state.cameraPosition==='front' ? '#2F283D':'#09BA90'}/>
            </View>
            </TouchableOpacity>

            <View style={{ height: 50, width: 50, borderRadius:40, backgroundColor:"#FF0000", marginLeft:30}}>
                <MaterialCommunityIcons style={{textAlign:"center", marginTop:12}} name="phone-hangup" size={20} color="#fff" onPress={()=> this.EndMeeting()} />
            </View>
           </View>

        {/* <Button name={ this.state.publishAudio ? 'mute' : 'unmute' }  onPress={()=> this.setAudioToggle()} />
        <Button  name={ this.state.publishVideo ? 'microphone-slash' : 'microphone'} onPress={()=> this.setVideoToggle()} />
        <Button title={this.state.cameraPosition === 'front'?'Front':'Back'} onPress={()=> this.setCameraPosition()} /> */}
        </View>

       
        
       </OTSession>
      
      </View>
    ); 

}

}
const mapStateToProps = state =>{
  return({
    login:state.login
  })
}

export default connect(mapStateToProps)(VideoScreen);

