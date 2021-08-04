import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik'
import * as yup from 'yup'
import IdFrente from "../../Assets/Images/idCardFrente.svg"
import IdVerso from "../../Assets/Images/idCardVerso.svg"

import SelectPhoto from "../SelectPhoto"
import StepByStep from "../StepByStep"

const CadastroBeneficiario2 = (props) => {
   const [abrir, setAbrir] = useState(0);
   const [abrir1, setAbrir1] = useState(0);
   const [photo, setPhoto] = useState([]);
   const [photo1, setPhoto1] = useState([])

   const cadastroValidationSchema = yup.object().shape({
      photoRgFront: yup.object().required('Você precisa colocar a foto da frente do seu RG '),
      photoRgBack: yup.object().required('Você precisa colocar a foto de trás do seu RG'),
   })
   
	return (
		<ScrollView style={{flex: 1}}>
			<Text style={styles.titulo}>Cadastro Beneficiário</Text>
			<StepByStep corOne="#e9e9e9" corTwo="#960500" corThree="#e9e9e9" corFour="#e9e9e9"/>
			<Text style={{fontFamily: 'Open Sans Regular', marginTop: 25, textAlign: "center", marginBottom: 25 }}>Confirmar Dados</Text>

         <Formik
            validationSchema={cadastroValidationSchema}
            initialValues={{photoRgFront: "", photoRgBack:""}}
            onSubmit={values =>  props.callback("cadastroBeneficiario3", values)}
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
      			<View style={styles.containerIput}>
      				<Icon name="cloud-upload" size={30} color="black" />
      				<TouchableOpacity style={styles.input} onPress={() => setAbrir(abrir + 1)}>
      					<Text style={styles.placeholder}>Foto da RG ou CNH</Text>
      				</TouchableOpacity>
      			</View>	
               <View style={{alignItems: 'center'}}> 
                  <SelectPhoto 
                     callback={(response) => {setPhoto(response); setFieldValue('photoRgFront', response )}} 
                     abrir={abrir}
                     height={200} 
                     width={300}
                     borderRadius={5}
                     marginVertical={30}
                  />
                  {
                     photo.length == 0 ? <IdFrente width={220} height={220} /> : null
                  }
               </View>
               {errors.photoRgFront  &&
                  <Text style={{fontSize: 10, color: 'red', fontFamily: 'Open Sans Regular', textAlign: "center"}}>
                     {errors.photoRgFront}
                  </Text>
               }

      			<View style={styles.containerIput}>
      				<Icon name="cloud-upload" size={30} color="black" />
      				<TouchableOpacity style={styles.input} onPress={() => setAbrir1(abrir1 + 1)}>
      					<Text style={styles.placeholder}>Foto da RG ou CNH</Text>
      				</TouchableOpacity>
      			</View>
               <View style={{alignItems: 'center'}}>
                  <SelectPhoto 
                     callback={(response) => {setPhoto1(response); setFieldValue('photoRgBack', response)}}
                     abrir={abrir1}
                     height={200} 
                     width={300}
                     borderRadius={5}
                     marginVertical={30}
                  />
                  {
                     photo1.length == 0 ? <IdVerso width={220} height={220} /> : null
                  }
               </View>
               {errors.photoRgBack  &&
                  <Text style={{fontSize: 10, color: 'red', fontFamily: 'Open Sans Regular', textAlign: "center"}}>
                     {errors.photoRgBack}
                  </Text>
               }

      			<TouchableOpacity style={styles.containerAdcCartao} onPress={handleSubmit} disabled={!isValid}>
                  <Text style={styles.txtAdcCartao}>
                     Proximo
                  </Text>
               </TouchableOpacity>
               </>
            )}
         </Formik>
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
      flex: 1
   },
   placeholder: {
   	color: "#999",
   	fontFamily: 'Open Sans Regular',
   	fontSize: 14
   },
   containerIput:{
   	flexDirection: "row",
   	alignItems: "center",
   	marginLeft:10,
   },
   containerAdcCartao: {
      justifyContent: "center",
      alignItems: "center",
      height: 55,
      width: 343,
      borderRadius: 80,
      backgroundColor: "#960500",
      alignSelf: 'center',
      marginBottom: 25

   },
   txtAdcCartao:{
      fontFamily: "Open Sans SemiBold",
      fontSize: 18,
      color: "#FFF",
      paddingHorizontal: 10
   },
})

export default CadastroBeneficiario2