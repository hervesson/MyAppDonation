import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Animated  } from "react-native";

const { width, height } = Dimensions.get('window');
const altPhoto = width * 0.8
const altura = height-30;

export default class ButtonConversa extends Component {
   render() {
  	   return(
  			<Animated.View style={styles.animated}>
            <TouchableOpacity style={styles.container} onPress={() => { this.props.callback()}}>
               <Text style={styles.texto}>
                  Fazer Doação
               </Text>
            </TouchableOpacity>
         </Animated.View>
  	   );
  }
}

const styles = StyleSheet.create({
 	animated:{
 		flex: 1,
      paddingTop: 25,
    	position: "absolute",
    	width,
    	height: altura,
    	alignItems: "center",
    	justifyContent: "flex-end",
    },
 	texto:{
 		fontFamily: "Open Sans ExtraBold",
    	fontSize: 20,
    	color: "#FFF"
 	},
   container:{
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      //borderColor: "#fff",
      //borderWidth: 2,
      height: 77,
      width: 343,
      borderRadius: 20,
      backgroundColor: "#F7344B"
   },       
});
