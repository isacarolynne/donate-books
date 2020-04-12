import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAvoidingView, View, Text, TouchableOpacity, AsyncStorage } from 'react-native';

import styles from './style';

export default function Profile({ navigation }) {

  const [nameUser, setNameUser] = useState('');

  async function fetchData() {
    const nameUser = await AsyncStorage.getItem('nameUser'); 
    setNameUser(nameUser);
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
        <View style={{ backgroundColor: '#FEB665', borderRadius: 20, padding: 15,  }}>
          <View style={{ flexDirection: 'row' }}>
            <Icon name="favorite" size={18} color="#000" style={{ marginRight: 5 }}/>
            <Text style={styles.textProfile}>Doações concluídas: 20</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Icon name="check" size={16} color="#000" style={{ marginRight: 5 }}/>
            <Text style={styles.textProfile}>Recebimentos concluídos: 30</Text>
          </View>
          
          <View style={{ flexDirection: 'row' }}>
            <Icon name="cached" size={16} color="#000" style={{ marginRight: 5 }}/>
            <Text style={styles.textProfile} >Doações pendentes: 2</Text>
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
