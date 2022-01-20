import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

export default function Allfav() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardInfo}>
          <View style={styles.agendaCardDetails}>
            {/* <Text style={{ color:'#000',fontSize:15,fontWeight:'bold'}}>Type</Text> */}
          </View>
          <View style={styles.agendaCardDetails}>
            <Text
              style={{
                backgroundColor: "#00DEA5",
                fontSize: 15,
                fontWeight: "bold",
                paddingTop: 3,
                paddingBottom: 3,
                borderRadius: 3,
                paddingLeft: 8,
                paddingRight: 8,
                color: "#2F283D",
              }}
            >
              Products
            </Text>
          </View>

          <View style={styles.agendaCardDetails}>
            <Text
              style={{
                color: "#000",
                fontSize: 15,
                fontWeight: "bold",
                paddingTop: 5,
              }}
            >
              Title
            </Text>
          </View>
          <View style={styles.agendaCardDetails}>
            <Text>Precision for Medicine, Oncology and Rare Disease</Text>
          </View>

          <View style={styles.agendaCardDetails}>
            <Text style={{ color: "#000", fontSize: 15, fontWeight: "bold" }}>
              Date
            </Text>
          </View>
          <View style={styles.agendaCardDetails}>
            <Text>27-09-2020 13:41:42</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  card: {
    height: 140,
    width: "90%",
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

  cardInfo: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
    borderColor: "#fff",
    borderLeftWidth: 0,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardTitle: {
    fontWeight: "bold",
    lineHeight: 10,
  },
  cardDetails: {
    fontSize: 12,
    color: "#444",
  },
  agendaCardDetails: {
    color: "#000",
    flexDirection: "row",

    paddingLeft: 2,

    borderRadius: 5,
  },
});
