import React, {useState, useEffect} from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik'
import * as yup from 'yup'
import SelectPhoto from "../SelectPhoto"

const CadastroDoador = (props) => {
   const [abrir, setAbrir] = useState(0)
   const [photo, setPhoto] = useState([])

   function callbackFuncao(response){
      setPhoto(response);
   };

	return (
		<ScrollView style={{flex: 1}}>
			<Text style={styles.titulo}>Cadastro Doador</Text>
			<View style={{alignItems: "center" }}>
				<TouchableOpacity style={styles.fotoDePerfil} onPress={() => setAbrir(abrir + 1)}>
					<SelectPhoto 
                  callback={callbackFuncao} 
                  abrir={abrir} 
                  height={130} 
                  width={130}
                  borderRadius={65}
               /> 
               {
                  photo.length == 0 ? <Icon name="camera" size={35} color="black" /> : null
               }
				</TouchableOpacity>
				<Text style={styles.txtFoto}>Foto de Perfil</Text>
			</View>
			<View style={{marginTop: 25}}>
            <Formik
               //validationSchema={cadastroValidationSchema}
               initialValues={{nome: '', Telefone: '', senha: ''}}
               onSubmit={values => {props.callback("sucess")}}
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
                           name="senha"
                           placeholder="Senha"
                           style={{flex: 1}}
                           onChangeText={handleChange('senha')}
                           onBlur={handleBlur('senha')}
                           value={values.senha} 
                        />
                     </View>    
                     {errors.senha &&
                        <Text style={styles.erros}>{errors.senha}</Text>
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


export default CadastroDoador