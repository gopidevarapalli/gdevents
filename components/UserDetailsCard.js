import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Image,
  Alert,
  Dimensions,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import HTML from "react-native-render-html";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

import { connect, useDispatch } from "react-redux";

import IonIcon from "react-native-vector-icons/Ionicons";

// import {GetUserInfoAction} from '../redux/action/actions';
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import store from "../redux/store";
import Axios from "axios";
import api_url from "../Config/Config";
import { GetRefreshAction } from "../redux/action/actions";

const UserDetailsCard = (props) => {
  //console.log("props", props);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [Profile, setProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookmarkLoad, setBookmarkLoad] = useState(false);

  // if(isLoading){
  //   props.GetUserInfoAction(props.login.cookie, props.route.params.user_id);
  // }

  console.log("user", props);

  useEffect(() => {
    let formData = new FormData();
    formData.append("cookie", props.login.cookie);
    formData.append("user_id", props.user_id);
    formData.append("event_id", props.event.common.event.event_id_single);

    axios.post(`${api_url.userDetails}`, formData).then((res) => {
      // console.log(res.data)
      console.log(res.data);
      setProfile([res.data.aboutuser]);
      setIsLoading(false);
    });
  }, [props.user_id]);

  const bookmark = (company) => {
    console.log("props type", props.type);
    const formData = new FormData();
    formData.append("cookie", store.getState().login.cookie);
    formData.append("bookmarktype", props.type ? props.type : "attendees");
    formData.append("status", company.user_bookmark_status ? 0 : 1);
    formData.append("title", company.firstname + " " + company.lastname);
    formData.append("id", props.user_id);
    formData.append("event_id", props.event.common.event.event_id_single);
    // console.log(company)

    console.log(`${api_url.bookmark}`);
    console.log("cookie", store.getState().login.cookie);
    console.log("bookmarktype", props.type ? props.type : "attendees");
    console.log("status", company.user_bookmark_status ? 0 : 1);
    console.log("title", company.firstname + " " + company.lastname);
    console.log("id", props.user_id);
    console.log("event_id", props.event.common.event.event_id_single);

    Axios.post(`${api_url.bookmark}`, formData).then((res) => {
      console.log(res.data);
      if (res.data.status === "ok") {
        Alert.alert("Success", res.data.message);
        setBookmarkLoad(true);
        // setisLoading(true)
        formData.append("user_id", props.user_id);

        Axios.post(`${api_url.userDetails}`, formData).then((res) => {
          console.log("after bookmark");
          console.log(res.data);
          setProfile([res.data.aboutuser]);
          dispatch(GetRefreshAction(true));
          // setIsLoading(false);
          setBookmarkLoad(false);
        });
      }
      if (res.data.error) {
        Alert.alert("Success", res.data.error);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator color="green" size="large" />
      ) : (
        Profile.map((profile, i) => (
          <ScrollView key={i}>
            <View
              style={[
                styles.userInfoSection,
                { marginTop: 30, marginBottom: 20 },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  height: 90,
                  backgroundColor: "#2e293d",
                  // marginTop: 10,
                  //borderColor: "#999",
                  //borderWidth: 1,
                  padding: 10,
                  borderRadius: 8,
                }}
              >
                <Avatar.Image
                  source={{
                    uri: profile.profilepic,
                  }}
                  size={70}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Title
                    numberOfLines={1}
                    style={[
                      styles.title,
                      {
                        color: "#fff",
                        marginTop: -5,
                        marginBottom: 5,
                      },
                    ]}
                  >
                    {profile.firstname} {profile.lastname}
                  </Title>
                  <Caption numberOfLines={1} style={styles.caption}>
                    {profile.jobtitle}
                  </Caption>
                  <Caption numberOfLines={1} style={styles.caption1}>
                    {profile.companyname}
                  </Caption>
                </View>
              </View>

              <View style={[styles.userInfoSection, { width: "100%" }]}>
                <Text
                  style={{
                    //width: "23%",
                    //paddingLeft:5,
                    //backgroundColor:"black",
                    color: "#09BA90",
                    fontWeight: "bold",
                    fontSize: 18,
                    lineHeight: 24,
                    //borderColor: "#09BA90",
                    //borderBottomWidth: 2,
                  }}
                >
                  Address:
                </Text>
                <View style={[styles.row, { paddingTop: 5, paddingBottom: 5 }]}>
                  {/* <Icon name="map-marker-radius" color="#000" size={20} /> */}
                  <Text style={{ fontSize: 15, color: "#444" }}>
                    {profile.billing_address_1}, {profile.billing_address_2},{" "}
                    {profile.billing_city}, {profile.billing_postcode}
                  </Text>
                </View>
                {profile.phone ? (
                  <View style={styles.row}>
                    <Text
                      style={{
                        //width: "16%",
                        //paddingLeft:5,
                        //backgroundColor:"black",
                        color: "#09BA90",
                        fontWeight: "bold",
                        fontSize: 18,
                        lineHeight: 24,
                        //borderColor: "#09BA90",
                        //borderBottomWidth: 2,
                      }}
                    >
                      Phone:
                    </Text>
                    {/* <Icon name="phone" color="#000" size={20} /> */}
                    <Text
                      style={{ color: "#444", paddingTop: 5, paddingBottom: 5 }}
                    >
                      {profile.phone ? profile.phone : ""}
                    </Text>
                  </View>
                ) : (
                  <View></View>
                )}
                {/* <Text
                  style={{ 
                    color: "#09BA90",
                    fontWeight: "bold",
                    fontSize: 18,
                    lineHeight: 24, 
                  }}
                >
                  Email:
                </Text>
                <View style={[styles.row, { paddingTop: 5, paddingBottom: 5 }]}> 
                  <Text style={{ color: "#000" }}>{profile.email}</Text>
                </View> */}
              </View>
              <View>
                {/* <Text style={{color:"#05CB9A", marginLeft: 20 , fontSize:18, fontWeight:'500', paddingBottom:5,}}>Profile</Text> */}
              </View>
              <Text
                style={{
                  //width: "19%",
                  //paddingLeft:5,
                  //backgroundColor:"black",
                  color: "#09BA90",
                  fontWeight: "bold",
                  fontSize: 18,
                  lineHeight: 24,
                  //borderColor: "#09BA90",
                  //borderBottomWidth: 2,
                }}
              >
                Profile:
              </Text>
              <View style={[styles.row, { paddingTop: 5, paddingBottom: 5 }]}>
                <HTML
                  tagsStyles={{
                    p: {
                      lineHeight: 22,
                      color: "#444",
                      fontSize: 15,
                      marginBottom: 10,
                    },
                  }}
                  html={"<p>" + profile.description + "</p>"}
                  imagesMaxWidth={Dimensions.get("window").width}
                />
              </View>

              <View
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "row",
                  //padding: 15,
                  //marginLeft: 40,
                  justifyContent: "space-around",
                }}
              >
                <TouchableOpacity
                  style={{
                    // width: 50,
                    // marginRight: 50,
                    width: 53,
                    height: 53,
                    borderRadius: 30,
                    padding: 5,
                    backgroundColor: "#f5f5f5",
                    //  shadowOpacity: 0.25,
                    //  shadowRadius: 3.84,
                    //  shadowColor: "#000",
                    //  borderColor:"#ccc",
                    // shadowOffset: {
                    //   width: 0,
                    //   height: 2,
                    // },
                    elevation: 5,
                    marginBottom: 10,
                    //marginRight: 50,
                  }}
                  onPress={() => bookmark(profile)}
                >
                  <View>
                    {bookmarkLoad ? (
                      <ActivityIndicator size="small" color="green" />
                    ) : (
                      <IonIcon
                        style={{ alignSelf: "center", marginTop: 8 }}
                        name={
                          profile.user_bookmark_status
                            ? "bookmark"
                            : "bookmark-outline"
                        }
                        size={25}
                        color="#2f283d"
                      />
                    )}
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    //marginRight: 50,
                    width: 53,
                    height: 53,
                    borderRadius: 30,
                    padding: 5,
                    backgroundColor: "#f5f5f5",
                    elevation: 5,
                  }}
                  onPress={() =>
                    navigation.navigate("meetinglist", {
                      screen: "Request",
                      id: profile.id,
                      name: `${profile.firstname} ${profile.lastname}`,
                    })
                  }
                >
                  <AntDesign
                    style={{ alignSelf: "center", marginTop: 8, marginLeft: 3 }}
                    name="videocamera"
                    size={24}
                    color="#2f283d"
                  />
                </TouchableOpacity>

                {/* <TouchableOpacity
                  disabled={true}
                  style={{
                    //marginRight: 50,
                    width: 53,
                    height: 53,
                    borderRadius: 30,
                    padding: 5,
                    backgroundColor: "#f5f5f5",
                    elevation: 5,
                  }}
                  onPress={() =>
                    navigation.navigate("messagelist", {
                      screen: "New Message",
                      params: {
                        id: profile.id,
                        name: `${profile.firstname} ${profile.lastname}`,
                      },
                    })
                  }
                >
                  <AntDesign
                    style={{ alignSelf: "center", marginTop: 8 }}
                    name="mail"
                    size={25}
                    color="#2f283d"
                  />
                </TouchableOpacity> */}
              </View>
            </View>
          </ScrollView>
        ))
      )}

      {/* <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>₹140.50</Title>
            <Caption>Wallet</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>12</Title>
            <Caption>Orders</Caption>
          </View>
      </View> */}
    </SafeAreaView>
  );
};

// export default ProfileCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    // paddingTop:10,
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    marginTop: 10,
    width: "90%",
    alignSelf: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  caption: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  caption1: {
    color: "#fff",
    fontSize: 15,
    lineHeight: 18,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#000",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});

const mapStateToProps = (state) => {
  return {
    login: state.login,
    event: state.Event,
  };
};

export default connect(mapStateToProps)(UserDetailsCard);
