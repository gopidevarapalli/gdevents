import { MediaStreamTrack } from "@daily-co/react-native-daily-js";
import React, { useMemo } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  ViewStyle,
  Image,
} from "react-native";
import { DailyMediaView } from "@daily-co/react-native-daily-js";
import theme from "../../theme";
import { useOrientation, Orientation } from "../../useOrientation";

export enum TileType {
  Thumbnail,
  Half,
  Full,
}

type Props = {
  videoTrack: MediaStreamTrack | null;
  audioTrack: MediaStreamTrack | null;
  mirror: boolean;
  type: TileType;
  isLoading: boolean;
  onPress?: () => void;
  user_name?: any;
};

export default function Tile(props: Props) {
  console.log("Tile props", props);
  const orientation = useOrientation();

  const mediaComponent = useMemo(() => {
    console.log("Tile.tsx props", props);
    return (
      <DailyMediaView
        videoTrack={props.videoTrack}
        audioTrack={props.audioTrack}
        mirror={props.mirror}
        // Assumption: thumbnails should appear layered on top of other tiles
        zOrder={props.type === TileType.Thumbnail ? 1 : 0}
        style={styles.media}
        // objectFit="cover"
        objectFit="contain"
      />
    );
  }, [props.videoTrack, props.audioTrack, props.mirror, props.type]);

  const touchableMediaComponent = useMemo(() => {
    return (
      <TouchableHighlight
        onPress={props.onPress}
        disabled={!props.onPress}
        style={styles.media}
      >
        {mediaComponent}
      </TouchableHighlight>
    );
  }, [props.onPress, mediaComponent]);

  const muteOverlayComponent = useMemo(() => {
    return (!props.videoTrack || !props.audioTrack) &&
      !props.isLoading &&
      props.user_name ? (
      <View style={styles.iconContainer}>
        {!props.videoTrack && (
          <Image
            style={styles.icon}
            source={require("../../assets/camera-off.png")}
          />
        )}
        {!props.audioTrack && (
          <Image
            style={styles.icon}
            source={require("../../assets/mic-off.png")}
          />
        )}
        {/* {props.user_name && (
          <Text style={{ width: "60%", color: "white", flexWrap: "wrap" }}>
            {props.user_name}
          </Text>
        )} */}
      </View>
    ) : null;
  }, [props.videoTrack, props.audioTrack, props.isLoading, props.user_name]);

  const loadingComponent = useMemo(() => {
    return props.isLoading ? (
      <View style={styles.iconContainer}>
        {!props.videoTrack && (
          <Image
            style={styles.icon}
            source={require("../../assets/camera-off.png")}
          />
        )}
        {!props.audioTrack && (
          <Image
            style={styles.icon}
            source={require("../../assets/mic-off.png")}
          />
        )}
        {/* {props.user_name && (
          <Text style={{ width: "60%", color: "white", flexWrap: "wrap" }}>
            {props.user_name}
          </Text>
        )} */}
        {props.videoTrack && props.audioTrack ? (
          <Text style={styles.loading}>Loading...</Text>
        ) : null}
      </View>
    ) : null;
  }, [props.isLoading]);

  const showName = useMemo(() => {
    return props.user_name ? (
      <View
        style={{
          //position: "absolute",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        {props.user_name && (
          <Text
            style={{
              marginTop: !props.videoTrack ? "60%" : "30%",
              textAlignVertical: "bottom",
              width: "60%",
              textAlign: "center",
              color: "white",
              flexWrap: "wrap",
            }}
          >
            {props.user_name}
          </Text>
        )}
      </View>
    ) : null;
  }, [props.user_name, props.videoTrack, props.audioTrack]);

  let typeSpecificStyle: ViewStyle | null = null;
  switch (props.type) {
    case TileType.Half:
      typeSpecificStyle =
        orientation === Orientation.Portrait
          ? styles.containerHalfPortrait
          : styles.containerHalfLandscape;
      break;
    case TileType.Full:
      typeSpecificStyle =
        orientation === Orientation.Portrait
          ? styles.containerFullPortrait
          : styles.containerFullLandscape;
      break;
  }
  return (
    <View
      style={[
        styles.container,
        (props.isLoading || !props.videoTrack) &&
          styles.containerLoadingOrNotShowingVideo,
        typeSpecificStyle,
      ]}
    >
      {touchableMediaComponent}
      {loadingComponent}
      {muteOverlayComponent}
      {showName}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    aspectRatio: 1,
  },
  containerHalfPortrait: {
    width: "50%",
  },
  containerHalfLandscape: {
    height: "50%",
  },
  containerFullPortrait: {
    width: "100%",
  },
  containerFullLandscape: {
    height: "100%",
  },
  containerLoadingOrNotShowingVideo: {
    backgroundColor: theme.colors.blueDark,
  },
  media: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  loading: {
    color: theme.colors.white,
    justifyContent: "center",
    alignItems: "stretch",
  },
  iconContainer: {
    flex: 1,
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 4,
  },
});
