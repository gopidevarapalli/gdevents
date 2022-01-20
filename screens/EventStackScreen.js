import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "./SplashScreen";
import SignInScreen from "./SignInScreen";
import Feed from "../components/Feed";
import EventHome from "./EventHome";
// import Agenda from '../components/Agenda';
import AgendaScreen from "./AgendaScreen";
//import SignUpScreen from './SignUpScreen';

const EventStack = createStackNavigator();

const EventStackScreen = ({ navigation }) => (
  <EventStack.Navigator headerMode="none">
    {/* <RootStack.Screen name="feed" component={Feed}/> */}
    <EventStack.Screen name="EventsHome" component={EventHome} />
    <EventStack.Screen name="Agenda" component={AgendaScreen} />

    {/* <RootStack.Screen name="SignInScreen" component={SignInScreen}/> */}
    {/* <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/> */}
  </EventStack.Navigator>
);

export default EventStackScreen;
