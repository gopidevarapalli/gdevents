import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import { connect } from "react-redux";
import ProductsCard from "../components/ProductsCard";
import api_url from "../Config/Config";
import Axios from "axios";

import { ProductsAction } from "../redux/action/actions";

// const data = require('../assets/people.json');

// console.log(data.speakers)

const Products = (props) => {
  console.log("product props", props);
  const [ProductsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   if (props.products.isLoading) {
  //     props.ProductsAction(
  //       props.login.cookie,
  //       props.event.common.event.event_id_single
  //     );
  //   } else {
  //     setProductsData(
  //       props.products.isLoading
  //         ? []
  //         : props.products.common.products == null
  //         ? []
  //         : props.products.common.products
  //     );
  //     setIsLoading(false);
  //   }
  // }, [props.products.isLoading]);

  useEffect(() => {
    if (isLoading) {
      const formData = new FormData();
      formData.append("cookie", props.login.cookie);
      formData.append("event_id", props.event.common.event.event_id_single);
      Axios.post(`${api_url.productList}`, formData).then((res) => {
        console.log("products data", res.data.products);
        if (res.data.products == null) {
          setProductsData([]);
          setIsLoading(false);
        } else {
          setProductsData(res.data.products);
          setIsLoading(false);
        }
      });
    }
  }, [props.login.cookie, props.event.common.event.event_id_single]);

  return isLoading ? (
    <ActivityIndicator size="large" color="green" />
  ) : (
    <ProductsCard Products={ProductsData} />
  );
};

const mapStateToProps = (state) => {
  return { products: state.Products, login: state.login, event: state.Event };
};

export default connect(mapStateToProps, { ProductsAction })(Products);
