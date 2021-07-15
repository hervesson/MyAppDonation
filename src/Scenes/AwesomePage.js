import React, { useState, useEffect } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, ScrollView, StatusBar, FlatList, Pressable, Alert, Dimensions, Modal, TextInput, TouchableOpacity, Button} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import {  DrawerActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import ButtonDoacao from "../Components/ButtonDoacao"
import CadastroRoutes from "../Components/ModalCadastro"
import auth from '@react-native-firebase/auth';

import Reactotron from 'reactotron-react-native'
import api from "../Services/Api"

import User from "../Assets/Images/avatar.svg"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AwesomePage = ({ navigation }) => {
	const [user, setUser] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [activeCene, setActiveCene] = useState("");
	const [usuario, setUsuario] = useState(false)

	useEffect(() => {
		api.get('/events')
    	.then((response) => {
    		Reactotron.log(response.data)	
    	}).catch(function (error) {
         console.log(error);
      }); 
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
	    	title: "Deu a louca na Chef",
	    	dia: "02/02/2022",
	    	noticia: "....A chef ficou louca..."
	  	},
	  	{
	    	uri: require('../Assets/Images/agenda2.png'),
	    	title: "Juntos pela Vila Gilda",
	    	dia: "12/06/2022",
	    	noticia: "....Vamos se juntar todos pela vila Gilda..."	
	  	},
	  	{
	    	uri: require('../Assets/Images/agenda3.png'),
	    	title: "Juntos pelo Ronald",
	    	dia: "8/12/2022",
	    	noticia: "....Vamos se juntar todos pela Ronald..."	
	  	}
	];

	const DOACOES = [
	  	{
	    	titulo: "Sexta Básica",
	    	preco: 600,
	    	data: "12/06/2021"
	  	},
	  	{
	    	titulo: "Sexta Básica",
	    	preco: 600,
	    	data: "09/06/2021"
	  	}
	];


   const	callbackFuncao = () => { navigation.navigate('DetalhesEntidade')};

   const AbrirModal = (props) => {
		setActiveCene(props);
		setModalVisible(true)
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

	const renderNoticias = ({item, index}) => {
		return (
			<TouchableOpacity onPress={() =>  navigation.navigate('DetalhesNoticia', {item: item})} key={item.title}>
				<Image style={styles.avatarAgenda}
					resizeMode='stretch'
		         source={item.uri}
		         resizeMode='contain'
		      />	
		      <Text style={{fontFamily: "Open Sans Regular", fontSize: 12, textAlign: "center" }}>
		      	{item.title}
		      </Text>
	      </TouchableOpacity>
		)
	}

	function renderDoacoes(){
		return DOACOES.map((item, index) => 
			<View style={styles.containerDoacao}>
				<View style={{flex:1, alignItems: "flex-start", justifyContent: "center", marginLeft: 20}}>
					<Text style={{fontFamily: "Open Sans Regular"}}>{item.titulo}</Text>
				</View>
				<View style={{flex:1, alignItems: "flex-end", justifyContent: "center", marginRight: 20}}>
					<Text style={{fontFamily: "Open Sans Bold"}}>R${item.preco}</Text>
					<Text style={{fontFamily: "Open Sans Regular", fontSize: 11, color: "#960500"}}>{item.data}</Text>
				</View>
			</View>	
		)
	}
	
	return (
		<View style={{flex: 1}}>
		<ScrollView style={{flex:1, backgroundColor: '#FFF'}}>

			<View style={{flexDirection: 'row', height: 70}}>

				<View style={{flex: 1, justifyContent: "center"}}>
					<TouchableOpacity style={{marginLeft: 5}} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
						<Icon name="menu" size={33} color="black" />
					</TouchableOpacity>
				</View>

				<TouchableOpacity style={styles.containerSearchBar} onPress={() => AbrirModal("logar")}>
					<Text style={styles.txtPrincipal}>Entre ou cadastre-se</Text>
					{
						user ?
							<Image style={styles.avatar}
	               		source={{uri: user.photoURL }}
	            		/>
	            	:
	            		<User width={40} height={40} fill="#000" />	
					}
		    	</TouchableOpacity>
	    	</View>

	    	{	
	    		usuario == false ?
		    		<View>
			    		<ImageBackground source={require("../Assets/Images/BannerRecebedor.jpeg")} style={styles.auxilio}>
				    		<Text style={styles.txtChamada}>
				    			Precisando de auxílio ?
				    		</Text>
				    		<TouchableOpacity style={{height: 30, backgroundColor: "#fbb600", width: 100, justifyContent: "center", alignItems: "center", borderRadius: 30  }}
				    			onPress={() => AbrirModal("cadastroBeneficiario1")}>
					    		<Text style={{fontFamily: "Open Sans SemiBold", fontSize: 14, color: "white"}}>
					    			Cadastre-se
					    		</Text>
				    		</TouchableOpacity>
				    	</ImageBackground>
			    	
				    	<ImageBackground source={require('../Assets/Images/BannerDoador.jpeg')} style={styles.auxilio}>
						   <Text style={styles.txtChamada}>
				    			Faça alguém sorrir agora mesmo
				    		</Text>
				    		<TouchableOpacity style={{height: 30, backgroundColor: "#960500", width: 130, justifyContent: "center", alignItems: "center", borderRadius: 30 }}
				    			onPress={() => AbrirModal("cadastroDoador")}>
					    		<Text style={{fontFamily: "Open Sans SemiBold", fontSize: 14, color: "white"}}>
					    			Seja um doador
					    		</Text>
				         </TouchableOpacity>
				      </ImageBackground>
				   </View>  
			   : usuario == "beneficiario" ? 
			   	<View>
				   	<ImageBackground source={require("../Assets/Images/BannerRecebedor.jpeg")} style={styles.auxilio}>
					    	<Text style={styles.txtChamada}>
					    		Do que você precisa ?
					    	</Text>
					    	<TouchableOpacity style={{height: 30, backgroundColor: "#fbb600", width: 130, justifyContent: "center", alignItems: "center", borderRadius: 30  }}
					    		onPress={() => AbrirModal("cadastroBeneficiario1")}>
						    	<Text style={{fontFamily: "Open Sans SemiBold", fontSize: 14, color: "white"}}>
						    		Solicite agora
						    	</Text>
					    	</TouchableOpacity>
					   </ImageBackground> 
					   <Text style={styles.txtPrincipal}>Últimas doações recebidas</Text>
				   	{renderDoacoes()}
				   </View>
			   : usuario == "doador" ? 
			   	<View>
				    	<ImageBackground source={require('../Assets/Images/BannerDoador.jpeg')} style={styles.auxilio}>
						   <Text style={styles.txtChamada}>
				    			Ajude uma família!
				    		</Text>
				    		<TouchableOpacity style={{height: 30, backgroundColor: "#960500", width: 120, justifyContent: "center", alignItems: "center", borderRadius: 30 }}
				    			onPress={() => AbrirModal("cadastroDoador")}>
					    		<Text style={{fontFamily: "Open Sans SemiBold", fontSize: 14, color: "white"}}>
					    			Doar agora
					    		</Text>
				         </TouchableOpacity>
				      </ImageBackground> 
				      <Text style={{fontFamily: "Open Sans Regular", fontSize: 12, color: "#960500", textAlign: "center", marginVertical: 6}}>
				      	Voce já ajudou 4 familias!
				      </Text>
					   <Text style={styles.txtPrincipal}>Últimas doações enviadas</Text>
				   	{renderDoacoes()}
				   </View> 
				: null
	    	}

		    	
	         
         <TouchableOpacity style={styles.titulo} onPress={() => navigation.navigate("ListAgenda", {doacao: false})}>
         	<Text style={styles.textTitulo}>Eventos</Text>
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

         <View style={styles.containerNoticias}>
         	<View style={styles.tituloNoticias}>
         		<Text style={styles.textTitulo}>Últimas notícias</Text>
         		<Icon name="arrow-forward-outline" size={23} color="black" />
         	</View>
		      <FlatList
		        	data={AGENDA}
		        	renderItem={renderNoticias}
		        	keyExtractor={item => item.title}
		        	horizontal={true} 
		      />
    		</View>

    		<Modal
	        	animationType="slide"
	        	transparent={true}
	        	visible={modalVisible}
	        	onRequestClose={() => {
	          	//Alert.alert("Modal has been closed.");
	          	setModalVisible(!modalVisible);
	        	}}
      	>
	        	<View style={styles.centeredView}>
          		<View style={styles.modalView}>
		         	<CadastroRoutes activeCene={activeCene}/>
		      	</View>
		      </View>
      	</Modal>
      	
      	<View style={styles.viewButton} />

		</ScrollView>

		<ButtonDoacao callback={callbackFuncao} />

		</View>
	)
}

const styles = StyleSheet.create({
	containerSearchBar: { 
		flexDirection: 'row', 
		alignItems:'center',
		justifyContent: "flex-end",
		paddingHorizontal: 10  
	},
	containerDoacao: {
		flexDirection: "row",
		height: 60, 
		borderWidth: 1, 
		marginTop: 10, 
		marginHorizontal: 10,
		borderRadius:5,
		borderColor: '#e9e9e9'
	},
	txtPrincipal: {
		fontFamily: 'Open Sans SemiBold', 
		fontSize: 14, 
		paddingRight: 10,
		marginLeft:10,
	},
	avatar: {
      height: 45, 
      width: 45, 
      borderRadius: 45, 
      marginHorizontal: 10
   },
   auxilio: {
   	borderRadius: 30,
   	height: 120,
   	justifyContent: "center",
   	paddingLeft: 20,
   	margin: 10
   },
   txtChamada: {
   	fontFamily: "Open Sans Bold", 
   	fontSize: 16, 
   	color: "white",
   	marginVertical:10
   },
   containerBanner: {
   	alignItems: 'center', 
   	paddingHorizontal: 5
	},
   titulo: {
   	paddingTop: 25,
   	flexDirection: "row",
   	alignItems: "center",
   	justifyContent: 'space-between',
   	marginHorizontal: 10
   },
   tituloNoticias: {
   	flexDirection: "row",
   	alignItems: "center",
   	justifyContent: 'space-between',
   	marginVertical: 20,
   	marginHorizontal: 10

   },
   textTitulo: {
   	fontFamily: "Open Sans Bold",
   	fontSize: 13
   },
   containerFlatList: {
   	paddingTop: 10
   },
   containerNoticias: {
   	backgroundColor: "#e9e9e9",
   	paddingBottom: 30,
   	marginTop: 25
   },
   avatarAgenda: {
   	height: 150,
   	width: 154,
   	marginHorizontal: 6
   },
   viewButton: {
   	height: 90
   },
   centeredView: {
    	flex: 1,
    	//justifyContent: "flex-end",
    	backgroundColor: 'rgba(0,0,0,0.8)'
  	},
  	modalView: {
  		height: "100%",
    	backgroundColor: "white",
    	//borderTopLeftRadius: 20,
    	//borderTopRightRadius: 20,
    	shadowColor: "#000",
    	shadowOffset: {
      	width: 0,
      	height: 2
    	},
    	shadowOpacity: 0.25,
    	shadowRadius: 4,
    	elevation: 5
  	}
})

export default AwesomePage

