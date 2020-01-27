import React from 'react'
import './TopBar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../Logo/Logo'
const TopBar = props => (
    <>
        <header className="headerMain">
            <div className="hamBurgerIcon mobileOnly" onClick={props.clicked}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div><Logo /></div>

            <nav className="desktopOnly"><NavigationItems isAuthenticate={props.isAuthenticate} /></nav>
        </header>
    </>
);

export default TopBar;