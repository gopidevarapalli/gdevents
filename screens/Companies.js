import Axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  Button,
  StyleSheet,
  AsyncStorage,
} from "react-native";
import { connect, useDispatch } from "react-redux";
import CompaniesCard from "../components/CompaniesCard";
import api_url from "../Config/Config";
import { CompanyAction } from "../redux/action/actions";
// import store from '../redux/store';

// const data = require('../assets/people.json');

const Companies = (props) => {
  //console.log("companies props", props);
  const [CompanyData, setCompanyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // AsyncStorage.getItem('event_id')
    //           .then((event_id)=>{
    //   props.CompanyAction(props.login.cookie, event_id);
    //           });
    // if(props.companies.isLoading){
    //   AsyncStorage.getItem('event_id')
    //           .then((event_id)=>{
    //   props.CompanyAction(props.login.cookie, event_id);
    //           });
    // }else{

    //   setCompanyData(props.companies.isLoading?[]:props.companies.common.companies==null?[]:props.companies.common.companies);
    //   setIsLoading(false);
    // }

    if (isLoading) {
      // alert(event_id)
      let formData = new FormData();
      formData.append("cookie", props.login.cookie);
      formData.append("event_id", props.event.common.event.event_id_single);

      Axios.post(
        // `https://events.globaldata.com/api/user/get_companies/`,
        `${api_url.companies}`,
        formData
      ).then((res) => {
        // alert(props.login.cookie)
        // console.log('companies called')
        console.log("companies data", res.data);
        if (res.data.companies == null) {
          setCompanyData([]);
          setIsLoading(false);
        } else {
          setCompanyData(res.data.companies);
          setIsLoading(false);
        }
      });
    }
  }, [props.login.cookie, props.event.common.event.event_id_single]);

  return isLoading ? (
    <ActivityIndicator size="large" color="green" />
  ) : (
    <CompaniesCard Companies={CompanyData} />
  );
};

const stateToProps = (state) => {
  return {
    companies: state.Companies,
    login: state.login,
    event: state.Event,
  };
};

export default connect(stateToProps, { CompanyAction })(Companies);
