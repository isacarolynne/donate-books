import React, { useState, useEffect } from 'react';
import firebasePackage from 'firebase';
import firebase from '../../../firebase';

import { 
  ContainerKeyboard,
  TextMessage, 
  TextTime, 
  ContainerInputMessage, 
  InputMessage,
  ButtonSend,
  IconButtonSend 
} from './style';

import {
  SafeAreaView,
  View,
  FlatList,
  Dimensions,
  Alert,
  AsyncStorage
} from 'react-native';

export const navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('nameDonor'),
})

function Chat({ navigation }) {

  const [messageList, setMessageList] = useState([]);
  const [textMessage, setTextMessage] = useState('');
  const [interests, setInterests] = useState([]);
  const [userId, setUserId] = useState(0);
  const [donorId, setDonorId] = useState(0);
  const [nameDonor, setNameDonor] = useState('');
  const { height } = Dimensions.get('window');

  useEffect(() => {
    let messages = [];

    async function fetchData() {
      const userId = navigation.getParam('userId');
      const donorId = navigation.getParam('donor_id');
      const nameDonor = navigation.getParam('nameDonor');
  
      setNameDonor(nameDonor);
      setUserId(userId);
      setDonorId(donorId);

      console.log('ID DO DOADOR: ', navigation.getParam('donor_id'));
      console.log('NOME DO DOADOR: ', navigation.getParam('nameDonor'));
      console.log('ID DO USUARIO: ', navigation.getParam('userId'));

      firebase.database().ref('messages').child(parseInt(userId)).child(parseInt(donorId))
      .on('child_added', (value) => {
        messages.push(value.val());

        if (messages.length > 1) {
          setMessageList(messages);
        }
      })
    } 

    fetchData(); 

  }, []);

  function sendMessage() {
    if (textMessage.length > 0) {
      let msgId = firebase.database().ref('messages').child(parseInt(userId)).child(parseInt(donorId)).push().key;
      let updates = {};
      let message = {
        message: textMessage,
        time: firebasePackage.database.ServerValue.TIMESTAMP,
        from: parseInt(userId)
      }
      updates['messages/' + parseInt(userId) + '/' + parseInt(donorId) + '/' + msgId] = message;
      updates['messages/' + parseInt(donorId) + '/' + parseInt(userId) + '/' + msgId] = message;
      firebase.database().ref().update(updates);
      setTextMessage('');
    } else {
      Alert.alert('Error', 'No text')
    }
  }

  function handleChange(text) {
    setTextMessage(text);
  }

  function convertTime(time) {
    let dataMensagem = new Date(time);
    let dataAtual = new Date();
    let result = (dataMensagem.getHours() < 10 ? '0' : '') + dataMensagem.getHours() + ':';
    result += (dataMensagem.getMinutes() < 10 ? '0' : '') + dataMensagem.getMinutes();

    if (dataAtual.getDay() !== dataMensagem.getDay()) {
      result = dataMensagem.getDay() + '/' + dataMensagem.getMonth() + '   ' + result;
    }

    return result;
  }

  function renderRow({ item }) {
    return (
      <View style={{
        flexDirection: 'row',
        width: '65%',
        borderRadius: 5,
        marginBottom: 10,
        alignSelf: item.from === parseInt(userId)  ? 'flex-end' : 'flex-start',
        backgroundColor: item.from === parseInt(userId)  ? '#FEB665' : '#fc9e7e',
      }}>
        <TextMessage> {item.message} </TextMessage>
        <TextTime> {convertTime(item.time)} </TextTime>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        style={{ padding: 10, height: height * 0.8 }}
        data={messageList}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
      />
      <ContainerInputMessage>
        <InputMessage
          placeholder="Digite sua mensagem..."
          value={textMessage}
          onChangeText={(text) => handleChange(text)}
        />
        <ButtonSend onPress={() => sendMessage()} >
          <IconButtonSend source={require("../../../assets/send-button.png")} />
        </ButtonSend>
      </ContainerInputMessage>
    </SafeAreaView>
  );
}

export default Chat;