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
import firebase from '../../../firebase';



export default function ChatList({ navigation }) {

  ChatList.navigationOptions = () => {
    return {
        title: 'Contacts',
    }
  }

  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchDate() {
    const userId = await AsyncStorage.getItem('userId')
    const donorId = await AsyncStorage.getItem('donorId')
    
    return { userId, donorId }
  }

  useEffect(() => {
    setLoading(true);
    let wishes = [];

    const data = fetchDate();


    firebase.database().ref('interests').on('child_added', (value) => {
      wishes.push(value.val())
      
      if (wishes.length > 1) {
        const interestsFiltered = wishes.filter((interest) => (interest.donorId == data.donorId || interest.userId == data.userId));
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

        <Text style={styles.textContact}>{item.nameDonor}</Text>
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