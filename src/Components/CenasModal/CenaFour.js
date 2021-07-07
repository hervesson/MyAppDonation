import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, UselessTextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import { MaskService } from 'react-native-masked-text'
import Share from 'react-native-share';
import { FakeCurrencyInput } from 'react-native-currency-input';

import axios from "axios";

const CenaFour = ( props ) => {
	const [user, setUser] = useState([]);
	const [isFetching, setIsFetching] = useState(true)
	const [data, setData] = useState([])

   useEffect(() => {
      var user = auth().currentUser;
      var name, email, photoUrl, uid, emailVerified;

      if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid; 
      }
      setUser(user);
      retrivePaymentIntent()
   }, [])

   const retrivePaymentIntent = () => {
      setIsFetching(true);

      axios.post('https://us-central1-myappdonate.cloudfunctions.net/retrivePaymentIntent', {
         paymentIntent: props.payment
      })
      .then((response) => {
         setData(response.data);
         console.log(response.data)
         setIsFetching(false);
      })
      .catch(function (error) {
         console.warn(error);
      }); 
   }

   const onShare = async () => {
    	try {
    		const shareOptions = {
		    	title: 'Share via',
		    	message: 'Recibo da doaçao de '+ user.displayName + ' para ' + data.description,
		    	url: data.charges.data[0].receipt_url,
		  	};
      	const shareResponse = await Share.open(shareOptions);
    	} catch (error) {
      	alert(error.message);
    	}
  	};

  	function formatReal( int ){
      var tmp = int+'';
      tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
      if( tmp.length > 6 )
         tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
      return tmp;
	}


	return (
		<View>
			<View style={styles.containerImage}>
				<Image style={styles.avatar}
               source={require('../../Assets/Images/01.png')}
            	resizeMode="contain"
            />
            <Text style={styles.txtDoacao}>
            	Recibo de Doação
            </Text> 
         </View> 
         {
         	isFetching ? null 
         	:
         	<View>
		         <View style={styles.containerCartao}>
		         	<Icon name="checkmark-sharp" size={20} color="green" />
			      	<Text style={styles.txtCartao}>
			            Doacão realizada às {new Date(data.charges.data[0].created).getHours()}:{new Date(data.charges.data[0].created).getMinutes()}
			         </Text>
		      	</View> 
		      	<View style={styles.containerDetalhes}>
		      		<Text style={styles.label}>
		      			Doado por:
		      		</Text>
		      		<TextInput
		      			style={styles.txtValues}
					      value={user.displayName}
					      underlineColorAndroid={"#707070"}
					      editable={false}
					   />
					   <Text style={styles.label}>
		      			Beneficiado: 
		      		</Text>
		      		<TextInput
		      			style={styles.txtValues}
					    	value={data.description}
					     	underlineColorAndroid={"#707070"}
					     	editable={false}
					   />
		      	</View>
		      	<View style={styles.containerDinheiro}>
						<Text style={styles.txtValor}>
					      { formatReal( data.amount_received) }
					   </Text>   
					</View>
					<View style={styles.detalhesCartao}>
						<Text style={styles.txtValues}>
							Pago com cartão
						</Text>
						<View style={styles.card}>
							<Icon name="card-outline" size={20} color="black" />
							<Text style={styles.txtValues}>
								  XXXX {data.charges.data[0].payment_method_details.card.last4}
							</Text>
						</View>
					</View>
					<TouchableOpacity style={styles.containerAdcCartao} onPress={() => onShare()}>
		            <Text style={styles.txtAdcCartao}>
		               Compatilhar Recibo
		            </Text>
		         </TouchableOpacity>
		         <TouchableOpacity style={styles.container} onPress={() => props.cena()}>
		            <Text style={styles.texto}>
		               Ver Histórico de Doação
		            </Text>
		         </TouchableOpacity>	
         	</View>
         }
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
		height: 53,
		width: 183
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
      backgroundColor: "#960500",
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
      backgroundColor: "#fbb600",
      alignSelf: 'center'
   },  
	texto:{
 		fontFamily: "Open Sans ExtraBold",
    	fontSize: 13,
    	color: "#FFF"
 	}  
}) 	

export default CenaFour