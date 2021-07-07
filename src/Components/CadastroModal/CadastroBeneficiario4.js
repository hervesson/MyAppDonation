import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik'
import * as yup from 'yup'

import StepByStep from "../StepByStep"

const CadastroBeneficiario4 = (props) => {
	return (
		<View style={{flex: 1}}>
			<View style={{flex: 1}}>
				<Text style={styles.titulo}>Cadastro Beneficiário</Text>
				<StepByStep corOne="#e9e9e9" corTwo="#e9e9e9" corThree="#960500" />
				<Text style={{fontFamily: 'Open Sans Regular', marginTop: 25, textAlign: "center" }}>Dados de Endereço</Text>
				<View style={{marginTop: 25}}>
            <Formik
               //validationSchema={cadastroValidationSchema}
               initialValues={{ cep: '', endereco: '', bairro: '', cidade: ''}}
               onSubmit={values => props.callback("sucess")}
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
                        <TextInput
                           autoCapitalize="none"
                           name="cep"
                           placeholder="CEP"
                           style={{flex: 1}}
                           onChangeText={handleChange('cep')}
                           onBlur={handleBlur('cep')}
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
                           name="Bairro"
                           placeholder="bairro"
                           style={{flex: 1}}
                           onChangeText={handleChange('bairro')}
                           onBlur={handleBlur('bairro')}
                           value={values.bairro}
                        />
                     </View>    
                     {errors.bairro &&
                        <Text style={styles.erros}>{errors.bairro}</Text>
                     }

                     <View style={styles.input}>
                        <TextInput
                           autoCapitalize="none"
                           name="cidade"
                           placeholder="Cidade"
                           style={{flex: 1}}
                           onChangeText={handleChange('cidade')}
                           onBlur={handleBlur('cidade')}
                           value={values.cidade}
                        />
                     </View>    
                     {errors.cidade &&
                        <Text style={styles.erros}>{errors.cidade}</Text>
                     }

                     <View style={styles.containerIput}>
								<Icon name="cloud-upload" size={30} color="black" />
								<TouchableOpacity style={styles.input1}>
									<Text style={styles.placeholder}>Foto da RG ou CNH</Text>
								</TouchableOpacity>
							</View>

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
		</View>
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
      marginVertical: 5
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