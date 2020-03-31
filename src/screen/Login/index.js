import React, { useState, useEffect } from 'react'
import { AsyncStorage } from 'react-native'
import api from '../../services/api'

import {
  ContainerKeyboard,
  ContainerInsideKeyboard,
  Title,
  Title_email,
  Title_password,
  ButtomTouchableOpacity,
  Title_text,
  ContainerSigUp,
  Title_text_singUp,
  Text_singUp
} from './style'


export default function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function hasToken(){
    const token = await AsyncStorage.getItem('token')
    const userID = await AsyncStorage.getItem('userId')
    
    if(token && userID) navigation.navigate('Home')
  }

  useEffect(() => {
    hasToken()
  }, [])

  async function handleSingin(){
    const data = {email, password}

    try {
      const response = await api.post('auth', data)

      AsyncStorage.setItem('token', response.data.token.token)
      AsyncStorage.setItem('userId', String(response.data.user.id))
      
      alert('Login efetuado com sucesso!')

      navigation.navigate('Home')
    }catch{
      alert('Erro, verifique seu email e senha')
    }
  }

  return (
      <ContainerKeyboard >
          <ContainerInsideKeyboard>
            <Title>Entrar</Title>
            <Title_email
              placeholder='Digite o e-mail'
              keyboardType='email-address'
              autoCapitalize='none'
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />

            <Title_password
              secureTextEntry={true}
              placeholder='Digite a senha'
              keyboardType='default'
              value={password}
              onChangeText={setPassword}
            />

            <ButtomTouchableOpacity onPress={handleSingin}>
              <Title_text>Login</Title_text>
            </ButtomTouchableOpacity>

            <ContainerSigUp>
              <Title_text_singUp>Ainda não possui conta?</Title_text_singUp>
              <Text_singUp onPress={() => navigation.navigate('SingUp')}
                >Registre-se grátis
              </Text_singUp>
            </ContainerSigUp>
          </ContainerInsideKeyboard>
      </ContainerKeyboard>

  )
}


