import React, { Component, useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView,
  FlatList,
  AsyncStorage,
  SafeAreaView,
  DatePickerIOS,
  ActivityIndicator,
} from "react-native";
import moment from "moment";
import { Button } from "react-native-paper";
var dateformat = require("dateformat");

//import {View, Button, Platform} from 'react-native';
//import RNDateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";
import { Picker } from "@react-native-community/picker";
import { sub } from "react-native-reanimated";
import { connect } from "react-redux";

import MultiSelect from "react-native-multiple-select";
import api_url from "../Config/Config";

const MeetingRequest = (props) => {
  console.log("meeting request", props);
  const [checked, setChecked] = React.useState("first");
  const [value, setValue] = useState("one");
  const [slotData, setSlotData] = useState([]);
  const [slotselected, setSlotselected] = useState("");

  const [locations, setlocations] = useState([]);
  const [locationSelected, setLocationSelected] = useState("");

  const [attendees, setAttendees] = useState([]);
  const [attendeesSelected, setAttendeesSelected] = useState([]);

  const [subj, setSubject] = useState("");
  const [desc, setDescription] = useState("");

  const [event_id, setevent_id] = useState("");
  const [event_start_time, setEvent_start_time] = useState("");
  const [event_end_time, setEvent_end_time] = useState("");

  const [loadMeeting, setloadMeeting] = useState(false);

  const [selectedItems, setselectedItems] = useState([]);
  const MeetingTypes = [
    {
      key: "one",
      text: "One to One Meeting",
    },
    {
      key: "group",
      text: "Group Meeting",
    },
  ];
  const onSelectedItemsChange = (selectedItems) => {
    // this.setState({ selectedItems });
    setselectedItems(selectedItems);
  };

  const [attendeeIDProp, setattendeeIDProp] = useState(props.route.params.id);
  const [attendeeNameProp, setattendeeNameProp] = useState(
    props.route.params.name
  );
  useEffect(() => {
    console.log(props.route);
    // alert(props.login.cookie)
    if (attendeeIDProp) {
      setAttendees([
        {
          ID: attendeeIDProp,
          display_name: attendeeNameProp,
        },
      ]);
      setAttendeesSelected([attendeeIDProp]);
    }

    // console.log(props.route.params.id);
    setValue("one");

    const formData = new FormData();
    formData.append("cookie", props.login.cookie);

    formData.append("event_id", props.event.common.event.event_id_single);
    axios.post(`${api_url.meetingSlotDateInfo}`, formData).then((res) => {
      console.log("slot res", res);
      setSlotData(res.data.slotdate == null ? [] : res.data.slotdate);
      getAttendees(res.data.slotdate == null ? [] : res.data.slotdate[0]);
      setlocations(res.data.locations == null ? [] : res.data.locations);
    });
  }, []);

  const getAttendees = (slotVal) => {
    setSlotselected(slotVal);
    setevent_id(slotVal.event_id);
    setEvent_start_time(slotVal.slot_start_time);
    setEvent_end_time(slotVal.slot_end_time);
    console.log(slotselected);

    const formData = new FormData();
    formData.append("cookie", props.login.cookie);
    formData.append("slot_id", slotVal.id);

    formData.append("event_id", props.event.common.event.event_id_single);
    axios.post(`${api_url.meetingAttendeesInfo}`, formData).then((res) => {
      console.log("meetig request attendees", res.data);
      setAttendees(res.data.attendees);
    });
  };

  const CreateMeeting = () => {
    console.log(attendeesSelected);

    if (
      locationSelected === "" ||
      slotselected === "" ||
      attendeesSelected.length === 0
    ) {
      Alert.alert("Warning", "Please selected all the required fields");
    } else {
      setloadMeeting(true);
      const formData = new FormData();
      formData.append("cookie", props.login.cookie);
      //formData.append('slot_id', slotselected.id);
      if (value == "group") {
        formData.append("select_type", "more");
      } else {
        formData.append("select_type", value);
      }
      //  formData.append('event_date', 'event_date');
      // formData.append('is_owner', true);
      formData.append("privacy", "private");
      // formData.append('enable_knocking', false);
      formData.append("signaling_impl", "ws");
      // formData.append('autojoin', true);
      formData.append("event_id", props.event.common.event.event_id_single);
      formData.append("start_time", slotselected.slot_start_time);
      formData.append("end_time", slotselected.slot_end_time);
      formData.append("location", locationSelected);
      formData.append("subject", subj);
      formData.append("description", desc);
      formData.append("slot_date", slotselected.slot_date);
      formData.append(
        "participants",
        attendeesSelected.toString().split("[").join("").split("]").join("")
      );
      formData.append("meeting_color", "#642000");
      // console.log(slotselected.slot_start_time);
      // console.log(slotselected.slot_end_time)

      axios
        .post(`${api_url.meetingRequest}`, formData)
        .then((res) => {
          // setAttendees(res.data.attendees);
          // alert('api inner ')
          console.log("slot_id", slotselected.id);
          console.log("select_type", value);
          console.log("event_id", event_id);
          // console.log('event_date', 'event_date');
          console.log("start_time", slotselected.slot_start_time);
          console.log("end_time", slotselected.slot_end_time);
          console.log("location", locationSelected);
          console.log("subject", subj);
          console.log("description", desc);
          console.log("slot_date", slotselected.slot_date);
          console.log(
            "participants",
            attendeesSelected.toString().split("[").join("").split("]").join("")
          );
          console.log("179");
          console.log(res.data);
          setloadMeeting(false);
          if (res.data.success === 1) {
            Alert.alert("Success", "Meeting request created");
            props.navigation.push("meetinglist", {
              screen: "Schedule",
              title: "My Meetings",
            });
          } else {
            // alert(res.data.error)

            Alert.alert("Warning", res.data.error);
          }
        })
        .catch((err) => {
          // alert('catch')
          console.log("error occured");

          console.log("slot_id", slotselected.id);
          console.log("select_type", value);
          console.log("event_id", event_id);
          console.log("event_date", "event_date");
          console.log("start_time", slotselected.slot_start_time);
          console.log("end_time", slotselected.slot_end_time);
          console.log("event_location", locationSelected);
          console.log("subject", subj);
          console.log("description", desc);
          console.log("slot_date", slotselected.slot_date);
          console.log(
            "participants",
            attendeesSelected.toString().split("[").join("").split("]").join("")
          );
          console.log(err);
          setloadMeeting(false);
        });
    }
  };

  if (props.route.params) {
    useEffect(() => {
      // console.log(toSelected)
      if (props.route.params.id && value == "one") {
        setAttendeesSelected(`${props.route.params.id}`);
      }
    }, [props.route.params.id]);
  }

  return (
    <ScrollView keyboardShouldPersistTaps={"handled"}>
      <View style={{ marginTop: 20 }}>
        <View>
          {MeetingTypes.map((res) => {
            return (
              <View key={res.key} style={styles.container}>
                <TouchableOpacity
                  style={styles.radioCircle}
                  onPress={() => {
                    // alert(res.key);
                    if (res.key == "group") {
                      setAttendeesSelected([]);
                    }
                    return setValue(res.key);
                  }}
                >
                  {value === res.key && <View style={styles.selectedRb} />}
                </TouchableOpacity>
                <Text style={styles.radioText}>{res.text}</Text>
              </View>
            );
          })}
        </View>

        <View style={[styles.textInputPicker, { marginTop: 20 }]}>
          <Picker
            selectedValue={slotselected}
            onValueChange={(itemValue, itemIndex) => getAttendees(itemValue)}
          >
            <Picker.Item label="Select Slot" value="" />
            {slotData.map((item, i) => {
              return (
                <Picker.Item
                  key={i}
                  label={
                    item.tizone_slot_start_times +
                    " " +
                    item.tizone_slot_end_times
                  }
                  value={item}
                />
              );
            })}
          </Picker>
        </View>

        <View style={[styles.textInputPicker, { marginTop: 20 }]}>
          <Picker
            selectedValue={locationSelected}
            onValueChange={(itemValue, itemIndex) =>
              setLocationSelected(itemValue)
            }
          >
            <Picker.Item label="Select Location" value="" />
            {locations.map((item, i) => {
              return (
                <Picker.Item
                  key={i}
                  label={item.location_name}
                  value={item.id}
                />
              );
            })}
          </Picker>
        </View>

        {attendees ? (
          <View style={[styles.textInputPicker, { marginTop: 20 }]}>
            {value == "one" ? (
              <Picker
                selectedValue={attendeesSelected}
                // style={{height: 80, width: 200, marginLeft:20}}

                onValueChange={(itemValue, itemIndex) =>
                  setAttendeesSelected(itemValue)
                }
              >
                <Picker.Item label="Select Attendees" value="" />
                {attendees.map((item, i) => {
                  return (
                    <Picker.Item
                      key={i}
                      label={item.display_name}
                      value={item.ID}
                    />
                  );
                })}
              </Picker>
            ) : (
              <View
                style={{
                  width: "90%",
                  marginTop: 10,
                  alignSelf: "center",
                  borderWidth: 0,
                }}
              >
                <MultiSelect
                  hideTags
                  items={attendees}
                  uniqueKey="ID"
                  onSelectedItemsChange={setAttendeesSelected}
                  selectedItems={attendeesSelected}
                  selectText="Attendees"
                  searchInputPlaceholderText="Search Attendees..."
                  onChangeInput={(text) => console.log(text)}
                  tagRemoveIconColor="#CCC"
                  tagBorderColor="#CCC"
                  searchInputStyle=""
                  tagTextColor="#CCC"
                  selectedItemTextColor="green"
                  selectedItemIconColor="green"
                  itemTextColor="#000"
                  displayKey="display_name"
                  searchInputStyle={{ color: "#CCC" }}
                  submitButtonColor="green"
                  submitButtonText="Pick"
                />
              </View>
            )}
          </View>
        ) : (
          <View></View>
        )}

        <View>
          <TextInput
            style={[styles.textInput, { marginTop: 20 }]}
            placeholder="Subject"
            placeholderTextColor="#ccc"
            onChangeText={(val) => setSubject(val)}
            value={subj}
          />

          <TextInput
            style={[styles.textInput, { marginTop: 20, height: 120 }]}
            textAlignVertical="top"
            multiline={true}
            autoCorrect={false}
            placeholder="Description"
            placeholderTextColor="#ccc"
            onChangeText={(val) => {
              console.log(val);
              return setDescription(val);
            }}
            value={desc}
          />
        </View>
        <View style={{ alignSelf: "center", marginTop: 20, marginBottom: 20 }}>
          <Button
            style={{
              marginTop: 8,
              marginBottom: 12,
              width: 250,
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
              if (loadMeeting) {
              } else {
                CreateMeeting();
              }
            }}
            disabled={loadMeeting ? true : false}
          >
            {loadMeeting ? (
              <ActivityIndicator color="green" size="large" />
            ) : (
              <Text>Schedule Meeting</Text>
            )}
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    textAlign: "center",
    // alignItems: 'center',
    //alignSelf:'center',
    //justifyContent: 'center',
    flexDirection: "row",
    marginLeft: 80,

    //justifyContent: 'space-between',
  },
  parent: {
    marginTop: 30,
    alignSelf: "center",

    borderRadius: 30,
  },

  textInput: {
    height: 46,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    width: "90%",
    borderWidth: 1,
    borderColor: "#D3D3D3",

    alignSelf: "center",
  },
  textInputPicker: {
    // height: 46,
    backgroundColor: "#fff",
    borderRadius: 5,
    // marginTop: 10,
    //padding: 10,
    width: "90%",
    borderWidth: 1,
    borderColor: "#D3D3D3",

    alignSelf: "center",
  },
  radioText: {
    marginRight: 0,
    paddingLeft: 20,
    paddingTop: 4,
    fontSize: 16,
    color: "#000",
    fontWeight: "600",
  },
  radioCircle: {
    height: 30,
    width: 30,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#2F283D",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  selectedRb: {
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: "#00DEA5",
  },
  result: {
    marginTop: 20,
    color: "white",
    fontWeight: "600",
    backgroundColor: "#00DEA5",
  },
});

const mapStateToProps = (state) => ({
  login: state.login,
  event: state.Event,
});

export default connect(mapStateToProps)(MeetingRequest);
