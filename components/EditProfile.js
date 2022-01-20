import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import { Picker } from "@react-native-community/picker";
import axios from "axios";
import api_url from "../Config/Config";
import { connect, useDispatch } from "react-redux";
import ImagePicker from "react-native-image-crop-picker";
import { Image } from "react-native";
import { GetRefreshAction } from "../redux/action/actions";

const EditProfile = (props) => {
  console.log("Update profile props", props);
  console.log("paramsss", props.route.params);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [titleType, setTitleType] = useState([]);
  const [titleTypeSelected, setTitleTypeSelected] = useState([]);

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [desc, setDesc] = useState("");
  const [phone, setPhone] = useState("");
  const [mobile, setMobile] = useState("");
  const [jobtitle, setJobTitle] = useState("");
  const [addType, setAddType] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setStatee] = useState("");

  const [country, setCountry] = useState([]);
  const [countrySelected, setCountrySelected] = useState("");

  const [zipcode, setZipcode] = useState("");
  const [fax, setFax] = useState("");
  const [facebooklink, setFacebookLink] = useState("");
  const [twitterlink, setTwitterLink] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const [timezone, setTimezone] = useState([]);
  const [timezoneSelected, setTimezoneSelected] = useState(
    props.route.params.timezone
  );

  const [profiletitleProp, setProfileTitleProp] = useState(
    props.route.params.profiletitle
  );
  const [firstnameProp, setFirstNameProp] = useState(
    props.route.params.firstname
  );
  const [lastnameProp, setLastNameProp] = useState(props.route.params.lastname);
  const [descProp, setDescProp] = useState(props.route.params.description);
  const [emailProp, setEmailProp] = useState(props.route.params.email);
  const [phoneProp, setPhoneProp] = useState(props.route.params.phone);
  const [mobileProp, setMobileProp] = useState(props.route.params.mobile);
  const [jobtitleProp, setJobTitleProp] = useState(props.route.params.jobtitle);
  const [addressTypeProp, setAddressTypeProp] = useState(
    props.route.params.addresstype
  );
  const [address1Prop, setAddress1Prop] = useState(props.route.params.address1);
  const [address2Prop, setAddress2Prop] = useState(props.route.params.address2);
  const [cityProp, setCityProp] = useState(props.route.params.city);
  const [stateProp, setStateProp] = useState(props.route.params.state);
  const [countryProp, setCountryProp] = useState(props.route.params.country);
  const [zipcodeProp, setZipcodeProp] = useState(props.route.params.zipcode);
  const [faxProp, setFaxProp] = useState(props.route.params.fax);
  const [facebookProp, setFacebookProp] = useState(props.route.params.facebook);
  const [twitterProp, setTwitterProp] = useState(props.route.params.twitter);
  const [linkedinprop, setLinkedinProp] = useState(props.route.params.linkedin);
  const [timezoneprop, setTimezoneProp] = useState(props.route.params.timezone);
  const [ImageData, setImage] = useState();
  const [existingImage, setExistingImage] = useState({});

  // useEffect(() => {
  //   if (profiletitleProp) {
  //     setTitleType(profiletitleProp);
  //   }  if (firstnameProp) {
  //     setFirstName(firstnameProp);
  //   }
  // }, [props.route.params.profiletitle, props.route.params.firstname]);

  useEffect(() => {
    const formData = new FormData();
    formData.append("cookie", props.login.cookie);
    formData.append("event_id", props.event.common.event.event_id_single);

    axios.post(`${api_url.getProfile}`, formData).then((res) => {
      console.log("get profile res", res);
      //console.log("countries res", res.data.profile_details.countries);
      setCountry(res.data.profile_details.countries);
    });
  }, []);

  useEffect(() => {
    if (countryProp) {
      setCountrySelected(countryProp);
    }
  }, [props.route.params.countryProp]);

  useEffect(() => {
    const formData = new FormData();
    formData.append("cookie", props.login.cookie);
    formData.append("event_id", props.event.common.event.event_id_single);

    axios.post(`${api_url.getProfile}`, formData).then((res) => {
      console.log("get timezone res", res);
      console.log("timezone res", res.data.profile_details.time_zones);
      setTimezone(res.data.profile_details.time_zones);
      console.log("zzzz", timezone);
    });
  }, []);

  useEffect(() => {
    if (timezoneprop) {
      setTimezoneSelected(timezoneprop);
    }
  }, [props.route.params.timezoneprop]);

  useEffect(() => {
    console.log("Exuisting image");
    console.log(props.route.params.avatar);
    setExistingImage({ uri: props.route.params.avatar });
  }, [props.route.params.avatar]);

  useEffect(() => {
    console.log("useeffect params", props.route.params);
    console.log("tttttt", props.route.params.timezone);
    if (profiletitleProp) {
      setTitleType(profiletitleProp);
      // setTitleTypeSelected([profiletitleProp]);
    }
    if (firstnameProp) {
      setFirstName(firstnameProp);
    }
    if (lastnameProp) {
      setLastName(lastnameProp);
    }
    if (descProp) {
      setDesc(descProp);
    }
    if (phoneProp) {
      setPhone(phoneProp);
    }
    if (mobileProp) {
      setMobile(mobileProp);
    }
    if (jobtitleProp) {
      setJobTitle(jobtitleProp);
    }
    if (addressTypeProp) {
      setAddType(addressTypeProp);
    }
    if (address1Prop) {
      setAddress1(address1Prop);
    }
    if (address2Prop) {
      setAddress2(address2Prop);
    }
    if (cityProp) {
      setCity(cityProp);
    }
    if (stateProp) {
      setStatee(stateProp);
    }
    // if (countryProp) {
    //   setCountry(countryProp);
    // }
    if (zipcodeProp) {
      setZipcode(zipcodeProp);
    }
    if (faxProp) {
      setFax(faxProp);
    }
    if (facebookProp) {
      setFacebookLink(facebookProp);
    }
    if (twitterProp) {
      setTwitterLink(twitterProp);
    }
    if (linkedinprop) {
      setLinkedin(linkedinprop);
    }
    // if (timezoneprop) {
    //   setTimezone(timezoneprop);
    // }
  }, [
    props.route.params.profiletitle,
    props.route.params.firstname,
    props.route.params.lastname,
    props.route.params.description,
    props.route.params.phone,
    props.route.params.mobile,
    props.route.params.jobtitle,
    props.route.params.addresstype,
    props.route.params.address1,
    props.route.params.address2,
    props.route.params.city,
    props.route.params.state,
    //props.route.params.country,
    props.route.params.zipcode,
    props.route.params.fax,
    props.route.params.facebook,
    props.route.params.twitter,
    props.route.params.linkedin,
    //props.route.params.timezone,
  ]);

  const updateProfile = () => {
    console.log("update click");

    if (titleType === "") {
      Alert.alert("Warning!", "Please select Tilt Type");
    } else if (firstname === "") {
      Alert.alert("Warning!", "Enter Your First Name");
    } else if (lastname === "") {
      Alert.alert("Warning!", "Enter Your Last Name");
    }
    //   desc === "" ||
    //   phone === "" ||
    //   mobile === "" ||
    //   jobtitle === "" ||
    //   addType === "" ||
    //   address1 === "" ||
    //   address2 === "" ||
    //   city === "" ||
    //   state === "" ||
    //   country === "" ||
    //   zipcode === "" ||
    //   fax === "" ||
    //   facebooklink === "" ||
    //   twitterlink === "" ||
    //   linkedin === "" ||
    //   timezone === ""
    else {
      setLoading(true);
      const formData = new FormData();
      formData.append("cookie", props.login.cookie);
      formData.append("event_id", props.event.common.event.event_id_single);
      formData.append("title_type", titleType);
      formData.append("first_name", firstname);
      formData.append("last_name", lastname);
      formData.append("description", desc);
      formData.append("phone_number", phone);
      formData.append("mobilenumber", mobile);
      formData.append("jobtitle", jobtitle);
      formData.append("address_type", addType);
      formData.append("address1", address1);
      formData.append("address2", address2);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("country", countrySelected);
      formData.append("post_zip_code", zipcode);
      formData.append("fax", fax);
      formData.append("facebooklink", facebooklink);
      formData.append("twitterlink", twitterlink);
      formData.append("linkedinlink", linkedin);
      formData.append("timezone_setting", timezoneSelected);
      if (ImageData) {
        formData.append("profilepic", ImageData);
      }

      console.log("formdata", formData);

      axios
        .post(
          // `https://coe-test-events-website.pantheonsite.io/api/user/update_profile/`,
          `${api_url.updateProfile}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          Keyboard.dismiss();
          console.log(("ressss", res));
          console.log("update res", res.data);
          setLoading(false);
          if (res.data.result.msg) {
            dispatch(GetRefreshAction(true));
            Alert.alert("Success", "Profile updated successfully!");
            // props.navigation.push("About");
            props.navigation.goBack();
          } else {
            // alert(res.data.error)
            Alert.alert("Warning", res.data.error);
          }
        })
        .catch((err) => {
          console.log("err", err);
          setLoading(false);
        });
    }
  };
  //bs = React.createRef();

  const choosePhotoFromLibrary = () => {
    console.log("choose click");
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: false,
      compressImageQuality: 0.7,
    }).then((image) => {
      console.log(image);
      setImage({
        type: image.mime,
        uri: image.path,
        name: image.path.split("/").pop(),
        width: 150,
        height: 150,
        mime: image.mime,
      });
      // this.bs.current.snapTo(1);
    });
  };

  return (
    <ScrollView keyboardShouldPersistTaps={"handled"} style={styles.container}>
      <View style={{ marginTop: 30 }}>
        <View style={styles.textInputPicker}>
          <Picker
            selectedValue={titleType}
            // style={{ height: 80, width: 200, marginLeft: 20 }}
            onValueChange={(itemValue, itemIndex) => setTitleType(itemValue)}
          >
            <Picker.Item label="Select" value="Select" />
            <Picker.Item label="Mr" value="Mr" />
            <Picker.Item label="Mrs" value="Mrs" />
            <Picker.Item label="Ms" value="Ms" />
            <Picker.Item label="Dr" value="Dr" />
            <Picker.Item label="Prof" value="Prof" />
          </Picker>
        </View>

        <TextInput
          style={styles.textInput}
          placeholder="First Name"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setFirstName(text)}
          value={firstname}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Last Name"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setLastName(text)}
          value={lastname}
        />

        <TextInput
          style={[styles.textInput, { marginTop: 10, height: 120 }]}
          textAlignVertical="top"
          placeholder="Description"
          multiline={true}
          placeholderTextColor="#ccc"
          onChangeText={(text) => setDesc(text)}
          value={desc}
        />
        {/* <View>
          <Text>Profile Pic</Text>
        </View> */}

        <View style={styles.panel}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.panelTitle}>Upload Photo</Text>
            {/* <Text style={styles.panelSubtitle}>
              Choose Your Profile Picture
            </Text> */}
            {ImageData ? (
              <Image source={ImageData} height={200} width={200} />
            ) : (
              <Image source={existingImage} height={200} width={200} />
            )}
          </View>
          {/* <TouchableOpacity
            style={styles.panelButton}s
            onPress={takePhotoFromCamera}
          >
            <Text style={styles.panelButtonTitle}>Take Photo</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.panelButton}
            onPress={choosePhotoFromLibrary}
          >
            <Text style={styles.panelButtonTitle}>Choose File</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.panelButton}
            onPress={() => this.bs.current.snapTo(1)}
          >
            <Text style={styles.panelButtonTitle}>Cancel</Text>
          </TouchableOpacity> */}
        </View>

        {/* <TouchableOpacity
          style={styles.panelButton}
          onPress={choosePhotoFromLibrary}
        >
          <Text style={styles.panelButtonTitle}>Choose From Library</Text>
        </TouchableOpacity> */}

        <TextInput
          style={styles.textInput}
          placeholder="Phone Number"
          keyboardType="numeric"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setPhone(text)}
          value={phone}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Mobile Number"
          keyboardType="numeric"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setMobile(text)}
          value={mobile}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Job Title"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setJobTitle(text)}
          value={jobtitle}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Address Type"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setAddType(text)}
          value={addType}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Address1"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setAddress1(text)}
          value={address1}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Address2"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setAddress2(text)}
          value={address2}
        />

        <TextInput
          style={styles.textInput}
          placeholder="City"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setCity(text)}
          value={city}
        />

        <TextInput
          style={styles.textInput}
          placeholder="State"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setStatee(text)}
          value={state}
        />

        {/* <TextInput
          style={styles.textInput}
          placeholder="Country"
          placeholderTextColor="#000"
          onChangeText={(text) => setCountry(text)}
          value={country}
        /> */}

        <View style={[styles.textInputPicker, { marginTop: 10 }]}>
          <Picker
            selectedValue={countrySelected}
            // style={{ height: 80, width: 200, marginLeft: 20 }}
            onValueChange={(itemValue, itemIndex) =>
              setCountrySelected(itemValue)
            }
          >
            <Picker.Item label="Select Country" value="" />
            {country.map((item, i) => {
              return <Picker.Item key={i} label={item} value={item} />;
            })}
          </Picker>
        </View>

        <TextInput
          style={styles.textInput}
          placeholder="Zip Code"
          keyboardType="numeric"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setZipcode(text)}
          value={zipcode}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Fax"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setFax(text)}
          value={fax}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Facebook Link"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setFacebookLink(text)}
          value={facebooklink}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Twitter Link"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setTwitterLink(text)}
          value={twitterlink}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Linkedin Link"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setLinkedin(text)}
          value={linkedin}
        />

        {/* <TextInput
          style={styles.textInput}
          placeholder="Time Zone"
          placeholderTextColor="#000"
          onChangeText={(text) => setTimezone(text)}
          value={timezone}
        /> */}
        <View style={[styles.textInputPicker, { marginTop: 10 }]}>
          <Picker
            selectedValue={timezoneSelected}
            // style={{ height: 80, width: 200, marginLeft: 20 }}
            onValueChange={(itemValue, itemIndex) =>
              setTimezoneSelected(itemValue)
            }
          >
            <Picker.Item label="Select Timezone" value="" />

            {timezone.map((item, i) => {
              //console.log("iiiiiiiiiii", item);
              return (
                <Picker.Item
                  key={i}
                  label={item.timezone_name}
                  value={item.id}
                />
              );
            })}
          </Picker>
        </View>

        <View style={{ alignSelf: "center", marginTop: 20, marginBottom: 20 }}>
          <Button
            style={{
              marginTop: 8,
              marginBottom: 12,
              width: 110,
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
            onPress={() => updateProfile()}
          >
            Update
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 16,
  },
  textInputPicker: {
    // height: 46,
    backgroundColor: "#fff",
    borderRadius: 5,
    // marginTop: 10,
    //padding: 10,
    width: "90%",
    margin: 10,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    alignSelf: "center",
  },
  textInput: {
    //height: 46,
    backgroundColor: "#fff",
    borderRadius: 5,
    //marginTop: 10,
    margin: 10,
    padding: 10,
    width: "90%",
    borderWidth: 1,
    borderColor: "#D3D3D3",
    alignSelf: "center",
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 10,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  panelTitle: {
    fontSize: 16,
    height: 35,
    alignSelf: "flex-start",
    //marginLeft: -15,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    //marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    //fontWeight: "bold",
    color: "#000",
  },
});

const mapStateToProps = (state) => {
  return {
    login: state.login,
    event: state.Event,
  };
};

export default connect(mapStateToProps)(EditProfile);
