import React from 'react';
import { BackDrop } from '../../UI/Backdrop/Backdrop'
import './SideDrawer.css';
import LogoImage from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
const SideDrawer = props => {
    let attachedClasses = ['SideDrawer', 'Close']
    attachedClasses = props.open ? ['SideDrawer', 'Open'] : ['SideDrawer', 'Close'];
    return (
        <>
            <BackDrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}  onClick={props.closed}>
                <LogoImage />
                <nav> <NavigationItems isAuthenticate={props.isAuthenticate} /></nav>
            </div>
        </>
    )
}
export default SideDrawer;