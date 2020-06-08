import styled from "styled-components/native";

export const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  margin-top: 50px;
`;

export const Item = styled.View`
  display: flex;
  flex-direction: row;
  margin: 4px;
  padding: 7px;
  background-color: #feb665;
  border-radius: 7px;
  border: 0.5px solid #000;
`;
export const InfoView = styled.View`
  flex: 2;
`;

export const ViewButtons = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TouchableOpacityCompleted = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 5px;
  background-color: green;
  justify-content: center;
  align-items: center;
`;

export const TouchableOpacityCancel = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 5px;
  background-color: red;
  justify-content: center;
  align-items: center;
  margin-right: 4px;
`;

export const Title = styled.Text`
  text-align: center;
  font-size: 20px;
  margin-bottom: 5px;
`;
