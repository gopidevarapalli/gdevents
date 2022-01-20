import React, { useEffect, useState } from "react";
import {ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import CompanyProfileCard from "../components/CompanyProfileCard";
import Axios from "axios";
import api_url from "../Config/Config";
const data = require("../assets/data.json");

const MyCompanyProfile = (props) => {
 console.log("company profile props", props)
  state = {
    CompanyProfile: data.CompanyProfile,
  };
  const [CompanyProfile, setCompanyProfile] = useState(data.CompanyProfile);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const formData = new FormData();
    formData.append("cookie", props.login.cookie);
    formData.append("user_id", props.user_id);
    formData.append("event_id", props.event.common.event.event_id_single);

    Axios.post(`${api_url.currentUserInfo}`, formData).then((res) => {
      console.log("current userinfo", res.data)
      // console.log(res.data.companydata)
      setCompanyProfile(res.data.companydata);
      setisLoading(false);
    });
  }, [props.login.cookie]);

  return isLoading ? (
    <ActivityIndicator size="large" color="green" />
  ) : (
    <CompanyProfileCard CompanyProfile={CompanyProfile} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const mapStateToProps = (state) => {
  // console.log(state.MyMeetings)
  return {
    login: state.login,
    event: state.Event,
  };
};
export default connect(mapStateToProps)(MyCompanyProfile);
