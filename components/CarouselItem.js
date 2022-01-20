import React from "react";
import { View, StyleSheet, Text, Image, Dimensions } from "react-native";
// import {decode} from 'html-entities';

const { width, height } = Dimensions.get("window");

const CarouselItem = ({ item }) => {
  return (
    <View style={styles.cardView}>
      {item.banner ? (
        <Image style={styles.image} source={{ uri: item.banner[0] }} />
      ) : (
        <View></View>
      )}
      <View style={styles.textView}>
        <Text style={styles.itemTitle}> {item.posttitle}</Text>
        <Text style={styles.itemDescription}>
          {item.event_start_date} {"TO"} {item.event_end_date}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    width: width - 20,
    height: height / 4,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },

  textView: {
    position: "absolute",
    justifyContent:"center",
    alignSelf:"center",
    bottom: 30,
    //margin: 10,
    //left: 5,
  },
  image: {
    width: width - 20,
    height: height / 4,
    borderRadius: 10,
  },
  itemTitle: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 1,
    shadowRadius: 3,
    marginBottom: 5,
    fontWeight: "bold",
    elevation: 5,
  },
  itemDescription: {
    color: "white",
    fontSize: 18,
    lineHeight: 18,
    marginTop: 5,
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default CarouselItem;
