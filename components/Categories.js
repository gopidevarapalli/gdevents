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
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";

const Categories = (props) => {
  const navigation = useNavigation();

  const theme = useTheme();

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />

      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate("profilelist", { title: "My Profile" })
          }
        >
          <View style={styles.categoryIcon}>
            {/* <Ionicons name="ios-restaurant" size={35} color="#FF6347" /> */}
            <Image
              source={require("../assets/icons/user.png")}
              resizeMode="cover"
              style={styles.iconWidth}
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate("meetinglist", { title: "My Meetings" })
          }
        >
          <View style={styles.categoryIcon}>
            <Image
              source={require("../assets/icons/interview.png")}
              resizeMode="cover"
              style={styles.iconWidth}
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Meetings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate("peoplelist", {
              title: "People",
            })
          }
        >
          <View style={styles.categoryIcon}>
            <Image
              source={require("../assets/icons/team.png")}
              resizeMode="cover"
              style={styles.iconWidth}
            />
          </View>
          <Text style={styles.categoryBtnTxt}>People</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() => navigation.navigate("feed", { title: "My Feed" })}
        >
          <View style={styles.categoryIcon}>
            <Image
              source={require("../assets/icons/streaming.png")}
              resizeMode="cover"
              style={styles.iconWidth}
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Stream</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() => navigation.navigate("Agenda", { title: "My Agenda" })}
        >
          <View style={styles.categoryIcon}>
            <Image
              source={require("../assets/icons/survey.png")}
              resizeMode="cover"
              style={styles.iconWidth}
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Agenda</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate("messagelist", { title: "Messages" })
          }
        >
          <View style={styles.categoryIcon}>
            <Image
              source={require("../assets/icons/survey.png")}
              resizeMode="cover"
              style={styles.iconWidth}
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Message</Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate("vcards", { title: "vcards" })
          }
        >
          <View style={styles.categoryIcon}>
            <Image
              source={require("../assets/icons/survey.png")}
              resizeMode="cover"
              style={styles.iconWidth}
            />
          </View>
          <Text style={styles.categoryBtnTxt}>vCards</Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate("events", { title: "Events Details" })
          }
        >
          <View style={styles.categoryIcon}>
            <Image
              source={require("../assets/icons/calendar.png")}
              resizeMode="cover"
              style={styles.iconWidth}
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Events</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate("rllist", { title: "My Connections" })
          }
        >
          <View style={styles.categoryIcon}>
            <Image
              source={require("../assets/icons/crm.png")}
              resizeMode="cover"
              style={styles.iconWidth}
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Connections</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() => navigation.navigate("favlist", { title: "Bookmarks" })}
        >
          <View style={styles.categoryIcon}>
            <Entypo name="bookmark" size={50} color="#00dea5" />
            {/* <Image
              source={require("../assets/icons/shopping.png")}
              resizeMode="cover"
              style={styles.iconWidth}
            /> */}
          </View>
          <Text style={styles.categoryBtnTxt}>Bookmarks</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate("support", { title: "Contact Us" })
          }
        >
          <View style={styles.categoryIcon}>
            <MaterialIcons name="support-agent" size={50} color="#00dea5" />

            {/* <Image
              source={require("../assets/icons/shopping.png")}
              resizeMode="cover"
              style={styles.iconWidth}
            /> */}
          </View>
          <Text style={styles.categoryBtnTxt}>Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate("Sponsors", {
              title: "Sponsors",
            })
          }
        >
          <View style={styles.categoryIcon}>
            {/* <Image
              source={require("../assets/icons/team.png")}
              resizeMode="cover"
              style={styles.iconWidth}
            /> */}
            <FontAwesome name="handshake-o" size={50} color="#00dea5" />
          </View>
          <Text style={styles.categoryBtnTxt}>Sponsors</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate("livevideo", {
              title: "livevideo",
            })
          }
        >
          <View style={styles.categoryIcon}>
            <FontAwesome name="handshake-o" size={50} color="#00dea5" />
          </View>
          <Text style={styles.categoryBtnTxt}>livevideo</Text>
        </TouchableOpacity>
       */}
      
      </View>
    </ScrollView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderContainer: {
    height: 250,
    width: "100%",
    marginTop: 12,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 0,
  },

  wrapper: {},
  iconWidth: {
    width: 50,
    height: 50,
    padding: 10,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 8,
  },
  sliderImage: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
  },
  categoryContainer: {
    flexDirection: "row",
    width: "93%",
    alignSelf: "center",
    marginTop: 25,
    flex: 1,
    //justifyContent: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "stretch",
    flexWrap: "wrap",
  },

  categoryBtn: {
    marginBottom: 8,
    marginTop: 8,
    marginHorizontal: 0,
    alignSelf: "center",
    // alignSelf: "flex-start",
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 75,
    height: 75,
    backgroundColor: "#fff" /* '#FF6347' */,
    borderRadius: 10,
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  categoryBtnTxt: {
    alignSelf: "center",
    marginTop: 10,
    color: "#09BA90",
  },
  cardsWrapper: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
  },
  card: {
    height: 140,
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

    borderColor: "#fff",
    borderLeftWidth: 0,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
  cardImg: {
    height: "100%",
    width: "100%",
    borderColor: "#fff",
    alignSelf: "center",
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderLeftWidth: 0,
  },
  cardText: {
    borderRadius: 8,
  },
  cardInfo: {
    flex: 2,
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
    lineHeight: 22,
  },
  cardDetails: {
    fontSize: 12,
    color: "#444",
  },
});
