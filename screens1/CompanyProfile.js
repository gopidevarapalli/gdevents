import React, {useState} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import CompanyProfileCard from '../components/CompanyProfileCard';
const data = require('../assets/data.json');

const CompanyProfile = () => {
  state = { 
    
    CompanyProfile:data.CompanyProfile
  }
  const [CompanyProfile, setCompanyProfile] = useState(data.CompanyProfile);
    return (
      <CompanyProfileCard CompanyProfile={CompanyProfile}  />

     
    );
};

export default CompanyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
