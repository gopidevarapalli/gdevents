import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, Button } from "react-native-paper";
import Axios from "axios";

import { connect, useDispatch } from "react-redux";
import {
  KeyStatisticsAction,
  LatestMembersAction,
} from "../redux/action/actions";
import store from "../redux/store";
import api_url from "../Config/Config";

const Stats = (props) => {
  //console.log("key statistics", props);
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    cardsWrapper: {
      marginTop: 10,
      marginBottom: 10,
      width: "90%",
      alignSelf: "center",
    },
  });

  const theme = useTheme();
  // alert('stats.js called')
  //
  const [keyStats, setkeyStats] = useState({});

  useEffect(() => {
    let formData = new FormData();
    formData.append("cookie", props.login.cookie);
    formData.append("event_id", props.event.common.event.event_id_single);

    Axios.post(
      //`https://events.globaldata.com/api/user/get_keystatistics`,
      `${api_url.keyStats}`,
      formData
    ).then((res) => {
      // console.log("key stats", res);
      setkeyStats(res.data.statistics);
      //setIsLoading(false);
    });
  });

  // useEffect(() => {
  //   if (props.keystatistics.isLoading) {
  //     props.KeyStatisticsAction(
  //       props.login.cookie,
  //       props.event.common.event.event_id_single
  //     );
  //   } else {
  //     setkeyStats(
  //       props.keystatistics.isLoading
  //         ? []
  //         : props.keystatistics.common == null
  //         ? []
  //         : props.keystatistics.common.statistics
  //     );
  //   }
  //   // alert('key statistics called')

  //   // console.log('stats.js called');
  //   // console.log(store.getState().keystatistics);

  //   //   alert(props.keystatistics.isLoading)
  // }, [props.keystatistics.isLoading]);
  //console.log(17)
  //const [Stats, setStats] = useState([])
  //console.log(props.Stats)
  //if(props.Stats){
  // setStats(props.Stats);
  // }

  const Attendees = () => {
    //console.log("Attendees clicked");
    navigation.navigate("peoplelist", {
      screen: "Attendees",
      title: "Attendees",
    });
  };

  const Companies = () => {
    //console.log("Companies clicked");
    navigation.navigate("peoplelist", {
      screen: "Companies",
      title: "Attendees",
    });
  };

  const Products = () => {
    //console.log("Products clicked");
    navigation.navigate("peoplelist", {
      screen: "Products",
      title: "Attendees",
    });
  };

  const Agendasession = () => {
    //console.log("Agendasession clicked");
    navigation.navigate("Agenda", {
      screen: "Agendasession",
    });
  };

  const MySchedules = () => {
    //console.log("MySchedules clicked");
    navigation.navigate("profilelist", {
      screen: "My Schedule",
    });
  };

  // const Messages = () => {
  //   console.log("Messages clicked");
  //   navigation.navigate("peoplelist", {
  //     screen: "Messages",
  //   });
  // };

  const MyFavorites = () => {
    //console.log("MyFavorites clicked");
    navigation.navigate("favlist", {
      screen: "MyFavorites",
    });
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
      <View style={styles.cardsWrapper}>
        <Text
          style={{
            alignSelf: "flex-start",
            fontSize: 15,
            fontWeight: "bold",
            color: "#000",
            paddingBottom: 6,
            paddingTop: 6,
          }}
        >
          Key Statistics
        </Text>
      </View>
      {/* {props.keystatistics.isLoading ? (
        <ActivityIndicator size="small" color="green" />
      ) : (   )} */}
      <View
        style={{
          borderWidth: 1,
          width: "88%",
          alignSelf: "center",
          borderColor: "#2F283D",
          borderRadius: 5,
        }}
      >
        <View
          style={{
            height: 35,
            flexDirection: "row",
            flex: 1,
            borderBottomWidth: 1,
            borderColor: "#2F283D",
            //   borderWidth: 1,
            padding: 2,
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              flex: 1,

              //  borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#09BA90", fontWeight: "bold" }}>
              {/* {keyStats ? keyStats.attendeescount : 0} */}

              {keyStats.attendeescount ? keyStats.attendeescount : 0}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              // borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text onPress={Attendees}>Attendees</Text>
          </View>
        </View>
        <View
          style={{
            height: 35,
            flexDirection: "row",
            flex: 1,
            borderBottomWidth: 1,
            borderColor: "#2F283D",
            //   borderWidth: 1,
            padding: 2,
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              flex: 1,

              //  borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#09BA90", fontWeight: "bold" }}>
              {/* {keyStats ? keyStats.companiescount : 0} */}

              {keyStats.companiescount}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              // borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text onPress={Companies}>Companies</Text>
          </View>
        </View>
        <View
          style={{
            height: 35,
            flexDirection: "row",
            flex: 1,
            borderBottomWidth: 1,
            borderColor: "#2F283D",
            //   borderWidth: 1,
            padding: 2,
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              flex: 1,

              //  borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#09BA90", fontWeight: "bold" }}>
              {/* {keyStats ? keyStats.productscount : 0} */}
              {keyStats.productscount}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              // borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text onPress={Products}>Products</Text>
          </View>
        </View>
        <View
          style={{
            height: 35,
            flexDirection: "row",
            flex: 1,
            borderBottomWidth: 1,
            borderColor: "#2F283D",
            //   borderWidth: 1,
            padding: 2,
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              flex: 1,

              //  borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#09BA90", fontWeight: "bold" }}>
              {/* {keyStats ? keyStats.agendasessions : 0} */}
              {keyStats.agendasessions}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              // borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text onPress={Agendasession}>Agenda sessions</Text>
          </View>
        </View>
        <View
          style={{
            height: 35,
            flexDirection: "row",
            flex: 1,
            borderBottomWidth: 1,
            borderColor: "#2F283D",
            //   borderWidth: 1,
            padding: 2,
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              flex: 1,

              //  borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#09BA90", fontWeight: "bold" }}>
              {/* {keyStats ? keyStats.myschedulecount : 0} */}
              {keyStats.myschedulecount}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              // borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text onPress={MySchedules}>My Schedules</Text>
          </View>
        </View>

        {/* <View
          style={{
            height: 35,
            flexDirection: "row",
            flex: 1,
            borderBottomWidth: 1,
            borderColor: "#2F283D",
            padding: 2,
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              flex: 1,

              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#09BA90", fontWeight: "bold" }}>
              {keyStats.mymessagescount}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>Messages</Text>
          </View>
        </View> */}

        <View
          style={{
            height: 35,
            flexDirection: "row",
            flex: 1,
            //borderBottomWidth: 1,
            borderColor: "#2F283D",
            //   borderWidth: 1,
            padding: 2,
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              flex: 1,

              //  borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#09BA90", fontWeight: "bold" }}>
              {/* {keyStats ? keyStats.myfavoritescount : 0} */}
              {keyStats.myfavoritescount}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              // borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text onPress={MyFavorites}>My Favourites</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    keystatistics: state.keystatistics,
    login: state.login,
    event: state.Event,
  };
};

export default connect(mapStateToProps, { KeyStatisticsAction })(Stats);
