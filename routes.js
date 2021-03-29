import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import SideMenu from "./src/Components/SideMenu"
import Login from "./src/Cenas/Login";
import Welcome from "./src/Cenas/Welcome";


import Generico from "./src/Cenas/Generico";


export const SignedOutRoutes = createStackNavigator({
  Home: {
    screen: Login
  },
  Welcome: {
    screen: Welcome
  }
});

export const SignedInRoutes = createStackNavigator(
  {
    Generico: {
    screen: Generico
    },
  }
);






