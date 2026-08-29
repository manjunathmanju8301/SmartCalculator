// import { useNavigate } from 'react-router-dom';
import { useGetUsersQuery } from '../api/user-api';
import { UserCard } from './user-card';

const Users = () => {
    // const navigate = useNavigate();

    const {
        data: users,
        isLoading,
        isError,
    } = useGetUsersQuery();
    if (isLoading) {
        return <p>Loading users...</p>;
    }

    if (isError) {
        return <p>Failed to load users.</p>;
    }

    return (
        <div>
            <h1>Users</h1>
            {users?.map((user) => (
                <UserCard key={user.user_id} {...user}/>
            ))}
        </div>
    );
};

export default Users;