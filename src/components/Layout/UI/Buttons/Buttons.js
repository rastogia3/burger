import React from 'react'

export const Buttons = props => {
    return(
        <button type={props.type} onClick={props.clicked} disabled={props.makeDisable} className={props.class}>{props.children}</button>
    )
}