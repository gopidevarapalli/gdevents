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
import { connect, useDispatch } from "react-redux";
import AttendeesCard from "../components/AttendeesCard";
import api_url from "../Config/Config";

import { AttendeesAction, GetUserInfoAction } from "../redux/action/actions";

const data = require("../assets/people.json");

import store from "../redux/store";

const Attendees = (props) => {
  console.log("Attendees props", props);
  // const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [attendeesData, setAttendeesData] = useState([]);

  useEffect(() => {
    console.log(props.event.common.event);
    // console.log('attendees use effect called')
    // dispatch({
    //   type:'GET_UserDetail',
    //   payload:[]
    // },{payload:[]});

    // alert(props.attendees.isLoading)
    if (props.attendees.isLoading) {
      props.AttendeesAction(
        props.login.cookie,
        props.event.common.event.event_id_single
      );
    } else {
      setAttendeesData(
        props.attendees.isLoading
          ? []
          : props.attendees.common.attendees == null
          ? []
          : props.attendees.common.attendees
      );
      setIsLoading(false);
    }

    //   if(isLoading){

    // let formData = new FormData();
    // formData.append('cookie',props.login.cookie);

    //     AsyncStorage.getItem('event_id')
    //     .then((event_id)=>{
    //       // alert(event_id)
    //         formData.append('event_id',event_id);

    //           Axios
    //           .post(`${api_url.attendeesList}`, formData)
    //           .then(res =>{
    //             console.log(res.data)
    //             setAttendeesData(res.data.attendees);
    //             setIsLoading(false)
    //           })
    //     })
    //   }
  }, [props.attendees.isLoading]);

  return isLoading ? (
    <ActivityIndicator size="large" color="green" />
  ) : (
    <AttendeesCard Attendees={attendeesData} />
  );
};

const mapStateToProps = (state) => {
  return { attendees: state.Attendees, login: state.login, event: state.Event };
};
export default connect(mapStateToProps, { AttendeesAction, GetUserInfoAction })(
  Attendees
);
