import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";

import { ContainerView, ItemContacts, TextContact } from "./style";

import firebase from "../../../firebase";

function ChatList({ navigation }) {
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(navigation.getParam("titleBook"));

  useEffect(() => {
    setLoading(true);

    fetchData();
  }, []);

  async function fetchData() {
    let wishes = [];

    const userId = await AsyncStorage.getItem("userId");
    const donorId = await AsyncStorage.getItem("donorId");

    firebase
      .database()
      .ref("interests")
      .on("child_added", (value) => {
        wishes.push(value.val());

        if (wishes.length > 1) {
          const interestsFiltered = wishes.filter(
            (interest) =>
              (interest.donor_id == donorId || interest.userId == userId)
          );

          setInterests(interestsFiltered);
          setLoading(false);
        }
      });
  }

  function renderRow({ item }) {
    return (
      <ItemContacts onPress={() => navigation.navigate("Chat", item)}>
        <TextContact>{item.nameDonor}</TextContact>
      </ItemContacts>
    );
  }

  return (
    <SafeAreaView>
      {loading ? (
        <ActivityIndicator
          style={{ padding: 10 }}
          color={"#FEB665"}
          size={"large"}
          animating={loading}
        />
      ) : (
        <FlatList
          data={interests}
          style={{ marginTop: 5, marginBottom: 5 }}
          renderItem={renderRow}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </SafeAreaView>
  );
}

ChatList.navigationOptions = () => ({
  title: "Chat",
});

export default ChatList;
