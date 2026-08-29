import { memo, useCallback } from 'react';
import { useLazyGetExpressionQuery } from '../api/calculator-api';
import type { IUser } from '../app-types';

export const UserCard = memo((user: IUser) => {

    const [getExpressions, { data, isLoading, isError }] =
        useLazyGetExpressionQuery();

    const onUserClick = useCallback(async () => {
        const res = await getExpressions({ userId: user.user_id });
        console.log('userid: ', user.user_id, ', res: ', res)
        console.log('userid: ', user.user_id, ', data: ', data)
    }, [getExpressions]);

    if (isLoading) {
        return <p>Loading users...</p>;
    }

    if (isError) {
        return <p>Failed to load users.</p>;
    }


    return (
        <div
            key={user.user_id}
            onClick={onUserClick}
            style={{
                cursor: 'pointer',
                padding: '12px',
                border: '1px solid #ccc',
                marginBottom: '8px',
            }}
        >
            <h3>{user.name}</h3>
            <p>{user.email}</p>
        </div>

    );
});
