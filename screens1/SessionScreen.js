import React, {   useEffect, useState, Component } from 'react';
import { View,ScrollView, ActivityIndicator,Dimensions,StyleSheet, Alert } from 'react-native';
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
import { Button } from 'react-native-share';
import api_url from '../Config/Config';


let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;
let landscapeHeight = 350; 

let streamIdList = [];

class SessionScreen extends Component{
 
  constructor(props){
    super(props);

      this.state = {
        orientation:'potrait',
        navigation:props.navigation,
        apiKey:"",
        sessionId:"",
        token:"",
        isLoading:true,
        streamProperties: {},

        publishAudio:true,
        publishVideo:true,
        cameraPosition:'front',
        bigScreenUser:"" ,
        subscribeSelf:false 
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
    // console.log(1111111111111111111111111111111111111111)
    // console.log(this.props.login.common.user.displayname)
    // alert(this.props.route.params.token)
   let formData = new FormData();
   formData.append('cookie', this.props.login.cookie);
   formData.append('token', this.props.route.params.token);
    if(this.props.route.params.type === 'agenda'){
        Axios.post(`${api_url.JoinAgenda}`,formData)
        .then(res=>{
          // console.log(res.data);
          if(res.data.error){
            Alert.alert('Warning!', res.data.error,[
              { text: 'OK', onPress: () => this.props.navigation.goBack() }
            ]);
          }
          this.setState({
            token:res.data.data.token,
            sessionId:res.data.data.session,
            apiKey:res.data.data.apiKey,
            isLoading:false
          })
    
        });
      
    }else{

      Axios.post(`${api_url.launchMeeting}`,formData)
      .then(res=>{
        // console.log(res.data);
        if(res.data.error){
          Alert.alert('Warning!', res.data.error,[
            { text: 'OK', onPress: () => this.props.navigation.goBack() }
          ]);
        }
        this.setState({
          token:res.data.data.token,
          sessionId:res.data.data.session,
          apiKey:res.data.data.apiKey,
          isLoading:false
        })
   
      })
   
    }
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
  // console.log(streamId);
  // this.setState({bigScreenUser:<OTSubscriberView streamId={streamId} style={styles.big} />})
  
  this.setState({bigScreenUser:streamId})
  
  // alert(streamId);
}

// Render prop function

renderSubscribers = (subscribers) => {
  // console.log(171)
  // console.log(subscribers)
  return  subscribers.map((streamId,i) => { 
    // console.log(streamId);
    streamIdList.push(streamId); 
  

    return (
    <TouchableOpacity
      onPress={() => this.handleStreamPress(streamId)}
      key={i}
      style={{    
        padding:0,  
        marginLeft:this.state.bigScreenUser ===''?1:0,
        height:this.state.bigScreenUser ===''?120:this.state.orientation == 'landscape'?400:deviceHeight,
        borderWidth:this.state.bigScreenUser ===''?2:0,   

        display:this.state.bigScreenUser ===''?'flex':(this.state.bigScreenUser !=='' && this.state.bigScreenUser==streamId)?'flex':'none'

        // borderWidth:this.state.bigScreenUser===streamId?0:2,
        // marginLeft:this.state.bigScreenUser===streamId?0:4,
        // marginTop:this.state.bigScreenUser===streamId?0:4
      }}
    >
      <OTSubscriberView onTop={this.state.bigScreenUser===streamId?true:false} streamId={streamId} 
      style={this.state.bigScreenUser===streamId?this.state.orientation == 'landscape'?styles.landscapeStyle:styles.big:{
        height:120,
        width:120 
      }
      
      } />
      
    </TouchableOpacity>
  ) 
});
 

}

componentDidUpdate(){
  // console.log('componet did update called')
  // console.log(streamIdList);
}

componentDidMount(){ 

  
  if(this.state.bigScreenUser=='' && this.props.route.params.speaker.length==0){   
    // if(streamIdList.length){
      this.setState({
        bigScreenUser:streamIdList[0]
      });   
    // }  
}


  Dimensions.addEventListener('change', ({window:{height,width}})=>{

    // console.log('Dimensions add event listener')

        if(width<height){

          // console.log('potrait mode')
          this.setState({
            orientation:'potrait'
          })
        }else{
          // console.log('landscape mode')
          this.setState({
            orientation:'landscape'
          })
        }

  })
}
 
  
   


 
 render() {
  //  alert(this.state.subscribeSelf)
   if(!this.state.isLoading){
    //  console.log('stream properties ')
    //  console.log(this.state.streamProperties)
   }
    return (this.state.isLoading?<ActivityIndicator size="large" color="green" />:
    <View style={{ flex: 1, flexDirection: 'row',position:"relative" }}>
     
      <OTSession apiKey={this.state.apiKey} sessionId={this.state.sessionId} token={this.state.token} eventHandlers={this.sessionEventHandlers} >
         
    <View style={{zIndex:1,flex:1,flexDirection:"row",height:this.state.bigScreenUser==''?120:deviceHeight,position:"absolute", marginTop:2}}>
    <ScrollView horizontal={true}>
      <OTSubscriber
      
      subscribeSelf={true}
      >
        {this.renderSubscribers}
      </OTSubscriber>
      </ScrollView> 
    </View>        
 

 {this.props.route.params.speaker.length?<View style={{  width: deviceWidth,  height: deviceHeight,position:'absolute' }}> 
         <OTPublisher 
          onPress={()=>{
            this.setState({
              bigScreenUser:''
            })
          }}
          properties={{
                            publishAudio: this.state.publishAudio, 
                            publishVideo: this.state.publishVideo,
                            cameraPosition: this.state.cameraPosition,
                            name:this.props.login.common.user.displayname
                      }}
          eventHandlers={this.publisherEventHandlers}
          style={styles.big}
        />
        
        <View style={{ flexDirection:"row", justifyContent:"center", position: 'absolute' ,zIndex:999,top:20,right:20}}> 
          
         {this.state.bigScreenUser !==""?
            <View style={{ height: 50, width: 50, borderRadius:40, backgroundColor:"#FF0000", marginRight:10}}>
                <Ionicons style={{textAlign:"center", marginTop:8}} name="md-close-circle" size={30} color="#fff" onPress={()=> this.setState({bigScreenUser:''})} />
            </View>:<View></View>}
        </View>
         <View style={{ flexDirection:"row", justifyContent:"center", position: 'absolute' ,zIndex:999,bottom:200,left:50}}>
           
            
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
        </View>:<View style={{  width: deviceWidth,  height: deviceHeight,position:'absolute' }}>
                    <View style={{ flexDirection:"row", justifyContent:"center", position: 'absolute' ,zIndex:999,top:20,right:this.state.orientation=='landscape'?-350:20}}> 
                      
                      {this.state.bigScreenUser !==""?
                        <View style={{ height: 50, width: 50, borderRadius:40, backgroundColor:"#FF0000", marginRight:10}}>
                            <Ionicons style={{textAlign:"center", marginTop:8}} name="md-close-circle" size={30} color="#fff" onPress={()=> this.setState({bigScreenUser:''})} />
                        </View>:<View></View>}
                    </View>
          
          </View>}

       
        
       </OTSession>
      
      </View>
    ); 

}

}

const styles = StyleSheet.create({
 
    big: {
      width: deviceWidth,  
      height: deviceHeight,
    },
    landscapeStyle:{
      width: deviceHeight,  
      height: deviceWidth, 

    },
    small:{
      height:120,
      width:120
    },
    smallPublisher:{
      height:120,
      width:120,
      zIndex:99
    }
  });

  
const mapStateToProps = state =>{
  return({
    login:state.login
  })
}

export default connect(mapStateToProps)(SessionScreen);

