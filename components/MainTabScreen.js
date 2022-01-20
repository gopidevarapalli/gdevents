import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import HomeScreen from "./HomeScreen";
import NotificationScreen from "./NotificationScreen";
import ExploreScreen from "./ExploreScreen";
import ProfileScreen from "./ProfileScreen";
import MapTestScreen from "./MapTestScreen";
import EditProfileScreen from "./EditProfileScreen";

import UserDetailsCard from "../components/UserDetailsCard";

import { useTheme, Avatar, ActivityIndicator } from "react-native-paper";
import { View } from "react-native-animatable";
import { TouchableOpacity } from "react-native-gesture-handler";
import CardListScreen from "./CardListScreen";
import CardItemDetails from "./CardItemDetails";
import { color } from "react-native-reanimated";
import EventScreen from "./EventScreen";
import MeetingListScreen from "../screens/MeetingListScreen";
import PeopleListScreen from "./PeopleListScreen";
import ProfileListScreen from "./ProfileListScreen";
import FavListScreen from "./FavListScreen";

import AgendaScreen from "./AgendaScreen";
import Relationship from "./Relationship";
import Events from "./Events";
import VideoScreen from "./VideoScreen";

import ExhibitorsDetailCard from "../components/ExhibitorsDetail";
import CompanyDetailsCard from "../components/CompanyDetails";
import ProductsDetailCard from "../components/ProductsCardDetail";

import sponsorDetail from "../components/SponsorCardDetail";
import SponsorCardDetail from "../components/SponsorCardDetail";
import AgendaDetails from "../components/AgendaDetails";
import UserDetailsListScreen from "./UserDetailsListScreen";
import RelationshipListScreen from "./RelationshipListScreen";
import store from "../redux/store";
import Axios from "axios";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Feed from "./Feed";
import api_url from "../Config/Config";
import SessionScreen from "./SessionScreen";

import Sponsors from "./Sponsors";

const HomeStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const EventStack = createStackNavigator();
const SupportStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function LogoTitle() {
  return (
    <Image
      resizeMode="cover"
      style={{
        width: 150,
        height: 30,
        resizeMode: "contain",
        alignSelf: "center",
      }}
      source={require("../assets/logo.png")}
    />
  );
}

const MainTabScreen = () => {
  const [profileData, setProfileData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // alert(store.getState().login.cookie);
    // alert(api_url.currentUserInfo)
    if (store.getState().login.cookie) {
      const formData = new FormData();
      formData.append("cookie", store.getState().login.cookie);
      Axios.post(`${api_url.currentUserInfo}`, formData).then((res) => {
        console.log("MainTabScreen");
        // alert(res.data.user.avatar)
        setProfileData(res.data);
        setIsLoading(false);
      });
    }
  }, [store.getState().login.cookie]);

  return (
    <Tab.Navigator initialRouteName="Home" activeColor="#fff">
      {/* <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      profileData
      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#00dea5',
        tabBarIcon: ({color}) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    /> */}
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: "Home",
          tabBarColor: "#00dea5",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      >
        {() =>
          isLoading ? (
            <ActivityIndicator
              size="large"
              color="green"
              style={{
                marginTop: 320,
              }}
            />
          ) : (
            <HomeStackScreen profileData={profileData} />
          )
        }
      </Tab.Screen>

      <Tab.Screen
        name="Events"
        component={EventStackScreen}
        options={{
          tabBarLabel: "Events",
          tabBarColor: "#00dea5",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Help"
        component={SupportStackScreen}
        options={{
          tabBarLabel: "Help",
          tabBarColor: "#00dea5",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-aperture" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationStackScreen}
        options={{
          tabBarLabel: "Updates",
          tabBarColor: "#00dea5",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-notifications" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const mapStateToProps = (state) => {
  return {
    login: state,
  };
};
export default connect(mapStateToProps)(MainTabScreen);

// export default MainTabScreen;

const HomeStackScreen = (props) => {
  const navigation = useNavigation();

  const { colors } = useTheme();
  const [profileData, setProfileData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //   useEffect(()=>{
  //     alert(store.getState().login.cookie)
  //     if(store.getState().login.cookie){
  //       const formData = new FormData();
  //       formData.append('cookie', store.getState().login.cookie);
  //       Axios.post(`https://ind-backend-events-website.pantheonsite.io/api/user/get_currentuserinfo/`, formData)
  //       .then(res=>{
  //         console.log(res.data.user)
  //         setProfileData(res.data.user);
  //         setIsLoading(false);
  //         })
  //     }

  // }, [store.getState().login.cookie])
  useEffect(() => {
    console.log("Main tab screen called");
    console.log(props.profileData.user.avatar);
  }, []);

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.headerBackground,
          shadowColor: colors.headerBackground, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "",
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <Icon.Button
                name="ios-menu"
                size={25}
                color={colors.text}
                backgroundColor={colors.headerBackground}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row", marginRight: 10 }}>
              {/* <Icon.Button
                name="ios-search"
                size={25}
                color={colors.text}
                backgroundColor={colors.headerBackground}
                onPress={() => {}}
              /> */}
              <TouchableOpacity
                style={{ paddingHorizontal: 10, marginTop: 5 }}
                onPress={() => {
                  navigation.navigate("profilelist");
                }}
              >
                <Avatar.Image
                  source={{
                    uri:
                      "https://events.globaldata.com" +
                      props.profileData.user.avatar,
                  }}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (props) => <LogoTitle {...props} />,
        }}
      />
      <HomeStack.Screen
        name="meetinglist"
        component={MeetingListScreen}
        options={({ route }) => ({
          title: route.params.title,
          headerBackTitleVisible: false,
        })}
      />
      <HomeStack.Screen
        name="feed"
        component={Feed}
        options={({ route }) => ({
          title: route.params.title,
          headerBackTitleVisible: false,
        })}
      />
      <HomeStack.Screen
        name="peoplelist"
        component={PeopleListScreen}
        options={({ route }) => ({
          title: route.params.title,
          headerBackTitleVisible: false,
        })}
      />
      <HomeStack.Screen
        name="Sponsors"
        component={Sponsors}
        options={({ route }) => ({
          title: route.params.title,
          headerBackTitleVisible: false,
        })}
      />
      <HomeStack.Screen
        name="profilelist"
        component={ProfileListScreen}
        options={({ route }) => ({
          title: "My Profile",
          headerBackTitleVisible: false,
        })}
      />

      <HomeStack.Screen
        name="userDetails"
        component={UserDetailsListScreen}
        options={({ route }) => ({
          title: "User Details",
          headerBackTitleVisible: false,
        })}
      />

      <HomeStack.Screen
        name="ExhibitorsDetail"
        component={ExhibitorsDetailCard}
        options={({ route }) => ({
          title: "Exhibitors Details",
          headerBackTitleVisible: false,
        })}
      />

      <HomeStack.Screen
        name="companyDetails"
        component={CompanyDetailsCard}
        options={({ route }) => ({
          title: "Company Details",
          headerBackTitleVisible: false,
        })}
      />

      <HomeStack.Screen
        name="ProductsDetail"
        component={ProductsDetailCard}
        options={({ route }) => ({
          title: "Products Details",
          headerBackTitleVisible: false,
        })}
      />

      <HomeStack.Screen
        name="SponsorDetail"
        component={SponsorCardDetail}
        options={({ route }) => ({
          title: "Sponsor Details",
          headerBackTitleVisible: false,
        })}
      />

      <HomeStack.Screen
        name="AgendaDetails"
        component={AgendaDetails}
        options={({ route }) => ({
          title: "Agenda Details",
          headerBackTitleVisible: false,
        })}
      />

      <HomeStack.Screen
        name="rllist"
        component={RelationshipListScreen}
        options={({ route }) => ({
          title: route.params.title,
          headerBackTitleVisible: false,
        })}
      />
      <HomeStack.Screen
        name="favlist"
        component={FavListScreen}
        options={({ route }) => ({
          title: "My Favorites",
          headerBackTitleVisible: false,
        })}
      />
      <HomeStack.Screen
        name="CardItemDetails"
        component={CardItemDetails}
        options={({ route }) => ({
          // title: route.params.title,
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: "#fff",
        })}
      />
      {/* <HomeStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({route}) => ({
        // title: route.params.title,
          headerBackTitleVisible: false,
        
        })}
      /> */}
      <HomeStack.Screen
        name="Agenda"
        component={AgendaScreen}
        options={({ route }) => ({
          title: "My Agenda",
          headerBackTitleVisible: false,
        })}
      />
      <HomeStack.Screen
        name="events"
        component={Events}
        options={({ route }) => ({
          title: "Event Details",
          headerBackTitleVisible: false,
        })}
      />
      <HomeStack.Screen
        name="support"
        component={ExploreScreen}
        options={({ route }) => ({
          title: "Help",
          headerBackTitleVisible: false,
        })}
      />
      {/* <HomeStack.Screen
        name="videoscreen"
        component={VideoScreen}
        options={({route}) => ({
         title: 'Video',
          headerBackTitleVisible: false,
        
        })}
      /> */}
      <HomeStack.Screen
        name="videoscreen"
        component={VideoScreen}
        options={({ route }) => {
          return {
            title: route.params.subject ? route.params.subject : "Meeting",
            headerBackTitleVisible: false,
          };
        }}
      />

      <HomeStack.Screen
        name="sessionscreen"
        component={SessionScreen}
        options={({ route }) => ({
          title: route.params.title ? route.params.title : "Session Started",
          headerBackTitleVisible: false,
        })}
      />
    </HomeStack.Navigator>
  );
};

// const mapStateToProps  = state =>{
//   return({
//     login:state
//   })
// }
// export default connect(mapStateToProps)(HomeStackScreen)

const NotificationStackScreen = ({ navigation }) => (
  <NotificationStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#00dea5",
      },
      headerTintColor: "#2F283D",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <NotificationStack.Screen
      name="Notifications"
      component={NotificationScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            color="#2F283D"
            backgroundColor="#00dea5"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </NotificationStack.Navigator>
);

const EventStackScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <EventStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00dea5",
        },
        headerTintColor: "#2F283D",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            color="#2F283D"
            backgroundColor="#00dea5"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    >
      <EventStack.Screen
        name="EventStack"
        options={{
          title: "EventStack",
        }}
        component={EventScreen}
      />
    </EventStack.Navigator>
  );
};

const SupportStackScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <SupportStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00dea5",
        },
        headerTintColor: "#2F283D",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            color="#2F283D"
            backgroundColor="#00dea5"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    >
      <EventStack.Screen
        name="Support"
        options={{
          title: "Help",
        }}
        component={ExploreScreen}
      />
    </SupportStack.Navigator>
  );
};
