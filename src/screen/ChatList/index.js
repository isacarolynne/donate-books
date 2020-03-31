import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  SafeAreaView, 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  ActivityIndicator 
} from 'react-native';
import firebase from '../../../firebase';

export default function ChatList({ navigation }) {

  const [interests, setInterests] = useState([]);
  const [receiver_id, setReceiverId] = useState(10);
  const [donor_id, setDonorId] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let wishes = [];

    firebase.database().ref('interests').on('child_added', (value) => {
      wishes.push(value.val())
      
      if (wishes.length > 1) {
        const interestsFiltered = wishes.filter((interest) => (interest.donor_id == donor_id || interest.receiver_id == receiver_id));
        setInterests(interestsFiltered);
        setLoading(false);
      }
    });
  }, []);


  function renderRow ({ item }) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Chat', item)}
        style={styles.listContacts}>

        <Text style={styles.textContact}>{item.title}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ActivityIndicator 
          color={'#FEB665'}
          animating={loading}
        />
      </View>
      <FlatList
        data={interests}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  listContacts: {
    padding: 10,
    borderBottomColor: '#FEB665',
    borderBottomWidth: 1,
  },
  textContact: {
    fontSize: 18,
  }
})