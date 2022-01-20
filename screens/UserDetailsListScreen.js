import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import About from "./About";
import CompanyProfile from "./CompanyProfile";
import MySchedule from "./MySchedule";
import UserDetailsCard from "../components/UserDetailsCard";
import store from "../redux/store";
import Axios from "axios";
import api_url from "../Config/Config";
import { connect } from "react-redux";

const Tab = createMaterialTopTabNavigator();

const UserDetailsListScreen = (props) => {
  const [ProfileData, setProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("props", props);
    let formData = new FormData();
    formData.append("cookie", store.getState().login.cookie);
    formData.append("user_id", props.route.params.user_id);
    formData.append("event_id", props.event.common.event.event_id_single);

    Axios.post(`${api_url.userDetails}`, formData).then((res) => {
      console.log(res.data);
      setProfile([res.data.aboutuser]);
      setIsLoading(false);
    });
  }, [props.route.params.user_id]);

  return isLoading ? (
    <ActivityIndicator size="large" color="green" />
  ) : (
    <Tab.Navigator
      tabBarOptions={{
        scrollEnabled: true,
        indicatorStyle: { backgroundColor: "#1E1727" },
        labelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        style: { backgroundColor: "#80EED2" },
      }}
    >
      <Tab.Screen name="About">
        {() => (
          <UserDetailsCard
            user_id={props.route.params.user_id}
            type={props.route.params.type ? props.route.params.type : undefined}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Company Profile">
        {() => (
          <CompanyProfile
            CompanyProfile={ProfileData}
            user_id={props.route.params.user_id}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const mapStateToProps = (state) => {
  console.log("State", state);
  return {
    login: state.login,
    event: state.Event,
  };
};

export default connect(mapStateToProps)(UserDetailsListScreen);
//export default UserDetailsListScreen;
