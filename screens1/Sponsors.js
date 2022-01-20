import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import SponsorCard from '../components/SponsorCard'; 

import {SponsorsAction} from '../redux/action/actions';
 

// const data = require('../')

const Sponsors = (props) => {

  if(props.sponsors.isLoading){
    // console.log('sponsors called')
    props.SponsorsAction(props.login.cookie);
  }
  
  const [isLoading, setIsLoading] = useState(true);
const [sponsorsData, setSponsors] = useState([]);


  useEffect(()=>{

    setSponsors(props.sponsors.isLoading?[]:props.sponsors.common)
    if(props.sponsors.isLoading === false){
      console.log('sponsors 26 called')
      // console.log(props.sponsors.common)
      setIsLoading(false) 
    }
  },[props.sponsors.isLoading])


    return (
      isLoading?<ActivityIndicator size="large" color="green" />:<SponsorCard sponsorsData={sponsorsData} />
    );
};

const mapStateToProps = state =>{
  return (
    {sponsors: state.Sponsors,
      login: state.login
    }
  )
}

export default connect(mapStateToProps, {SponsorsAction})(Sponsors);



