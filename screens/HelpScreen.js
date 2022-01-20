import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
import { WebView } from "react-native-webview";
import Axios from "axios";
import { connect } from "react-redux";
import HTML from "react-native-render-html";
import api_url from "../Config/Config";

const HelpScreen = (props) => {
  console.log("help props", props);

  const [helpInfo, setHelpInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Helpcenter");
    let formData = new FormData();
    formData.append("cookie", props.login.cookie);
    formData.append("event_id", props.event.common.event.event_id_single);
    Axios.post(
      // `https://events.globaldata.com/api/user/get_help`,
      `${api_url.getHelp}`,
      formData
    ).then((res) => {
      console.log("res", res);
      setHelpInfo(res.data);
      setIsLoading(false);
      console.log("data", helpInfo);
    });
  }, []);

  return isLoading ? (
    <ActivityIndicator size={30} color="green" />
  ) : (
    <ScrollView style={styles.container}>
      <View style={styles.cardsWrapper}>
        {/* <Text>{helpInfo[0].title}</Text> */}
        {/* {helpInfo.map((item, i) => (
          <View style={styles.card} key={i}>
            <Text>{item.title}</Text>
          </View>
        ))} */}

        {/* <Text style={{ fontSize: 20 }}>{helpInfo.title}</Text> 
        <Text style={{ fontSize: 20 }}>{helpInfo.url}</Text> */}

        {/* <View style={{ flex: 1, height: 250 }}>
          <Text style={{ fontSize: 20 }}>{helpInfo.title}</Text>
          <WebView source={{ uri: helpInfo.url }} style={{ marginTop: 20 }} />
        </View> */}

        <FlatList
          keyExtractor={(item, i) => i}
          data={helpInfo}
          renderItem={({ item }) => {
            console.log("flatlist ", item);
            return (
              <View style={styles.card}>
                <Text>{item.title}</Text>
              </View>
            );
          }}
        />
        {/* <View style={{ flex: 1, height: 400 }}>
          <Text style={{ fontSize: 20 }}>{helpInfo.title}</Text>
          <Text style={{ fontSize: 20 }}>{helpInfo.url}</Text>
          <WebView
            source={{
              html:
                '<iframe width="100%" height=500 src={{uri: "helpInfo.url"}} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
            }}
            style={{ marginTop: 20 }}
          />
        </View>

        <View style={{ marginTop: 20 }}></View>

        <View style={{ flex: 1, height: 400, marginTop: -170 }}>
          <Text style={{ fontSize: 20 }}>Speakers, Companies and Products</Text>
          <WebView
            source={{
              html:
                '<iframe width="100%" height=500 src="https://players.brightcove.net/49921910001/BylJ9vjKeb_default/index.html?videoId=6185283988001" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
            }}
            style={{ marginTop: 20 }}
          />
        </View> */}
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  // console.log(state.MyMeetings)
  return {
    login: state.login,
    event: state.Event,
  };
};
export default connect(mapStateToProps)(HelpScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //alignItems: 'center',
    //justifyContent: 'center',
    //padding: 16,
  },
  cardsWrapper: {
    marginTop: 20,
    width: "95%",
    alignSelf: "center",
  },
  card: {
    width: "98%",
    alignSelf: "center",
    justifyContent: "center",
    marginVertical: 10,
    //borderWidth: 0.2,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: 1 },
    shadowColor: "#999",
    shadowOpacity: 0.3,
    shadowRadius: 3,
    //margin: 16,
  },
  iframe: {
    width: 500,
  },
});
