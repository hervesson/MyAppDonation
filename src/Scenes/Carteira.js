import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  FlatList,
  Modal,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icone from 'react-native-vector-icons/FontAwesome';
import axios from "axios";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import stripe, { StripeCardInputWidget } from '@agaweb/react-native-stripe';

const App = () => {
	const [cards, setCards] = useState([]);
   const [cardParams, setCardParams] = useState(undefined);
   const [isValid, setIsValid] = useState(false);
	const [isFetching, setIsFetching] = useState(false);
   const [modalVisible, setModalVisible] = useState(false);
   const [customerId, setCustomerId] = useState("");
   const [salvando, setSalvando] = useState(false)
   const [modalDetalhesCard, setModalDetalhesCard] = useState(false)
   const [card, setCard] = useState("")

   useEffect(() => {
      var user = auth().currentUser;
      firestore()
         .collection('Doadores')
         .doc(user.uid)
         .onSnapshot(documentSnapshot => {
            setCustomerId(documentSnapshot.data().customerId);
            retriveCard(documentSnapshot.data().customerId)
            //console.warn('User data: ', documentSnapshot.data().customerId);
         });
   }, [])


   const retriveCard = (customer) => {
      setIsFetching(true);

      axios.post('https://us-central1-myappdonate.cloudfunctions.net/retriveCards', {
         customerId: customer
      })
      .then((response) => {
         if(response.data.data.length > 0){
            setCards(response.data.data);
            //console.warn(response.data.data)
         }else{
            setCards([])
            setModalVisible(true)
         }
         setIsFetching(false);
      })
      .catch(function (error) {
         console.warn(error);
      }); 
   }


   const setupIntent = () => {
      setSalvando(true)
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
               setSalvando(false);
               setModalVisible(false)
            })
            .catch((err) => {
               alert(err);
               setSalvando(false);
            });
         }
      });
   };


   const deleteCard = (paymentMethod) => {
   
      axios.post('https://us-central1-myappdonate.cloudfunctions.net/deleteCard', {
         methodId: paymentMethod
      })
      .then((response) => {
         setModalDetalhesCard(false);
         retriveCard(customerId);
         setCard("")
      })
      .catch(function (error) { 
         setModalDetalhesCard(false);
         retriveCard(customerId);
         setCard("")
      }); 

   }

   const renderCard = (cartao) => {
      switch (cartao) {
         case "mastercard":
           return <Icone name="cc-mastercard" size={35} color="black" />
         break;

         case "visa":
            return <Icone name="cc-visa" size={35} color="black" />
         break;

         case "diners-club":
            return <Icone name="cc-diners-club" size={35} color="black" />
         break;

         case "american-express":
            return <Icone name="cc-amex" size={35} color="black" />
         break;

         default:
            return <Icone name="credit-card" size={35} color="black" />
         break;
      }
   }


	const renderItem = ({ item }) => (
    	<TouchableOpacity style={styles.containerCartao} onPress={() => {setCard(item); setModalDetalhesCard(true)}} key={item.card.last4}>
			<View>
				<Text style={{fontFamily: 'Open Sans Bold'}}>XXXX XXXX XXXX {item.card.last4}</Text>
				<Text style={styles.txtCartao}>Cartão de {item.card.funding}</Text>
			</View>	
			{renderCard(item.card.brand)}
		</TouchableOpacity>
  	);

  	return (
    	<View style={{flex: 1, backgroundColor: 'white'}}>
         <View style={styles.container}>
   			<Text style={styles.txtTitulo}>
   				Carteira
   			</Text>
            <Icon name="add-outline" size={35} color="black" onPress={() => setModalVisible(true)} />
         </View>
         {
            isFetching ? (
               <View style={{flex: 1, justifyContent: "center", alignItems: "center" }}>
                  <ActivityIndicator size="large" color="#960500" />
               </View>
            ) : (
               <FlatList
                 data={cards}
                 renderItem={renderItem}
                 keyExtractor={item => item.id}
                 refreshing={isFetching}
               />
            )
         }
         <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
               //alert("Modal has been closed.");
               setModalVisible(!modalVisible);
            }}
         >
            <View style={styles.centeredView}>
               <View style={styles.modalView}>
                  <Text style={styles.addCard}>Adicionar Cartão</Text>
                  <View style={{paddingHorizontal: 10}}>
                     <StripeCardInputWidget
                        onCardValidCallback={({isValid, cardParams}) => {
                           setIsValid(isValid);
                           setCardParams(cardParams);
                        }}   
                     />
                  </View>
                  {
                     salvando ? 
                     (
                        <View style={{justifyContent: "center", alignItems: "center"  }}>
                           <ActivityIndicator size="large" color="#960500" />
                        </View>
                     ) : (
                        <View style={{flexDirection: 'row', paddingVertical: 10}}>
                           <TouchableOpacity style={styles.botaoAcessivel1} onPress={() => setModalVisible(false)}>
                              <Text style={styles.txtDetalhes1}>
                                 Cancelar
                              </Text>
                           </TouchableOpacity>
                           <TouchableOpacity style={styles.botaoAcessivel} onPress={() => {if(isValid == true){setupIntent()}}}>
                              <Text style={styles.txtDetalhes}>
                                 Salvar cartão
                              </Text>
                           </TouchableOpacity>
                        </View>
                     )
                  }
               </View>   
            </View>
         </Modal>
         <Modal
            animationType="slide"
            transparent={true}
            visible={modalDetalhesCard}
            onRequestClose={() => {
               //alert("Modal has been closed.");
               setModalDetalhesCard(!modalDetalhesCard);
            }}
         >
            <View style={styles.centeredView}>
               <View style={styles.modalView}>
                  <Text style={styles.addCard}>Detalhes do cartão:</Text>
                  <View style={{paddingTop: 10}}>
                     <Text style={styles.txtDetalheCard}>Bandeira:</Text>
                     <View style={styles.detalheCard}>
                        <View>
                           <Text style={styles.nameCard}>
                              {card.card ? card.card.brand : null }
                           </Text>
                           <Text>
                              **** **** **** 2769
                           </Text>
                        </View>
                        {renderCard(card.card ? card.card.brand : null)}
                     </View>
                  </View>
                  <View style={{paddingTop: 30}}>
                     <Text style={styles.txtDetalheCard}>Tipo de Cartão:</Text>
                     <View style={styles.detalheCard}>
                        <Text style={styles.nameCard}>
                           {card.card ? card.card.funding : null}
                        </Text>
                     </View>
                  </View>
                  <View style={{paddingTop: 30}}>
                     <Text style={styles.txtDetalheCard}>Vencimento:</Text>
                     <View style={styles.detalheCard}>
                        <Text style={styles.nameCard}>
                          {card.card ? card.card.exp_month : null}\{card.card ? card.card.exp_year : null}
                        </Text>
                     </View>
                  </View>
                  <View style={{paddingVertical: 30}}>
                     <TouchableOpacity style={styles.removerCard} onPress={() => deleteCard(card.id)}>
                        <Icon name="close-circle" size={20} color="red" />
                        <Text style={styles.txtDetalheCard}>Remover cartão</Text>
                     </TouchableOpacity>   
                  </View>
               </View>
            </View>   
         </Modal>   
    	</View>
  	);
}

const styles = StyleSheet.create({
   container: {
      flexDirection:"row", 
      alignItems: "center", 
      justifyContent: 'space-between', 
      paddingHorizontal: 20, 
      paddingTop: 10  
   },
	txtTitulo: {
    	fontFamily: 'Open Sans Bold',
    	fontSize: 15
  	},
   addCard: {
      fontFamily: 'Open Sans Bold',
      color: 'black',
      alignSelf:'center',
      paddingTop: 10  
   },
   txtDetalheCard: {
      fontFamily: 'Open Sans Light',
      marginHorizontal: 10
   },
  	containerCartao:{
  		flexDirection: "row",
  		height: 55,
  		alignItems: "center",
  		borderWidth: 1,
  		borderColor: '#CCC',
  		borderRadius: 10,
  		marginHorizontal: 20,
  		marginVertical: 5,
  		justifyContent: 'space-between',
  		paddingHorizontal: 20
  	},
    botaoAcessivel1: {
      flex: 1, 
      height: 55, 
      backgroundColor: 'red', 
      marginHorizontal: 10,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      backgroundColor: 'white'
   },
   botaoAcessivel: {
      flex: 1, 
      height: 55, 
      backgroundColor: 'red', 
      marginHorizontal: 10,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      backgroundColor: 'green'
   },
   txtDetalhes:{
      fontFamily: "Open Sans ExtraBold",
      fontSize: 13,
      color: "#FFF"
   },
   txtDetalhes1:{
      fontFamily: "Open Sans ExtraBold",
      fontSize: 13,
      color: "#999"
   },
   centeredView: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: 'rgba(0,0,0,0.8)'
   },
   modalView: {
      //height: windowHeight-64,
      backgroundColor: "white",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
   },
  	txtCartao: {
  		fontFamily: 'Open Sans Regular',
  		fontSize: 12
  	},
   detalheCard: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: 'space-between',
      marginHorizontal: 10
   },
   nameCard: {
      fontFamily: 'Open Sans ExtraBold',
      fontSize: 20
   },
   removerCard: {
      flexDirection: 'row', 
      alignItems: "center", 
      paddingHorizontal: 10
   }
})

export default App;


/*useEffect(() => {
      setIsFetching(true);

      axios.post('https://us-central1-myappdonate.cloudfunctions.net/retriveCards', {
         customerId: "cus_JTN1Hn79ORgziS"
      })
      .then((response) => {
         setCards(response.data.data);
         setIsFetching(false)
      })
      .catch(function (error) {
         console.warn(error);
      }); 

   }, [])*/
