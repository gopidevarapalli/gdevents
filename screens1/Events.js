import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Eventscard from '../components/EventsCards';
// import SpeakersCard from '../components/SpeakersCard'; 
//import ProfileCard from '../components/ProfileCard';

const data = require('../assets/people.json');


const Events = () => {
    return (
      
   <Eventscard />
    );
};

export default Events;



