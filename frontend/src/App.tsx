import styled from 'styled-components'
import Calculator from './components/normal-calculator'
import Users from './components/users'
import { useCallback, useState } from 'react';

function App() {

    const [displayScreen, setDisplayScreen] = useState<'users' | 'calculator'>('users');

    const onFooterItem = useCallback((arg: 'users' | 'calculator') => {
        setDisplayScreen(arg);
    }, [])

    return (
        <>
            <StyledAppContainer>
                {displayScreen === 'users' ? <Users /> : null}
                {displayScreen === 'calculator' ? <Calculator /> : null}

            </StyledAppContainer>
            <FooterContainer>
                <FooterItem isSelected={displayScreen==='users'} onClick={() => onFooterItem('users')}>Users</FooterItem>
                <FooterItem isSelected={displayScreen==='calculator'} onClick={() => onFooterItem('calculator')}>Calculator</FooterItem>
            </FooterContainer>
            {/* <Calculator
                items={[{ key: 'key', label: 'abc', value: 34, description: '----' }]}
                title="Product calculator"
                valueLabel="per item"
                valuePrefix="₹"
                onCalculate={handleCalculation} /> */}
        </>
    )
}

export default App

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

const FooterItem = styled.div<{isSelected:boolean}>`
margin: 8px;
height: 30px;
align-content: center;
min-width: 100px;
border-radius: 20%;
text-align: center;
color: blue;
font-weight: 600;
border: 2px lightblue;
background: ${({isSelected})=>(isSelected?'lightblue':'lightgray')};
cursor: pointer;
`;

const StyledAppContainer = styled.div`
display: flex;
height: calc(100dvh - 50px);
    justify-content: center;

`;