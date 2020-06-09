import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import api from '../../services/api'
import location from '../../services/location'
import RNPickerSelect from 'react-native-picker-select';

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

const { width } = Dimensions.get('window')

export default function SingUp({ navigation }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [username, setUsername] = useState('')
  const [state, setState] = useState(undefined)
  const [city, setCity] = useState(null)
  const [stateList, setStateList] = useState([])
  const [cityList, setCityList] = useState([])


  useEffect(() => {
    async function fetchStates() {
      const { data } = await location.get('/estados')
      const states = data.map(item => ({ label: item.nome, value: item.nome, uf: item.sigla }))
      setStateList(states)
    }
    fetchStates();
  }, [])

  async function handleSingUp() {
    const data = {
      email,
      name,
      password,
      username,
      phone,
      state,
      city
    }

    try {
      const response = await api.post('/register', data)
      alert('Registro realizado com sucesso!')
      navigation.navigate('Login')
    } catch (e) {
      alert('Erro ao registrar usuário, tente novamente')
    }
  }

  async function handleSelectState(value, index) {
    if (!value) return

    setState(value)

    const { uf } = stateList[index - 1]

    const { data } = await location.get(`/estados/${uf}/municipios`)

    const cities = data.map(item => ({ label: item.nome, value: item.nome }))

    setCityList(cities)
  }

  const props = {
    placeholderTextColor: "#AAAA"
  }

  return (
    <ContainerKeyboard>
      <ContainerInsideKeyboard>
        <Title style={{ padding: 20 }}>Cadastro</Title>
        <ContainerSigUp>
          <Title_email
            placeholder='e-mail'
            keyboardType='email-address'
            autoCapitalize='none'
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
            {...props}
          />

          <Title_name
            placeholder='nome completo'
            autoCapitalize='none'
            autoCorrect={false}
            value={name}
            onChangeText={setName}
            {...props}
          />

          <Title_username
            placeholder='username'
            autoCapitalize='none'
            autoCorrect={false}
            value={username}
            onChangeText={setUsername}
            {...props}
          />

          <Title_password
            secureTextEntry={true}
            placeholder='senha'
            keyboardType='default'
            value={password}
            onChangeText={setPassword}
            {...props}
          />

          <Title_phone
            placeholder='numero de celular'
            autoCapitalize='none'
            autoCorrect={false}
            value={phone}
            onChangeText={setPhone}
            {...props}
          />

          <RNPickerSelect
            style={pickerSelectStyles}
            placeholder={{ label: 'Selecione seu Estado', value: null }}
            onValueChange={(value, index) => handleSelectState(value, index)}
            value={state}
            items={stateList}
          />
          <RNPickerSelect
            disabled={cityList.length === 0}
            style={pickerSelectStyles}
            placeholder={{ label: 'Selecione sua Cidade', value: null }}
            onValueChange={(value) => setCity(value)}
            value={city}
            items={cityList}
          />

          <ButtomTouchableOpacity onPress={handleSingUp} style={{ marginTop: 26, alignSelf: 'center' }}>
            <Title_text>Criar Conta</Title_text>
          </ButtomTouchableOpacity>

          <ContainerLogin>
            <Title_text_login>Já possui conta?</Title_text_login>
            <Text_login onPress={() => navigation.navigate('Login')}>
              Entre agora
            </Text_login>
          </ContainerLogin>
        </ContainerSigUp>
      </ContainerInsideKeyboard>
    </ContainerKeyboard>
  )
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    width: width * 0.8,
    height: 40,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ADADAD',
    borderRadius: 10,
    color: '#333',
    paddingRight: 30,
    marginTop: 25,
  },
  inputAndroid: {
    fontSize: 18,
    width: width * 0.8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ADADAD',
    borderRadius: 10,
    borderStyle: 'solid',
    color: '#333',
    paddingRight: 30,
    marginTop: 25,
  },
});
