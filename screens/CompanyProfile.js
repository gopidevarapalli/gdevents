import Axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { connect } from "react-redux";
import CompanyProfileCard from "../components/CompanyProfileCard";
import api_url from "../Config/Config";
const data = require("../assets/data.json");

const CompanyProfile = (props) => {
  state = {
    CompanyProfile: data.CompanyProfile,
  };
  const [CompanyProfile, setCompanyProfile] = useState(data.CompanyProfile);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    console.log("propssss", props)
    console.log("company profile");
    const formData = new FormData();
    formData.append("cookie", props.login.cookie);
    formData.append("user_id", props.user_id);
    formData.append("event_id", props.event.common.event.event_id_single);

    Axios.post(`${api_url.userDetails}`, formData).then((res) => {
      //console.log("companyuuuuuuu", res.data);
      console.log("company", res.data);
      setCompanyProfile(res.data.aboutuser);
      setisLoading(false);
    });
  }, [props.login.cookie]);

  return isLoading ? (
    <ActivityIndicator size={30} color="green" />
  ) : (
    <CompanyProfileCard CompanyProfile={CompanyProfile} />
  );
};

const mapStateToProps = (state) => {
  // console.log(state.MyMeetings)
  return {
    login: state.login,
    event: state.Event,
  };
};
export default connect(mapStateToProps)(CompanyProfile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
