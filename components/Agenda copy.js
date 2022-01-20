import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView, Alert
  
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { List } from 'react-native-paper';
import moment from 'moment';
import * as AddCalendarEvent from 'react-native-add-calendar-event';

const Agenda = (props) => {
  // console.log(15)
  // console.log(props.AgendaData)
  const [AgendaData, setAgendaData] = useState(props.AgendaData);
  const theme = useTheme();

       const navigation = useNavigation()

  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

     
  const utcDateToString = (momentInUTC) => {
    let s = moment.utc(momentInUTC).add(-5.49, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    return s;
  };

 const addCalender =(title,startDate,endDate)=>{
  
   startDate = utcDateToString(startDate);
   endDate = utcDateToString(endDate);
    const eventConfig = {
      title:title, 
      startDate: startDate,
      endDate:endDate
    };
    AddCalendarEvent.presentEventCreatingDialog(eventConfig)
    .then(res=>{
      if(res.action=='CANCELED'){
        Alert.alert('Not Saved',res.action)
      }else{
        Alert.alert('Success',res.action)
      }
      
      console.log('add to calender')
      console.log(res)
  
    })
  }


  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />

      <View style={styles.cardsWrapper}>
        <Text style={{ alignSelf: 'flex-start', fontSize: 15,fontWeight: 'bold',color: '#1E1727',paddingBottom:6,paddingTop:6}}>
        Agenda Sessions
        </Text>

        <List.Section>
          {AgendaData.map((agenda,i)=>{
            return (
              <List.Accordion
              key={i}
            title={agenda.date}
            left={props => <List.Icon {...props} icon="folder" />}>
              {/* <List.Item title="First item"> */}
                      {agenda.events.map((evnt,j) =>{
                        return (
                          
                        <TouchableOpacity style={styles.card} key={j} onPress={()=> navigation.navigate('AgendaDetails',{id:evnt.agend_id})}> 
                          <View style={styles.cardInfo}>
                            <View  style={styles.agendaCardDetails}><Text style={{textAlign:'center', color:'white',fontSize:10}}>
                              {evnt.session_start_time} - {evnt.session_end_time} 
                            </Text></View>
                            
                            <Text style={styles.cardDetails}>
                            {evnt.agend_title}
                            </Text>
                            <View style={{flexDirection:'row'}}> 
                            <TouchableOpacity
                              style={{backgroundColor:'#1E1727' , marginLeft:4,marginRight:4, paddingTop: 4,paddingLeft:5,paddingRight:5, paddingBottom:4, marginTop:8,borderRadius:5 }}
                              
                                >
                            <Text style={{fontSize:10,color:'white'}}
                            onPress={()=>addCalender(evnt.agend_title,evnt.twf_session_start_time,evnt.twf_session_end_time)}
                            >Add to Calender</Text>
                          </TouchableOpacity>
                          {/* <TouchableOpacity
                              style={{backgroundColor:'#1E1727', color:'white', paddingTop: 4, paddingLeft:5,paddingRight:5, paddingBottom:4, marginTop:8,borderRadius:5 }}
                              
                                >
                            <Text style={{fontSize:10,color:'white'}}>Add to my Schedule</Text>
                          </TouchableOpacity> */}
                          </View>
                          </View>
                        
                          
                        </TouchableOpacity>
                        
                        )
                      })}
              {/* </List.Item>  */}
              </List.Accordion>
            )
          }) }
          
        
            
         
        </List.Section>
 
  


        
     
      </View>
    </ScrollView>
  );
};

export default Agenda;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderContainer: {
    height: 250,
    width: '100%',
    marginTop: 12,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 0,
  },

  wrapper: {},
  iconWidth:{
    width:50,
     height:50,
     padding:10
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 25,
    flex:1,
    justifyContent:'space-between',
    marginBottom: 10,
    alignItems: 'stretch',
    flexWrap: 'wrap'
   
  },

  categoryBtn: {
    marginBottom:8,
    marginTop:8,
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 75,
    height: 75,
    backgroundColor: '#fff' /* '#FF6347' */,
    borderRadius: 10,
    shadowColor: "#000",
    
shadowOffset: {
	width: 0,
	height: 2,
},

shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 10,
    color: '#09BA90',
  },
  cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  cardImgWrapper: {
    flex: 1,
  
    borderColor: '#fff',
    borderLeftWidth: 0,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    
  },
  cardImg: {
    height: '100%',
    width: '100%',
    borderColor: '#fff',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderLeftWidth: 0,
  },
  cardText :{
    borderRadius: 8,
 

  },
  
  card: {
    height: 143,
    width:'98%',
    alignSelf:'center',
    justifyContent:'center',
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 2, height: 1},
    shadowOpacity: 10,
    shadowRadius: 3,
    
    // elevation: 2,
    
    // borderWidth: 1,
    borderRadius: 8,
    marginRight:50,
    padding:15
   
  },
  cardInfo: {
    flex: 2,
    padding: 8,
    borderColor: 'black', 
    borderWidth:1,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0 
  },
  cardTitle: {
    fontWeight: 'bold',
    lineHeight:22,
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
  agendaCardDetails :{
     backgroundColor:'#1E1727',
     width:80,
     color:'white',
     textAlign:'center',
     padding:2,
     marginBottom:5,
     borderRadius: 5,
     marginTop:2, 
  }
});
