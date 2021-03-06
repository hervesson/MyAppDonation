import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity, TextInput} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { TextInputMask } from 'react-native-masked-text'
import CurrencyInput from 'react-native-currency-input';


const windowWidth = Dimensions.get('window').width;

const CenaOne = ( props ) => {
	const [selectedLanguage, setSelectedLanguage] = useState("Selecione a entidade");
	const [weight, setWeight] = useState(1);
	const [valorFinal, setValorFInal] = useState(45)
	const [slider, setSlider] = useState(true)
	const [erro, setErro] = useState(false)
	
	const valorCalculate = () => {
    	const valor = weight*45;
    	setValorFInal(valor)
  	};

	const cifrao = (vem) => {
      if(vem == ""){
      	setValorFInal(45) 
  		}else{
  			setValorFInal(vem)
  		}
   }

   const verificador = () => {
   	if(valorFinal > 0){
   		props.callback("cenaDois", valorFinal)
   	}else{
   		setErro(true)
   	}
   }

   

  	return (
    	<View>
			<ScrollView>
				<View style={styles.titulo}>
      			<Text style={styles.txtTitulo}>Fazer Doação</Text>
      		</View>
      		{/*<View style={styles.containerPiker}>
      			<Picker
						selectedValue={selectedLanguage}
						style={{ height: 50}}
						mode="dropdown"
						onValueChange={(itemValue, itemIndex) =>
						   setSelectedLanguage(itemValue)
						}>
						<Picker.Item label="Lar Beneficente Santo Antonio" value="Lar Beneficente Santo Antonio" />
						<Picker.Item label="Lar de Maria" value="Lar de Maria" />
						<Picker.Item label="Paz e bem!" value="Paz e bem!" />
					</Picker>
				
      		</View>*/}
      		<Text></Text>
      		<View style={styles.containerEntidade}>
      			<Image style={styles.banner}
	            	source={require('../../Assets/Images/fotoDeCapa.png')}
	         	/>
	         	<View style={styles.containerImgEntidade}>
	         		<View style={{backgroundColor: 'white', marginTop: -50, padding: 10, borderRadius: 15}}>
		         		<Image style={styles.imgEntidade}
		            		source={require('../../Assets/Images/04.png')}
		            		resizeMode="contain"
		         		/>
	         		</View>
	         		<View>
	         			<Text style={styles.tituloEntidade}>Sem Fome</Text>
	         			<Text style={styles.descricaoEntidade}>Lorem ipsum dolor</Text>
	         		</View>
	         	</View>
      		</View> 
      		<View style={styles.descricao}>
      			<Text style={styles.txtDescricao}>
      				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Nam commodo metus at dui vestibulum
      			</Text>
      		</View>
      		<View style={styles.containerItems}>
      			<Image 
	            	source={require('../../Assets/Images/umaCesta.png')}
	         	/>
	         	<Text style={styles.numberCestas}>{weight}x cestas básica</Text>
	         	<Image 
	            	source={require('../../Assets/Images/duasCestas.png')}
	         	/>
      		</View>
      		
      		<View style={styles.containerSlide}>
	      		<Slider
					   style={{windowWidth}}
					   minimumValue={1}
					   maximumValue={20}
					   minimumTrackTintColor={"#fbb600"}
					   maximumTrackTintColor={"black"}
					   thumbTintColor={"#fbb600"}
					   onValueChange={(v) => setWeight(v)}
					   onSlidingComplete={(_) => valorCalculate()}
					   value={weight}
					   step={1}
			      />
				</View>
				
				<View style={styles.containerDinheiro}>
					<Text style={styles.txtCifrao}>
						R$
					</Text>
					<CurrencyInput
				      value={valorFinal}
				      style={styles.txtValor}
				      onChangeValue={setValorFInal}
				      unit="$"
				      delimiter=","
				      separator="."
				      precision={2}
				      onChangeText={(formattedValue) => {
				        console.log(formattedValue); // $2,310.46
				      }}
				   />

					{/*<Text style={styles.txtValor}>
						{valorFinal}
					</Text>
					<Text style={styles.txtCifrao}>
						,00
					</Text>*/}
				</View>
				{
					erro ? 
						<Text style={{alignSelf: "center", fontFamily: "Open Sans Regular", color: "red"  }}>
							Informe o valor da sua doação
						</Text>
					: null
				}
				
				<TouchableOpacity style={styles.container} onPress={() => verificador()}>
               <Text style={styles.texto}>
                  Confirmar Doação
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
	containerPiker: {
		marginTop: 25,
		borderWidth: 0.1,
		borderColor: '#707070',
		borderRadius: 1,
		marginHorizontal: 10,
		backgroundColor: '#F8F8F8'
	},
	containerEntidade: {
		marginTop: 5,
		marginHorizontal: 10,
		//alignItems: 'center', 
		borderRadius: 10,
		height: 184,
		backgroundColor: '#FFF',
		borderColor: '#CECECE',
		borderWidth: 0.5
	},
	banner: {
		height: 98,
		width: 335,
		alignSelf: 'center' 
	},
	containerImgEntidade: {
		flexDirection: "row",
		justifyContent: 'space-evenly', 
		alignItems: 'center',
	},
	imgEntidade: {
		height: 96,
		width: 76
	},
	tituloEntidade : {
		fontFamily: 'Open Sans ExtraBold',
		fontSize: 15
	},
	descricaoEntidade: {
		fontFamily: 'Open Sans Regular',
		fontSize: 11
	},
	descricao: {
		paddingTop: 25,
		paddingHorizontal: 25,
		justifyContent: 'center'
	},
	txtDescricao: {
		textAlign: 'center',
		fontFamily: 'Open Sans Light',
		fontSize: 11
	},
	containerItems: {
		paddingTop: 20,
		flexDirection: "row",
		justifyContent: 'space-between', 
		paddingHorizontal: 25,
		alignItems: "flex-end"
	},
	numberCestas: {
		fontSize: 13,
		fontFamily: 'Open Sans Bold'
	},
	containerSlide: {
		marginTop: 25,
		//backgroundColor: 'red'
	},
	containerDinheiro: {
		flexDirection: "row",
		justifyContent: 'center',
		alignItems: 'center'
	},
	txtCifrao: {
		color: "#fbb600",
		fontFamily: 'Open Sans Bold',
		fontSize: 17
	},
	txtValor:{
		color: "#fbb600",
		fontFamily: 'Open Sans ExtaBold',
		fontSize: 47
	},
	texto:{
 		fontFamily: "Open Sans ExtraBold",
    	fontSize: 20,
    	color: "#FFF"
 	},
   container:{
      justifyContent: "center",
      alignItems: "center",
      height: 77,
      width: 343,
      borderRadius: 20,
      backgroundColor: "#fbb600",
      alignSelf: 'center'
   },       
   botoesInput: {
   	backgroundColor:"#960500", 
   	margin: 5, 
   	justifyContent: "center", 
   	padding: 5, 
   	borderRadius: 10
   },
   containerInput: {
   	alignItems: "center",
   	backgroundColor:"#fbb600", 
   	marginTop: 20, 
   	marginHorizontal: 10, 
   	borderRadius: 10, 
   	flexDirection: 'row'
   }
})	

export default CenaOne
