import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,Alert,
  ActivityIndicator,
  AsyncStorage
  
} from 'react-native';
import {getFocusedRouteNameFromRoute, useNavigation, useTheme} from '@react-navigation/native';
import { Button, TextInput } from 'react-native-paper';
import { useState } from 'react';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IonIcon from 'react-native-vector-icons/Ionicons';
import store from '../redux/store';
import Axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import api_url from '../Config/Config';
import { connect } from 'react-redux';

const AttendeesCard = (props) => {
  const theme = useTheme();

  const navigation = useNavigation();
  
  const [attendees, setAttendees] = useState(props.Attendees);
  const [isLoading,setisLoading] = useState(false);
  const [recordCount, setRecordCount] = useState(1);
  const [loadMore, setIsLoadMore] = useState(false);
  const [searchWord,setsearchWord] = useState('');
  const [searchLoad,setSearchLoad] = useState(false);

  const getMore = ()=>{
    
    if(searchWord === ''){
 
    setIsLoadMore(true)
    setRecordCount(recordCount+1);

   
          const formData = new FormData();
          formData.append('cookie',store.getState().login.cookie);
          formData.append('spage', recordCount);
          // alert(event_id);
          formData.append('event_id',props.event.common.event.event_id_single)
          Axios
                  .post(`${api_url.attendeesList}`, formData)
                  .then(res =>{
              setAttendees(res.data.attendees);
              setIsLoadMore(false);
            });
      
          }else{
            // setIsLoadMore(false);
            if(attendees.length >= 4){ 
              // console.log(searchWord)
                const formData = new FormData();
                formData.append('cookie',store.getState().login.cookie);
                formData.append('search_keyword',searchWord);
                 
                setIsLoadMore(true)
                setRecordCount(recordCount+1); 
                formData.append('spage',1);
            
          formData.append('event_id',props.event.common.event.event_id_single)
                Axios
                .post(`${api_url.attendeesSearch}`, formData)
                .then(res =>{
                  // console.log(res.data)
                    setAttendees(res.data.attendies); 
                    setIsLoadMore(false)
                    // setisLoading(false);
                });
 
            }

          }
  }

  const bookmark = (company)=>{ 
    
    const formData = new FormData();
    formData.append('cookie',store.getState().login.cookie);
    formData.append('bookmarktype','attendees');
    formData.append('status',company.bookmark_status?0:1);
    formData.append('title',company.Name);
    formData.append('id',company.id);
   
          formData.append('event_id',props.event.common.event.event_id_single)
    // console.log(company)
        Axios.post(`${api_url.bookmark}`, formData)
        .then(res=>{
          // console.log(res.data);
            if(res.data.status === "ok"){
              Alert.alert('Success', res.data.message);
              setisLoading(true)
                Axios
                .post(`${api_url.attendeesList}`, formData)
                .then(res =>{
                  // console.log(res.data)
                    setAttendees(res.data.attendees?res.data.attendees:[]);
                    setisLoading(false);
                });
            }
            if(res.data.error){
              Alert.alert('Success', res.data.error);
            }
        }) 
  }

  const searchData = (val)=>{
    setSearchLoad(true);
    setsearchWord(val);
    const formData = new FormData();
    formData.append('cookie',store.getState().login.cookie);
    formData.append('search_keyword',val);
    formData.append('spage',1);
     
      formData.append('event_id',props.event.common.event.event_id_single)
        Axios
        .post(`${api_url.attendeesSearch}`, formData)
        .then(res =>{
          // console.log(res.data)
            setAttendees(res.data.attendies==null?[]:res.data.attendies);
            setSearchLoad(false);
            // setisLoading(false);
        }); 

  }


  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <View style={styles.cardsWrapper}>
        {/* <Text>Attendees</Text> */}
        <View>
        <TextInput placeholder="Search.." onChangeText={(val)=> searchData(val)}
        style={{
          backgroundColor:"white",
          borderRadius:10, 
          height:50,
          borderColor:"black",
          
        }}
        />
           
        <Text>{attendees.length?'':'No data found'}</Text>
        </View>
        {searchLoad?<ActivityIndicator size="large" color="green" />:<FlatList 
        onEndReached={()=> getMore()}
        keyExtractor={(item,i) => i}
        data={attendees}
        renderItem={({item})=>{ 
          //console.log(attendee)
          
          return(
            <TouchableOpacity  onPress={()=> navigation.navigate('userDetails',{user_id:item.id})}><View style={styles.card} >
          <View style={styles.cardImgWrapper1}>
              <View style={styles.cardImg1}>
              <Image
                  source={{uri:item.Profilepic}}
                  resizeMode="cover"
                  style={styles.iconWidth}
                />
              </View>
              </View>
              <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.Name}</Text>
                <Text style={styles.cardDesg}>
                {item.JobTitle}
                </Text>
                <Text style={styles.cardDetails}>
                {item.CompanyName}
                </Text>
                <View style={{flexDirection:'row'}}> 
             </View>
               
              </View>
              <View style={styles.cardImgWrapper}>
             
              <View>
         
         
            <TouchableOpacity style={styles.attendeeBtn} onPress={()=> bookmark(item)}> 
              <View style={styles.attendeeIcon}>
                 
                  {isLoading?<ActivityIndicator size="small" color="green" />:
                    <IonIcon name={item.bookmark_status?'bookmark':'bookmark-outline'} size={22} color="#1E1727" />}
                 
              </View> 
            </TouchableOpacity>
            
            <TouchableOpacity style={{ 
              marginTop:10,
              marginLeft:20
            }} onPress={()=> navigation.navigate('meetinglist',{title:'My Meetings',screen:'Request', id:item.id, name:item.Name})}
            
            >
                {/* <Image
                      source={require('../assets/icons/interview.png')}
                      resizeMode="cover"
                      style={styles.iconWidth}
                    /> */}
                    <IonIcon name="people-outline" size={26} color="#1E1727" />
                </TouchableOpacity>
                
                
              </View>

              </View>
        </View></TouchableOpacity>)
        }}
      
        
        />}
        {loadMore?<ActivityIndicator size="small" color="green" />:<View></View>}
    
      </View>
    </ScrollView>
    );
};

// export default AttendeesCard;


const mapStateToProps = state =>{
  return(
    {  
      event:state.Event
      
    }
  )
}
export default connect(mapStateToProps)(AttendeesCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    height: 100,
    width:'98%',
    alignSelf:'center',
    justifyContent:'center',
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    borderWidth: 0.2,
    borderRadius: 8,
   
  },
  cardImgWrapper: {
    flex: 1,
    //padding:10,
    borderColor: '#fff',
    borderLeftWidth: 0,
   borderRadius: 8,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    
  },
  iconWidth:{
    alignSelf:'center',
    justifyContent:'center',
    marginTop:14,
    width:55,
    height:55,
    borderRadius:30
  },
  cardImg: {
    height: '100%',
    width: '100%',
   borderColor: '#fff',
   alignSelf: 'center',
   borderRadius: 8,
   flexDirection:'row',
   
   borderBottomLeftRadius: 0,
   borderTopLeftRadius: 0,
   borderLeftWidth: 0,
  },
  cardImgWrapper1: {
    flex: 1,
    borderRightWidth: 0,
    borderColor: '#fff',
    borderLeftWidth: 0,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    
  },
  cardImg1: {
    height: '100%',
    width: '100%',
    borderColor: '#fff',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    borderLeftWidth: 0,
  },
  cardText :{
    borderRadius: 8,
 

  },
  cardInfo: {
    flex: 3,
    padding: 10,
    borderColor: '#fff',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
  cardTitle: {
    fontSize:16,
    fontWeight: 'bold',
    lineHeight:24,
  },
  cardDetails: {
    fontSize: 13,
   // fontWeight:'600',
    color: '#444',
  },
  cardDesg:{
    fontSize: 14,
    fontWeight:'600',
    color: '#444',
    lineHeight:20
  },
  attendeeSize:{
    width:25,
    height:25,
    margin:0
    
  },
  attendeeIcon:{
    marginTop:10,
   marginLeft:25
  },
  attendeeSize1:{
    // width:30,
     height:28,

    marginTop:5,
    marginRight:15
  }

});
