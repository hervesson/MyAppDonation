import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native'
import auth from '@react-native-firebase/auth';

import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))

import { SignedOutRoutes, SignedInRoutes } from './routes';


const App = () => {
	const [initializing, setInitializing] = useState(false);
   const [user, setUser] = useState();

   function onAuthStateChanged(user) {
    	setUser(user);
    	if (initializing) setInitializing(false);
  	}

  	useEffect(() => {
    	const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    	return subscriber; // unsubscribe on unmount
  	}, []);

  
  	return (
    	<SignedInRoutes />
  	);	 	
}

export default App
