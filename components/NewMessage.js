import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  AsyncStorage,
  ActivityIndicator,
} from "react-native";
import { Button } from "react-native-paper";
import { Picker } from "@react-native-community/picker";
import Axios from "axios";
import { connect } from "react-redux";
import MultiSelect from "react-native-multiple-select";
import { ScrollView } from "react-native-gesture-handler";
import api_url from "../Config/Config";

function NewMessage(props) {
  console.log("new message", props);
  let [to, selectTo] = useState([]);
  let [toSelected, setToSelected] = useState();

  //const [to, onChangeText] = React.useState();
  const [subject, onChangeSub] = React.useState();
  const [message, onChangeMsg] = React.useState();

  const [isLoading, setIsLoading] = useState(true);

  const addfiles = () => {};

  useEffect(() => {
    console.log(props);

    // setToSelected(('"'+props.route.params.id+'"'));
    const formData = new FormData();
    formData.append("cookie", props.login.cookie);
    formData.append("event_id", props.event.common.event.event_id_single);
    Axios.post(
      //`https://events.globaldata.com/api/user/get_to_users`,
      `${api_url.getToUsers}`,
      formData
    ).then((res) => {
      console.log(res.data);
      res.data.tousers.forEach((user, i) => {
        to.push({
          label: user.name,
          userid: user.id,
        });
        // console.log(user.id, Number(props.route.params.id))
        if (i + 1 == res.data.tousers.length) {
          // toSelected = {userid:props.route.params.id, label: props.route.params.name}
          // setToSelected({userid:props.route.params.id, label: props.route.params.name})
          selectTo(to);
          setIsLoading(false);
        }
      });
    });
  }, [props.login.cookie]);
  if (props.route.params) {
    useEffect(() => {
      console.log("params props", props);
      // console.log(toSelected)
      if (props.route.params.id) {
        setToSelected(Number(props.route.params.id));
      }
    }, [props.route.params.id]);
  }

  const submitMessage = () => {
    console.log(toSelected);
    console.log(subject);
    console.log(message);
    if (toSelected == "" || toSelected == undefined) {
      Alert.alert("Warning!", "Please select Receiver");
    } else if (subject == undefined || subject == "") {
      Alert.alert("Warning!", "Subject is required");
    } else if (message == undefined || message == "") {
      Alert.alert("Warning!", "Message is required");
    } else {
      const formData = new FormData();
      formData.append("cookie", props.login.cookie);
      formData.append("to", toSelected);
      formData.append("subject", subject);
      formData.append("message", message);

      formData.append("event_id", props.event.common.event.event_id_single);
      Axios.post(
        // `https://events.globaldata.com/api/user/create_message`,
        `${api_url.createMessage}`,
        formData
      )
        .then((res) => {
          console.log("send message", res);
          console.log("fffffff", formData);
          console.log(res.data);
          Alert.alert("Success", "Message sent successfully");
          // onChangeSub("");
          // onChangeMsg("");
          // setToSelected([]);
        })
        .catch((e) => {
          console.log(e);
          Alert.alert("Error", "Something went wrong");
        });
    }

    // });
  };
  return isLoading ? (
    <ActivityIndicator size="large" color="green" />
  ) : (
    <View style={styles.container}>
      <ScrollView>
        {/* <View>
          <Text>Send Message</Text>
        </View> */}

        <View style={[styles.textInputPicker, { marginTop: 20 }]}>
          <Picker
            selectedValue={toSelected}
            onValueChange={(itemValue, itemIndex) => setToSelected(itemValue)}
          >
            <Picker.Item label="To" value="" />
            {to.map((item, i) => {
              return (
                <Picker.Item key={i} label={item.label} value={item.userid} />
              );
            })}
          </Picker>
          {/* <MultiSelect
              hideTags
              items={to}
              uniqueKey="userid" 
              onSelectedItemsChange={setToSelected}
              selectedItems={toSelected}
              selectText="Users"
              searchInputPlaceholderText="Search Users..."
              onChangeInput={(text) => console.log(text)}
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              searchInputStyle=""
              tagTextColor="#CCC"
              selectedItemTextColor="green"
              selectedItemIconColor="green"
              itemTextColor="#000"
              displayKey="label"
              searchInputStyle={{ color: "#CCC" }}
              submitButtonColor="green"
              submitButtonText="Pick"
            /> */}
        </View>

        {/* <View>
                <Text>To:</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => onChangeText(text)}
                    //value={value}
                    />
            </View> */}

        <View style={{ marginTop: 10 }}>
          <TextInput
            style={styles.textInput}
            placeholder="Subject"
            placeholderTextColor="#ccc"
            onChangeText={(text) => onChangeSub(text)}
            multiline={true}
            numberOfLines={4}
            value={subject}
          />

          <TextInput
            style={[styles.textInput, { marginTop: 20, height: 120 }]}
            textAlignVertical="top"
            multiline={true}
            autoCorrect={false}
            placeholder="Message"
            placeholderTextColor="#ccc"
            onChangeText={(text) => onChangeMsg(text)}
            multiline={true}
            numberOfLines={7}
            value={message}
          />
        </View>
        {/* <View style={{marginTop:10}}></View>
            <Button
            onPress={addfiles}
            title="Add Files"
            color="#00dea5"
            /> */}
        <View style={{ alignSelf: "center", marginTop: 30 }}>
          <Button
            style={{
              marginTop: 8,
              marginBottom: 12,
              width: 200,
              //height: 35,
              alignSelf: "center",
              justifyContent: "center",
              borderRadius: 25,
            }}
            color="#00DEA5"
            contentStyle={{ height: 44 }}
            labelStyle={{ color: "#2F283D", fontSize: 15, fontWeight: "bold" }}
            mode="contained"
            onPress={() => submitMessage()}
          >
            Send Message
          </Button>
        </View>
        {/* <Button onPress={submitMessage} title="Send Message" color="#000" /> */}
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
  textInputPicker: {
    // height: 46,
    backgroundColor: "#fff",
    borderRadius: 5,
    // marginTop: 10,
    //padding: 10,
    width: "100%",
    borderWidth: 1,
    borderColor: "#D3D3D3",
    alignSelf: "center",
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

const mapStateToProps = (state) => {
  // console.log(state.MyMeetings)
  return {
    login: state.login,
    event: state.Event,
  };
};
export default connect(mapStateToProps)(NewMessage);
