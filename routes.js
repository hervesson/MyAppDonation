import React, { useState, useEffect } from 'react';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawerContent from "./src/Components/SideMenu"


import AwesomePage from "./src/Scenes/AwesomePage";
import DetalhesEntidade from "./src/Scenes/DetalhesEntidade";
import ListEntidade from "./src/Scenes/ListEntidade"
import DetalhesNoticia from "./src/Scenes/DetalhesNoticia"
import ListAgenda from "./src/Scenes/ListAgenda"
import DetalhesAgenda from "./src/Scenes/DetalhesAgenda"
import Sobre from "./src/Scenes/Sobre"
import Carteira from "./src/Scenes/Carteira"
import MinhasDoacoes from "./src/Scenes/MinhasDoacoes"
import Config from "./src/Scenes/Config"

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const SignedInRoutes = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="AwesomePage" drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="AwesomePage" component={AwesomePage} />
        <Drawer.Screen name="DetalhesEntidade" component={DetalhesEntidade} />
        <Drawer.Screen name="DetalhesNoticia" component={DetalhesNoticia} />
        <Drawer.Screen name="ListEntidade" component={ListEntidade} />
        <Drawer.Screen name="ListAgenda" component={ListAgenda} />
        <Drawer.Screen name="DetalhesAgenda" component={DetalhesAgenda} />
        <Drawer.Screen name="Sobre" component={Sobre} />
        <Drawer.Screen name="Carteira" component={Carteira} />
        <Drawer.Screen name="MinhasDoacoes" component={MinhasDoacoes} />
        <Drawer.Screen name="Config" component={Config} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}






