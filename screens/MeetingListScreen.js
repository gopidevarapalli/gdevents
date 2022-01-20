import React from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MySchedule from "./MySchedule";
import MeetingRequest from "./MeetingRequest";
import MeetingAvailability from "./MeetingAvailability";
import MeetingAvailabilityStatusUpdate from "./MeetingAvailabilityStatusUpdate";

const Tab = createMaterialTopTabNavigator();

const MeetingListScreen = (props) => {
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
      <Tab.Screen name="Schedule" component={MySchedule} />
      <Tab.Screen name="Request">
        {() => <MeetingRequest {...props} />}
      </Tab.Screen>
      <Tab.Screen name="Slot Availability" component={MeetingAvailability} />
      <Tab.Screen
        name="Slot Update"
        component={MeetingAvailabilityStatusUpdate}
      />
    </Tab.Navigator>
  );
};

export default MeetingListScreen;
