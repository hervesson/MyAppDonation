import React, { useState, useEffect} from 'react'
import { View, Text } from 'react-native'

import CenaOne from "./CenasModal/CenaOne";
import CenaTwo from "./CenasModal/CenaTwo"
import CenaThree from "./CenasModal/CenaThree"
import CenaFour from "./CenasModal/CenaFour"

const ModalDoacao = ( props ) => {
	let [activeComponent, setActiveComponent] = useState(<CenaOne callback={callbackFuncao} entidade={props.entidade} />);
	const [componentName, setComponentName] = useState("");
   const [valor, setValor] = useState(0);
   const [recibo, setRecibo] = useState([])
   const [entidade, setEntidade] = useState("propaganeda");
   const [payment, setPayment] = useState("")
   //console.warn(props.entidade)

	function callbackFuncao(values, valor){
		setComponentName(values);
      valor ? setValor(valor) : null 
	};

   function callbackCena(){
      props.mudarCena()
   };

   function callbackPayment(pay){
      setPayment(pay)
   }

	useEffect(() => {
    	switch (componentName) {
      	case "cenaDois":
        		setActiveComponent(<CenaTwo callback={callbackFuncao} valor={valor} entidade={props.entidade} payment={callbackPayment} />);
        	break;

         case "cenaThree":
            setActiveComponent(<CenaThree callback={callbackFuncao} />);
         break;

         case "cenaFour":
            setActiveComponent(<CenaFour entidade={props.entidade} valor={valor} cena={callbackCena} payment={payment} />);
         break;

      	default:
        		setActiveComponent(<CenaOne callback={callbackFuncao} entidade={props.entidade} />);
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
