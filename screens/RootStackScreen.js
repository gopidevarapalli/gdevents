import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "./SplashScreen";
import SignInScreen from "./SignInScreen";
import Feed from "../components/Feed";
import EventHome from "./EventHome";
import { TestVideo } from "./TestVideo";
//import SignUpScreen from './SignUpScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => (
  <RootStack.Navigator headerMode="none">
    {/* <RootStack.Screen name="feed" component={Feed}/> */}
    {/* <RootStack.Screen name="TestVideo" component={TestVideo} /> */}
    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
    <RootStack.Screen name="SignInScreen" component={SignInScreen} />
    <RootStack.Screen name="EventsHome" component={EventHome} />

    {/* <RootStack.Screen name="SignInScreen" component={SignInScreen}/> */}
    {/* <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/> */}
  </RootStack.Navigator>
);

export default RootStackScreen;
