import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Entypo';
import { Text } from 'react-native';
import MockData from './Card/mock_data.js';

import {
    Container,
    ContainerSearch,
    Search_text,
    ContainerBody,
    ContainerList
} from './style'

import Card from './Card';


export default function Login({ navigation }) {


    return (
        <Container >
            <ContainerSearch>
                <Icon name="magnifying-glass" size={24} color="#dcdcdc" />
                <Search_text />
            </ContainerSearch>

            <ContainerList>
                {MockData.map((card, index) => {
                    return (
                        <Card
                            key={index}
                            title={card.title}
                            author={card.author}
                            points={card.points}
                            description={card.description}
                            rate={card.rate}
                            profilePicture={card.profilePicture}
                            bookPicture={card.bookPicture}
                        />
                    )
                })}
            </ContainerList>


        </Container>

    )
}