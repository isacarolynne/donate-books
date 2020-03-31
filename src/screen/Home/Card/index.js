import React from 'react'
import { Image, Text, View, TouchableOpacity } from 'react-native';
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
        id,
        title,
        author,
        nameDonor,
        donorId,
        points,
        description,
        rate,
        profilePicture,
        bookPicture,
        handleClickCard
    } = props;

    return (
        <TouchableOpacity onPress={() => handleClickCard(id, nameDonor, donorId)}>
            <Container>
                    <ContainerLeft>
                        <Image
                            style={{ display: 'flex', flex: 1, height: 50, width: 100}}
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
                            <Description numberOfLines={4}>{description}</Description>
                        </ContainerRightDownside>
                    </ContainerRight>
            </Container>
        </TouchableOpacity>
    );
};

export default Card;