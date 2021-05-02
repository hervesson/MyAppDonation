import React, { useState, useEffect} from 'react'
import { View, Text } from 'react-native'

import CenaOne from "./CenasModal/CenaOne";
import CenaTwo from "./CenasModal/CenaTwo"
import CenaThree from "./CenasModal/CenaThree"
import CenaFour from "./CenasModal/CenaFour"

const ModalDoacao = () => {
	let [activeComponent, setActiveComponent] = useState(<CenaOne callback={callbackFuncao} />);
	const [componentName, setComponentName] = useState("")

	function callbackFuncao(values){
		setComponentName(values)
	};

	useEffect(() => {
    	switch (componentName) {
      	case "cenaOne":
        	   setActiveComponent(<CenaOne callback={callbackFuncao} />);
         break;

      	case "cenaDois":
        		setActiveComponent(<CenaTwo callback={callbackFuncao} />);
        	break;

         case "cenaThree":
            setActiveComponent(<CenaThree callback={callbackFuncao} />);
         break;

         case "cenaFour":
            setActiveComponent(<CenaFour />);
         break;

      	default:
        		setActiveComponent(<CenaOne callback={callbackFuncao} />);
        	break;
    	}
  	}, [componentName]);

	return (
	   <View>
	   	{activeComponent} 
	   </View>
	)
}

export default ModalDoacao
