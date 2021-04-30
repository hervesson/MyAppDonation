import React, { useState, useEffect } from 'react';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawerContent from "./src/Components/SideMenu"

//signOut
import Login from "./src/Scenes/Login"
import Subscribe from "./src/Scenes/Subscribe"


import AwesomePage from "./src/Scenes/AwesomePage";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const SignedOutRoutes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Subscribe" component={Subscribe} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export const SignedInRoutes = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="AwesomePage" drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Notifications" component={AwesomePage} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}






