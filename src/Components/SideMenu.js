import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {  DrawerActions } from '@react-navigation/native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';

function CustomDrawerContent({props, navigation}) {
   const [user, setUser] = useState([]);

   useEffect(() => {
      var user = auth().currentUser;
      var name, email, photoUrl, uid, emailVerified;

      if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid; 
      }
      setUser(user)
   }, [])

   function SignOut(argument) {
      auth().signOut().then(() => console.log('User signed out!'));
   }

   return (
      <DrawerContentScrollView {...props}>
      <View>
         <View style={styles.containerInfomation}>
            <View style={styles.containerUser}>
               <Image style={styles.avatar}
                  source={{uri: user.photoURL}}
               />
               <View style={styles.infomacoesAvatar}>
                  <Text style={styles.textAvatar}>{user.displayName}</Text>
                  {/*<Text style={styles.textAvatar}>São luis - MA</Text>*/}
               </View>
            </View>
            <View style={styles.closeSideBar}>
               <Icon name="close-outline" size={30} color="black" onPress={() => props.navigation.closeDrawer()}/>
            </View>
         </View> 
         <View style={styles.divider}></View>  
         <TouchableOpacity style={styles.itemMenu} onPress={() =>  navigation.navigate('Carteira')}>
            <Icon name="wallet-outline" size={30} color="#F7344B" />
            <Text style={styles.textMenu}>
              Carteira
            </Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.itemMenu}  onPress={() => navigation.navigate('MinhasDoacoes')}>
            <Icon name="archive-outline" size={30} color="#F7344B" />
            <Text style={styles.textMenu}> 
              Minhas Doações
            </Text>
         </TouchableOpacity>
         <View style={styles.itemMenu}>
            <Icon name="heart-outline" size={30} color="#F7344B" />
            <Text style={styles.textMenu}>
              Entidades Favoritas
            </Text>
         </View>
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