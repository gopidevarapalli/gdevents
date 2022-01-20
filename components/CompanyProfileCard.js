import React from "react";
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
import { Button } from "react-native-paper";
const CompanyProfileCard = (props) => {
  const theme = useTheme();
  //   console.log(Stats)
  // console.log(17)
  console.log("data", props.CompanyProfile);

  return (
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
                Company Name{" "}
              </Text>
            </View>
            <View
              style={{ flex: 1, paddingTop: 5, paddingBottom: 5, fontSize: 20 }}
            >
              <Text
                style={{
                  lineHeight: 24,
                  color: "#444",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                {props.CompanyProfile.companyname}
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
                Company Bio
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ lineHeight: 24, color: "#444", fontSize: 15 }}>
                {props.CompanyProfile.companybio}
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
                Company Type
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ lineHeight: 24, fontSize: 15, color: "#444" }}>
                {props.CompanyProfile.companytype}
              </Text>
            </View>
          </View>

          {/* <View style={{flexDirection: "column",flex: 1, padding: 2,justifyContent: "space-around"}}>
                <View style={{flex: 1,paddingBottom:5}}>
                    <Text style={{color:'#09BA90',fontWeight:'bold',fontSize:18,lineHeight:24}}>Company 
                    Classifications</Text>
                </View>
                <View style={{ flex: 1}}>
                    <Text style={{lineHeight:24,fontSize:15}}>{props.CompanyProfile.Companyclassifications}</Text>
                </View>
            </View> */}

          {props.CompanyProfile.companywebsite !== "" &&
          props.CompanyProfile.companywebsite !== null ? (
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
                      props.CompanyProfile.companywebsite
                        .replace("http://", "")
                        .replace("https://", "")
                  )
                }
                style={{ flex: 1 }}
              >
                <Text
                  style={{
                    lineHeight: 24,
                    color: "#444",
                    fontSize: 15,
                    textDecorationLine: "underline",
                  }}
                >
                  {props.CompanyProfile.companywebsite}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View></View>
          )}
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
                Address 1
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ lineHeight: 24, fontSize: 15, color: "#444" }}>
                {props.CompanyProfile.address1}
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
                Address 2
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ lineHeight: 24, fontSize: 15, color: "#444" }}>
                {props.CompanyProfile.address2}
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
              <Text style={{ lineHeight: 24, fontSize: 15, color: "#444" }}>
                {props.CompanyProfile.city}
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
              <Text style={{ lineHeight: 24, fontSize: 15, color: "#444" }}>
                {props.CompanyProfile.state}
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
              <Text style={{ lineHeight: 24, fontSize: 15, color: "#444" }}>
                {props.CompanyProfile.country}
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
              <Text style={{ lineHeight: 24, fontSize: 15, color: "#444" }}>
                {props.CompanyProfile.zipcode}
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
                Booth Number
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ lineHeight: 24, fontSize: 15, color: "#444" }}>
                {props.CompanyProfile.boothnumber == ""
                  ? "No data available"
                  : props.CompanyProfile.boothnumber}
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
                Premium
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ lineHeight: 24, fontSize: 15, color: "#444" }}>
                {props.CompanyProfile.premium}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default CompanyProfileCard;

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
