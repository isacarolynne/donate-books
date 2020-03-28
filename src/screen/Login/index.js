import React, { useState } from 'react'

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

            <ButtomTouchableOpacity>
              <Title_text>Login</Title_text>
            </ButtomTouchableOpacity>

            <ContainerSigUp>
              <Title_text_singUp>Ainda não possui conta?</Title_text_singUp>
              <Text_singUp onPress={() => navigation.navigate('SingUp')}
              >Registre-se grátis</Text_singUp>
            </ContainerSigUp>
          </ContainerInsideKeyboard>
      </ContainerKeyboard>

  )
}


