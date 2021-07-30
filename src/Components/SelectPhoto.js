import React, { useEffect, useState } from 'react'
import { View, Text, Image, Alert,  Platform, PermissionsAndroid } from 'react-native'
import * as ImagePicker from 'react-native-image-picker';

const SelectPhoto = (props) => {
	const [filePath, setFilePath] = useState({});

	useEffect(() => {
		if(props.abrir > 0){
			selecionarEntrada();
		}
	}, [props.abrir])

   const selecionarEntrada = () =>
   Alert.alert(
      "Selecione",
      "de onde virá a foto",
      [
        	{
          	text: "Cancel",
          	onPress: () => console.log("Cancel Pressed"),
          	style: "cancel"
        	},
        	{ text: "câmera", onPress: () => captureImage('photo') },
        	{ text: "galeria", onPress: () => chooseFile('photo') }
      ]
   );


   const requestCameraPermission = async () => {
      if (Platform.OS === 'android') {
         try {
            const granted = await PermissionsAndroid.request(
               PermissionsAndroid.PERMISSIONS.CAMERA,
               {
                  title: 'Camera Permission',
                  message: 'App needs camera permission',
               },
            );
            // If CAMERA Permission is granted
            return granted === PermissionsAndroid.RESULTS.GRANTED;
         } catch (err) {
           console.warn(err);
           return false;
         }
      } else return true;
   };

   const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

   const captureImage = async (type) => {
      let options = {
         mediaType: type,
         maxWidth: 300,
         maxHeight: 550,
         quality: 1,
         videoQuality: 'low',
         durationLimit: 30, //Video max duration in seconds
         //saveToPhotos: true,
         //includeBase64: true
      };
      let isCameraPermitted = await requestCameraPermission();
      let isStoragePermitted = await requestExternalWritePermission();
      if (isCameraPermitted && isStoragePermitted) {
      ImagePicker.launchCamera(options, (response) => {
         console.log('Response = ', response);
         props.callback(response?.assets[0]);

         if (response.didCancel) {
            alert('User cancelled camera picker');
            return;
         } else if (response.errorCode == 'camera_unavailable') {
            alert('Camera not available on device');
            return;
         } else if (response.errorCode == 'permission') {
            alert('Permission not satisfied');
            return;
         } else if (response.errorCode == 'others') {
            alert(response.errorMessage);
            return;
         }
            setFilePath(response);
         });
      }
   };

   const chooseFile = (type) => {
      let options = {
         mediaType: type,
         maxWidth: 300,
         maxHeight: 550,
         quality: 1,
         //includeBase64: true
      };
      ImagePicker.launchImageLibrary(options, (response) => {
         console.log('Response = ', response);
         props.callback(response?.assets[0]);

         if (response.didCancel) {
            alert('User cancelled camera picker');
            return;
         } else if (response.errorCode == 'camera_unavailable') {
            alert('Camera not available on device');
            return;
         } else if (response.errorCode == 'permission') {
           alert('Permission not satisfied');
           return;
         } else if (response.errorCode == 'others') {
           alert(response.errorMessage);
           return;
         }
         setFilePath(response);
      });
   };


	return (
		<View>
			{
				filePath?.assets ?
				   filePath?.assets.map(({uri}) => (
				      <Image
                     key={uri}
				         resizeMode="cover"
				         resizeMethod="scale"
				         style={{
                        width: props.width, 
                        height: props.height, 
                        borderRadius: props.borderRadius,
                        marginVertical: props.marginVertical ? props.marginVertical : null
                     }}
				         source={{uri: uri}}
				      /> 
				   )) :
				null
			}
		</View>
	)
}

export default SelectPhoto