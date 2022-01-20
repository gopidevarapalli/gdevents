import React from "react";
// import { View, Text, Button, FlatList, StyleSheet } from "react-native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Attendees from "./Attendees";
import Speakers from "./Speakers";
// import Companies from "./Companies";
// import Sponsors from "./Sponsors";
// import Exhibitors from "./Exhibitors";
// import Products from "./Products";

const Tab = createMaterialTopTabNavigator();

const PeopleListScreen = ({ navigation }) => {
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
      <Tab.Screen name="Attendees" component={Attendees} />
      <Tab.Screen name="Speakers" component={Speakers} />
      {/* <Tab.Screen name="Companies" component={Companies} /> */}
      {/* <Tab.Screen name="Sponsors" component={Sponsors} /> */}
      {/* <Tab.Screen name="Exhibitors" component={Exhibitors} /> */}
      {/* <Tab.Screen name="Products" component={Products} /> */}
    </Tab.Navigator>
  );
};

export default PeopleListScreen;
