import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Picker, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import stripe, { StripeCardInputWidget } from '@agaweb/react-native-stripe';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import axios from "axios";

stripe.initModule("pk_test_51IbW7iDov2PsfCIgO5MKG7DRDxUB0aq5GoJbrYTqLovKAJWKvRZqgNzTukkCgO8X6IMBMkSIrws9HaaU3EZLR24R0011lppkyb");

const CenaTwo = (props) => {
	const [isValid, setIsValid] = useState(false);
  	const [cardParams, setCardParams] = useState(undefined);
  	const [cards, setCards] = useState([]);
  	const [isFetching, setIsFetching] = useState(false);
  	const [displayCard, setDisplayCard] = useState(false)
  	const [selectedValue, setSelectedValue] = useState();
  	const [customerId, setCustomerId] = useState("");
	const [pagando, setPagando] = useState(false) 
	const [salvarCartao, setSalvarCartao] = useState(false)
	const valor = Math.round(props.valor * 100) 

 
	const retriveCard = (customer) => {
		setIsFetching(true);

		axios.post('https://us-central1-myappdonate.cloudfunctions.net/retriveCards', {
    		customerId: customer
  		})
	  	.then((response) => {
	  		if(response.data.data.length > 0){
	  			setCards(response.data.data);
	    		setSelectedValue(response.data.data[0].id)
	  		}
	    	setIsFetching(false);
	  	})
  		.catch(function (error) {
    		console.log(error);
  		}); 
	}

	const pay = () => {
		setPagando(true);

	   fetch(
	      'https://api.stripe.com/v1/payment_intents?amount='+valor+'&currency=brl&customer='+customerId+'&description='+props.entidade.title,
	      {
	         method: 'POST',
	         headers: {
	            Authorization: 'Bearer sk_test_51IbW7iDov2PsfCIgoLxBTIlobisxvleNNaRZcCTHC0XElwhSHK41ZenMlkw21DG5IrqTQTCVnuvRUb9LU8EBQ8wk00ojxaojZB'
	         },
	      },
	   )
      .then((response) => response.json())
      .then((response) => {
      	console.log(response.id);
      	props.payment(response.id)
        	if (response.error) {
          	alert(response.error.message);
          	setPagando(false);
        	} else if (response.client_secret) {
         stripe
            .confirmPaymentWithPaymentMethodId( response.client_secret, selectedValue )
            .then((doc) => {
            	//console.log(doc)
               props.callback("cenaThree");
               //props.recibo({data: new Date().getTime(), card: })
               setPagando(false);
            })
            .catch((err) => {
              alert(err);
              setPagando(false);
            });
        	}
      }); 
  	};

  	const setupIntent = () => {
  		setSalvarCartao(true);

      fetch(
         'https://api.stripe.com/v1/setup_intents?customer='+customerId, {
            method: 'POST',
            headers: {
             	Authorization: 'Bearer sk_test_51IbW7iDov2PsfCIgoLxBTIlobisxvleNNaRZcCTHC0XElwhSHK41ZenMlkw21DG5IrqTQTCVnuvRUb9LU8EBQ8wk00ojxaojZB'
            },
         }
      )
      .then((response) => response.json())
      .then((response) => {
         if (response.error) {
            alert(response.error.message);
         } else if (response.client_secret) {
            stripe.confirmCardSetup(response.client_secret, {
               number: cardParams.number,
               expMonth: cardParams.expMonth,
               expYear: cardParams.expYear,
               cvc: cardParams.cvc,
            })
            .then((data) => {
               console.log(data);
              	retriveCard(customerId);
              	setDisplayCard(false);
              	setSalvarCartao(false)
               //alert('Successful setup');
            })
            .catch((err) => {
            	setSalvarCartao(false)
               alert(err);
            });
         }
      });
   };

   function Renderitems(){
   	return (
   		cards.map((item, index) => 
				<Picker.Item label={item.card.brand+ "  " +item.card.last4} value={item.id} key={item.id} />  
   		)
   	)	
   }

	return (
		<View>
			<ScrollView>
				<View style={styles.titulo}>
      			<Text style={styles.txtTitulo}>Fazer Doação</Text>
      		</View>
      		<View  style={styles.containerDetalhe}>
      			<View style={styles.containerDescricao}>
      				<Text style={styles.txtDescricao}>
	      				Valor a ser doado para o Sem Fome
	      			</Text>
      			</View>
      			<View style={styles.containerPreco}>
	      			<Text style={styles.cifrao}>
	      				R$
	      			</Text>
	      			<Text style={styles.preco}>
	      				{props.valor}
	      			</Text>
	      			{/*<Text style={styles.centavos}>
	      				,00
	      			</Text>*/}
      			</View>
      		</View>
      		{
      			isFetching ? <ActivityIndicator size="small" color="#960500"/> : 
      				cards.length <= 0 ? 
      					<View style={{paddingHorizontal: 10}}>
				      		<StripeCardInputWidget
						         onCardValidCallback={({isValid, cardParams}) => {
						            setIsValid(isValid);
						            setCardParams(cardParams);
						         }}   
						      />
						      {
						      	salvarCartao ? (
						      		<View style={styles.containerAdcCartao}>
						      			<ActivityIndicator size="large" color="#960500"/>
						      		</View>
						      	) : (
						      		<Pressable style={styles.containerAdcCartao} onPress={() => setupIntent()}  disabled={!isValid}>
						               <Text style={styles.txtAdcCartao}>
						                  Adicionar Cartao
						               </Text>
			            			</Pressable>
						      	)
						      }
		      			</View>
      				:  displayCard ?
      					<View style={{paddingHorizontal: 10}}>
	      					<StripeCardInputWidget
							      onCardValidCallback={({isValid, cardParams}) => {
							         setIsValid(isValid);
							         setCardParams(cardParams);
							      }}   
							   />
							   <View style={{flexDirection: 'row', paddingVertical: 10}}>
									<TouchableOpacity style={styles.botaoAcessivel} onPress={() => setDisplayCard(false)}>
						            <Text style={styles.txtDetalhes}>
						               Cancelar
						            </Text>
				         		</TouchableOpacity>
				         		{
				         			salvarCartao ? (
				         				<View style={{flex: 1, justifyContent: "center"}}>
						      				<ActivityIndicator size="large" color="#960500"/>
						      			</View>
						      		) : (

							         	<Pressable style={styles.botaoAcessivel} onPress={() => setupIntent()} disabled={!isValid}>
								            <Text style={styles.txtDetalhes}>
								               Salvar cartão
								            </Text>
							         	</Pressable>
						         	)
				         		}
				        
								</View>
							</View>    
						   :
						   <View>
	      					<View style={styles.containerCartao}>
				      			<Icon name="card-outline" size={30} color="black" />
				      			
					      			<Picker
									      selectedValue={selectedValue}
									      style={{ flex: 1}}
									      onValueChange={(itemValue, itemIndex) => console.log(itemValue)}
									   >
									      {Renderitems()}
									   </Picker>
					               
				      		</View>	

				      		<TouchableOpacity style={styles.containerAdcCartao} onPress={() => { setDisplayCard(true) }}>
					               <Text style={styles.txtAdcCartao}>
					                  Adicionar Cartao
					               </Text>
				            </TouchableOpacity>
			            </View>
      		}
      		{
      			pagando ? (
      				<ActivityIndicator size="large" color="#fBB600"/>
      			) : (
	      			<Pressable style={styles.container} onPress={() => pay()} disabled={!selectedValue || displayCard}>
	               	<Text style={styles.texto}>
	                  	Efetuar Pagamento
	               	</Text>
            		</Pressable>	
      			)
      		}
				
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
	botaoAcessivel: {
		flex: 1, 
		height: 55, 
		backgroundColor: 'red', 
		marginHorizontal: 10,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
		backgroundColor: '#960500'
	},
	txtDetalhes:{
 		fontFamily: "Open Sans ExtraBold",
    	fontSize: 13,
    	color: "#FFF"
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