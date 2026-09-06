import { memo } from "react"
import UserSelector from "../../user/userSelector-dropdown";
import { CalcHeader, HeaderItem, type CalculatorProps } from "./normal-calculator-style";
import type { IUser } from "../../../app-types";



export const CalculatorHeader = memo((props:{onUserChange:(user: IUser|undefined) => void} & Pick<CalculatorProps, 'isGustUser'|'user'>)=>{
    const{onUserChange, user, isGustUser}=props;


    
    return(
      
        <CalcHeader>
                        {/* <HeaderItem>User avc</HeaderItem> */}
                        <UserSelector
                            isGust={isGustUser}
                            selectedUser={user}
                            onUserChange={()=>onUserChange(user)}
                        />
                        <HeaderItem>{'History'}</HeaderItem>
                    </CalcHeader>
    )
})