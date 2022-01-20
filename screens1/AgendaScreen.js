import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';

import Agenda from '../components/Agenda';
import api_url from '../Config/Config';
import store from '../redux/store';

const data = require('../assets/data.json');


const AgendaScreen = () => {
  state = { 
    AgendaData:data.Agenda, 
  }
  const [agenda, setAgenda] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    const formData = new FormData();
    formData.append('cookie', store.getState().login.cookie);
    Axios.post(`${api_url.agendaList}`, formData)
    .then(res=>{
      setAgenda(res.data.agenda);
      setIsLoading(false)
    })

  },[])

  const [AgendaData, setAgendaData] = useState(data.Agenda);
    return (
       isLoading?<ActivityIndicator size="large" color="green" />:<Agenda AgendaData={agenda} /> 
    );
};

export default AgendaScreen;



