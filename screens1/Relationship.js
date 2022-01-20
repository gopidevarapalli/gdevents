import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import AttendeesCard from '../components/AttendeesCard';
import RelationshipScreen from '../components/RelationshipScreen';
import api_url from '../Config/Config';
import store from '../redux/store';

const data = require('../assets/people.json');


const Relationship = () => {

    const [relationshipData, setRelationshipData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        const formData = new FormData();
        formData.append('cookie', store.getState().login.cookie);
        Axios.post(`${api_url.myRelations}`, formData)
        .then(res=>{
            // alert(res.data.myrelationships.length)
            
            setRelationshipData(res.data.myrelationships);
            setIsLoading(false);
            
        })
    },[])
    return (isLoading?<ActivityIndicator size="large" color="green" />:<RelationshipScreen relationshipData={relationshipData}  /> 
  
    );
};

export default Relationship;



