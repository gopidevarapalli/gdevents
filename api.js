import AsyncStorage from "@react-native-community/async-storage";
import Axios from "axios";
import { Alert } from "react-native";
import api_url from "./Config/Config";

const newRoomEndpoint =
  "https://f433xwze36.execute-api.us-west-2.amazonaws.com/default/dailyRnDemoNewCall";

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
async function createRoom(event, userdata, meetingdetails) {
  console.log("userdata", userdata);
  console.log("meeting details api.js", meetingdetails);
  console.log("user id", userdata.common.user.id);
  // console.log('meetingdetails', meetingdetails);

  console.log(
    "room name",
    meetingdetails.meeting_details.apidetails.apidetails.roomConfiguration
      .room_name
  );
  console.log(
    "sssssss",
    meetingdetails.meeting_details.apidetails.select_speakers.indexOf(
      userdata.common.user.id.toString()
    )
  );

  // console.log('room config', meetingdetails.meeting_details.roomConfiguration)

  // const properties = await JSON.parse(meetingdetails.apidetails.apidetails.roomConfiguration.room_config);
  // console.log('room config',properties)
  // properties.room_name =await  meetingdetails.meeting_details.roomConfiguration.room_name;
  // properties.user_name = await `${userdata.common.user.displayname}`;
  // properties.user_id = await `${userdata.common.user.id}`;
  //  console.log('-------- properties---------');
  // await console.log(...JSON.parse(meetingdetails.meeting_details.roomConfiguration.room_config))

  let roomname;
  let roomConfig;
  if (
    meetingdetails.meeting_details.apidetails.select_speakers.indexOf(
      userdata.common.user.id.toString()
    ) > -1 || event.common.event.event_info.user_role == 'presenter'
  ) {
    if (meetingdetails.meeting_details.apidetails.agenda_type == "roundtable") {
      console.log(`Roundtable speaker`);
      roomname = await meetingdetails.meeting_details.apidetails.apidetails
        .roomConfiguration.room_name;
      roomConfig = await JSON.parse(
        meetingdetails.meeting_details.apidetails.apidetails.roomConfiguration
          .room_config
      );
    } else {
      console.log(`He is speaker`);
      roomname = await meetingdetails.meeting_details.apidetails.apidetails
        .backStageRoomConfiguration.room_name;
      roomConfig = await JSON.parse(
        meetingdetails.meeting_details.apidetails.apidetails
          .backStageRoomConfiguration.room_config
      );
    }
  } else {
    console.log("else");
    roomname = await meetingdetails.meeting_details.apidetails.apidetails
      .roomConfiguration.room_name;
    roomConfig = await JSON.parse(
      meetingdetails.meeting_details.apidetails.apidetails.roomConfiguration
        .room_config
    );
  }
  console.log("Room name", roomname);
  console.log("Room Config", roomConfig);
  // console.log(roomname)

  return await Axios.post(
    "https://api.daily.co/v1/meeting-tokens",
    {
      properties: {
        room_name: roomname,
        user_name: event.common.event.event_info.display_name,
        user_id: userdata.common.user.id,
        is_owner: (meetingdetails.meeting_details.apidetails.select_speakers.indexOf(
          userdata.common.user.id.toString()
        ) > -1 || event.common.event.event_info.user_role == 'presenter' || meetingdetails.meeting_details.apidetails.agenda_type ==
        "roundtable")?true:false,
        start_video_off:
          (meetingdetails.meeting_details.apidetails.select_speakers.indexOf(
            userdata.common.user.id.toString()
          ) > -1 || event.common.event.event_info.user_role == 'presenter')
            ? false
            : meetingdetails.meeting_details.apidetails.agenda_type ==
              "roundtable"
            ? false
            : true,
        start_audio_off:
          (meetingdetails.meeting_details.apidetails.select_speakers.indexOf(
            userdata.common.user.id.toString()
          ) > -1 || event.common.event.event_info.user_role == 'presenter')
            ? false
            : meetingdetails.meeting_details.apidetails.agenda_type ==
              "roundtable"
            ? false
            : true,
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
    .then(async (response) => {
      console.log("axios");
      AsyncStorage.setItem("username", `${userdata.common.user.username}`);
      console.log("ressss", response);
      // console.log(`${meetingdetails.apidetails.roomConfiguration.room_url}?t=${response.data.token}`)
      // console.log(response.data.token);
      // return { url: `https://madguy.daily.co/videochat-${meeting_id}/?t=${response.data.token}` };
      if (
        meetingdetails.meeting_details.apidetails.select_speakers.indexOf(
          userdata.common.user.id.toString()
        ) > -1 || event.common.event.event_info.user_role == 'presenter'
      ) {
        if(meetingdetails.meeting_details.apidetails.agenda_type ==
          "roundtable"){
            return await {
              url: `${meetingdetails.meeting_details.apidetails.apidetails.roomConfiguration.room_url}`,
              token: `${response.data.token}`,
            };
          }else{
            return await {
              url: `${meetingdetails.meeting_details.apidetails.apidetails.backStageRoomConfiguration.room_url}`,
              token: `${response.data.token}`,
            };
          }
       
      } else {
        return await {
          url: `${meetingdetails.meeting_details.apidetails.apidetails.roomConfiguration.room_url}`,
          token: `${response.data.token}`,
        };
      }
    })
    .catch((err) => {
      console.log(123);
      console.error("errorrrr", err);
      return {
        url: `${meetingdetails.apidetails.roomConfiguration.room_url}?t=error`,
      };
    });

  //  return await fetch(`https://api.daily.co/v1/rooms/videochat-${meeting_id}`, {
  //     "headers": {
  //       "Authorization": "Bearer 1276ec95565f006d5c82b2516134101b2d749c1b70491d6197669b5d93efcb64"
  //     }
  //   })
  //   .then(async(checkExist) =>{

  //   console.log(checkExist.status)
  //   if(checkExist.status == '404'){   // No meeting found

  //     console.log('meeting not existing so creating')
  //   return await  Axios.post(`https://api.daily.co/v1/rooms`, { // Creating new Room
  //       name:`videochat-${meeting_id}`,
  //       "properties": {
  //         "enable_knocking":true,
  //         "max_participants":30,
  //         "enable_chat":true,
  //         "signaling_impl":"ws",
  //         "start_video_off":false

  //         },
  //         "privacy":"private"

  //     },{
  //       headers:{
  //         Authorization:"Bearer 1276ec95565f006d5c82b2516134101b2d749c1b70491d6197669b5d93efcb64"
  //       }
  //     })
  //     .then(async(res)=>{  // After creating room. Create meeting Token

  //     return await Axios.post("https://api.daily.co/v1/meeting-tokens", {
  //                       properties:{
  //                         room_name:`videochat-${meeting_id}`,
  //                         user_name:`${userdata.displayname}`,
  //                         user_id:`${userdata.username}`
  //                       }
  //                     },
  //                       {"headers": {
  //                         "Content-Type": "application/json",
  //                         "Authorization": "Bearer 1276ec95565f006d5c82b2516134101b2d749c1b70491d6197669b5d93efcb64"
  //                       }},
  //                     )
  //                     .then(response => {
  //                       console.log(response.data.token);
  //                       return { url: `https://madguy.daily.co/videochat-${meeting_id}/?t=${response.data.token}` };
  //                     })
  //                     .catch(err => {
  //                       console.log(err.response);
  //                       return { url: `https://madguy.daily.co/videochat-${meeting_id}&t=error` };
  //                     });

  //                   })
  //                   .catch(err => {
  //                     console.log('error while creating meeting')
  //                     console.error(err.response.data);
  //                     return { url: `https://madguy.daily.co/videochat-${meeting_id}&t=error` };
  //                   });
  //     // return { url: `https://madguy.daily.co/videochat-${meeting_id}/` };

  //   }else{
  //      // meeting existed

  //                    return await Axios.post("https://api.daily.co/v1/meeting-tokens", {
  //                       properties:{
  //                         room_name:`videochat-${meeting_id}`,
  //                         enable_screenshare:true,
  //                         user_name:`${userdata.displayname}`,
  //                         user_id:`${userdata.username}`
  //                       }
  //                     },
  //                       {"headers": {
  //                         "Content-Type": "application/json",
  //                         "Authorization": "Bearer 1276ec95565f006d5c82b2516134101b2d749c1b70491d6197669b5d93efcb64"
  //                       }},
  //                     )
  //                     .then(response => {
  //                       AsyncStorage.setItem('username','Test');
  //                       console.log(response.data.token);
  //                       return { url: `https://madguy.daily.co/videochat-${meeting_id}/?t=${response.data.token}` };
  //                     })
  //                     .catch(err => {
  //                       console.log(123)
  //                       console.error(err);
  //                       return { url: `https://madguy.daily.co/videochat-${meeting_id}t=error` };
  //                     });
  //   }

  // }).catch(e=>{
  //   console.log(130)
  //   console.log(e);
  // })

  // Comment out the above and uncomment the below, using your own URL
}

export default { createRoom };
