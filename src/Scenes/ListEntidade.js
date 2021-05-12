import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TextInpu, FlatList, TextInput, TouchableOpacity, Modal } from 'react-native'
import Autocomplete from 'react-native-autocomplete-input';
import DonateRoutes from "../Components/ModalDoacao"
import auth from '@react-native-firebase/auth';

const ListEntidade = ({  route, navigation  }) => {
	const [query, setQuery] = useState("")
	const [Profissoes, setProfissoes] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [entidade, setEntidade] = useState("");
	const [user, setUser] = useState([]);

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
		setUser(user)
	}, [])

	function renderSearchBar(props){
		return(
			<TextInput style={{height: 50, backgroundColor: '#F8F8F8', borderRadius: 10 }} 
				autoFocus={true} 
				style={styles.placeholder} 
				placeholder={"Procure uma entidade"}
				placeholderStyle={{fontFamily: 'Open Sans Regular'}}
			/>
		)
	}

	function _filterData(query) {
    	if (query === ''){
      	return [];
    	}
    	const regex = new RegExp(`${query.trim()}`, 'i');
    	return Profissoes.filter(Profissoes => Profissoes.search(regex) >= 0);
  	}

  	const data = _filterData(query);
  	const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();


  	const DATA = [
	  	{
	    	uri: require('../Assets/Images/lar.png'),
	    	title: 'Instituição Lar de Maria',
	  	},
	  	{
	    	uri: require('../Assets/Images/santo.png'),
	    	title: 'Lar Santo Antonio',
	  	},
	  	{
	    	uri: require('../Assets/Images/paz.png'),
	    	title: 'Instituição Paz e Bem',
	  	},
	  	{
	    	uri: require('../Assets/Images/nosso.png'),
	    	title: 'Nosso lar',
	  	}
	];

	function openModal(item){
		setEntidade(item);
		setModalVisible(true)
	}
  	

  	const renderItem = ({ item }) => (
    	<TouchableOpacity style={styles.containerItems} 
    		onPress={() => { doacao ? openModal(item) : navigation.navigate('DetalhesEntidade', {item: item})}}>
    		<Image style={styles.avatarEntidades}
				resizeMode='stretch'
	         source={item.uri}
	         resizeMode='contain'
	      />	
	      <View>
		    	<Text style={styles.title}>{item.title}</Text>
		    	<Text style={styles.descricao}>
		    		Lorem ipsum dolor sit 
				</Text>
				<Text style={styles.descricao}>
		    		amet, consectetur adipiscing elit.
				</Text>	
			</View>	
	  	</TouchableOpacity>
  	);

  	const { doacao } = route.params;

	return (
		<View style={{backgroundColor: 'white', flex: 1}}>
			<View style={styles.containerSearchBar}>
				<TextInput style={styles.searchBar} placeholder={"Procure uma entidade"} 
					autofocus 
					placeholderTextColor={"black"}
					style={{fontFamily: 'Open Sans Light', flex: 1, backgroundColor: '#F8F8F8', marginLeft: 10, borderRadius: 10, paddingLeft: 10, }}>
				</TextInput>
	    		<Image style={styles.avatar}
               source={{uri: user.photoURL }}
            />
	    		
	    	</View>
	    	{
	    		doacao ? (
	    		 	<Text style={styles.doacao}>
	    				Muito bem! Para qual entidade gostaria de fazer sua doação?
	    			</Text>
	    		) : null
	    	}
	    	
	    	<FlatList
	        	data={DATA}
	        	renderItem={renderItem}
	        	keyExtractor={item => item.id}
	      />
	      <Modal
			      animationType="slide"
			      transparent={true}
			      visible={modalVisible}
			      onRequestClose={() => { setModalVisible(!modalVisible) }}
			   >
			      <View style={styles.centeredView}>
          			<View style={styles.modalView}>
		         		<DonateRoutes entidade={entidade}/>
		         	</View>
		         </View>	
	      	</Modal>
		</View>
	)
}

const styles = StyleSheet.create({
	containerSearchBar: { 
		paddingTop: 25,
		flexDirection: 'row',
		alignItems:'center'  
	},
	avatar: {
      height: 45, 
      width: 45, 
      borderRadius: 45, 
      marginHorizontal: 10
   },
   doacao: {
   	fontFamily: 'Open Sans Bold',
   	fontSize: 15,
   	padding: 10
   },
    avatarEntidades: {
   	height: 108,
   	width: 94,
   	marginHorizontal: 3
   },
   searchBar: {
		height: 50, 
		backgroundColor: '#F8F8F8', 
		borderRadius: 10, 
		marginLeft: 10, 
		borderRadius: 10, 
		flex: 1,
		justifyContent: "center", 
		paddingLeft: 10, 
		//borderColor: '#707070', 
		//borderWidth: 1  
	},
	placeholder: {
		fontFamily: 'Open Sans Light'
	},
   title: {
   	fontFamily: 'Open Sans Bold',
   	marginLeft: 10,
   	fontSize: 15,
   	marginBottom: 5
   },
   descricao: {
   	fontFamily: 'Open Sans Regular',
   	fontSize: 11,
   	marginLeft: 10,
   },
   containerItems: {
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
   centeredView: {
    	flex: 1,
    	justifyContent: "flex-end"
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

export default ListEntidade