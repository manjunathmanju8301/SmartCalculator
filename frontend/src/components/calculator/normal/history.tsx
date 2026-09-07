import { memo } from "react";
import styled from "styled-components";
import { useGetExpressionQuery } from "../../../api/calculator-api";
import type { IExpression } from "../../../app-types";

interface IHistoryProps {
    userId: number;
}

const HistoryPanel = styled.section`
    display: flex;
    flex: 1;
    min-height: 0;
    flex-direction: column;
    gap: 12px;
    padding: 16px 0;
    overflow: hidden;
`;

const HistoryTitle = styled.h2`
    margin: 0;
    color: #f5f5f5;
    font-size: 1.25rem;
`;

const HistoryList = styled.ol`
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-height: 0;
    margin: 0;
    padding: 0;
    overflow-y: auto;
    list-style: none;
`;

const HistoryItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 12px;
    border: 1px solid #2c2c2c;
    background: #151515;
`;

const ExpressionText = styled.span`
    min-width: 0;
    overflow-wrap: anywhere;
    color: #f5f5f5;
    font-size: 1rem;
`;

const ResultText = styled.strong`
    flex-shrink: 0;
    color: #ff851b;
    font-size: 1.1rem;
`;

const EmptyMessage = styled.p`
    margin: 0;
    color: #858585;
`;

const formatDate = (value: string) => {
    const date = new Date(value);

    return Number.isNaN(date.getTime())
        ? "Unknown time"
        : date.toLocaleString();
};

const HistoryEntry = memo(({ item }: { item: IExpression }) => (
    <HistoryItem>
        <div>
            <ExpressionText>{item.expression}</ExpressionText>
            <EmptyMessage>{formatDate(item.created_at)}</EmptyMessage>
        </div>
        <ResultText>= {item.result}</ResultText>
    </HistoryItem>
));

export const History = ({ userId }: IHistoryProps) => {
    const { data, isError, isLoading } = useGetExpressionQuery({ userId }, { skip: !userId });

    if (isLoading) {
        return <HistoryPanel aria-busy="true">Loading history...</HistoryPanel>;
    }

    if (isError) {
        return (
            <HistoryPanel>
                <HistoryTitle>History</HistoryTitle>
                <EmptyMessage role="alert">Unable to load calculation history.</EmptyMessage>
            </HistoryPanel>
        );
    }

    const expressions = data?.data ?? [];

    return (
        <HistoryPanel aria-label="Calculation history">
            <HistoryTitle>History</HistoryTitle>
            {expressions.length === 0 ? (
                <EmptyMessage>No calculations yet.</EmptyMessage>
            ) : (
                <HistoryList>
                    {expressions.map((expression) => (
                        <HistoryEntry key={expression.exp_id} item={expression} />
                    ))}
                </HistoryList>
            )}
        </HistoryPanel>
    );

}