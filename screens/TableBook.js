import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "react-native-paper";

export default function TableBook() {
  const onPress = () => {
    alert("book seat");
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <View>
            <Button
              color="#e60000"
              contentStyle={{ height: 34 }}
              labelStyle={{ color: "#fff", fontSize: 11 }}
              mode="contained"
              onPress={() => alert("select seat")}
            >
              Select Seat
            </Button>
          </View>

          <View style={{ marginTop: 20 }}></View>

          <View style={{ justifyContent: "space-around" }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <Text>Available Seat</Text>
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: "#00dea5",
                }}
              ></View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 5,
                justifyContent: "space-evenly",
              }}
            >
              <Text>Booked Seat</Text>
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: "#808080",
                  marginLeft: 5,
                }}
              ></View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 5,
                justifyContent: "space-evenly",
              }}
            >
              <Text>Selected Seat</Text>
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: "#e69500",
                }}
              ></View>
            </View>
          </View>

          <View style={{ marginTop: 30 }}></View>
          {/* row 1 */}
          <View
            style={{
              padding: 15,
              flexDirection: "column",
              justifyContent: "space-between",
              // backgroundColor: "#ffc266",
              borderColor: "#ddd",
              borderWidth: 1,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity onPress={onPress}>
                <View style={[styles.seats, { marginTop: 10 }]}>
                  <Text style={{ textAlign: "center", marginTop: 6 }}>1</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={onPress}>
                <View style={[styles.seats, { marginTop: 10 }]}>
                  <Text style={{ textAlign: "center", marginTop: 6 }}>3</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={onPress}>
                <View style={[styles.seats, { marginTop: 10 }]}>
                  <Text style={{ textAlign: "center", marginTop: 6 }}>5</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={onPress}>
                <View style={[styles.seats, { marginTop: 10 }]}>
                  <Text style={{ textAlign: "center", marginTop: 6 }}>7</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 30, marginBottom: 20 }}>
              <View
                style={{
                  width: "100%",
                  height: 40,
                  backgroundColor: "#595959",
                }}
              >
                <Text style={{ textAlign: "center", color: "#fff" }}></Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingBottom: 10,
              }}
            >
              <TouchableOpacity onPress={onPress}>
                <View style={[styles.seats, { marginTop: 10 }]}>
                  <Text style={{ textAlign: "center", marginTop: 6 }}>2</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={onPress}>
                <View style={[styles.seats, { marginTop: 10 }]}>
                  <Text style={{ textAlign: "center", marginTop: 6 }}>4</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={onPress}>
                <View style={[styles.seats, { marginTop: 10 }]}>
                  <Text style={{ textAlign: "center", marginTop: 6 }}>6</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={onPress}>
                <View style={[styles.seats, { marginTop: 10 }]}>
                  <Text style={{ textAlign: "center", marginTop: 6 }}>8</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginTop: 40 }}></View>

          <View
            style={{
              padding: 15,
              flexDirection: "column",
              justifyContent: "space-between",
              // backgroundColor: "#ffc266",
              borderColor: "#ddd",
              borderWidth: 1,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity onPress={onPress}>
                <View style={[styles.seats, { marginTop: 10 }]}>
                  <Text style={{ textAlign: "center", marginTop: 6 }}>1</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={onPress}>
                <View style={[styles.seats, { marginTop: 10 }]}>
                  <Text style={{ textAlign: "center", marginTop: 6 }}>3</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={onPress}>
                <View style={[styles.seats, { marginTop: 10 }]}>
                  <Text style={{ textAlign: "center", marginTop: 6 }}>5</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 30, marginBottom: 20 }}>
              <View
                style={{
                  width: "100%",
                  height: 40,
                  backgroundColor: "#595959",
                }}
              >
                <Text style={{ textAlign: "center", color: "#fff" }}></Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingBottom: 10,
              }}
            >
              <TouchableOpacity onPress={onPress}>
                <View style={[styles.seats, { marginTop: 10 }]}>
                  <Text style={{ textAlign: "center", marginTop: 6 }}>2</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={onPress}>
                <View style={[styles.seats, { marginTop: 10 }]}>
                  <Text style={{ textAlign: "center", marginTop: 6 }}>4</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={onPress}>
                <View style={[styles.seats, { marginTop: 10 }]}>
                  <Text style={{ textAlign: "center", marginTop: 6 }}>6</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginTop: 40 }}></View>

          <TouchableOpacity onPress={() => alert("Reception")}>
            <View style={styles.reception}>
              <Text style={{ color: "#fff", textAlign: "center" }}>
                Reception
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  seats: {
    width: 35,
    height: 35,
    backgroundColor: "#00dea5",
  },
  selectedSeat: {
    width: 40,
    height: 30,
    backgroundColor: "#e69500",
  },
  bookedSeat: {
    width: 40,
    height: 30,
    backgroundColor: "#808080",
  },
  reception: {
    width: "60%",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#000",
    marginLeft: 8,
    height: 30,
  },
});
