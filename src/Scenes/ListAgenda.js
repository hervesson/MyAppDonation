import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import Timeline from 'react-native-timeline-flatlist'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ListAgenda = ({ navigation  }) => {

	const data = [
      {
        data: '10/06/21', 
        title: 'Juntos pela vila Gilda', 
        description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need... ',
        lineColor:'#009688',
        uri: require('../Assets/Images/agenda2.png')
      },
      {
        data: '10/06/21', 
        title: 'Juntos pela vila Gilda', 
        description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.',
        uri: require('../Assets/Images/agenda2.png')
      },
      {
        data: '10/06/21', 
        title: 'Juntos pela vila Gilda', 
        description: 'Team sport played between two teams of eleven players with a spherical ball. ',
        lineColor:'#009688', 
        uri: require('../Assets/Images/agenda2.png')
      },
      {
        data: '21/06/21', 
        title: 'Todos Por Ronald', 
        description: 'Look out for the Best Gym & Fitness Centers around me :)', 
        uri: require('../Assets/Images/agenda3.png')
      }
   ]

	const renderItem = ({ item }) => (
    	<TouchableOpacity style={styles.container} onPress={() => navigation.navigate('DetalhesAgenda', {item: item})}>
			<View style={styles.containerData}>
				<Text style={styles.data}>
					{item.data}
				</Text>
				<View style={styles.divisor}>
				</View>
			</View>
			<View style={styles.containerAgenda}>
				<Image style={styles.bannerEvento}
               source={item.uri}
               resizeMode="contain"
            />
            <Text style={styles.txtAgenda}>{item.title}</Text>
			</View>
		</TouchableOpacity>
  	);	


	return ( 
		<View style={{flex: 1, backgroundColor: 'white'}}>
			<Text style={styles.txtTitulo}>Agenda de eventos</Text>
			<FlatList
	        data={data}
	        renderItem={renderItem}
	        keyExtractor={item => item.id}
      	/>
		</View>
	)
}

const styles = StyleSheet.create({
  	txtTitulo: {
    	padding: 30,
    	fontFamily: 'Open Sans Bold',
    	fontSize: 15
  	},
  	container:{
  		flexDirection: "row", 
  		backgroundColor: 'white'
  	},
  	containerData:{
  		flexDirection: 'row',
  		width: 100
  	},
  	divisor: {
  		backgroundColor:"black", 
  		height: 130, width: 5
  	},
  	bannerEvento: {
  		height: 108,
   	width: 94,
   	margin: 10
  	},
  	data: {
  		fontFamily: 'Open Sans Bold',
  		fontSize: 13,
  		paddingHorizontal: 5
  	},
  	txtAgenda: {
  		fontFamily: 'Open Sans ExtraBold',
  		marginTop: 15,
  		flex: 1
  	},
  	containerAgenda: {
  		borderColor: '#EFEFEF',
  		marginVertical: 10,
  		borderWidth: 1,
  		borderRadius: 10,
  		flexDirection: 'row',
  		width: windowWidth-120,
  	}
});

export default ListAgenda