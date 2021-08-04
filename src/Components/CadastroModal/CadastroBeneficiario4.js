import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import axios from "axios";
import { Formik } from 'formik'
import * as yup from 'yup';
import {Picker} from '@react-native-picker/picker';
import api from "../../Services/Api" 
import { TextInputMask } from 'react-native-masked-text';

import SelectPhoto from "../SelectPhoto"
import StepByStep from "../StepByStep"

import { Helpers } from "../../Services/Helpers"
const helperService = new Helpers();

const CadastroBeneficiario4 = (props) => {
   const [cep, setCep] = useState("")
   const [uf, setUf] = useState("")
   const [localidade, setLocalidade] = useState("")
   const [bairro, setBairro] = useState("")
   const [logradouro, setLogradouro] = useState("")
   const [complemento, setComplemento] = useState("")

   const [abrir, setAbrir] = useState(0);
   const [photo, setPhoto] = useState([]);
   const [selectedEstado, setSelectedEstado] = useState();
   const [provincias, setProvincias] = useState([]);
   const [selectedCidade, setSelectedCidade] = useState();
   const [cidade, setCidade] = useState([]);
   const [show, setShow] = useState(false);
   

   useEffect(() => {
      api.get('/provinces').then((response) => {
         setProvincias(response.data); 
      }).catch(function (error) {
         console.log(error); 
      });
   }, [])

   function procurarCidade(city){
      api.get('/cities?province='+city).then((response) => {
         setCidade(response.data)
      }).catch(function (error) {
         console.log(error); 
      }); 
   }

   const cadastroValidationSchema = yup.object().shape({
      cep: yup
         .string()
         .matches(/^\d{5}-\d{3}$/, 'Coloque um CEP válido!')
         .required('Informe seu CEP'),
      endereco: yup
         .string()
         .required('Informe seu endereço'),
      bairro: yup
         .string()
         .required('Informe seu bairro'),
      estado: yup
         .string()
         .required('Selecione o estado em que você mora'),
      cidade: yup
         .string()
         .required('Selecione a cidade em que você mora'),
      photoReceiptResidence: yup
         .object()
         .required('Você precisa colocar a foto do seu comprovante de residência'),
   })
   

	return (
		<ScrollView style={{flex: 1}}>
			<View style={{flex: 1}}>
				<Text style={styles.titulo}>Cadastro Beneficiário</Text>
				<StepByStep corOne="#e9e9e9" corTwo="#e9e9e9" corThree="#960500" corFour="#e9e9e9"/>
				<Text style={{fontFamily: 'Open Sans Regular', marginTop: 25, textAlign: "center" }}>Dados de Endereço</Text>
				<View style={{marginTop: 25}}>
               <Formik
                  validationSchema={cadastroValidationSchema}
                  initialValues={{cep: '', endereco: '', bairro: '', estado: '', cidade: '', photoReceiptResidence: ''}}
                  onSubmit={values => props.callback("cadastroBeneficiario5", values)}
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
                        <TextInputMask
                           type={"custom"}
                           options={{ mask: "99999-999" }}
                           name="cep"
                           placeholder="CEP"
                           style={{flex: 1}}
                           onChangeText={handleChange('cep')}
                           onBlur={handleBlur('cep')}
                           maxLength={9}
                           keyboardType="numeric"
                           value={values.cep}
                        />
                     </View>  
                     {errors.cep &&
                        <Text style={styles.erros}>{errors.cep}</Text>
                     }

                     <View style={styles.input}>
                        <TextInput
                           autoCapitalize="none"
                           name="endereco"
                           placeholder="Endereço"
                           style={{flex: 1}}
                           onChangeText={handleChange('endereco')}
                           onBlur={handleBlur('endereco')}
                           value={values.endereco} 
                        />
                     </View>    
                     {errors.endereco &&
                        <Text style={styles.erros}>{errors.endereco}</Text>
                     }

                     <View style={styles.input}>
                        <TextInput
                           autoCapitalize="none"
                           name="bairro"
                           placeholder="Bairro"
                           style={{flex: 1}}
                           onChangeText={handleChange('bairro')}
                           onBlur={handleBlur('bairro')}
                           value={values.bairro}
                        />
                     </View>    
                     {errors.bairro &&
                        <Text style={styles.erros}>{errors.bairro}</Text>
                     }

                     <View style={styles.picker}>
                        <Picker
                           selectedValue={selectedEstado}
                           onValueChange={(itemValue, itemIndex) => {
                              setSelectedEstado(itemValue); procurarCidade(itemValue); setFieldValue('estado', itemValue)
                           }}>
                           {
                              provincias.map((item, index) => {
                                 return (
                                    <Picker.Item label={item.name} value={item.id} key={item.id} />
                                 );
                              })
                           }
                        </Picker>
                     </View>    
                     {errors.estado &&
                        <Text style={styles.erros}>{errors.estado}</Text>
                     }

                     
                        <View style={styles.picker}>
                           <Picker
                              selectedValue={selectedCidade}
                              onValueChange={(itemValue, itemIndex) =>
                                 {setSelectedCidade(itemValue); setFieldValue('cidade', itemValue)
                              }}>
                              {
                                 cidade.map((item, index) => {
                                    return (
                                       <Picker.Item label={item.name} value={item.id} key={item.id} />
                                    );
                                 })
                              }
                           </Picker>
                        </View> 
                         
                     {errors.cidade &&
                        <Text style={styles.erros}>{errors.cidade}</Text>
                     }

                     <View style={styles.containerIput}>
      						<Icon name="cloud-upload" size={30} color="black" />
         					<TouchableOpacity style={styles.input1} onPress={() => setAbrir(abrir + 1)}>
         						<Text style={styles.placeholder}>Foto do comprovente de residência</Text>
         					</TouchableOpacity>
      					</View>

                     <View style={{alignItems: "center", paddingTop: 10}}>
                        <SelectPhoto 
                           callback={(response) => {setPhoto(response); setFieldValue('photoReceiptResidence', response)}} 
                           abrir={abrir}
                           height={200} 
                           width={300}
                           borderRadius={5}
                        />
                     </View>
                     {errors.photoReceiptResidence &&
                        <Text style={styles.erros}>{errors.photoReceiptResidence}</Text>
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