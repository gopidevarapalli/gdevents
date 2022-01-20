import React, { useEffect, useState } from "react";
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Linking,
  Alert,
} from "react-native";

// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import EvilIcons from "react-native-vector-icons/EvilIcons";
// import AntDesign from "react-native-vector-icons/AntDesign";

// import { useTheme } from "@react-navigation/native";
// import { Button } from "react-native-paper";
// import IonIcon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import Axios from "axios";
import api_url from "../Config/Config";
import { SafeAreaView } from "react-native-safe-area-context";
// import { WebView } from "react-native-webview";
import HTML from "react-native-render-html";

const SponsorCardDetail = (props) => {
  // const theme = useTheme();

  console.log("sponsor details", props);
  const [sponsors, setsponsors] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [sponsorfavIDProp, setSponsorFavIDProp] = useState(
    props.route.params.sponsor_id
  );

  // if(isLoading){
  //   props.GetUserInfoAction(props.login.cookie, props.route.params.user_id);
  // }

  useEffect(() => {
    console.log("from favorites", props.route.params.sponsor_id);
    console.log("sponsor id", props.route.params.id);

    if (sponsorfavIDProp) {
    }
    // alert(props.route.params.id)
    let formData = new FormData();
    formData.append("cookie", props.login.cookie);
    if (sponsorfavIDProp) {
      formData.append("sponsor_id", props.route.params.sponsor_id);
    } else {
      formData.append("sponsor_id", props.route.params.id);
    }
    formData.append("event_id", props.event.common.event.event_id_single);

    Axios.post(`${api_url.sponsorDetail}`, formData).then((res) => {
      console.log("rrr", res);
      console.log("ress", res.data);
      if (res.data.status === "ok") {
        setsponsors(res.data.sponsors);
        setIsLoading(false);
      }
      if (res.data.error) {
        //Alert.alert("Success", res.data.error);
        setIsLoading(false);
      }
    });
  }, [props.route.params.id]);

  const regex = /(<([^>]+)>)/gi;

  return isLoading ? (
    <ActivityIndicator color="green" size="large" />
  ) : (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ padding: 20 }}>
          {/* <Text
            style={{
              //marginLeft: 8,
              color: "black",
              fontSize: 20,
              marginTop: 2,
            }}
          >
            Sponsor Detail
          </Text>
          <View
            style={{
              borderBottomColor: "#20c997",
              borderBottomWidth: 2,
              marginTop: 10,
              width: 130,
            }}
          ></View>

          <View style={{ marginTop: 10 }}></View> */}

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                color: "#09BA90",
                fontWeight: "bold",
                fontSize: 20,
                marginTop: 2,
                // marginLeft: 10,
              }}
            >
              {sponsors.Sponsorname}
            </Text>

            {/* <TouchableOpacity>
              <View
                style={{
                  borderRadius: 5,
                  height: 30,
                  width: 30,
                  backgroundColor: "#ddd",
                  borderRadius: 30,
                }}
              >
                <MaterialIcons
                  style={{ marginLeft: 5, marginTop: 4 }}
                  name="favorite"
                  size={20}
                  color="#000"
                />
              </View>
            </TouchableOpacity> */}
          </View>

          {/* <Text style={{ lineHeight: 24, fontSize: 15 }}>
          <HTML source={{ html: sponsors.sponsorbio }}  />
            {sponsors.sponsorbio}
          </Text> */}
          <View>
            <HTML
              tagsStyles={{
                p: {
                  lineHeight: 24,
                  fontSize: 15,
                  color: "#444",
                  marginTop: 5,
                  padding: 0,
                },
              }}
              classesStyles={{ fontWeight: "500", color: "blue" }}
              html={"<p>" + sponsors.sponsorbio.replace(regex, "") + "</p>"}
              imagesMaxWidth={Dimensions.get("window").width}
            />
          </View>

          <View>
            <View
              style={{
                flexDirection: "column",
                flex: 1,
                padding: 2,
                justifyContent: "space-around",
                //marginTop: -10,
              }}
            >
              <View style={{ flex: 1, paddingBottom: 5 }}>
                <Text
                  style={{
                    color: "#09BA90",
                    fontWeight: "bold",
                    fontSize: 18,
                    lineHeight: 24,
                  }}
                >
                  Sponsor Type
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ lineHeight: 24, fontSize: 15 }}>
                  {sponsors.SponsorType}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "column",
                flex: 1,
                padding: 2,
                justifyContent: "space-around",
              }}
            >
              <View style={{ flex: 1, paddingBottom: 5 }}>
                <Text
                  style={{
                    color: "#09BA90",
                    fontWeight: "bold",
                    fontSize: 18,
                    lineHeight: 24,
                  }}
                >
                  Booth name
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ lineHeight: 24, fontSize: 15 }}>
                  {sponsors.booth_name}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "column",
                flex: 1,
                padding: 2,
                justifyContent: "space-around",
              }}
            >
              <View style={{ flex: 1, paddingBottom: 5 }}>
                <Text
                  style={{
                    color: "#09BA90",
                    fontWeight: "bold",
                    fontSize: 18,
                    lineHeight: 24,
                  }}
                >
                  Website
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    "http://" +
                      sponsors.SponsorWebsite.replace("http://", "").replace(
                        "https://",
                        ""
                      )
                  )
                }
                style={{ flex: 1 }}
              >
                <Text
                  style={{
                    lineHeight: 24,
                    color: "#000",
                    fontSize: 15,
                    textDecorationLine: "underline",
                  }}
                >
                  {sponsors.SponsorWebsite}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "column",
                flex: 1,
                padding: 2,
                justifyContent: "space-around",
              }}
            >
              <View style={{ flex: 1, paddingBottom: 5 }}>
                <Text
                  style={{
                    color: "#09BA90",
                    fontWeight: "bold",
                    fontSize: 18,
                    lineHeight: 24,
                  }}
                >
                  Address
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ lineHeight: 24, fontSize: 15 }}>
                  {sponsors.address1}, {sponsors.address2}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "column",
                flex: 1,
                padding: 2,
                justifyContent: "space-around",
              }}
            >
              <View style={{ flex: 1, paddingBottom: 5 }}>
                <Text
                  style={{
                    color: "#09BA90",
                    fontWeight: "bold",
                    fontSize: 18,
                    lineHeight: 24,
                  }}
                >
                  City
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ lineHeight: 24, fontSize: 15 }}>
                  {sponsors.City}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "column",
                flex: 1,
                padding: 2,
                justifyContent: "space-around",
              }}
            >
              <View style={{ flex: 1, paddingBottom: 5 }}>
                <Text
                  style={{
                    color: "#09BA90",
                    fontWeight: "bold",
                    fontSize: 18,
                    lineHeight: 24,
                  }}
                >
                  State
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ lineHeight: 24, fontSize: 15 }}>
                  {sponsors.State}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "column",
                flex: 1,
                padding: 2,
                justifyContent: "space-around",
              }}
            >
              <View style={{ flex: 1, paddingBottom: 5 }}>
                <Text
                  style={{
                    color: "#09BA90",
                    fontWeight: "bold",
                    fontSize: 18,
                    lineHeight: 24,
                  }}
                >
                  Country
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ lineHeight: 24, fontSize: 15 }}>
                  {sponsors.country}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "column",
                flex: 1,
                padding: 2,
                justifyContent: "space-around",
              }}
            >
              <View style={{ flex: 1, paddingBottom: 5 }}>
                <Text
                  style={{
                    color: "#09BA90",
                    fontWeight: "bold",
                    fontSize: 18,
                    lineHeight: 24,
                  }}
                >
                  Zipcode
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ lineHeight: 24, fontSize: 15 }}>
                  {sponsors.postzipcode}
                </Text>
              </View>
            </View>
          </View>

          {/* <View>
            <Text
              style={{
                color: "#09BA90",
                fontWeight: "bold",
                fontSize: 18,
                lineHeight: 24,
                marginTop: 10,
              }}
            >
              Documents
            </Text>
            <TouchableOpacity
              // onPress={() => Linking.openURL(evnt.url)}
              style={{
                flexDirection: "column",
                flex: 1,
                padding: 2,
                justifyContent: "space-around",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    lineHeight: 24,
                    fontSize: 15,
                    color: "#7f00ff",
                    textDecorationLine: "underline",
                  }}
                >
                  Note point 6.pdf
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              //onPress={() => Linking.openURL(evnt.url)}
              style={{
                flexDirection: "column",
                flex: 1,
                padding: 2,
                justifyContent: "space-around",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    lineHeight: 24,
                    fontSize: 15,
                    color: "#7f00ff",
                    textDecorationLine: "underline",
                  }}
                >
                  Note point 6.pdf
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              //onPress={() => Linking.openURL(evnt.url)}
              style={{
                flexDirection: "column",
                flex: 1,
                padding: 2,
                justifyContent: "space-around",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    lineHeight: 24,
                    fontSize: 15,
                    color: "#7f00ff",
                    textDecorationLine: "underline",
                  }}
                >
                  Note point 6.pdf
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              //onPress={() => Linking.openURL(evnt.url)}
              style={{
                flexDirection: "column",
                flex: 1,
                padding: 2,
                justifyContent: "space-around",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    lineHeight: 24,
                    fontSize: 15,
                    color: "#7f00ff",
                    textDecorationLine: "underline",
                  }}
                >
                  Note point 6.pdf
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <Text
              style={{
                color: "#09BA90",
                fontWeight: "bold",
                fontSize: 18,
                lineHeight: 24,
                marginTop: 10,
              }}
            >
              Presentations
            </Text>
            <TouchableOpacity
              // onPress={() => Linking.openURL(evnt.url)}
              style={{
                flexDirection: "column",
                flex: 1,
                padding: 2,
                justifyContent: "space-around",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    lineHeight: 24,
                    fontSize: 15,
                    color: "#7f00ff",
                    textDecorationLine: "underline",
                  }}
                >
                  Product Details 7.pdf
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              // onPress={() => Linking.openURL(evnt.url)}
              style={{
                flexDirection: "column",
                flex: 1,
                padding: 2,
                justifyContent: "space-around",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    lineHeight: 24,
                    fontSize: 15,
                    color: "#7f00ff",
                    textDecorationLine: "underline",
                  }}
                >
                  Product Details 7.pdf
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              //onPress={() => Linking.openURL(evnt.url)}
              style={{
                flexDirection: "column",
                flex: 1,
                padding: 2,
                justifyContent: "space-around",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    lineHeight: 24,
                    fontSize: 15,
                    color: "#7f00ff",
                    textDecorationLine: "underline",
                  }}
                >
                  Product Details 7.pdf
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              //onPress={() => Linking.openURL(evnt.url)}
              style={{
                flexDirection: "column",
                flex: 1,
                padding: 2,
                justifyContent: "space-around",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    lineHeight: 24,
                    fontSize: 15,
                    color: "#7f00ff",
                    textDecorationLine: "underline",
                  }}
                >
                  Product Details 7.pdf
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <Text
              style={{
                color: "#09BA90",
                fontWeight: "bold",
                fontSize: 18,
                lineHeight: 24,
                marginTop: 10,
              }}
            >
              Videos
            </Text>
          </View>

          <View style={{ flex: 1, height: 400 }}>
            <WebView
              source={{
                html:
                  '<iframe width="100%" height=500 src="https://www.youtube.com/embed/7tYarlZEL0A" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
              }}
              style={{ marginTop: 20 }}
            />
          </View>

          <View style={{ marginTop: -205 }}>
            <Text
              style={{
                color: "#09BA90",
                fontWeight: "bold",
                fontSize: 18,
                lineHeight: 24,
                marginBottom: 10,
              }}
            >
              Images
            </Text>
          </View>

          <View>
            <Image
              style={{ height: 220, width: 330 }}
              source={{
                uri:
                  "https://events.globaldata.com/wp-content/uploads/2020/12/Networking-1.png",
              }}
            />
            <Image
              style={{ height: 220, width: 330, marginTop: 20 }}
              source={{
                uri:
                  "https://events.globaldata.com/wp-content/uploads/2020/12/Product-Exteriors.png",
              }}
            />
          </View>

          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity>
              <MaterialCommunityIcons color="#000" name="facebook" size={22} />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 8 }}>
              <EvilIcons color="#000" name="sc-twitter" size={26} />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 8 }}>
              <AntDesign color="#000" name="linkedin-square" size={19} />
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 20 }}></View> */}

          {/* <View style={{alignItems:"center"}}><Text style={{fontSize:20}}>Delagates</Text></View>

            <View style={{marginTop:20}}></View>

            <View style={{alignItems:"center"}}><Text style={{fontSize:20}}>No users found</Text></View>

            <View style={{marginTop:20}}></View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    login: state.login,
    event: state.Event,
  };
};

export default connect(mapStateToProps)(SponsorCardDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
  },

  cardsWrapper: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
  },
  card: {
    height: 200,
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
    justifyContent: "center",
    marginTop: 14,
    width: 55,
    height: 55,
    marginLeft: 10,
    borderRadius: 30,
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
    padding: 10,
    borderColor: "#fff",
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
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
