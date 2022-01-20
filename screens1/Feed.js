import React, { useEffect,useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Image,Dimensions, TouchableOpacity, TextInput, Keyboard  } from 'react-native'
// import Data2 from '../data/Data2.json'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { List } from 'react-native-paper';
import Axios from 'axios'
import { connect } from 'react-redux';
import HTML from 'react-native-render-html';
import api_url from '../Config/Config'

function Feed(props) {

    const [expanded, setExpanded] = React.useState(true);

    const handlePress = () => setExpanded(!expanded);

    const [feedList, setFeedList] = useState([]);

    useEffect(()=>{
        const formData = new FormData();
        formData.append('cookie',props.login.cookie);
        Axios.post(`${api_url.FeedList}`, formData)
        .then(res=>{
            console.log(res.data.stream[0])
            setFeedList(res.data.stream);
        })
    },[])

    return (
        <View>
<ScrollView>     
  
            {feedList.map((feed,i)=>{
                return (

                    <View style={styles.card} key={i}> 
                    <View style={styles.cardBody}>
                        {/* <Image style={{ height: 60, width: 60, borderRadius:50 }}  source={{uri:feed.profile_pic}} /> */}
                        <Image style={{ height: 60, width: 60, borderRadius:50 }}  source={{uri:feed.Profilepic}} />
                   
                        <View style={styles.cardDetails}>
                            <View style={styles.headDetails}>
                            <Text style={styles.textBody}>{feed.Name} </Text> 
                            <Text>Uploaded 1 photo</Text>
                            </View>
                            <Text style={{marginTop:7, flexDirection:"row"}}>{feed.PostAge}</Text>
                        </View>                   
                    </View>
                    <View>
                        <Text style={{marginLeft:16, marginRight:16}}>{feed.Content}</Text>
                    
                    {/* <Image style={{width: '100%', height:200, marginTop:10 }}  source={{uri: 'https://ind-backend-events-website.pantheonsite.io/wp-content/uploads/peepso/users/210/photos/thumbs/62dc877f345563fcd7fd20c707f2164f_l.jpg'}} /> */}
                    <HTML
                    alterChildren = { (node) => {
                        if (node.name === 'iframe') {
                            delete node.attribs.width;
                            delete node.attribs.height;
                        }
                        return node.children;
                    }}
                tagsStyles= {{p: { lineHeight: 22,marginBottom:10} } }
                html={"<p>"+feed.Attachment +"</p>" }
                imagesMaxWidth={Dimensions.get('window').width} />
                    </View>
                    
                   {feed.comments?feed.comments.map((comment,i)=>{ console.log(comment)
                   return <View style={styles.cardBody} key={i}>
                        <Image style={{ height: 50, width: 50, borderRadius:50 }}  source={{uri: comment.Profilepic}} />
                        <View style={styles.cardDetails}>
                            <View style={styles.headDetails}>
                            <Text style={styles.textBody}>{comment.Name} </Text> 
                   <Text>{comment.Content}</Text>
                            </View>
    
                            <View  style={{flexDirection:"row"}}>
                                <View style={{backgroundColor:"#ddd", flexDirection:"row"}}>
                   <Text>{comment.CommentAge}</Text>
                             <FontAwesome style={{marginLeft:5, marginTop:3}} name="link"  size={16} color="black" />
                             </View>
                             <FontAwesome style={{marginLeft:8, marginTop:3}} name="thumbs-up"  size={16} color="black" />
                             <MaterialIcons style={{marginLeft:8, marginTop:3}} name="add"  size={16} color="black" />
                             <MaterialIcons style={{marginLeft:8, marginTop:3}} name="edit"  size={16} color="black" />
                            </View>
                        </View> 
                    </View>
            }):<View></View>}
                      <View style={{flexDirection:"row"}}>
                    <TextInput  style={{marginLeft:15}} placeholder= "Write a comment..." editable={true}  />    
                    <Fontisto name="camera" style={{marginTop:18, marginLeft:160}} color="black" />
                    </View>
                   </View>
     
    
                )
            })}
            
     

     
         
    </ScrollView>

        </View>
    )
}

const mapStateToProps = state =>{
    return ({
        login:state.login
    })
}

export default connect(mapStateToProps)(Feed);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#ebde34',
        //alignItems: 'center',
        //justifyContent: 'center',
       // padding:16,
      },
      card:{
        borderRadius:6,
        elevation:3,
        backgroundColor:"#fff",
        shadowOffset: {width: 1, height: 1},
        shadowColor: '#333',
        shadowOpacity:0.3,
        shadowRadius:2,
        margin:16,
      },
      cardBody:{
       // backgroundColor:"#ddd",
        padding:16,
        flexDirection: 'row',
        borderRadius:6,
        borderColor:"blue"
     
    },
    cardDetails:{
        paddingHorizontal: 20
      },
      headDetails:{
        flexDirection:"row",
      },
      textBody:{
          fontWeight:"bold",
          flexDirection:"row"
      },
      iframe:{
          width:500
      }
})
