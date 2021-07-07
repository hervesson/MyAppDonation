import React, { useState, useEffect} from 'react'
import { View, Text } from 'react-native'


import CenaOne from "./CadastroModal/EscolhaUser";
import Login from "./CadastroModal/Login"
import Subscribe from "./CadastroModal/Subscribe"
import RecuperarSenha from "./CadastroModal/RecuperarSenha"
import CadastroBeneficiario1 from "./CadastroModal/CadastroBeneficiario1"
import CadastroBeneficiario2 from "./CadastroModal/CadastroBeneficiario2"
import CadastroBeneficiario3 from "./CadastroModal/CadastroBeneficiario3"
import CadastroBeneficiario4 from "./CadastroModal/CadastroBeneficiario4"
import CadastroDoador from "./CadastroModal/CadastroDoador"
import Sucesso from "./CadastroModal/Sucesso"

const ModalCadastro = ( props ) => {
	let [activeComponent, setActiveComponent] = useState();
	let [componentName, setComponentName] = useState(props.activeCene);

	function callbackFuncao(values){
		setComponentName(values)
	};
	
	useEffect(() => {
    	switch (componentName) {
    		case "login":
        		setActiveComponent(<Login callback={callbackFuncao}/>);
        	break;

      	case "subscribe":
        		setActiveComponent(<Subscribe />);
        	break;

         case "recuperarSenha":
            setActiveComponent(<RecuperarSenha callback={callbackFuncao} />);
         break;

         case "cadastroBeneficiario1":
            setActiveComponent(<CadastroBeneficiario1 callback={callbackFuncao} />);
         break;

         case "cadastroBeneficiario2":
            setActiveComponent(<CadastroBeneficiario2 callback={callbackFuncao} />);
         break;

         case "cadastroBeneficiario3":
            setActiveComponent(<CadastroBeneficiario3 callback={callbackFuncao} />);
         break;

         case "cadastroBeneficiario4":
            setActiveComponent(<CadastroBeneficiario4 callback={callbackFuncao} />);
         break;

         case "cadastroDoador":
            setActiveComponent(<CadastroDoador callback={callbackFuncao} />);
         break;

         case "sucess":
            setActiveComponent(<Sucesso />);
         break;

      	default:
        		setActiveComponent(<Login callback={callbackFuncao}/>);
        	break;
    	}
  	}, [componentName]);

	return (
	   <View style={{flex: 1}}>
	   	{activeComponent} 
	   </View>
	)
}

export default ModalCadastro


