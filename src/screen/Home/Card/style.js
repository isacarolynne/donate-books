import styled from 'styled-components/native';

export const Container = styled.View`
    width: 98%;
    height: 130px;
    display: flex;
    flexFlow: row nowrap;
    justifyContent: space-around;
    alignItems:center
    backgroundColor: #ffffffff;
    border: 0.7px solid #000;
    borderRadius: 10px;
    marginBottom: 15px;
`;

export const ContainerLeft = styled.View`
    width: 40%;
    height: 88%;
    justifyContent: center;
    alignItems: center;
    borderRadius: 15px;
    
`;

export const ContainerRight = styled.View`
    width: 60%;
    height: 100%;
    flexFlow: column nowrap;
    alignItems: center;
    justifyContent: center;
    borderRadius: 15px;
`;

export const ContainerRightUpside = styled.View`
    width: 100%;
    height: 45%;
    display: flex;
    flexFlow: row nowrap;
    justifyContent: space-between;
    borderRadius: 5px;

`;

export const ContainerRightDownside = styled.View`
    width: 100%;
    height: 50%;
    display: flex;
    flexFlow: column nowrap;
    justifyContent: flex-start;
    borderRadius: 5px;

`;

export const Title = styled.Text`
    fontWeight: bold;
    fontSize: 16px
`;

export const Autor = styled.Text`
    fontSize: 10px
`;

export const Points = styled.Text`
    fontSize: 13px
`;

export const Description = styled.Text`
    fontSize:12px

`;