import React from 'react'
import { View, Text, StyleSheet, ScrollView,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CenaTwo = (props) => {
	return (
		<View>
			<ScrollView>
				<View style={styles.titulo}>
      			<Text style={styles.txtTitulo}>Fazer Doação</Text>
      		</View>
      		<View  style={styles.containerDetalhe}>
      			<View style={styles.containerDescricao}>
      				<Text style={styles.txtDescricao}>
	      				Doação para o lar beneficente santo antônio
	      			</Text>
      			</View>
      			<View style={styles.containerPreco}>
	      			<Text style={styles.cifrao}>
	      				R$
	      			</Text>
	      			<Text style={styles.preco}>
	      				{props.valor}
	      			</Text>
	      			<Text style={styles.centavos}>
	      				,00
	      			</Text>
      			</View>
      		</View>
      		<View style={styles.containerCartao}>
      			<Icon name="card-outline" size={30} color="black" />
      			<View style={styles.containerTxtCartao}>
	      			<Text style={styles.txtCartao}>
	                  Cartão de Crédito X
	               </Text>
	               <Text style={styles.txtDigitosCartao}>
	                  XXXX.8975
	               </Text>
	            </View>   
      		</View>

      		<TouchableOpacity style={styles.containerAdcCartao}>
               <Text style={styles.txtAdcCartao}>
                  Adiconar Cartao
               </Text>
            </TouchableOpacity>

				<TouchableOpacity style={styles.container} onPress={() => { props.callback("cenaThree")}}>
               <Text style={styles.texto}>
                  Efetuar Pagamento
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
		fontFamily: 'Open Sans ExtraBold'
	},
	containerDetalhe: {
		flexDirection: "row",
		height: 88,
		borderColor: '#D2D2D2',
		borderWidth: 0.5,
		marginHorizontal: 10,
		marginTop: 25,
		alignItems: "center",
		borderRadius: 10
	},
	containerDescricao: {
		flex: 1
	},
	containerPreco: {
		flex: 1, 
		justifyContent: "flex-end", 
		flexDirection: 'row',
		paddingRight: 10,
		alignItems: "center"
	},
	cifrao: {
		fontFamily: "Open Sans Bold"
	},
	preco: {
		fontFamily: 'Open Sans ExtraBold',
		fontSize: 39
	},
	centavos: {
		fontSize: 14,
		fontFamily: 'Open Sans ExtraBold'
	},
	txtDescricao: {
		fontSize: 13,
		fontFamily: 'Open Sans Regular',
		paddingLeft: 10
	},
	containerCartao: {
		flexDirection: 'row',
		paddingHorizontal: 10,
		flexDirection: "row",
		height: 66,
		borderColor: '#D2D2D2',
		borderWidth: 0.5,
		marginHorizontal: 10,
		marginTop: 25,
		alignItems: "center",
		borderRadius: 10
	},
	containerTxtCartao: {
		flexDirection: 'row', 
		justifyContent: 'space-evenly', 
		flex: 1,
		alignItems: "center"
	},
	txtCartao: {
		fontFamily: 'Open Sans Bold',
		fontSize: 13
	},
	txtDigitosCartao: {
		fontFamily: 'Open Sans Bold',
		fontSize: 17
	},
	containerAdcCartao: {
		justifyContent: "center",
      alignItems: "center",
      height: 55,
      width: 343,
      borderRadius: 10,
      backgroundColor: "#960500",
      alignSelf: 'center',
      marginVertical: 25
	},
	txtAdcCartao:{
 		fontFamily: "Open Sans ExtraBold",
    	fontSize: 13,
    	color: "#FFF"
 	},
	container:{
      justifyContent: "center",
      alignItems: "center",
      height: 77,
      width: 343,
      borderRadius: 20,
      backgroundColor: "#fbb500",
      alignSelf: 'center'
   },  
	texto:{
 		fontFamily: "Open Sans ExtraBold",
    	fontSize: 20,
    	color: "#FFF"
 	}  
})	

export default CenaTwo