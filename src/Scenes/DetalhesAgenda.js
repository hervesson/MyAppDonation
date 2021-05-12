import React, { useState, useCallback } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, PixelRatio, Button, TouchableOpacity, Modal } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import DonateRoutes from "../Components/ModalDoacao"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DetalhesEntidade = ({  route, navigation  }) => {
	const [modalVisible, setModalVisible] = useState(false);

	const [playing, setPlaying] = useState(false);

  	const onStateChange = useCallback((state) => {
    	if (state === "ended") {
      	setPlaying(false);
      	Alert.alert("video has finished playing!");
    	}
  	}, []);
	
	const togglePlaying = useCallback(() => {
    	setPlaying((prev) => !prev);
  	}, []);	

  	const { item } = route.params;

	return (
		<ScrollView style={{flex: 1}}>
			<Image style={styles.banner}
				resizeMode='stretch'
	         source={require('../Assets/Images/bannerBig.png')}
	      />
	      <ScrollView style={styles.containerDetalhes}>
	      	<Text style={styles.txtDetalhes}>{item.title}</Text>
	      	<View style={styles.container}>
		      	<Text style={styles.txtDetalhes1}>
		      		Lorem ipsum dolor sit amet, 
					</Text>
					<Text style={styles.txtDetalhes1}>
						consectetur adipiscing elit.
					</Text>
				</View>	
				<View style={styles.conatainerDescricaoVideo}>
					<Text style={styles.txtDetalhes1}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet erat eu quam cursus ullamcorper vel sed sem. Etiam faucibus malesuada lectus vitae ultrices. Aenean facilisis velit vel condimentum mattis.
					</Text>
				</View>
				<View style={styles.containerVideo}>
			      <YoutubePlayer
			        	height={200}
			        	width={windowWidth -20}
			        	play={playing}
			        	videoId={"ucTPOnJT3n0"}
			        	onChangeState={onStateChange}
			      />
	    		</View>
	    		<View style={styles.conatainerDescricaoVideo}>
					<Text style={styles.txtDetalhes1}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet erat eu quam cursus ullamcorper vel sed sem. Etiam faucibus malesuada lectus vitae ultrices. Aenean facilisis velit vel condimentum mattis.
					</Text>
				</View>
				<View style={{flexDirection: 'row'}}>
					<TouchableOpacity style={styles.botaoAcessivel}>
		            <Text style={styles.texto}>
		               Conhecer entidade 
		            </Text>
         		</TouchableOpacity>
	         	<TouchableOpacity style={styles.botaoAcessivel}>
		            <Text style={styles.texto}>
		               Local do evento
		            </Text>
	         	</TouchableOpacity>
				</View>
				<TouchableOpacity style={styles.containerButton}>
	            <Text style={styles.texto}>
	               Compartilhar 
	            </Text>
         	</TouchableOpacity>
         	<TouchableOpacity style={styles.containerButton1} onPress={() => setModalVisible(true)}>
	            <Text style={styles.txtDoacao}>
	               Fazer Doação
	            </Text>
         	</TouchableOpacity>
	      </ScrollView>
	      <Image style={styles.imageEntidade}
				resizeMode='stretch'
		      source={item.uri}
	      />
	      <Modal
			   animationType="slide"
			   transparent={true}
			   visible={modalMapa}
			   onRequestClose={() => { setModalMapa(!modalMapa) }}
			>
				<View style={styles.centeredView}>
					<View style={styles.containerMap}>
						<Text style={styles.txtMapa}>Local do Evento</Text>
				      <MapView
						   style={{ flex: 1, borderRadius:5, borderWidth:2, borderColor:"#CCC"}}
						   initialRegion={{
						      latitude: 37.78825,
						      longitude: -122.4324,
						      latitudeDelta: 0.05,
						      longitudeDelta: 0.05
						   }}
						/>
				   </View>
				</View>
			</Modal>
	      <Modal
			   animationType="slide"
			   transparent={true}
			   visible={modalVisible}
			   onRequestClose={() => { setModalVisible(!modalVisible) }}
			>
			  	<View style={styles.centeredView}>
          		<View style={styles.modalView}>
		         	<DonateRoutes entidade={item}/>
		         </View>
		      </View>	
	      </Modal>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	banner: {
		height: 152,
		alignSelf: 'center' 
	},
	imageEntidade: {
		width: 113,
		height: 102,
		position: 'absolute',
		marginTop: 65,
		alignSelf: "center"
	},
	containerDetalhes: {
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		marginTop: -30,
		paddingTop: 50,
		width: windowWidth,
		//height: windowHeight,
		backgroundColor: 'white',
		//position: 'absolute',
	},
	txtDetalhes: {
		fontSize: 15,
		fontFamily: 'Open Sans ExtraBold',
		alignSelf: "center"
	},
	container: {
		paddingTop: 10
	},
	txtDetalhes1: {
		fontFamily: 'Open Sans Regular',
		fontSize: 11,
		alignSelf: "center",
	},
	botaoAcessivel: {
		flex: 1, 
		height: 55, 
		backgroundColor: 'red', 
		marginHorizontal: 10,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
		backgroundColor: '#fbb600'
	},
	containerVideo: {
		paddingTop: 5,
		alignItems: "center"
	},
	conatainerDescricaoVideo: {
		paddingHorizontal: 20,
		paddingVertical: 20
	},
	player: {
    	alignSelf: 'stretch',
    	marginVertical: 10,
  	},
  	containerButton:{
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
 	},
 	containerButton1: {
 		marginTop: 20,
      justifyContent: "center",
      alignItems: "center",
      height: 77,
      width: 343,
      borderRadius: 10,
      backgroundColor: "#960500",
      alignSelf: 'center',
      marginBottom: 10
 	},
 	txtDoacao: {
 		fontFamily: "Open Sans ExtraBold",
    	fontSize: 20,
    	color: "#FFF"
 	},
 		centeredView: {
    	flex: 1,
    	justifyContent: "flex-end",
    	backgroundColor: 'rgba(0,0,0,0.8)',
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
  	containerMap: {
  		backgroundColor: 'white',
    	height: 500,
    	width:windowWidth,
  	},
  	txtMapa: {
  		fontFamily: 'Open Sans ExtraBold',
  		color: 'black',
  		fontSize: 18,
  		alignSelf: 'center',  
  		paddingVertical: 20
  	}
})

export default DetalhesEntidade;


/*	<Image style={styles.imageEntidade}
				resizeMode='stretch'
		      source={require('../Assets/Images/santo.png')}
	      />*/