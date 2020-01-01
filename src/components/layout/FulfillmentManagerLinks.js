import React from 'react'
import { NavLink } from 'react-router-dom'

const FulfillmentManagerLinks = () => {
    return(
        <ul>
            <li><NavLink to='/'><i class="material-icons left">home</i>Home</NavLink></li>
            <li><NavLink to='/'><i class="material-icons left">receipt</i>View Orders</NavLink></li>
            <li><NavLink to='/'><i class="material-icons left">update</i>Update Orders</NavLink></li>
            <li><NavLink to='/'><i class="material-icons right">open_in_new</i>Logout</NavLink></li>
        </ul>
    )
}

export default FulfillmentManagerLinks;