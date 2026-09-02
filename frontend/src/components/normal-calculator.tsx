import { useState } from "react";
import {  Container, Display, Expression, Answer, ErrorMessage, Keypad, Key, CalcHeader, HeaderItem } from "./normal-calculator-style";
import type {CalculatorOperation, CalculatorProps, CalculatorResult}from "./normal-calculator-style";
import UserSelector from "./userSelector";
import type { IUser } from "../app-types";

export const Calculator = ({
	title = "Calculator",
	onCalculate,
}: CalculatorProps) => {
	 const [selectedUser, setSelectedUser] = useState<IUser>();
	const [display, setDisplay] = useState("0");

	const [storedValue, setStoredValue] = useState<number>();

	const [pendingOperation, setPendingOperation] =
		useState<CalculatorOperation>();

	const [waitingForOperand, setWaitingForOperand] = useState(false);

	const [calculation, setCalculation] = useState<CalculatorResult>();

	const [error, setError] = useState("");

	const [expression, setExpression] = useState("");

	const [hasResult, setHasResult] = useState(false);

	/*
	 * Enter a number.
	 */
	const enterDigit = (digit: string) => {
		if (hasResult) {
			setDisplay(digit);
			setExpression(digit);
			setCalculation(undefined);
			setHasResult(false);
			setWaitingForOperand(false);
			setError("");
			return;
		}

		setDisplay((currentDisplay) =>
			waitingForOperand || currentDisplay === "0"
				? digit
				: `${currentDisplay}${digit}`,
		);

		setExpression(
			(currentExpression) => `${currentExpression}${digit}`,
		);

		setWaitingForOperand(false);
		setError("");
	};

	/*
	 * Enter decimal point.
	 */
	const enterDecimal = () => {
		if (hasResult) {
			setDisplay("0.");
			setExpression("0.");
			setHasResult(false);
			setCalculation(undefined);
			setWaitingForOperand(false);
			setError("");
			return;
		}

		if (waitingForOperand) {
			setDisplay("0.");

			setExpression(
				(currentExpression) => `${currentExpression}0.`,
			);

			setWaitingForOperand(false);
			setError("");

			return;
		}

		if (!display.includes(".")) {
			setDisplay(`${display}.`);

			setExpression(
				(currentExpression) => `${currentExpression}.`,
			);
		}
	};

	/*
	 * Clear calculator.
	 */
	const clear = () => {
		setDisplay("0");
		setStoredValue(undefined);
		setPendingOperation(undefined);
		setWaitingForOperand(false);
		setError("");
		setExpression("");
		setHasResult(false);
		setCalculation(undefined);
	};

	const backspace = () => {
		if (waitingForOperand || hasResult) return;

		setDisplay((currentDisplay) => {
			if (currentDisplay.length <= 1) {
				return "0";
			}

			return currentDisplay.slice(0, -1);
		});

		setExpression((currentExpression) => {
			if (currentExpression.length <= 1) {
				return "";
			}

			return currentExpression.slice(0, -1);
		});

		setError("");
	};

	/*
	 * Perform calculation.
	 */
	const calculate = (
		firstValue: number,
		operation: CalculatorOperation,
		secondValue: number,
	) => {
		if (operation === "+") {
			return firstValue + secondValue;
		}

		if (operation === "-") {
			return firstValue - secondValue;
		}

		if (operation === "*") {
			return firstValue * secondValue;
		}

		return secondValue === 0
			? undefined
			: firstValue / secondValue;
	};

	const chooseOperation = (
		nextOperation: CalculatorOperation,
	) => {
	
		if (hasResult && calculation) {
			setStoredValue(calculation.result);

			setPendingOperation(nextOperation);

			setExpression(
				`${calculation.result}${nextOperation}`,
			);

			setWaitingForOperand(true);

			setHasResult(false);

			setError("");

			return;
		}

		const currentValue = Number(display);

		if (!Number.isFinite(currentValue)) {
			return;
		}

		if (
			storedValue !== undefined &&
			pendingOperation &&
			!waitingForOperand
		) {
			const intermediateResult = calculate(
				storedValue,
				pendingOperation,
				currentValue,
			);

			if (intermediateResult === undefined) {
				setError("Cannot divide by zero.");
				return;
			}

			setDisplay(String(intermediateResult));

			setStoredValue(intermediateResult);

			setExpression(
				(currentExpression) =>
					`${currentExpression}${nextOperation}`,
			);
		} else if (storedValue === undefined) {
			setStoredValue(currentValue);

			setExpression(
				`${currentValue}${nextOperation}`,
			);
		}

		setPendingOperation(nextOperation);

		setWaitingForOperand(true);

		setError("");
	};

	/*
	 * Calculate final result.
 */
	const equals = () => {
		if (
			storedValue === undefined ||
			!pendingOperation ||
			waitingForOperand
		) {
			return;
		}

		const secondValue = Number(display);

		const result = calculate(
			storedValue,
			pendingOperation,
			secondValue,
		);

		if (result === undefined) {
			setError("Cannot divide by zero.");
			return;
		}

		const calculationResult: CalculatorResult = {
			firstValue: storedValue,
			operation: pendingOperation,
			secondValue,
			result,
		};

		/*
		 * Display the result.
		 */
		setDisplay(String(result));

		/*
		 * IMPORTANT:
		 *
		 * Do NOT replace expression here.
		 *
		 * The expression already contains the complete calculation.
		 *
		 * Example:
		 *
		 * 1+2+3
		 *
		 * We want to keep:
		 *
		 * 1+2+3
		 *
		 * instead of changing it to:
		 *
		 * 3+3
		 */
		setCalculation(calculationResult);

		setStoredValue(undefined);

		setPendingOperation(undefined);

		setWaitingForOperand(true);

		/*
		 * This causes:
		 *
		 * Expression -> gray/smaller
		 * Answer     -> white/larger
		 */
		setHasResult(true);

		onCalculate?.(calculationResult);
	};

	/*
	 * Percentage.
	 */
	const percent = () => {
		const value = Number(display);

		if (!Number.isFinite(value)) {
			return;
		}

		const percentage = value / 100;

		setDisplay(String(percentage));

		/*
		 * Replace the current number at the end
		 * of the expression.
		 *
		 * Example:
		 *
		 * 100+
		 * 50%
		 *
		 * becomes:
		 *
		 * 100+0.5
		 */
		setExpression((currentExpression) => {
			const lastNumberMatch =
				currentExpression.match(/(\d*\.?\d+)$/);

			if (!lastNumberMatch) {
				return String(percentage);
			}

			return (
				currentExpression.slice(
					0,
					-currentNumberLength(lastNumberMatch[0]),
				) + percentage
			);
		});

		setError("");
	};

	/*
	 * Get length of the current number.
	 */
	const currentNumberLength = (value: string) => {
		return value.length;
	};

	return (
		<Container>
			<CalcHeader>
			{/* <HeaderItem>User avc</HeaderItem> */}
			 <UserSelector
            selectedUser={selectedUser}
            onUserChange={(user) => {
				console.log(user);
                setSelectedUser(user);

                // Reset calculator when user changes
                setDisplay("0");
                setStoredValue(undefined);
                setPendingOperation(undefined);
                setWaitingForOperand(false);
                setCalculation(undefined);
                setError("");
                setExpression("");
                setHasResult(false);
            }}
        />
			<HeaderItem>{'History'}</HeaderItem>
			</CalcHeader>
			<Display aria-label="Calculator display">
				<Expression active={!hasResult}>
					{expression || display}
				</Expression>

				<Answer active={hasResult}>
					{display}
				</Answer>
			</Display>

			{error && (
				<ErrorMessage role="alert">
					{error}
				</ErrorMessage>
			)}

			<Keypad>
				<Key
					type="button"
					onClick={clear}
				>
					C
				</Key>

				<Key
					type="button"
					onClick={backspace}
					aria-label="Backspace"
				>
					&lt;
				</Key>

				<Key
					type="button"
					onClick={percent}
				>
					%
				</Key>

				<Key
					type="button"
					variant="operator"
					onClick={() => chooseOperation("-")}
				>
					-
				</Key>

				{["1", "2", "3"].map((digit) => (
					<Key
						key={digit}
						type="button"
						onClick={() => enterDigit(digit)}
					>
						{digit}
					</Key>
				))}

				<Key
					type="button"
					variant="operator"
					onClick={() => chooseOperation("*")}
				>
					*
				</Key>

				{["4", "5", "6"].map((digit) => (
					<Key
						key={digit}
						type="button"
						onClick={() => enterDigit(digit)}
					>
						{digit}
					</Key>
				))}

				<Key
					type="button"
					variant="operator"
					onClick={() => chooseOperation("/")}
				>
					/
				</Key>

				{["7", "8", "9"].map((digit) => (
					<Key
						key={digit}
						type="button"
						onClick={() => enterDigit(digit)}
					>
						{digit}
					</Key>
				))}

				<Key
					type="button"
					variant="operator"
					onClick={() => chooseOperation("+")}
				>
					+
				</Key>

				<Key
					type="button"
					onClick={() => enterDigit("0")}
				>
					0
				</Key>

				<Key
					type="button"
					onClick={() => enterDigit("00")}
				>
					00
				</Key>

				<Key
					type="button"
					onClick={enterDecimal}
				>
					.
				</Key>

				<Key
					type="button"
					variant="equals"
					data-equals="true"
					onClick={equals}
				>
					=
				</Key>
			</Keypad>
		</Container>
	);
};

export default Calculator;