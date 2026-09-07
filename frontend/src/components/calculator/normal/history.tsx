import { memo, useEffect } from "react";
import { useGetExpressionQuery } from "../../../api/calculator-api";

interface IHistoryProps {
    userId: number;
}

export const History = memo(({ userId }: IHistoryProps) => {
    const { data, isError, isLoading } = useGetExpressionQuery({ userId }, { skip: !userId });
    const {data: expressions} = data || {message:'', data:[]};
    useEffect(() => {
        if (isLoading) {
            console.log("Loading expressions for user:", userId);
        } else if (isError) {
            console.log("Failed to load expressions");
        } else {
            console.log("User:", userId, "expressions:", expressions);
        }
    }, [isLoading, isError, expressions, userId]);

return(<div>History</div>)

})