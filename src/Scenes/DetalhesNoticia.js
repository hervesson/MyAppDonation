import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, SafeAreaView, Button, Image, Dimensions, TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DetalhesNoticia = ({ route, navigation }) => {

	const { item } = route.params;

   return (
      <SafeAreaView style={{flex: 1}}>
         <View style={styles.containerSupe}>
            <Image style={styles.avatar}
               source={item.uri}
               //resizeMode="contain"
            />
         </View>
         <View style={styles.containerInfe}>
         	<View style={{flexDirection: 'row', alignItems: "center", justifyContent: 'flex-end', paddingTop: 20, paddingRight: 20}}>
         		<View  style={{width: 10, height: 10, backgroundColor: '#fbb600', borderRadius: 30 }}/>
         		<Text style={{fontFamily: 'Open Sans Regular', fontSize: 10, paddingLeft: 8}}>
         			{item.dia}
         		</Text>
         	</View>
     			<Text style={styles.titulo}>
     				{item.title}
     			</Text>
     			<Text style={{fontFamily: "Open Sans Regular", paddingHorizontal: 20}}>
  					{item.noticia}
     			</Text>
         </View>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
   containerSupe: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: "center",
      alignItems: "center",
   },
   containerInfe: {
      flex: 2,
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      marginTop: -20
   },
   titulo: {
   	fontFamily: "Open Sans SemiBold",
   	fontSize: 18,
   	padding: 20
   },
   avatar: {
      height: "100%",
      width: "100%"
   }
});

export default DetalhesNoticia



