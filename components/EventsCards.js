import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import { connect } from "react-redux";
import Axios from "axios";
import Entypo from "react-native-vector-icons/Entypo";
import api_url from "../Config/Config";

const Eventscard = (props) => {
  const theme = useTheme();
  //   console.log(Stats)
  //console.log(17)
  //console.log(props.CompanyProfile)
  const [eventInfo, setEventInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(props.login.cookie);
    let formData = new FormData();
    formData.append("cookie", props.login.cookie);
    formData.append("event_id", props.event.common.event.event_id_single);
    Axios.post(`${api_url.eventInfo}`, formData).then((res) => {
      console.log("resss", res);
      setEventInfo(res.data.event_info);
      setIsLoading(false);
    });
  }, [props.login.cookie]);

  return isLoading ? (
    <ActivityIndicator size={30} color="green" />
  ) : (
    <ScrollView style={styles.container}>
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />

      <View style={{ width: "100%", padding: 20 }}>
        <View>
          <View
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
                  color: "#09BA90",
                  fontWeight: "bold",
                  fontSize: 18,
                  lineHeight: 24,
                }}
              >
                Event Details{" "}
              </Text>
            </View>
            <View
              style={{ flex: 1, paddingTop: 5, paddingBottom: 5, fontSize: 20 }}
            >
              {eventInfo && eventInfo.content ? (
                <Text>{eventInfo.content}</Text>
              ) : null}
            </View>
          </View>
          {eventInfo && eventInfo.documents ? (
            eventInfo.documents.length ? (
              <View style={{ flex: 1, paddingBottom: 5 }}>
                <Text
                  style={{
                    color: "#09BA90",
                    fontWeight: "bold",
                    fontSize: 18,
                    lineHeight: 24,
                  }}
                >
                  Documents
                </Text>
              </View>
            ) : (
              <View></View>
            )
          ) : (
            <View></View>
          )}
          {eventInfo.documents ? (
            eventInfo.documents.map((evnt, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => Linking.openURL(evnt.url)}
                  style={{
                    flexDirection: "column",
                    flex: 1,
                    padding: 2,
                    justifyContent: "space-around",
                  }}
                >
                  {/* <View style={{flex: 1,paddingBottom:5}}>
                    <Text style={{color:'#09BA90',fontWeight:'bold',fontSize:18,lineHeight:24}}>Venue</Text>
                </View> */}
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        lineHeight: 24,
                        fontSize: 15,
                        color: "#7f00ff",
                        textDecorationLine: "underline",
                      }}
                    >
                      {evnt.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <View></View>
          )}

          {/* <View style={{flexDirection: "column",flex: 1, padding: 2,justifyContent: "space-around"}}>
                <View style={{flex: 1,paddingBottom:5}}>
                    <Text style={{color:'#09BA90',fontWeight:'bold',fontSize:18,lineHeight:24}}>Address</Text>
                </View>
                <View style={{ flex: 1}}>
                    <Text style={{lineHeight:24,fontSize:15}}>Richmond st West, Plat 300</Text>
                </View>
            </View> */}

          {/* <View style={{flexDirection: "column",flex: 1, padding: 2,justifyContent: "space-around"}}>
                <View style={{flex: 1,paddingBottom:5}}>
                    <Text style={{color:'#09BA90',fontWeight:'bold',fontSize:18,lineHeight:24}}>City</Text>
                </View>
                <View style={{ flex: 1}}>
                    <Text style={{lineHeight:24,fontSize:15}}>Kansas city</Text>
                </View>
            </View> */}

          {/* <View style={{flexDirection: "column",flex: 1, padding: 2,justifyContent: "space-around"}}>
                <View style={{flex: 1,paddingBottom:5}}>
                    <Text style={{color:'#09BA90',fontWeight:'bold',fontSize:18,lineHeight:24}}>State</Text>
                </View>
                <View style={{ flex: 1}}>
                    <Text style={{lineHeight:24,fontSize:15}}> Kansas</Text>
                </View>
            </View>
            <View style={{flexDirection: "column",flex: 1, padding: 2,justifyContent: "space-around"}}>
                <View style={{flex: 1,paddingBottom:5}}>
                    <Text style={{color:'#09BA90',fontWeight:'bold',fontSize:18,lineHeight:24}}>Country</Text>
                </View>
                <View style={{ flex: 1}}>
                    <Text style={{lineHeight:24,fontSize:15}}>USA</Text>
                </View>
            </View> */}
          {/* <View style={{flexDirection: "column",flex: 1, padding: 2,justifyContent: "space-around"}}>
                <View style={{flex: 1,paddingBottom:5}}>
                    <Text style={{color:'#09BA90',fontWeight:'bold',fontSize:18,lineHeight:24}}>Location</Text>
                </View>
                <View style={{ flex: 1}}>
                    <Text style={{lineHeight:24,fontSize:15}}>Kansas</Text>
                </View>
            </View> */}
          {/* <View style={{flexDirection: "column",flex: 1, padding: 2,justifyContent: "space-around"}}>
                <View style={{flex: 1,paddingBottom:5}}>
                    <Text style={{color:'#09BA90',fontWeight:'bold',fontSize:18,lineHeight:24}}>Zipcode </Text>
                </View>
                <View style={{ flex: 1}}>
                    <Text style={{lineHeight:24,fontSize:15}}>MD5332</Text>
                </View>
            </View>
            <View style={{flexDirection: "column",flex: 1, padding: 2,justifyContent: "space-around"}}>
                <View style={{flex: 1,paddingBottom:5}}>
                    <Text style={{color:'#09BA90',fontWeight:'bold',fontSize:18,lineHeight:24}}>Start Date</Text>
                </View>
                <View style={{ flex: 1}}>
                    <Text style={{lineHeight:24,fontSize:15}}>2020-07-17</Text>
                </View>
            </View>
            <View style={{flexDirection: "column",flex: 1, padding: 2,justifyContent: "space-around"}}>
                <View style={{flex: 1,paddingBottom:5}}>
                    <Text style={{color:'#09BA90',fontWeight:'bold',fontSize:18,lineHeight:24}}>End Date</Text>
                </View>
                <View style={{ flex: 1}}>
                    <Text style={{lineHeight:24,fontSize:15}}>2020-08-19</Text>
                </View>
            </View> */}
          {/* <View style={{flexDirection: "column",flex: 1, padding: 2,justifyContent: "space-around"}}>
                <View style={{flex: 1,paddingBottom:5}}>
                    <Text style={{color:'#09BA90',fontWeight:'bold',fontSize:18,lineHeight:24}}>Organisation name</Text>
                </View>
                <View style={{ flex: 1}}>
                    <Text style={{lineHeight:24,fontSize:15}}>DIGITAL ACCOUNTANCY</Text>
                </View>
            </View>
            <View style={{flexDirection: "column",flex: 1, padding: 2,justifyContent: "space-around"}}>
                <View style={{flex: 1,paddingBottom:5}}>
                    <Text style={{color:'#09BA90',fontWeight:'bold',fontSize:18,lineHeight:24}}>Website </Text>
                </View>
                <View style={{ flex: 1}}>
                    <Text style={{lineHeight:24,fontSize:15}}>https://arena-international.com/dafawards/ </Text>
                </View>
            </View>
            <View style={{flexDirection: "column",flex: 1, padding: 2,justifyContent: "space-around"}}>
                <View style={{flex: 1,paddingBottom:5}}>
                    <Text style={{color:'#09BA90',fontWeight:'bold',fontSize:18,lineHeight:24}}>Platform Start Date  </Text>
                </View>
                <View style={{ flex: 1}}>
                    <Text style={{lineHeight:24,fontSize:15}}>2020-09-15 </Text>
                </View>
            </View>
            <View style={{flexDirection: "column",flex: 1, padding: 2,justifyContent: "space-around"}}>
                <View style={{flex: 1,paddingBottom:5}}>
                    <Text style={{color:'#09BA90',fontWeight:'bold',fontSize:18,lineHeight:24}}>Platform End Date  </Text>
                </View>
                <View style={{ flex: 1}}>
                    <Text style={{lineHeight:24,fontSize:15}}>2020-09-24 </Text>
                </View>
            </View> */}

          <View
            style={{
              flexDirection: "row",
              flex: 1,
              padding: 2,
              justifyContent: "space-around",
              marginTop: 50,
            }}
          >
            {eventInfo.social_links.facebook &&
            eventInfo.social_links.facebook !== "" ? (
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(eventInfo.social_links.facebook);
                }}
              >
                <Entypo name="facebook" size={30} color="#3b5998" />
                {/* <Image
              source={require('../assets/icons/facebook.png')}
              resizeMode="cover"
              
            />  */}
              </TouchableOpacity>
            ) : (
              <View></View>
            )}
            {eventInfo.social_links.twitter &&
            eventInfo.social_links.twitter !== "" ? (
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(eventInfo.social_links.twitter);
                }}
              >
                <Entypo name="twitter" size={30} color="#00acee" />
                {/* <Image
                        source={require('../assets/icons/twi.png')}
                        resizeMode="cover"
                        style={{
                            height:30,
                            width:30
                        }}
                        
                        /> */}
              </TouchableOpacity>
            ) : (
              <View></View>
            )}
            {eventInfo.social_links.youtube &&
            eventInfo.social_links.youtube !== "" ? (
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(eventInfo.social_links.youtube);
                }}
              >
                <Entypo name="youtube" size={30} color="#FF0000" />
                {/* <Image
                        source={require('../assets/icons/twi.png')}
                        resizeMode="cover"
                        style={{
                            height:30,
                            width:30
                        }}
                        
                        /> */}
              </TouchableOpacity>
            ) : (
              <View></View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  // console.log(state.MyMeetings)
  return {
    login: state.login,
    event: state.Event,
  };
};

export default connect(mapStateToProps)(Eventscard);

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
