import styled from "styled-components";

export const AppContainer = styled.div`
display: flex;
flex-direction: column;
height: calc(100dvh - 0px);
    justify-content: center;
`;

export const FooterContainer = styled.div`
display:flex;
height: 50px;
justify-content: space-around;
border-top: 2px solid;
background-color: lightgray;
    flex-wrap: wrap;
    align-content: center;
width: 100%;
`;

export const FooterItem = styled.div<{ isSelected: boolean }>`
margin: 8px;
height: 30px;
align-content: center;
min-width: 100px;
border-radius: 10px;
text-align: center;
color: blue;
font-weight: 600;
border: 1px solid blue;
background: ${({ isSelected }) => (isSelected ? 'lightblue' : 'lightgray')};
cursor: pointer;
 &:hover {
        box-shadow: 0 4px 8px rgba(0, 64, 255, 0.4);
    }
`;

export const StyledAppContentContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
height: calc(100dvh - 50px);
    justify-content: center;

`;