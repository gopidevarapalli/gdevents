/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme, 
  Button
} from 'react-native-paper';

import {DrawerContent}  from './screens/DrawerContent';

import MainTabScreen from './screens/MainTabScreen';
import SupportScreen from './screens/SupportScreen';
import SettingsScreen from './screens/SettingsScreen';
import BookmarkScreen from './screens/BookmarkScreen';

import { AuthContext } from './components/context';
import store from './redux/store';
import { Provider } from 'react-redux';
import RootStackScreen from './screens/RootStackScreen';
import NetInfo from "@react-native-community/netinfo";
import Modal from "react-native-modal";

import AsyncStorage from '@react-native-community/async-storage';

const Drawer = createDrawerNavigator();

const App = () => {
  const [isInternetConnected, setisInternetConnected] = useState(true);
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null); 
  NetInfo.addEventListener(networkState => {
    console.log("Connection type - ", networkState.type);
    console.log("Is connected? - ", networkState.isConnected);
    if(isInternetConnected !== networkState.isConnected){
      setisInternetConnected(networkState.isConnected);
    }
    
  });

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      headerBackground:'#00dea5',
      text: '#333333'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  // const loginReducer = (prevState, action) => {
  //   switch( action.type ) {
  //     case 'RETRIEVE_TOKEN': 
  //       return {
  //         ...prevState,
  //         userToken: action.token,
  //         isLoading: false,
  //       };
  //     case 'LOGIN': 
  //       return {
  //         ...prevState,
  //         userName: action.id,
  //         userToken: action.token,
  //         isLoading: false,
  //       };
  //     case 'LOGOUT': 
  //       return {
  //         ...prevState,
  //         userName: null,
  //         userToken: null,
  //         isLoading: false,
  //       };
  //     case 'REGISTER': 
  //       return {
  //         ...prevState,
  //         userName: action.id,
  //         userToken: action.token,
  //         isLoading: false,
  //       };
  //   }
  // };

  //const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    // signIn: async(foundUser) => {
    //   // setUserToken('fgkj');
    //   // setIsLoading(false);
    //   const userToken = String(foundUser[0].userToken);
    //   const userName = foundUser[0].username;
      
    //   try {
    //     await AsyncStorage.setItem('userToken', userToken);
    //   } catch(e) {
    //     console.log(e);
    //   }
    //   // console.log('user token: ', userToken);
    //   dispatch({ type: 'LOGIN', id: userName, token: userToken });
    // },
    // signOut: async() => {
    //   // setUserToken(null);
    //   // setIsLoading(false);
    //   try {
    //     await AsyncStorage.removeItem('userToken');
    //   } catch(e) {
    //     console.log(e);
    //   }
    //   dispatch({ type: 'LOGOUT' });
    // },
    // signUp: () => {
    //   // setUserToken('fgkj');
    //   // setIsLoading(false);
    // },
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }
  }), []);

  

  
  return (
    <Provider store ={ store}>
      
    <PaperProvider theme={theme}>
    <AuthContext.Provider value={authContext}>
    <NavigationContainer theme={theme}>
     
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          {/* <RootStack.Screen name="SignInScreen" component={SignInScreen}
         options={{
            gestureEnabled: false 
          }}
        /> */}
        <Drawer.Screen name="Rootscreen" component={RootStackScreen}
        options={{
          gestureEnabled: false 
        }}
        />
          <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
          <Drawer.Screen name="SupportScreen" component={SupportScreen} />
          <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
          <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
        </Drawer.Navigator>

    </NavigationContainer>
    </AuthContext.Provider>
    </PaperProvider>
    {/* {isInternetConnected?null:<Text style={{textAlign:"center", backgroundColor:"red", color:"white"}}>Internet connection lost</Text>} */}
    <Modal isVisible={!isInternetConnected} style={styles.modal} animationInTiming={600}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Connection Error</Text>
      <Text style={styles.modalText}>
        Oops! Looks like your device is not connected to the Internet.
      </Text>
      {/* <Button >
        Try Again
      </Button> */}
    </View>
  </Modal>
    </Provider>
  );
}

const styles = StyleSheet.create({
  // ...
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
  },
  modalText: {
    fontSize: 18,
    color: '#555',
    marginTop: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default App;
