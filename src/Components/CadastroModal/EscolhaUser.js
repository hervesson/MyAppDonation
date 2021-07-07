import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const EscolhaUser = () => {
	return (
		<View style={{flex: 1, alignItems: "center"}}>
			<TouchableOpacity style={styles.container} onPress={() => alert("cacçoe")}>
				<Text style={styles.texto}>Sou Doador</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.container}>
				<Text style={styles.texto}>Quero receber Doação</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: 150,
		width: "70%",
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 2,
		borderColor: "#960500",
		borderRadius:20,
		marginTop: 50
	},
	texto: {
		fontFamily: "Open Sans Bold"
	}
})

export default EscolhaUser