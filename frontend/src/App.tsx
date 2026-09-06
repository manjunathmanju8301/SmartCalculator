import styled from 'styled-components'
import Calculator from './components/calculator/normal/normal-calculator'
import Users from './components/user/users'
import { useCallback, useState } from 'react';
import type { IUser } from './app-types';

function App() {

    const [displayScreen, setDisplayScreen] = useState<'users' | 'calculator'>('users');
    const [selectedUser, setSelectedUser] = useState<IUser | undefined>(undefined);

    const handleUserSelection = useCallback((user: IUser) => {
        setSelectedUser(user);
        setDisplayScreen('calculator');
        // Perform any additional actions with the selected user ID
    }, []);

    const handleFooter = useCallback((arg: 'users' | 'calculator') => {
        setDisplayScreen(arg);
        setSelectedUser(undefined); // Reset selected user when switching screens
    }, [])

    return (
        <AppContainer>
            <StyledAppContentContainer>
                {displayScreen === 'users' ? <Users onUserSelect={handleUserSelection} /> : null}
                {displayScreen === 'calculator' ? <Calculator user={selectedUser} isGustUser={!!selectedUser} /> : null}

            </StyledAppContentContainer>
            <FooterContainer>
                <FooterItem isSelected={displayScreen === 'users'} onClick={() => handleFooter('users')}>Users</FooterItem>
                <FooterItem isSelected={displayScreen === 'calculator'} onClick={() => handleFooter('calculator')}>Calculator</FooterItem>
            </FooterContainer>
            {/* <Calculator
                items={[{ key: 'key', label: 'abc', value: 34, description: '----' }]}
                title="Product calculator"
                valueLabel="per item"
                valuePrefix="₹"
                onCalculate={handleCalculation} /> */}
        </AppContainer>
    )
}

export default App


const AppContainer = styled.div`
display: flex;
flex-direction: column;
height: calc(100dvh - 0px);
    justify-content: center;
`;

const FooterContainer = styled.div`
display:flex;
height: 50px;
justify-content: space-around;
border-top: 2px solid;
background-color: lightgray;
    flex-wrap: wrap;
    align-content: center;
width: 100%;
`;

const FooterItem = styled.div<{ isSelected: boolean }>`
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

const StyledAppContentContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
height: calc(100dvh - 50px);
    justify-content: center;

`;