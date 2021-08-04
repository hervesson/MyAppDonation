import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import { Formik } from 'formik'
import * as yup from 'yup';


import StepByStep from "../StepByStep"

import { Helpers } from "../../Services/Helpers"
const helperService = new Helpers();

const CadastroBeneficiario4 = (props) => {
   const [show, setShow] = useState(false);
   

   const cadastroValidationSchema = yup.object().shape({
      password: yup
         .string()
         .min(6, ({ min }) => `A senha precisa ter ${min} caracteres`)
         .required('Por favor coloque a senha!'),
      confirmPassword: yup
         .string()
         .oneOf([yup.ref('password')], 'As senhas não conferem')
         .required('Confirme sua senha'),
   })
   

	return (
		<ScrollView style={{flex: 1}}>
			<View style={{flex: 1}}>
				<Text style={styles.titulo}>Cadastro Beneficiário</Text>
				<StepByStep corOne="#e9e9e9" corTwo="#e9e9e9" corThree="#e9e9e9" corFour="#960500" />
				<Text style={{fontFamily: 'Open Sans Regular', marginTop: 25, textAlign: "center" }}>Senha:</Text>
				<View style={{marginTop: 25}}>
               <Formik
                  validationSchema={cadastroValidationSchema}
                  initialValues={{ password: '', confirmPassword: ''}}
                  onSubmit={
                     values => {
                        let z = Object.assign(props.dados, values);
                        setShow(true);
                        props.lock(true);
                        helperService.createBeneficiary(z)
                        .then((resp) => {
                           if(resp == true){
                              props.lock(false);
                              props.callback("sucess");
                              setShow(false);
                           }else{
                              props.lock(false);
                              setShow(false);
                           }
                        })
                     }
                  }
               >
               {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  values,
                  errors,
                  isValid
                     }) => (
                     <>
                     
                     <View style={styles.input}>
                        <TextInput
                           autoCapitalize="none"
                           name="password"
                           placeholder="Senha"
                           style={{flex: 1}}
                           onChangeText={handleChange('password')}
                           onBlur={handleBlur('password')}
                           value={values.password} 
                           secureTextEntry={true}
                        />
                     </View>    
                     {errors.password &&
                        <Text style={styles.erros}>{errors.password}</Text>
                     }

                     <View style={styles.input}>
                        <TextInput
                           autoCapitalize="none"
                           name="confirmPassword"
                           placeholder="Confirme a senha"
                           style={{flex: 1}}
                           onChangeText={handleChange('confirmPassword')}
                           onBlur={handleBlur('confirmPassword')}
                           value={values.confirmPassword} 
                           secureTextEntry={true}
                        />
                     </View>    
                     {errors.confirmPassword &&
                        <Text style={styles.erros}>{errors.confirmPassword}</Text>
                     }

                     {
                        show ? 
                        <View style={{marginVertical: 35}}>
                           <ActivityIndicator size="large" color="#960500"/> 
                        </View>
                        : <TouchableOpacity style={styles.containerAdcCartao} onPress={handleSubmit} disabled={!isValid}>
                           <Text style={styles.txtAdcCartao}>
                              Cadastrar
                           </Text>
                        </TouchableOpacity> 
                     }
                     </>
                  )}
               </Formik>
            </View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	titulo: {
		fontFamily: "Open Sans SemiBold",
		fontSize: 14,
		textAlign: "center",
		paddingTop: 25
	},
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
   picker: {
      height: 60,
      paddingLeft: 10,
      justifyContent: "center",
      marginHorizontal: 12,
      borderWidth: 0.1,
      borderRadius: 6,
      borderColor: '#707070',
      marginVertical: 5
   },
   input1: {
   	flex:1,
      height: 60,
      flexDirection: "row",
      paddingLeft: 10,
      alignItems: "center",
      marginHorizontal: 12,
      borderWidth: 0.1,
      borderRadius: 6,
      borderColor: '#707070',
      marginVertical: 5,
   },
   erros: { 
      fontSize: 10, 
      color: 'red', 
      fontFamily: 
      'Open Sans Regular', 
      paddingLeft:10 
   },
   containerIput:{
   	flexDirection: "row",
   	alignItems: "center",
   	marginLeft:10
   },
   placeholder: {
   	color: "#999",
   	fontFamily: 'Open Sans Regular',
   	fontSize: 14
   },
   containerAdcCartao: {
      justifyContent: "center",
      alignItems: "center",
      height: 55,
      width: 343,
      borderRadius: 80,
      backgroundColor: "#960500",
      alignSelf: 'center',
      marginVertical: 10,
      marginVertical: 25,

   },
   txtAdcCartao:{
      fontFamily: "Open Sans SemiBold",
      fontSize: 18,
      color: "#FFF",
      paddingHorizontal: 10
   },
})	

export default CadastroBeneficiario4

{/*
    const BucarCep = (text) => {
      setCep(text);
      if(text.length == 9){
         axios.get("https://viacep.com.br/ws/"+text+"/json/").then(response => {
            if(response.data.cep == text){
               setCep(response.data.cep), 
               setUf(response.data.uf)
               setLocalidade(response.data.localidade)
               setBairro(response.data.bairro)
               setLogradouro(response.data.logradouro)
               setComplemento(response.data.complemento)
               seErrorCep(false)
            }else{
               seErrorCep("Cep não encontrado")
            }  
         });
      }
   }
*/}