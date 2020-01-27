import React from 'react'
import './Input.css';

export default function Input(props) {
    const validationError = props.invalid && props.touched ? <p>{props.errorMessage}</p> : null;
    let inputElement = null;
    let inputClassValid = props.invalid && props.touched ? 'invalid' : '';

    const placeholder = props.validation.required ? `${props.config.placeholder}*` : props.config.placeholder;

    switch (props.elementType) {
        case ('text'):
            inputElement = <input className={inputClassValid} placeholder={placeholder} type={props.config.type} onChange={props.changed} value={props.value} />;
            break;
        case ('textarea'):
            inputElement = <textarea className={inputClassValid} placeholder={placeholder} type={props.config.type} onChange={props.changed} value={props.value} />;
            break;
        case ('email'):
            inputElement = <input className={inputClassValid} placeholder={placeholder} type={props.config.type} onChange={props.changed} value={props.value} />;
            break;
        case ('select'):
            inputElement = (
                <select onChange={props.changed} className={inputClassValid} value={props.value} >
                    <option> {placeholder}</option>
                    {props.config.options.map(e => <option key={e.value} value={e.value}>{e.displayValue}</option>)}
                </select >);
            break;
        default:
            inputElement = <input className={inputClassValid} placeholder={placeholder} type={props.config.type} onChange={props.changed} value={props.value} />;
            break;
    }
    return (
        <div>
            {inputElement}
            {validationError}
        </div>
    )
}
