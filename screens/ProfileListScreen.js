import React from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import About from "./About";
//import CompanyProfile from "./CompanyProfile";
import MySchedule from "./MySchedule";
import MyCompanyProfile from "./MyCompanyProfile";

const Tab = createMaterialTopTabNavigator();

const ProfileListScreen = ({ navigation }) => {
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
      <Tab.Screen name="About" component={About} />
      <Tab.Screen name="Company Profile" component={MyCompanyProfile} />
      <Tab.Screen name="My Schedule" component={MySchedule} />

      {/* <Tab.Screen name="Companies" component={Companies} />
      <Tab.Screen name="Sponsors" component={Sponsors} />
      <Tab.Screen name="Exhibitors" component={Exhibitors} /> */}
    </Tab.Navigator>
  );
};

export default ProfileListScreen;
