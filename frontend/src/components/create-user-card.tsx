// import { memo, useCallback } from "react";
// import { useCreateUserMutation } from '../api/user-api';

// export const CreateUserCard = memo(()=>{
//     const onCreate = useCallback(()=>{

//         useCreateUserMutation({

//         })
//     },[])
//     return(<>
//     <label>User Name</label>
//     <input/>
//     <label>email</label>
//     <input/>
//     <button onClick={onCreate}>Create New User</button>
//     </>)
// });
import { memo, useCallback, useEffect, useState } from "react";
import { useCreateUserMutation } from "../api/user-api";

export const CreateUserCard = memo(({ onComplete }: { onComplete: () => void }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [
        createUser,
        {
            isLoading,
            isError,
            error,
            isSuccess,
        },
    ] = useCreateUserMutation();

    useEffect(() => {
        onComplete();
    }, [isSuccess, error]);

    const onCreate = useCallback(async () => {
        // Basic validation
        if (!name.trim()) {
            alert("Please enter user name");
            return;
        }

        if (!email.trim()) {
            alert("Please enter email");
            return;
        }

        try {
            await createUser({
                name: name.trim(),
                email: email.trim(),
            }).unwrap();

            // Clear form after successful creation
            setName("");
            setEmail("");

            alert("User created successfully");
        } catch (err) {
            console.error("Failed to create user:", err);
        }
    }, [name, email, createUser, onComplete]);

    return (
        <div
            style={{
                padding: "12px",
                margin: "8px 6px",
                border: "1px solid #ccc",
                borderRadius: "8px",
            }}
        >
            <div style={{ marginBottom: "10px" }}>
                <label>
                    User Name
                </label>

                <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Enter user name"
                    disabled={isLoading}
                    style={{
                        display: "block",
                        width: "100%",
                        padding: "8px",
                        marginTop: "4px",
                        boxSizing: "border-box",
                    }}
                />
            </div>

            <div style={{ marginBottom: "10px" }}>
                <label>
                    Email
                </label>

                <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter email"
                    disabled={isLoading}
                    style={{
                        display: "block",
                        width: "100%",
                        padding: "8px",
                        marginTop: "4px",
                        boxSizing: "border-box",
                    }}
                />
            </div>

            <button
                type="button"
                onClick={onCreate}
                disabled={isLoading}
                style={{
                    padding: "8px 12px",
                    cursor: isLoading ? "not-allowed" : "pointer",
                }}
            >
                {isLoading ? "Creating..." : "Create New User"}
            </button>

            {isSuccess && (
                <p style={{ color: "green" }}>
                    User created successfully.
                </p>
            )}

            {isError && (
                <p style={{ color: "red" }}>
                    Failed to create user.
                </p>
            )}
        </div>
    );
});