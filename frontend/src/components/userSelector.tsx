import { useGetUsersQuery } from "../api/user-api";
import type { IUser } from "../app-types";

interface UserSelectorProps {
    selectedUser?: IUser;
    onUserChange: (user: IUser) => void;
}

const UserSelector = ({
    selectedUser,
    onUserChange,
}: UserSelectorProps) => {

    const {
        data: users,
        isLoading,
        isError,
    } = useGetUsersQuery();

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>Failed to load users</span>;
    }

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const userId = Number(event.target.value);

        const user = users?.find(
            (user) => Number(user.user_id) === userId
        );

        if (user) {
            onUserChange(user);
        }
    };

    return (
        <select
            value={selectedUser?.user_id ?? ""}
            onChange={handleChange}
        >
            <option value="" disabled>
                Select user
            </option>

            {users?.map((user) => (
                <option
                    key={user.user_id}
                    value={user.user_id}
                >
                    {user.name}
                </option>
            ))}
        </select>
    );
};

export default UserSelector;