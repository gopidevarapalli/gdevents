import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import { Button, TextInput, Searchbar } from "react-native-paper";
import { useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import IonIcon from "react-native-vector-icons/Ionicons";
import store from "../redux/store";
import Axios from "axios";
import { FlatList } from "react-native-gesture-handler";
import api_url from "../Config/Config";
import { connect, useDispatch } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import { GetRefreshAction } from "../redux/action/actions";

const AttendeesCard = (props) => {
  const theme = useTheme();

  const navigation = useNavigation();
  const dispatch = useDispatch();

  //console.log("Attendees card props", props);

  let [attendees, setAttendees] = useState(props.Attendees);
  const [isLoading, setisLoading] = useState(false);
  const [recordCount, setRecordCount] = useState(1);
  const [loadMore, setIsLoadMore] = useState(false);
  let [searchWord, setsearchWord] = useState("");
  const [searchLoad, setSearchLoad] = useState(false);

  const getMore = () => {
    if (searchWord.trim() === "" && attendees.length >= 9) {
      setIsLoadMore(true);

      const formData = new FormData();
      formData.append("cookie", store.getState().login.cookie);
      formData.append("spage", recordCount + 1);
      // alert(event_id);
      formData.append("event_id", props.event.common.event.event_id_single);
      Axios.post(`${api_url.attendeesList}`, formData).then((res) => {
        console.log("search res", res);
        //let getMoreAttendees= [];
        res.data.attendees.forEach((item) => {
          let i = attendees.findIndex(
            (Findingitem) => Findingitem.id == item.id
          );
          if (i > -1) {
            attendees[i] = item;
          } else {
            attendees.push(item);
          }
          setAttendees([...attendees]);
        });
        //setAttendees(res.data.attendees);
        setRecordCount(recordCount + 1);
        setIsLoadMore(false);
      });
    }
    // else {
    //   // setIsLoadMore(false);
    //   if (attendees.length >= 9) {
    //     // console.log(searchWord)
    //     const formData = new FormData();
    //     formData.append("cookie", store.getState().login.cookie);
    //     formData.append("search_keyword", searchWord);

    //     setIsLoadMore(true);

    //     formData.append("spage", recordCount + 1);

    //     formData.append("event_id", props.event.common.event.event_id_single);
    //     Axios.post(`${api_url.attendeesSearch}`, formData).then((res) => {
    //       console.log("get more attendees", res.data);
    //       res.data.attendies.forEach((item) => {
    //         let i = attendees.findIndex(
    //           (Findingitem) => Findingitem.id == item.id
    //         );
    //         if (i > -1) {
    //           attendees[i] = item;
    //         } else {
    //           attendees.push(item);
    //         }
    //         setAttendees([...attendees]);
    //       });
    //       //setAttendees(res.data.attendies);
    //       setRecordCount(recordCount + 1);
    //       setIsLoadMore(false);
    //       // setisLoading(false);
    //     });
    //   }
    // }
  };

  const bookmark = (company) => {
    // console.log("bookmarkk", company);
    const formData = new FormData();
    formData.append("cookie", store.getState().login.cookie);
    formData.append("bookmarktype", "attendees");
    formData.append("status", company.bookmark_status ? 0 : 1);
    formData.append("title", company.Name);
    formData.append("id", company.id);

    formData.append("event_id", props.event.common.event.event_id_single);
    // console.log(company)
    Axios.post(`${api_url.bookmark}`, formData).then((res) => {
      //console.log("bookmark res", res.data);
      if (res.data.status === "ok") {
        Alert.alert("Success", res.data.message);
        setisLoading(true);
        Axios.post(`${api_url.attendeesList}`, formData).then((res) => {
          // console.log(""Attendees after bookmard", res.data)
          setAttendees(res.data.attendees ? res.data.attendees : []);
          dispatch(GetRefreshAction(true));
          setisLoading(false);
        });
      }
      if (res.data.error) {
        Alert.alert("Success", res.data.error);
      }
    });
  };

  const searchData = (val) => {
    setSearchLoad(true);
    searchWord = val;
    setsearchWord(val);
    const formData = new FormData();
    formData.append("cookie", store.getState().login.cookie);
    formData.append("search_keyword", val);
    formData.append("spage", 1);

    formData.append("event_id", props.event.common.event.event_id_single);
    Axios.post(`${api_url.attendeesSearch}`, formData).then((res) => {
      console.log("====== search response start");
      console.log("search res", res);
      console.log(res.data);
      console.log("====== search response end");
      setAttendees(res.data.attendies == null ? [] : res.data.attendies);
      setSearchLoad(false);
      // setisLoading(false);
    });
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
      <View style={styles.cardsWrapper}>
        {/* <Text>Attendees</Text> */}
        <View style={{marginTop:10}}>
          <Searchbar
            placeholder="Search"
            onChangeText={(val) => {
              searchData(val);
            }}
            value={searchWord}
            // style={{
            //   backgroundColor: "white",
            //   borderRadius: 10,
            //   height: 50,
            //   borderColor: "black",
            // }}
          />

          <Text>{attendees.length ? "" : "No data found"}</Text>
        </View>
        {searchLoad ? (
          <ActivityIndicator size="large" color="green" />
        ) : (
          <FlatList
            onEndReached={() => {
              if (searchWord == "") {
                getMore();
              }
            }}
            keyExtractor={(item, i) => i}
            data={attendees}
            renderItem={({ item }) => {
              //console.log(attendee)

              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("userDetails", { user_id: item.id })
                  }
                >
                  <View style={styles.card}>
                    <View style={styles.cardImgWrapper1}>
                      <View style={styles.cardImg1}>
                        <Image
                          source={{ uri: item.Profilepic }}
                          resizeMode="cover"
                          style={styles.iconWidth}
                        />
                      </View>
                    </View>
                    <View style={styles.cardInfo}>
                      <Text numberOfLines={1} style={styles.cardTitle}>
                        {item.Name}
                      </Text>
                      <Text numberOfLines={1} style={styles.cardDesg}>
                        {item.JobTitle}
                      </Text>
                      <Text numberOfLines={1} style={styles.cardDetails}>
                        {item.CompanyName}
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                          style={styles.attendeeIcon}
                          onPress={() => bookmark(item)}
                        >
                          <View>
                            {isLoading ? (
                              <ActivityIndicator size="small" color="green" />
                            ) : (
                              <IonIcon
                                name={
                                  item.bookmark_status
                                    ? "bookmark"
                                    : "bookmark-outline"
                                }
                                size={22}
                                color="#1E1727"
                              />
                            )}
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={{
                            marginTop: 10,
                            marginLeft: 20,
                            padding: 2,
                          }}
                          onPress={() =>
                            navigation.navigate("meetinglist", {
                              title: "My Meetings",
                              screen: "Request",
                              id: item.id,
                              name: item.Name,
                            })
                          }
                        >
                          <AntDesign
                            name="videocamera"
                            size={24}
                            color="#1E1727"
                          />
                        </TouchableOpacity>

                        {/* <TouchableOpacity
                          disabled={true}
                          style={{
                            marginTop: 10,
                            marginLeft: 20,
                            padding: 2,
                          }}
                          onPress={() => {
                            console.log("Go to msgbox id=", item.id);
                            navigation.navigate("messagelist", {
                              screen: "New Message",
                              params: { id: item.id, name: `${item.Name}` },
                            });
                          }}
                        >
                          <AntDesign name="mail" size={26} color="#1E1727" />
                        </TouchableOpacity> */}
                      </View>

                      {/* <View style={{ flexDirection: "row" }}></View> */}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
        {loadMore ? (
          <ActivityIndicator size="large" color="green" />
        ) : (
          <View></View>
        )}
      </View>
    </ScrollView>
  );
};

// export default AttendeesCard;

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
    flex: 1,
    //height: 125,
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
  cardImgWrapper: {
    flex: 1,
    //padding:10,
    borderColor: "#fff",
    borderLeftWidth: 0,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
  iconWidth: {
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 14,
    width: 55,
    height: 55,
    borderRadius: 30,
  },
  cardImg: {
    height: "100%",
    width: "100%",
    borderColor: "#fff",
    alignSelf: "center",
    borderRadius: 8,
    flexDirection: "row",

    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderLeftWidth: 0,
  },
  cardImgWrapper1: {
    flex: 1,
    borderRightWidth: 0,
    borderColor: "#fff",
    borderLeftWidth: 0,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardImg1: {
    height: "100%",
    width: "100%",
    borderColor: "#fff",
    alignSelf: "center",
    borderRadius: 8,
    //borderBottomRightRadius: 0,
    //borderTopRightRadius: 0,
    //borderLeftWidth: 0,
  },
  cardText: {
    borderRadius: 8,
  },
  cardInfo: {
    flex: 3,
    padding: 10,
    borderColor: "#fff",
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 8,
    backgroundColor: "#fff",
    //borderBottomRightRadius: 0,
    //borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 24,
  },
  cardDetails: {
    fontSize: 13,
    // fontWeight:'600',
    color: "#444",
  },
  cardDesg: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
    lineHeight: 20,
  },
  attendeeSize: {
    width: 25,
    height: 25,
    margin: 0,
  },
  attendeeIcon: {
    marginTop: 12,
    marginLeft: 5,
    padding: 2,
  },
  attendeeSize1: {
    // width:30,
    height: 28,

    marginTop: 5,
    marginRight: 15,
  },
});

const mapStateToProps = (state) => {
  return {
    event: state.Event,
  };
};
export default connect(mapStateToProps)(AttendeesCard);
