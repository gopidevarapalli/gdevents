import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Meeting from '../components/Meeting';

const MySchedule = () => {
    return (
  
      
      <Meeting />
      
    );
};

export default MySchedule;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
