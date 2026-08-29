const API_URL = import.meta.env.VITE_API_URL;

export const getUsers = async () => {
    const response = await fetch(`${API_URL}/users`);

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }

    return response.json();
};

export const getUserById = async (userId: number) => {
    const response = await fetch(`${API_URL}/users/${userId}`);

    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }

    return response.json();
};

export const createUser = async (
    name: string,
    email: string
) => {
    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email
        })
    });

    if (!response.ok) {
        throw new Error('Failed to create user');
    }

    return response.json();
};