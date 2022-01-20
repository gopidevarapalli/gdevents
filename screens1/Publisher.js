import React, {  useState, useEffect,Component } from 'react';
import { View, Button ,Text, Dimensions, Image, ScrollView, ImageBackground} from 'react-native';
import { OTSession, OTPublisher, OTSubscriber } from 'opentok-react-native';
import { TouchableOpacity ,TouchableHighlight} from 'react-native-gesture-handler'
import Octicons from "react-native-vector-icons/Octicons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Ionicons from "react-native-vector-icons/Ionicons"


//import { TouchableOpacity } from 'react-native-gesture-handler';
let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;
// const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
class Publisher extends Component {
  
  state = {
    publishAudio:true,
    publishVideo:true,
    cameraPosition:'front'
  }
 
  constructor(props) {
    super(props);
     
    // console.log(props)
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
  render() {
    return (
      <View style={{  width: deviceWidth,  height: deviceHeight,position:'absolute' }}> 
        <OTPublisher
          properties={{
                            publishAudio: this.state.publishAudio, 
                            publishVideo: this.state.publishVideo,
                            cameraPosition: this.state.cameraPosition
                          }}
          eventHandlers={this.publisherEventHandlers}
          style={{ width: deviceWidth,  height: deviceHeight}}
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

    );
  }
}
export default  Publisher