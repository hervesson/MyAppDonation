import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

const Sucesso = () => {
	return (
		<View style={{flex: 1}}>
			<View style={{flex: 1}}>
				<Text style={styles.titulo}>Cadastro Beneficiário</Text>
			</View>
			<View style={{flex: 4, paddingTop: 100, alignItems: "center" }}>
				<Icon name="checkmark-circle-outline" size={150} color="green" />
				<Text style={styles.sucess}> Sucesso! </Text>
				<Text style={styles.contato}> Em breve entraremos em Contato </Text>
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
	sucess: {
		fontFamily: "Open Sans SemiBold",
		fontSize: 18
	},
	contato: {
		fontFamily: "Open Sans Regular",
		fontSize: 14,
		marginVertical: 10
	}
})

export default Sucesso