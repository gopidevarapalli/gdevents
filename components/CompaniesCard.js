import React, { useState } from "react";
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
import { useNavigation, useTheme } from "@react-navigation/native";
import { Button, TextInput } from "react-native-paper";
import IonIcon from "react-native-vector-icons/Ionicons";
import Axios from "axios";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import store from "./../redux/store";
import api_url from "../Config/Config";
import { FlatList } from "react-native-gesture-handler";
import { connect } from "react-redux";

const CompaniesCard = (props) => {
  //console.log("companies card props", props);
  const theme = useTheme();

  const navigation = useNavigation();

  const [companies, setCompanies] = useState(props.Companies);
  const [isLoading, setisLoading] = useState(false);

  const [loadmore, setLoadmore] = useState(false);

  const [searchLoad, setSearchLoad] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [spage, setSpage] = useState(1);

  const getMore = () => {
    console.log("comapnies get more");
    console.log(searchWord);
    if (searchWord == "" && companies.length > 4) {
      setLoadmore(true);
      const formData = new FormData();
      formData.append("cookie", props.login.cookie);
      formData.append("event_id", props.event.common.event.event_id_single);
      formData.append("spage", spage + 1);

      AsyncStorage.getItem("event_id").then((event_id) => {
        formData.append("event_id", event_id);
        formData.append("event_id", props.event.common.event.event_id_single);
        Axios.post(`${api_url.companies}`, formData).then((res) => {
          console.log("rreee", res.data.companies);
          setCompanies(res.data.companies);
          setLoadmore(false);
          setSpage(spage + 1);
        });
      });
    }
  };

  const bookmark = (company) => {
    console.log("bookmark", company);
    const formData = new FormData();
    formData.append("cookie", props.login.cookie);
    formData.append("bookmarktype", "companies");
    formData.append("status", company.bookmarkstatus ? 0 : 1);
    formData.append("title", company.company_name);
    formData.append("id", company.company_id);
    formData.append("event_id", props.event.common.event.event_id_single);
    // console.log(company)
    AsyncStorage.getItem("event_id").then((event_id) => {
      formData.append("event_id", event_id);
      Axios.post(`${api_url.bookmark}`, formData).then((res) => {
        // console.log(res.data);
        if (res.data.status === "ok") {
          Alert.alert("Success", res.data.message);
          setisLoading(true);
          Axios.post(`${api_url.companies}`, formData).then((res) => {
            console.log("companies bookmark", res.data);
            setCompanies(res.data.companies ? res.data.companies : []);
            setisLoading(false);
          });
        }
        if (res.data.error) {
          Alert.alert("Success", res.data.error);
        }
      });
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

    Axios.post(`${api_url.companiesSearch}`, formData).then((res) => {
      console.log("search", res);
      setCompanies(res.data.companies ? res.data.companies : []);
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
        <Text>{companies.length ? "" : "No data found"}</Text>
        {/* <Text style={styles.cardTitle}>Companies </Text> */}
        {searchLoad ? (
          <ActivityIndicator size="large" color="green" />
        ) : (
          <FlatList
            onEndReached={() => getMore()}
            keyExtractor={(item, i) => i}
            data={companies}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <View style={styles.card}>
                  <View style={styles.cardInfo}>
                    {/* <TouchableOpacity
                      style={{ alignSelf: "flex-end" }}
                      onPress={() => bookmark(item)}
                    >
                      {isLoading ? (
                        <ActivityIndicator size="small" color="green" />
                      ) : (
                        <IonIcon
                          name={
                            item.bookmarkstatus
                              ? "bookmark"
                              : "bookmark-outline"
                          }
                          size={22}
                          color="#1E1727"
                        />
                      )}
                    </TouchableOpacity> */}
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("companyDetails", {
                          id: item.company_id,
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
                          Classification :
                        </Text>{" "}
                      </Text>
                      <Text numberOfLines={2} style={styles.cardDetails}>
                        {item.classification}
                      </Text>
                      <Text style={styles.cardDetails}>
                        <Text style={{ fontWeight: "bold", lineHeight: 18 }}>
                          Country :
                        </Text>{" "}
                      </Text>
                      <Text style={styles.cardDetails}>{item.country}</Text>
                      {/* <Text style={styles.cardDetails}>
                  <Text style={{fontWeight:'bold' , lineHeight:18}}>Attendees :</Text>  {item.attende_count}  
                </Text>
                <Text style={styles.cardDetails}>
                  <Text style={{fontWeight:'bold' , lineHeight:18}}>Products :</Text>  {item.product_count}  
                </Text> */}
                    </TouchableOpacity>

                    <View style={{ flexDirection: "row" }}></View>

                    <TouchableOpacity
                      style={{ alignSelf: "flex-end" }}
                      onPress={() => bookmark(item)}
                    >
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
                        {isLoading ? (
                          <ActivityIndicator size="small" color="green" />
                        ) : (
                          <MaterialIcons
                            style={{
                              marginTop: 15,
                              alignSelf: "center",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            name={
                              item.bookmarkstatus
                                ? "favorite"
                                : "favorite-border"
                            }
                            size={30}
                            color="#1E1727"
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
        {loadmore ? (
          <ActivityIndicator size="large" color="green" />
        ) : (
          <View></View>
        )}
      </View>
    </ScrollView>
  );
};

// export default CompaniesCard;

const mapStateToProps = (state) => {
  return { login: state.login, event: state.Event };
};

// export default AgendaDetails;

export default connect(mapStateToProps)(CompaniesCard);

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
  iconWidth: {
    alignSelf: "center",
    // justifyContent:'center',
    // marginTop:14,
    marginBottom: 10,
    width: 300,
    height: 35,
    //marginLeft:10,
    //borderRadius:30
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
  clientlogo: {
    marginTop: 20,
    //borderBottomWidth: 1,
  },
  cardImg1: {
    height: 100,
    width: 100,
    borderColor: "#fff",

    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    borderLeftWidth: 0,
  },
  cardText: {
    borderRadius: 8,
  },
  cardInfo: {
    flex: 1,
    //padding: 10,
    borderColor: "#fff",
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  cardTitle: {
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 34,
  },
  cardDetails: {
    paddingHorizontal: 10,
    fontSize: 13,
    // fontWeight:'600',
    color: "#444",
    marginBottom: 3,
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
