import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ExistingVcard from "./ExistingVcard";
import CreateVcard from "./CreateVcard";

const Tab = createMaterialTopTabNavigator();

export default function VcardsListScreen() {
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
      <Tab.Screen name="Existing vCards" component={ExistingVcard} />
      <Tab.Screen name="Create vCard" component={CreateVcard} />

      {/* <Tab.Screen name="Companies" component={Companies} />
        <Tab.Screen name="Sponsors" component={Sponsors} />
        <Tab.Screen name="Exhibitors" component={Exhibitors} /> */}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
