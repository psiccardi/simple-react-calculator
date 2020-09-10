import React from "react";
import "./CalculatorButton.css";

function CalculatorButton(props) {
  let className = "CalculatorButton ";

  if (props.type) {
    className += props.type;
  }

  return (
    <button className={className} onClick={props.clicked}>
      {props.text}
    </button>
  );
}

export default CalculatorButton;
