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
  Linking,
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
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import api_url from "../Config/Config";
import { WebView } from "react-native-webview";
//import Videos from "../model/Videos";
import Images from "../model/Images";

const CompanyDetailsCard = (props) => {
  const theme = useTheme();

  console.log("company details", props);
  const [companyData, setcompanyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("company id = ", props.route.params.id);

    let formData = new FormData();
    formData.append("cookie", props.login.cookie);
    formData.append("company_id", props.route.params.id);
    formData.append("event_id", props.event.common.event.event_id_single);

    Axios.post(`${api_url.companyProfile}`, formData).then((res) => {
      console.log(res.data);
      setcompanyData(res.data.companies[0]);
      console.log(res.data.companies[0].profile.attendies);
      setIsLoading(false);
    });
  }, [props.route.params.id]);

  return isLoading ? (
    <ActivityIndicator color="green" size="large" />
  ) : (
    <ScrollView style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            color: "#09BA90",
            fontWeight: "bold",
            fontSize: 20,
            marginTop: 2,
          }}
        >
          {companyData.company_name}
        </Text>
        <TouchableOpacity>
          {/* <View style={{borderRadius:5, height:30, width:30, backgroundColor:"#ddd", borderRadius:30, marginLeft:"78%" }}> */}
          {/* <Text style={{color:"#000", textAlign:"center", marginTop:3}}>Remove from my Favorites</Text> */}
          {/* <MaterialIcons style={{marginLeft:5, marginTop:4}} name ="favorite" size={20} color="#000" /> */}
          {/* </View> */}
        </TouchableOpacity>
      </View>
      <Image source={{ uri: companyData.company_logo }} />
      <View style={{ marginTop: 10 }}></View>
      <Text
        style={{
          lineHeight: 24,
          fontSize: 15,
        }}
      >
        {companyData.company_bio}
      </Text>

      <View style={{ marginTop: 10 }}></View>

      <View>
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
              Company Type
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ lineHeight: 24, fontSize: 15 }}>
              {companyData.profile.company_type}
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
              Company Classifications
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ lineHeight: 24, fontSize: 15 }}>
              {companyData.profile.classification}
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
          <View style={{ flex: 1 }}>
            <Text style={{ lineHeight: 24, fontSize: 15 }}>
              {companyData.profile.website}
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
              Address Type
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ lineHeight: 24, fontSize: 15 }}>
              {companyData.profile.address}
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
              {companyData.profile.city}
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
              {companyData.profile.state}
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
              {companyData.profile.country}
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
              {companyData.profile.zipcode}
            </Text>
          </View>
        </View>
      </View>

      <View>
        <Text
          style={{
            color: "#09BA90",
            fontWeight: "bold",
            fontSize: 18,
            lineHeight: 24,
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          Attendees:
        </Text>
        {/* <Text
            style={{
              paddingLeft: 5,
              lineHeight: 24,
              color:"#09BA90",
              //backgroundColor: "#00dea5",
              fontWeight: "bold",
              marginTop: 20,
              fontSize: 15,
              marginBottom: 20,
            }}
          >
            Attendees:
          </Text> */}
      </View>

      <View style={styles.categoryContainer}>
        {companyData.profile.attendies.map((attendee, i) => {
          return (
            <TouchableOpacity
              key={i}
              // onPress={()=> navigation.navigate('userDetails',{user_id:attendee})}
            >
              <View style={styles.cardImgWrapper1}>
                <Image
                  source={{ uri: attendee.profile_pic }}
                  resizeMode="cover"
                  style={{
                    alignSelf: "flex-start",
                    //justifyContent: "center",
                    //marginTop: 14,
                    width: 85,
                    height: 85,
                    // margin: 15,
                    borderRadius: 45,
                  }}
                />
                <Text style={styles.cardTitle}>{attendee.name}</Text>
              </View>
              <View style={styles.cardInfo}></View>
            </TouchableOpacity>
          );
        })}
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
        </View> */}

      {/* <FlatList
          data={Videos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View> */}
      {/* <Text>{item.url}</Text> */}
      {/* <WebView
                style={{ height: 220, width: 330, marginVertical: 10 }}
                source={{
                  html: (
                    <iframe
                      width="100%"
                      src={item.url}
                      frameborder="0"
                      allow="autoplay; encrypted-media"
                      allowfullscreen
                    ></iframe>
                  ),
                }}
              /> */}
      {/* </View>
          )}
        /> */}

      {/* <View style={{ flex: 1, height: 400 }}>
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
        </View> */}

      {/* <View style={{ marginTop: -205 }}>
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
          /> */}
      {/* 
          <Image
            style={{ height: 220, width: 330 }}
            source={{
              uri:
                "https://events.globaldata.com/wp-content/uploads/2020/12/booth-image-2.jpg",
            }}
          /> */}

      {/* {Images.url}
          <Image
            style={{ height: 220, width: 330 }}
            source={{
              uri:
                "https://events.globaldata.com/wp-content/uploads/2020/12/booth-image-2.jpg",
            }} */}

      {/* <Image
            style={{ height: 220, width: 330 }}
            source={{
              uri:
                "https://events.globaldata.com/wp-content/uploads/2020/12/booth-image-2.jpg",
            }}
          />

          <Image
            style={{ height: 220, width: 330, marginTop: 10 }}
            source={{
              uri:
                "https://events.globaldata.com/wp-content/uploads/2021/01/13-1.jpg",
            }}
          />

          <Image
            style={{ height: 220, width: 330, marginTop: 10 }}
            source={{
              uri:
                "https://events.globaldata.com/wp-content/uploads/2020/12/booth-image-1.jpg",
            }}
          />

          <Image
            style={{ height: 220, width: 330, marginTop: 10 }}
            source={{
              uri:
                "https://events.globaldata.com/wp-content/uploads/2020/12/booth-image-3.jpg",
            }}
          /> */}
      {/* </View> */}

      {/* <View style={{marginTop:20}}></View> */}

      {/* <View style={{flexDirection:"row"}}>
 <TouchableOpacity>
 <View style={{ backgroundColor:"#000", marginLeft:8, width:90, height:30,}}>
     <Text style={{color:"#fff", textAlign:"center", alignSelf:"center", marginTop:3}}>Documents</Text>
 </View>
 </TouchableOpacity>
 <TouchableOpacity>
 <View style={{ backgroundColor:"#000", marginLeft:8, width:100, height:30,}}>
     <Text style={{color:"#fff", textAlign:"center", alignSelf:"center", marginTop:3}}>Presentations</Text>
 </View>
 </TouchableOpacity>
 <TouchableOpacity>
 <View style={{ backgroundColor:"#000", marginLeft:8, width:60, height:30,}}>
     <Text style={{color:"#fff", textAlign:"center", alignSelf:"center", marginTop:3}}>Videos</Text>
 </View>
 </TouchableOpacity>
 </View> */}

      {/* <View style={{marginTop:20}}></View> */}

      {/* <View style={{flexDirection:"column", backgroundColor:"#f2f2f2"}}>
     
 <View style={{flexDirection:"row", backgroundColor:"#f2f2f2", padding:16, borderColor:"#ddd", borderTopWidth:1, borderLeftWidth:1, borderRightWidth:1, height:135}}>
 <FontAwesome5 style={{marginLeft:25, marginTop:4}} name ="file-pdf" size={20} color="#000" />
 <View style={{ flex:1, borderColor:"#ddd" }}>
     <Text style={{color:"#000", marginLeft:"30%", marginTop:5}}>Product-info</Text>
 </View>
 
 </View>

 <FontAwesome5 style={{marginLeft:42, marginTop:-64}} name ="file-pdf" size={20} color="#000" />
 <View style={{ flex:1, borderColor:"#ddd" }}>
     <Text style={{color:"#000", marginLeft:"45%", marginTop:-25}}>Notes</Text>
 </View>

 <FontAwesome5 style={{marginLeft:42, marginTop:24}} name ="file-pdf" size={20} color="#000" />
 <View style={{ flex:1, borderColor:"#ddd" }}>
     <Text style={{color:"#000", marginLeft:"35%", marginTop:-25}}>Product-Documentation</Text>
 </View>

 <FontAwesome5 style={{marginLeft:42, marginTop:20}} name ="file-pdf" size={20} color="#000" />
 <View style={{ flex:1, borderColor:"#ddd" }}>
     <Text style={{color:"#000", marginLeft:"35%", marginTop:-20}}>Features-Documentation</Text>
 </View>
 <View style={{marginTop:25}}></View>
 </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    height: 140,
    width: "33%",
    alignSelf: "center",
    justifyContent: "center",
    marginVertical: 10,

    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    borderWidth: 0.2,
    borderRadius: 8,
  },
  categoryContainer: {
    flexDirection: "row",
    width: "98%",
    alignSelf: "center",
    marginTop: 5,
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "stretch",
    flexWrap: "wrap",
  },
  cardImgWrapper1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRightWidth: 0,
    borderColor: "#fff",
    borderLeftWidth: 0,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardTitle: {
    // fontSize: 16,
    // fontWeight: "bold",
    // lineHeight: 24,
    marginTop: 5,
    alignSelf: "center",
    textAlign: "center",
  },
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
  cardInfo: {
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
    textAlign: "center",
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
  return {
    login: state.login,
    event: state.Event,
  };
};

export default connect(mapStateToProps)(CompanyDetailsCard);
