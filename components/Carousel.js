import Axios from "axios";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import api_url from "../Config/Config";
import CarouselItem from "./CarouselItem";

const { width, heigth } = Dimensions.get("window");
let flatList = [];

function infiniteScroll(dataList) {
  // console.log(dataList)
  const numberOfData = dataList.length;
  let scrollValue = 0,
    scrolled = 0;

  setInterval(function () {
    scrolled++;
    if (scrolled < numberOfData) scrollValue = scrollValue + width;
    else {
      scrollValue = 0;
      scrolled = 0;
    }

    this.flatList.scrollToOffset({ animated: true, offset: scrollValue });
  }, 3000);
}

const Carousel = (props) => {
  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);
  const [dataList, setDataList] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    // alert(props.login.cookie)
    // alert(props.event.common.event.event_id_single)
    const formData = new FormData();
    formData.append("cookie", props.login.cookie);
    formData.append("event_id", props.event.common.event.event_id_single);
    Axios.post(
      //`https://events.globaldata.com/api/user/get_banners`,
      `${api_url.getBanners}`,
      formData
    ).then((res) => {
      // alert('carousel called')
      console.log(res.data);
      setData([res.data]);
      setDataList([res.data]);
      //    infiniteScroll([res.data])
    });
  }, [props.event.common.event.event_id_single]);

  // if (data && data.length) {
  //     alert(data.length)
  return data.length > 0 ? (
    <View>
      <FlatList
        data={data}
        ref={(flatList) => {
          this.flatList = flatList;
        }}
        keyExtractor={(item, index) => "key" + index}
        horizontal
        pagingEnabled
        scrollEnabled
        snapToAlignment="center"
        scrollEventThrottle={16}
        decelerationRate={"fast"}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return <CarouselItem item={item} />;
        }}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { x: scrollX } } },
        ])}
      />

      <View style={styles.dotView}>
        {data.map((_, i) => {
          let opacity = position.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={i}
              style={{
                opacity,
                height: 10,
                width: 10,
                backgroundColor: "#595959",
                margin: 8,
                borderRadius: 5,
              }}
            />
          );
        })}
      </View>
    </View>
  ) : (
    <ActivityIndicator size="large" color="green" />
  );
};

const styles = StyleSheet.create({
  dotView: { flexDirection: "row", justifyContent: "center" },
});

const mapStateToProps = (state) => {
  // console.log(state.MyMeetings)
  return {
    login: state.login,
    event: state.Event,
  };
};
export default connect(mapStateToProps)(Carousel);
