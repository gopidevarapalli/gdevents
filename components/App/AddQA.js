import React, { useState, useRef } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  Switch,
  FlatList,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-community/picker";
import { Button } from "react-native-paper";
import api_url from "../../Config/Config";

const dimensions = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};

const AddQA = (props) => {
  console.log("Add QA props", props);

  const [quesandans, setQuesandAns] = useState(props.questionList);
  //console.log("list of Q&A", quesandans);
  const [Allquestions, setQuestions] = useState([]);
  const [oldquestions, setTimezone] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [shouldShow, setShouldShow] = useState(false);
  let [subj, setSubject] = useState("");
  const [isLoading, setisLoading] = useState(false);

  console.log("subj", subj);

  let data = [
    {
      id: 1,
      // date: "9:50 am",
      type: "in",
      message: "Hii",
    },
    {
      id: 2,
      //date: "9:50 am",
      type: "out",
      message: "Hello",
    },
  ];

  const getMore = () => {
    console.log("more");
  };

  const askQuestion = () => {
    console.log("ask a question");
    setShouldShow(true);
  };

  const scrollRef = useRef();

  const goToDown = (number) => {
    scrollRef.current.scrollToEnd({ animated: true });
    setShouldShow(!shouldShow);
  };

  const submit = () => {
    setisLoading(true);
    props.askQuestion(subj);
    subj = "";
    //setShouldShow(false);
    setSubject("");
    setisLoading(false);
    Keyboard.dismiss();
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps={"handled"}
      ref={scrollRef}
      style={styles.container}
    >
      <View style={styles.outerView}>
        <Text style={{ fontSize: 18, lineHeight: 24 }}>
          Questions & Answers
        </Text>
        {/* <View style={styles.header}>
          <View style={styles.headerStyle}>
            <Ionicons
              style={styles.newicon}
              color="black"
              name="arrow-back"
              size={24}
            />
            <Text style={styles.viewText}> Q&A</Text>
          </View>

          <View>
            <Ionicons
              style={styles.newicon}
              color="#333"
              name="close"
              size={24}
            />
          </View>
        </View> */}
        {/* <View style={styles.switchToggle}>
          <Switch
            trackColor={{ false: "#767577", true: "#b7f7e7" }}
            thumbColor={isEnabled ? "#00dea5" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text>Allow questions</Text>
        </View> */}
        {/* <View style={styles.pickerView}>
            <View style={styles.input}>
              <Picker
                selectedValue={Allquestions}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }
              >
                <Picker.Item label="All questions" value="Allquestions" />
              </Picker>
            </View>
            <View style={styles.input}>
              <Picker
                selectedValue={oldquestions}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }
              >
                <Picker.Item label="Oldest first" value="oldquestions" />
              </Picker>
            </View>
          </View> */}

        {/* <View style={styles.Card}>
          <View style={styles.cardWraper}>
            <View style={styles.col1}>
              <Image
                style={styles.ImageView}
                source={{
                  uri:
                    "https://events.globaldata.com/wp-content/uploads/2020/10/160370792615985122144.jpg",
                }}
              />
            </View>
            <View style={styles.col2}>
              <Text style={styles.profileName}>Kevin Lord</Text>
              <Text style={styles.dateMessage}>Jul 29.4:50PM</Text>
            </View>

            <View style={styles.col3}>
              <View>
                <Text style={styles.likesCount}>6</Text>
              </View>
              <FontAwesome color="#333" name="thumbs-o-up" size={22} />
            </View>
          </View>
          <View style={styles.messageView}>
            <Text style={styles.messageTxt}>
              Sorry I joined late, what is latest timing of when we're targeting
              to go live?
            </Text>
          </View>
          <View style={styles.direction}>
            <Ionicons
              style={styles.icon}
              color="#696969"
              name="eye-off-outline"
              size={24}
            />
            <Ionicons
              style={styles.icon}
              color="#696969"
              name="ios-checkmark-circle-outline"
              size={24}
            />
          </View>
        </View> */}

        <View>
          <FlatList
            onEndReached={() => getMore()}
            keyExtractor={(item, i) => i}
            data={props.questionList}
            renderItem={({ item }) => {
              // console.log("res", item);
              // const item1 = item.item;
              let inQuestion = item.type === "in";
              return (
                <View>
                  <View style={[styles.Card, inQuestion]}>
                    <View>
                      <View style={styles.cardWraper}>
                        <View style={styles.col1}>
                          <Image
                            style={styles.ImageView}
                            source={{
                              uri:
                                //"https://coe-test-events-website.pantheonsite.io" +
                                `${api_url.live_url}` + item.authorimage,
                            }}
                          />
                        </View>
                        <View style={styles.col2}>
                          <Text style={styles.profileName}>
                            {item.author_name}
                          </Text>
                          {/* <Text style={styles.dateMessage}>Jul 29.4:50PM</Text> */}
                        </View>

                        {/* <View style={styles.col3}>
                        <View>
                          <Text style={styles.likesCount}>6</Text>
                        </View>
                        <FontAwesome
                          color="#333"
                          name="thumbs-o-up"
                          size={22}
                        />
                      </View> */}
                      </View>
                    </View>
                    <View style={styles.messageView}>
                      <Text style={styles.messageTxt}>{item.title}</Text>
                    </View>
                    {/* <View style={styles.direction}>
                    <Ionicons
                      style={styles.icon}
                      color="#696969"
                      name="eye-off-outline"
                      size={24}
                    />
                    <Ionicons
                      style={styles.icon}
                      color="#696969"
                      name="ios-checkmark"
                      size={24}
                    />
                  </View> */}
                  </View>
                </View>
              );
            }}
          />
        </View>

        {/* <TouchableOpacity style={styles.addQuestion} onPress={goToDown}>
          <Text style={styles.addQAtext}>
            <Ionicons
              style={styles.icon}
              color="#00dea5"
              name="md-add-outline"
              size={22}
            />
            Ask a question
          </Text>
        </TouchableOpacity> */}
        {/* {shouldShow ? (  ) : null} */}
        <View>
          <TextInput
            style={[styles.textInput, { height: 120 }]}
            textAlignVertical="top"
            multiline={true}
            placeholder="Ask a Question"
            placeholderTextColor="#ccc"
            onChangeText={(val) => setSubject(val)}
            value={subj}
          />
          {isLoading ? (
            <ActivityIndicator size="large" color="green" />
          ) : (
            <Button
              style={{ margin: 8, marginTop: 20 }}
              color="#00dea5"
              contentStyle={{ height: 34 }}
              labelStyle={{ color: "white", fontSize: 15, fontWeight: "bold", textTransform: "capitalize"  }}
              mode="contained"
              onPress={submit}
            >
              submit
            </Button>
          )}
        </View>
      </View>
    </ScrollView>
  );
};
export default AddQA;

const styles = StyleSheet.create({
  container: { flex: 1, marginBottom: 180 },
  outerView: { margin: 10 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 10,
  },
  viewText: { fontSize: 20, fontWeight: "bold" },
  headerStyle: { flexDirection: "row", alignItems: "center" },
  pickerView: { flexDirection: "row", justifyContent: "space-between" },
  switchToggle: {
    backgroundColor: "#F0F0F0",
    padding: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  direction: { flexDirection: "row" },
  Card: {
    flexWrap: "nowrap",
    padding: 10,
    paddingBottom: 15,
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#e3e3e3",
    width: "100%",
    justifyContent: "center",
  },
  cardWraper: { flexDirection: "row" },
  col1: {
    width: "15%",
  },
  ImageView: { height: 40, width: 40, borderRadius: 40 },
  col2: {
    width: "75%",
    flexDirection: "column",
  },
  profileName: {
    marginLeft: 5,
    color: "#333",
    fontWeight: "bold",
    fontSize: 14,
  },
  dateMessage: { marginLeft: 5, color: "grey", fontSize: 13 },
  col3: {
    width: "10%",
    flexDirection: "row",
    alignItems: "center",
  },
  likesCount: { marginRight: 8 },
  messageView: { marginTop: 10, marginBottom: 10 },
  messageTxt: { lineHeight: 20, fontSize: 14 },
  icon: {
    marginRight: 20,
  },
  input: {
    width: "42%",
  },
  addQuestion: {
    //flexDirection: "row-reverse",
    justifyContent: "flex-end",
    marginTop: 35,
    padding: 5,
    alignItems: "flex-end",
  },
  addQAtext: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 6,
    color: "#00dea5",
  },
  textInput: {
    height: 46,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    width: "100%",
    borderWidth: 1,
    borderColor: "#D3D3D3",
    alignSelf: "center",
  },
});
