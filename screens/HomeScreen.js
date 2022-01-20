import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "@react-navigation/native";
//import Swiper from 'react-native-swiper';
import Carousel from "../components/Carousel";
import Categories from "../components/Categories";
// import Stas from "../components/Stas";
// import LatestMembers from "../components/LatestMembers";

// import AsyncStorage from '@react-native-community/async-storage';
// import ProfileScreen from './ProfileScreen';

const data = require("../assets/data.json");

// import { AsyncStorage} from 'react-native';

// import store from "../redux/store";
import TodayMeeting from "../components/TodayMeeting";
import TodayAgenda from "../components/TodayAgenda";

import AsyncStorage from "@react-native-community/async-storage";
// import Recommended from "./Recommended";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";

import Entypo from "react-native-vector-icons/Entypo";

const HomeScreen = (props) => {
  // const dispatch = useDispatch();
  // const [cookies, setCookies] = useState(store.getState().login.cookie);

  const [isLoading, setIsLoading] = useState(true);
  // const loginData = useSelector(state => state.loginData)
  // alert(store.getState().login.cookie)

  // store.dispatch(MyMeetingsAction(cookies));
  // store.dispatch(KeyStatisticsAction(cookies));
  // store.dispatch(SponsorsAction(cookies))
  // store.dispatch(profileAction(cookies));
  // store.dispatch(LatestMembersAction(cookies));
  // store.dispatch(ProductsAction(cookies));
  // store.dispatch(AttendeesAction(cookies));
  // store.dispatch(SpeakersAction(cookies));
  // store.dispatch(CompanyAction(cookies))
  // store.dispatch(ExhibitorAction(cookies));

  // AsyncStorage.getItem('cookies').then((cookies)=>{
  //   // alert(cookies)
  //   store.dispatch(MyMeetingsAction(cookies));
  //   store.dispatch(KeyStatisticsAction(cookies));
  //   store.dispatch(SponsorsAction(cookies))
  //   store.dispatch(profileAction(cookies));
  //   store.dispatch(LatestMembersAction(cookies));
  //   store.dispatch(ProductsAction(cookies));
  //   store.dispatch(AttendeesAction(cookies));
  //   store.dispatch(SpeakersAction(cookies));
  //   store.dispatch(CompanyAction(cookies))
  //   store.dispatch(ExhibitorAction(cookies));

  // });

  const theme = useTheme();
  // state = {
  //   AgendaData:data.Agenda,
  //   Stats:data.Stats,
  //   CompanyProfile:data.CompanyProfile
  // }

  useEffect(() => {
    console.log(props.loginData);
    //console.log("Home screen")
    // alert(AsyncStorage.getItem('event_id'));
    AsyncStorage.getItem("event_id").then((val) => {
      console.log("event id", val);
    });
    // alert(AsyncStorage.getItem('event_id').then(val=>val))
    // console.log(AsyncStorage.getItem('event_id'))
    setIsLoading(false);
  }, []);

  const [AgendaData, setAgendaData] = useState(data.Agenda);
  const [CompanyProfile, setCompanyProfile] = useState(data.CompanyProfile);
  const [Stats, setStats] = useState(data.Stats);

  return isLoading || props.loginData.cookie == undefined ? (
    <ActivityIndicator
      size="large"
      color="green"
      style={{
        marginTop: 300,
      }}
    />
  ) : (
    <ScrollView style={styles.container}>
      <View
        style={{
          marginTop: 20,
          flexDirection: "row-reverse",
          padding: 0,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("EventsHome");
          }}
          style={{
            backgroundColor: "#00dea5",
            width: 120,
            color: "white",
            textAlign: "center",
            padding: 2,
            marginLeft: 3,
            marginRight: 10,
            borderRadius: 5,
            marginTop: 5,
          }}
        >
          <Text style={{ textAlign: "center", color: "white", marginLeft: 4 }}>
            {`Switch Event `}
            <Entypo name="arrow-bold-right" color="white" size={15} />
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
      <View style={styles.sliderContainer}>
        {/* <Swiper
          autoplay
          horizontal={false}
          height={200}
          activeDotColor="#FF6347">
          <View style={styles.slide}>
            <Image
              source={require('../assets/banners/food-banner1.jpg')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../assets/banners/food-banner2.jpg')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../assets/banners/food-banner3.jpg')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
        </Swiper> */}
        <Carousel />
      </View>

      <Categories />
      {/* <LatestMembers /> */}

      {/* <About /> */}

      {/* <MeetingRequest /> */}

      <View style={styles.cardsWrapper}>
        <Text
          style={{
            alignSelf: "flex-start",
            fontSize: 15,
            fontWeight: "bold",
            color: "#000",
            paddingBottom: 1,
            paddingTop: 1,
          }}
        >
          Today Meetings
        </Text>
      </View>
      <TodayMeeting />

      <View style={styles.cardsWrapper}>
        <Text
          style={{
            alignSelf: "flex-start",
            fontSize: 15,
            fontWeight: "bold",
            color: "#000",
            paddingBottom: 1,
            paddingTop: 1,
          }}
        >
          Today Agenda Session's
        </Text>
      </View>

      <TodayAgenda />

      {/* <Relationship /> */}

      {/* <Agenda AgendaData={AgendaData} />  */}

      {/* <Stas Stats={Stats} /> */}

      {/* <Exhibitors /> */}

      {/* <Recommended /> */}

      {/* <LatestMembers /> */}
      {/* <Categories />       */}

      {/* <Speakers /> */}
      {/* <Products /> */}
      {/* <Exhibitors /> */}
      {/* <Attendees /> */}
      {/* <Companies /> */}

      {/* <Sponsors /> */}
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    loginData: state.login,
  };
};

export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderContainer: {
    height: 250,
    width: "100%",
    //marginTop: 2,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 0,
  },

  wrapper: {},
  iconWidth: {
    width: 50,
    height: 50,
    padding: 10,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 8,
  },
  sliderImage: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
  },
  categoryContainer: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    marginTop: 25,
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "stretch",
    flexWrap: "wrap",
  },

  categoryBtn: {
    marginBottom: 8,
    marginTop: 8,
    marginHorizontal: 0,
    alignSelf: "center",
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 75,
    height: 75,
    backgroundColor: "#fff" /* '#FF6347' */,
    borderRadius: 10,
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  categoryBtnTxt: {
    alignSelf: "center",
    marginTop: 10,
    color: "#09BA90",
  },
  cardsWrapper: {
    marginTop: 10,
    width: "93%",
    alignSelf: "center",
  },
  card: {
    height: 140,
    width: "98%",
    alignSelf: "center",
    justifyContent: "center",
    marginVertical: 10,
    flexDirection: "row",
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    borderWidth: 0.2,
    borderRadius: 8,
  },
  cardImgWrapper: {
    flex: 1,

    borderColor: "#fff",
    borderLeftWidth: 0,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
  cardImg: {
    height: "100%",
    width: "100%",
    borderColor: "#fff",
    alignSelf: "center",
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderLeftWidth: 0,
  },
  cardText: {
    borderRadius: 8,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: "#fff",
    borderLeftWidth: 0,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardTitle: {
    fontWeight: "bold",
    lineHeight: 22,
  },
  cardDetails: {
    fontSize: 12,
    color: "#444",
  },
});
