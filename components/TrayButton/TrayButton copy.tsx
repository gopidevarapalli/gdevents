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

  let source: NodeRequire = require("../../assets/leave.png");
  if (type === "camera") {
    source = muted
      ? require("../../assets/icon-camera-off.png")
      : require("../../assets/icon-camera-on.png");
  } else if (type === "mic") {
    source = muted
      ? require("../../assets/icon-speaker-off.png")
      : require("../../assets/icon-speaker-on.png");
  }

  const isLeaveButton: boolean = type === "leave";

  return (
    <TouchableWithoutFeedback onPress={onPress} disabled={disabled}>
      <View style={styles.controlContainer}>
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
  iconBase: {
    height: 40,
    width: 40,
    //backgroundColor: theme.colors.greyLight,
    // backgroundColor: "#333",
    // backgroundColor: "rgba(0, 0, 0, 0.747)",
    padding: 5,
    borderRadius: 9,
  },
  iconPortrait: {
    marginHorizontal: 16,
  },
  iconLandscape: {
    marginTop: 16,
  },
  iconLeave: {
    height: 28,
    width: 36,
    marginTop: 10
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
    margin: "5px auto 0px",
    textAlign: "center",
    
  },
  offText: {
    color: theme.colors.red,
  },
});
