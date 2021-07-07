import React from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import StepByStep from "../StepByStep"

const CadastroBeneficiario3 = (props) => {
	return (
		<View style={{flex: 1}}>
			<View style={{flex: 1}}>
				<Text style={styles.titulo}>Cadastro Beneficiário</Text>
				<StepByStep corOne="#e9e9e9" corTwo="#960500" corThree="#e9e9e9" />
				<Text style={{fontFamily: 'Open Sans Regular', marginTop: 25, textAlign: "center" }}>Confirmar Dados</Text>
			</View>
			<View style={{flex:3, alignItems: "center"}}>
				<View style={styles.fotoDePerfil}>
					<Icon name="camera" size={55} color="black" />
				</View>
				<View style={{width: 200}}>
					<Text style={styles.txtFoto}>
						Envie uma Selfie segurando o documento enviado na tela anterior. 
						A foto terá que ser bem nítida e mostrar seu rosto e o seu documento de forma legível
					</Text>
				</View>

				<TouchableOpacity style={styles.containerAdcCartao} onPress={() => props.callback("cadastroBeneficiario4")}>
            	<Text style={styles.txtAdcCartao}>
               	Proximo
            	</Text>
         	</TouchableOpacity>
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
		marginTop: 25,
		alignItems: 'center',
		backgroundColor: '#e9e9e9',
		height: 150, 
		width: 150, 
		borderRadius: 75, 
		justifyContent: "center",
		marginTop: 60
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