import React from 'react'
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import Icon from 'react-native-vector-icons/Ionicons';

const RecuperarSenha = (props) => {

	const loginValidationSchema = yup.object().shape({
      email: yup
      .string()
      .email("Por favor coloque um email válido!")
      .required('O endereço de Email é requerido!')
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
         	<Text style={styles.txtTitulo}>Recuperação de conta</Text>
         	<Text style={styles.txtSemiTitulo}>Insira abaixo seu email para recuperar sua conta</Text>
         	<View>
         		<Formik
                  validationSchema={loginValidationSchema}
                  initialValues={{ email: '', password: ''}}
                  onSubmit={values => Logar(values)}
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

                     <TouchableOpacity style={styles.containerAdcCartao} onPress={handleSubmit} disabled={!isValid}>
                        <Text style={styles.txtAdcCartao}>
                           Entrar
                        </Text>
                     </TouchableOpacity>
                 		</>
                  )}
               </Formik> 
         	</View>
         </View>
         <View style={styles.lastBloco}>
         	<Text style={styles.textSenha}>Lembrou da sua Senha ?</Text>
         	<TouchableOpacity style={styles.voltarHome} onPress={() => props.callback("login")}>
         		<Text style={styles.home}>Voltar para o Login</Text>
         	</TouchableOpacity>
         </View>
		</View>
	)
}

const styles = StyleSheet.create({
	containerSupe: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: "center",
      alignItems: "center",
   },
   avatar: {
      height: 271,
      width: 220
   },
   containerInfe: {
      flex: 1,
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      //marginTop: -20
   },
   txtTitulo: {
   	fontFamily: "Open Sans SemiBold",
   	fontSize: 18,
   	textAlign: "center"
   },
   txtSemiTitulo: {
   	fontFamily: "Open Sans Regular",
   	fontSize: 12,
   	textAlign: "center",
   },
   input: {
      height: 60,
      marginTop: 25,
      flexDirection: "row",
      paddingLeft: 10,
      alignItems: "center",
      marginHorizontal: 12,
      borderWidth: 0.1,
      borderRadius: 6,
      borderColor: '#707070',
      marginVertical: 5
   },
   containerAdcCartao: {
      justifyContent: "center",
      marginTop: 25,
      alignItems: "center",
      height: 55,
      width: 173,
      borderRadius: 80,
      backgroundColor: "#960500",
      alignSelf: 'center',
      marginVertical: 10
   },
   txtAdcCartao:{
      fontFamily: "Open Sans SemiBold",
      fontSize: 18,
      color: "#FFF",
      paddingHorizontal: 10
   }, 
   lastBloco: {
   	flex: 1, 
   	justifyContent: 'flex-end', 
   	alignItems: 'center', 
   	paddingBottom: 25
   },
   textSenha: {
   	fontFamily: "Open Sans Regular",
   	fontSize: 12,
   	paddingVertical: 8
   },
   voltarHome: {
   	borderColor: "#960500",
   	borderWidth: 2,
   	borderRadius: 25,
   	height: 45,
      width: 173,
      justifyContent: 'center',
      alignItems: "center",
   },
   home: {
   	fontFamily: "Open Sans Regular",
   	color: "#960500"
   }
})

export default RecuperarSenha