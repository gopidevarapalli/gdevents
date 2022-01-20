import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Eventscard from "../components/EventsCards";

const EventScreen = () => {
  return <Eventscard />;
};

export default EventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
