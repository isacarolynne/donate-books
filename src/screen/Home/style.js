import styled from 'styled-components/native'


export const Container = styled.View`
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: center;
    background: #eeeeee;
    paddingTop:25px;
`
export const ContainerSearch = styled.View`
    flexDirection: row;
    alignItems: center;
    justifyContent: center;
    background: #fff;
    borderWidth:1px;
    borderRadius: 12px;
    width: 82%;
    height:8%;
    borderColor:#fff
`
export const Search_text = styled.TextInput`
    fontSize:20px;
    width: 82%;
    height:80%;
    borderRadius: 10px;
    alignItems: center;
    marginRight:8px
    marginLeft:8px
`

export const ContainerBody = styled.View`
    background-color: red;
    height: 100px;
    width: 100px;
`
export const ContainerList = styled.ScrollView`
    height: 100%;
    marginTop: 10px;
`;
