import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import axios from "axios";
import { Formik } from 'formik'
import * as yup from 'yup';
import {Picker} from '@react-native-picker/picker';
import api from "../../Services/Api" 
import { TextInputMask } from 'react-native-masked-text';

import SelectPhoto from "../SelectPhoto"
import StepByStep from "../StepByStep"

const CadastroBeneficiario4 = (props) => {
   const [cep, setCep] = useState("")
   const [uf, setUf] = useState("")
   const [localidade, setLocalidade] = useState("")
   const [bairro, setBairro] = useState("")
   const [logradouro, setLogradouro] = useState("")
   const [complemento, setComplemento] = useState("")
   const [errorCep, seErrorCep] = useState(false);

   const [abrir, setAbrir] = useState(0);
   const [photo, setPhoto] = useState([]);
   const [selectedEstado, setSelectedEstado] = useState();
   const [provincias, setProvincias] = useState([]);
   const [selectedCidade, setSelectedCidade] = useState();
   const [cidade, setCidade] = useState([])

   useEffect(() => {
      api.get('/provinces').then((response) => {
         setProvincias(response.data); 
      }).catch(function (error) {
         console.log(error); 
      });
   }, [])

   function procurarCidade(city){
      api.get('/cities?province='+city).then((response) => {
         setCidade(response.data); console.log(response.data)
      }).catch(function (error) {
         console.log(error); 
      }); 
   }

   function callbackFuncao(response){
      setPhoto(response);
   };

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

   

	return (
		<ScrollView style={{flex: 1}}>
			<View style={{flex: 1}}>
				<Text style={styles.titulo}>Cadastro Beneficiário</Text>
				<StepByStep corOne="#e9e9e9" corTwo="#e9e9e9" corThree="#960500" />
				<Text style={{fontFamily: 'Open Sans Regular', marginTop: 25, textAlign: "center" }}>Dados de Endereço</Text>
				<View style={{marginTop: 25}}>
               <Formik
                  //validationSchema={cadastroValidationSchema}
                  initialValues={{ nome: '', Telefone: '', CPF: '', DataDeNascimento: ''}}
                  onSubmit={values => {props.callback("cadastroBeneficiario2")}}
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
                        <TextInputMask
                           type={"custom"}
                           options={{ mask: "99999-999" }}
                           name="cep"
                           placeholder="CEP"
                           style={{flex: 1}}
                           onChangeText={handleChange('cep')}
                           maxLength={9}
                           keyboardType="numeric"
                           value={values.cep}
                        />
                     </View>  
                     {errorCep &&
                        <Text style={styles.erros}>{errorCep}</Text>
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
                     {/*errors.endereco &&
                        <Text style={styles.erros}>{errors.endereco}</Text>
                     */}

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
                     {/*errors.bairro &&
                        <Text style={styles.erros}>{errors.bairro}</Text>
                     */}

                     <View style={styles.picker}>
                        <Picker
                           selectedValue={selectedEstado}
                           onValueChange={(itemValue, itemIndex) => {
                              setSelectedEstado(itemValue); procurarCidade(itemValue)
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
                     {/*errors.cidade &&
                        <Text style={styles.erros}>{errors.cidade}</Text>
                     */}

                     
                        <View style={styles.picker}>
                           <Picker
                              selectedValue={selectedCidade}
                              onValueChange={(itemValue, itemIndex) =>
                                 setSelectedCidade(itemValue) 
                              }>
                              {
                                 cidade.map((item, index) => {
                                    return (
                                       <Picker.Item label={item.name} value={item.id} key={item.id} />
                                    );
                                 })
                              }
                           </Picker>
                        </View> 
                         
                     {/*errors.cidade &&
                        <Text style={styles.erros}>{errors.cidade}</Text>
                     */}

                     <View style={styles.containerIput}>
      						<Icon name="cloud-upload" size={30} color="black" />
         					<TouchableOpacity style={styles.input1} onPress={() => setAbrir(abrir + 1)}>
         						<Text style={styles.placeholder}>Foto do comprovente de residência</Text>
         					</TouchableOpacity>
      					</View>

                     <View style={{alignItems: "center", paddingTop: 10}}>
                        <SelectPhoto 
                           callback={callbackFuncao} 
                           abrir={abrir}
                           height={200} 
                           width={300}
                           borderRadius={5}
                        />
                     </View>

                     <TouchableOpacity style={styles.containerAdcCartao} onPress={() => props.callback("sucess")}>
                        <Text style={styles.txtAdcCartao}>
      							Cadastrar                          
                        </Text>
                     </TouchableOpacity>
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