import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { LatestMembersAction } from "../redux/action/actions";
import { connect } from "react-redux";
import Axios from "axios";
import api_url from "../Config/Config";
// import AsyncStorage from '@react-native-community/async-storage';
// import AsyncStorage from '@react-native-community/async-storage';

const LatestMembers = (props) => {
  //console.log("Latest members", props);
  const navigation = useNavigation();

  const theme = useTheme();

  const [latestmembers, setLatestMembers] = useState([]);

  useEffect(() => {
    let formData = new FormData();
    formData.append("cookie", props.login.cookie);
    formData.append("event_id", props.event.common.event.event_id_single);

    Axios.post(
      //`https://events.globaldata.com/api/user/get_latest_members`,
      `${api_url.latestMembers}`,
      formData
    ).then((res) => {
      //console.log("lat members", res);
      if (res.data.latestmembers == null) {
        setLatestMembers([]);
      } else {
        setLatestMembers(
          res.data.latestmembers.length ? res.data.latestmembers : []
        );
        //setIsLoading(false);}
      }
    });
  });

  // useEffect(() => {
  //   if (props.latestmembers.isLoading) {
  //     props.LatestMembersAction(
  //       props.login.cookie,
  //       props.event.common.event.event_id_single
  //     );
  //   } else {
  //     setLatestMembers(
  //       props.latestmembers.isLoading
  //         ? []
  //         : props.latestmembers.common == null
  //         ? []
  //         : props.latestmembers.common.latestmembers
  //     );
  //   }
  // }, [props.latestmembers.isLoading, props.login.cookie,
  //   props.event.common.event.event_id_single]);

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
          Latest Members
        </Text>
      </View>
      <View style={styles.categoryContainer}>
        {latestmembers.map((member, i) => (
          <TouchableOpacity
            key={i}
            style={styles.categoryBtn}
            onPress={() =>
              navigation.navigate("userDetails", { user_id: member.user_id })
            }
          >
            <View style={styles.categoryIcon}>
              {/* <Ionicons name="ios-restaurant" size={35} color="#FF6347" /> */}
              <Image
                source={{ uri: `${member.latestmemberimage}` }}
                resizeMode="cover"
                style={styles.iconWidth}
              />
            </View>
          </TouchableOpacity>
        ))}
        {latestmembers.length == 0 ? (
          <View style={{ margin: 8, marginLeft: 50 }}>
            <Text>No Latest Members Available</Text>
          </View>
        ) : (
          <View></View>
        )}
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    latestmembers: state.LatestMembers,
    login: state.login,
    event: state.Event,
  };
};

export default connect(mapStateToProps, { LatestMembersAction })(LatestMembers);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderContainer: {
    height: 250,
    width: "100%",
    marginTop: 12,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 0,
  },

  wrapper: {},
  iconWidth: {
    width: 65,
    height: 65,

    borderRadius: 30,
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
    marginTop: 2,
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
    borderRadius: 50,
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
    marginTop: 20,
    width: "90%",
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
