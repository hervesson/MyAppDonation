import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, ScrollView, TextInput, Switch, TouchableOpacity, Alert } from 'react-native'
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';

const Config = () => {
	const [user, setUser] = useState([]);
   const [isEnabled, setIsEnabled] = useState(false);
   const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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

   const createThreeButtonAlert = () =>
   Alert.alert(
      "Tem certeza que deseja excluir sua conta?",
      "Depois de excluida, não há como recuperar",
      [
         {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
         },
         { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
   );

	return (
		<ScrollView style={{flex: 1}}>
         <View style={styles.containerAvatar}>
         <Text style={styles.titulo}>   
               Foto de Perfil
            </Text>
   			<Image style={styles.avatar}
               source={{uri: user.photoURL}}
               resizeMode="contain"
            />
         </View>
         <View style={styles.containerInformacoes}>
            <Text style={styles.titulo}>   
               Nome de Usuário
            </Text>
            <Text style={styles.descricao}>
               {user.displayName}
            </Text>
            <Text style={styles.titulo}>   
               Email:
            </Text>
            <Text style={styles.descricao}>
               {user.email}
            </Text>
         </View>
         <View style={styles.container}>
            <Text style={{fontFamily: 'Open Sans Regular', fontSize: 13}}>   
               Habilitar Notificações
            </Text>
            <Switch
               trackColor={{ false: "#767577", true: "#999" }}
               thumbColor={isEnabled ? "green" : "#f4f3f4"}
               ios_backgroundColor="#3e3e3e"
               onValueChange={toggleSwitch}
               value={isEnabled}
            />
         </View>   
         <TouchableOpacity style={styles.itemMenu} onPress={() => createThreeButtonAlert()}>
            <Icon name="close-circle-outline" size={30} color="#F7344B" />
            <Text style={styles.textMenu}>
              Excluir conta
            </Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.itemMenu} onPress={() => SignOut()}>
            <Icon name="log-out-outline" size={30} color="#F7344B" />
            <Text style={styles.textMenu}>
              Sair
            </Text>
         </TouchableOpacity>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
   avatar: {
      height: 55, 
      width: 55, 
      borderRadius:45, 
   },
   containerAvatar: {
      height: 100,
      justifyContent: "center",
      alignItems: "center"
   },
   titulo:{
      fontFamily: 'Open Sans Light',
      fontSize: 13,
      paddingTop: 20
   },
   descricao: {
      fontFamily: 'Open Sans Regular',
   },
   containerInformacoes: {
      paddingHorizontal: 10,
      //backgroundColor: "red"
   },
   container: {
      flex: 1,
      alignItems: "center",
      borderColor: '#999',
      marginHorizontal: 10,
      borderWidth: 1,
      borderRadius: 10,
      flexDirection: 'row',
      marginTop: 20,
      padding: 10,
      justifyContent: 'space-between' 
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
})   

export default Config
