const API_URL = import.meta.env.VITE_API_URL;

export const getUserExpressions = async (
    userId: number
) => {
    const response = await fetch(
        `${API_URL}/users/${userId}/expressions`
    );

    if (!response.ok) {
        throw new Error('Failed to fetch expressions');
    }

    return response.json();
};

export const createExpression = async (
    userId:number,
    expression:string,
    result:number
)=>{
    const response = await fetch(
        `${API_URL}/users/${userId}/expression`,
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                expression, result
            })
        }
    );
    if(!response.ok){
        throw new Error('Failed to create expression');
    }

    return response.json();
}