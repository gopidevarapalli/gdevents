import React, { useState } from "react";
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
const SponsorCard = (props) => {
  const theme = useTheme();

  console.log(props);
  const [Sponsors, setSpeakers] = useState(props.Sponsors);

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
      <View style={styles.cardsWrapper}>
        <Text style={styles.stitle}>Platinum Sponsors :</Text>
        {Sponsors.map((sponsor, i) => (
          <View style={styles.scard} key={i}>
            {sponsor.platinumSponsors.map((platinum, i) => (
              <View style={styles.scardinfo} key={i}>
                <Image
                  source={{ uri: platinum.logo }}
                  resizeMode="contain"
                  style={styles.attendeeSize}
                />
                <Text style={styles.cardTitle}>{platinum.name}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      <View style={styles.cardsWrapper}>
        <View>
          <Text style={styles.stitle}>Gold Sponsors : </Text>
        </View>

        {Sponsors.map((sponsor, i) => (
          <View style={styles.scard} key={i}>
            {sponsor.goldSponsors.map((gold, i) => (
              <View style={styles.scardinfo} key={i}>
                <Image
                  source={{ uri: gold.logo }}
                  resizeMode="contain"
                  style={styles.attendeeSize}
                />
                <Text style={styles.cardTitle}>{gold.name}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
      <View style={styles.cardsWrapper}>
        <View>
          <Text style={styles.stitle}>Silver Sponsors : </Text>
        </View>

        {Sponsors.map((sponsor, i) => (
          <View style={styles.scard} key={i}>
            {sponsor.silverSponsors.map((silver, i) => (
              <View style={styles.scardinfo} key={i}>
                <Image
                  source={{ uri: silver.logo }}
                  resizeMode="contain"
                  style={styles.attendeeSize}
                />
                <Text style={styles.cardTitle}>{silver.name}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
      <View style={styles.cardsWrapper}>
        <View>
          <Text style={styles.stitle}>Bronze Sponsors : </Text>
        </View>

        {Sponsors.map((sponsor, i) => (
          <View style={styles.scard} key={i}>
            {sponsor.bronzeSponsors.map((bronze, i) => (
              <View style={styles.scardinfo} key={i}>
                <Image
                  source={{ uri: bronze.logo }}
                  resizeMode="contain"
                  style={styles.attendeeSize}
                />
                <Text style={styles.cardTitle}>{bronze.name}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
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
  cardTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
  },

  attendeeSize: {
    width: 200,
    height: 45,
    // marginRight:15,
    // flex:1,
  },
});
