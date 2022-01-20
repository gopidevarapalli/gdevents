import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";

export default function Recommended() {
  const navigation = useNavigation();

  const theme = useTheme();
  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
      <View style={styles.cardsWrapper}>
        <Text
          style={{
            alignSelf: "flex-start",
            fontSize: 15,
            fontWeight: "bold",
            color: "#000",
            paddingBottom: 6,
            paddingTop: 6,
          }}
        >
          Recommended Connections
        </Text>

        <TouchableOpacity
        //style={styles.card}
        //   key={i}
        //   onPress={() =>
        //     navigation.navigate("userDetails", {
        //       user_id: attendee.user_id,
        //     })
        //   }
        >
          <View style={styles.card}>
            <View style={styles.cardImgWrapper1}>
              <View style={styles.cardImg1}>
                <Image
                  source={{
                    uri:
                      "https://events.globaldata.com/wp-content/uploads/2020/07/1594097616James-Elgenes-e1592312979934-250x250-1.jpg",
                  }}
                  resizeMode="cover"
                  style={styles.iconWidth}
                />
              </View>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>Elgenes James</Text>
              <Text style={styles.cardDesg}>Leading Advisor</Text>
              <Text numberOfLines={1} style={styles.cardDetails}>
                Brandit
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("userDetails", { user_id: item.id })
          }
        >
          <View style={styles.card}>
            <View style={styles.cardImgWrapper1}>
              <View style={styles.cardImg1}>
                <Image
                  source={{
                    uri:
                      "https://events.globaldata.com/wp-content/uploads/2020/07/1594022274Michael-Cares-250x250-1.jpg",
                  }}
                  resizeMode="cover"
                  style={styles.iconWidth}
                />
              </View>
            </View>

            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>Cares Michael</Text>
              <Text numberOfLines={2} style={styles.cardDesg}>
                IT Director
              </Text>
              <Text numberOfLines={2} style={styles.cardDetails}>
                Ingredion Inc
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("userDetails", { user_id: item.id })
          }
        >
          <View style={styles.card}>
            <View style={styles.cardImgWrapper1}>
              <View style={styles.cardImg1}>
                <Image
                  source={{
                    uri:
                      "https://events.globaldata.com/wp-content/uploads/2020/07/1594639075Meltem-Seyhan-250x250-1.jpg",
                  }}
                  resizeMode="cover"
                  style={styles.iconWidth}
                />
              </View>
            </View>

            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>Netzeband Gesa</Text>
              <Text numberOfLines={2} style={styles.cardDesg}>
                Managing Director
              </Text>
              <Text numberOfLines={2} style={styles.cardDetails}>
                ResortSuite
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

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
    // height: 120,
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
    //height: "100%",
    width: "100%",
    borderColor: "#fff",
    alignSelf: "center",
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    borderLeftWidth: 0,
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
  cardInfo: {
    flex: 3,
    padding: 10,
    borderColor: "#fff",
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 8,
    backgroundColor: "#fff",
    //borderBottomRightRadius: 0,
    //borderTopRightRadius: 0,
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
});
