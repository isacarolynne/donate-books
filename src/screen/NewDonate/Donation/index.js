import React, {useState} from 'react';
import api from '../../../services/api'

import { 
  Title,
  Title_text,
  ButtomTouchableOpacity,
  ContainerKeyboard,
  ContainerInsideKeyboard,
  Input, 
  ContainerBook,
  InputTextArea,
  ScrollViewBook,
} from './style'


export default function Donate({bookId}) {
  const [city, setCity] = useState('');
  const [uf, setUF] = useState('');

  async function donate() {
    const data = {city, uf, book_id: bookId }

    try {
      const response = await api.post('/users/donations', data);
    }catch{
      alert('Erro ao criar uma nova doação, tente novamente.')
    }
  }

  return (
    <ContainerKeyboard behavior="padding" enabled>
      <ContainerInsideKeyboard>
        <Title>Doação</Title>
          <ContainerBook>
            <Input
              placeholder='Cidade'
              autoCapitalize='none'
              autoCorrect={false}
              value={city}
              onChangeText={setCity}
            /> 
            <Input
              placeholder='UF'
              autoCapitalize='none'
              autoCorrect={false}
              value={uf}
              onChangeText={setUF}
            /> 
            <ButtomTouchableOpacity onPress={donate}>
                <Title_text>Finalizar</Title_text>
            </ButtomTouchableOpacity>
          </ContainerBook>
      </ContainerInsideKeyboard>
    </ContainerKeyboard>
  );
}
