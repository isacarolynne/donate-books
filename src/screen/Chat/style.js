import styled from 'styled-components/native' 
import { Platform } from 'react-native';

export const ContainerKeyboard = styled.KeyboardAvoidingView.attrs({
    behavior: Platform.OS === 'ios' ? 'padding' : 'height',
  })`
  alignItems: center;
  justifyContent: center;

`

export const ContainerInsideKeyboard = styled.View`
    flexDirection: column;
    alignItems: center;
    justifyContent: center;
    width: 100%;
    height: 100%;
`

export const Container = styled.View`
    flex:1
    justifyContent:center
    alignItems:center
`

export const Title = styled.Text`
    fontSize:40px
`

export const TextMessage = styled.Text`
    color: #fff;
    padding: 7px;
    fontSize: 16px;
`

export const TextTime = styled.Text`
    color: #eee;
    padding: 3px;
    fontSize: 12px;
`

export const ContainerInputMessage = styled.View`
    flexDirection: row;
    alignItems: center;
    margin: 10px;
`

export const InputMessage = styled.TextInput`
    padding: 10px;
    borderWidth: 1px
    borderColor: #CCC;
    width: 85%;
    borderRadius: 5px;
    justifyContent: flex-end;
`

export const ButtonSend = styled.TouchableOpacity`
    marginLeft: 10px;
`

export const IconButtonSend = styled.Image`
    width: 30px;
    height: 30px;
    marginLeft: 5px;
`