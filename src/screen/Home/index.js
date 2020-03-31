import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Entypo';
import { Text, Alert } from 'react-native';
import moment from 'moment'
import MockData from './Card/mock_data.js';
import api from '../../services/api';
import { AsyncStorage } from 'react-native';
import user from '../../../assets/user.png'

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

        setBooks(response.data)
        setBooksFilter(response.data)
    }

    useEffect(() => {
        mount()
    },[])

    function handleClickCard(id) {
        Alert.alert(
            'Tem certeza que deseja esse livro?',
            undefined,
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => donateBook(id)},
            ]
        )
    }

    async function donateBook(id) {
        const userId = await AsyncStorage.getItem('userId')
        const token = await AsyncStorage.getItem('token')

        const data = {
            address: 'recife',
            date_delivery: moment().format('YYYY-MM-DD'),
            book_id: id,
            receiver_id: userId
        }

        try {
            const response = await api.post('/users/donations', data, {
                headers: {Authorization: `Bearer ${token}`}
            })
            alert('Pronto, o livro é quase seu')

            //Abrir Chat aqui
        }catch(e){
            console.log(e)
            alert('Erro, no momento o livro não pode ser doado, tente novamente')
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
                            author={book.user.name}
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