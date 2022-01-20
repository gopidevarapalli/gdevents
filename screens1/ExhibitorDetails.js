import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/Ionicons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Feather from 'react-native-vector-icons/Feather';

export default function ExhibitorDetails() {
    return (
        <View style={styles.container}>
            <ScrollView>
             <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                 
                <Text style={{ color:"#20c997", fontSize:20, marginTop:2}}>Ingredion Inc</Text>
        
               
                {/* <TouchableOpacity >
                <View style={{borderRadius:5, height:30, width:30, backgroundColor:"#ddd", borderRadius:30}}>
                  <Text style={{color:"#000", textAlign:"center", marginTop:3}}>Remove from my Favorites</Text> 
                    <MaterialIcons style={{marginLeft:5, marginTop:4}} name ="favorite" size={20} color="#000" />
                </View>
                </TouchableOpacity> */}
              
            </View>
            <View style={{marginTop:10}}></View>
            <TouchableOpacity>
                <View style={{borderRadius:5, backgroundColor:"#f2f2f2", marginLeft:8, width:185, height:25,}}>
                    <Text style={{color:"#000", textAlign:"center"}}>GlobalData Extended Profile</Text>
                </View>
            </TouchableOpacity>

            <View style={{marginTop:20}}></View>
            <Text>Ingredion Inc (Ingredion) is an ingredients solutions provider. The company manufactures and markets sweeteners, starches, nutrition ingredients, and biomaterials products. Its ingredient solutions are used in packaged foods and prepared foods</Text>

            <View style={{marginTop:20}}></View>

            <View style={{flexDirection:"row", backgroundColor:"#f2f2f2", borderColor:"#ddd", borderTopWidth:1, borderLeftWidth:1, borderRightWidth:1, height:35}}>
                <View style={{ flex:1, borderColor:"#ddd" }}><Text style={{color:"#000", marginLeft:10, marginTop:5}}>Company Type</Text></View>
                <View style={{ flex:1, borderColor:"#ddd" }}><Text style={{color:"#000", marginLeft:10, marginTop:5 }}>Public</Text></View>
            </View>
            <View
            style={{
                borderBottomColor: '#bfbfbf',
                borderBottomWidth: 1,
                width:"95%",
            }}>
            </View>

            <View style={{flexDirection:"row", backgroundColor:"#f2f2f2", borderColor:"#ddd", borderLeftWidth:1, borderRightWidth:1, flexWrap:"wrap", height:45}}>
                <View style={{ flex:1, borderColor:"#ddd" }}><Text style={{color:"#000", marginLeft:10, marginTop:5}}>Company Classification</Text></View>
                <View style={{ flex:1, borderColor:"#ddd" }}><Text style={{color:"#000", marginLeft:10, marginTop:5 }}>Technology, Media & Telecom</Text></View>
            </View>
            <View
            style={{
                borderBottomColor: '#bfbfbf',
                borderBottomWidth: 1,
                width:"95%",
            }}>
            </View>

            <View style={{flexDirection:"row", backgroundColor:"#f2f2f2", borderColor:"#ddd", borderLeftWidth:1, borderRightWidth:1, height:35}}>
                <View style={{ flex:1, borderColor:"#ddd" }}><Text style={{color:"#000", marginLeft:10, marginTop:5}}>Booth Number</Text></View>
                <View style={{ flex:1, borderColor:"#ddd" }}><Text style={{color:"#000", marginLeft:10, marginTop:5 }}>Audi03</Text></View>
            </View>
            <View
            style={{
                borderBottomColor: '#bfbfbf',
                borderBottomWidth: 1,
                width:"95%",
            }}>
            </View>

            <View style={{flexDirection:"row", backgroundColor:"#f2f2f2", borderColor:"#ddd", borderLeftWidth:1, borderRightWidth:1, height:35}}>
                <View style={{ flex:1, borderColor:"#ddd" }}><Text style={{color:"#000", marginLeft:10, marginTop:5}}>Exhibitor Type</Text></View>
                <View style={{ flex:1, borderColor:"#ddd" }}><Text style={{color:"#000", marginLeft:10, marginTop:5 }}>spotlight exhibitors</Text></View>
            </View>
            <View
            style={{
                borderBottomColor: '#bfbfbf',
                borderBottomWidth: 1,
                width:"95%",
            }}>
            </View>

            <View style={{flexDirection:"row", backgroundColor:"#f2f2f2", borderColor:"#ddd", borderLeftWidth:1, borderRightWidth:1, height:45}}>
                <View style={{ flex:1, borderColor:"#ddd" }}><Text style={{color:"#000", marginLeft:10, marginTop:5}}>Address Type</Text></View>
                <View style={{ flex:1, borderColor:"#ddd" }}><Text style={{color:"#000", marginLeft:10, marginTop:5 }}>5 Westbrook Corporate Ctr, Berkeley Square1</Text></View>
            </View>
            <View
            style={{
                borderBottomColor: '#bfbfbf',
                borderBottomWidth: 1,
                width:"95%",
            }}>
            </View>

            <View style={{flexDirection:"row", backgroundColor:"#f2f2f2", borderColor:"#ddd", borderLeftWidth:1, borderRightWidth:1, height:35}}>
                <View style={{ flex:1, borderColor:"#ddd" }}><Text style={{color:"#000", marginLeft:10, marginTop:5}}>Company Website</Text></View>
                <View style={{ flex:1, borderColor:"#ddd" }}><Text style={{color:"#20c997", marginLeft:10, marginTop:5 }}>www.ingredion.com/</Text></View>
            </View>
            <View
            style={{
                borderBottomColor: '#bfbfbf',
                borderBottomWidth: 1,
                width:"95%",
            }}>
            </View>

            <View style={{flexDirection:"row", backgroundColor:"#f2f2f2", borderColor:"#ddd", borderLeftWidth:1, borderRightWidth:1, height:35}}>
                <View style={{ flex:1, borderColor:"#ddd" }}><Text style={{color:"#000", marginLeft:10, marginTop:5}}>City</Text></View>
                <View style={{ flex:1, borderColor:"#ddd" }}><Text style={{color:"#000", marginLeft:10, marginTop:5 }}>WESTCHESTER</Text></View>
            </View>
            <View
            style={{
                borderBottomColor: '#bfbfbf',
                borderBottomWidth: 1,
                width:"95%",
            }}>
            </View>

            <View style={{flexDirection:"row", backgroundColor:"#f2f2f2", borderColor:"#ddd", borderLeftWidth:1, borderRightWidth:1, height:35}}>
                <View style={{ flex:1, borderColor:"#ddd" }}><Text style={{color:"#000", marginLeft:10, marginTop:5}}>State</Text></View>
                <View style={{ flex:1, borderColor:"#ddd" }}><Text style={{color:"#000", marginLeft:10, marginTop:5 }}>lllinois</Text></View>
            </View>
            <View
            style={{
                borderBottomColor: '#bfbfbf',
                borderBottomWidth: 1,
                width:"95%",
            }}>
            </View>

            <View style={{flexDirection:"row", backgroundColor:"#f2f2f2", borderColor:"#ddd", borderLeftWidth:1, borderRightWidth:1, height:35}}>
                <View style={{ flex:1, borderColor:"#ddd" }}><Text style={{color:"#000", marginLeft:10, marginTop:5}}>Country Type</Text></View>
                <View style={{ flex:1, borderColor:"#ddd" }}><Text style={{color:"#000", marginLeft:10, marginTop:5 }}>United States</Text></View>
            </View>
            <View
            style={{
                borderBottomColor: '#bfbfbf',
                borderBottomWidth: 1,
                width:"95%",
            }}>
            </View>

          

            <View style={{flexDirection:"row", backgroundColor:"#f2f2f2", borderColor:"#ddd", borderBottomWidth:1, borderLeftWidth:1, borderRightWidth:1, height:35}}>
                <View style={{ flex:1, borderColor:"#ddd"}}><Text style={{color:"#000", marginLeft:10, marginTop:5}}>Zipcode</Text></View>
                <View style={{ flex:1, borderColor:"#ddd"}}><Text style={{color:"#000", marginLeft:10, marginTop:5 }}>60154-5749</Text></View>
            </View>

   
            <View style={{marginTop:10, flexDirection:"row", justifyContent:"center"}}>
                <TouchableOpacity>
                    <MaterialCommunityIcons color="#000" name="facebook" size={22} />
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft:8}}>
                    <EvilIcons color="#000" name="sc-twitter"  size={26}/>
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft:8}}>
                    <AntDesign color="#000" name="linkedin-square"  size={19}/>
                </TouchableOpacity>
            </View>

                    <View style={{marginTop:20}}></View>

            <View style={{alignItems:"center"}}><Text style={{fontSize:20}}>Delagates</Text></View>

            <View style={{marginTop:20}}></View>

            <View style={{flexDirection:"column", backgroundColor:"#f2f2f2"}}>

            <View style={styles.cardBody}>
            <View style={{ borderColor:"#bfbfbf", alignItems:"center",  height: 65, width: 65, borderRadius:60,  borderWidth:1,  }}>
           <Image style={{ height: 50, width: 50, borderRadius:50, marginTop:6 }}  source={{uri: 'https://ind-backend-events-website.pantheonsite.io/wp-content/uploads/2020/07/1594022274Michael-Cares-250x250-1.jpg'}} />
           </View>

            <View style={styles.cardDetails}>
                <View style={styles.headDetails}>
                <Text style={styles.textBody}>Cares M</Text> 
                <View style={{marginLeft:100, flexDirection:"row", justifyContent:"space-around"}}>
                <TouchableOpacity>
                    <EvilIcons color="#20c997" name="comment" Outlined size={25}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <EvilIcons color="#20c997" name="calendar" Outlined size={25}/>
                </TouchableOpacity>
                </View>
                </View>

                <Text>IT Director</Text>
                <Text>Ingredion Inc</Text>
                
                <View style={styles.optionss}>
                    <TouchableOpacity>
                    <MaterialIcons color="#20c997" name="favorite-border" Outlined size={15}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <EvilIcons color="#20c997"  name="credit-card" size={22}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <SimpleLineIcons color="#20c997"  name="user-unfollow" size={15}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <Icon color="#20c997"  name="chatbox-outline" size={20}/>
                    </TouchableOpacity>
                </View>
            </View>  
        </View>

        <View style={{marginTop:20}}></View>

        <View style={styles.cardBody}>
            <View style={{ borderColor:"#bfbfbf", alignItems:"center",  height: 65, width: 65, borderRadius:60,  borderWidth:1,  }}>
           <Image style={{ height: 50, width: 50, borderRadius:50, marginTop:6 }}  source={{uri: 'https://ind-backend-events-website.pantheonsite.io/wp-content/uploads/2020/07/1594022739Tobias-Koehler-250x250-1.jpg'}} />
           </View>

            <View style={styles.cardDetails}>
                <View style={styles.headDetails}>
                <Text style={styles.textBody}>Koehler T.</Text> 
                <View style={{marginLeft:100, flexDirection:"row", justifyContent:"space-around"}}>
                <TouchableOpacity>
                    <EvilIcons color="#20c997" name="comment" Outlined size={25}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <EvilIcons color="#20c997" name="calendar" Outlined size={25}/>
                </TouchableOpacity>
                </View>
                </View>

                <Text>Director</Text>
                <Text>Ingredion Inc</Text>
                
                <View style={styles.optionss}>
                    <TouchableOpacity>
                    <MaterialIcons color="#20c997" name="favorite-border" Outlined size={15}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <EvilIcons color="#20c997"  name="credit-card" size={22}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <SimpleLineIcons color="#20c997"  name="user-unfollow" size={15}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <Icon color="#20c997"  name="chatbox-outline" size={20}/>
                    </TouchableOpacity>
                </View>
            </View>  
        </View>

        <View style={{marginTop:20}}></View>

        <View style={styles.cardBody}>
            <View style={{ borderColor:"#bfbfbf", alignItems:"center",  height: 65, width: 65, borderRadius:60,  borderWidth:1,  }}>
           <Image style={{ height: 50, width: 50, borderRadius:50, marginTop:6 }}  source={{uri: 'https://ind-backend-events-website.pantheonsite.io/wp-content/uploads/2020/07/1594030396MichaelToedt-250x350-1.jpg'}} />
           </View>

            <View style={styles.cardDetails}>
                <View style={styles.headDetails}>
                <Text style={styles.textBody}>Teodt M</Text> 
                <View style={{marginLeft:100, flexDirection:"row", justifyContent:"space-around"}}>
                <TouchableOpacity>
                    <EvilIcons color="#20c997" name="comment" Outlined size={25}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <EvilIcons color="#20c997" name="calendar" Outlined size={25}/>
                </TouchableOpacity>
                </View>
                </View>

                <Text>Managing Director</Text>
                <Text>Ingredion Inc</Text>
                
                <View style={styles.optionss}>
                    <TouchableOpacity>
                    <MaterialIcons color="#20c997" name="favorite-border" Outlined size={15}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <EvilIcons color="#20c997"  name="credit-card" size={22}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <SimpleLineIcons color="#20c997"  name="user-unfollow" size={15}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <Icon color="#20c997"  name="chatbox-outline" size={20}/>
                    </TouchableOpacity>
                </View>
            </View>  
        </View>
            
            </View>

            <View style={{marginTop:20}}></View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:16,
    },
     cardBody:{
        backgroundColor:"#fff",
        padding:16,
        flexDirection: 'row',
        borderRadius:15,
        borderColor:"#fff",
        borderWidth:1
     
    },
    cardDetails:{
      paddingHorizontal: 20
    },
    headDetails:{
      flexDirection:"row",
    },
    textBody:{
        fontWeight:"bold",
       // flexDirection:"row"
    },
    designation:{
      fontSize:12,
    },
    company:{
        fontSize:11,
        fontWeight:"bold",
    },
    optionss: {
      //backgroundColor: '#fff',
      //marginTop:15,
      paddingTop:10,
      height: 35,
      borderColor: '#f2f2f2',
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
})
