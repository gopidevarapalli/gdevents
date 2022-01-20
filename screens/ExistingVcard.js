import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function ExistingVcard() {
  return (
    <ScrollView style={styles.constainer}>
      <View style={styles.cardsWrapper}>
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
                      "https://events.globaldata.com/wp-content/uploads/2020/07/1594097432Tracy-Paddock-e1591956088933-250x250-1.jpg",
                  }}
                  resizeMode="cover"
                  style={styles.iconWidth}
                />
              </View>
            </View>

            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>Beam Tracy Main Card</Text>
              <Text numberOfLines={2} style={styles.cardDesg}>
                IIOT Strategy Advisor
              </Text>
              <Text numberOfLines={2} style={styles.cardDetails}>
                Helius Hospitality
              </Text>

              <Text
                numberOfLines={2}
                style={[styles.cardDetails, { marginTop: 5 }]}
              >
                Glasgow, Scotland, Newton Place Glasgow, G3 7PR, Suite 2410
                Montreal, QC, H3A 2A5, Scotland, United Kingdom, 10017
              </Text>

              <Text
                numberOfLines={2}
                style={[styles.cardDetails, { marginTop: 5 }]}
              >
                beam_test@globaldata.com
              </Text>

              <Text numberOfLines={2} style={[, { marginTop: 5 }]}>
                3456787564353
              </Text>
            </View>

            <View style={styles.cardImgWrapper}>
              <View>
                <TouchableOpacity
                  style={styles.attendeeBtn}
                  onPress={() => bookmark(item)}
                >
                  <View style={styles.attendeeIcon}>
                    <FontAwesome name="edit" size={22} color="#1E1727" />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    marginLeft: 20,
                  }}
                  onPress={() =>
                    navigation.navigate("meetinglist", {
                      title: "My Meetings",
                      //   screen: "Request",
                      //   id: item.id,
                      //   name: item.Name,
                    })
                  }
                >
                  <Entypo name="share" size={26} color="#1E1727" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    marginLeft: 20,
                  }}
                  onPress={() =>
                    navigation.navigate("messagelist", {
                      screen: "New Message",
                      // params: { id: item.id, name: `${item.Name}` },
                    })
                  }
                >
                  <AntDesign name="delete" size={26} color="red" />
                </TouchableOpacity>
              </View>
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
                      "https://events.globaldata.com/wp-content/uploads/2020/07/1594097432Tracy-Paddock-e1591956088933-250x250-1.jpg",
                  }}
                  resizeMode="cover"
                  style={styles.iconWidth}
                />
              </View>
            </View>

            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}></Text>
              <Text numberOfLines={2} style={styles.cardDesg}>
                IIOT Strategy Advisor
              </Text>
              <Text numberOfLines={2} style={styles.cardDetails}>
                Helius Hospitality
              </Text>

              <Text
                numberOfLines={2}
                style={[styles.cardDetails, { marginTop: 5 }]}
              ></Text>

              <Text
                numberOfLines={2}
                style={[styles.cardDetails, { marginTop: 5 }]}
              >
                beam_test@globaldata.com
              </Text>

              <Text numberOfLines={2} style={[, { marginTop: 5 }]}></Text>
            </View>

            <View style={styles.cardImgWrapper}>
              <View>
                <TouchableOpacity
                  style={styles.attendeeBtn}
                  onPress={() => bookmark(item)}
                >
                  <View style={styles.attendeeIcon}>
                    <FontAwesome name="edit" size={22} color="#1E1727" />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    marginLeft: 20,
                  }}
                  onPress={() =>
                    navigation.navigate("meetinglist", {
                      title: "My Meetings",
                      //   screen: "Request",
                      //   id: item.id,
                      //   name: item.Name,
                    })
                  }
                >
                  <Entypo name="share" size={26} color="#1E1727" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    marginLeft: 20,
                  }}
                  onPress={() =>
                    navigation.navigate("messagelist", {
                      screen: "New Message",
                      // params: { id: item.id, name: `${item.Name}` },
                    })
                  }
                >
                  <AntDesign name="delete" size={26} color="red" />
                </TouchableOpacity>
              </View>
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
                      "https://events.globaldata.com/wp-content/uploads/2020/07/1594097432Tracy-Paddock-e1591956088933-250x250-1.jpg",
                  }}
                  resizeMode="cover"
                  style={styles.iconWidth}
                />
              </View>
            </View>

            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>My Vcard3</Text>
              <Text numberOfLines={2} style={styles.cardDesg}>
                IIOT Strategy Advisor
              </Text>
              <Text numberOfLines={2} style={styles.cardDetails}>
                Helius Hospitality
              </Text>

              <Text
                numberOfLines={2}
                style={[styles.cardDetails, { marginTop: 5 }]}
              >
                Glasgow, Scotland, Newton Place Glasgow, G3 7PR, Suite 2410
                Montreal, QC, H3A 2A5, Scotland, United Kingdom, 10017
              </Text>

              <Text
                numberOfLines={2}
                style={[styles.cardDetails, { marginTop: 5 }]}
              >
                beam_test@globaldata.com
              </Text>

              <Text numberOfLines={2} style={[, { marginTop: 5 }]}>
                3456787564353
              </Text>
            </View>

            <View style={styles.cardImgWrapper}>
              <View>
                <TouchableOpacity
                  style={styles.attendeeBtn}
                  onPress={() => bookmark(item)}
                >
                  <View style={styles.attendeeIcon}>
                    <FontAwesome name="edit" size={22} color="#1E1727" />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    marginLeft: 20,
                  }}
                  onPress={() =>
                    navigation.navigate("meetinglist", {
                      title: "My Meetings",
                      //   screen: "Request",
                      //   id: item.id,
                      //   name: item.Name,
                    })
                  }
                >
                  <Entypo name="share" size={26} color="#1E1727" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    marginLeft: 20,
                  }}
                  onPress={() =>
                    navigation.navigate("messagelist", {
                      screen: "New Message",
                      // params: { id: item.id, name: `${item.Name}` },
                    })
                  }
                >
                  <AntDesign name="delete" size={26} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  constainer: {
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
  attendeeIcon: {
    marginTop: 10,
    marginLeft: 25,
  },
});
