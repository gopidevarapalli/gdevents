import Axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import AttendeesCard from "../components/AttendeesCard";
import RelationshipScreen from "../components/RelationshipScreen";
import api_url from "../Config/Config";
import store from "../redux/store";

// const data = require('../assets/people.json');

const Relationship = (props) => {
  const [relationshipData, setRelationshipData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(props.login.cookie);
    console.log(props.event.common.event.event_id_single);
    const formData = new FormData();
    formData.append("cookie", props.login.cookie);
    formData.append("event_id", props.event.common.event.event_id_single);
    Axios.post(`${api_url.myRelations}`, formData).then((res) => {
      console.log("Relationship.js", res);
      console.log(res.data);
      if (res.data.myrelationships == null) {
        setRelationshipData([]);
        setIsLoading(false);
      } else {
        setRelationshipData(res.data.myrelationships);
        setIsLoading(false);
      }
    });
  }, []);
  return isLoading ? (
    <ActivityIndicator size="large" color="green" />
  ) : relationshipData.length > 0 ? (
    <RelationshipScreen relationshipData={relationshipData} />
  ) : (
    <View style={{ flex: 1, textAlign: "center", textAlignVertical: "center" }}>
      <Text
        style={{ flex: 1, textAlign: "center", textAlignVertical: "center" }}
      >
        No Data Available
      </Text>
    </View>
  );
};

const mapStateToProps = (state) => {
  // console.log(state.MyMeetings)
  return {
    login: state.login,
    event: state.Event,
  };
};
export default connect(mapStateToProps)(Relationship);
