import api from "./Api";
import AsyncStorage from '@react-native-async-storage/async-storage';

class Helpers {
	constructor(){
     	this.carregando = false
	}
	

	createDonator(values){
		return new Promise(async(resolve, reject) => {
			api.post('/usuarios/create', {
				avatar: await this.uploadImage(values.photo, 'avatar'),
				name: values.fullName,
				email: values.phoneNumber,
				password: values.confirmPassword,
				role: "donator",
			}).then((res) => {
	    		this.login(values)
	    		.then((res) => {
	    			if(res == true){
	    				resolve(true)
	    			}
	    		})
	  		}).catch(function (error) {
	    		resolve(false)
	    		console.log("err "+error)
	  		});
	  	})
	}

	async createBeneficiary(values){
		return new Promise(async(resolve, reject) => {
			api.post('/usuarios/create', {
				name: values.fullName,
				email : values.phoneNumber,
				password: values.confirmPassword,
				role : "beneficiary",
				avatar: await this.uploadImage(values.photoUser, 'avatar'),
				documents:{
					cpf_cnpj: values.CPF,
					document_front: await this.uploadImage(values.photoRgFront, 'docs'),
					document_back: await this.uploadImage(values.photoRgBack, 'docs'),
					document_selfie: await this.uploadImage(values.photoSelfie, 'docs'),
					birthday: values.birthDay,
					phone: values.phoneNumber,
					proof_of_address: await this.uploadImage(values.photoReceiptResidence, 'docs'),
				},
				addresses:{
					zip: values.cep,
					street: values.endereco,
					neighborhood: values.bairro,
					city_id: values.cidade
				}
			}).then((res) => {
	    		this.login(values)
	    		.then((res) => {
	    			if(res == true){
	    				resolve(true)
	    			}
	    		})
	  		}).catch(function (error) {
	    		resolve(false)
	    		console.log("err cadastro beneficiario" +error)
	  		});
	  	})
	}

	async uploadImage(imagem, folder){
		try{
			var img = { uri: imagem.uri, name:imagem.fileName, type:imagem.type };
	      const data = new FormData();

	      data.append("image", img);
	      data.append("folder", folder);
	         
	      let res = await fetch(
	      	"https://semfome.api.7clicks.dev/api/save-image",
	      	{
	         	method: 'post',
	         	body: data,
	         	headers: {
	            	'Content-Type': 'multipart/form-data',
	         	},
	      	}
	      );
	      let responseJson = await res.json();
	      let nameFile = responseJson.nameFile
	      console.log(responseJson);
	      return nameFile
		}catch(err){
			console.log("foto " +err)
			return err
		}
   };

	login(props){
		return new Promise((resolve, reject) => {
			api.post('/auth/login', {
				email: props.phoneNumber,
				password: props.password,
			}).then((res) => {
			  	console.log(res.data.access_token);
			  	this.saveToken(res.data.access_token)
			  	.then((res) => {
			  		if(res == true){
			  			resolve(true)
			  		}
			  	})
	  		})
	  		.catch(function (error) {
	    		resolve(false)
	  		});
	  	})
	}


	async saveToken(value){
	  	try {
	    	await AsyncStorage.setItem('acess_token', value);
	    	return true
	  	} catch(e) {
	    	console.log('errorAsyncStorage ' + e)
	    	return false
	  	}
	}

	async findUser(){
		try {
	    	const value = await AsyncStorage.getItem('acess_token');
	    	if(value !== null) {
	      	console.log(value);
	      	let res = await fetch(
		      	'https://semfome.api.7clicks.dev/api/auth/me', {
			         method: 'POST',
			         headers: {
			         	'Accept': 'application/json',
                		'Authorization': 'Bearer '+value
			         },
		      	}
		      );
		      let responseJson = await res.json();
	      	return responseJson
	    	}else{
	    		return false
	    	}
	  	} catch(e) {
	    	console.log("error")
	    	return false
	  	}
	}

	async SignOut(){
  		try {
    		await AsyncStorage.removeItem('acess_token')
    		return true
  		} catch(e) {
    		console.log("Erro ao deslogar !")
    		return false
  		}
	}

	mudar(str){
		this.carregando = str
	}

	loading(){
		const carre = this.carregando
		return carre
	}
}

export { Helpers };



/*api.post('/auth/me', {
	    			headers: { Authorization: "Bearer "+value } 
				}).then((res) => {
			  		console.log(res.data);
	  			})
	  			.catch(function (error) {
	    			console.log(error.response.data);
	  			}); */