import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, StatusBar, SafeAreaView, FlatList, Modal, Pressable, Alert, Dimensions, TextInput  } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import Icon from 'react-native-vector-icons/Ionicons';
import ButtonDoacao from "../Components/ButtonDoacao"
import DonateRoutes from "../Components/ModalDoacao"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AwesomePage = () => {
	const [query, setQuery] = useState("")
	const [Profissoes, setProfissoes] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);

  	const ENTIDADES = [
	  	{
	    	id: require('../Assets/Images/lar.png'),
	  	},
	  	{
	    	id: require('../Assets/Images/santo.png'),	
	  	},
	  	{
	    	id: require('../Assets/Images/paz.png'),
	  	},
	  	{
	    	id: require('../Assets/Images/nosso.png'),
	  	}
	];

	const AGENDA = [
	  	{
	    	id: require('../Assets/Images/agenda1.png'),
	  	},
	  	{
	    	id: require('../Assets/Images/agenda2.png'),	
	  	},
	  	{
	    	id: require('../Assets/Images/agenda3.png'),
	  	}
	];

	function _filterData(query) {
    	if (query === ''){
      	return [];
    	}
    	const regex = new RegExp(`${query.trim()}`, 'i');
    	return Profissoes.filter(Profissoes => Profissoes.search(regex) >= 0);
  	}

  	const data = _filterData(query);
  	const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

  	callbackFuncao = () => {setModalVisible(true)};

	renderEntidade = ({item, index}) => {
		return (
			<Image style={styles.avatarEntidades}
	         source={item.id}
	         resizeMode='contain'
	      />	
		)
	}

	renderAgenda = ({item, index}) => {
		return (
			<Image style={styles.avatarAgenda}
	         source={item.id}
	      />	
		)
	}

	function renderSearchBar(props){
		return(
			<TextInput  {...props} style={{height: 50, backgroundColor: '#F8F8F8', borderRadius: 10 }}/>
		)
	}

	return (
		<View style={{flex: 1}}>
		<ScrollView style={{flex:1, backgroundColor: '#FFF'}}>
			<View style={styles.containerSearchBar}>
				<Autocomplete
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
	    		/>
	    		<Image style={styles.avatar}
               source={require('../Assets/Images/avatar.jpg')}
            />
	    	</View>
	    	<View style={styles.containerBanner}>
		    	<Image style={styles.banner}
	            source={require('../Assets/Images/banner.png')}
	         />	
         </View>
         <View style={styles.titulo}>
         	<Text style={styles.textTitulo}>Entidades</Text>
         	<Icon name="arrow-forward-outline" size={23} color="black" />
         </View>
         <View style={styles.containerFlatList}>
		      <FlatList
		        	data={ENTIDADES}
		        	renderItem={renderEntidade}
		        	keyExtractor={item => item.id}
		        	horizontal={true} 
		      />
    		</View>
    		<View style={styles.titulo}>
         	<Text style={styles.textTitulo}>Agenda</Text>
         	<Icon name="chevron-forward-outline" size={23} color="black" />
         </View>
         <View style={styles.containerFlatList}>
		      <FlatList
		        	data={AGENDA}
		        	renderItem={renderAgenda}
		        	keyExtractor={item => item.id}
		        	horizontal={true} 
		      />
    		</View>
	    		<Modal
			      animationType="slide"
			      transparent={true}
			      visible={modalVisible}
			      onRequestClose={() => { setModalVisible(!modalVisible) }}
			   >
			      <View style={styles.centeredView}>
          			<View style={styles.modalView}>
		         		<DonateRoutes />
		         	</View>
		         </View>	
	      	</Modal>
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
	inputContainerStyle:{ 
		//borderColor: "#edbc00",
		marginLeft: 10,
		borderRadius: 1,
		backgroundColor: '#CCC'
	},
	avatar: {
      height: 55, 
      width: 55, 
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
   	fontFamily: "Open Sans ExtraBold",
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
   	marginHorizontal: 3
   },
   viewButton: {
   	height: 107
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

export default AwesomePage