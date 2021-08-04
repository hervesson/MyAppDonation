import React, { useState, useEffect} from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik'
import * as yup from 'yup'
import SelectPhoto from "../SelectPhoto"
import StepByStep from "../StepByStep"

const CadastroBeneficiario3 = (props) => {
	const [abrir, setAbrir] = useState(0);
	const [photo, setPhoto] = useState([]);

	const cadastroValidationSchema = yup.object().shape({
      photoSelfie: yup.object().required('Você precisa colocar a sua foto com seu documento')
   })

	return (
		<View style={{flex: 1}}>
			<View style={{flex: 1}}>
				<Text style={styles.titulo}>Cadastro Beneficiário</Text>
				<StepByStep corOne="#e9e9e9" corTwo="#960500" corThree="#e9e9e9" corFour="#e9e9e9" />
				<Text style={{fontFamily: 'Open Sans Regular', marginTop: 25, textAlign: "center" }}>Confirmar Dados</Text>
			</View>
			<View style={{flex:3, alignItems: "center"}}>
				<Formik
	            validationSchema={cadastroValidationSchema}
	            initialValues={{photoSelfie: ""}}
	            onSubmit={values => props.callback("cadastroBeneficiario4", values)}
	            >
	            {({
	               handleSubmit,
	               setFieldValue,
	               setFieldTouched,
	               values,
	               errors,
	               isValid,
	            }) => (
               	<>
						<TouchableOpacity style={styles.fotoDePerfil} onPress={() => setAbrir(abrir + 1)}>
						<SelectPhoto 
		               callback={(response) => {setPhoto(response); setFieldValue('photoSelfie', response )}}
		               abrir={abrir}
		               height={200} 
		               width={300}
		               borderRadius={5}
		               marginVertical={30}
		            />
		            {
		               photo.length == 0 ? 
		               	<Image
						         resizeMode="contain"
						         //resizeMethod="scale"
						         style={{
		                        width:"100%",
		                        height:"100%"
		                     }}
						         source={require("../../Assets/Images/identidade.jpeg")}
						      />  
		               : null
		            }
						</TouchableOpacity>
						{errors.photoSelfie  &&
		               <Text style={{fontSize: 10, color: 'red', fontFamily: 'Open Sans Regular', textAlign: "center"}}>
		                  {errors.photoSelfie}
		               </Text>
               	}

						{/*<Icon name="camera" size={55} color="black" />*/}
						<View style={{width: 200, paddingTop: 20}}>
							<Text style={styles.txtFoto}>
								Envie uma Selfie segurando o documento enviado na tela anterior. 
								A foto terá que ser bem nítida e mostrar seu rosto e o seu documento de forma legível
							</Text>
						</View>

						<TouchableOpacity style={styles.containerAdcCartao} onPress={handleSubmit} disabled={!isValid}>
		            	<Text style={styles.txtAdcCartao}>
		               	Proximo
		            	</Text>
		         	</TouchableOpacity>
		         	</>
	            )}
         	</Formik>
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
	fotoDePerfil: {
		alignItems: 'center',
		backgroundColor: '#e9e9e9',
		height: 200, 
		width: 300, 
		justifyContent: "center",
	},
	txtFoto: {
		fontFamily: 'Open Sans SemiBold',
		color: "#960500",
		paddingTop: 10
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


export default CadastroBeneficiario3