import styled from 'styled-components/native'


export const Container = styled.View`
    justifyContent: center;
    marginTop: 50px;
`

export const Item = styled.View`
    display: flex;
    flexDirection: row;
    margin: 4px;
    padding: 7px;
    backgroundColor: #FEB665;
    borderRadius: 7px;
    border: 0.5px solid #000;
`
export const InfoView = styled.View`
    flex: 2;
`

export const ViewButtons = styled.View`
    flexDirection: row;
    alignItems: center;
`

export const TouchableOpacityCompleted = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    borderRadius: 5px;
    backgroundColor: green;
    justifyContent: center;
    alignItems: center;
`

export const TouchableOpacityCancel = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    borderRadius: 5px;
    backgroundColor: red;
    justifyContent: center;
    alignItems: center;
    marginRight: 4px;
`

export const Title = styled.Text`
    textAlign: center;
    fontSize:20px;
    marginBottom: 5px;
`