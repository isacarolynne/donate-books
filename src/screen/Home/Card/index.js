import React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  Container,
  ContainerLeft,
  ContainerRight,
  ContainerRightUpside,
  ContainerRightDownside,
  Title,
  Autor,
  Points,
  Description,
} from "./style";
import user from "../../../../assets/user.png";

const Card = (props) => {
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
    handleClickCard,
  } = props;

  return (
    <TouchableOpacity
      onPress={() => handleClickCard(id, nameDonor, donorId, points)}
    >
      <Container>
        <ContainerLeft>
          <Image
            style={{ display: "flex", flex: 1, height: 50, width: 100 }}
            source={{ uri: profilePicture ? profilePicture : user }}
          />
        </ContainerLeft>
        <ContainerRight>
          <ContainerRightUpside>
            <View>
              <Title>{title}</Title>
              <Autor>{author}</Autor>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Icon
                  name="loyalty"
                  size={15}
                  color="#000"
                  style={{ marginRight: 2 }}
                />
                <Points>{points}</Points>
              </View>
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
