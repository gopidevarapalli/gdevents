import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { connect, useDispatch } from 'react-redux';
import SpeakersCard from '../components/SpeakersCard';

// const data = require('../assets/people.json');

import {SpeakersAction} from '../redux/action/actions';

import store from '../redux/store';



// console.log(data.speakers);




const Speakers = (props) => {

  const dispatch = useDispatch();

  
  if(props.speakers.isLoading){
    props.SpeakersAction(props.login.cookie); 
  }
  
  // dispatch(SpeakersAction('yoganath1265|1601460996|mk1CBGIzzEvOCrNzchHIMGsFbq73Pp0cwcOrhUdlkL2|57b93520b271935a4fae954d025fdc1c615ee087f0c0ef8ff7c8185e5238d978'))
  // alert(props.speakers.isLoading)
 


  const [isLoading, setIsLoading] = useState(true);
  const [speakersData, setSpeakersData] = useState([]);
  useEffect(()=>{
    
    // console.log(props.speakers.isLoading)
    setSpeakersData(props.speakers.common?props.speakers.common.speakers_list:[]);
    if(!props.speakers.isLoading){
      setIsLoading(false); 
    }
 

  }, [props.speakers.isLoading])

return ( isLoading?<ActivityIndicator size="large" color="green" />: <SpeakersCard Speakers={speakersData}/> 
    );
};

const mapStateToProps = state =>{
  return (
    {
      speakers:state.Speakers,
      login:state.login
    }
  )
}

export default connect(mapStateToProps,{SpeakersAction})(Speakers);



