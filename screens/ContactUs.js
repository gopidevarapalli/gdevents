import Axios from "axios";
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  Keyboard,
} from "react-native";
import { Button } from "react-native-paper";
import { connect } from "react-redux";
import api_url from "../Config/Config";

function ContactUs(props) {
  console.log("contact us", props);

  const [value, onChangeText] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {}, []);

  const sendMessage = () => {
    console.log("senddd");
    const formData = new FormData();
    console.log(props.login.cookie);
    if (name == "") {
      Alert.alert("Warning!", "Enter Your Name");
    } else if (email == "") {
      Alert.alert("Warning!", "Enter Your Email");
    } else if (subject == "") {
      Alert.alert("Warning!", "Enter Your Subject");
    } else if (message == "") {
      Alert.alert("Warning!", "Enter Your Message");
    } else {
      // formData.append('cookie', props.login.cookie);
      // formData.append(
      //   "cookie",
      //   "SHEA|1608795046|anqDvw6zPUgCdrTiqEnbRozw0PsvB8aON08g0sKpZPy|932c06c36be0437a9438c92a76788f5f303c300c8a6312da227378777c210dff"
      // );
      setIsLoading(true);
      formData.append("cookie", props.login.cookie);
      formData.append("event_id", props.event.common.event.event_id_single);
      formData.append("your_name", name);
      formData.append("your_email", email);
      formData.append("your_subject", subject);
      formData.append("your_message", message);
      Axios.post(
        //`https://events.globaldata.com/api/user/add_contact`,
        `${api_url.addContact}`,
        formData
      )
        .then((res) => {
          Keyboard.dismiss();
          console.log(res.data);
          if (res.data.error) {
            Alert.alert("Warning!", "Something went wrong. Please try later");
            setIsLoading(false);
          } else {
            Alert.alert(
              "Success",
              "Your message has been submitted. We will contact you soon!"
            );
            setIsLoading(false);
          }
        })
        .catch(() => {
          setIsLoading(false);

          Alert.alert("Warning!", "Something went wrong. Please try later");
        });
    }
    setName("");
    setEmail("");
    setMessage("");
    setSubject("");
  };

  return (
    <ScrollView keyboardShouldPersistTaps={"handled"} style={styles.container}>
      <View style={{ marginTop: 20 }}>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Your Name(required)"
            placeholderTextColor="#ccc"
            onChangeText={(val) => setName(val)}
            value={name}
          />
          <TextInput
           style={[styles.textInput, { marginTop: 20 }]}
            placeholder="Your Email(required)"
            placeholderTextColor="#ccc"
            onChangeText={(val) => setEmail(val)}
            value={email}
          />

          <TextInput
            style={[styles.textInput, { marginTop: 20 }]}
            placeholder="Subject"
            placeholderTextColor="#ccc"
            onChangeText={(val) => setSubject(val)}
            value={subject}
          />
          <TextInput
            style={[styles.textInput, { marginTop: 20, height: 120 }]}
            textAlignVertical="top"
            multiline={true}
            autoCorrect={false}
            placeholder="Your Message"
            placeholderTextColor="#ccc"
            onChangeText={(text) => setMessage(text)}
            value={message}
          />
        </View>
      </View>

      <View style={{ alignSelf: "center", marginTop: 20 }}>
        <Button
          style={{
            marginTop: 8,
            marginBottom: 12,
            width: 90,
            //height: 35,
            alignSelf: "center",
            justifyContent: "center",
            borderRadius: 25,
          }}
          color="#00DEA5"
          contentStyle={{ height: 44 }}
          labelStyle={{
            color: "#2F283D",
            fontSize: 16,
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
          mode="contained"
          onPress={() => {
            if (isLoading) {
            } else {
              sendMessage();
            }
          }}
          disabled={isLoading ? true : false}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color="green" />
          ) : (
            <Text> Send</Text>
          )}
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //alignItems: 'center',
    //justifyContent: 'center',
    // padding: 16,
  },
  input: {
    fontWeight: "bold",
    marginBottom: 30,
    borderRadius: 10,
    borderColor: "#f2f2f2",
    borderWidth: 2,
  },
  textInput: {
    // height: 46,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    width: "90%",
    borderWidth: 1,
    borderColor: "#D3D3D3",

    alignSelf: "center",
  },
});

const stateToProps = (state) => {
  return {
    login: state.login,
    event: state.Event,
  };
};

export default connect(stateToProps)(ContactUs);
