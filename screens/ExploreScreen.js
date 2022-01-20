import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HelpScreen from "./HelpScreen";
import ContactUs from "./ContactUs";

const Tab = createMaterialTopTabNavigator();

const ExploreScreen = (props) => {
  useEffect(() => {
    console.log("pp", props)
    //console.log(props.login.cookie);
  },[])

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
      {/* <Tab.Screen name="Help Center" component={HelpScreen} /> */}
      <Tab.Screen name="Contact Us" component={ContactUs} />
    </Tab.Navigator>
  );
};
export default ExploreScreen;
