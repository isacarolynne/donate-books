import React from 'react'
import { Image, Text, View } from 'react-native';
import {
    Container,
    ContainerLeft,
    ContainerRight,
    ContainerRightUpside,
    ContainerRightDownside,
    Title,
    Autor,
    Points,
    Description
} from './style';
import { preventAutoHide } from 'expo/build/launch/SplashScreen';

const Card = props => {
    const {
        title,
        author,
        points,
        description,
        rate,
        profilePicture,
        bookPicture,
    } = props;

    return (
        <Container>
            <ContainerLeft>
                <Image
                    style={{ display: 'flex', flex: 1, height:90}}
                    source={profilePicture}
                />
            </ContainerLeft>
            <ContainerRight>
                <ContainerRightUpside>
                    <View>
                        <Title>{title}</Title>
                        <Autor>{author}</Autor>
                        <Points>$ {points}</Points>
                    </View>
                </ContainerRightUpside>

                <ContainerRightDownside>
                    <Description>{description}</Description>
                </ContainerRightDownside>
            </ContainerRight>
        </Container>
    );
};

export default Card;