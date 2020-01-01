import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminLinks = () => {
    return(
        <ul>
            <li><NavLink to='/'><i class="material-icons left">home</i>Home</NavLink></li>
            <li><NavLink to='/'><i class="material-icons left">person_add</i>Create Users</NavLink></li>
            <li><NavLink to='/'><i class="material-icons left">people_outline</i>View Users</NavLink></li>
            <li><NavLink to='/'><i class="material-icons left">delete</i>Delete Users</NavLink></li>
            <li><NavLink to='/'><i class="material-icons right">open_in_new</i>Logout</NavLink></li>
        </ul>
    )
}

export default AdminLinks;