import { useMemo } from "react";
import { useGetUsersQuery } from "../../api/user-api";
import type { IUser } from "../../app-types";
import { defaultGustUserInfo } from "../../constants/app-constants";

interface UserSelectorProps {
    selectedUser?: IUser;
    isGust: boolean;
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

    const sortedUsers = useMemo(
        () =>
            users
                ? [...users].sort((a, b) =>
                    a.name.localeCompare(b.name)
                )
                : [],
        [users]
    );

    const selectedValue = useMemo(
        () => (selectedUser?.user_id ? selectedUser?.user_id : "-1"),
        [selectedUser]
    );

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>Failed to load users</span>;
    }

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const eventValue = event.target.value;
        if (eventValue !== '-1') {
            const userId = Number(eventValue);
            const user = users?.find(
                (user) => Number(user.user_id) === userId
            );
            onUserChange(user as IUser);
        }else{
            onUserChange(defaultGustUserInfo);
        }

    };

    return (
        <select
            value={selectedValue}
            onChange={handleChange}
        >
            <option value="-1">
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