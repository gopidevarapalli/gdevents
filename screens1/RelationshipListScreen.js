import React, { useEffect, useState } from 'react'; 
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
 
import Relationship from './Relationship';
import PotentialRelationshipScreen from '../components/PotentialRelationshipScreen';




const Tab = createMaterialTopTabNavigator();




const RelationshipListScreen = (props) => {
 

 

  return (
    <Tab.Navigator
    tabBarOptions={{
      scrollEnabled: true,
      indicatorStyle:{ backgroundColor: '#1E1727',},
      labelStyle: {
        fontSize: 12, fontWeight:'600'},
      style: { backgroundColor: '#80EED2' },
    }}> 
      <Tab.Screen name="Recommended">
        {()=> <Relationship />
        }
      </Tab.Screen>
      <Tab.Screen name="Potential">
        {()=> <PotentialRelationshipScreen />}  
      </Tab.Screen> 
 
    </Tab.Navigator>
  );
  
};

export default RelationshipListScreen;


