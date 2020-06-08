import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Icon from "react-native-vector-icons/FontAwesome5";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";

import {
  View,
  Text,
  FlatList,
  AsyncStorage,
  ActivityIndicator,
  Alert,
} from "react-native";

import {
  Container,
  Title,
  Item,
  InfoView,
  ViewButtons,
  TouchableOpacityCompleted,
  TouchableOpacityCancel,
} from "./style";

const STATUS_TYPE = {
  processing: "Em Andamento",
  completed: "Concluída",
};

export default function Donations() {
  const [userDonations, setUserDonations] = useState([]);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const refreshList = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const fetchData = async () => {
    const userId = await AsyncStorage.getItem("userId");
    const token = await AsyncStorage.getItem("token");

    setRefreshing(true);

    try {
      const { status, data } = await api.get(
        `/users/${userId}/books/donations`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (status === 200) {
        setUserDonations(data.user_donations);
        setTotalCompleted(data.total_completed);
        setTotalPending(data.total_pending);
        setRefreshing(false);
      } else {
        throw new Error("Erro ao buscar os dados.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const cancelDonation = async (donation) => {
    const token = await AsyncStorage.getItem("token");
    const { donation_id, book_id } = donation;

    try {
      const response = await Promise.all([
        api.delete(`/users/books/donations/${donation_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        api.put(`/users/books/${book_id}`),
      ]);

      if (response[0].status === 200) {
        Alert.alert(`${response[0].data.message}`, undefined);
        fetchData();
      } else {
        throw new Error("Erro ao buscar os dados.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const completedDonation = async (donation) => {
    const token = await AsyncStorage.getItem("token");
    const { donor_id, receiver_id, donation_id, book_id, credit } = donation;

    const dataSend = {
      receiver_id,
      book_id,
      credit,
    };

    try {
      const response = await Promise.all([
        api.put(`/users/${donor_id}/books/donations/${donation_id}`, dataSend, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        api.put(`/users/books/${book_id}/donations`),
      ]);

      if (response[0].status === 200) {
        Alert.alert(`${response[0].data.message}`, undefined);
        fetchData();
      } else {
        throw new Error("Erro ao buscar os dados.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const renderItem = (item) => {
    return (
      <Item>
        <InfoView>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Livro: </Text>
            {item.book_title}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Status: </Text>
            {STATUS_TYPE[item.status]}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Recebedor(a): </Text>
            {item.name_receiver}
          </Text>
        </InfoView>
        {item.status == "processing" && (
          <ViewButtons>
            <TouchableOpacityCancel onPress={() => cancelDonation(item)}>
              <IconMaterialIcons
                name="cancel"
                size={25}
                color="#ffffff"
                style={{ padding: 2 }}
              />
            </TouchableOpacityCancel>
            <TouchableOpacityCompleted onPress={() => completedDonation(item)}>
              <Icon
                name="check-circle"
                size={25}
                color="#ffffff"
                style={{ padding: 2 }}
              />
            </TouchableOpacityCompleted>
          </ViewButtons>
        )}
      </Item>
    );
  };

  return (
    <Container>
      <Title>Minhas Doações</Title>
      {userDonations.length > 0 ? (
        <FlatList
          data={userDonations}
          onRefresh={refreshList}
          refreshing={refreshing}
          style={{ marginBottom: 20 }}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => item.donation_id}
        />
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Você ainda não possui doações</Text>
          <Text>Doe um livro!</Text>
        </View>
      )}
    </Container>
  );
}
