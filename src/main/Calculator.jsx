import React from 'react';
import Button from '../components/Button';
import Display from '../components/Display';
import './Calculator.css';

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation : null,
    values:[0,0],
    current: 0
}

class Calculator extends React.Component{

    state  = {...initialState}

    clearMemory = () =>{
        this.setState({...initialState});
    }

    setOperation = ( operation ) =>{
        if( this.state.current === 0){
            this.setState({operation, current:1,clearDisplay:true})
        }else{
            const equals = operation === '=';
            const currentOperation = this.state.operation;
            const values = [...this.state.values];
            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);    
            } catch (error) {
                values[0] = this.state.values[0];
            }
            
            values[1] = 0;

            this.setState({
                displayValue : values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay : !equals,
                values 
            })
        }
    }

    addDigit( n ){

        if( n === '.' && this.state.displayValue.includes('.')){
            return 
        }

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;
        const currentValue = clearDisplay ? '' : this.state.displayValue;
        const displayValue = currentValue + n ;
        this.setState({
            displayValue, clearDisplay: false
        });

        if( n !== '.'){
            const i = this.state.current;
            const newValue = parseFloat(displayValue);
            const values = [...this.state.values];
            values[i] = newValue;
            this.setState({
                values
            })
        }

        console.log(this.state.values)
    }


    render(){

        const addDigit = n => this.addDigit(n);
        const setOperation = operation => this.setOperation(operation);

        return (
            <div>
                <div>
                    <h2>CALCULADORA</h2>
                </div>
                <div className="calculator">
                    <Display value={this.state.displayValue}/>
                    <Button label="AC" triple click={() => this.clearMemory()} />
                    <Button label="/" click={setOperation} operation />
                    <Button label="7" click={addDigit}/>
                    <Button label="8" click={addDigit}/>
                    <Button label="9" click={addDigit}/>
                    <Button label="*" click={setOperation} operation/>
                    <Button label="4" click={addDigit}/>
                    <Button label="5" click={addDigit}/>
                    <Button label="6" click={addDigit}/>
                    <Button label="-" click={setOperation} operation/>
                    <Button label="1" click={addDigit}/>
                    <Button label="2" click={addDigit}/>
                    <Button label="3" click={addDigit}/>
                    <Button label="+" click={setOperation} operation/>
                    <Button label="0" click={addDigit} double/>
                    <Button label="." click={addDigit}/>
                    <Button label="=" click={setOperation} operation/>
                
                </div>
            </div>
        );
    }
}

export default Calculator;