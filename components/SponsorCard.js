import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Alert,
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  BackHandler,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Buttony, TextInput, Searchbar } from "react-native-paper";
import IonIcon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import store from "../redux/store";
import Axios from "axios";
import api_url from "../Config/Config";
import HTML from "react-native-render-html";
import { useDispatch } from "react-redux";
import { GetRefreshAction } from "../redux/action/actions";

const SponsorCard = (props) => {
  const theme = useTheme();

  const navigation = useNavigation();

  const dispatch = useDispatch();

  //console.log("sponsor card props", props);
  // const [Sponsors, setSpeakers] = useState(props.SponsorsData);
  const [searchWord, setsearchWord] = useState("");
  const [searchLoad, setSearchLoad] = useState(false);
  const [recordCount, setRecordCount] = useState(1);
  const [loadMore, setIsLoadMore] = useState(false);

  const [SponsorsDta, setSponsors] = useState(props.sponsorsData);
  const [isLoading, setIsLoading] = useState(false);
  console.log("sponsors data", SponsorsDta);

  console.log("SponsorData line 34", Object.keys(SponsorsDta));

  const SponsorKeysData = Object.keys(SponsorsDta);

  // useEffect(()=>{
  //   console.log('sponsors called');
  //   console.log(SponsorsDta)
  //     // console.log(Sponsors)
  // },[])

  // const bookmark = (sponsor)=>{
  //   const formData = new FormData();
  //   formData.append('cookie',store.getState().login.cookie);
  //   formData.append('bookmarktype','products');
  //   formData.append('status',sponsor.bookmarkstatus?0:1);
  //   formData.append('title',sponsor.company);
  //   formData.append('id',sponsor.id);
  //   console.log(sponsor)
  //   Axios.post(`https://ind-backend-events-website.pantheonsite.io/api/user/add_bookmarks`, formData)
  //   .then(res=>{
  //     // console.log(res.data);
  //       if(res.data.status === "ok"){
  //         Alert.alert('Success', res.data.message);
  //           Axios
  //           .post(`https://ind-backend-events-website.pantheonsite.io/api/user/get_sponsors`, formData)
  //           .then(res =>{
  //               setSponsors(res.data.products);
  //           });
  //       }
  //       if(res.data.error){
  //         Alert.alert('Success', res.data.error);
  //       }
  //   })

  // }

  // function handleBackButtonClick() {
  //   console.log("back button pressed");
  //   navigation.navigate("Home");
  //   return true;
  // }

  useEffect(() => {
    // BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    console.log("sponsors list", props.sponsorsData);
    console.log("event_id", props.event.common.event.event_id_single);
  }, []);

  const getMore = () => {
    if (searchWord === "" && SponsorsDta.length >= 9) {
      setIsLoadMore(true);

      const formData = new FormData();
      formData.append("cookie", store.getState().login.cookie);
      formData.append("spage", recordCount + 1);
      // alert(event_id);
      formData.append("event_id", props.event.common.event.event_id_single);
      Axios.post(`${api_url.sponsorsList}`, formData).then((res) => {
        console.log("get more sponsors res", res);
        setSponsors(res.data.sponsors_list);
        setRecordCount(recordCount + 1);
        setIsLoadMore(false);
      });
    }
  };

  const bookmark = (item) => {
    console.log("bookmark data", item);
    setIsLoading(true);
    const formData = new FormData();
    formData.append("cookie", props.login.cookie);
    formData.append("bookmarktype", "sponsors");
    formData.append("status", item.bookmarkstatus ? 0 : 1);
    formData.append("title", item.sponsorname);
    formData.append("id", item.id);

    formData.append("search_keyword", searchWord);
    formData.append("event_id", props.event.common.event.event_id_single);
    // console.log(exhibitor)

    console.log("cookie", props.login.cookie);
    console.log("bookmarktype", "sponsors");
    console.log("status", item.bookmarkstatus ? 0 : 1);
    console.log("title", item.sponsorname);
    console.log("id", item.id);
    console.log("event_id", props.event.common.event.event_id_single);
    console.log("url", api_url.bookmark);

    // formData.append('id',event_id);
    Axios.post(`${api_url.bookmark}`, formData).then((res) => {
      console.log("bookmark res", res.data, item.sponsorname);
      if (res.data.status === "ok") {
        Alert.alert("Success", res.data.message);
        Axios.post(`${api_url.sponsorsList}`, formData).then((res) => {
          console.log("sponsorsss list", res);
          setSponsors(res.data.sponsors_list);
          dispatch(GetRefreshAction(true));
        });
      }
      if (res.data.error) {
        Alert.alert("Success", res.data.error);
      }
    });
  };

  const searchData = (val) => {
    console.log("vvvvvvvvv", val);
    setSearchLoad(true);
    setsearchWord(val);

    const formData = new FormData();
    formData.append("cookie", store.getState().login.cookie);
    formData.append("search_keyword", val);
    formData.append("spage", 1);
    formData.append("event_id", props.event.common.event.event_id_single);

    Axios.post(`${api_url.sponsorsList}`, formData).then((res) => {
      console.log("====== search sponsor response start");
      console.log("search sponsor res", res);
      console.log(res.data);
      console.log("====== search response end");
      setSponsors(res.data.sponsors_list == null ? [] : res.data.sponsors_list);
      setSearchLoad(false);
      // setisLoading(false);
    });
  };

  const regex = /(<([^>]+)>)/gi;

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />

      <View style={styles.cardsWrapper}>
        <View style={{ width: "90%", alignSelf: "center", marginTop: 10 }}>
          <Searchbar
            placeholder="Search"
            onChangeText={(val) => searchData(val)}
            value={searchWord}
            // style={{
            //   backgroundColor: "white",
            //   borderRadius: 10,
            //   height: 50,
            //   borderColor: "black",
            // }}
          />

          <Text>{SponsorKeysData.length ? "" : "No data found"}</Text>
        </View>
        {searchLoad ? (
          <ActivityIndicator size="large" color="green" />
        ) : (
          <FlatList
            onEndReached={() => getMore()}
            keyExtractor={(item, i) => i}
            data={SponsorKeysData}
            renderItem={({ item }) => {
              console.log("gggggggggg", SponsorsDta);
              return (
                <View>
                  {SponsorsDta[item].length ? (
                    <Text style={styles.stitle}>{item} Sponsors :</Text>
                  ) : null}
                  {SponsorsDta[item].map((data, i) => {
                    console.log(data.id);
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("SponsorDetail", { id: data.id })
                        }
                        //style={styles.scardinfo}
                        key={i}
                      >
                        <View style={styles.card}>
                          <View style={styles.cardInfo}>
                            <View style={styles.clientlogo}>
                              <Image
                                source={{ uri: data.SponsorLogo }}
                                resizeMode="contain"
                                style={styles.iconWidth}
                              />
                            </View>

                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate("SponsorDetail", {
                                  id: data.id,
                                })
                              }
                            >
                              <Text style={styles.cardTitle}>
                                {data.sponsorname}
                              </Text>

                              <View>
                                {data.SponsorBio == "" ? null : (
                                  <HTML
                                    tagsStyles={{
                                      p: {
                                        lineHeight: 22,
                                        fontSize: 13,
                                        color: "#444",
                                        paddingHorizontal: 10,
                                        // marginBottom: 3,
                                      },
                                    }}
                                    html={
                                      "<p>" +
                                        data.SponsorBio.substring(
                                          0,
                                          155
                                        ).replace(regex, "") + (data.SponsorBio.length >50 ? "..." : "" )+
                                         "</p>"
                                    }
                                    imagesMaxWidth={
                                      Dimensions.get("window").width
                                    }
                                  />
                                )}
                              </View>

                              {/* <Text numberOfLines={3} style={styles.cardDetails}>
                      <HTML source={{ html: data.SponsorBio }} />
                      {data.SponsorBio}
                    </Text> */}
                              {/* <Text style={[styles.cardDetails, { marginTop: 10 }]}>
                    <Text style={{ fontWeight: "bold", lineHeight: 18 }}>
                      Classification :
                    </Text>{" "}
                  </Text> */}
                              {/* <Text style={styles.cardDetails}></Text> */}
                              <View style={{ flex: 1, flexDirection: "row" }}>
                                <View
                                  style={{ flex: 1, flexDirection: "column" }}
                                >
                                  <Text style={styles.cardDetails}>
                                    <Text
                                      style={{
                                        fontWeight: "bold",
                                        lineHeight: 18,
                                      }}
                                    >
                                      Country :
                                    </Text>{" "}
                                  </Text>
                                  <Text style={styles.cardDetails}>
                                    {data.country}
                                  </Text>
                                </View>

                                <TouchableOpacity
                                  style={{ alignSelf: "flex-end" }}
                                >
                                  <View style={styles.favorite}>
                                    <IonIcon
                                      onPress={() => bookmark(data)}
                                      style={styles.favoiteIcon}
                                      name={
                                        data.bookmarkstatus
                                          ? "bookmark"
                                          : "bookmark-outline"
                                      }
                                      size={30}
                                      color="#000"
                                    />
                                    {/* <Text style={{ textAlign: "center", fontSize: 11 }}>
                          Favourite
                        </Text> */}
                                  </View>
                                </TouchableOpacity>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              );
            }}
          />
        )}
      </View>
      {loadMore ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <View></View>
      )}

      {/* <Text style={styles.stitle}>Platinum Sponsors :</Text>
        {SponsorsDta.Platinum ? (
          SponsorsDta.Platinum.length == 0 ? (
            <View
              style={{
                flex: 1,
                textAlign: "center",
                textAlignVertical: "center",
              }}
            >
              <Text
                style={{
                  flex: 1,
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              >
                No Data found
              </Text>
            </View>
          ) : (
            SponsorsDta.Platinum.map((platinum, i) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("SponsorDetail", { id: platinum.id })
                }
                //style={styles.scardinfo}
                key={i}
              >
                <View style={styles.card}>
                  <View style={styles.cardInfo}>
                    <View style={styles.clientlogo}>
                      <Image
                        source={{ uri: platinum.SponsorLogo }}
                        resizeMode="contain"
                        style={styles.iconWidth}
                      />
                    </View>

                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("SponsorDetail", {
                          id: platinum.id,
                        })
                      }
                    >
                      <Text style={styles.cardTitle}>
                        {platinum.sponsorname}
                      </Text>

                      <View>
                        <HTML
                          tagsStyles={{
                            p: {
                              lineHeight: 22,
                              fontSize: 13,
                              color: "#444",
                              paddingHorizontal: 10,
                              marginBottom: 3,
                            },
                          }}
                          html={
                            "<p>" +
                            platinum.SponsorBio.substring(0, 155) +
                            "<p>"
                          }
                          imagesMaxWidth={Dimensions.get("window").width}
                        />
                      </View> */}

      {/* <Text numberOfLines={3} style={styles.cardDetails}>
                        <HTML source={{ html: platinum.SponsorBio }} />
                        {platinum.SponsorBio}
                      </Text> */}
      {/* <Text style={[styles.cardDetails, { marginTop: 10 }]}>
                      <Text style={{ fontWeight: "bold", lineHeight: 18 }}>
                        Classification :
                      </Text>{" "}
                    </Text> */}
      {/* <Text style={styles.cardDetails}></Text>
                      <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={{ flex: 1, flexDirection: "column" }}>
                          <Text style={styles.cardDetails}>
                            <Text
                              style={{ fontWeight: "bold", lineHeight: 18 }}
                            >
                              Country :
                            </Text>{" "}
                          </Text>
                          <Text style={styles.cardDetails}>
                            {platinum.country}
                          </Text>
                        </View>

                        <TouchableOpacity style={{ alignSelf: "flex-end" }}>
                          <View style={styles.favorite}>
                            <MaterialIcons
                              onPress={() => bookmark(platinum)}
                              style={styles.favoiteIcon}
                              name={
                                platinum.bookmarkstatus
                                  ? "favorite"
                                  : "favorite-border"
                              }
                              size={30}
                              color="#000"
                            /> */}
      {/* <Text style={{ textAlign: "center", fontSize: 11 }}>
                            Favourite
                          </Text> */}
      {/* </View>
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )
        ) : (
          <Text></Text>
        )} */}

      {/* <View style={styles.cardsWrapper}>
        <View>
          <Text style={styles.stitle}>Gold Sponsors : </Text>
        </View>

        <View>
          {SponsorsDta.Gold ? (
            SponsorsDta.Gold.length == 0 ? (
              <View
                style={{
                  flex: 1,
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  No Data found
                </Text>
              </View>
            ) : (
              SponsorsDta.Gold.map((gold, i) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("SponsorDetail", { id: gold.id })
                  }
                  //style={styles.scardinfo}
                  key={i}
                >
                  <View style={styles.card}>
                    <View style={styles.cardInfo}>
                      <View style={styles.clientlogo}>
                        <Image
                          source={{ uri: gold.SponsorLogo }}
                          resizeMode="contain"
                          style={styles.iconWidth}
                        />
                      </View>

                      <Text style={styles.cardTitle}>{gold.sponsorname}</Text>

                      <Text numberOfLines={2} style={styles.cardDetails}>
                        {gold.SponsorBio}
                      </Text> */}
      {/* <Text style={[styles.cardDetails, { marginTop: 10 }]}>
                        <Text style={{ fontWeight: "bold", lineHeight: 18 }}>
                          Classification :
                        </Text>{" "}
                      </Text> */}
      {/* <Text style={styles.cardDetails}></Text>
                      <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={{ flex: 1, flexDirection: "column" }}>
                          <Text style={styles.cardDetails}>
                            <Text
                              style={{ fontWeight: "bold", lineHeight: 18 }}
                            >
                              Country :
                            </Text>{" "}
                          </Text>
                          <Text style={styles.cardDetails}>{gold.country}</Text>
                        </View>

                        <TouchableOpacity style={{ alignSelf: "flex-end" }}>
                          <View style={styles.favorite}>
                            <MaterialIcons
                              onPress={() => bookmark(gold)}
                              style={styles.favoiteIcon}
                              name={
                                gold.bookmarkstatus
                                  ? "favorite"
                                  : "favorite-border"
                              }
                              size={30}
                              color="#000"
                            /> */}
      {/* <Text style={{ textAlign: "center", fontSize: 11 }}>
                        Favourite
                      </Text> */}
      {/* </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )
          ) : (
            <Text></Text>
          )}
        </View>
      </View> */}

      {/* <View style={styles.cardsWrapper}>
        <View>
          <Text style={styles.stitle}>Silver Sponsors : </Text>
        </View>

        <View>
          {SponsorsDta.Silver ? (
            SponsorsDta.Silver.length == 0 ? (
              <View
                style={{
                  flex: 1,
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  No Data found
                </Text>
              </View>
            ) : (
              SponsorsDta.Silver.map((silver, i) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("SponsorDetail", { id: silver.id })
                  }
                  //style={styles.scardinfo}
                  key={i}
                >
                  <View style={styles.card}>
                    <View style={styles.cardInfo}>
                      <View style={styles.clientlogo}>
                        <Image
                          source={{ uri: silver.SponsorLogo }}
                          resizeMode="contain"
                          style={styles.iconWidth}
                        />
                      </View>

                      <Text style={styles.cardTitle}>{silver.sponsorname}</Text>

                      <Text numberOfLines={2} style={styles.cardDetails}>
                        {silver.SponsorBio}
                      </Text> */}
      {/* <Text style={[styles.cardDetails, { marginTop: 10 }]}>
                        <Text style={{ fontWeight: "bold", lineHeight: 18 }}>
                          Classification :
                        </Text>{" "}
                      </Text> */}
      {/* <Text style={styles.cardDetails}></Text>
                      <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={{ flex: 1, flexDirection: "column" }}>
                          <Text style={styles.cardDetails}>
                            <Text
                              style={{ fontWeight: "bold", lineHeight: 18 }}
                            >
                              Country :
                            </Text>{" "}
                          </Text>
                          <Text style={styles.cardDetails}>
                            {silver.country}
                          </Text>
                        </View>

                        <TouchableOpacity style={{ alignSelf: "flex-end" }}>
                          <View style={styles.favorite}>
                            <MaterialIcons
                              onPress={() => bookmark(silver)}
                              style={styles.favoiteIcon}
                              name={
                                silver.bookmarkstatus
                                  ? "favorite"
                                  : "favorite-border"
                              }
                              size={30}
                              color="#000"
                            /> */}
      {/* <Text style={{ textAlign: "center", fontSize: 11 }}>
                        Favourite
                      </Text> */}
      {/* </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )
          ) : (
            <Text></Text>
          )}
        </View>
      </View> */}

      {/* <View style={styles.cardsWrapper}>
        <View>
          <Text style={styles.stitle}>Bronze Sponsors : </Text>
        </View>

        <View>
          {SponsorsDta.Bronze ? (
            SponsorsDta.Bronze.length == 0 ? (
              <View
                style={{
                  flex: 1,
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    textAlign: "center",
                    textAlignVertical: "center",
                    marginBottom: 20,
                  }}
                >
                  No Data found
                </Text>
              </View>
            ) : (
              SponsorsDta.Bronze.map((bronze, i) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("SponsorDetail", { id: bronze.id })
                  }
                  //style={styles.scardinfo}
                  key={i}
                >
                  <View style={styles.card}>
                    <View style={styles.cardInfo}>
                      <View style={styles.clientlogo}>
                        <Image
                          source={{ uri: bronze.SponsorLogo }}
                          resizeMode="contain"
                          style={styles.iconWidth}
                        />
                      </View>

                      <Text style={styles.cardTitle}>{bronze.sponsorname}</Text>

                      <Text numberOfLines={2} style={styles.cardDetails}>
                        {bronze.SponsorBio}
                      </Text> */}
      {/* <Text style={[styles.cardDetails, { marginTop: 10 }]}>
                        <Text style={{ fontWeight: "bold", lineHeight: 18 }}>
                          Classification :
                        </Text>{" "}
                      </Text> */}
      {/* <Text style={styles.cardDetails}></Text>
                      <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={{ flex: 1, flexDirection: "column" }}>
                          <Text style={styles.cardDetails}>
                            <Text
                              style={{ fontWeight: "bold", lineHeight: 18 }}
                            >
                              Country :
                            </Text>{" "}
                          </Text>
                          <Text style={styles.cardDetails}>
                            {bronze.country}
                          </Text>
                        </View>

                        <TouchableOpacity style={{ alignSelf: "flex-end" }}>
                          <View style={styles.favorite}>
                            <MaterialIcons
                              onPress={() => bookmark(bronze)}
                              style={styles.favoiteIcon}
                              name={
                                bronze.bookmarkstatus
                                  ? "favorite"
                                  : "favorite-border"
                              }
                              size={30}
                              color="#000"
                            /> */}
      {/* <Text style={{ textAlign: "center", fontSize: 11 }}>
                        Favourite
                      </Text> */}
      {/* </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )
          ) : (
            <Text></Text>
          )}
        </View>
      </View> */}
    </ScrollView>
  );
};

export default SponsorCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#05CB9A",
    alignSelf: "center",
    padding: 5,
    lineHeight: 25,
  },
  scardinfo: {
    height: 100,
    width: "50%",
    backgroundColor: "#fff",
  },
  scard: {
    flex: 1,
    //width:"98%",
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  attendeeBtn1: {},
  cardsWrapper: {
    marginTop: 20,
    width: "98%",
    alignSelf: "center",
  },
  card: {
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    marginVertical: 10,
    flexDirection: "row",
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    //borderWidth: 0.7,
    borderColor: "#ddd",
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
  iconWidth: {
    alignSelf: "center",
    margin: 10,
    // justifyContent:'center',
    // marginTop:14,
    marginBottom: 10,
    width: 300,
    height: 35,
    //marginLeft:10,
    //borderRadius:30
  },
  cardTitle: {
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 34,
    color: "#05CB9A",
  },
  cardDetails: {
    paddingHorizontal: 10,
    fontSize: 13,
    // fontWeight:'600',
    color: "#444",
    marginBottom: 3,
  },
  favorite: {
    alignSelf: "flex-end",
    height: 70,
    width: 70,
    borderColor: "#ddd",
    borderWidth: 0.7,
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  favoiteIcon: {
    marginTop: 15,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  card1: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    height: 200,
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    marginVertical: 10,
  },

  attendeeSize: {
    width: 200,
    height: 45,
    maxWidth: "100%",
    // marginRight:15,
    // flex:1,
  },
});
