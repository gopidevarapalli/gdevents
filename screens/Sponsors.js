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
import SponsorCard from "../components/SponsorCard";
import api_url from "../Config/Config";

import { SponsorsAction } from "../redux/action/actions";

// const data = require('../')

const Sponsors = (props) => {
  //console.log("sponsor props", props);
  const [isLoading, setIsLoading] = useState(true);
  const [sponsorsData, setSponsors] = useState([]);

  useEffect(() => {
    // if (props.sponsors.isLoading) {
    //   // alert(props.event.common.event.event_id_single)
    //   props.SponsorsAction(
    //     props.login.cookie,
    //     props.event.common.event.event_id_single
    //   );
    // } else {
    //   console.log(props.login.cookie);
    //   console.log("sponsorsssssss", props.sponsors);
    //   setSponsors(props.sponsors.common.sponsors_list);
    //   setIsLoading(false);
    // }
    if (isLoading) {
      // alert(event_id)
      let formData = new FormData();
      formData.append("cookie", props.login.cookie);
      formData.append("event_id", props.event.common.event.event_id_single);

      Axios.post(
        //`https://events.globaldata.com/api/user/get_sponsors`,
        `${api_url.sponsorsList}`,
        formData
      ).then((res) => {
        // alert(props.login.cookie)
        // console.log('companies called')
        console.log("sponsors data", res.data);
        if (res.data.sponsors_list == null) {
          setSponsors([]);
          setIsLoading(false);
        } else {
          setSponsors(res.data.sponsors_list);
          setIsLoading(false);
        }
      });
    }
  }, [
    props.sponsors.isLoading,
    props.login.cookie,
    props.event.common.event.event_id_single,
  ]);

  // useEffect(()=>{

  //     // alert(event_id)
  //     let formData = new FormData();
  //     formData.append('cookie',props.login.cookie);
  //     formData.append('event_id', props.event.common.event.event_id_single);
  //       Axios.post(`https://events.globaldata.com/api/user/get_sponsors`, formData)
  //       .then(res=>{
  //         setSponsors(res.data);
  //         setIsLoading(false)
  //       });

  // },[props.login.cookie])

  return isLoading ? (
    <ActivityIndicator size="large" color="green" />
  ) : (
    // sponsorsData.length == 0?<View><Text>No Sponsors data</Text></View>:
    <SponsorCard
      sponsorsData={sponsorsData}
      login={props.login}
      event={props.event}
    />
  );
};

const mapStateToProps = (state) => {
  return { sponsors: state.Sponsors, login: state.login, event: state.Event };
};

export default connect(mapStateToProps, { SponsorsAction })(Sponsors);
