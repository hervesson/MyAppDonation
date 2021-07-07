import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik'
import * as yup from 'yup'

import StepByStep from "../StepByStep"

const CadastroBeneficiario1 = (props) => {


	const cadastroValidationSchema = yup.object().shape({
      nome: yup
         .string()
         .required('O endereço de nome é requerido!'),
      Telefone: yup
         .string()
         .min(6, ({ min }) => `A senha deve conter no minimo ${min} caracteres`)
         .required('O telefone é requerido!'),
      CPF: yup
         .string()
         .min(6, ({ min }) => `A senha deve conter no minimo ${min} caracteres`)
         .required('O CPF é requerido!'),
      DataDeNascimento: yup
         .string()
         .min(6, ({ min }) => `A senha deve conter no minimo ${min} caracteres`)
         .required('Infome sua data de nascimento'),   
   })

	return (
		<ScrollView style={{flex: 1}}>
			<Text style={styles.titulo}>Cadastro Beneficiário</Text>
			<StepByStep corOne="#960500" corTwo="#e9e9e9" corThree="#e9e9e9" />
			<View style={{alignItems: "center" }}>
				<Text style={{fontFamily: 'Open Sans Regular', marginTop: 25}}>Dados Pessoais</Text>
				<View style={styles.fotoDePerfil}>
					<Icon name="camera" size={35} color="black" />
				</View>
				<Text style={styles.txtFoto}>Foto de Perfil</Text>
			</View>
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
                        <TextInput
                           autoCapitalize="none"
                           name="nome"
                           placeholder="Nome completo"
                           style={{flex: 1}}
                           onChangeText={handleChange('nome')}
                           onBlur={handleBlur('nome')}
                           value={values.nome}
                        />
                     </View>   
                     {errors.nome &&
                        <Text style={styles.erros}>{errors.nome}</Text>
                     }
                     <View style={styles.input}>
                        <TextInput
                           autoCapitalize="none"
                           name="Telefone"
                           placeholder="Telefone"
                           style={{flex: 1}}
                           onChangeText={handleChange('Telefone')}
                           onBlur={handleBlur('Telefone')}
                           value={values.Telefone} 
                        />
                     </View>    
                     {errors.Telefone &&
                        <Text style={styles.erros}>{errors.Telefone}</Text>
                     }

                     <View style={styles.input}>
                        <TextInput
                           autoCapitalize="none"
                           name="CPF"
                           placeholder="CPF"
                           style={{flex: 1}}
                           onChangeText={handleChange('CPF')}
                           onBlur={handleBlur('CPF')}
                           value={values.CPF}
                        />
                     </View>    
                     {errors.CPF &&
                        <Text style={styles.erros}>{errors.CPF}</Text>
                     }

                     <View style={styles.input}>
                        <TextInput
                           autoCapitalize="none"
                           name="DataDeNascimento"
                           placeholder="Data De Nascimento"
                           style={{flex: 1}}
                           onChangeText={handleChange('DataDeNascimento')}
                           onBlur={handleBlur('DataDeNascimento')}
                           value={values.DataDeNascimento}
                        />
                     </View>    
                     {errors.DataDeNascimento &&
                        <Text style={styles.erros}>{errors.DataDeNascimento}</Text>
                     }

                     <TouchableOpacity style={styles.containerAdcCartao} onPress={handleSubmit} disabled={!isValid}>
                        <Text style={styles.txtAdcCartao}>
                           Proximo
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
		marginTop: 25,
		alignItems: 'center',
		backgroundColor: '#e9e9e9',
		height: 100, 
		width: 100, 
		borderRadius: 50, 
		justifyContent: "center"
	},
	txtFoto: {
		fontFamily: 'Open Sans SemiBold',
		color: "#960500",
		paddingTop: 10
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
      fontFamily: 
      'Open Sans Regular', 
      paddingLeft:10 
   }
})

export default CadastroBeneficiario1