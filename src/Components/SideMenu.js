import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {  DrawerActions } from '@react-navigation/native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import { Helpers } from "../Services/Helpers"
import User from "../Assets/Images/avatar.svg"
const helperService = new Helpers();

function CustomDrawerContent({props, navigation}) {
   const [user, setUser] = useState([]);

   useEffect(() => {
      buscarUser()
   }, []);
  
   function buscarUser(){
      helperService.findUser().then((resp) => {setUser(resp.data)})
   }

   return (
      <DrawerContentScrollView {...props}>
      <View>
         <View style={styles.containerInfomation}>
            <View style={styles.containerUser}>
            {
               user ? 
                  <Image style={styles.avatar}
                     source={{uri: 'https://semfome.api.7clicks.dev/uploads/avatar/'+user.avatar}}
                  />
               : 
                  <View style={{marginLeft: 10}}>
                     <User width={40} height={40} fill="#000" />
                  </View>
            }
               
               <View style={styles.infomacoesAvatar}>
               {
                  user ? <Text style={styles.textAvatar}>{user.name}</Text> : <Text style={styles.textAvatar}>Usuário</Text>
               }
                  
                  {/*<Text style={styles.textAvatar}>São luis - MA</Text>*/}
               </View>
            </View>
            <View style={styles.closeSideBar}>
               <Icon name="close-outline" size={30} color="black" onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}/>
            </View>
         </View> 
         <View style={styles.divider}></View>  
         <TouchableOpacity style={styles.itemMenu} onPress={() =>  navigation.navigate('Carteira')}>
            <Icon name="wallet-outline" size={30} color="#F7344B" />
            <Text style={styles.textMenu}>
              Minha Carteira
            </Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.itemMenu}  onPress={() => navigation.navigate('MinhasDoacoes')}>
            <Icon name="archive-outline" size={30} color="#F7344B" />
            <Text style={styles.textMenu}> 
              Minhas Doações
            </Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.itemMenu} onPress={() => navigation.navigate('Config')}>
            <Icon name="settings-outline" size={30} color="#F7344B" />
            <Text style={styles.textMenu}>
              Configurações de Conta
            </Text>
         </TouchableOpacity> 
      </View>   
      </DrawerContentScrollView>
   );
}

const styles = StyleSheet.create({
   containerInfomation: {
      flexDirection: 'row',
      justifyContent:  'space-between' 
   },
   containerUser: {
      flexDirection: 'row',
      alignItems: 'center', 
      paddingVertical: 20
   },
   avatar: {
      height: 55, 
      width: 55, 
      borderRadius:45, 
      marginLeft:20
   },
   infomacoesAvatar: {
      padding: 5
   },
   textAvatar: {
      fontFamily: 'Open Sans Regular',
      fontSize: 15
   },
   closeSideBar : {
      paddingRight:15,
      paddingTop: 20
   },
   divider: {
      flex: 1,
      height: 1,
      backgroundColor: "#707070",
      marginHorizontal: 10
   },
   itemMenu: {
      flexDirection: "row",
      marginTop:25,
      marginLeft:10,
      alignItems: 'center'
   },
   textMenu: {
      marginLeft: 10,
      fontFamily: 'Open Sans Bold',
      fontSize:13
   }
});

export default CustomDrawerContent;



/*<DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
      />
      <Text>Oi</Text>*/