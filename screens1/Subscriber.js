import React, {  useState,useEffect ,Component} from 'react';
import { View, Button,Text,  Dimensions, Image, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { OTSession, OTSubscriber } from 'opentok-react-native';


// export default Subscriber = () =>{
 

//   const [streamProperties, setstreamProperties] = useState({});
  
//   const [SsubscribeToAudio, setSsubscribeToAudio] = useState(true);
//   const [SsubscribeToVideo, setSsubscribeToVideo] = useState(true);

//   const [sessionEventHandlers, setsessionEventHandlers] = useState ({});

// useEffect(()=>{
 

//   setsessionEventHandlers({
//     streamCreated: event => {
//       let streamProperties1 = { streamProperties, [event.streamId]: {
//         subscribeToAudio: SsubscribeToAudio,
//         subscribeToVideo: SsubscribeToVideo,
//         style: {
//           width: 400,
//           height: 300,
//         },
//       }}
//     setstreamProperties(streamProperties1)
//     },
//   });
// },[])


//   let subscriberEventHandlers = {
//     error: (error) => {
//       console.log(`There was an error with the subscriber: ${error}`);
//     },
//   };
 
//   const [apiKey, setapiKey] = useState("46886964");
//   const [sessionId, setsessionId] = useState("2_MX40Njg4Njk2NH5-MTU5OTQ3MDMzMjkzM35vM2Zoa2tCVm9Zbmlwb2dmSFV6aTJ2NnB-fg");
//   const [token, settoken] = useState("T1==cGFydG5lcl9pZD00Njg4Njk2NCZzaWc9MTJhNzg4YjA0MTA1MTkyOWE5ZGU0NmQ0YTE5ODc3NDcyMjJmYjg1MTpzZXNzaW9uX2lkPTJfTVg0ME5qZzROamsyTkg1LU1UVTVPVFEzTURNek1qa3pNMzV2TTJab2EydENWbTlaYm1sd2IyZG1TRlY2YVRKMk5uQi1mZyZjcmVhdGVfdGltZT0xNTk5NjMwMjQ1Jm5vbmNlPTAuOTE2Mzk0OTc3MjkxNjk4NiZyb2xlPW1vZGVyYXRvciZleHBpcmVfdGltZT0xNjAwMjM1MDQ0JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9");
  
 
//   return (<View>
//     <OTSession apiKey={apiKey} sessionId={sessionId} token={token} eventHandlers={sessionEventHandlers}>
//       <OTSubscriber
//         properties={
//             {
//                 subscribeToAudio:SsubscribeToAudio,
//                 subscribeToVideo:SsubscribeToVideo
//             }
//         }
//         eventHandlers={subscriberEventHandlers}
//         style={{ height: 100, width: 100 }}
//         streamProperties={streamProperties}
//       />
//     </OTSession>
//     <Button title="Subscriber Audio Toggle" onPress={()=> setSsubscribeToAudio(!SsubscribeToAudio)} />
//     <Button title="Subscriber Video Toggle" onPress={()=> setSsubscribeToVideo(!SsubscribeToVideo)} />
//     </View>
//   );
// }
class Subscriber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      streamProperties: {},
    };
  
    this.subscriberProperties = {
      subscribeToAudio: true,
      subscribeToVideo: true,
    };
  
    this.sessionEventHandlers = {
      streamCreated: event => {
        const streamProperties = {...this.state.streamProperties, [event.streamId]: {
          subscribeToAudio: true,
          subscribeToVideo: true,
          style: {
            width: 400,
            height: 300,
          },
        }};
        this.setState({ streamProperties });
      },
    };
  
    this.subscriberEventHandlers = {
      error: (error) => {
        console.log(`There was an error with the subscriber: ${error}`);
      },
    };
  }

  subscriberEventHandlers = {
    streamCreated: event => {
      console.log('Subscriber stream created!', event);
    },
    streamDestroyed: event => {
      console.log('Subscriber stream destroyed!', event);
    }
  };
  
  render() {
    console.log(this.props)
    return (
      // <OTSession apiKey={this.props.apiKey} sessionId={this.props.sessionId} token={this.props.token} eventHandlers={this.sessionEventHandlers}>
        <OTSubscriber key={1}
          properties={this.subscriberProperties}
          eventHandlers={this.subscriberEventHandlers}
          style={{ height: 100, width: 100 }}
          streamProperties={this.state.streamProperties} 
        />
      // </OTSession>
    );
  }
  }

  export default Subscriber;