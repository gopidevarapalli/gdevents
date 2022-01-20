import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, ScrollView, Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function CreateVcard() {
  const [vcardtitle, setVcardTitle] = useState();

  return (
    <ScrollView style={styles.container}>
      <View style={{ marginTop: 10 }}>
        <TextInput
          style={styles.textInput}
          placeholder="vcardtitle"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setVcardTitle(text)}
          multiline={true}
          numberOfLines={4}
          value={vcardtitle}
        />

        <TextInput
          style={styles.textInput}
          placeholder="First Name"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setVcardTitle(text)}
          multiline={true}
          numberOfLines={4}
          value={vcardtitle}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Last Name"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setVcardTitle(text)}
          multiline={true}
          numberOfLines={4}
          value={vcardtitle}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Job Title"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setVcardTitle(text)}
          multiline={true}
          numberOfLines={4}
          value={vcardtitle}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Company"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setVcardTitle(text)}
          multiline={true}
          numberOfLines={4}
          value={vcardtitle}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Address"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setVcardTitle(text)}
          multiline={true}
          numberOfLines={4}
          value={vcardtitle}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Primary Email"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setVcardTitle(text)}
          multiline={true}
          numberOfLines={4}
          value={vcardtitle}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Secondary Email"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setVcardTitle(text)}
          multiline={true}
          numberOfLines={4}
          value={vcardtitle}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Office Phone"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setVcardTitle(text)}
          multiline={true}
          numberOfLines={4}
          value={vcardtitle}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Mobile Phone"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setVcardTitle(text)}
          multiline={true}
          numberOfLines={4}
          value={vcardtitle}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Website"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setVcardTitle(text)}
          multiline={true}
          numberOfLines={4}
          value={vcardtitle}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Linkedin"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setVcardTitle(text)}
          multiline={true}
          numberOfLines={4}
          value={vcardtitle}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Twitter"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setVcardTitle(text)}
          multiline={true}
          numberOfLines={4}
          value={vcardtitle}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Facebook"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setVcardTitle(text)}
          multiline={true}
          numberOfLines={4}
          value={vcardtitle}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
          marginBottom:30
        }}
      >
        <Button
          style={{
            marginTop: 8,
            marginBottom: 12,
            width: 180,
            //height: 35,
            alignSelf: "center",
            justifyContent: "center",
            borderRadius: 25,
            textTransform: "lowercase",
          }}
          color="#00DEA5"
          contentStyle={{ height: 44 }}
          labelStyle={{ color: "#2F283D", fontSize: 15, fontWeight: "bold" }}
          mode="contained"
          onPress={() => submitMessage()}
        >
          Create vCard
        </Button>

        <Button
          style={{
            marginTop: 8,
            marginBottom: 12,
            width: 120,
            //height: 35,
            alignSelf: "center",
            justifyContent: "center",
            borderRadius: 25,
          }}
          color="#000"
          contentStyle={{ height: 44 }}
          labelStyle={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}
          mode="contained"
          onPress={() => submitMessage()}
        >
          Cancel
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  textInput: {
    height: 46,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginTop: 10,
    marginVertical: 10,
    padding: 10,
    width: "100%",
    borderWidth: 1,
    borderColor: "#D3D3D3",
    alignSelf: "center",
  },
});
