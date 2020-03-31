import React, {useState} from 'react';
import api from '../../../services/api'
import { AsyncStorage } from 'react-native';

import { 
  Title,
  Title_text,
  ButtomTouchableOpacity,
  ContainerKeyboard,
  ContainerInsideKeyboard,
  Input, 
  ContainerBook,
  InputTextArea,
} from './style'


export default function Book({handleNewDonation}) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [resume, setResume] = useState('')
  const [year, setYear] = useState('')
  const [credit, setCredit] = useState('')

  async function handleDonate () {
    const data = {
      title,
      author,
      resume,
      year,
      credit,
    }

    const userId = await AsyncStorage.getItem('userId')
    const token = await AsyncStorage.getItem('token')

    try {
      const responde = await api.post(`/users/${userId}/books`, data, {
        headers: {Authorization: `Bearer ${token}`}
      });

      alert('Livro registrado com sucesso!')

      handleNewDonation(responde.data.id)
    }catch(e){
      console.log(e)
      alert('Erro ao registrar livro, tente novamente.')
    }
  }

  return (
    <ContainerKeyboard behavior="padding" enabled>
      <ContainerInsideKeyboard>
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
  );
}
