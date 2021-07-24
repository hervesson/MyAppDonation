import React, {useState, useEffect} from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik'
import * as yup from 'yup'
import SelectPhoto from "../SelectPhoto"
import { TextInputMask } from 'react-native-masked-text'
import { Helpers } from "../../Services/Helpers"

const helperService = new Helpers();

const CadastroDoador = (props) => {
   const [abrir, setAbrir] = useState(0);
   const [photo, setPhoto] = useState([]);

   var phoneRegEx = /(\(?\d{2}\)?\s)?(\d{5}\-\d{4})/g
   const cadastroValidationSchema = yup.object().shape({
      photo: yup.object().required('Você precisa colocar a foto'),
      fullName: yup
         .string()
         .matches(/(\w.+\s).+/, 'Coloque seu nome completo')
         .required('Informe seu nome completo'),
      phoneNumber: yup
         .string()
         .matches(phoneRegEx, 'Coloque um número de telefone válido')
         .required('Informe o numero do seu telefone'),
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
			<Text style={styles.titulo}>Cadastro Doador</Text>
			<View style={{marginTop: 25}}>
            <Formik
               validationSchema={cadastroValidationSchema}
               initialValues={{fullName: '', phoneNumber: '', password: '', confirmPassword: ''}}
               onSubmit={values => helperService.createDonator(photo, values)}
            >
            {({
               handleChange,
               handleBlur,
               handleSubmit,
               setFieldValue,
               setFieldTouched,
               values,
               errors,
               isValid,
                  }) => (
                    <>
                     <View style={{alignItems: "center" }}>
                        <TouchableOpacity style={styles.fotoDePerfil} onPress={() => setAbrir(abrir + 1)}>
                           <SelectPhoto 
                              callback={(response) => {setPhoto(response); setFieldValue('photo', response )}} 
                              abrir={abrir} 
                              height={130} 
                              width={130}
                              borderRadius={65}
                           /> 
                           {
                              photo.length == 0 ? <Icon name="camera" size={35} color="black" /> : null
                           }
                        </TouchableOpacity>
                        {errors.photo  &&
                           <Text style={{fontSize: 10, color: 'red', fontFamily: 'Open Sans Regular', textAlign: "center"}}>
                              {errors.photo}
                           </Text>
                        }
                        <Text style={styles.txtFoto}>Foto de Perfil</Text>
                     </View>
                     <View style={styles.input}>
                        <TextInput
                           name="fullName"
                           placeholder="Nome completo"
                           style={{flex: 1}}
                           onChangeText={handleChange('fullName')}
                           onBlur={handleBlur('fullName')}
                           value={values.fullName}
                        />
                     </View>   
                     {errors.fullName &&
                        <Text style={styles.erros}>{errors.fullName}</Text>
                     }

                     <View style={styles.input}>
                        <TextInputMask
                           type={'cel-phone'}
                           options={{
                              maskType: 'BRL',
                              withDDD: true,
                              dddMask: '(99) '
                           }}
                           autoCapitalize="none"
                           name="phoneNumber"
                           placeholder="Telefone"
                           style={{flex: 1}}
                           onChangeText={handleChange('phoneNumber')}
                           onBlur={handleBlur('phoneNumber')}
                           value={values.phoneNumber}
                        />

                     </View>    
                     {errors.phoneNumber &&
                        <Text style={styles.erros}>{errors.phoneNumber}</Text>
                     }

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

                     <TouchableOpacity style={styles.containerAdcCartao} onPress={handleSubmit} disabled={!isValid}>
                        <Text style={styles.txtAdcCartao}>
                           Cadastrar
                        </Text>
                     </TouchableOpacity>

                    </>
                  )}
               </Formik>
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
	fotoDePerfil: {
		//marginTop: 5,
      alignItems: 'center',
      backgroundColor: '#e9e9e9',
      height: 130, 
      width: 130, 
      borderRadius: 65, 
      justifyContent: "center"
	},
	txtFoto: {
		fontFamily: 'Open Sans SemiBold',
		color: "#960500",
		paddingTop: 10,
      marginBottom: 25
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
   erros: { 
      fontSize: 10, 
      color: 'red', 
      fontFamily: 'Open Sans Regular', 
      paddingLeft:15 
   }
})


export default CadastroDoador