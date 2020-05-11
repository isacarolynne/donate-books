import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Entypo';
import { Text, Alert } from 'react-native';
import moment from 'moment'
import MockData from './Card/mock_data.js';
import api from '../../services/api';
import { AsyncStorage } from 'react-native';
import user from '../../../assets/user.png'
import firebase from '../../../firebase';

import {
    Container,
    ContainerSearch,
    Search_text,
    ContainerBody,
    ContainerList
} from './style'

import Card from './Card';

moment.locale('pt-BR')
export default function Login({ navigation }) {
    const [books, setBooks] = useState([])
    const [booksFilter, setBooksFilter] = useState([])


    async function mount(){
        const userId = await AsyncStorage.getItem('userId')
        const token = await AsyncStorage.getItem('token')

        const response = await api.get(`/users/${userId}/books`, {
            headers: {Authorization: `Bearer ${token}`}
        })

        console.log(books);

        setBooks(response.data)
        setBooksFilter(response.data)
    }

    useEffect(() => {
        mount()
    },[])

    function handleClickCard(id, nameDonor, donorId, points) {
        Alert.alert(
            'Tem certeza que deseja esse livro?',
            undefined,
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => donateBook(id, nameDonor, donorId, points)},
            ]
        )
    }

    async function donateBook(id, nameDonor, donorId, points) {
        const userId = await AsyncStorage.getItem('userId')
        const credits = await AsyncStorage.getItem('credits')
        const nameUser = await AsyncStorage.getItem('nameUser')
        const token = await AsyncStorage.getItem('token')

        AsyncStorage.setItem('nameDonor', nameDonor)
        AsyncStorage.setItem('donorId', donorId)


        const data = {
            address: 'recife',
            date_delivery: moment().format('YYYY-MM-DD'),
            book_id: id,
            receiver_id: userId
        }

        if (false) {
            Alert.alert(
                'Ops, você não tem crédito suficiente.',
                undefined,
            )
        } else {

            try {
                const response = await Promise.all([
                    api.post('/users/books/donations', data, {
                        headers: {Authorization: `Bearer ${token}`}
                    }),
                    api.put(`/users/books/${id}`, {
                        headers: {Authorization: `Bearer ${token}`}
                    })
                ])
                alert('Pronto, o livro é quase seu')

                //Abrir Chat aqui

                let keyUser = firebase.database().ref('interests').push().key;
                firebase.database().ref('interests/' + keyUser).set({ userId: parseInt(userId), nameDonor: nameDonor, donor_id: parseInt(donorId) });

                let keyDonor = firebase.database().ref('interests').push().key;
                firebase.database().ref('interests/' + keyDonor).set({ userId: parseInt(donorId), nameDonor: nameUser, donor_id: parseInt(userId) });

                navigation.navigate('ChatList')

            }catch(e){
                console.log(e)
                alert('Erro, no momento o livro não pode ser doado, tente novamente')
            }
        }
    }

    function filterBook(text) {
        if(text.length === 0) {
            setBooksFilter(books)
        }
        else if(text.length % 2 === 0){
            setBooksFilter(books.filter(book => book.title.toUpperCase().includes(text.toUpperCase())))
        }
    }

    return (
        <Container >
            <ContainerSearch>
                <Icon name="magnifying-glass" size={24} color="#dcdcdc" />
                <Search_text onChangeText={(text) => filterBook(text)} />
            </ContainerSearch>

            <ContainerList>
                {booksFilter.map((book, index) => {
                    return (
                        <Card
                            key={book.id}
                            id={book.id}
                            title={book.title}
                            author={book.author}
                            nameDonor={book.user_name}
                            donorId={book.donor_id}
                            points={book.credit}
                            description={book.resume}
                            rate={4.7}
                            profilePicture={user}
                            handleClickCard={handleClickCard}
                        />
                    )
                })}
            </ContainerList>


        </Container>

    )
}