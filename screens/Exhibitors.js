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
import ExhibitorsCard from "../components/ExhibitorsCard";
import api_url from "../Config/Config";

import { ExhibitorAction } from "../redux/action/actions";

const data = require("../assets/people.json");

// console.log(data.speakers)

const Exhibitors = (props) => {
  //console.log("exhibitor props", props);
  const [exhibitorsData, setExhibitorsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   if (props.exhibitors.isLoading) {
  //     props.ExhibitorAction(
  //       props.login.cookie,
  //       props.event.common.event.event_id_single
  //     );
  //   } else {
  //     setExhibitorsData(
  //       props.exhibitors.isLoading
  //         ? []
  //         : props.exhibitors.common.exhibitor == null
  //         ? []
  //         : props.exhibitors.common.exhibitor
  //     );

  //     setIsLoading(false);
  //   }
  // }, [props.exhibitors.isLoading]);

  useEffect(() => {
    if (isLoading) {
      const formData = new FormData();
      formData.append("cookie", props.login.cookie);

      formData.append("event_id", props.event.common.event.event_id_single);
      Axios.post(`${api_url.exhibitors}`, formData).then((res) => {
        console.log("exhibitors data", res.data.exhibitor);
        if (res.data.exhibitor == null) {
          setExhibitorsData([]);
          setIsLoading(false);
        } else {
          setExhibitorsData(res.data.exhibitor);
          setIsLoading(false);
        }
      });
    }
  }, [props.login.cookie, props.event.common.event.event_id_single]);

  return isLoading ? (
    <ActivityIndicator size="large" color="green" />
  ) : (
    <ExhibitorsCard Exhibitors={exhibitorsData} />
  );
};

const mapStateToProps = (state) => {
  return {
    exhibitors: state.Exhibitors,
    login: state.login,
    event: state.Event,
  };
};
export default connect(mapStateToProps, { ExhibitorAction })(Exhibitors);
