import React, { Component } from "react";
import "./Calculator.css";
import CalculatorButton from "./Components/CalculatorButton/CalculatorButton";
import Display from "./Components/Display/Display";

class Calculator extends Component {
  state = {
    operations: [],
    currentNumber: "0",
    error: false,
    performingOperation: false,
  };

  clear = () => {
    let operations = [...this.state.operations];

    if (this.state.performingOperation === true || operations.length) {
      this.setState({
        currentNumber: "" + operations[0],
        operations: [],
        performingOperation: false,
      });
    } else {
      this.setState({ currentNumber: "0" });
    }
  };

  clearMemory = () => {
    this.setState({
      currentNumber: "0",
      operations: [],
      error: false,
      performingOperation: false,
    });
  };

  switchSign = () => {
    let number = parseFloat(this.state.currentNumber);
    number = -number;
    console.log(this.state.operations);
    let operations = [...this.state.operations];

    if (operations.length) {
      operations[0] = number;
    }
    this.setState({ currentNumber: "" + number, operations });
  };

  pushOperation = (operation) => {
    if (this.state.error) {
      return;
    }
    const currOperations = [...this.state.operations];
    let operations = [...this.state.operations];

    console.log("push", operations, this.state.performingOperation);

    if (!this.state.performingOperation) {
      operations.push(this.state.currentNumber);
    }

    switch (true) {
      case currOperations.length === 0:
        if (operation === "=") {
          return;
        }
        operations.push(operation);
        this.setState({
          operations,
          currentNumber: "0",
          performingOperation: true,
        });
        break;
      case this.state.performingOperation === true:
        if (operation === "=") {
          return;
        }
        operations[operations.length - 1] = operation;
        this.setState({
          operations,
        });
        break;
      default:
        const currentNumber = this.performOperation(
          operations[1],
          operations[0],
          operations[2]
        );

        break;
    }
  };

  performOperation = (operation, a, b) => {
    let currentNumber;
    switch (operation) {
      case "+":
        currentNumber = (+a + +b).toFixed(3);
        break;
      case "-":
        currentNumber = (+a - +b).toFixed(3);
        break;
      case "*":
        currentNumber = (+a * +b).toFixed(3);
        break;
      case "/":
        currentNumber = (+a / +b).toFixed(3);
        break;
    }

    if (parseFloat(currentNumber) === parseInt(currentNumber)) {
      currentNumber = parseInt(currentNumber);
    }

    if (("" + currentNumber).replace(/\-|\./, "").length > 8) {
      this.setState({
        error: true,
        currentNumber: "Err",
      });
      return;
    }
    this.setState({
      currentNumber: "" + currentNumber,
      operations: [currentNumber, operation],
      performingOperation: true,
    });
  };

  addDigitToNumber = (digit) => {
    if (this.state.error) {
      return;
    }
    console.log("digit", this.state.operations);
    let curr = "" + this.state.currentNumber;
    if (this.state.performingOperation) {
      curr = "0";
    }
    let currSplit = curr.split(".");
    let digitLength = curr.replace(/\-|\./, "").length;
    console.log(digitLength, curr);
    if (
      digitLength === 8 ||
      (currSplit[1] && digit === ".") ||
      (currSplit[1] && currSplit[1].length === 3)
    ) {
      return;
    }
    if (curr === "0") {
      curr = digit;
    } else {
      curr += digit;
    }

    this.setState({ currentNumber: curr, performingOperation: false });
  };

  render() {
    return (
      <div className="Calculator">
        <Display text={this.state.currentNumber} />
        <div className="Left">
          <div>
            <CalculatorButton type="Operation" clicked={this.clear} text="C" />
            <CalculatorButton
              type="Operation"
              clicked={this.clearMemory}
              text="AC"
            />
          </div>
          <div>
            <CalculatorButton
              type="Number"
              clicked={() => this.addDigitToNumber("1")}
              text="1"
            />
            <CalculatorButton
              type="Number"
              clicked={() => this.addDigitToNumber("2")}
              text="2"
            />
            <CalculatorButton
              type="Number"
              clicked={() => this.addDigitToNumber("3")}
              text="3"
            />
          </div>
          <div>
            <CalculatorButton
              type="Number"
              clicked={() => this.addDigitToNumber("4")}
              text="4"
            />
            <CalculatorButton
              type="Number"
              clicked={() => this.addDigitToNumber("5")}
              text="5"
            />
            <CalculatorButton
              type="Number"
              clicked={() => this.addDigitToNumber("6")}
              text="6"
            />
          </div>
          <div>
            <CalculatorButton
              type="Number"
              clicked={() => this.addDigitToNumber("7")}
              text="7"
            />
            <CalculatorButton
              type="Number"
              clicked={() => this.addDigitToNumber("8")}
              text="8"
            />
            <CalculatorButton
              type="Number"
              clicked={() => this.addDigitToNumber("9")}
              text="9"
            />
          </div>
          <div>
            <CalculatorButton
              type="Number"
              clicked={() => this.addDigitToNumber("0")}
              text="0"
            />
          </div>
        </div>
        <div className="Right">
          <CalculatorButton
            type="Operation"
            clicked={this.switchSign}
            text="+/-"
          />
          <CalculatorButton
            type="Operation"
            clicked={() => {
              this.pushOperation("+");
            }}
            text="+"
          />
          <CalculatorButton
            type="Operation"
            clicked={() => {
              this.pushOperation("-");
            }}
            text="-"
          />
          <CalculatorButton
            type="Operation"
            clicked={() => {
              this.pushOperation("*");
            }}
            text="*"
          />
          <CalculatorButton
            type="Operation"
            clicked={() => {
              this.pushOperation("/");
            }}
            text="/"
          />
          <CalculatorButton
            type="Number"
            clicked={() => this.addDigitToNumber(".")}
            text="."
          />
        </div>
        <CalculatorButton
          type="Submit"
          clicked={() => {
            this.pushOperation("=");
          }}
          text="="
        />
      </div>
    );
  }
}

export default Calculator;
