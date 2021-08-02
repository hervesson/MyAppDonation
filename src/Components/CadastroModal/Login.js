import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, SafeAreaView, Button, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import Icon from 'react-native-vector-icons/Ionicons';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Formik } from 'formik'
import * as yup from 'yup'
import axios from "axios";
import { TextInputMask } from 'react-native-masked-text'
import { Helpers } from "../../Services/Helpers"

const helperService = new Helpers();


import Google from "../../Assets/Images/google.svg"
import Facebook from "../../Assets/Images/facebook.svg"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Login = (props) => {
   const [show, setShow] = useState(false)

   useEffect(() => {
      GoogleSignin.configure({
         webClientId: '197195621436-rg04skhfl030bupak2fa4q9eljptll49.apps.googleusercontent.com',
      });
   }, [])


   function Logar(argument) {
      auth().signInWithEmailAndPassword(argument.email, argument.password)
      .then(() => {
         console.warn('User account created & signed in!');
      })
      .catch(error => {
         if (error.code === 'auth/email-already-in-use') {
            alert('Este endereço de email já está em uso');
         }

         if (error.code === 'auth/invalid-email') {
            alert('Este email/senha é inválido');
         }
         console.warn(error);
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

   const criarCustomer = (props) => {
      if(props.additionalUserInfo.isNewUser){
         axios.post('https://us-central1-myappdonate.cloudfunctions.net/createCustomer', {
            email: props.user._user.email,
            nome: props.user._user.displayName,
            uid: props.user._user.uid
         })
         .then((response) => {
            console.log(response)
         })
         .catch(function (error) {
            console.log(error);
         }); 
      }else{
         console.log("user antigo")
      }
   }

   var phoneRegEx = /(\(?\d{2}\)?\s)?(\d{5}\-\d{4})/g
   const loginValidationSchema = yup.object().shape({
      phoneNumber: yup
         .string()
         .matches(phoneRegEx, 'Coloque um número de telefone válido')
         .required('Informe o numero do seu telefone'),
      password: yup
         .string()
         .min(6, ({ min }) => `A senha deve conter no minimo ${min} caracteres`)
         .required('A senha é requerida!'),
   })

	return (
		<View style={{flex: 1}}>
         <View style={styles.containerSupe}>
            <Image style={styles.avatar}
               source={require('../../Assets/Images/01.png')}
               resizeMode="contain"
            />
         </View>
         <View style={styles.containerInfe}>
            {/*<Text style={{alignSelf: "center", fontFamily: "Open Sans Bold", fontSize: 12, paddingTop: 10, color:"#666" }}>
               Entrar com Email e senha:
            </Text>*/}
            <View>
               <Formik
                  validationSchema={loginValidationSchema}
                  initialValues={{ phoneNumber: '', password: ''}}
                  onSubmit={values => {
                     setShow(true);
                     props.lock(true);
                     helperService.login(values)
                     .then((r) => {
                        if(r == true){
                           props.lock(false);
                           setShow(false);
                           props.cena();
                        }else{
                           props.lock(false);
                           setShow(false)
                        }
                     })}
                  }
               >
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors, 
                    isValid,
                  }) => (
                    <>
                     <View style={styles.input}>
                        <Icon name="call-outline" size={20} color="black" />
                        <TextInputMask
                           type={'cel-phone'}
                           options={{
                              maskType: 'BRL',
                              withDDD: true,
                              dddMask: '(99) '
                           }}
                           name="phoneNumber"
                           placeholder="Telefone"
                           style={{flex: 1}}
                           onChangeText={handleChange('phoneNumber')}
                           onBlur={handleBlur('phoneNumber')}
                           value={values.phoneNumber}
                        />
                     </View>   
                     {errors.phoneNumber &&
                        <Text style={{ fontSize: 10, color: 'red', fontFamily: 'Open Sans Regular', paddingLeft:10 }}>{errors.phoneNumber}</Text>
                     }
                     <View style={styles.input}>
                        <Icon name="lock-closed-outline" size={20} color="black" />
                        <TextInput
                           autoCapitalize="none"
                           name="password"
                           placeholder="Senha"
                           style={{flex: 1}}
                           onChangeText={handleChange('password')}
                           onBlur={handleBlur('password')}
                           value={values.password}
                           secureTextEntry
                        />
                     </View>    
                     {errors.password &&
                        <Text style={{ fontSize: 10, color: 'red', fontFamily: 'Open Sans Regular', paddingLeft:10 }}>{errors.password}</Text>
                     }
                     
                     <TouchableOpacity onPress={() => null}>
                     <Text style={styles.forgot}>Esqueceu sua senha?</Text>
                     </TouchableOpacity>

                     {
                        show ?
                           <View style={{marginTop: 15}}>
                              <ActivityIndicator size="large" color="#960500"/> 
                           </View> 
                        :
                           <TouchableOpacity style={styles.containerAdcCartao} onPress={handleSubmit} disabled={!isValid}>
                              <Text style={styles.txtAdcCartao}>
                                 Entrar
                              </Text>
                           </TouchableOpacity>
                     }

                    </>
                  )}
               </Formik>
            </View>
            {/*
               <Text style={{alignSelf: "center", fontFamily: "Open Sans Bold", fontSize: 12, paddingTop: 10, color:"#666" }}>
               Ou entre com:
               </Text>

               <View style={{flexDirection: 'row', justifyContent: "center" }}>
                  <View style={styles.containerSociais}>
                     <Facebook width={40} height={40} fill="#000" />
                  </View>
                  <View style={styles.containerSociais}>
                     <Google width={40} height={40} fill="red" />
                  </View>
            </View>

            {/*<TouchableOpacity style={styles.containerFace} onPress={() => {onFacebookButtonPress().then(e => {criarCustomer(e)}) }}>
               <Icon name="logo-facebook" size={30} color="white" />
               <Text style={styles.txtAdcCartao}>
                  Login com Facebook
               </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.containerGoogle} onPress={() => {onGoogleButtonPress().then(e => {criarCustomer(e)}) }}>
               <Icon name="logo-google" size={30} color="white" />
               <Text style={styles.txtAdcCartao}>
                  Login com  Google
               </Text>
            </TouchableOpacity>*/}  

            {/*<TouchableOpacity onPress={() => props.callback("subscribe")}>
               <Text style={styles.forgot}>Ainda não tem cadastro? Faça Aqui!</Text>
            </TouchableOpacity> /*}

         {/*<Button title="Logar" color="green" onPress={() => {Logar()}}/>
            <Text>
               Ainda não possui cadastro, cadastre-se clicando no botão abaixo!
            </Text>
         <Button  title="Cadastre-se" color="blue" onPress={() => {navigation.navigate('Subscribe')}}/>*/}
         </View>
      </View>
	)
}

const styles = StyleSheet.create({
   input: {
      height: 60,
      flexDirection: "row",
      paddingLeft: 10,
      alignItems: "center",
      marginHorizontal: 12,
      borderWidth: 0.1,
      borderRadius: 6,
      borderColor: '#707070',
      marginVertical: 5
   },
   forgot: {
      fontFamily: 'Open Sans Regular',
      fontSize: 13,
      alignSelf: 'center',
      paddingTop: 7 ,
      textDecorationLine: 'underline'
   },
   label: {
      marginHorizontal: 12,
      fontSize: 12,
      fontFamily: 'Open Sans Regular'
   },
   containerSupe: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: "center",
      alignItems: "center",
   },
   containerInfe: {
      flex: 2,
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      //marginTop: -20
   },
   avatar: {
      height: 271,
      width: 220
   },
   containerAdcCartao: {
      justifyContent: "center",
      alignItems: "center",
      height: 55,
      width: 343,
      borderRadius: 80,
      backgroundColor: "#960500",
      alignSelf: 'center',
      marginVertical: 10
   },
   containerSociais: {
      borderWidth: 2,
      borderColor: "#e9e9e9",
      margin: 10,
      borderRadius: 9,
      padding: 3
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
      fontFamily: "Open Sans SemiBold",
      fontSize: 18,
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