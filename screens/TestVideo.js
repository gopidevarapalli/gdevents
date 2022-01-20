import React, { Component } from 'react';
// import { StyleSheet, Text, View, Image,TextInput, TouchableOpacity } from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  CheckBox, 
  Dimensions,
  PermissionsAndroid
} from 'react-native';
import { Switch } from 'react-native-paper';
import { AttendeesAction, CompanyAction, ExhibitorAction, KeyStatisticsAction, LatestMembersAction, ProductsAction, profileAction, SpeakersAction, SponsorsAction } from '../redux/action/actions';

import HTML from 'react-native-render-html';

// import CheckBox from 'react-native-elements';
//import base64 from 'react-native-base64'
//import axios from 'axios';
import { connect } from 'react-redux';

import { loginAction } from '../redux/action/actions';
import store from '../redux/store';
import { WebView } from 'react-native-webview';

// const granted = PermissionsAndroid.requestMultiple([
//   PermissionsAndroid.PERMISSIONS.CAMERA,
//   PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//   PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
// ]);

export class TestVideo extends React.Component {
  
  api_url = `https://events.globaldata.com/api/user/generate_auth_cookie/`
  state = {
    email: '',
    password: '',
    IsValidUser:false,
    ICAccessDetails:[],
    errorMsg:'',
    isLoading:false,
    emailFocus:true,
    isSelected:false,
    isSwitchOn: false,
  }

  cameraPermission = async () => {

    let granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Camera Permission",
        message:
          "App needs access to your camera " +
          "so others can see you.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }
}
cameraPermission = async () => {

  let granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA,
    {
      title: "Camera Permission",
      message:
        "App needs access to your camera " +
        "so others can see you.",
      buttonNeutral: "Ask Me Later",
      buttonNegative: "Cancel",
      buttonPositive: "OK"
    }
  );
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    console.log("You can use the camera");
  } else {
    console.log("Camera permission denied");
  }
}

  

// micPermission = async () => {
//     let granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//       {
//         title: "Audio Permission",
//         message:
//           "App needs access to your audio / microphone",
//         buttonNeutral: "Ask Me Later",
//         buttonNegative: "Cancel",
//         buttonPositive: "OK"
//       }
//     );

//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log("You can use the Microphone");
//     } else {
//       console.log("Microphone permission denied");
//     }    
// }

micPermission = async () => {
  let granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    {
      title: "Audio Permission",
      message:
        "App needs access to your audio / microphone",
      buttonNeutral: "Ask Me Later",
      buttonNegative: "Cancel",
      buttonPositive: "OK"
    }
  );

  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    console.log("You can use the Microphone");
  } else {
    console.log("Microphone permission denied");
  }    
}
 

    componentDidMount(){
      this.cameraPermission();
      this.micPermission();
    }
  
  
  render(){
    const { isSwitchOn, isLoading } = this.state;
    return (
      <View style={styles.container}>
        <WebView 
        style={{ height:400,width:400}}
        originWhitelist={['*']}
        allowsInlineMediaPlayback
        bounces={true} 
        startInLoadingState
        scalesPageToFit
        javaScriptEnabled={true}
        source={{ uri: `https://gopid.daily.co/privatemeet?t=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyIjoicHJpdmF0ZW1lZXQiLCJkIjoiODViMzdlYjQtM2RhYi00NTVmLWI1MjEtZTdmYmNhMWVjYjk4IiwiaWF0IjoxNjA3NTc0ODc2fQ.G8j6IXVMqA3rAXSF2pjYE6uQFRIpE5R5xHsPVX53xW0` }} />
      </View>
      );
  }
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    textAlign:'left'
   
  },
  checkbox: {
    alignSelf: "center",
    color:"white",
    padding:10,
    borderWidth:2,
    borderColor:"white"
  },
  label: {
    margin: 8,
    color:"white"
  },

  container: {
    flex: 1,
  //  backgroundColor: '#00dea5',
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40,
   
  
  },
  tinyLogo:{
    width:250,
    height:49,
    resizeMode:'contain',
    marginBottom:70
   // resizeMode:'cover'
  },
  back:{
  //  flex:1,
  //  resizeMode:'stretch',
  //  width:null
  height:"100%",
     width:"100%"
    // resizeMode:'stretch'
    
  },
  inputView:{
    width:"80%",
    backgroundColor:"#fff",
    borderRadius:25,
    height:40,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"black"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#00dea5",
    borderRadius:25,
    height:40,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"#2f283d"
  }
});


const mapPropsToState = (state) =>({
  loginData:state.login
})

export default connect(mapPropsToState, {loginAction})(TestVideo);