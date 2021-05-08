import React, { useState, useEffect} from 'react'
import { View, Text } from 'react-native'

import CenaOne from "./CenasModal/CenaOne";
import CenaTwo from "./CenasModal/CenaTwo"
import CenaThree from "./CenasModal/CenaThree"
import CenaFour from "./CenasModal/CenaFour"

const ModalDoacao = ( props ) => {
	let [activeComponent, setActiveComponent] = useState(<CenaOne callback={callbackFuncao} entidade={props.entidade}/>);
	const [componentName, setComponentName] = useState("")
   const [valor, setValor] = useState(0);
   const [entidade, setEntidade] = useState("propaganeda")

   //console.warn(props.entidade)

	function callbackFuncao(values, valor){
		setComponentName(values);
      setValor(valor)
	};

	useEffect(() => {
    	switch (componentName) {
      	case "cenaDois":
        		setActiveComponent(<CenaTwo callback={callbackFuncao} valor={valor}/>);
        	break;

         case "cenaThree":
            setActiveComponent(<CenaThree callback={callbackFuncao} />);
         break;

         case "cenaFour":
            setActiveComponent(<CenaFour />);
         break;

      	default:
        		setActiveComponent(<CenaOne callback={callbackFuncao} entidade={props.entidade}/>);
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
