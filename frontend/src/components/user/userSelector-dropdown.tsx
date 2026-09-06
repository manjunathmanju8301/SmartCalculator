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
        const userId = Number(event.target.value);

        const user = users?.find(
            (user) => Number(user.user_id) === userId
        );

        if (user) {
            onUserChange(user);
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
            <option value="" disabled>
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