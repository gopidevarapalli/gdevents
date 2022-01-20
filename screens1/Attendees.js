import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import AttendeesCard from '../components/AttendeesCard';

import {AttendeesAction, GetUserInfoAction} from '../redux/action/actions';

const data = require('../assets/people.json');

import store from '../redux/store';



const Attendees = (props) => {


  const dispatch = useDispatch();


  props.AttendeesAction(props.login.cookie)

  const [ isLoading, setIsLoading] = useState(true);
  const [ attendeesData, setAttendeesData] = useState([]);

  useEffect(()=>{
    console.log('attendees use effect called')
    // dispatch({
    //   type:'GET_UserDetail',
    //   payload:[]
    // },{payload:[]});
    props.GetUserInfoAction(props.login.cookie, '');

    setAttendeesData(props.attendees.isLoading?[]:props.attendees.common.attendees);
    if(!props.attendees.isLoading){
      setIsLoading(false);

    }
  }, [props.attendees.isLoading])
    return (

      isLoading?<ActivityIndicator size="large" color="green" />:<AttendeesCard Attendees={attendeesData} />
  
    );
};

const mapStateToProps = state =>{
  return(
    { attendees: state.Attendees,
      login:state.login,
      
    }
  )
}
export default connect(mapStateToProps, {AttendeesAction,GetUserInfoAction })(Attendees);



