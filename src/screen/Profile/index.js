import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';
import { KeyboardAvoidingView, View, Text, TouchableOpacity, AsyncStorage } from 'react-native';

import styles from './style';

export default function Profile({ navigation }) {

  const [nameUser, setNameUser] = useState('');
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
  const [totalReceivedPending, setTotalReceivedPending] = useState(0);
  const [totalReceivedCompleted, setTotalReceivedCompleted] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const nameUser = await AsyncStorage.getItem('nameUser'); 
    const userId = await AsyncStorage.getItem('userId');
    const token = await AsyncStorage.getItem('token');
    setNameUser(nameUser);
    setLoading(true);

    try {
      const { status, data } = await api.get(`/users/${userId}/books/donations`, {
        headers: {Authorization: `Bearer ${token}`}
      });
  
      if (status === 200) {
        console.log('chegou aqui', data)
        setTotalCompleted(data.total_completed);
        setTotalPending(data.total_pending);
        setTotalReceivedCompleted(data.total_received_completed);
        setTotalReceivedPending(data.total_received_pending);
        setLoading(false);
      } else {
        throw new Error('Erro ao buscar os dados.');
      }
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  async function handleLogout(){
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userId')

    navigation.navigate('Login')
  }


  return (
    <KeyboardAvoidingView style={styles.container} behavior={'padding'} enabled>
      <View style={styles.iconUser}>
        <Icon name="face" size={60} color="#000" style={{ marginTop: 7 }} />
      </View>
      <View style={{ marginTop: 5 }}>
      <Text style={{ paddingBottom: 30, fontSize: 22 }}>{nameUser}</Text>
      </View>
      <View style={{ marginTop: 1 }}>
        <View style={{ backgroundColor: '#FEB665', borderRadius: 15, padding: 25,  }}>
          <View style={{ flexDirection: 'row', marginBottom: 5 }}>
            <Icon name="favorite" size={18} color="#000" style={{ marginRight: 5 }}/>
            <Text style={styles.textProfile}>Doações concluídas: {totalCompleted}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 5 }}>
            <Icon name="cached" size={16} color="#000" style={{ marginRight: 5 }}/>
            <Text style={styles.textProfile} >Doações pendentes: {totalPending}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 5 }}>
            <Icon name="check" size={16} color="#000" style={{ marginRight: 5 }}/>
            <Text style={styles.textProfile}>Recebimentos concluídos: {totalReceivedCompleted}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 5 }}>
            <Icon name="restore" size={16} color="#000" style={{ marginRight: 5 }}/>
            <Text style={styles.textProfile}>Recebimentos pendentes: {totalReceivedPending}</Text>
          </View>
        </View>
      </View>

      <View style={{ marginBottom: 20 }}>
        <TouchableOpacity style={styles.exitButton} onPress={handleLogout}>
          <Text style={styles.textButton}>SAIR</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
