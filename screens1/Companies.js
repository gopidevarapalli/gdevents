import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import CompaniesCard from '../components/CompaniesCard';
import { CompanyAction } from '../redux/action/actions';
// import store from '../redux/store';

// const data = require('../assets/people.json');

const Companies = (props) => {

  if(props.companies.isLoading){
    props.CompanyAction(props.login.cookie);
 
  }
    


  const [CompanyData, setCompanyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    setCompanyData(props.companies.isLoading?[]:props.companies.common.companies);
    if(!props.companies.isLoading){
      setIsLoading(false);

    }

  }, [props.companies.isLoading])

    return (
      isLoading?<Text>Loading the data</Text>:<CompaniesCard Companies={CompanyData} />
    );
};

const stateToProps = state =>{
  return(
    {
      companies:state.Companies,
      login:state.login
    }
  )
}

export default connect(stateToProps,{CompanyAction})(Companies);



