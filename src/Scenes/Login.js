import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, SafeAreaView, Button, Image, Dimensions, TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import Icon from 'react-native-vector-icons/Ionicons';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Login = ({navigation}) => {
	const [Email, setEmail] = React.useState("");
   const [Senha, setSenha] = React.useState("");

   useEffect(() => {
      GoogleSignin.configure({
         webClientId: '197195621436-rg04skhfl030bupak2fa4q9eljptll49.apps.googleusercontent.com',
      });
   }, [])


   function Logar(argument) {
      auth().signInWithEmailAndPassword(Email, Senha)
      .then(() => {
         console.warn('User account created & signed in!');
      })
      .catch(error => {
         if (error.code === 'auth/email-already-in-use') {
            console.warn('That email address is already in use!');
         }

         if (error.code === 'auth/invalid-email') {
            console.warn('That email address is invalid!');
         }
         console.error(error);
      });
   }

   const onFacebookButtonPress = async() => {
      try {
         // Attempt login with permissions
         const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

         if (result.isCancelled) {
            throw 'User cancelled the login process';
         }

         // Once signed in, get the users AccesToken
         const data = await AccessToken.getCurrentAccessToken();

         if (!data) {
            throw 'Something went wrong obtaining access token';
         }

         // Create a Firebase credential with the AccessToken
         const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

         // Sign-in the user with the credential
         return auth().signInWithCredential(facebookCredential);

      }catch (error){
         console.warn(error)
      }
   }

   const onGoogleButtonPress = async() => {
      try {
         const { idToken } = await GoogleSignin.signIn();

         // Create a Google credential with the token
         const googleCredential = auth.GoogleAuthProvider.credential(idToken);

         // Sign-in the user with the credential
         return auth().signInWithCredential(googleCredential);
         
      }catch (error){
         console.warn(error)
      }
   }

	return (
		<SafeAreaView style={{flex: 1}}>
         <View style={styles.containerSupe}>
            <Image style={styles.avatar}
               source={require('../Assets/Images/logo.png')}
            />
         </View>
         <View style={styles.containerInfe}>
            <Text style={{alignSelf: "center", fontFamily: "Open Sans Bold", fontSize: 12, paddingTop: 10, color:"#666" }}>
               Entrar com Email e senha:
            </Text>
            <View>
               {/*<Text style={styles.label}>
                  Email:
               </Text>*/}
               <View style={styles.input}>
                  <Icon name="mail-outline" size={20} color="black" />
                  <TextInput
                     style={{flex: 1}}
                     onChangeText={setEmail}
                     value={Email}
                     placeholder="Email"
                  />
               </View>
               {/*<Text style={styles.label}>
                  Senha:
               </Text>*/}
               <View style={styles.input}>
                  <Icon name="lock-closed-outline" size={20} color="black" />
                  <TextInput
                     style={{flex: 1}}
                     onChangeText={setSenha}
                     value={Senha}
                     placeholder="Senha"
                     //keyboardType="numeric"
                  />
               </View>
            </View>

            <Text style={styles.forgot}>Esqueceu sua senha?</Text>

            <TouchableOpacity style={styles.containerAdcCartao} onPress={() => {Logar()}}>
               <Text style={styles.txtAdcCartao}>
                  Entrar
               </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.containerFace} onPress={() => {onFacebookButtonPress()}}>
               <Icon name="logo-facebook" size={30} color="white" />
               <Text style={styles.txtAdcCartao}>
                  Login com Facebook
               </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.containerGoogle} onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}>
               <Icon name="logo-google" size={30} color="white" />
               <Text style={styles.txtAdcCartao}>
                  Login com  Google
               </Text>
            </TouchableOpacity>

            <Text style={styles.forgot}>Ainda não tem cadastro? Faça Aqui!</Text>

         {/*<Button title="Logar" color="green" onPress={() => {Logar()}}/>
            <Text>
               Ainda não possui cadastro, cadastre-se clicando no botão abaixo!
            </Text>
         <Button  title="Cadastre-se" color="blue" onPress={() => {navigation.navigate('Subscribe')}}/>*/}
         </View>
      </SafeAreaView>
	)
}

const styles = StyleSheet.create({
   input: {
      height: 40,
      flexDirection: "row",
      paddingLeft: 5,
      alignItems: "center",
      marginHorizontal: 12,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#707070',
      marginVertical: 5
   },
   forgot: {
      fontFamily: 'Open Sans Regular',
      fontSize: 13,
      alignSelf: 'center',
      paddingTop: 15 ,
      textDecorationLine: 'underline'
   },
   label: {
      marginHorizontal: 12,
      fontSize: 12,
      fontFamily: 'Open Sans Regular'
   },
   containerSupe: {
      flex: 1,
      backgroundColor: '#960500',
      justifyContent: "center",
      alignItems: "center",
   },
   containerInfe: {
      flex: 2,
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      marginTop: -20
   },
   avatar: {
      height: 181,
      width: 130
   },
   containerAdcCartao: {
      justifyContent: "center",
      alignItems: "center",
      height: 55,
      width: 343,
      borderRadius: 10,
      backgroundColor: "#960500",
      alignSelf: 'center',
      marginVertical: 10
   },
   containerFace: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: 'row',
      height: 55,
      width: 343,
      borderRadius: 10,
      backgroundColor: "#3b5998",
      alignSelf: 'center',
      marginVertical: 10
   },
   containerGoogle: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: 'row',
      height: 55,
      width: 343,
      borderRadius: 10,
      backgroundColor: "#c70021",
      alignSelf: 'center',
      marginVertical: 10
   },
   txtAdcCartao:{
      fontFamily: "Open Sans ExtraBold",
      fontSize: 13,
      color: "#FFF",
      paddingHorizontal: 10
   },       
});

export default Login



/*<TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={Email}
            placeholder="Email"
         />
         <TextInput
            style={styles.input}
            onChangeText={setSenha}
            value={Senha}
            placeholder="Senha"
            keyboardType="numeric"
         />
         <Button title="Logar" color="green" onPress={() => {Logar()}}/>
         <Text>Ainda não possui cadastro, cadastre-se clicando no botão abaixo!</Text>
         <Button  title="Cadastre-se" color="blue" onPress={() => {navigation.navigate('Subscribe')}}/>*/