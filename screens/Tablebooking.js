import React from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Button } from "react-native-paper";

const TableBooking = () => {
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
                padding: 10,
                flexDirection: "row",
                justifyContent: "space-between",
               // backgroundColor: "#ffc266",
              }}
            >
              <View>
                <TouchableOpacity onPress={onPress}>
                  <View style={styles.seats}>
                    <Text style={{ textAlign: "center", marginTop: 3 }}>1</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress}>
                  <View style={[styles.seats, { marginTop: 10 }]}>
                    <Text style={{ textAlign: "center", marginTop: 3 }}>3</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress}>
                  <View style={[styles.seats, { marginTop: 10 }]}>
                    <Text style={{ textAlign: "center", marginTop: 3 }}>5</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress}>
                  <View style={[styles.seats, { marginTop: 10 }]}>
                    <Text style={{ textAlign: "center", marginTop: 3 }}>7</Text>
                  </View>
                </TouchableOpacity>
              </View>
  
              <View>
                <View
                  style={{ width: 40, height: 150, backgroundColor: "#595959" }}
                >
                  <Text
                    style={{ textAlign: "center", marginTop: 63, color: "#fff" }}
                  >
                    A
                  </Text>
                </View>
              </View>
  
              <View>
                <TouchableOpacity onPress={onPress}>
                  <View style={styles.seats}>
                    <Text style={{ textAlign: "center", marginTop: 3 }}>2</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress}>
                  <View style={[styles.seats, { marginTop: 10 }]}>
                    <Text style={{ textAlign: "center", marginTop: 3 }}>4</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress}>
                  <View style={[styles.seats, { marginTop: 10 }]}>
                    <Text style={{ textAlign: "center", marginTop: 3 }}>6</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress}>
                  <View style={[styles.seats, { marginTop: 10 }]}>
                    <Text style={{ textAlign: "center", marginTop: 3 }}>8</Text>
                  </View>
                </TouchableOpacity>
              </View>
  
              {/* 2nd column */}
              <View style={{ padding: 16, backgroundColor: "#fff" }}></View>
  
              <View>
                <TouchableOpacity onPress={onPress}>
                  <View style={styles.selectedSeat}>
                    <Text style={{ textAlign: "center", marginTop: 3 }}>1</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress}>
                  <View style={[styles.selectedSeat, { marginTop: 10 }]}>
                    <Text style={{ textAlign: "center", marginTop: 3 }}>3</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress}>
                  <View style={[styles.seats, { marginTop: 10 }]}>
                    <Text style={{ textAlign: "center", marginTop: 3 }}>5</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress}>
                  <View style={[styles.seats, { marginTop: 10 }]}>
                    <Text style={{ textAlign: "center", marginTop: 3 }}>7</Text>
                  </View>
                </TouchableOpacity>
              </View>
  
              <View style={{ justifyContent: "space-around" }}>
                <View
                  style={{ width: 40, height: 70, backgroundColor: "#595959" }}
                >
                  <Text
                    style={{ textAlign: "center", marginTop: 23, color: "#fff" }}
                  >
                    c
                  </Text>
                </View>
                <View style={{ marginTop: 10 }}></View>
                <View
                  style={{ width: 40, height: 70, backgroundColor: "#595959" }}
                >
                  <Text
                    style={{ textAlign: "center", marginTop: 23, color: "#fff" }}
                  >
                    D
                  </Text>
                </View>
              </View>
  
              <View>
                <TouchableOpacity onPress={onPress}>
                  <View style={styles.selectedSeat}>
                    <Text style={{ textAlign: "center", marginTop: 3 }}>2</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress}>
                  <View style={[styles.selectedSeat, { marginTop: 10 }]}>
                    <Text style={{ textAlign: "center", marginTop: 3 }}>4</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress}>
                  <View style={[styles.seats, { marginTop: 10 }]}>
                    <Text style={{ textAlign: "center", marginTop: 3 }}>6</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress}>
                  <View style={[styles.seats, { marginTop: 10 }]}>
                    <Text style={{ textAlign: "center", marginTop: 3 }}>8</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
  
            <View style={{ marginTop: 90 }}></View>
  
            {/* 2nd row */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                //backgroundColor: "#ffc266",
              }}
            >
              <View>
                <TouchableOpacity onPress={onPress}>
                  <View style={styles.seats}>
                    <Text style={{ textAlign: "center", marginTop: 3 }}>1</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress}>
                  <View style={[styles.seats, { marginTop: 10 }]}>
                    <Text style={{ textAlign: "center", marginTop: 3 }}>3</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress}>
                  <View style={[styles.bookedSeat, { marginTop: 10 }]}>
                    <Text style={{ textAlign: "center", marginTop: 3 }}>5</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress}>
                  <View style={[styles.bookedSeat, { marginTop: 10 }]}>
                    <Text style={{ textAlign: "center", marginTop: 3 }}>7</Text>
                  </View>
                </TouchableOpacity>
              </View>
  
              <View>
                <View
                  style={{ width: 40, height: 150, backgroundColor: "#595959" }}
                >
                  <Text
                    style={{ textAlign: "center", marginTop: 63, color: "#fff" }}
                  >
                    B
                  </Text>
                </View>
              </View>
  
              <View>
                <TouchableOpacity onPress={onPress}>
                  <View style={styles.seats}>
                    <Text style={{ textAlign: "center", marginTop: 3 }}>2</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress}>
                  <View style={[styles.seats, { marginTop: 10 }]}>
                    <Text style={{ textAlign: "center", marginTop: 3 }}>4</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress}>
                  <View style={[styles.bookedSeat, { marginTop: 10 }]}>
                    <Text style={{ textAlign: "center", marginTop: 3 }}>6</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress}>
                  <View style={[styles.bookedSeat, { marginTop: 10 }]}>
                    <Text style={{ textAlign: "center", marginTop: 3 }}>8</Text>
                  </View>
                </TouchableOpacity>
              </View>
  
              {/* 2nd column */}
              <View style={{ padding: 16, backgroundColor: "#fff" }}></View>
              <View>
                <TouchableOpacity onPress={onPress}>
                  <View style={styles.seats}>
                    <Text style={{ textAlign: "center", marginTop: 3 }}>1</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress}>
                  <View style={[styles.seats, { marginTop: 10 }]}>
                    <Text style={{ textAlign: "center", marginTop: 3 }}>3</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress}>
                  <View style={[styles.seats, { marginTop: 10 }]}>
                    <Text style={{ textAlign: "center", marginTop: 3 }}>5</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress}>
                  <View style={[styles.seats, { marginTop: 10 }]}>
                    <Text style={{ textAlign: "center", marginTop: 3 }}>7</Text>
                  </View>
                </TouchableOpacity>
              </View>
  
              <View style={{ justifyContent: "space-around" }}>
                <View
                  style={{ width: 40, height: 70, backgroundColor: "#595959" }}
                >
                  <Text
                    style={{ textAlign: "center", marginTop: 23, color: "#fff" }}
                  >
                    E
                  </Text>
                </View>
                <View style={{ marginTop: 10 }}></View>
                <View
                  style={{ width: 40, height: 70, backgroundColor: "#595959" }}
                >
                  <Text
                    style={{ textAlign: "center", marginTop: 23, color: "#fff" }}
                  >
                    F
                  </Text>
                </View>
              </View>
  
              <View>
                <TouchableOpacity onPress={onPress}>
                  <View style={styles.seats}>
                    <Text style={{ textAlign: "center", marginTop: 3 }}>2</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress}>
                  <View style={[styles.seats, { marginTop: 10 }]}>
                    <Text style={{ textAlign: "center", marginTop: 3 }}>4</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress}>
                  <View style={[styles.seats, { marginTop: 10 }]}>
                    <Text style={{ textAlign: "center", marginTop: 3 }}>6</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress}>
                  <View style={[styles.seats, { marginTop: 10 }]}>
                    <Text style={{ textAlign: "center", marginTop: 3 }}>8</Text>
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
    )
}

export default TableBooking

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
      },
      seats: {
        width: 40,
        height: 30,
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
})
