import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const Sobre = () => {
	return (
		<View style={{flex: 1}}>
			<View style={styles.containerSupe}>
				<Image style={styles.avatar}
               source={require('../Assets/Images/logoAB.png')}
               resizeMode= 'contain'
            />
            <View style={styles.detalhes}>
            <Text style={styles.txtDetalhes}>Doarme.me</Text>
            <Text style={styles.txtDetalhes}>Versão 0.0.1</Text>
            <Text style={styles.txtDetalhes}>2BSolutions</Text>
            </View>
			</View>
			<View style={styles.containerInfe}>
				<Text style={styles.txtSobre}>O Aplicativo sem fome........</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
   containerSupe: {
      flex: 1,
      backgroundColor: '#960500',
      //justifyContent: "center",
      flexDirection: 'row',
      alignItems: "center",
      paddingLeft: 20
   },
   containerInfe: {
      flex: 3,
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      marginTop: -20,
      padding: 10
   },
   avatar: {
      height: 130,
      width: 70
   },
   detalhes: {
   	paddingLeft: 20
   },
   txtDetalhes: {
   	fontFamily: 'Open Sans bold',
   	fontSize: 17
   },
   txtSobre:{
   	fontSize: 18,
   	fontFamily: 'Open Sans Regular'
   }
});

export default Sobre