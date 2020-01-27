import React from 'react';
import './Spinner.css';

export default function Spinner(props) {
    return (
        props.show ? <>
            <div className="lds-dual-ring"></div>
            <div className="loadingLabel">Loading...</div>
        </> : null
    )
}
