// import AsyncStorage from "@react-native-community/async-storage";
import Axios from "axios";
import { Alert, AsyncStorage } from "react-native";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import api_url from "./Config/Config";

const newRoomEndpoint =
  'https://f433xwze36.execute-api.us-west-2.amazonaws.com/default/dailyRnDemoNewCall';

/**
 * Create a short-lived room for demo purposes.
 *
 * IMPORTANT: this is purely a "demo-only" API, and *not* how we recommend
 * you create rooms in real production code. In your code, we recommend that you:
 * - Create rooms by invoking the Daily.co REST API from your own backend server
 *   (or from the Daily.co dashboard if you're OK with creating rooms manually).
 * - Pass an "exp" (expiration) parameter to the Daily.co REST endpoint so you
 *   don't end up with a huge number of live rooms.
 *
 * See https://docs.daily.co/reference#create-room for more information on how
 * to use the Daily.co REST API to create rooms.
 */
async function createRoom( userdetails, event_id, meeting_details, token){

    //  const auth =   useSelector(state => state.auth);
    // let response = await fetch(`https://globaldata.daily.co/live-videochat-${meeting_id}`);
    // return await response.json();
    // let formData = new FormData();
    // formData.append('cookie', cookie);
    // formData.append('token', token);
    // meeting_id = 3333; 
    // debugger;
    // console.log('meeting_id', meeting_details);
    // console.log('event_id', event_id);
    // console.log('token', token)
    const formData = new FormData();
    formData.append('cookie', userdetails.cookie);
    formData.append('event_id', event_id);
    formData.append('token', token)

  return await  Axios.post(`${api_url.launchMeeting}`, formData)
    .then(async(res)=>{
      // console.log('Meeting Launch Response');
      // console.log('Room config', res.data.data.roomConfiguration)
      // console.log('user_name', userdetails.common.user.displayname)
      // console.log('user_id', userdetails.common.user.id)
      // return {url:`https://vuppunaveen.daily.co/privateroom1`, token:`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyIjoicHJpdmF0ZXJvb20xIiwiZCI6IjIwNmRiYjA5LWY0NWEtNDU2MS1iYmRkLTBlNjlmOWI4ZDM1OSIsImlhdCI6MTYwNzQ4NzAwNH0.CP-PupUvIJvYaqGCbLopevypBL56d5H4DAj9nD6KUoE`}
          return await Axios.post(
            "https://api.daily.co/v1/meeting-tokens",
            {
              properties: {
                room_name: res.data.data.roomConfiguration.room_name,
                user_name: userdetails.common.user.displayname,
                user_id: userdetails.common.user.id,
                is_owner: meeting_details.from_user_name === userdetails.common.user.displayname?true:false,
                start_video_off: false
              },
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization:
                  "Bearer 7a1c7caba2ef0b23a761c25455b662f8f8696b349f954d16dd6f7de1e547cc8b",
              },
            }
          )
          .then(async(dailyTokenRes)=>{
              // console.log('dailyTokenRes', dailyTokenRes.data.token)
              // console.log('room url', res.data.data.roomConfiguration.room_url)
              // console.log('main token', dailyTokenRes.data.token)
              return await {
                url: `${res.data.data.roomConfiguration.room_url}`,
                token: dailyTokenRes.data.token,
              }
          })
          .catch((e)=>{
            console.log(e)
          })
    })
    // meeting_id = '010';

    // console.log(userdata.username);
    // console.log(userdata.displayname)

  //  return await fetch(`https://api.daily.co/v1/rooms/live-videochat-${meeting_id}`, {
  //     "headers": {
  //       "Authorization": "Bearer f822e9c8f4f96a35ad17c040052a7d74751b151a842a0cb5e199c957b30eceba"
  //     }
  //   })
  //   .then(async(checkExist) =>{
      
    // console.log(checkExist) 
    // if(checkExist.status == '404'){   // No meeting found
   
 
      // console.log('meeting not existing so creating'); 
      // const formData = new FormData();
      // formData.append('cookie', usercookie);
      // formData.append('id',meeting_id);
      // formData.append('room_type','video');
 
        // formData.append('event_id', event_id);
        // console.log(formData)
      // return await Axios.post(`https://api.daily.co/v1/rooms/privateroom1`, {
      //   properties:{"signaling_impl":"ws"}
      // },{
      //   headers:{
      //     Authorization:"Bearer 0a8e945d2f6e0be197f120db9e495e94c64e1a317fcb93ca47174aa5b59ec82f",
      //     'content-type': 'application/json'
      //   }
      // })
      // .then((res)=>{ 
      //     console.log('=============')
      //     console.log(res.data)
      //     console.log('=============') 
      //       return {url:`https://vuppunaveen.daily.co/privateroom1`, token:`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyIjoicHJpdmF0ZXJvb20xIiwiZCI6IjIwNmRiYjA5LWY0NWEtNDU2MS1iYmRkLTBlNjlmOWI4ZDM1OSIsImlhdCI6MTYwNzQ4NzAwNH0.CP-PupUvIJvYaqGCbLopevypBL56d5H4DAj9nD6KUoE`}
       
      // })
      // .catch((e)=>{
      //   console.log(e)
      //   return  { url: `/contact` };
      // })
        
        
    // return await Axios.post(`https://events.globaldata.com/api/user/create_room`, formData,{
    //     headers:{
    //       Authorization:"Bearer f822e9c8f4f96a35ad17c040052a7d74751b151a842a0cb5e199c957b30eceba"
    //     }
    //   })
    //   .then((res)=>{  // After creating room. Create meeting Token
    //         console.log(res.data.data)
    //         return { url: `${res.data.data.url}` };
    //   })
    //   .catch((e)=>{
    //     console.log(e)
    //     return  { url: `/contact` };
    //   }) 
      // return await Axios.post("https://api.daily.co/v1/meeting-tokens", {
      //                   properties:{
      //                     room_name:`live-videochat-${meeting_id}`,
      //                     user_name:`${userdata.displayname}`,
      //                     user_id:`${userdata.username}`
      //                   }
      //                 },
      //                   {"headers": {
      //                     "Content-Type": "application/json",
      //                     "Authorization": "Bearer f822e9c8f4f96a35ad17c040052a7d74751b151a842a0cb5e199c957b30eceba"
      //                   }}, 
      //                 )
      //                 .then(response => {
      //                   console.log(response.data.token);
      //                   return { url: `https://gopid.daily.co/live-videochat-${meeting_id}/?t=${response.data.token}` };
      //                   // return { url: `https://gopid.daily.co/live-videochat-${meeting_id}` };
      //                 })
      //                 .catch(err => {
      //                   console.log(err.response);
      //                   return { url: `https://gopid.daily.co/live-videochat-${meeting_id}` };
      //                 });

      //               }) 
      //               .catch(err => {
      //                 console.log('error while creating meeting')
      //                 console.error(err.response.data);
      //                 return { url: `https://gopid.daily.co/live-videochat-${meeting_id}` };
      //               });
      // return { url: `https://gopid.daily.co/live-videochat-${meeting_id}/` };

      
         
    // }else{
       // meeting existed  
      

    //                  return await Axios.post("https://api.daily.co/v1/meeting-tokens", {
    //                     properties:{
    //                       room_name:`videochat-${meeting_id}`, 
    //                       enable_screenshare:true,
    //                       user_name:`${userdata.displayname}`,
    //                       user_id:`${userdata.username}`

    //                     }
    //                   },
    //                     {"headers": {
    //                       "Content-Type": "application/json",
    //                       "Authorization": "Bearer f822e9c8f4f96a35ad17c040052a7d74751b151a842a0cb5e199c957b30eceba"
    //                     }}, 
    //                   )
    //                   .then(response => { 
    //                     AsyncStorage.setItem('username','Test');
    //                     console.log(response.data.token);
    //                     return { url: `https://gopid.daily.co/live-videochat-${meeting_id}/?t=${response.data.token}` };
    //                     // return { url: `https://gopid.daily.co/live-videochat-${meeting_id}` };
    //                   })
    //                   .catch(err => {
    //                     console.log(123)
    //                     console.error(err);
    //                     return { url: `https://gopid.daily.co/live-videochat-${meeting_id}` };
    //                   });
    // }
 
    
  // }).catch(e=>{
  //   console.log(130)
  //   console.log(e);
  // })
 
  // Comment out the above and uncomment the below, using your own URL
}
 
export default { createRoom };

// const mapStateToProps = (state) => {
//   return {
//     login: state.login,
//     event: state.Event,
//   };
// };

// export default connect(mapStateToProps)({ createRoom });


// const mapStateToProps = state =>{
//   // console.log(state.MyMeetings)
//   return (
//     { 
//       login:state.login,
//       event: state.Event
//     }
//   )
// }
// export default connect(mapStateToProps)({createRoom});