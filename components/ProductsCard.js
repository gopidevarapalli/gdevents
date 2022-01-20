import React, { useEffect, useState } from "react";
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
  AsyncStorage,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Button, TextInput } from "react-native-paper";
import IonIcon from "react-native-vector-icons/Ionicons";
import store from "../redux/store";
import Axios from "axios";
import api_url from "../Config/Config";
import { connect } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import {decode} from 'html-entities';

const ProductsCard = (props) => {
  const theme = useTheme();

  const navigation = useNavigation();

  console.log("products card", props);
  const [Products, setProducts] = useState(props.Products);

  const [searchWord, setsearchWord] = useState("");
  const [searchLoad, setSearchLoad] = useState(false);
  const [loadMore, setLoadmore] = useState(false);
  let [spage, setSpage] = useState(1);

  useEffect(() => {
    //console.log(Products);
  }, []);

  const [isLoading, setisLoading] = useState(false);

  const getMore = () => {
    //console.log("products get more called");

    if (Products.length > 4) {
      setLoadmore(true);
      const formData = new FormData();
      formData.append("cookie", props.login.cookie);
      formData.append("spage", spage + 1);
      formData.append("event_id", props.event.common.event.event_id_single);

      Axios.post(`${api_url.productList}`, formData).then((res) => {
        console.log("Products get more", res.data);
        setProducts(res.data.products);
        setSpage(spage + 1);
        setLoadmore(false);
      });
    }
  };

  const bookmark = (company) => {
    const formData = new FormData();
    formData.append("cookie", props.login.cookie);
    formData.append("bookmarktype", "products");
    formData.append("status", company.bookmark_status ? 0 : 1);
    formData.append("title", company.product_title);
    formData.append("id", company.product_id);

    formData.append("event_id", props.event.common.event.event_id_single);
    Axios.post(`${api_url.bookmark}`, formData).then((res) => {
      // console.log("bookmark res", res.data);
      if (res.data.status === "ok") {
        Alert.alert("Success", res.data.message);
        setisLoading(true);
        Axios.post(`${api_url.productList}`, formData).then((res) => {
          // console.log("Products after bookmark",res.data)
          setProducts(res.data.products);
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
    setsearchWord(val);

    if (val == "") {
      setProducts(props.Products);
      setSearchLoad(false);
    } else {
      const formData = new FormData();
      formData.append("cookie", props.login.cookie);
      formData.append("event_id", props.event.common.event.event_id_single);
      formData.append("search_keyword", val);
      formData.append("spage", 1);

      Axios.post(`${api_url.productSearch}`, formData).then((res) => {
        // console.log(res.data)
        setProducts(
          res.data.products
            ? res.data.products == null
              ? []
              : res.data.products
            : []
        );
        setSearchLoad(false);
        // setisLoading(false);
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
      <View style={styles.cardsWrapper}>
        {/* <Text style={styles.cardTitle}>Products </Text> */}
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
          <Text>{Products.length ? "" : "No data found"}</Text>
        </View>

        {searchLoad ? (
          <ActivityIndicator size="large" color="green" />
        ) : (
          <FlatList
            onEndReached={() => getMore()}
            data={Products}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ProductsDetail", {
                      id: item.product_id,
                    })
                  }
                >
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
                              item.bookmark_status
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
                          navigation.navigate("ProductsDetail", {
                            id: item.product_id,
                          })
                        }
                      >
                        <View style={styles.clientlogo}>
                          <Image
                            source={{ uri: item.product_image }}
                            resizeMode="cover"
                            style={styles.iconWidth}
                          />
                        </View>

                        <Text numberOfLines={1} style={styles.cardTitle}>
                          {item.product_title}
                        </Text>

                        <Text style={styles.cardDetails}>
                          <Text style={{ fontWeight: "bold", lineHeight: 18 }}>
                            Product Type :
                          </Text>{" "}
                        </Text>
                        <Text style={styles.cardDetails}>
                          {item.product_type}
                        </Text>
                        <Text style={styles.cardDetails}>
                          <Text style={{ fontWeight: "bold", lineHeight: 18 }}>
                            Licensing Type :
                          </Text>{" "}
                        </Text>
                        <Text style={styles.cardDetails}>
                          {item.licensing_type}
                        </Text>

                        <Text style={styles.cardDetails}>
                          <Text style={{ fontWeight: "bold", lineHeight: 18 }}>
                            Company :
                          </Text>{" "}
                        </Text>
                        <Text style={styles.cardDetails}>
                          {item.company_name}
                        </Text>
                        <View style={{ flexDirection: "row" }}></View>
                      </TouchableOpacity>

                      {/* <TouchableOpacity
                        style={{ alignSelf: "flex-end" }}
                        onPress={() => bookmark(item)}
                      >
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
                      </TouchableOpacity> */}

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
                                item.bookmark_status
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
              );
            }}
          />
        )}

        {/* <View style={{ alignSelf: 'flex-end',}}>
        <Button style={{marginTop:8,marginBottom:12 ,width:120,borderRadius:15}} color="#00DEA5"
          contentStyle={{ height: 34,  }}
          labelStyle={{ color: "#2F283D", fontSize: 12 }}mode="contained" onPress={() => console.log('Pressed')}>
           View More
          </Button> 
        </View> */}
      </View>
      {loadMore ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <View></View>
      )}
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    login: state.login,
    event: state.Event,
  };
};

export default connect(mapStateToProps)(ProductsCard);

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
    //height: 200,
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
    marginTop: 5,
    marginBottom: 8,
    width: 205,
    height: 55,
    marginLeft: 10,
    // borderRadius:30
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
