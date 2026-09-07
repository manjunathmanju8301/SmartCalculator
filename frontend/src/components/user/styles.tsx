import styled from "styled-components";

export const StyledCardsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px;
    width: 100%;
    height: calc(100% - 50px); // Adjust height to account for the header
    box-sizing: border-box;
    overflow-y: auto;
`;

export const StyleCreateUserButton = styled.b<{ isCreateUserRendered?: boolean, isDisabled?: boolean }>`
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    cursor: ${props => (props.isCreateUserRendered || props.isDisabled) ? 'not-allowed' : 'pointer'};
    color: ${props => props.isCreateUserRendered ? 'gray' : 'blue'};
    transition: box-shadow 0.3s ease;
    background-color: ${props => props.isCreateUserRendered ? 'lightgray' : 'lightblue'};

    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
`;
