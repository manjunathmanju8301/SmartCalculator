import { memo } from "react";
import { StyledKeypad, StyledKey, type CalculatorOperation } from "./normal-calculator-style";

interface IKeyButtonsProps {
    chooseOperation:  (nextOperation: CalculatorOperation) => void;
    enterDigit: (digit: string) => void;
    enterDecimal: () => void;
    clear: () => void;
    backspace: () => void;
    percent: () => void;
    equals: () => void;
}

export const Keypad = memo((props:IKeyButtonsProps) => {
    const {backspace, chooseOperation, clear, enterDecimal, enterDigit, equals, percent}=props

    return(
<StyledKeypad>
				<StyledKey
					type="button"
					onClick={clear}
				>
					C
				</StyledKey>

				<StyledKey
					type="button"
					onClick={backspace}
					aria-label="Backspace"
				>
					&lt;
				</StyledKey>

				<StyledKey
					type="button"
					onClick={percent}
				>
					%
				</StyledKey>

				<StyledKey
					type="button"
					variant="operator"
					onClick={() => chooseOperation("-")}
				>
					-
				</StyledKey>

				{["1", "2", "3"].map((digit) => (
					<StyledKey
						key={digit}
						type="button"
						onClick={() => enterDigit(digit)}
					>
						{digit}
					</StyledKey>
				))}

				<StyledKey
					type="button"
					variant="operator"
					onClick={() => chooseOperation("*")}
				>
					*
				</StyledKey>

				{["4", "5", "6"].map((digit) => (
					<StyledKey
						key={digit}
						type="button"
						onClick={() => enterDigit(digit)}
					>
						{digit}
					</StyledKey>
				))}

				<StyledKey
					type="button"
					variant="operator"
					onClick={() => chooseOperation("/")}
				>
					/
				</StyledKey>

				{["7", "8", "9"].map((digit) => (
					<StyledKey
						key={digit}
						type="button"
						onClick={() => enterDigit(digit)}
					>
						{digit}
					</StyledKey>
				))}

				<StyledKey
					type="button"
					variant="operator"
					onClick={() => chooseOperation("+")}
				>
					+
				</StyledKey>

				<StyledKey
					type="button"
					onClick={() => enterDigit("0")}
				>
					0
				</StyledKey>

				<StyledKey
					type="button"
					onClick={() => enterDigit("00")}
				>
					00
				</StyledKey>

				<StyledKey
					type="button"
					onClick={enterDecimal}
				>
					.
				</StyledKey>

				<StyledKey
					type="button"
					variant="equals"
					data-equals="true"
					onClick={equals}
				>
					=
				</StyledKey>
			</StyledKeypad>
    );
});
