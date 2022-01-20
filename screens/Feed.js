import React, { useEffect, useState } from "react";
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
// import Data2 from '../data/Data2.json'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ActivityIndicator, List } from "react-native-paper";
import Axios from "axios";
import { connect } from "react-redux";
import HTML from "react-native-render-html";
import api_url from "../Config/Config";
import { FlatList } from "react-native-gesture-handler";
import FeedComponent from "../components/Feed";

function Feed(props) {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  const [feedList, setFeedList] = useState([]);
  let [writeComment, setWriteComment] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  let [tempArray, setTempArray] = useState([]);

  useEffect(() => {
    console.log("useeffect called item.js");
    if (isLoading) {
      const formData = new FormData();
      formData.append("cookie", props.login.cookie);

      formData.append("event_id", props.event.common.event.event_id_single);
      Axios.post(`${api_url.FeedList}`, formData)
        .then((res) => {
          console.log("res", res.data);
          console.log(res.data.stream[0]);
          setFeedList(res.data.stream);
          setIsLoading(false);
          // res.data.stream.forEach((item,i)=>{
          //     writeComment.push("");
          //     if(i+1 == res.data.stream.length){
          //         setWriteComment(writeComment);
          //         console.log(writeComment);
          //         setIsLoading(false);
          //     }
          // })
        })
        .catch(() => {
          setFeedList([]);
          setIsLoading(false);
        });
    }
  }, []);

  return isLoading ? (
    <ActivityIndicator size={30} color="green" />
  ) : feedList.length == 0 ? (
    <View style={{ flex:1, textAlign:"center", textAlignVertical:"center"}}>
      <Text style={{ flex:1, textAlign:"center", textAlignVertical:"center"}}>No Data found</Text>
    </View>
  ) : (
    <FeedComponent feeds={feedList} />
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    event: state.Event,
  };
};

export default connect(mapStateToProps)(Feed);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#ebde34',
    //alignItems: 'center',
    //justifyContent: 'center',
    // padding:16,
  },
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    margin: 16,
  },
  cardBody: {
    // backgroundColor:"#ddd",
    padding: 16,
    flexDirection: "row",
    borderRadius: 6,
    borderColor: "blue",
  },
  cardDetails: {
    paddingHorizontal: 20,
  },
  headDetails: {
    flexDirection: "row",
  },
  textBody: {
    fontWeight: "bold",
    flexDirection: "row",
  },
  iframe: {
    width: 500,
  },
});
