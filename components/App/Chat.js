import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Keyboard,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  Button,
  SafeAreaView,
} from "react-native";

const dimensions = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};

export default class Chat extends Component {
  constructor(props) {
    super(props);
    console.log(props.messagesList);
    this.state = {
      name_address: "",
      data: [
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
        // {
        //   id: 3,
        //   date: "9:50 am",
        //   type: "in",
        //   message: "Lorem ipsum dolor sit a met",
        // },
        // {
        //   id: 4,
        //   date: "9:50 am",
        //   type: "in",
        //   message: "Lorem ipsum dolor sit a met",
        // },
        // {
        //   id: 5,
        //   date: "9:50 am",
        //   type: "out",
        //   message: "Lorem ipsum dolor sit a met",
        // },
        // {
        //   id: 6,
        //   date: "9:50 am",
        //   type: "out",
        //   message: "Lorem ipsum dolor sit a met",
        // },
        // {
        //   id: 7,
        //   date: "9:50 am",
        //   type: "in",
        //   message: "Lorem ipsum dolor sit a met",
        // },
        // {
        //   id: 8,
        //   date: "9:50 am",
        //   type: "in",
        //   message: "Lorem ipsum dolor sit a met",
        // },
        // {
        //   id: 9,
        //   date: "9:50 am",
        //   type: "in",
        //   message: "Lorem ipsum dolor sit a met",
        // },
      ],
    };
  }

  renderDate = (date) => {
    return <Text style={styles.time}>{date}</Text>;
  };

  // const sendMessage = (content)=>{
  //   console.log('send message called. content', content)
  //   callObject.sendAppMessage({ data:{ data: {msg: content, displayname:props.login.common.user.displayname}} }, '*');
  // }

  render() {
    return (
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps={"handled"}
      >
        <SafeAreaView
          forceInset={{ bottom: "always" }}
          style={{ height: dimensions.height / 1.7 }}
        >
          {/* <ScrollView style={{height:420}} > */}
          <FlatList
            ref={(ref) => (this.flatList = ref)}
            onContentSizeChange={() =>
              this.flatList.scrollToEnd({ animated: true })
            }
            onLayout={() => this.flatList.scrollToEnd({ animated: true })}
            style={styles.list}
            data={this.props.messagesList}
            keyExtractor={(item, index) => {
              return index;
            }}
            renderItem={(message) => {
              const item = message.item;
              // console.log(this.props.messagesList);
              // console.log(item)
              if (item) {
                let inMessage = item.type && item.type === "in";
                let itemStyle = inMessage ? styles.itemIn : styles.itemOut;
                return (
                  <View style={[styles.item, itemStyle]}>
                    {/* {!inMessage} */}
                    <View style={[styles.balloon]}>
                      <Text>
                        {item.displayname}: {item.msg}
                      </Text>
                    </View>
                    {/* {inMessage } */}
                  </View>
                );
              }
            }}
          />
          {/* </ScrollView> */}
        </SafeAreaView>
        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Write a message..."
              underlineColorAndroid="transparent"
              onChangeText={(name_address) => this.setState({ name_address })}
              value={this.state.name_address}
            />
          </View>

          <TouchableOpacity
            style={styles.btnSend}
            onPress={() => {
              this.props.sendMessage(this.state.name_address);
              this.setState({
                name_address: "",
              });
              Keyboard.dismiss();
            }}
          >
            <Image
              source={{
                uri: "https://img.icons8.com/small/75/ffffff/filled-sent.png",
              }}
              style={styles.iconSend}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  list: {
    paddingHorizontal: 17,
    // borderWidth:1,
    // borderColor:"red"
  },
  footer: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "#eeeeee",
    paddingHorizontal: 10,
    padding: 5,
  },
  btnSend: {
    backgroundColor: "#00BFFF",
    width: 40,
    height: 40,
    borderRadius: 360,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  iconSend: {
    width: 30,
    height: 30,
    alignSelf: "center",
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    alignSelf: "center",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  inputs: {
    height: 40,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  balloon: {
    maxWidth: 250,
    padding: 15,
    borderRadius: 20,
  },
  itemIn: {
    alignSelf: "flex-start",
  },
  itemOut: {
    alignSelf: "flex-end",
    backgroundColor: "#3399ff",
    color: "#fff",
  },
  time: {
    alignSelf: "flex-end",
    margin: 15,
    fontSize: 12,
    color: "#808080",
  },
  item: {
    marginVertical: 14,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#eeeeee",
    borderRadius: 15,
    padding: 5,
  },
});
