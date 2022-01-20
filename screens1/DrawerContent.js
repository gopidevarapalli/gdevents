import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import{ AuthContext } from '../components/context';
import { connect } from 'react-redux';
import store from '../redux/store';
import Axios from 'axios';
import api_url from '../Config/Config';

export function DrawerContent({props,navigation}) {
    //const navigate = props.navigation;
    const paperTheme = useTheme();

    const { signOut, toggleTheme } = React.useContext(AuthContext);
    const [profileData,setProfileData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
 

    
  useEffect(()=>{
    //   alert(store.getState().login.cookie)
      if(store.getState().login.cookie){
        const formData = new FormData();
        formData.append('cookie', store.getState().login.cookie);
        Axios.post(`${api_url.currentUserInfo}`, formData)
        .then(res=>{
        //   console.log(res.data)
          setProfileData(res.data);
        //   console.log("https://events.globaldata.com"+res.data.user.avatar)
        //   alert("https://events.globaldata.com"+res.data.user.avatar)
          setIsLoading(false);
          })
      }


  }, [store.getState().login.cookie])


    return(isLoading?<ActivityIndicator size="large" color="blue"
    style={{
        marginTop:200
    }}
    />:
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={{
                                    uri: 'https://events.globaldata.com'+profileData.user.avatar
                                }}
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>{store.getState().login.common.user?store.getState().login.common.user.displayname:''}</Title>
                                <Caption style={styles.caption}>{store.getState().login.common.user?store.getState().login.common.user.email:''}</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                            {/* <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                                <Caption style={styles.caption}>Following</Caption>
                            </View> */}
                            <View style={styles.section}>
                                {/* <Paragraph style={[styles.paragraph, styles.caption]}>Security Operations Director</Paragraph> */}
                                {/* <Caption style={styles.caption}>yoganath1265@gmail.com</Caption> */}
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => {navigation.navigate('profilelist')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="bookmark-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Bookmarks"
                            onPress={() => {navigation.navigate('favlist')}}
                        />
                        {/* <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="settings-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Settings"
                            onPress={() => {navigation.navigate('SettingScreen')}}
                        /> */}
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-check-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Support"
                            onPress={() => {navigation.navigate('support')}}
                        />
                    </Drawer.Section>
                    {/* <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section> */}
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    
                      onPress={() => navigation.navigate('SignInScreen')}
                />
            </Drawer.Section>
        </View>
    );
}

// const mapStateToProps = state =>{
//     return (
//         {
//             login:state.login
//         }
//     )
// }
 
// export default connect(mapStateToProps)(DrawerContent);

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });