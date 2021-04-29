import React from 'react'
import { View, Text, Button } from 'react-native'
import auth from '@react-native-firebase/auth';

const AwesomePage = () => {

	function SignOut(argument) {
		auth().signOut().then(() => console.log('User signed out!'));
	}

	return (
		<View>
			<Text>Tela de boas vindas e Logado</Text>
			<Button title="Deslogar" color="red" onPress={() => { SignOut() }} />
		</View>
	)
}

export default AwesomePage