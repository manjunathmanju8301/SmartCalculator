import './App.css'
import Calculator from './components/normal-calculator'

function App() {

    // const handleCalculation = (result: CalculatorResult) => {
    //     console.log("Calculation result:", result);

    //     console.log("Item:", result.item);
    //     console.log("Quantity:", result.quantity);
    //     console.log("Total:", result.total);
    // };

    return (
        <>
            <Calculator/>
            {/* <Calculator
                items={[{ key: 'key', label: 'abc', value: 34, description: '----' }]}
                title="Product calculator"
                valueLabel="per item"
                valuePrefix="₹"
                onCalculate={handleCalculation} /> */}
        </>
    )
}

export default App