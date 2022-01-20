import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { connect } from "react-redux";
import AttendeesCard from "../components/AttendeesCard";

import { GetUserInfoAction } from "../redux/action/actions";

// const data = require('../assets/people.json');

// import store from '../redux/store';

const UserDetail = (props) => {
  props.GetUserInfoAction(props.login.cookie);

  const [isLoading, setIsLoading] = useState(true);
  const [attendeesData, setAttendeesData] = useState([]);

  useEffect(() => {
    setAttendeesData(
      props.attendees.isLoading ? [] : props.attendees.common.attendees
    );
    if (!props.attendees.isLoading) {
      setIsLoading(false);
    }
  }, [props.attendees.isLoading]);
  return isLoading ? (
    <Text>Loading attendees</Text>
  ) : (
    <AttendeesCard Attendees={attendeesData} />
  );
};

const mapStateToProps = (state) => {
  return {
    login: state.login,
    UserInfo: state.UserInfo,
  };
};

export default connect(mapStateToProps, { GetUserInfoAction })(UserDetail);
