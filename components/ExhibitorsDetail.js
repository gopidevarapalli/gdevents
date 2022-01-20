import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

import { useTheme } from "@react-navigation/native";
import { Button } from "react-native-paper";
import IonIcon from "react-native-vector-icons/Ionicons";
import Axios from "axios";
import { connect } from "react-redux";
import api_url from "../Config/Config";
import { WebView } from "react-native-webview";
import Images from "../model/Images";

const ExhibitorsDetailCard = (props) => {
  const theme = useTheme();

  console.log("exhibitors details", props);
  const [Exhibitors, setExhibitors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    console.log("exhibitor id = ", props.route.params.id);

    let formData = new FormData();
    formData.append("cookie", props.login.cookie);
    formData.append("id", props.route.params.id);
    formData.append("event_id", props.event.common.event.event_id_single);

    console.log("===========Exhibitor ID==========");
    console.log(props.route.params);
    console.log("===========Exhibitor ID==========");
    Axios.post(`${api_url.exhibitorsDetail}`, formData).then((res) => {
      console.log("exhibitor details", res.data);
      console.log("exhibitor details1", res.data.exhibitorindividual);
      if (res.data.exhibitorindividual.length) {
        setExhibitors(res.data.exhibitorindividual[0]);
        setNoData(false);
      } else {
        setNoData(true);
      }

      setIsLoading(false);
    });
  }, [props.route.params.id]);

  return isLoading ? (
    <ActivityIndicator color="green" size="large" />
  ) : (
    <View style={styles.container}>
      {noData ? (
        <View
          style={{ flex: 1, textAlign: "center", textAlignVertical: "center" }}
        >
          <Text
            style={{
              flex: 1,
              textAlign: "center",
              textAlignVertical: "center",
            }}
          >
            No Data Found
          </Text>
        </View>
      ) : (
        <ScrollView>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                color: "#09BA90",
                fontWeight: "bold",
                fontSize: 20,
                marginTop: 2,
              }}
            >
              {Exhibitors.CompanyName}
            </Text>

            {/* <TouchableOpacity >
      <View style={{borderRadius:5, height:30, width:30, backgroundColor:"#ddd", borderRadius:30}}>
        <Text style={{color:"#000", textAlign:"center", marginTop:3}}>Remove from my Favorites</Text> 
          <MaterialIcons style={{marginLeft:5, marginTop:4}} name ="favorite" size={20} color="#000" />
      </View>
      </TouchableOpacity> */}
          </View>

          {/* <View style={{ marginTop: 10 }}></View>
          <Text
            style={{
              lineHeight: 24,
              fontSize: 15,
            }}
          >
            {Exhibitors.company_bio}
          </Text> */}

          <View style={{ marginTop: 10 }}></View>

          <View>
            {/* <View
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
                  Company Classifications
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ lineHeight: 24, fontSize: 15 }}>Public</Text>
              </View>
            </View> */}

            {/* <View
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
              <View style={{ flex: 1 }}>
                <Text style={{ lineHeight: 24, fontSize: 15 }}>
                  {Exhibitors.company_website}
                </Text>
              </View>
            </View> */}

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
                  {Exhibitors.Address}
                </Text>
              </View>
            </View>

            {/* <View
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
                  Exhibitor Type
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ lineHeight: 24, fontSize: 15 }}>
                  {Exhibitors.exhibitor_type}
                </Text>
              </View>
            </View> */}

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
                  {Exhibitors.City}
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
                  {Exhibitors.State}
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
                  {Exhibitors.Country}
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
                  {Exhibitors.ZipCode}
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
              }}
            >
              Documents
            </Text>
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
                  Features Documents.pdf
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
                  Features Documents.pdf
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
                  Features Documents.pdf
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
                  Features Documents.pdf
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
                  Product Features.pdf
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
                  Product Features.pdf
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
                  Product Features.pdf
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
                  Product Features.pdf
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
                  '<iframe width="100%" height=500 src="https://www.youtube.com/embed/VIkm6nIBoM0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
              }}
              style={{ marginTop: 20 }}
            />
          </View>

          <View style={{ flex: 1, height: 400, marginTop: -170 }}>
            <WebView
              source={{
                html:
                  '<iframe width="100%" height=500 src="https://www.youtube.com/embed/r6YtHPvyJNk" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
              }}
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

            <FlatList
              data={Images}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View>
                  <Image
                    style={{ height: 220, width: 330, marginVertical: 10 }}
                    source={{ uri: item.url }}
                  />
                </View>
              )}
            />
          </View>
 */}
          {/* <View style={{marginTop:10, flexDirection:"row", justifyContent:"center"}}>
      <TouchableOpacity>
          <MaterialCommunityIcons color="#000" name="facebook" size={22} />
      </TouchableOpacity>
      <TouchableOpacity style={{marginLeft:8}}>
          <EvilIcons color="#000" name="sc-twitter"  size={26}/>
      </TouchableOpacity>
      <TouchableOpacity style={{marginLeft:8}}>
          <AntDesign color="#000" name="linkedin-square"  size={19}/>
      </TouchableOpacity>
  </View> */}

          {/* <View style={{marginTop:20}}></View>

  <View style={{alignItems:"center"}}><Text style={{fontSize:20}}>Delagates</Text></View>

  <View style={{marginTop:20}}></View> */}

          {/* <View style={{flexDirection:"column", backgroundColor:"#f2f2f2"}}>

  <View style={styles.cardBody}>
  <View style={{ borderColor:"#bfbfbf", alignItems:"center",  height: 65, width: 65, borderRadius:60,  borderWidth:1,  }}>
 <Image style={{ height: 50, width: 50, borderRadius:50, marginTop:6 }}  source={{uri: 'https://ind-backend-events-website.pantheonsite.io/wp-content/uploads/2020/07/1594022274Michael-Cares-250x250-1.jpg'}} />
 </View>

  <View style={styles.cardDetails}>
      <View style={styles.headDetails}>
      <Text style={styles.textBody}>Cares M</Text> 
      <View style={{marginLeft:100, flexDirection:"row", justifyContent:"space-around"}}>
      <TouchableOpacity>
          <EvilIcons color="#20c997" name="comment" Outlined size={25}/>
      </TouchableOpacity>
      <TouchableOpacity>
          <EvilIcons color="#20c997" name="calendar" Outlined size={25}/>
      </TouchableOpacity>
      </View>
      </View>

      <Text>IT Director</Text>
      <Text>Ingredion Inc</Text>
      
      <View style={styles.optionss}>
          <TouchableOpacity>
          <MaterialIcons color="#20c997" name="favorite-border" Outlined size={15}/>
          </TouchableOpacity>
          <TouchableOpacity>
          <EvilIcons color="#20c997"  name="credit-card" size={22}/>
          </TouchableOpacity>
          <TouchableOpacity>
          <SimpleLineIcons color="#20c997"  name="user-unfollow" size={15}/>
          </TouchableOpacity>
          <TouchableOpacity>
          <Icon color="#20c997"  name="chatbox-outline" size={20}/>
          </TouchableOpacity>
      </View>
  </View>  
</View>

<View style={{marginTop:20}}></View>

<View style={styles.cardBody}>
  <View style={{ borderColor:"#bfbfbf", alignItems:"center",  height: 65, width: 65, borderRadius:60,  borderWidth:1,  }}>
 <Image style={{ height: 50, width: 50, borderRadius:50, marginTop:6 }}  source={{uri: 'https://ind-backend-events-website.pantheonsite.io/wp-content/uploads/2020/07/1594022739Tobias-Koehler-250x250-1.jpg'}} />
 </View>

  <View style={styles.cardDetails}>
      <View style={styles.headDetails}>
      <Text style={styles.textBody}>Koehler T.</Text> 
      <View style={{marginLeft:100, flexDirection:"row", justifyContent:"space-around"}}>
      <TouchableOpacity>
          <EvilIcons color="#20c997" name="comment" Outlined size={25}/>
      </TouchableOpacity>
      <TouchableOpacity>
          <EvilIcons color="#20c997" name="calendar" Outlined size={25}/>
      </TouchableOpacity>
      </View>
      </View>

      <Text>Director</Text>
      <Text>Ingredion Inc</Text>
      
      <View style={styles.optionss}>
          <TouchableOpacity>
          <MaterialIcons color="#20c997" name="favorite-border" Outlined size={15}/>
          </TouchableOpacity>
          <TouchableOpacity>
          <EvilIcons color="#20c997"  name="credit-card" size={22}/>
          </TouchableOpacity>
          <TouchableOpacity>
          <SimpleLineIcons color="#20c997"  name="user-unfollow" size={15}/>
          </TouchableOpacity>
          <TouchableOpacity>
          <Icon color="#20c997"  name="chatbox-outline" size={20}/>
          </TouchableOpacity>
      </View>
  </View>  
</View>

<View style={{marginTop:20}}></View>

<View style={styles.cardBody}>
  <View style={{ borderColor:"#bfbfbf", alignItems:"center",  height: 65, width: 65, borderRadius:60,  borderWidth:1,  }}>
 <Image style={{ height: 50, width: 50, borderRadius:50, marginTop:6 }}  source={{uri: 'https://ind-backend-events-website.pantheonsite.io/wp-content/uploads/2020/07/1594030396MichaelToedt-250x350-1.jpg'}} />
 </View>

  <View style={styles.cardDetails}>
      <View style={styles.headDetails}>
      <Text style={styles.textBody}>Teodt M</Text> 
      <View style={{marginLeft:100, flexDirection:"row", justifyContent:"space-around"}}>
      <TouchableOpacity>
          <EvilIcons color="#20c997" name="comment" Outlined size={25}/>
      </TouchableOpacity>
      <TouchableOpacity>
          <EvilIcons color="#20c997" name="calendar" Outlined size={25}/>
      </TouchableOpacity>
      </View>
      </View>

      <Text>Managing Director</Text>
      <Text>Ingredion Inc</Text>
      
      <View style={styles.optionss}>
          <TouchableOpacity>
          <MaterialIcons color="#20c997" name="favorite-border" Outlined size={15}/>
          </TouchableOpacity>
          <TouchableOpacity>
          <EvilIcons color="#20c997"  name="credit-card" size={22}/>
          </TouchableOpacity>
          <TouchableOpacity>
          <SimpleLineIcons color="#20c997"  name="user-unfollow" size={15}/>
          </TouchableOpacity>
          <TouchableOpacity>
          <Icon color="#20c997"  name="chatbox-outline" size={20}/>
          </TouchableOpacity>
      </View>
  </View>  
</View> 
  
  </View>  */}

          {/* <View style={{marginTop:20}}></View> */}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cardBody: {
    backgroundColor: "#fff",
    padding: 16,
    flexDirection: "row",
    borderRadius: 15,
    borderColor: "#fff",
    borderWidth: 1,
  },
  cardDetails: {
    paddingHorizontal: 20,
  },
  headDetails: {
    flexDirection: "row",
  },
  textBody: {
    fontWeight: "bold",
    // flexDirection:"row"
  },
  designation: {
    fontSize: 12,
  },
  company: {
    fontSize: 11,
    fontWeight: "bold",
  },
  optionss: {
    //backgroundColor: '#fff',
    //marginTop:15,
    paddingTop: 10,
    height: 35,
    borderColor: "#f2f2f2",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

const mapStateToProps = (state) => {
  return { login: state.login, event: state.Event };
};

export default connect(mapStateToProps)(ExhibitorsDetailCard);
