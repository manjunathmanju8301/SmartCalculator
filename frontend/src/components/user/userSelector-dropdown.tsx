import { useMemo } from "react";
import { useGetUsersQuery } from "../../api/user-api";
import type { IUser } from "../../app-types";

interface UserSelectorProps {
    selectedUser?: IUser;
    isGust: boolean;
    onUserChange: (user: IUser) => void;
}

const UserSelector = ({
    selectedUser,
    isGust,
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
        let user;
        const eventValue = event.target.value;
        if (eventValue=== 'gust_user') {
            user = { user_id: -1, name: 'Gust User', is_gust: true, email:'gust@example.com' } as IUser;
        } else {

            const userId = Number(eventValue);
            user = users?.find(
                (user) => Number(user.user_id) === userId
            );
        }

        if (user) {
            onUserChange(user as IUser);
        }
    };

    const sortedUsers = useMemo(
        () =>
            users
                ? [...users].sort((a, b) =>
                    a.name.localeCompare(b.name)
                )
                : [],
        [users]
    );
    const selectedValue = useMemo(() => ((isGust || !selectedUser?.user_id) ? "" : selectedUser?.user_id), [isGust, selectedUser?.user_id]);
    return (
        <select
            value={selectedValue}
            onChange={handleChange}
        >
            <option value="gust_user">
                Gust user
            </option>

            {sortedUsers?.map((user) => (
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