import React, { Component, useEffect, useState, useRef } from 'react';
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
 ActivityIndicator
  
} from 'react-native';
import moment from 'moment';
import { Button } from 'react-native-paper';
var dateFormat = require('dateformat');

// import {View, Button, Platform} from 'react-native';
//import RNDateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-gesture-handler';

import axios from 'axios';
import {Picker} from '@react-native-community/picker';
import { connect } from 'react-redux';
import api_url from '../Config/Config';


 
const  MeetingAvailability = (props) => {
  const [date, setDate] = useState(new Date());
  const [datevalue, setDateValue] = useState(moment(new Date()).format("YYYY-MM-DD hh:mm A"));
  const [mode, setMode] = useState('datetime');
  const [show, setShow] = useState(false);
  const [checked, setChecked] = React.useState('first');
  const [value, setValue] = useState('available');

  const [isLoading,setisLoading] = useState(false)

  
  const [slotData, setSlotData] = useState([]);
  const [slotselected,setSlotselected] = useState("");

  const [availableList,setAvailableList] = useState([]);

 
        const PROP = [
            {
                key: 'available',
                text: 'Available',
            },
            {
                key: 'notavailable',
                text: 'Not Available',
            },
           
        ]; 
  
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
 
  const showDatepicker = () => {
    showMode('date');
  };
  const showTimepicker = () => {
    showMode('time');
  };

  let data = [{
    value: 'India',
  }, {
    value: 'United Kingdom',
  }, {
    value: 'United States',
  }];
  
 

  useEffect(()=>{ 
    const formData = new FormData();
    formData.append('cookie',props.login.cookie)
    axios.post(`${api_url.meetingSlotDateInfo}`,formData)
    .then(res=>{ 
      setSlotData(res.data.slotdate);
      // setlocations(res.data.locations);
            setSlotselected(res.data.slotdate[0].slot_date)
    }); 
  },[]);

  const updateMeetingAvail = () =>{

    if(slotselected == ''){
      Alert.alert('Warning','Please select slot date');
      return;
    }
    setisLoading(true);
    const formData = new FormData();
    formData.append('cookie',props.login.cookie);
    formData.append('availability',value);
    formData.append('date',dateFormat(slotselected,'dd-mm-yyyy'));

      console.log(value);
      console.log(dateFormat(slotselected,'dd-mm-yyyy'));
      axios.post(`${api_url.meetingAvailability}`,formData)
      .then(res=>{
        console.log(res.data);
        setisLoading(false);
          if(res.data.status === "ok"){
            // alert('Meeting Availability updated');
            setAvailableList(res.data.meeting_availability);
            
          }else{
            alert('No Data found')
          }
      })
  }


  return (
    <View style={{ marginTop:50}}>
      <View>
				{PROP.map(res => {
					return (
						<View key={res.key} style={styles.container}>
						
							<TouchableOpacity
								style={styles.radioCircle}
								onPress={() => {
									setValue(res.key) 
								}}>
                                  {value === res.key && <View style={styles.selectedRb} />}
							</TouchableOpacity>
               
         

              <Text style={styles.radioText}>{res.text}</Text>
						</View>
					);
				})}
                {/* <Text> Selected: {value} </Text> */}
			</View>
               <View> 
                    <Picker 
                      selectedValue={slotselected}
                      style={{height: 80, width: 200, marginLeft:20}}
                      onValueChange={(itemValue, itemIndex) => setSlotselected(itemValue)
                      }>
                        <Picker.Item  label="Select Slot" value="" />
                            {slotData.map((item,i)=>{
                              return <Picker.Item key={i} label={item.slot_date} value={item.slot_date} />
                            })} 
                    </Picker> 
              </View>

      {/* {show && (
        <RNDateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={false} 
          onChange={onChange}
        />
      )} */}
 
      <View style={{ alignSelf: 'center', marginTop:30}}>
        <Button style={{marginTop:8,marginBottom:12 ,width:250,borderRadius:25}} color="#00DEA5"
          contentStyle={{ height: 44,  }}
          labelStyle={{ color: "#2F283D", fontSize: 15, fontWeight:'bold' }}mode="contained" onPress={() => updateMeetingAvail() }>
        {isLoading?<ActivityIndicator size="small" color="black" />:<Text>Get Availability</Text>}
          </Button> 
        </View>

        <View style={{marginLeft:50,marginTop:50}}>
              {availableList.length?<FlatList
                data={availableList}
                renderItem={({item})=>{ console.log(item)
                  return (<View style={{flex:1,flexDirection:'row'}}>
                          <Text style={{borderWidth:1,borderColor:'blck',padding:10}}>{item.available_status==1?'Not Available':'Available'}</Text>
                          <Text style={{borderWidth:1,borderColor:'blck',padding:10}}>{item.slot_date}</Text>
                          </View>
                    
                  )
                }}
                keyExtractor={(item,i) => i}
              />:<Text>No Data Found</Text>}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    textAlign:'center',
   // alignItems: 'center',
//alignSelf:'center',
//justifyContent: 'center',
    flexDirection: 'row',
  marginLeft:80
  
   
//justifyContent: 'space-between',
},
  parent: {
    marginTop:30,
   alignSelf:'center',
    
    borderRadius:30
},
// button: {
//   borderRadius:10,
//   flexDirection: 'row', 
//   height: 50, 
//   backgroundColor: 'yellow',
//   alignItems: 'center',
//   justifyContent: 'center',
//   marginTop: 50,
//   elevation:3,
//   color:"black"
// },
  input:{
    marginTop:30,
    height:55,
    marginLeft:20, 
    width:350, 
    borderRadius:30, 
    borderStyle:"solid", 
    borderColor:"black", 
    padding:15, 
    borderWidth:1
  },
  radioText: {
    marginRight: 0,
    paddingLeft:20,
    paddingTop:4,
    fontSize: 16,
    color: '#000',
    fontWeight: '600'
},
radioCircle: {
height: 30,
width: 30,
borderRadius: 100,
borderWidth: 2,
borderColor: '#2F283D',
alignItems: 'center',
alignSelf:'center',
justifyContent: 'center',
},
selectedRb: {
width: 15,
height: 15,
borderRadius: 50,
backgroundColor: '#00DEA5',
},
result: {
    marginTop: 20,
    color: 'white',
    fontWeight: '600',
    backgroundColor: '#00DEA5',
},
})

const mapStateToProps = state =>{
  return ({
    login:state.login
  })
}

export default connect(mapStateToProps)(MeetingAvailability)