import { memo, useCallback, useState } from 'react';
import styled from 'styled-components';
import type { IUser } from '../../app-types';

interface IUserCardProps {
    user: IUser;
    onUserClick: (userId: IUser) => void;
    onDeleteUser: (userId: IUser) => Promise<void>;
}

export const UserCard = memo(({ user, onUserClick, onDeleteUser }: IUserCardProps) => {

    const [deletingUserId, setDeletingUserId] = useState<number | null>(null);

    const handleUserClick = useCallback(() => {
        onUserClick(user);
    }, [onUserClick, user]);

    const handleDeleteUser = useCallback(async () => {
        setDeletingUserId(user.user_id);
        await onDeleteUser(user);
    }, [user, onDeleteUser]);

    return (
        <StyleUserCard
            key={user.user_id}
            onClick={handleUserClick}
            isDeleting={deletingUserId === user.user_id}
        >
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <StyleUserCardFooter>
                <StyleUserCardButton onClick={(e) => {
                    e.stopPropagation();
                    handleUserClick();
                }}>
                    View Expressions
                </StyleUserCardButton>
                <StyledUserCardDelete onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteUser();
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