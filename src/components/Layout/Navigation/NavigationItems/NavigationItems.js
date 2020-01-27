import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import './NavigationItems.css'

const NavigationItems = props => {
    const isAuthenticate = props.isAuthenticate ? (<>
        <NavigationItem link="/orders" >Orders</NavigationItem>
        <NavigationItem link="/profile" >Profile</NavigationItem>
        <NavigationItem link="/logout" >Logout</NavigationItem>
    </>) : (<>
        <NavigationItem link="/auth" >Authenticate</NavigationItem></>)
    return (
        <ul className="navigationItems">
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            {isAuthenticate}
        </ul>
    )
}

export default NavigationItems;