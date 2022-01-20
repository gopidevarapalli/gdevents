import React, { useEffect, useState } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { Avatar, Button, Title, Caption, Text } from "react-native-paper";

// import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// import Share from "react-native-share";

// import files from "../assets/filesBase64";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import api_url from "../Config/Config";
import { useDispatch, useSelector } from "react-redux";
import { GetRefreshAction } from "../redux/action/actions";
import Axios from "axios";

const ProfileCard = (props) => {
  console.log("About props", props);
  const [Profile, setProfile] = useState([props.Profile]);
  const navigation = useNavigation();
  const login = useSelector((state) => state.login);
  const event = useSelector((state) => state.Event);
  const dispatch = useDispatch();
  const refreshRequired = useSelector((state) => state.refreshRequired);

  useEffect(() => {
    const formData = new FormData();
    formData.append("cookie", login.cookie);
    formData.append("event_id", event.common.event.event_id_single);

    Axios.post(`${api_url.currentUserInfo}`, formData).then((res) => {
      console.log("About screen");
      console.log(res.data.user);
      setProfile([res.data.user]);
      // setIsloading(false);
      dispatch(GetRefreshAction(false));
    });
  }, [login.cookie, refreshRequired]);

  const editProfile = () => {
    console.log("edit click");
    navigation.navigate("editprofile", {
      title: "Edit",
      profiletitle: props.Profile.profile_title,
      firstname: props.Profile.first_name,
      lastname: props.Profile.last_name,
      description: props.Profile.description,
      email: props.Profile.billing_email,
      phone: props.Profile.billing_phone,
      mobile: props.Profile.mobile_number,
      jobtitle: props.Profile.jobtitle,
      addresstype: props.Profile.address_type,
      address1: props.Profile.billing_address_1,
      address2: props.Profile.billing_address_2,
      city: props.Profile.billing_city,
      state: props.Profile.billing_state,
      country: props.Profile.billing_country,
      zipcode: props.Profile.billing_postcode,
      fax: props.Profile.fax,
      facebook: props.Profile.facebook,
      twitter: props.Profile.twitter,
      linkedin: props.Profile.linkedin,
      timezone: props.Profile.timezone_set,
      avatar: `${api_url.live_url}` + props.Profile.avatar,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {Profile.map((profile, i) => (
          <View style={styles.userInfoSection} key={i}>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#2e293d",
                marginTop: 10,
                borderColor: "#999",
                borderWidth: 1,
                padding: 10,
                borderRadius: 8,
              }}
            >
              <Avatar.Image
                source={{
                  // uri: "https://events.globaldata.com/" + profile.avatar,
                  uri:
                    //"https://events.globaldata.com/" +
                    `${api_url.live_url}` + profile.avatar,
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
                  {profile.displayname}
                </Title>
                <Caption numberOfLines={1} style={styles.caption}>
                  {profile.jobtitle}
                </Caption>
                <Caption numberOfLines={1} style={styles.caption1}>
                  {profile.company}
                </Caption>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <View>
                <Text
                  style={{
                    //width: "17%",
                    //paddingLeft:5,
                    color: "#09BA90",
                    //backgroundColor:"black",
                    fontWeight: "bold",
                    fontSize: 18,
                    lineHeight: 24,
                    //borderColor: "#09BA90",
                    //borderBottomWidth: 2,
                  }}
                >
                  Name:
                </Text>
                <Text style={{ lineHeight: 24, fontSize: 15 }}>
                  {profile.displayname}
                </Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{
                    // width: "19%",
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
                <Text
                  style={{
                    lineHeight: 24,
                    fontSize: 15,
                    paddingTop: 5,
                    paddingBottom: 5,
                  }}
                >
                  {profile.description}
                </Text>
              </View>

              <View>
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
                  Email:
                </Text>
                <Text style={{ lineHeight: 24, fontSize: 15 }}>
                  {profile.billing_email}
                </Text>
              </View>

              <View style={{ paddingTop: 10 }}>
                <Text
                  style={{
                    //width: "24%",
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
                  Job Title:
                </Text>
                <Text style={{ lineHeight: 24, fontSize: 15 }}>
                  {profile.jobtitle}
                </Text>
              </View>

              <View style={{ paddingTop: 10 }}>
                <Text
                  style={{
                    // width: "23%",
                    //paddingLeft:5,
                    color: "#09BA90",
                    //backgroundColor:"black",
                    fontWeight: "bold",
                    fontSize: 18,
                    lineHeight: 24,
                    //borderColor: "#09BA90",
                    //borderBottomWidth: 2,
                  }}
                >
                  Address:
                </Text>
                <Text style={{ lineHeight: 24, fontSize: 15 }}>
                  {profile.billing_address_1}, {profile.billing_address_2},{" "}
                  {profile.billing_city}, {profile.billing_postcode}
                </Text>
              </View>

              <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                <Text
                  style={{
                    // width: "39%",
                    //backgroundColor:"black",
                    //paddingLeft:5,
                    color: "#09BA90",
                    fontWeight: "bold",
                    fontSize: 18,
                    lineHeight: 24,
                    //borderColor: "#09BA90",
                    //borderBottomWidth: 2,
                  }}
                >
                  Phone Number:
                </Text>
                <Text style={{ lineHeight: 24, fontSize: 15 }}>
                  {profile.billing_phone}
                </Text>
              </View>

              <View style={{ alignSelf: "center", marginTop: 20, marginBottom:20 }}>
                <Button
                  style={{
                    marginTop: 8,
                    marginBottom: 12,
                    width: 100,
                    borderRadius: 25,
                  }}
                  color="#00DEA5"
                  contentStyle={{ height: 44 }}
                  labelStyle={{
                    color: "#2F283D",
                    fontSize: 16,
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                  mode="contained"
                  onPress={() => editProfile()}
                >
                  Edit
                </Button>
              </View>
            </View>

            {/* <View style={[styles.userInfoSection, { width: "100%" }]}>
            <View style={styles.row}>
              <Icon name="map-marker-radius" color="#000" size={20} />
              <Text style={{ color: "#000", marginLeft: 20 }}>
                {profile.billing_address_1}, {profile.billing_address_2},{" "}
                {profile.billing_city}, {profile.billing_postcode}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="phone" color="#000" size={20} />
              <Text style={{ color: "#000", marginLeft: 20 }}>
                {profile.billing_phone}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="email" color="#000" size={20} />
              <Text style={{ color: "#000", marginLeft: 20 }}>
                {profile.billing_email}
              </Text>
            </View>
          </View> */}
            <View>
              {/* <Text style={{color:"#05CB9A", marginLeft: 20 , fontSize:18, fontWeight:'500', paddingBottom:5,}}>Profile</Text> */}
            </View>
            {/* <View style={styles.row}>
            <Text style={{ color: "#000", lineHeight: 21 }}>
              {profile.description}
            </Text>
          </View> */}
          </View>
        ))}

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
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    width: "98%",
    alignSelf: "center",
    justifyContent: "center",
    marginVertical: 10,
    flexDirection: "row",
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    borderWidth: 0.2,
    borderRadius: 8,
  },
  userInfoSection: {
    // paddingTop:10,
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
    color: "#fff",
  },
  caption1: {
    fontSize: 15,
    lineHeight: 18,
    fontWeight: "600",
    color: "#fff",
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
