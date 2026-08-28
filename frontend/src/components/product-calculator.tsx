import { useMemo, useState } from "react";
import styled from "styled-components";

export interface CalculatorLookupItem {
	key: string;
	label: string;
	value: number;
	description?: string;
}

export interface CalculatorResult {
	item: CalculatorLookupItem;
	quantity: number;
	total: number;
}

export interface CalculatorProps {
	items?: CalculatorLookupItem[];
	title?: string;
	valueLabel?: string;
	valuePrefix?: string;
	onCalculate?: (result: CalculatorResult) => void;
}

const Container = styled.section`
	width: min(100%, 560px);
	padding: 24px;
	box-sizing: border-box;
	color: #252525;
	background: #ffffff;
	border: 1px solid #d9d9d9;
	border-radius: 6px;
	font-family: inherit;
`;

const Heading = styled.h2`
	margin: 0 0 20px;
	font-size: 1.25rem;
	line-height: 1.3;
`;

const Field = styled.div`
	position: relative;
	margin-bottom: 16px;
`;

const Label = styled.label`
	display: block;
	margin-bottom: 6px;
	font-size: 0.875rem;
	font-weight: 600;
`;

const Input = styled.input`
	width: 100%;
	min-height: 40px;
	padding: 8px 10px;
	box-sizing: border-box;
	border: 1px solid #8a8a8a;
	border-radius: 4px;
	font: inherit;

	&:focus {
		outline: 2px solid #0075a3;
		outline-offset: 1px;
	}
`;

const Suggestions = styled.ul`
	position: absolute;
	z-index: 1;
	top: 100%;
	right: 0;
	left: 0;
	max-height: 220px;
	margin: 2px 0 0;
	padding: 0;
	overflow-y: auto;
	list-style: none;
	background: #ffffff;
	border: 1px solid #8a8a8a;
	border-radius: 4px;
	box-shadow: 0 3px 8px rgb(0 0 0 / 14%);
`;

const Suggestion = styled.button`
	display: block;
	width: 100%;
	padding: 10px;
	border: 0;
	background: transparent;
	color: inherit;
	text-align: left;
	font: inherit;
	cursor: pointer;

	&:hover,
	&:focus-visible {
		background: #edf7fa;
		outline: none;
	}
`;

const ItemDescription = styled.span`
	display: block;
	margin-top: 2px;
	color: #626469;
	font-size: 0.8rem;
`;

const ErrorMessage = styled.p`
	margin: 6px 0 0;
	color: #b01f24;
	font-size: 0.875rem;
`;

const Result = styled.output`
	display: flex;
	justify-content: space-between;
	gap: 16px;
	align-items: baseline;
	margin-top: 8px;
	padding-top: 18px;
	border-top: 1px solid #d9d9d9;
`;

const Total = styled.strong`
	color: #0075a3;
	font-size: 1.5rem;
`;

export const Calculator = ({
	items = [],
	title = "Lookup calculator",
	valueLabel = "Value",
	valuePrefix = "",
	onCalculate,
}: CalculatorProps) => {
	const [query, setQuery] = useState("");
	const [selectedItem, setSelectedItem] = useState<CalculatorLookupItem>();
	const [quantity, setQuantity] = useState("1");
	const [hasSubmitted, setHasSubmitted] = useState(false);

	const matches = useMemo(() => {
		const normalizedQuery = query.trim().toLocaleLowerCase();
		if (!normalizedQuery || selectedItem?.label === query) return items.slice(0, 8);

		return items
			.filter(
				(item) =>
					item.key.toLocaleLowerCase().includes(normalizedQuery) ||
					item.label.toLocaleLowerCase().includes(normalizedQuery),
			)
			.slice(0, 8);
	}, [items, query, selectedItem]);

	const parsedQuantity = Number(quantity);
	const isValidQuantity = Number.isFinite(parsedQuantity) && parsedQuantity > 0;
	const total = selectedItem && isValidQuantity ? selectedItem.value * parsedQuantity : undefined;

	const selectItem = (item: CalculatorLookupItem) => {
		setSelectedItem(item);
		setQuery(item.label);
		setHasSubmitted(false);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setHasSubmitted(true);

		if (selectedItem && isValidQuantity && total !== undefined) {
			onCalculate?.({ item: selectedItem, quantity: parsedQuantity, total });
		}
	};

	return (
		<Container>
			<Heading>{title}</Heading>
			<form onSubmit={handleSubmit}>
				<Field>
					<Label htmlFor="calculator-lookup">Lookup item</Label>
					<Input
						id="calculator-lookup"
						role="combobox"
						aria-autocomplete="list"
						aria-controls="calculator-suggestions"
						aria-expanded={matches.length > 0 && !selectedItem}
						placeholder="Search by key or name"
						value={query}
						onChange={(event) => {
							setQuery(event.target.value);
							setSelectedItem(undefined);
							setHasSubmitted(false);
						}}
					/>
					{!selectedItem && matches.length > 0 && (
						<Suggestions id="calculator-suggestions" role="listbox">
							{matches.map((item) => (
								<li key={item.key} role="option">
									<Suggestion type="button" onMouseDown={() => selectItem(item)}>
										{item.label}
										{item.description && <ItemDescription>{item.description}</ItemDescription>}
									</Suggestion>
								</li>
							))}
						</Suggestions>
					)}
					{items.length === 0 && <ErrorMessage role="status">No lookup items are available.</ErrorMessage>}
				</Field>

				<Field>
					<Label htmlFor="calculator-quantity">Quantity</Label>
					<Input
						id="calculator-quantity"
						type="number"
						min="0.01"
						step="any"
						inputMode="decimal"
						value={quantity}
						onChange={(event) => {
							setQuantity(event.target.value);
							setHasSubmitted(false);
						}}
					/>
					{hasSubmitted && !selectedItem && <ErrorMessage role="alert">Select an item to continue.</ErrorMessage>}
					{hasSubmitted && selectedItem && !isValidQuantity && (
						<ErrorMessage role="alert">Enter a quantity greater than zero.</ErrorMessage>
					)}
				</Field>

				<button type="submit">Calculate</button>
			</form>

			{total !== undefined && selectedItem && (
				<Result aria-label="Calculation result">
					<span>
						{parsedQuantity} x {selectedItem.label} ({valuePrefix}{selectedItem.value.toFixed(2)} {valueLabel})
					</span>
					<Total>
						{valuePrefix}
						{total.toFixed(2)}
					</Total>
				</Result>
			)}
		</Container>
	);
};

export default Calculator;
