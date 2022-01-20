import React, { useEffect, useState } from "react";
import {
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

function FeedComponent(props) {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  const [feedList, setFeedList] = useState(props.feeds);
  let [writeComment, setWriteComment] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  let [tempArray, setTempArray] = useState([]);

  useEffect(() => {
    console.log("useeffect called item.js");
    if (isLoading) {
      // const formData = new FormData();
      // formData.append('cookie',props.login.cookie);
      // Axios.post(`${api_url.FeedList}`, formData)
      // .then(res=>{
      //     console.log(res.data.stream[0])
      //     setFeedList(res.data.stream);
      // setIsLoading(false);
      feedList.forEach((item, i) => {
        writeComment.push("");
        if (i + 1 == feedList.length) {
          setWriteComment(writeComment);
          console.log(writeComment);
          setIsLoading(false);
        }
      });
      // })
    }
  }, []);

  // useEffect(()=>{
  //     console.log('write comment use effect 1')
  //     // setWriteComment(writeComment);
  // },[tempArray])

  // const writeCommentFunc =(i,val)=>{
  //     // console.log(val);
  //     let temp = writeComment;
  //     temp[i] = val;
  //     writeComment = temp;
  //     setTempArray(writeComment)
  //     setWriteComment(writeComment);
  // }

  return isLoading ? (
    <ActivityIndicator size={30} color="green" />
  ) : (
    <ScrollView style={styles.container}>
      <View style={styles.cardsWrapper}>
        <FlatList
          keyExtractor={(item, index) => index}
          data={feedList}
          renderItem={({ item, index }) => {
            console.log(index);
            return (
              <View style={styles.card}>
                <View style={styles.cardBody}>
                  {/* <Image style={{ height: 60, width: 60, borderRadius:50 }}  source={{uri:item.profile_pic}} /> */}
                  <Image
                    style={{ height: 60, width: 60, borderRadius: 50 }}
                    source={{ uri: item.Profilepic }}
                  />

                  <View style={styles.cardDetails}>
                    <View style={styles.headDetails}>
                      <Text style={styles.textBody}>{item.Name} </Text>
                      <Text>Uploaded 1 photo</Text>
                    </View>
                    <Text style={{ marginTop: 7, flexDirection: "row" }}>
                      {item.PostAge}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text style={{ marginLeft: 16, marginRight: 16 }}>
                    {item.Content}
                  </Text>

                  {/* <Image style={{width: '100%', height:200, marginTop:10 }}  source={{uri: 'https://ind-backend-events-website.pantheonsite.io/wp-content/uploads/peepso/users/210/photos/thumbs/62dc877f345563fcd7fd20c707f2164f_l.jpg'}} /> */}
                  <HTML
                    alterChildren={(node) => {
                      if (node.name === "iframe") {
                        delete node.attribs.width;
                        delete node.attribs.height;
                      }
                      return node.children;
                    }}
                    tagsStyles={{
                      p: { lineHeight: 22, marginBottom: 10 },
                      iframe: { opacity: 0.99 },
                    }}
                    html={"<p>" + item.Attachment + "</p>"}
                    imagesMaxWidth={Dimensions.get("window").width}
                  />
                </View>

                {item.comments ? (
                  item.comments.map((comment, i) => {
                    console.log(comment);
                    return (
                      <View style={styles.cardBody} key={i}>
                        <Image
                          style={{ height: 50, width: 50, borderRadius: 50 }}
                          source={{ uri: comment.Profilepic }}
                        />
                        <View style={styles.cardDetails}>
                          <View style={styles.headDetails}>
                            <Text style={styles.textBody}>{comment.Name} </Text>
                            <Text>{comment.Content}</Text>
                          </View>

                          <View style={{ flexDirection: "row" }}>
                            <View
                              style={{
                                // backgroundColor: "#ddd",
                                flexDirection: "row",
                              }}
                            >
                              <Text>{comment.CommentAge}</Text>
                              {/* <FontAwesome
                                style={{ marginLeft: 5, marginTop: 3 }}
                                name="link"
                                size={16}
                                color="black"
                              /> */}
                            </View>
                            <FontAwesome
                              style={{ marginLeft: 8, marginTop: 3 }}
                              name="thumbs-up"
                              size={16}
                              color="black"
                            />
                            <MaterialIcons
                              style={{ marginLeft: 10, marginTop: 3 }}
                              name="add"
                              size={16}
                              color="black"
                            />
                            <MaterialIcons
                              style={{ marginLeft: 10, marginTop: 3 }}
                              name="edit"
                              size={16}
                              color="black"
                            />
                          </View>
                        </View>
                      </View>
                    );
                  })
                ) : (
                  <View></View>
                )}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flex: 1,
                  }}
                >
                  <TextInput
                    style={{ marginLeft: 15 }}
                    placeholder="Write a comment..."
                    // editable={false}
                    value={writeComment[index]}
                    onChangeText={(val) => {
                      console.log(val);
                      let temp = writeComment;
                      temp[index] = val;
                      writeComment = temp;
                      console.log(writeComment);

                      setTempArray(val);
                      setWriteComment(writeComment);
                    }}
                  />
                  {/* <Fontisto name="plus" style={{marginTop:18, marginLeft:160}} color="black" /> */}
                  <Entypo
                    name="attachment"
                    style={{ marginTop: 18, flex: 1, marginLeft: 140 }}
                    size={16}
                  />
                  {writeComment[index].length ? (
                    <Ionicons
                      name="send"
                      style={{ marginTop: 18, marginRight: 10 }}
                      size={16}
                      onPress={() => {
                        alert("Your comment will be posted");

                        let temp = writeComment;
                        temp[index] = "";
                        writeComment = temp;

                        setTempArray("");
                        setWriteComment(writeComment);
                      }}
                    />
                  ) : (
                    <View></View>
                  )}
                </View>
              </View>
            );
          }}
        />
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    event: state.Event,
  };
};

export default connect(mapStateToProps)(FeedComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#ebde34',
    //alignItems: 'center',
    //justifyContent: 'center',
    // padding:16,
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
