// import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { useCreateUserMutation, useGetUsersQuery } from '../api/user-api';
import { UserCard } from './user-card';
import { CreateUserCard } from './create-user-card';

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
        <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <b style={{ margin: '6px', padding: '6px' }}>Users</b>
                <b onClick={toggleCreateUserCard}
                    style={{
                        margin: '6px', padding: '6px', color: 'blue', backgroundColor: 'lightblue', border: '1px solid', borderRadius: '10%', width: '100px'
                    }}>
                    + Create User
                </b>
            </div>
            {showCreateUser && <CreateUserCard onComplete={toggleCreateUserCard}/>}
            {users?.map((user) => (
                <UserCard key={user.user_id} {...user} />
            ))}
        </div>
    );
};

export default Users;