import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, SafeAreaView, Button } from 'react-native'
import auth from '@react-native-firebase/auth';

const Subscribe = () => {
	const [Email, setEmail] = React.useState("");
   	const [Senha, setSenha] = React.useState("");

	function Subscribe(argument) {
		auth()
        .createUserWithEmailAndPassword(Email, Senha)
        .then(() => {
          console.warn('User account created & signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.warn('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.warn('That email address is invalid!');
          }

          console.error(error);
        });
	}

	return (
		<SafeAreaView>
         <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={Email}
            placeholder="Email"
         />
         <TextInput
            style={styles.input}
            onChangeText={setSenha}
            value={Senha}
            placeholder="Senha"
            keyboardType="numeric"
         />
         <Button title="Logar" color="green" onPress={() => {Subscribe()}}/>
      </SafeAreaView>
	)
}

const styles = StyleSheet.create({
   input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
   },
});

export default Subscribe