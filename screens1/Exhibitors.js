import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import ExhibitorsCard from '../components/ExhibitorsCard';

import {ExhibitorAction} from  '../redux/action/actions';

const data = require('../assets/people.json');

// console.log(data.speakers)

const Exhibitors = (props) => {

  if(props.exhibitors.isLoading){
    props.ExhibitorAction(props.login.cookie);

  }
  
    const [exhibitorsData, setExhibitorsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
      setExhibitorsData(props.exhibitors.isLoading?[]:props.exhibitors.common.exhibitor);
      if(!props.exhibitors.isLoading){

        setIsLoading(false);
      }
    },[props.exhibitors.isLoading])

    return (
      isLoading?<ActivityIndicator size="large" color="green" />:<ExhibitorsCard Exhibitors={exhibitorsData} />
    );
};

const mapStateToProps = state =>{
  return(
    {
      exhibitors: state.Exhibitors,
      login:state.login
    }
  )
}
export default connect(mapStateToProps,{ExhibitorAction})(Exhibitors);



