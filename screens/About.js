import Axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
// import SpeakersCard from '../components/SpeakersCard';
import ProfileCard from "../components/ProfileCard";
import api_url from "../Config/Config";
import { GetRefreshAction } from "../redux/action/actions";

const data = require("../assets/people.json");

const About = (props) => {
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState("");
  const [isLoading, setIsloading] = useState(true);

  const refreshRequired = useSelector((state) => state.refreshRequired);

  useEffect(() => {
    const formData = new FormData();
    formData.append("cookie", props.login.cookie);
    formData.append("event_id", props.event.common.event.event_id_single);

    Axios.post(`${api_url.currentUserInfo}`, formData).then((res) => {
      console.log("About screen");
      console.log(res.data.user);
      setProfileData(res.data.user);
      setIsloading(false);
      dispatch(GetRefreshAction(false));
    });
  }, [props.login.cookie, refreshRequired]);

  return isLoading ? (
    <ActivityIndicator size="large" color="green" />
  ) : (
    <ProfileCard Profile={profileData} />
  );
};

const mapStateToProps = (state) => {
  return {
    login: state.login,
    event: state.Event,
  };
};

export default connect(mapStateToProps)(About);
