import { Dimensions, StyleSheet } from 'react-native';

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export default StyleSheet.create({
  max: {
    flex: 1,
    justifyContent:"flex-end"
  },
  buttonHolder: {
    height: 100,
    position:'absolute',
    alignItems: 'flex-end',
    alignSelf:"center",
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    //padding:25,
    margin:20,
    justifyContent: 'space-evenly',
    alignItems:"center",
    alignSelf:"center",
    backgroundColor: 'white',
    borderRadius: 100,
  },
  chatButton: {
   // paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom:25,
    marginLeft:10
  },
  buttonText: {
    color: 'black',
  },
  fullView: {
    width: dimensions.width,
    height: dimensions.height- 52
  },
  remoteContainer: {
    width: '100%',
    //height: 150,
    position: 'absolute',
    //top: 5,
  },
  tinyLogo:{
    width: 25,
    height: 25,
},
  remote: {
    width: 150,
    height: 150,
    marginVertical: 2.5,
    marginRight:40,
    marginLeft:25,
    marginTop:15,
    borderColor: 'red',
    padding: 10,
    borderRadius: 50,
  },
  noUserText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#0093E9',
  },
});
