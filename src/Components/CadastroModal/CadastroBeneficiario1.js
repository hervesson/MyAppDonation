import React, { useState, useCallback } from 'react'
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, Button, Alert, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik'
import * as yup from 'yup';
import { TextInputMask } from 'react-native-masked-text'
import StepByStep from "../StepByStep"
import SelectPhoto from "../SelectPhoto"
import DateTimePicker from '@react-native-community/datetimepicker';

const CadastroBeneficiario1 = (props) => {
   const [abrir, setAbrir] = useState(0);
   const [photo, setPhoto] = useState([]);
   const [date, setDate] = useState(new Date());
   const [mode, setMode] = useState('date');
   const [show, setShow] = useState(false);
   const [selectedDay, setSelectedDay] = useState(false)

   const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
      setSelectedDay(true)
   };

   let dataFormatada = ((date.getDate() )) + "/" + ((date.getMonth() + 1)) + "/" + date.getFullYear()

   const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
   };

   const showDatepicker = () => {
      showMode('date');
   };

   var phoneRegEx = /(\(?\d{2}\)?\s)?(\d{5}\-\d{4})/g
   var cpfRegEx = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2})$/
	const cadastroValidationSchema = yup.object().shape({
      photoUser: yup.object().required('Você precisa colocar a foto'), 
      fullName: yup
         .string()
         .matches(/(\w.+\s).+/, 'Coloque seu nome completo')
         .required('Informe seu nome completo'),
      phoneNumber: yup
         .string()
         .matches(phoneRegEx, 'Coloque um número de telefone válido')
         .required('Informe o numero do seu telefone'),
      CPF: yup
         .string()
         .matches(cpfRegEx, 'Coloque um CPF válido')
         .required('Informe o numero do seu CPF'),
      birthDay: yup
         .string()
         .required('Informe a data do seu aniversário'),
   })

   

	return (
		<ScrollView style={{flex: 1}}>
			<Text style={styles.titulo}>Cadastro Beneficiário</Text>
			<StepByStep corOne="#960500" corTwo="#e9e9e9" corThree="#e9e9e9" corFour="#e9e9e9" />
			<View>
            <Formik
               validationSchema={cadastroValidationSchema}
               initialValues={{photoUser: '', fullName: '', phoneNumber: '', CPF: '', birthDay: ''}}
               onSubmit={values =>  props.callback("cadastroBeneficiario2", values)}
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
               touched
                  }) => (
                    <>
                     <View style={{alignItems: "center" }}>
                        <Text style={{fontFamily: 'Open Sans Regular', marginTop: 25}}>Dados Pessoais</Text>
                        <TouchableOpacity style={styles.fotoDePerfil} onPress={() => setAbrir(abrir + 1)}>
                           <SelectPhoto 
                              callback={(response) => {setPhoto(response); setFieldValue('photoUser', response )}} 
                              abrir={abrir} 
                              height={130} 
                              width={130}
                              borderRadius={65}
                              render={true}
                           /> 
                           {
                              photo.length == 0 ? <Icon name="camera" size={35} color="black" /> : null
                           }
                        </TouchableOpacity>
                        {errors.photoUser  &&
                           <Text style={{fontSize: 10, color: 'red', fontFamily: 'Open Sans Regular', textAlign: "center"}}>
                              {errors.photoUser}
                           </Text>
                        }
                        <Text style={styles.txtFoto}>Foto de Perfil</Text>
                     </View>

                     <View style={styles.input}>
                        <TextInput
                           autoCapitalize="none"
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
                        <TextInputMask
                           type={'cpf'}
                           name="CPF"
                           placeholder="CPF"
                           style={{flex: 1}}
                           onChangeText={handleChange('CPF')}
                           onBlur={handleBlur('CPF')}
                           value={values.CPF}
                           //ref={(ref) => this.cpfField = ref}
                        />
                     </View>    
                     {errors.CPF &&
                        <Text style={styles.erros}>{errors.CPF}</Text>
                     }

                     <TouchableOpacity style={styles.input} onPress={() => showDatepicker()}>
                        <Icon name="calendar" size={30} color="black" />
                        {show && (
                          <DateTimePicker
                              testID="dateTimePicker"
                              value={date}
                              mode={mode}
                              maximumDate={new Date()}
                              is24Hour={true}
                              display="default"
                              onChange={(event, data)=> {onChange(event, data); setFieldValue('birthDay', data); setFieldTouched('birthDay', false)}}
                           />
                        )}
                        {
                           selectedDay ? 
                           <Text style={{color:"black", marginLeft: 10}}>{dataFormatada.toString()}</Text>
                           : 
                           <Text style={{color:"#A0A0A0", marginLeft: 10}}>Toque para selecionar a data</Text> 
                        }
                        
                     </TouchableOpacity>    
                     {(errors.birthDay && touched.birthDay) &&
                        <Text style={styles.erros}>{errors.birthDay}</Text>
                     }

                     <TouchableOpacity style={styles.containerAdcCartao} onPress={handleSubmit} disabled={!isValid}>
                        <Text style={styles.txtAdcCartao}>
                           Próximo
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
   image: {
    marginVertical: 24,
    alignItems: 'center',
  },
	titulo: {
		fontFamily: "Open Sans SemiBold",
		fontSize: 14,
		textAlign: "center",
		paddingTop: 25
	},
	fotoDePerfil: {
		marginTop: 25,
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
   },
   image: {
      marginVertical: 24,
      alignItems: 'center',
   },
   datePickerStyle: {
      width: 200,
      marginTop: 20,
  },
})


export default CadastroBeneficiario1

{/*
   <TextInputMask
                           type={'datetime'}
                           options={{format: 'DD/MM/YYYY'}}
                           name="birthDay"
                           placeholder="Data de nascimento"
                           onChangeText={handleChange('birthDay')}
                           onBlur={handleBlur('birthDay')}
                           value={values.birthDay}
                        />
*/}