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