import { useState } from "react";

function App() {

    const [calc, setCalc] = useState("");
    const [results, setResults] = useState("");

    const ops = ['/', '*', '+', '-', '.'];

    const updateCalc = (value) => {
        // this below if condition is when current value is operator and we check if it is of type
        // 1. no operand before this operator then return 
        // 2. in previous operand a operator is already applied and we cannot append operator in this case also so, return 
        if(
            ops.includes(value) && calc === '' || 
            ops.includes(value) && calc === ops.includes(calc.slice(-1))
        ) {
            return ;
        }
        // this below statement is for adding operator to first operand
        setCalc(calc + value);

        // now if this is actually a no i.e, operand then we have to do calculation
        if(!ops.includes(value)) {
            setResults(eval(calc + value).toString());
        }
    }

    // for = button when we press '=' we want to see the result
    const calculate = () => {
        setCalc(eval(calc).toString());
    }

    // for DEL button to delete the last inserted/clicked value
    const deleteLast = () => {
        if(calc === '') {
            return;
        }

        const value = calc.slice(0, -1);

        setCalc(value);
    }

    const createDigits = () => {
        const digits = [];

        for (let i = 1; i < 10; i++) {
            digits.push(
                <button onClick={() => updateCalc(`${i}`)} key={i}>{i}</button>
            )
        }
        return digits;
    }

    return (
        <div className="App">
            <div className="calculator">
                <div className="display">
                    {results ? <span>({results})</span> : ''} &nbsp;
                    {calc || '0'}
                </div>
                <div className="operators">
                    <button onClick={() => updateCalc('/')}>/</button>
                    <button onClick={() => updateCalc('*')}>*</button>
                    <button onClick={() => updateCalc('+')}>+</button>
                    <button onClick={() => updateCalc('-')}>-</button>
                    <button onClick={deleteLast}>DEL</button>
                </div>
                <div className="digits">
                    {createDigits()}
                    <button onClick={() => updateCalc('0')}>0</button>
                    <button onClick={() => updateCalc('.')}>.</button>
                    <button onClick={calculate}>=</button>
                </div>
            </div>
        </div>
    );
}

export default App;
