import React, { Component } from "react";
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
} from "react-native";
import { Switch } from "react-native-paper";
import {
  AttendeesAction,
  CompanyAction,
  ExhibitorAction,
  KeyStatisticsAction,
  LatestMembersAction,
  ProductsAction,
  profileAction,
  SpeakersAction,
  SponsorsAction,
} from "../redux/action/actions";

// import CheckBox from 'react-native-elements';
//import base64 from 'react-native-base64'
//import axios from 'axios';
import { connect } from "react-redux";

import { loginAction } from "../redux/action/actions";
import store from "../redux/store";
import { Keyboard } from "react-native";
import api_url from "../Config/Config";

export class SignInScreen extends React.Component {
  //api_url = `https://events.globaldata.com/api/user/generate_auth_cookie/`;
  //api_url = `https://events.globaldata.com/api/user/generate_auth_cookie`;

  state = {
    email: "",
    password: "",
    IsValidUser: false,
    ICAccessDetails: [],
    errorMsg: "",
    isLoading: false,
    emailFocus: true,
    isSelected: false,
    isSwitchOn: false,
  };

  constructor(props) {
    super(props);

    AsyncStorage.getItem("email").then((email) => {
      this.setState({
        email: email,
      });
    });
    AsyncStorage.getItem("password").then((password) => {
      this.setState({
        password: password,
      });
    });
  }

  componentDidMount() {
    //console.log("login")
    this.props.navigation.addListener("focus", () => {
      this.setState({
        isLoding: true,
        errorMsg: "",
      });
      AsyncStorage.getItem("email").then((email) => {
        this.setState({
          email: email,
        });
      });
      AsyncStorage.getItem("password").then((password) => {
        this.setState({
          password: password,
        });
      });
    });
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed " + viewId);
  };

  login = () => {
    this.setState({
      isLoading: true,
    });
    if (this.state.password == "") {
      this.setState({
        errorMsg: "Invalid Username Or Password",
        isLoading: false,
        emailFocus: true,
      });
    } else {
      // let username = base64.encode(this.state.email);
      // let password = base64.encode(this.state.password);
      let username = this.state.email;
      let password = this.state.password;
      this.props.loginAction(api_url.authCookie, username, password);
    }
  };

  componentWillReceiveProps(props) {
    //console.log("login props", props)
    // console.log(props.loginData);
    // debugger;
    console.log("signinscreen called");

    if (props.loginData.common.status === "ok") {
      Keyboard.dismiss();
      // const api_url = `https://ind-backend-events-website.pantheonsite.io/api/user/get_currentuserinfo/`;
      // let formData = new FormData();
      // formData.append('cookie',props.loginData.cookie);
      // axios
      //   .post(`${api_url}`, formData)
      //   .then(res =>{
      //     return dispatch({
      //       type: 'GET_PROFILE',
      //       payload: res.data
      //     })
      //   }
      //   )
      AsyncStorage.setItem("cookies", props.loginData.cookie);

      // store.dispatch(KeyStatisticsAction(props.loginData.cookie));
      // store.dispatch(SponsorsAction(props.loginData.cookie))
      // store.dispatch(profileAction(props.loginData.cookie));
      // store.dispatch(LatestMembersAction(props.loginData.cookie));
      // store.dispatch(ProductsAction(props.loginData.cookie));
      // store.dispatch(AttendeesAction(props.loginData.cookie));
      // store.dispatch(SpeakersAction(props.loginData.cookie));
      // store.dispatch(CompanyAction(props.loginData.cookie))
      // store.dispatch(ExhibitorAction(props.loginData.cookie))

      if (this.state.isSelected) {
        AsyncStorage.setItem("email", this.state.email);
        AsyncStorage.setItem("password", this.state.password);
      }

      AsyncStorage.setItem("event_id", "0000");
      this.setState({
        isLoading: false,
      });
      this.props.navigation.navigate("EventsHome");
      // this.props.navigation.navigate("Eventscreen");
    } else {
      this.setState({
        isLoading: false,
        errorMsg: "Invalid Username Or Password",
      });
    }
  }

  _onToggleSwitch = () =>
    this.setState((state) => ({ isSwitchOn: !state.isSwitchOn }));

  setRemember = () => {
    this.setState({
      isSelected: !this.state.isSelected,
    });
  };
  render() {
    const { isSwitchOn, isLoading } = this.state;
    return (
      <View style={styles.container}>
        {this.state.isLoading ? (
          <ActivityIndicator size="large" color="green" />
        ) : (
          <ImageBackground
            style={styles.back}
            source={require("../assets/banners/loginbanner.jpg")}
          >
            <View style={styles.container}>
              <Image
                style={styles.tinyLogo}
                source={require("../assets/logo_green_large.png")}
              />

              <Text
                style={{
                  color: "red",
                  fontWeight: "bold",
                  fontSize: 16,
                  padding: 10,
                }}
              >
                {this.state.errorMsg}
              </Text>
              <View style={styles.inputView}>
                <TextInput
                  // autoFocus={this.state.emailFocus}
                  style={styles.inputText}
                  placeholder="Email"
                  placeholderTextColor="#003f5c"
                  onChangeText={(text) => this.setState({ email: text })}
                  value={this.state.email}
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
                  secureTextEntry
                  style={styles.inputText}
                  placeholder="Password"
                  placeholderTextColor="#003f5c"
                  onChangeText={(text) => this.setState({ password: text })}
                  value={this.state.password}
                />
              </View>

              {/* <CheckBox
          uncheckedColor="white"
          checkedColor="green"
          value={this.state.isSelected}
          onChange={() => this.setRemember()}
        //  onChange={() => this.onChangeCheck()}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Remember Me</Text> */}
              <View style={styles.checkboxContainer}>
                <Switch
                  value={isSwitchOn}
                  trackColor={{ true: "#00dea5", false: "white" }}
                  ontrackColor="#00ff00"
                  onValueChange={this._onToggleSwitch}
                  onChange={() => this.setRemember()}
                  style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
                />
                <Text style={styles.label}>Remember Me</Text>
              </View>

              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => this.login()}
              >
                <Text style={styles.loginText}>
                  {isLoading ? (
                    <ActivityIndicator color="white" size="small" />
                  ) : (
                    "Login"
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    textAlign: "left",
  },
  checkbox: {
    alignSelf: "center",
    color: "white",
    padding: 10,
    borderWidth: 2,
    borderColor: "white",
  },
  label: {
    margin: 8,
    color: "white",
  },

  container: {
    flex: 1,
    // backgroundColor: '#00dea5',
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  tinyLogo: {
    width: 250,
    height: 49,
    resizeMode: "contain",
    marginBottom: 70,
    // resizeMode:'cover'
  },
  back: {
    //  flex:1,
    //  resizeMode:'stretch',
    //  width:null
    height: "100%",
    width: "100%",
    // resizeMode:'stretch'
  },
  inputView: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 25,
    height: 40,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "black",
  },
  forgot: {
    color: "white",
    fontSize: 11,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#00dea5",
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "#2f283d",
    //fontWeight:"bold"
  },
});

const mapPropsToState = (state) => ({
  loginData: state.login,
});

export default connect(mapPropsToState, { loginAction })(SignInScreen);
