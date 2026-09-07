import { memo, useCallback } from "react"
import UserSelector from "../../user/userSelector-dropdown";
import { CalcHeader, HeaderItem, type CalculatorProps } from "./normal-calculator-style";
import type { IUser } from "../../../app-types";
import { StyleCreateUserButton } from "../../user/users";



export const CalculatorHeader = memo((props: { onUserChange: (user: IUser | undefined) => void, isHistoryEnabled: boolean, onHistoryToggle: () => void } & Pick<CalculatorProps, 'isGustUser' | 'user'>) => {
    const { onUserChange, onHistoryToggle, user, isGustUser, isHistoryEnabled } = props;


    console.log('isGustuser', isGustUser, 'isHistoryEnabled', isHistoryEnabled, 'user', user)

    const handleHistory = useCallback(() => {
        isGustUser ? alert('Please select a user to view history') : onHistoryToggle()
    }, [isGustUser])

    return (

        <CalcHeader>
            {/* <HeaderItem>User avc</HeaderItem> */}
            <UserSelector
                isGust={isGustUser}
                selectedUser={user}
                onUserChange={ onUserChange}
            />
            <StyleCreateUserButton isDisabled={isGustUser} onClick={handleHistory}>
                {isHistoryEnabled ? 'Hide History' : 'Show History'}
            </StyleCreateUserButton>
        </CalcHeader>
    )
})