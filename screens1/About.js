import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
// import SpeakersCard from '../components/SpeakersCard'; 
import ProfileCard from '../components/ProfileCard'; 
import api_url from '../Config/Config';

const data = require('../assets/people.json');


const About = (props) => {

  const [profileData, setProfileData] = useState("");
  const [isLoading, setIsloading] = useState(true);


  useEffect(()=>{
    const formData = new FormData();
    formData.append('cookie', props.login.cookie);
    Axios.post(`${api_url.currentUserInfo}`, formData)
    .then(res=>{
      console.log(res.data.user)
      setProfileData(res.data.user);
      setIsloading(false);
      })

  }, [])


    return (
      
      isLoading?<ActivityIndicator size="large" color="green" />:<ProfileCard Profile ={profileData} />
    );
};

const mapStateToProps = state =>{
  return (
    {
      login:state.login
    }
  )
}

export default connect(mapStateToProps)(About)



