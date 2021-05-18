import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from "axios";

const App = () => {
	const [cards, setCards] = useState([])
	const [isFetching, setIsFetching] = useState(false);

	useEffect(() => {
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

	}, [])

	const renderItem = ({ item }) => (
    	<TouchableOpacity style={styles.containerCartao}>
				<View>
					<Text style={{fontFamily: 'Open Sans Bold'}}>XXXX XXXX XXXX {item.card.last4}</Text>
					<Text style={styles.txtCartao}>Cartão de {item.card.funding}</Text>
				</View>	
				<Icon name="card-outline" size={40} color="black" />
		</TouchableOpacity>
  	);

  	return (
    	<View style={{flex: 1, backgroundColor: 'white'}}>
			<Text style={styles.txtTitulo}>
				Carteira
			</Text>
			<FlatList
	        data={cards}
	        renderItem={renderItem}
	        keyExtractor={item => item.id}
	        refreshing={isFetching}
      	/>
    	</View>
  	);
}

const styles = StyleSheet.create({
	txtTitulo: {
    	padding: 30,
    	fontFamily: 'Open Sans Bold',
    	fontSize: 15
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
  	txtCartao: {
  		fontFamily: 'Open Sans Regular',
  		fontSize: 12
  	}
})

export default App;
