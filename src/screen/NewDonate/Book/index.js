import React, { useState, useEffect, useRef } from 'react';
import api from '../../../services/api'
import { AsyncStorage, View, Text, Image } from 'react-native';
import { Camera } from 'expo-camera'
import { FontAwesome } from '@expo/vector-icons'
import {
  Title,
  Title_text,
  ButtomTouchableOpacity,
  ContainerKeyboard,
  ContainerInsideKeyboard,
  Input,
  ContainerBook,
  InputTextArea,
  ViewCamera,
  ViewCameraTextPosition,
  CameraInsideTextPosition,
  CameraText,
  CameraTouchableOpacity,
  ModalPicture,
  ViewPicture,
  ViewTouchableOpacity
} from './style'


export default function Book() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [resume, setResume] = useState('')
  const [year, setYear] = useState('')
  const [credit, setCredit] = useState('')
  
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [hasPermission, setHaspermission] = useState(null)
  const camRef = useRef(null)
  const [capturedPhoto, setCapturedPhoto] = useState(null)
  const [open, setOpen] = useState(false)


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHaspermission(status === 'granted')
    })()

  }, [])

  if (hasPermission === null) {
    return <View />
  }

  if (hasPermission === false) {
    return <Text> Acesso negado! </Text>
  }

  async function takePicture() {
    if (camRef) {
      const data = await camRef.current.takePictureAsync()
      setCapturedPhoto(data.uri)
      setOpen(true)

    }
  }

  async function handleDonate() {
    const data = {
      title,
      author,
      resume,
      year,
      credit,
      url: [capturedPhoto]
    }

    const userId = await AsyncStorage.getItem('userId')
    const token = await AsyncStorage.getItem('token')

    try {
      const responde = await api.post(`/users/${userId}/books`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Livro registrado com sucesso!')

    } catch (e) {
      console.log(e)
      alert('Erro ao registrar livro, tente novamente.')
    }
  }

  return (
    <ViewCamera >
        <Camera
          style={{flex:1,height:400, width:'96%', justifyContent: 'center',alignSelf: 'center'}}
          type={type}
          ref={camRef}
        >
          <ViewCameraTextPosition >
            <CameraInsideTextPosition 
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                )
              }}
            >
              <CameraText>TROCAR</CameraText>
            </CameraInsideTextPosition>
          </ViewCameraTextPosition>
        </Camera>
        <CameraTouchableOpacity 

          onPress={(takePicture)}
        >
          <FontAwesome name="camera" size={23} color="#fff" />
        </CameraTouchableOpacity>

        {
          capturedPhoto &&
          <ModalPicture
          animationType="slide"
          transparent={false}
          visible={open}
          >
          <ContainerKeyboard behavior="padding" enabled
          >
            <ContainerInsideKeyboard>
              <ViewPicture >
                <ViewTouchableOpacity  onPress={ () => setOpen(false) }>
                  <FontAwesome name="window-close" size={50} color="#ff0000" />
                </ViewTouchableOpacity>
                <Image
                style={{width: '80%', height:300, borderRadius:20, justifyContent:'center',alignSelf: 'center'}}
                source={{uri: capturedPhoto}}
                />
              </ViewPicture>
            <Title>Livro</Title>
            <ContainerBook>
              <Input
                placeholder='título'
                autoCapitalize='none'
                autoCorrect={false}
                value={title}
                onChangeText={setTitle}
              />
              <Input
                placeholder='autor'
                autoCapitalize='none'
                autoCorrect={false}
                value={author}
                onChangeText={setAuthor}
              />
              <InputTextArea
                placeholder='resumo'
                autoCapitalize='none'
                autoCorrect={false}
                multiline={true}
                numberOfLines={4}
                value={resume}
                onChangeText={setResume}
              />
              <Input
                placeholder='ano de lançamento'
                autoCapitalize='none'
                keyboardType='numeric'
                autoCorrect={false}
                value={year}
                onChangeText={setYear}
              />
              <Input
                placeholder='valor'
                autoCapitalize='none'
                keyboardType='numeric'
                autoCorrect={false}
                value={credit}
                onChangeText={setCredit}
              />
              <ButtomTouchableOpacity onPress={handleDonate}>
                <Title_text>Finalizar</Title_text>
              </ButtomTouchableOpacity>
            </ContainerBook>
            </ContainerInsideKeyboard>
          </ContainerKeyboard>
          </ModalPicture>
        }
      </ViewCamera>

  );
}
