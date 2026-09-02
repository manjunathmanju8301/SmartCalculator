import { memo, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLazyGetExpressionQuery } from '../api/calculator-api';
import type { IUser } from '../app-types';
import { useDeleteUserMutation } from '../api/user-api';

export const UserCard = memo((user: IUser) => {

    const [getExpressions, { data, isLoading, isError }] = useLazyGetExpressionQuery();
    const [deleteUser, { isSuccess, isError: isDeleteError, data: deleteData }] = useDeleteUserMutation();
    const [deletingUserId, setDeletingUserId] = useState<number | null>(null);

    useEffect(() => {
        if (isSuccess || isDeleteError) {
            setDeletingUserId(null);
        }
    }, [isSuccess, isDeleteError]);

    const onUserClick = useCallback(async () => {
        const res = await getExpressions({ userId: user.user_id });
        console.log('userid: ', user.user_id, ', res: ', res)
        console.log('userid: ', user.user_id, ', data: ', data)
    }, [getExpressions]);

    const onDeleteUser = useCallback(async () => {
        setDeletingUserId(user.user_id);
        try {
            console.log('Deleting user with id:', deleteData);
            await deleteUser({ id: user.user_id }).unwrap();
            console.log('User deleted successfully');
        } catch (err) {
            console.error('Failed to delete user:', err);
        }
    }, [deleteUser, user.user_id]);

    if (isLoading) {
        return <p>Loading users...</p>;
    }

    if (isError) {
        return <p>Failed to load users.</p>;
    }
    return (
        <StyleUserCard
            key={user.user_id}
            onClick={onUserClick}
            isDeleting={deletingUserId === user.user_id}
        >
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <StyleUserCardFooter>
                <StyleUserCardButton onClick={(e) => {
                    e.stopPropagation();
                    onUserClick();
                }}>
                    View Expressions
                </StyleUserCardButton>
                <StyledUserCardDelete onClick={(e) => {
                    e.stopPropagation();
                    onDeleteUser();
                }}>
                    {deletingUserId === user.user_id ? 'Deleting...' : 'Delete'}
                </StyledUserCardDelete>
            </StyleUserCardFooter>
        </StyleUserCard>

    );
});

const StyleUserCard = styled.div<{ isDeleting: boolean }>`
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    margin: 8px 0;
    cursor: pointer;
    transition: box-shadow 0.3s ease;
    background-color: ${props => props.isDeleting ? '#f8d7da' : 'white'};

    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
`;

const StyleUserCardFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
`;

const StyleUserCardButton = styled.button`
    padding: 4px 8px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const StyledUserCardDelete = styled.div`
    padding: 4px 8px;
    border: none;
    background-color: #dc3545;
    color: white;
    border-radius: 4px;
    cursor: pointer;
&:hover{
background-color: #c82333;
}
    `;