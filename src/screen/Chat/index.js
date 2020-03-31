import React, { useState, useEffect } from 'react';
import firebasePackage from 'firebase';
import firebase from '../../../firebase';

import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  AsyncStorage
} from 'react-native';

export default function Chat({ navigation }) {

  const [messageList, setMessageList] = useState([]);
  const [textMessage, setTextMessage] = useState('');
  const [interests, setInterests] = useState([]);
  const [userId, setUserId] = useState('');
  const [donorId, setDonorId] = useState('');
  const [nameDonor, setNameDonor] = useState('');
  const { height } = Dimensions.get('window');


  

  useEffect(() => {
    let messages = [];

    async function fetchDate() {
      const userId = await AsyncStorage.getItem('userId');
      const donorId = await AsyncStorage.getItem('donorId');
      const nameDonor = await AsyncStorage.getItem('nameDonor')
  
      setNameDonor(nameDonor);
      setUserId(userId);
      setDonorId(donorId);

      firebase.database().ref('messages').child(parseInt(userId)).child(parseInt(donorId))
      .on('child_added', (value) => {
        messages.push(value.val());

        if (messages.length > 1) {
          setMessageList(messages);
        }
      })
    } 

    fetchDate(); 

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
        marginBottom: 20,
        alignSelf: item.from === parseInt(userId)  ? 'flex-end' : 'flex-start',
        backgroundColor: item.from === parseInt(userId)  ? '#FEB665' : '#fc9e7e',
      }}>
        <Text style={styles.message}> {item.message} </Text>
        <Text style={styles.time}> {convertTime(item.time)} </Text>
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
      <View style={styles.boxInputMessage}>
        <TextInput
          placeholder="Digite sua mensagem..."
          value={textMessage}
          onChangeText={(text) => handleChange(text)}
          style={styles.inputMessage}
        />
        <TouchableOpacity onPress={() => sendMessage()} style={styles.buttonSend}>
          <Image source={require("../../../assets/send-button.png")} style={styles.iconButtonSend} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  message: {
    color: '#fff',
    padding: 7,
    fontSize: 16
  },
  time: {
    color: '#eee',
    padding: 3,
    fontSize: 12
  },
  boxInputMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  inputMessage: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    width: "85%",
    borderRadius: 5,
    justifyContent: 'flex-end'
  },
  buttonSend: {
    marginLeft: 10
  },
  iconButtonSend: {
    width: 30,
    height: 30,
    marginLeft: 5
  }

})
