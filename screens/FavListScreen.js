import React, { useEffect } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Attendees from "./Attendees";
import Speakers from "./Speakers";
import Companies from "./Companies";
import Sponsors from "./Sponsors";
import Exhibitors from "./Exhibitors";
import MyFavouritesCard from "../components/MyFavouritesCard";
import AttendeesCardFav from "../components/AttendeesCardFav";
import SpeakersCardFav from "../components/SpeakersCardFav";
import CompanyCardFav from "../components/CompanyCardFav";
import SponsorCardFav from "../components/SponsorCardFav";
import ExhibitorsFav from "../components/ExhibitorsFav";
import ProductsFav from "../components/ProductsFav";

const Tab = createMaterialTopTabNavigator();

const FavListScreen = ({ navigation }) => {
  // useEffect(()=>{
  //   const formData = new FormData();
  //   formData.append('cookie', store.getState().login.cookie);
  //   formData.append('user_id',store.getState().login.common.user.id)
  //   Axios.post(`https://ind-backend-events-website.pantheonsite.io/api/user/get_myfavorites`,formData)
  //   .then(res=>{
  //     // console.log(res.data.all)
  //     setFavourites(res.data.all);
  //     setIsLoading(false)
  //   })

  // },[]);
  return (
    <Tab.Navigator
      tabBarOptions={{
        scrollEnabled: true,
        indicatorStyle: { backgroundColor: "#1E1727" },
        labelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        style: { backgroundColor: "#80EED2" },
      }}
    >
      <Tab.Screen name="All" component={MyFavouritesCard} />
      <Tab.Screen name="Attendees" component={AttendeesCardFav} />
      <Tab.Screen name="Speakers" component={SpeakersCardFav} />
      {/* <Tab.Screen name="Companies" component={CompanyCardFav} /> */}
      <Tab.Screen name="Sponsors" component={SponsorCardFav} />
      {/* <Tab.Screen name="Exhibitors" component={ExhibitorsFav} />
      <Tab.Screen name="Products" component={ProductsFav} /> */}
      {/* 
      <Tab.Screen name="Companies" component={Companies} /> */}
      {/* <Tab.Screen name="Sponsors" component={Sponsors} /> */}
      {/* <Tab.Screen name="Exhibitors" component={Exhibitors} /> */}
    </Tab.Navigator>
  );
};

export default FavListScreen;
