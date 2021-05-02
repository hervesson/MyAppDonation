import React from 'react'
import { View, Text, StyleSheet, ScrollView,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CenaThree = (props) => {
	return (
		<View>
			<ScrollView>
				<View style={styles.titulo}>
      			<Text style={styles.txtTitulo}>Confirmaçao de Pagamento</Text>
      		</View>
      		<Icon style={{alignSelf: "center" }} name="checkmark-circle-sharp" size={200} color="#74C971" />
      		<Text style={styles.txtConfirmacao}>Doação realizada </Text>
				<Text style={styles.txtConfirmacao}>com sucesso :)</Text>
				<TouchableOpacity style={styles.container} onPress={() => props.callback("cenaFour")}>
               <Text style={styles.texto}>
                 Vizualizar Recibo
               </Text>
            </TouchableOpacity>	
      	</ScrollView>	
    	</View>
	)
}

const styles = StyleSheet.create({
	titulo: { 
		paddingTop: 25,
		alignItems: 'center' 
	},
	txtTitulo: {
		fontFamily: 'Open Sans ExtraBold',
	},
	txtConfirmacao: {
		fontFamily: 'Open Sans ExtraBold',
		fontSize: 17,
		alignSelf: "center"
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

export default CenaThree