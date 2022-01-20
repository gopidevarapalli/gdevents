import Axios from "axios";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import api_url from "../Config/Config";

function Inbox(props) {
  console.log("inbox", props);
  console.log("event_id", props.event.common.event.event_id_single);
  const [subject, onChangeSub] = React.useState();

  const [messages, setMessages] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Inbox");
    const formData = new FormData();
    formData.append("cookie", props.login.cookie);
    formData.append("event_id", props.event.common.event.event_id_single);
    formData.append("fep_filter", "inbox");
    Axios.post(
      // `https://member-events-website.pantheonsite.io/api/user/get_messages`,
      //`https://events.globaldata.com/api/user/get_messages`,
      `${api_url.inboxGetMessage}`,
      formData
    )
      .then((res) => {
        console.log("inbox res", res);
        console.log(res.data.messages);
        setMessages(res.data.messages);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return isLoading ? (
    <ActivityIndicator size="large" color="green" />
  ) : messages === 0 ? (
    <Text>No messages</Text>
  ) : (
    <View style={styles.container}>
      <ScrollView>
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => {
            return (
              <View style={styles.cardBody}>
                <View
                  style={{ flexDirection: "row", marginLeft: 10, marginTop: 5 }}
                >
                  <Image
                    style={styles.img}
                    source={{
                      uri:
                        //  "https://events.globaldata.com/wp-content/uploads/2020/10/1604132259smith.jpg",
                        `${api_url.neutralImage}`,
                    }}
                  />
                  <Image
                    style={styles.img2}
                    source={{
                      uri:
                        // "https://events.globaldata.com/wp-content/uploads/2020/10/160370792615985122144.jpg",
                        `${api_url.neutralImage}`,
                    }}
                  />
                </View>

                <View style={styles.cardDetails}>
                  <View style={styles.headDetails}>
                    <Text style={styles.textBody}>Shea Bill</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>{item.mgs_created}</Text>
                    <View
                      style={{
                        backgroundColor: "#cc0022",
                        borderRadius: 15,
                        justifyContent: "flex-end",
                        alignContent: "flex-end",
                        alignSelf: "flex-end",
                        height: 20,
                        width: 60,
                      }}
                    >
                      <Text style={{ textAlign: "center", color: "#fff" }}>
                        Unread
                      </Text>
                    </View>
                  </View>

                  <Text numberOfLines={1} style={styles.subject}>
                    {item.mgs_title}
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.description}
                  >
                    {item.mgs_content}
                  </Text>

                  <View style={styles.btn}>
                    <Text style={{ textAlign: "center", color: "#fff" }}>
                      Details
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#ebde34',
    //alignItems: 'center',
    //justifyContent: 'center',
    padding: 16,
  },
  img: {
    height: 30,
    width: 30,
    borderRadius: 30,
  },
  img2: {
    marginLeft: -10,
    height: 30,
    width: 30,
    borderRadius: 50,
    opacity: 0.2,
  },
  cardBody: {
    width: "100%",
    alignSelf: "center",
    paddingTop: 16,
    paddingBottom: 16,
    flexDirection: "row",
    borderRadius: 20,
    backgroundColor: "#ffffff",
    borderColor: "#f2f2f2",
    borderWidth: 2,
    marginTop: 15,
  },
  cardDetails: {
    paddingHorizontal: 15,
  },
  headDetails: {
    flexDirection: "row",
  },
  textBody: {
    //fontWeight:"bold",
    fontSize: 18,
  },
  subject: {
    fontSize: 14,
    fontWeight: "bold",
  },
  description: {
    width: "95%",
    fontSize: 13,
    flexWrap: "wrap",
    //fontWeight:"bold",
  },
  attendeeIcon: {
    marginTop: 10,
    marginLeft: 25,
  },
  btn: {
    backgroundColor: "#20c997",
    marginTop: 5,
    borderRadius: 15,
    alignSelf: "flex-end",
    height: 20,
    width: 60,
  },
});

const mapStateToProps = (state) => {
  // console.log(state.MyMeetings)
  return {
    login: state.login,
    event: state.Event,
  };
};
export default connect(mapStateToProps)(Inbox);
