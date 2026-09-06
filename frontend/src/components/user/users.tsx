// import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { useCreateUserMutation, useGetUsersQuery } from '../../api/user-api';
import { UserCard } from './user-card';
import { CreateUserCard } from './create-user-card';
import styled from 'styled-components';

const Users = () => {
    // const navigate = useNavigate();
    const [showCreateUser, setShowCreateUser] = useState<boolean>(false);
    const {
        data: users,
        isLoading,
        isError,
    } = useGetUsersQuery();

    const toggleCreateUserCard = useCallback(() => {
        setShowCreateUser(preState => !preState);
    }, [])
    if (isLoading) {
        return <p>Loading users...</p>;
    }

    if (isError) {
        return <p>Failed to load users.</p>;
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'lightgray', padding: '8px' }}>
                <b style={{ margin: '6px', padding: '6px' }}>Users</b>
                <StyleCreateUserButton
                    onClick={toggleCreateUserCard}
                    isCreateUserRendered={showCreateUser}>
                    + Create User
                </StyleCreateUserButton>
            </div>
            <StyledCardsContainer>
                {showCreateUser && <CreateUserCard onComplete={toggleCreateUserCard} />}
                {users?.map((user) => (
                    <UserCard key={user.user_id} {...user} />
                ))}
            </StyledCardsContainer>
        </div>
    );
};

export default Users;

const StyledCardsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
    width: 100%;
    height: calc(100% - 50px); // Adjust height to account for the header
    box-sizing: border-box;
    overflow-y: auto;
`;

const StyleCreateUserButton = styled.b<{ isCreateUserRendered: boolean }>`
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    cursor: ${props => props.isCreateUserRendered ? 'not-allowed' : 'pointer'};
    color: ${props => props.isCreateUserRendered ? 'gray' : 'blue'};
    transition: box-shadow 0.3s ease;
    background-color: ${props => props.isCreateUserRendered ? 'lightgray' : 'lightblue'};

    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
`;