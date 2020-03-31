import React, { useState, useEffect } from 'react';
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
  KeyboardAvoidingView
} from 'react-native';

export default function Chat({ navigation }) {

  const [messageList, setMessageList] = useState([]);
  const [textMessage, setTextMessage] = useState('');
  const [interests, setInterests] = useState([]);
  const [receiver_id, setReceiverId] = useState(navigation.getParam('receiver_id'));
  const [donor_id, setDonorId] = useState(navigation.getParam('donor_id'));
  const { height } = Dimensions.get('window');



  useEffect(() => {
    let messages = [];

    firebase.database().ref('messages').child(receiver_id).child(donor_id)
      .on('child_added', (value) => {
        messages.push(value.val())
      })

    setMessageList(messages);

  }, []);
  // LISTA AS MENSAGENS DE ACORDO COM O USUARIO QUE DEMOSTROU INTERESSE


  // firebase.database().ref('messages').child(User.phone).child(this.state.person.phone)
  //   .on('child_added', (value) => {
  //     setMessageList([...messageList, value.val()])
  //   })

  // const user = {
  //   id: 10,
  //   name: 'Lucas'
  // }

  // const book = {
  //   title: 'Aprendendo React Native',
  //   donor_id: 1,
  // }

  // MÉTODO "TENHO INTERESSE" NO APP

  // let interestId = firebase.database().ref('interests').push().key;

  // firebase.database().ref('interests/' + interestId).set({ receiver_id: user.id, title: book.title, donor_id: book.donor_id});



  // LISTAR APENAS OS INTERESSES DO USUÁRIOS (TANTO PARA O DOADOR COMO PARA O RECEBEDOR)

  // firebase.database().ref('interests').on('child_added', (value) => {
  //   setInterests(interests.push(value.val()));
  // });


  // const interestsFiltered = interests.filter((interest) => (interest.donor_id == 20 || interest.receiver_id == 20));

  // console.log(interestsFiltered);

  function sendMessage() {
    if (textMessage.length > 0) {
      let msgId = firebase.database().ref('messages').child(receiver_id).child(donor_id).push().key;
      let updates = {};
      let message = {
        message: textMessage,
        time: firebase.database.ServerValue.TIMESTAMP,
        from: receiver_id
      }
      updates['messages/' + receiver_id + '/' + donor_id + '/' + msgId] = message;
      updates['messages/' + donor_id + '/' + receiver_id + '/' + msgId] = message;
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
        alignSelf: item.from === receiver_id ? 'flex-end' : 'flex-start',
        backgroundColor: item.from === receiver_id ? '#FEB665' : '#fc9e7e',
      }}>
        <Text style={styles.message}> {item.message} </Text>
        <Text style={styles.time}> {convertTime(item.time)} </Text>
      </View>
    )
  }

  return (
    <SafeAreaView>
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
