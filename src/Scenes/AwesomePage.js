import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, StatusBar, FlatList, Pressable, Alert, Dimensions, TextInput, TouchableOpacity  } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import Icon from 'react-native-vector-icons/Ionicons';
import ButtonDoacao from "../Components/ButtonDoacao"
import DonateRoutes from "../Components/ModalDoacao"
import auth from '@react-native-firebase/auth';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AwesomePage = ({ navigation }) => {
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
		setUser(user);
	}, []);

  	const ENTIDADES = [
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

	const AGENDA = [
	  	{
	    	uri: require('../Assets/Images/agenda1.png'),
	    	title: "Deu a louca na Chef"
	  	},
	  	{
	    	uri: require('../Assets/Images/agenda2.png'),
	    	title: "Juntos pela Vila Gilda"	
	  	},
	  	{
	    	uri: require('../Assets/Images/agenda3.png'),
	    	title: "Juntos pelo Ronald"	
	  	}
	];


   const	callbackFuncao = () => { navigation.navigate('ListEntidade', {doacao: true}) };

	const renderEntidade = ({item, index}) => {
		return (
			<TouchableOpacity onPress={() =>  navigation.navigate('DetalhesEntidade', {item: item})} key={item.title}>
			<Image style={styles.avatarEntidades}
				resizeMode='stretch'
	         source={item.uri}
	         resizeMode='contain'
	      />	
	      </TouchableOpacity>
		)
	}

	const renderAgenda = ({item, index}) => {
		return (
			<TouchableOpacity onPress={() => navigation.navigate('DetalhesAgenda', {item: item})} key={item.title}>
				<Image style={styles.avatarAgenda}
		         source={item.uri}
		      />	
		   </TouchableOpacity>   
		)
	}

	return (
		<View style={{flex: 1}}>
		<ScrollView style={{flex:1, backgroundColor: '#FFF'}}>
			<View style={styles.containerSearchBar}>
				<TouchableOpacity style={styles.searchBar} onPress={() => navigation.navigate('ListEntidade', {doacao: false})}>
					<Text style={styles.placeholder}>
					 	Procure uma entidade
					</Text>
				</TouchableOpacity>
	    		<Image style={styles.avatar}
               source={{uri: user.photoURL }}
            />
	    	</View>
	    	<TouchableOpacity style={styles.containerBanner} onPress={() => navigation.navigate("Sobre")}>
		    	<Image style={styles.banner}
	            source={require('../Assets/Images/banner.png')}
	         />	
         </TouchableOpacity>
         <TouchableOpacity style={styles.titulo} onPress={() => navigation.navigate("ListEntidade", {doacao: false})}>
         	<Text style={styles.textTitulo}>Entidades</Text>
         	<Icon name="arrow-forward-outline" size={23} color="black" />
         </TouchableOpacity>
         <View style={styles.containerFlatList}>
		      <FlatList
		        	data={ENTIDADES}
		        	renderItem={renderEntidade}
		        	keyExtractor={item => item.title}
		        	horizontal={true} 
		      />
    		</View>
    		<TouchableOpacity style={styles.titulo} onPress={() => navigation.navigate("ListAgenda", {doacao: false})}>
         	<Text style={styles.textTitulo}>Agenda</Text>
         	<Icon name="chevron-forward-outline" size={23} color="black" />
         </TouchableOpacity>
         <View style={styles.containerFlatList}>
		      <FlatList
		        	data={AGENDA}
		        	renderItem={renderAgenda}
		        	keyExtractor={item => item.title}
		        	horizontal={true} 
		      />
    		</View>
	      <ButtonDoacao callback={callbackFuncao} />
		</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	containerSearchBar: { 
		paddingTop: 25,
		flexDirection: 'row', 
		alignItems:'center'  
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
	inputContainerStyle:{ 
		//borderColor: "#edbc00",
		marginLeft: 10,
		borderRadius: 1,
		backgroundColor: '#CCC'
	},
	avatar: {
      height: 45, 
      width: 45, 
      borderRadius: 45, 
      marginHorizontal: 10
   },
   containerBanner: {
   	alignItems: 'center', 
   	paddingHorizontal: 5, 
   	paddingTop: 25
	},
   banner: {
   	height: 117, 
      width: 343,
   },
   titulo: {
   	paddingTop: 25,
   	flexDirection: "row",
   	alignItems: "center",
   	justifyContent: 'space-between',
   	marginHorizontal: 10
   },
   textTitulo: {
   	fontFamily: "Open Sans Bold",
   	fontSize: 13
   },
   containerFlatList: {
   	paddingTop: 10
   },
   avatarEntidades: {
   	height: 108,
   	width: 94,
   	marginHorizontal: 3
   },
   avatarAgenda: {
   	height: 150,
   	width: 154,
   	marginHorizontal: 6
   },
   viewButton: {
   	height: 107
   }
})

export default AwesomePage

{/*<Autocomplete
	      		inputContainerStyle={{marginLeft: 10, borderRadius: 10}}
	      		renderTextInput={renderSearchBar}
	      		data={data.length === 1 && comp(query, data[0]) ? [] : data}
	      		defaultValue={query}
	      		placeholder={"Procure uma entidade"}
	      		onChangeText={text => () => setQuery( item )}
	      		keyExtractor= {(item, index) => item}
	      		renderItem={({ item, i }) => (
		        		<TouchableOpacity onPress={() => setQuery( item )}>
		          		<Text style={{fontSize: 20}}>{item}</Text>
		        		</TouchableOpacity>
	      		)}
	    		/>*/}