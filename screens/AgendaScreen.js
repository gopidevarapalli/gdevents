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
import { connect } from "react-redux";

import Agenda from "../components/Agenda";
import api_url from "../Config/Config";
import store from "../redux/store";

const data = require("../assets/data.json");

const AgendaScreen = (props) => {
  console.log("agenda screen props", props);
  state = {
    AgendaData: data.Agenda,
  };
  const [agenda, setAgenda] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // AsyncStorage.getItem('event_id')
    // .then((event_id)=>{
    // alert(event_id)
    const formData = new FormData();
    // formData.append('cookie', store.getState().login.cookie);
    // formData.append('event_id', props.event.common.event.event_id_single)
    formData.append("cookie", props.login.cookie);
    formData.append("event_id", props.event.common.event.event_id_single);
    Axios.post(
      // `https://ind-ew-events-website.pantheonsite.io/api/user/get_agenda_v1`,
      //`https://events.globaldata.com/api/user/new_get_agenda`,
      `${api_url.agendaListNew}`,
      formData
    ).then((res) => {
      console.log("agenda screen res", res);
      setAgenda([res.data.agenda]);
      setIsLoading(false);
      //console.log("length", res.data.agenda.length);
    });
    // })
  }, [props.login.cookie, props.event.common.event.event_id_single]);

  const [AgendaData, setAgendaData] = useState(data.Agenda);
  return isLoading ? (
    <ActivityIndicator size="large" color="green" />
  ) : (
    <Agenda AgendaData={agenda} />
  );
};

const mapStateToProps = (state) => {
  return {
    login: state.login,
    event: state.Event,
  };
};

export default connect(mapStateToProps)(AgendaScreen);
