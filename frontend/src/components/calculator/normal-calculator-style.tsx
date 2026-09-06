import styled from "@emotion/styled";

export type CalculatorOperation = "+" | "-" | "*" | "/";

export interface CalculatorResult {
    firstValue: number;
    operation: CalculatorOperation;
    secondValue: number;
    result: number;
}

export interface CalculatorProps {
    title?: string;
    onCalculate?: (result: CalculatorResult) => void;
}

// padding: 40px 24px 28px;
export const Container = styled.section`
    // width: min(100%, 420px);
    width: 100%;
    max-width: 400px;
  height: calc(100dvh - 50px);
grid-template-rows: auto auto 1fr;
grid-template-rows: repeat(5, minmax(0, 1fr));
min-height: 0;
overflow: hidden;
    // min-height: 720px;
    padding: 16px;
    box-sizing: border-box;
    color: #f5f5f5;
    background: #000000;
    border: 1px solid #1f1f1f;
    border-radius: 0;
    font-family: inherit;
`;

export const HeaderItem = styled.b`
    overflow: hidden;
    color: black;

`;

export const CalcHeader = styled.div`
display:flex;
justify-content: space-around;
align-items: center;
height: 50px;
background: lightgray;
`;

export const Display = styled.output`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 100%;
    // height: 250px;
    overflow-x: auto;
    margin-bottom: 28px;
    padding: 40px 12px 20px;
    box-sizing: border-box;
    overflow: hidden;
    background: #000000;
    text-align: right;
`;

// export const Expression = styled.span<{ active: boolean }>`
//     display: block;
//     width: 100%;
//     height: calc(100% - 50px);
//     overflow: auto;
//     color: ${({ active }) => (active ? "#f5f5f5" : "#858585")};
//     font-size: ${({ active }) => (active ? "2rem" : "1.5rem")};
//     font-weight: 600;
//     line-height: 1.3;
//     text-align: right;
//     white-space: normal;
//     overflow-wrap: anywhere;
//     word-break: break-word;
//     transition: color 160ms ease, font-size 160ms ease;
// `;

export const Expression = styled.span<{ active: boolean }>`
	display: block;
	width: 100%;
	height: calc(100% - 50px);

	overflow: auto;

	/* Hide scrollbar - Chrome, Edge, Safari */
	&::-webkit-scrollbar {
		display: none;
	}

	/* Hide scrollbar - Firefox */
	scrollbar-width: none;

	/* Hide scrollbar - IE/old Edge */
	-ms-overflow-style: none;

	color: ${({ active }) => (active ? "#f5f5f5" : "#858585")};
	font-size: ${({ active }) => (active ? "2rem" : "1.5rem")};
	font-weight: 600;
	line-height: 1.3;
	text-align: right;
	white-space: normal;
	overflow-wrap: anywhere;
	word-break: break-word;
	transition: color 160ms ease, font-size 160ms ease;
`;

export const Answer = styled.span<{ active: boolean }>`
    display: block;
    width: 100%;
    margin-top: 22px;
    color: ${({ active }) => (active ? "#f5f5f5" : "#858585")};
    font-size: ${({ active }) => (active ? "3.25rem" : "1.5rem")};
    font-weight: 600;
    line-height: 1.2;
    text-align: right;
    overflow-wrap: anywhere;
    word-break: break-word;
    transition: color 160ms ease, font-size 160ms ease;
`;

export const Keypad = styled.div`
    display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-rows: repeat(5, minmax(0, 1fr));
    // grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 14px;
`;

export const ErrorMessage = styled.p`
    margin: 0 0 12px;
    color: #ff8d8d;
    font-size: 0.875rem;
`;

export const Key = styled.button<{ variant?: "operator" | "equals" }>`
    aspect-ratio: 1;
    padding: 8px;
    border: 0;
    border-radius: 50%;
    background: ${({ variant }) => (variant ? "#202020" : "#2c2c2c")};
    color: #f5f5f5;
    font: inherit;
    // font-size: 1.65rem;
     font-size: clamp(20px, 4vw, 32px);
     min-width: 0;
min-height: 0;
    font-weight: 600;
    cursor: pointer;

    &:hover,
    &:focus-visible {
        background: ${({ variant }) => (variant ? "#343434" : "#414141")};
        outline: 2px solid #f5f5f5;
        outline-offset: 1px;
    }

    &[data-equals="true"] {
        background: #ff851b;
        color: #ffffff;
    }
`;
