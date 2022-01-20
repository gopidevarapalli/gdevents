import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import theme from "../../theme";
import { useOrientation, Orientation } from "../../useOrientation";

type Props = {
  disabled?: boolean;
  onPress: () => void;
  muted?: boolean;
  text: string;
  type: "mic" | "camera" | "leave";
};
export default function TrayButton({
  disabled = false,
  onPress,
  muted = false,
  text,
  type,
}: Props) {
  const orientation = useOrientation();

  let source: NodeRequire = require("../../assets/icon-exit.png");
  if (type === "camera") {
    source = muted
      ? require("../../assets/icon-cameraoff.png")
      : require("../../assets/icon-camera-on.png");
  } else if (type === "mic") {
    source = muted
      ? require("../../assets/icon-microphone-off.png")
      : require("../../assets/icon-microphone-on.png");
  }

  const isLeaveButton: boolean = type === "leave";

  return (
    <TouchableWithoutFeedback onPress={onPress} disabled={disabled}>
      <View style={styles.controlContainer}>
        <View style={styles.iconParent}>
          <Image
            style={[
              styles.iconBase,
              orientation === Orientation.Portrait
                ? styles.iconPortrait
                : styles.iconLandscape,
              disabled && styles.disabled,
              isLeaveButton && styles.iconLeave,
            ]}
            source={source}
          />
        </View>
        <Text
          style={[
            styles.controlText,
            (muted || isLeaveButton) && styles.offText,
          ]}
        >
          {text}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  iconParent:{
    height: 50,
    width: 50,
    backgroundColor: "rgba(0, 0, 0, 0.747)",
    borderRadius: 9,
    marginLeft:12,
    //marginRight:5
  },
  iconBase: {
    height: 30,
    width: 30,
    //backgroundColor: theme.colors.greyLight,
    // backgroundColor: "#333",
    marginTop:10

  },
  iconPortrait: {
    marginHorizontal: 10,
  },
  iconLandscape: {
    marginTop: 10,
  },
  iconLeave: {
    height: 30,
    width: 30,
    // marginTop: 10
  },
  disabled: {
    opacity: 0.6,
  },
  controlContainer: {
    alignItems: "center",
  },
  controlText: {
    // fontWeight: "500",
    // paddingTop: 5,
    // fontSize:15,
    //color: theme.colors.blueDark,
    // color: "#fff"
    color: "white",
    fontSize: 11,
    margin : 5, 
    paddingLeft:13,
    // margin: "5px auto 0px",
    textAlign: "center",
  },
  offText: {
    color: theme.colors.white,
  },
});
