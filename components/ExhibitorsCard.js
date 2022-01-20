import React, { useState } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Alert,
  TouchableHighlight,
  AsyncStorage,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Button, TextInput } from "react-native-paper";
import IonIcon from "react-native-vector-icons/Ionicons";
import store from "./../redux/store";
import Axios from "axios";
import api_url from "../Config/Config";
import { FlatList } from "react-native-gesture-handler";
import { connect } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import { TouchableHighlight } from 'react-native-gesture-handler';

const ExhibitorsCard = (props) => {
  const theme = useTheme();

  const navigation = useNavigation();

  //console.log("exhibitor card props", props);
  const [Exhibitors, setExhibitors] = useState(props.Exhibitors);
  const [isLoading, setIsLoading] = useState(false);

  const [searchLoad, setSearchLoad] = useState(false);

  const [spage, setSpage] = useState(1);

  const [loadMore, setLoadmore] = useState(false);

  const [searchWord, setSearchWord] = useState("");

  const getMore = () => {
    if (searchWord == "" && Exhibitors.length > 4) {
      setLoadmore(true);
      const formData = new FormData();
      formData.append("cookie", props.login.cookie);
      formData.append("spage", spage + 1);

      formData.append("event_id", props.event.common.event.event_id_single);
      Axios.post(`${api_url.exhibitors}`, formData).then((res) => {
        // console.log(res.data.exhibitor)
        setExhibitors(res.data.exhibitor);
        setSpage(spage + 1);
        setLoadmore(false);
      });
    }
  };

  const bookmark = (item) => {
    console.log("bookmark data", item);
    setIsLoading(true);
    const formData = new FormData();
    formData.append("cookie", props.login.cookie);
    formData.append("bookmarktype", "exhibitors");
    formData.append("status", item.bookmarkstatus ? 0 : 1);
    formData.append("title", item.company_name);
    formData.append("id", item.id);
    formData.append("event_id", props.event.common.event.event_id_single);
    // console.log(exhibitor)

    // formData.append('id',event_id);
    Axios.post(`${api_url.bookmark}`, formData).then((res) => {
      // console.log(res.data);
      if (res.data.status === "ok") {
        Alert.alert("Success", res.data.message);
        Axios.post(`${api_url.exhibitors}`, formData).then((res) => {
          setExhibitors(res.data.exhibitor);
        });
      }
      if (res.data.error) {
        Alert.alert("Success", res.data.error);
      }
    });
  };

  const searchData = (val) => {
    setSearchWord(val);
    setSearchLoad(true);
    const formData = new FormData();
    formData.append("cookie", props.login.cookie);
    formData.append("search_keyword", val);
    formData.append("spage", 1);
    formData.append("event_id", props.event.common.event.event_id_single);

    Axios.post(`${api_url.exhibitorsSearch}`, formData).then((res) => {
      console.log("sse", res.data);
      setExhibitors(res.data.exhibitors ? res.data.exhibitors : []);
      setSearchLoad(false);
      // setisLoading(false);
    });
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
      <View style={styles.cardsWrapper}>
        <View>
          <TextInput
            placeholder="Search.."
            onChangeText={(val) => searchData(val)}
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              height: 50,
              borderColor: "black",
            }}
          />
        </View>
        <Text>{Exhibitors.length ? "" : "No data found"}</Text>
        {searchLoad ? (
          <ActivityIndicator size="large" color="green" />
        ) : (
          <FlatList
            onEndReached={() => getMore()}
            keyExtractor={(item, i) => i}
            data={Exhibitors}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ExhibitorsDetail", {
                    //id: searchWord == "" ? item.id : item.company_id,
                    id: item.company_id,
                  })
                }
              >
                <View style={styles.card}>
                  <View style={styles.cardInfo}>
                    {/* <View style={{ alignSelf: "flex-end" }}>
                      <TouchableOpacity
                        style={{ alignSelf: "flex-end" }}
                        onPress={() => bookmark(item)}
                      >
                        <IonIcon
                          name={
                            item.bookmarkstatus
                              ? "bookmark"
                              : "bookmark-outline"
                          }
                          size={22}
                          color="#1E1727"
                        />
                      </TouchableOpacity>
                    </View> */}
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("ExhibitorsDetail", {
                          //id: searchWord == "" ? item.id : item.company_id,
                          id: item.id,
                        })
                      }
                    >
                      <View style={styles.clientlogo}>
                        <Image
                          source={{ uri: item.company_logo }}
                          resizeMode="contain"
                          style={styles.iconWidth}
                        />
                      </View>
                      <Text style={styles.cardTitle}>{item.company_name}</Text>
                      <Text numberOfLines={2} style={styles.cardDetails}>
                        {item.company_bio}
                      </Text>
                      <Text style={[styles.cardDetails, { marginTop: 10 }]}>
                        <Text style={{ fontWeight: "bold", lineHeight: 18 }}>
                          Type :
                        </Text>{" "}
                      </Text>
                      <Text style={styles.cardDetails}>
                        {item.exhibitor_type}
                      </Text>
                      <Text style={styles.cardDetails}>
                        <Text style={{ fontWeight: "bold", lineHeight: 18 }}>
                          Country :
                        </Text>{" "}
                      </Text>
                      <Text style={styles.cardDetails}>{item.country}</Text>
                      <View style={{ flexDirection: "row" }}></View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ alignSelf: "flex-end" }}>
                      <View
                        style={{
                          alignSelf: "flex-end",
                          height: 70,
                          width: 70,
                          borderColor: "#ddd",
                          borderWidth: 0.7,
                          borderBottomWidth: 0,
                          borderRightWidth: 0,
                          //backgroundColor: "#ddd",
                        }}
                      >
                        <MaterialIcons
                          onPress={() => bookmark(item)}
                          style={{
                            marginTop: 15,
                            alignSelf: "center",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          name={
                            item.bookmarkstatus ? "favorite" : "favorite-border"
                          }
                          size={30}
                          color="#1E1727"
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )}
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
    //height: 210,
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
    //padding:10,
    borderColor: "#fff",
    borderLeftWidth: 0,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
  clientlogo: {
    marginTop: 5,
    //borderBottomWidth: 1,
  },
  iconWidth: {
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 14,
    marginBottom: 10,
    width: 300,
    height: 35,
    marginLeft: 10,
  },
  cardImg: {
    height: "100%",
    width: "100%",
    borderColor: "#fff",
    alignSelf: "center",
    borderRadius: 8,
    flexDirection: "column",

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
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    borderLeftWidth: 0,
  },
  cardText: {
    borderRadius: 8,
  },
  cardInfo: {
    flex: 3,
    //padding: 10,
    borderColor: "#fff",
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 8,
    backgroundColor: "#fff",
    //borderBottomRightRadius: 0,
    //borderTopRightRadius: 0,
    //borderBottomLeftRadius: 0,
    //borderTopLeftRadius: 0,
  },
  cardTitle: {
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 24,
  },
  cardDetails: {
    paddingHorizontal: 10,
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
    width: 20,
    height: 20,
    marginRight: 15,
  },
  attendeeIcon: {
    marginTop: 8,
    //  marginRight:35
  },
  speakerIcon: {
    marginTop: 10,
    alignSelf: "flex-end",
    paddingRight: 15,
  },
});

// export default ExhibitorsCard;

const mapStateToProps = (state) => {
  return {
    exhibitors: state.Exhibitors,
    login: state.login,
    event: state.Event,
  };
};
export default connect(mapStateToProps)(ExhibitorsCard);
