import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, SafeAreaView, Button, Image, Dimensions, TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik'
import * as yup from 'yup'
import axios from "axios";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Subscribe = ({navigation}) => {

   function Subscribe(values){
      auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((props) => {
         var user = auth().currentUser;
         user.updateProfile({
            displayName: values.usuario
         });
         criarCustomer(props, values.usuario)
      })
      .catch(error => {
         if (error.code === 'auth/email-already-in-use') {
            alert('Este endereço de email já está em uso');
         }

         if (error.code === 'auth/invalid-email') {
            alert('Este email/senha é inválido');
         }

         console.error(error);
      });
   }

   const criarCustomer = (props, usuario) => {
      axios.post('https://us-central1-myappdonate.cloudfunctions.net/createCustomer', {
         email: props.user._user.email,
         nome: usuario,
         uid: props.user._user.uid
      })
      .then((response) => {
         console.log(response)
      })
      .catch(function (error) {
         console.log(error);
      }); 
   }


   const loginValidationSchema = yup.object().shape({
      email: yup
         .string()
         .email("Por favor coloque um email válido!")
         .required('O endereço de Email é requerido!'),
      password: yup
         .string()
         .min(6, ({ min }) => `A senha deve conter no minimo ${min} caracteres`)
         .required('A senha é requerida!'),
   })

   return (
      <SafeAreaView style={{flex: 1}}>
         <View style={styles.containerSupe}>
            <Image style={styles.avatar}
               source={require('../../Assets/Images/01.png')}
               resizeMode="contain"
            />
         </View>
         <View style={styles.containerInfe}>
            {/*<Text style={{alignSelf: "center", fontFamily: "Open Sans Bold", fontSize: 12, paddingTop: 10, color:"#666" }}>
               Cadastro com Email e senha:
            </Text>*/}
            <View>
               <Formik
                  validationSchema={loginValidationSchema}
                  initialValues={{ email: '', password: '', usuario: ''}}
                  onSubmit={values => Subscribe(values)}
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
                        <Icon name="mail-outline" size={20} color="black" />
                        <TextInput
                           autoCapitalize="none"
                           name="email"
                           placeholder="Endereço de Email"
                           style={{flex: 1}}
                           onChangeText={handleChange('email')}
                           onBlur={handleBlur('email')}
                           value={values.email}
                           keyboardType="email-address"
                        />
                     </View>   
                     {errors.email &&
                        <Text style={{ fontSize: 10, color: 'red', fontFamily: 'Open Sans Regular', paddingLeft:10 }}>{errors.email}</Text>
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
                  
                     <TouchableOpacity style={styles.containerAdcCartao} onPress={handleSubmit} disabled={!isValid}>
                        <Text style={styles.txtAdcCartao}>
                           Cadastrar
                        </Text>
                     </TouchableOpacity>
                    </>
                  )}
                </Formik>
            </View>

           

         </View>
      </SafeAreaView>
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
      backgroundColor: 'white',
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

export default Subscribe



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

         {/*<Text style={styles.label}>
                  Email:
               </Text>}
               <View style={styles.input}>
                  <Icon name="mail-outline" size={20} color="black" />
                  <TextInput
                     style={{flex: 1}}
                     onChangeText={setEmail}
                     value={Email}
                     placeholder="Email"
                  />
               </View>*/
               /*<Text style={styles.label}>
                  Senha:
               </Text>}
               <View style={styles.input}>
                  <Icon name="lock-closed-outline" size={20} color="black" />
                  <TextInput
                     style={{flex: 1}}
                     onChangeText={setSenha}
                     value={Senha}
                     placeholder="Senha"
                     //keyboardType="numeric"
                  />
               </View>*/}



{/*import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, SafeAreaView, Button } from 'react-native'
import auth from '@react-native-firebase/auth';

const Subscribe = () => {
	const [Email, setEmail] = React.useState("");
   	const [Senha, setSenha] = React.useState("");

	function Subscribe(argument) {
		auth()
        .createUserWithEmailAndPassword(Email, Senha)
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

	return (
		<SafeAreaView>
         <TextInput
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
         <Button title="Logar" color="green" onPress={() => {Subscribe()}}/>
      </SafeAreaView>
	)
}

const styles = StyleSheet.create({
   input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
   },
});

export default Subscribe*/}