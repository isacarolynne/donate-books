import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  SafeAreaView, 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  ActivityIndicator, 
  AsyncStorage 
} from 'react-native';

import { ContainerView, ItemContacts, TextContact } from './style';

import firebase from '../../../firebase';


export default function ChatList({ navigation }) {

  ChatList.navigationOptions = () => {
    return {
        title: 'Contacts',
    }
  }

  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const [donorId, setDonorId] = useState('');

  useEffect(() => {
    setLoading(true);
    let wishes = [];

    async function fetchDate() {
      const userId = await AsyncStorage.getItem('userId')
      const donorId = await AsyncStorage.getItem('donorId')

      setUserId(userId);
      setDonorId(donorId);

      firebase.database().ref('interests').on('child_added', (value) => {
        wishes.push(value.val())
        
        if (wishes.length > 1) {
          const interestsFiltered = wishes.filter((interest) => (interest.donor_id == donorId || interest.userId == userId));
  
          setInterests(interestsFiltered);
          setLoading(false);
        }
      });
    }

    fetchDate();
  }, []);


  function renderRow ({ item }) {
    return (
      <ItemContacts onPress={() => navigation.navigate('Chat', item)}>
        <TextContact>{item.nameDonor}</TextContact>
      </ItemContacts>
    )
  }

  return (
    <SafeAreaView>
      <ContainerView>
        <ActivityIndicator 
          color={'#FEB665'}
          animating={loading}
        />
      </ContainerView>
      <FlatList
        data={interests}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  )
}