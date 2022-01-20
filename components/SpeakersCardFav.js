import React, { useEffect } from "react";
import {
  Dimensions,
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
import { Button } from "react-native-paper";
import { useState } from "react";
import Axios from "axios";
import store from "../redux/store";
import api_url from "../Config/Config";
import { connect, useDispatch, useSelector } from "react-redux";
import { GetRefreshAction } from "../redux/action/actions";

const dimensions = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};

const SpeakersCardFav = (props) => {
  const theme = useTheme();

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const refreshRequired = useSelector((state) => state.refreshRequired);

  // const [attendees, setAttendees] = useState(props.Attendees);

  const [favourites, setFavourites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // console.log(store.getState().login)
    // alert(store.getState().login.common.user.id)
    const formData = new FormData();
    formData.append("cookie", store.getState().login.cookie);
    formData.append("user_id", store.getState().login.common.user.id);

    formData.append("event_id", props.event.common.event.event_id_single);
    Axios.post(`${api_url.myFavourites}`, formData).then((res) => {
      // console.log(res.data.all)
      setFavourites(res.data.speakers ? res.data.speakers : []);
      dispatch(GetRefreshAction(false));
      setIsLoading(false);
    });
  }, [
    store.getState().login.cookie,
    props.event.common.event.event_id_single,
    refreshRequired,
  ]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cardsWrapper}>
        {isLoading ? (
          <ActivityIndicator size="large" color="green" />
        ) : favourites.length == 0 ? (
          <View
            style={{
              flex: 1,
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              textAlignVertical: "center",
            }}
          >
            <Text
              style={{
                flex: 1,
                alignSelf: "center",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                textAlignVertical: "center",
                height: dimensions.height / 1.3,
              }}
            >
              No Data found
            </Text>
          </View>
        ) : (
          favourites.map((fav, i) => (
            <TouchableOpacity
              key={i}
              onPress={() =>
                navigation.navigate("userDetails", { user_id: fav.speaker_id })
              }
            >
              <View style={styles.card} key={i}>
                <View style={styles.cardInfo}>
                  <View style={styles.agendaCardDetails}>
                    {/* <Text style={{ color:'#000',fontSize:15,fontWeight:'bold'}}>Type</Text> */}
                  </View>
                  <View style={styles.agendaCardDetails}>
                    <Text
                      style={{
                        backgroundColor: "#00DEA5",
                        fontSize: 15,
                        fontWeight: "bold",
                        paddingTop: 3,
                        paddingBottom: 3,
                        borderRadius: 3,
                        paddingLeft: 8,
                        paddingRight: 8,
                        color: "#2F283D",
                      }}
                    >
                      {fav.Type}
                    </Text>
                  </View>

                  <View style={styles.agendaCardDetails}>
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 15,
                        fontWeight: "bold",
                        paddingTop: 5,
                      }}
                    >
                      Title
                    </Text>
                  </View>
                  <View style={styles.agendaCardDetails}>
                    <Text style={{ color: "#444" }} numberOfLines={1}>
                      {fav.Title}
                    </Text>
                  </View>
                  {fav.company_name ? (
                    <>
                      <View style={styles.agendaCardDetails}>
                        <Text
                          style={{
                            color: "#000",
                            fontSize: 15,
                            fontWeight: "bold",
                          }}
                        >
                          Company Name
                        </Text>
                      </View>
                      <View style={styles.agendaCardDetails}>
                        <Text style={{ color: "#444" }}>
                          {fav.company_name}
                        </Text>
                      </View>
                    </>
                  ) : null}
                  {fav.jobtitle ? (
                    <>
                      <View style={styles.agendaCardDetails}>
                        <Text
                          style={{
                            color: "#000",
                            fontSize: 15,
                            fontWeight: "bold",
                          }}
                        >
                          Job Title
                        </Text>
                      </View>
                      <View style={styles.agendaCardDetails}>
                        <Text style={{ color: "#444" }}>{fav.jobtitle}</Text>
                      </View>
                    </>
                  ) : null}

                  {/* <View style={styles.agendaCardDetails}>
                  <Text
                    style={{ color: "#000", fontSize: 15, fontWeight: "bold" }}
                  >
                    Date
                  </Text>
                </View>
                <View style={styles.agendaCardDetails}>
                  <Text>{fav.date.date}</Text>
                </View> */}
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  // console.log(state.MyMeetings)
  return {
    event: state.Event,
  };
};
export default connect(mapStateToProps)(SpeakersCardFav);
// export default SpeakersCardFav;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardsWrapper: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
  },
  card: {
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
    //borderWidth: 0.2,
    borderRadius: 8,
  },

  cardInfo: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
    borderColor: "#fff",
    borderLeftWidth: 0,
    borderRadius: 8,
    backgroundColor: "#fff",
    //borderBottomRightRadius: 0,
    //borderTopRightRadius: 0,
  },
  cardTitle: {
    fontWeight: "bold",
    lineHeight: 10,
  },
  cardDetails: {
    fontSize: 12,
    color: "#444",
  },
  agendaCardDetails: {
    color: "#444",
    flexDirection: "row",
    paddingLeft: 2,
    borderRadius: 5,
  },
});
