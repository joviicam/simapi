import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ContrasenaScreen from '../screens/ContrasenaScreen';
import IndexScreen from '../screens/IndexScreen';
import AlarmaScreen from '../screens/AlarmaScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CamillasGeneralScreen from '../screens/CamillasGeneralScreen';
import { NavigationContainer } from '@react-navigation/native';
//Menu lateral
const Drawer = createDrawerNavigator();

export default function AppNavigation() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="IndexS" component={IndexScreen} />
      <Drawer.Screen name="ContrasenaS" component={ContrasenaScreen} />
      <Drawer.Screen name="AlramaS" component={AlarmaScreen} />
      <Drawer.Screen name="CamillasGeneralS" component={CamillasGeneralScreen} />
    </Drawer.Navigator>
  );
}
