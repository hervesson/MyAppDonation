import React,{ useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Linking, Alert, ActivityIndicator } from 'react-native'
import { MaskService } from 'react-native-masked-text'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import axios from "axios";
//import data from "./payments.json"

const MinhasDoacoes = () => {
	const [modalVisible, setModalVisible] = useState(false);
	const [pagamento, setPagamento] = useState([])
	const [isFetching, setIsFetching] = useState(false);
	const [customerId, setCustomerId] = useState("");
	const [data, setData] = useState([])

	useEffect(() => {
      var user = auth().currentUser;
      firestore()
         .collection('Doadores')
         .doc(user.uid)
         .onSnapshot(documentSnapshot => {
            setCustomerId(documentSnapshot.data().customerId);
            retrivePayments(documentSnapshot.data().customerId)
            //console.warn('User data: ', documentSnapshot.data().customerId);
         });
   }, [])

	const retrivePayments = (customer) => {
      setIsFetching(true);

      axios.post('https://us-central1-myappdonate.cloudfunctions.net/retrivePaymentsIntents', {
         customerId: customer
      })
      .then((response) => {
         if(response.data.data.length > 0){
            console.log(response.data.data)
            setData(response.data.data)
         }else{
            console.log("Porra nenhuma")
         }
         setIsFetching(false);
      })
      .catch(function (error) {
         console.warn(error);
      }); 
   }

	const OpenURLButton = ({ url, children }) => {
	  const handlePress = useCallback(async () => {
	    	// Checking if the link is supported for links with custom URL scheme.
	    	const supported = await Linking.canOpenURL(url);

	    	if (supported) {
	      	// Opening the link with some app, if the URL scheme is "http" the web link should be opened
	      	// by some browser in the mobile
	      await Linking.openURL(url);
	    	} else {
	      	Alert.alert(`Don't know how to open this URL: ${url}`);
	    	}
	  	}, [url]);

	  	return <Text style={{fontFamily: 'Open Sans Regular', fontSize: 12, color:"blue", textDecorationLine: 'underline'}} numberOfLines={1} onPress={handlePress}>
	  		{url}
	  	</Text>	
	};

	const renderItem = ({ item }) => (
    	<View style={styles.container}>
    	<View style={{flex: 3}}>
    		<Text style={styles.txtDetalheCard}>Nome da instituição:</Text>
			<Text style={styles.nameCard}>{item.description}</Text>
			<Text style={{fontFamily: 'Open Sans Light', paddingTop: 10}}>Cartão:</Text>
			<View style={{flexDirection: 'row'}}>
				<Text style={styles.nameCard}>
					{item.charges.data[0].payment_method_details.card.brand}
				</Text>
				<Text style={{paddingLeft: 10, fontFamily: 'Open Sans Regular', fontSize: 12}}>
					**** **** **** {item.charges.data[0].payment_method_details.card.last4}
				</Text>
			</View>
			<Text style={{fontFamily: 'Open Sans Light', paddingTop: 10}}>Recibo:</Text>
			<OpenURLButton url={item.charges.data[0].receipt_url} />
			<Text style={{fontFamily: 'Open Sans Regular', fontSize: 12, paddingTop: 10}}>
				Data: {new Date(item.charges.data[0].created*1000).toLocaleDateString("pt-BR")}
			</Text>	
		</View>	
		<View style={{alignItems: 'flex-end', flex: 1}}>
			<Text style={{fontFamily: 'Open Sans Bold', fontSize: 12, color:"green"}}>
			 	Valor Doado
			</Text>
			<Text style={{fontFamily: 'Open Sans Bold', fontSize: 12, color:"green"}}>
				{MaskService.toMask('money', (item.amount).toString(), {
					precision: 2,
    				unit: 'R$',
    				separator: ',',
    				delimiter: '.'
				})}
			</Text>
		</View>
		</View>
  	);	

	return (
		<View style={{flex: 1, backgroundColor: 'white'}}>
			<Text style={styles.txtTitulo}>Doações Feitas</Text>
			
			{
            isFetching ? (
               <View style={{flex: 1, justifyContent: "center", alignItems: "center" }}>
                  <ActivityIndicator size="large" color="#960500" />
               </View>
            ) : (
               <FlatList
				      data={data}
				      renderItem={renderItem}
				      keyExtractor={item => item.id}
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
               	<Text style={styles.addCard}>Detalhes do cartão:</Text>
               	<Text style={styles.txtDetalheCard}>Nome da instituição:</Text>
               	<Text style={styles.nameCard}>{pagamento.description}</Text>
               </View>
            </View>
         </Modal>      
		</View>
	)
}

const styles = StyleSheet.create({
  	txtTitulo: {
    	padding: 30,
    	fontFamily: 'Open Sans Bold',
    	fontSize: 15
  	},
  	container: {
   	flexDirection: "row",
   	borderRadius: 10,
   	//backgroundColor: '#F8F8F8',
   	borderWidth: 2,
   	borderColor: '#F8F8F8',
   	marginVertical: 10,
   	padding:10,
   	borderRadius: 10,
   	marginHorizontal: 10
   },
   txtDetalheCard: {
      fontFamily: 'Open Sans Light',
   },
   nameCard: {
      fontFamily: 'Open Sans ExtraBold',
      fontSize: 15
   },
   addCard: {
      fontFamily: 'Open Sans Bold',
      color: 'black',
      alignSelf:'center',
      paddingTop: 10  
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
})  	

export default MinhasDoacoes