/* eslint-disable no-mixed-operators */
/* eslint-disable no-fallthrough */
/* eslint-disable eqeqeq */
/* eslint-disable default-case */
import React, { useReducer } from 'react';
import "./style.css";
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';

export const ACTION = {
	ADD_DIGIT: 'add-digit',
	CHOOSE_OPERATION: 'choose_operation',
	CLEAR: 'clear',
	DELETE_DIGIT: "delete-digit",
	EVALUVATE: "evaluvate"
}

function reducer(state, { type, payload }) {
	switch (type) {
		case ACTION.ADD_DIGIT:

			if (payload.digit === "." && !state.currentOperand?.length) {
				return state
			}

			if (payload.digit === "0" && state.currentOperand === "0") {
				return state
			}
			if (payload.digit === "." && state.currentOperand?.includes(".")) {
				return state
			}
			return {
				...state,
				currentOperand: `${state.currentOperand || ''}${payload.digit}`
			}
		case ACTION.CHOOSE_OPERATION:

			if (state.operation != null || !state.currentOperand || state.previousOperand && state.currentOperand) return state


			return {
				...state,
				previousOperand: state.currentOperand,
				currentOperand: null,
				operation: payload.operation
			}

		case ACTION.CLEAR:
			return {}
		case ACTION.EVALUVATE:
			return {
				previousOperand: null,
				currentOperand: evaluvate(state)
			}
	}
}

function evaluvate({ currentOperand, previousOperand, operation }) {

	const prev = parseFloat(previousOperand)
	const current = parseFloat(currentOperand)

	if (isNaN(prev) || isNaN(current)) return ""

	let computedResult = ""
	switch (operation) {
		case '+':
			computedResult = current + prev;
		case '-':
			computedResult = current + prev;
		case '%':
			computedResult = current / prev;
		case '*':
			computedResult = current * prev;
	}
	return computedResult.toString();
}


const App = () => {
	const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})
	return <div className='calculator-grid'>
		<div className='output'>
			<div className='previous-operend'>{previousOperand} {operation}</div>
			<div className='current-operand'>{currentOperand}</div>
		</div>

		<button className='span-two' onClick={() => dispatch({ type: ACTION.CLEAR })}>AC</button>
		<button > DEL</button>
		<OperationButton dispatch={dispatch} operation="%" />
		<DigitButton dispatch={dispatch} digit="1" />
		<DigitButton dispatch={dispatch} digit="2" />
		<DigitButton dispatch={dispatch} digit="3" />
		<OperationButton dispatch={dispatch} operation="*" />
		<DigitButton dispatch={dispatch} digit="4" />
		<DigitButton dispatch={dispatch} digit="5" />
		<DigitButton dispatch={dispatch} digit="6" />
		<OperationButton dispatch={dispatch} operation="+" />
		<DigitButton dispatch={dispatch} digit="7" />
		<DigitButton dispatch={dispatch} digit="8" />
		<DigitButton dispatch={dispatch} digit="9" />
		<OperationButton dispatch={dispatch} operation="-" />
		<DigitButton dispatch={dispatch} digit="." />
		<DigitButton dispatch={dispatch} digit="0" />
		<button className='span-two' onClick={() => dispatch({ type: ACTION.EVALUVATE })}>=</button>
	</div>;
}


// #endregion

export default App;