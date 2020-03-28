import React, { useState} from 'react'

import { 
          Title,
          ContainerSigUp,
          Title_email,
          Title_name,
          Title_password,
          Title_phone,
          ButtomTouchableOpacity,
          Title_text,
          ContainerLogin,
          Title_text_login,
          Text_login,
          ContainerKeyboard,
          ContainerInsideKeyboard 
        } from './style'


export default function SingUp({ navigation }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')


  return (
      <ContainerKeyboard behavior="padding" enabled>
        <ContainerInsideKeyboard>
            <Title>Cadastro</Title>
              <ContainerSigUp>
                <Title_email
                  placeholder='e-mail'
                  keyboardType='email-address'
                  autoCapitalize='none'
                  autoCorrect={false}
                  value={email}
                  onChangeText={setEmail}
                />
                <Title_name 
                  placeholder= 'nome completo'
                  autoCapitalize='none'
                  autoCorrect={false}
                  value={name}
                  onChangeText={setName}
                />
                <Title_password
                  secureTextEntry={true}
                  placeholder='senha'
                  keyboardType='default'
                  value={password}
                  onChangeText={setPassword}
                />
                <Title_phone 
                  placeholder= 'numero de celular'
                  autoCapitalize='none'
                  autoCorrect={false}
                  value={phone}
                  onChangeText={setPhone}
                />
              </ContainerSigUp>
              <ButtomTouchableOpacity>
                <Title_text>Criar Conta</Title_text>
              </ButtomTouchableOpacity>

              <ContainerLogin>
                <Title_text_login>Ainda não possui conta?</Title_text_login>
                <Text_login onPress={() => navigation.navigate('Login')}
                >Registre-se grátis</Text_login>
              </ContainerLogin>
            </ContainerInsideKeyboard>
          </ContainerKeyboard>
  )
}
