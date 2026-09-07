// import { useNavigate } from 'react-router-dom';
import { memo, useCallback, useState } from 'react';
import {useDeleteUserMutation, useGetUsersQuery } from '../../api/user-api';
import { UserCard } from './user-card';
import { CreateUserCard } from './create-user-card';
import type { IUser } from '../../app-types';
import { StyleCreateUserButton, StyledCardsContainer } from './styles';
import { defaultGustUserInfo } from '../../constants/app-constants';

interface IUserProps {
    onUserSelect: (userId: IUser) => void;
    selectedUser:IUser;
    setSelectedUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}

const Users = memo((props: IUserProps) => {
    const { onUserSelect, selectedUser, setSelectedUser } = props;
    const [deleteUser, 
        // { isSuccess, isError: isDeleteError, data: deleteData }
    ] = useDeleteUserMutation();
    const [showCreateUser, setShowCreateUser] = useState<boolean>(false);
    const {
        data: users,
        isLoading,
        isError,
    } = useGetUsersQuery();

    const toggleCreateUserCard = useCallback(() => {
        setShowCreateUser(preState => !preState);
    }, [])
    const handleUserClick = useCallback((user: IUser) => {
        onUserSelect(user);
    }, [onUserSelect]);

    const handleDeleteUser = useCallback(async (user: IUser) => {
        try {
            const result = await deleteUser({ id: user.user_id }).unwrap();
            if(result) {
                console.log('User deleted successfully:', result);
                setSelectedUser(defaultGustUserInfo); // Reset to default gust user after deletion
            }
        } catch (err) {
            console.error('Failed to delete user:', err);
        }
    }, [deleteUser, setSelectedUser]);

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
                    <UserCard key={user.user_id} user={user}   selectedUser={selectedUser} onUserClick={handleUserClick} onDeleteUser={handleDeleteUser} />
                ))}
            </StyledCardsContainer>
        </div>
    );
});

export default Users;
