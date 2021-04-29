import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//signOut
import Login from "./src/Scenes/Login"
import Subscribe from "./src/Scenes/Subscribe"


import AwesomePage from "./src/Scenes/AwesomePage";

const Stack = createStackNavigator();

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
      <Stack.Navigator initialRouteName="AwesomePage">
        <Stack.Screen name="AwesomePage" component={AwesomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}






