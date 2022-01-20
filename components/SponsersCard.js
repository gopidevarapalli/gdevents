import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Button } from "react-native-paper";
import IonIcon from "react-native-vector-icons/Ionicons";
const SponsersCard = ({ navigation }) => {
  const theme = useTheme();

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
      <View style={styles.cardsWrapper}>
        <View style={styles.card}>
          <View style={styles.cardImgWrapper1}>
            <View style={styles.cardImg1}>
              <Image
                source={require("../assets/people/1.jpg")}
                resizeMode="cover"
                style={styles.iconWidth}
              />
            </View>
          </View>

          <View style={styles.cardImgWrapper}>
            <View style={styles.cardImg}>
              <TouchableOpacity style={styles.attendeeBtn}>
                <View style={styles.speakerIcon}>
                  {/* <Image
              source={require('../assets/icons/twi.png')}
              resizeMode="cover"
              style={styles.attendeeSize}
              
            /> */}
                  <IonIcon name="ios-arrow-forward" size={25} color="#1E1727" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* <View style={{ alignSelf: 'flex-end',}}>
        <Button style={{marginTop:8,marginBottom:12 ,width:120,borderRadius:15}} color="#00DEA5"
          contentStyle={{ height: 34,  }}
          labelStyle={{ color: "#2F283D", fontSize: 12 }}mode="contained" onPress={() => console.log('Pressed')}>
           View More
          </Button> 
        </View> */}
      </View>
    </ScrollView>
  );
};

export default SponsersCard;

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
    height: 115,
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
