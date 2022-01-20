import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import ProductsCard from '../components/ProductsCard';

import {ProductsAction} from '../redux/action/actions';

// const data = require('../assets/people.json');

// console.log(data.speakers)

const Products = (props) => {

  if(props.products.isLoading){
    props.ProductsAction(props.login.cookie);
  }
   
    const [ProductsData, setProductsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
      setProductsData(props.products.isLoading?[]:props.products.common.products);
      if(props.products.isLoading === false){
        setIsLoading(false); 
      }
    },[props.products.isLoading])


    return (
     isLoading?<ActivityIndicator size="large" color="green" />:<ProductsCard Products={ProductsData} />
    );
};

const mapStateToProps = state =>{
  return (
    {products:state.Products,
     login:state.login  
    }
  )
}

export default connect(mapStateToProps, {ProductsAction})(Products);



