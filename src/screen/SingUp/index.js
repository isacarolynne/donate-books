import React, { useState, useEffect } from 'react'
import { Picker } from 'react-native'
import api from '../../services/api'
import location from '../../services/location'

import { 
          Title,
          ContainerSigUp,
          Title_email,
          Title_name,
          Title_password,
          Title_phone,
          Title_username,
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
  const [username, setUsername] = useState('')
  const [state, setState] = useState(null)
  const [city, setCity] = useState(null)
  const [stateList, setStateList] = useState([])

  useEffect(() => {
    async function fetchStates(){ 
      console.log('entrou')
      const {data} = await location.get('/estados')
      console.log(data)
      setStateList(data)
    }
    fetchStates();
  }, [])

  async function handleSingUp() {
    setLoading(true);

    const data = {
      email,
      name,
      password,
      username,
      phone
    }

    try {
      const response = await api.post('/register', data)
      alert('Registro realizado com sucesso!')
      navigation.navigate('Login')
    }catch(e){
      alert('Erro ao registrar usuário, tente novamente')
    }

  }

  return (
      <ContainerKeyboard >
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
                <Title_username
                  placeholder= 'username'
                  autoCapitalize='none'
                  autoCorrect={false}
                  value={username}
                  onChangeText={setUsername}
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
                <Picker
                  placeholder='Escolha um estado'
                  selectedValue={state}
                  style={{height: 50, width: 100}}
                  onValueChange={(itemValue, itemIndex) =>
                    setState(itemValue)
                  }>
                    {
                      stateList.length > 0 &&
                      stateList.map(item => 
                        <Picker.Item key={item.id} label={item.nome} value={item.nome} />
                      )
                    }
                </Picker>
              </ContainerSigUp>
              <ButtomTouchableOpacity onPress={handleSingUp}>
                <Title_text>Criar Conta</Title_text>
              </ButtomTouchableOpacity>

              <ContainerLogin>
                <Title_text_login>Já possui conta?</Title_text_login>
                <Text_login onPress={() => navigation.navigate('Login')}>
                  Entre agora
                </Text_login>
              </ContainerLogin>
            </ContainerInsideKeyboard>
          </ContainerKeyboard>
  )
}
