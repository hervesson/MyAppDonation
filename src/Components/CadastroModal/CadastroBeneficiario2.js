import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import StepByStep from "../StepByStep"

const CadastroBeneficiario2 = (props) => {
	return (
		<ScrollView style={{flex: 1}}>
			<Text style={styles.titulo}>Cadastro Beneficiário</Text>
			<StepByStep corOne="#e9e9e9" corTwo="#960500" corThree="#e9e9e9" />
			<Text style={{fontFamily: 'Open Sans Regular', marginTop: 25, textAlign: "center" }}>Confirmar Dados</Text>
			<View style={styles.containerIput}>
				<Icon name="cloud-upload" size={30} color="black" />
				<TouchableOpacity style={styles.input}>
					<Text style={styles.placeholder}>Foto da RG ou CNH</Text>
				</TouchableOpacity>
			</View>	
			<View style={styles.containerIput}>
				<Icon name="cloud-upload" size={30} color="black" />
				<TouchableOpacity style={styles.input}>
					<Text style={styles.placeholder}>Foto da RG ou CNH</Text>
				</TouchableOpacity>
			</View>

			<TouchableOpacity style={styles.containerAdcCartao} onPress={() => props.callback("cadastroBeneficiario3")}>
            <Text style={styles.txtAdcCartao}>
               Proximo
            </Text>
         </TouchableOpacity>

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
      marginVertical: 5,
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
   	marginTop: 25
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

export default CadastroBeneficiario2