import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Linking,
} from "react-native";
import { Link, useNavigation, useTheme } from "@react-navigation/native";
import { Button } from "react-native-paper";
import IonIcon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { connect } from "react-redux";
import Axios from "axios";
import api_url from "../Config/Config";
import { color } from "react-native-reanimated";
import { WebView } from "react-native-webview";
// import {decode} from 'html-entities';

const ProductsDetailCard = (props) => {
  const theme = useTheme();

  console.log("product details", props);
  const [Products, setProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  // if(isLoading){
  //   props.GetUserInfoAction(props.login.cookie, props.route.params.user_id);
  // }

  useEffect(() => {
    let formData = new FormData();
    formData.append("cookie", props.login.cookie);
    formData.append("product_id", props.route.params.id);
    formData.append("event_id", props.event.common.event.event_id_single);

    Axios.post(`${api_url.productDetail}`, formData).then((res) => {
      console.log(res.data);
      setProducts(res.data.products[0]);
      setIsLoading(false);
    });
  }, [props.route.params.id]);

  return isLoading ? (
    <ActivityIndicator size="large" color="green" />
  ) : (
    <View style={styles.container}>
      <ScrollView>
        <Image
          style={{
            height: 190,
            width: "100%",
            //resizeMode: "contain",
            margin: 4,
          }}
          source={{ uri: Products.product_image }}
        />

        <View style={{ marginTop: 10 }}></View>

        {/* <View style={{justifyContent:"flex-end", alignItems:"flex-end"}}>
     <TouchableOpacity>
     <View style={{borderRadius:5, height:30, width:30, backgroundColor:"#ddd", borderRadius:30 }}>
       <Text style={{color:"#000", textAlign:"center", marginTop:3}}>Remove from my Favorites</Text>
         <MaterialIcons style={{marginLeft:5, marginTop:4}} name ="favorite" size={20} color="#000" />
     </View>
     </TouchableOpacity>
     </View> */}

        <View
          style={{
            //marginLeft: 8,

            marginTop: 10,
            width: "100%",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            {Products.product_title}
          </Text>
        </View>

        <View style={{ marginTop: 20 }}></View>

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
                color: "black",
                fontWeight: "bold",
                fontSize: 18,
                lineHeight: 24,
              }}
            >
              Product Type
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ lineHeight: 24, color: "black", fontSize: 15 }}>
              {Products.product_type}
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
                color: "black",
                fontWeight: "bold",
                fontSize: 18,
                lineHeight: 24,
              }}
            >
              Product URL
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                lineHeight: 24,
                color: "#09BA90",
                fontSize: 15,
                textDecorationLine: "underline",
              }}
              onPress={() => Linking.openURL(Products.product_url)}
            >
              {Products.product_url}
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
                color: "black",
                fontWeight: "bold",
                fontSize: 18,
                lineHeight: 24,
              }}
            >
              Product Documents
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                lineHeight: 24,
                color: "#09BA90",
                fontSize: 15,
                textDecorationLine: "underline",
              }}
              onPress={() => Linking.openURL(Products.upload_document.url)}
            >
              {Products.upload_document.url}
            </Text>
          </View>
        </View>

        {/* <View>
          <Text
            style={{
              color: "black",
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
                '<iframe width="100%" height=500 src="https://www.youtube.com/embed/8p5VClGbYZQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
            }}
            style={{ marginTop: 20 }}
          />
        </View> */}

        {/* <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#f2f2f2",
            borderColor: "#ddd",
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            height: "auto",
            //height: 35,
          }}
        >
          <View style={{ flex: 1, borderColor: "#ddd" }}>
            <Text
              style={{
                color: "#000",
                marginLeft: 10,
                marginTop: 5,
                marginBottom: 5,
              }}
            >
              Product Type
            </Text>
          </View>
          <View style={{ flex: 1, borderColor: "#ddd" }}>
            <Text
              style={{
                color: "#000",
                marginRight: 10,
                marginTop: 5,
                marginBottom: 5,
              }}
            >
              {Products.product_type}
            </Text>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: "#bfbfbf",
            borderBottomWidth: 1,
            // width: "95%",
          }}
        ></View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#f2f2f2",
            borderColor: "#ddd",
            borderLeftWidth: 1,
            borderRightWidth: 1,
            height: "auto",
            //height: 35,
          }}
        >
          <View style={{ flex: 1, borderColor: "#ddd" }}>
            <Text
              style={{
                color: "#000",
                marginLeft: 10,
                marginTop: 5,
                marginBottom: 5,
              }}
            >
              Company
            </Text>
          </View>
          <View style={{ flex: 1, borderColor: "#ddd" }}>
            <Text
              style={{
                color: "#20c997",
                marginRight: 10,
                marginTop: 5,
                marginBottom: 5,
              }}
              onPress={() =>
                Linking.openURL(
                  Products.company_link.indexOf("http") < 0
                    ? "https://" + Products.company_link
                    : Products.company_link
                )
              }
            >
              {Products.company_name}
            </Text>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: "#bfbfbf",
            borderBottomWidth: 1,
            //width: "95%",
          }}
        ></View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#f2f2f2",
            borderColor: "#ddd",
            borderLeftWidth: 1,
            borderRightWidth: 1,
            flexWrap: "wrap",
            //height: 135,
            padding: 10,
            alignSelf: "stretch",
          }}
        >
          <View style={{ flex: 1, borderColor: "#ddd" }}>
            <Text
              style={{
                color: "#000",
                marginLeft: 0,
                marginTop: 5,
                marginBottom: 5,
              }}
            >
              Licensing Notes
            </Text>
          </View>
          <View style={{ flex: 1, borderColor: "#ddd" }}>
            <Text
              style={{
                color: "#000",
                marginRight: 10,
                marginTop: 5,
                marginBottom: 5,
              }}
            >
              {Products.licensing_notes}
            </Text>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: "#bfbfbf",
            borderBottomWidth: 1,
            //width: "95%",
          }}
        ></View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#f2f2f2",
            borderColor: "#ddd",
            borderLeftWidth: 1,
            borderRightWidth: 1,
            height: "auto",
            //height: 35,
          }}
        >
          <View style={{ flex: 1, borderColor: "#ddd" }}>
            <Text
              style={{
                color: "#000",
                marginLeft: 10,
                marginTop: 5,
                marginBottom: 5,
              }}
            >
              Licensing Type
            </Text>
          </View>
          <View style={{ flex: 1, borderColor: "#ddd" }}>
            <Text
              style={{
                color: "#000",
                marginRight: 10,
                marginTop: 5,
                marginBottom: 5,
              }}
            >
              {Products.licensing_type}
            </Text>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: "#bfbfbf",
            borderBottomWidth: 1,
            //width: "95%",
          }}
        ></View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#f2f2f2",
            borderColor: "#ddd",
            borderLeftWidth: 1,
            borderRightWidth: 1,
            height: "auto",
            //height: 95,
          }}
        >
          <View style={{ flex: 1, borderColor: "#ddd" }}>
            <Text
              style={{
                color: "#000",
                marginLeft: 10,
                marginTop: 5,
                marginBottom: 5,
              }}
            >
              Product URL
            </Text>
          </View>
          <View style={{ flex: 1, borderColor: "#ddd" }}>
            <Text
              style={{
                color: "#20c997",
                marginRight: 10,
                marginTop: 5,
                marginBottom: 5,
              }}
              onPress={() => Linking.openURL(Products.product_url)}
            >
              {Products.product_url}
            </Text>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: "#bfbfbf",
            borderBottomWidth: 1,
            //width: "95%",
          }}
        ></View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#f2f2f2",
            borderColor: "#ddd",
            borderBottomWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            height: "auto",
            //height: 95,
          }}
        >
          <View style={{ flex: 1, borderColor: "#ddd" }}>
            <Text
              style={{
                color: "#000",
                marginLeft: 10,
                marginTop: 5,
                marginBottom: 5,
              }}
            >
              Product Documents
            </Text>
          </View>
          <View style={{ flex: 1, borderColor: "#ddd" }}>
            <Text
              style={{
                color: "#20c997",
                marginRight: 10,
                marginTop: 5,
                marginBottom: 5,
              }}
              onPress={() => Linking.openURL(Products.upload_document.url)}
            >
              {Products.upload_document.url}
            </Text>
          </View>
        </View> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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

const mapStateToProps = (state) => {
  return {
    login: state.login,
    event: state.Event,
  };
};

export default connect(mapStateToProps)(ProductsDetailCard);
