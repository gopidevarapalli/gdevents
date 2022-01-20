import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
  
} from 'react-native';
import {useTheme} from '@react-navigation/native';
//import Swiper from 'react-native-swiper';
import Carousel from '../components/Carousel'
import { dummyData } from '../assets/data/Data';
import StarRating from '../components/StarRating';
import { Button } from 'react-native-paper';
import Meeting from '../components/Meeting';
import Categories from '../components/Categories';
import Agenda from '../components/Agenda';
import Stas from '../components/Stas';
import LatestMembers from '../components/LatestMembers';
import { AttendeesAction, CompanyAction, ExhibitorAction, KeyStatisticsAction, LatestMembersAction, MyMeetingsAction, ProductsAction, profileAction, SpeakersAction, SponsorsAction } from '../redux/action/actions';
import { useDispatch } from 'react-redux';
import Companies from './Companies';
import Products from './Products';
import Attendees from './Attendees';
import Exhibitors from './Exhibitors';
import Speakers from './Speakers';
import Sponsors from './Sponsors';

// import ProfileScreen from './ProfileScreen';



const data = require('../assets/data.json');

import { AsyncStorage} from 'react-native';




import store from '../redux/store';
import MeetingRequest from './MeetingRequest';
import About from './About';
import Relationship from './Relationship';
import TodayMeeting from '../components/TodayMeeting';
import TodayAgenda from '../components/TodayAgenda';

const HomeScreen = (props) => {


  
 
  // const dispatch = useDispatch();
  const [cookies, setCookies] = useState(store.getState().login.cookie);

  const [ isLoading, setIsLoading] = useState(true);

  // alert(store.getState().login.cookie)

  store.dispatch(MyMeetingsAction(cookies));
  store.dispatch(KeyStatisticsAction(cookies));
  store.dispatch(SponsorsAction(cookies))
  store.dispatch(profileAction(cookies));
  store.dispatch(LatestMembersAction(cookies));
  store.dispatch(ProductsAction(cookies));
  store.dispatch(AttendeesAction(cookies));
  store.dispatch(SpeakersAction(cookies)); 
  store.dispatch(CompanyAction(cookies))
  store.dispatch(ExhibitorAction(cookies));


  
  // AsyncStorage.getItem('cookies').then((cookies)=>{ 
  //   // alert(cookies)
  //   store.dispatch(MyMeetingsAction(cookies));
  //   store.dispatch(KeyStatisticsAction(cookies));
  //   store.dispatch(SponsorsAction(cookies))
  //   store.dispatch(profileAction(cookies));
  //   store.dispatch(LatestMembersAction(cookies));
  //   store.dispatch(ProductsAction(cookies));
  //   store.dispatch(AttendeesAction(cookies));
  //   store.dispatch(SpeakersAction(cookies)); 
  //   store.dispatch(CompanyAction(cookies))
  //   store.dispatch(ExhibitorAction(cookies));

    
  // });






  const theme = useTheme();
  // state = { 
  //   AgendaData:data.Agenda,
  //   Stats:data.Stats,
  //   CompanyProfile:data.CompanyProfile
  // }

useEffect(()=>{
  setIsLoading(false)
},[])

  const [AgendaData, setAgendaData] = useState(data.Agenda);
  const [CompanyProfile, setCompanyProfile] = useState(data.CompanyProfile);
  const [Stats, setStats] = useState(data.Stats);
 

  return (
    isLoading? <ActivityIndicator size="large" color="green" style={{
      marginTop:300
    }} />:<ScrollView style={styles.container}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <View style={styles.sliderContainer}>

        {/* <Swiper
          autoplay
          horizontal={false}
          height={200}
          activeDotColor="#FF6347">
          <View style={styles.slide}>
            <Image
              source={require('../assets/banners/food-banner1.jpg')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../assets/banners/food-banner2.jpg')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../assets/banners/food-banner3.jpg')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
        </Swiper> */}
      <Carousel data = {dummyData}/>
    
      </View>

      <Categories /> 
      {/* <LatestMembers /> */}
      
{/* <About /> */}

{/* <MeetingRequest /> */}

      <View style={styles.cardsWrapper}>
        <Text style={{ alignSelf: 'flex-start', fontSize: 15,fontWeight: 'bold',color: '#000',paddingBottom:1,paddingTop:1}}>
            Today Meetings
        </Text>
        </View>
      <TodayMeeting /> 

      <View style={styles.cardsWrapper}>
        <Text style={{ alignSelf: 'flex-start', fontSize: 15,fontWeight: 'bold',color: '#000',paddingBottom:1,paddingTop:1}}>
            Today Agenda Session's
        </Text>
        </View>

      <TodayAgenda />

{/* <Relationship /> */}
     
      {/* <Agenda AgendaData={AgendaData} />  */}


      <Stas Stats={Stats} /> 
    
      {/* <Exhibitors /> */}

<LatestMembers />
      {/* <Categories />       */}



 

{/* <Speakers /> */}
      {/* <Products /> */}
{/* <Exhibitors /> */}
      {/* <Attendees /> */}
      {/* <Companies /> */}

      
      
      {/* <Sponsors /> */}

     


    </ScrollView>
  );
};

export default HomeScreen;

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
    marginTop: 10,
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    height: 140,
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
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#fff',
    borderLeftWidth: 0,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardTitle: {
    fontWeight: 'bold',
    lineHeight:22,
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
});
