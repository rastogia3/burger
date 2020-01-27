import React from 'react';
import './Modal.css';
import { BackDrop } from '../Backdrop/Backdrop';
export default class Modal extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render() {
        return (
            <>
                <div className="Modal"
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-200vh)',
                        opacity: this.props.show ? 1 : 0
                    }}>
                    {this.props.children}
                </div>
                <BackDrop show={this.props.show} clicked={this.props.clicked}></BackDrop>
            </>
        )
    }
}