import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, UselessTextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const CenaFour = () => {
	const [valueInput, setValueInput] = useState("Rodrigo Santos de Oliveira");
	const [valueInput1, setValueInput1] = useState("Rodrigo Santos de Oliveira");

	return (
		<View>
			<View style={styles.containerImage}>
				<Image style={styles.avatar}
               source={require('../../Assets/Images/logotipo.png')}
            />
            <Text style={styles.txtDoacao}>
            	Recibo de Doação
            </Text> 
         </View> 
         <View style={styles.containerCartao}>
         	<Icon name="checkmark-sharp" size={20} color="green" />
	      	<Text style={styles.txtCartao}>
	            Doacão realizada às 12:53
	         </Text>
      	</View> 
      	<View style={styles.containerDetalhes}>
      		<Text style={styles.label}>
      			Doado por:
      		</Text>
      		<TextInput
      			style={styles.txtValues}
			      value={valueInput}
			      underlineColorAndroid={"#707070"}
			      editable={false}
			   />
			   <Text style={styles.label}>
      			Beneficiado:
      		</Text>
      		<TextInput
      			style={styles.txtValues}
			    	value={valueInput1}
			     	underlineColorAndroid={"#707070"}
			     	editable={false}
			   />
      	</View>
      	<View style={styles.containerDinheiro}>
				<Text style={styles.txtCifrao}>
					R$
				</Text>
				<Text style={styles.txtValor}>
					180
				</Text>
				<Text style={styles.txtCifrao}>
					,00
				</Text>
			</View>
			<View style={styles.detalhesCartao}>
				<Text style={styles.txtValues}>
					Pago com cartão
				</Text>
				<View style={styles.card}>
					<Icon name="card-outline" size={20} color="black" />
					<Text style={styles.txtValues}>
						XXX.8965
					</Text>
				</View>
			</View>
			<TouchableOpacity style={styles.containerAdcCartao}>
            <Text style={styles.txtAdcCartao}>
               Compatilhar Recibo
            </Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.container}>
            <Text style={styles.texto}>
               Ver Histórico de Doação da Casa
            </Text>
         </TouchableOpacity>	
		</View>
	)
}

const styles = StyleSheet.create({
	containerImage: {
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 25
	},
	avatar: {
		height: 74,
		width: 63
	},
	containerCartao: {
		flexDirection: "row",
		height: 55,
		borderColor: '#D2D2D2',
		borderWidth: 0.5,
		marginHorizontal: 10,
		alignItems: "center",
		justifyContent: 'center',
		borderRadius: 10
	},
	txtDoacao:{
		fontFamily: 'Open Sans ExtraBold',
		fontSize: 13,
		paddingTop: 20
	},
	txtCartao: {
		fontFamily: 'Open Sans Bold',
		fontSize: 13
	},
	containerDetalhes: {
		paddingHorizontal: 10,
		paddingTop: 25
	},
	label: {
		fontFamily: 'Open Sans Regular',
		fontSize: 11
	},
	txtValues: {
		fontFamily: 'Open Sans Regular',
		fontSize: 15
	},
	containerDinheiro: {
		paddingTop: 10,
		flexDirection: "row",
		justifyContent: 'center',
		alignItems: 'center'
	},
	txtValor:{
		color: "#2B0909",
		fontFamily: 'Open Sans ExtaBold',
		fontSize: 47
	},
	txtCifrao: {
		color: "#2B0909",
		fontFamily: 'Open Sans Bold',
		fontSize: 17
	},
	detalhesCartao: {
		flexDirection: "row",
		justifyContent: 'space-between',
		marginHorizontal: 10
	},
	card: {
		flexDirection: "row",
		justifyContent: 'space-between',
		alignItems: "center"
	},
	containerAdcCartao: {
		marginTop: 20,
		justifyContent: "center",
      alignItems: "center",
      height: 55,
      width: 343,
      borderRadius: 10,
      backgroundColor: "#F7344B",
      alignSelf: 'center',
	},
	txtAdcCartao:{
 		fontFamily: "Open Sans ExtraBold",
    	fontSize: 13,
    	color: "#FFF"
 	},
	container:{
		marginTop: 20,
      justifyContent: "center",
      alignItems: "center",
      height: 55,
      width: 343,
      borderRadius: 10,
      backgroundColor: "#2B0909",
      alignSelf: 'center'
   },  
	texto:{
 		fontFamily: "Open Sans ExtraBold",
    	fontSize: 13,
    	color: "#FFF"
 	}  
}) 	

export default CenaFour