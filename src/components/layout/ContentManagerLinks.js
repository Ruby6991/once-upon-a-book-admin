import React from 'react'
import { NavLink } from 'react-router-dom'

const ContentManagerLinks = () => {
    return(
        <ul>
            <li><NavLink to='/'><i class="material-icons left">home</i>Home</NavLink></li>
            <li><NavLink to='/'><i class="material-icons left">add_circle_outline</i>Add Books</NavLink></li>
            <li><NavLink to='/'><i class="material-icons left">search</i>Browse Books</NavLink></li>
            <li><NavLink to='/'><i class="material-icons left">update</i>Update Books</NavLink></li>
            <li><NavLink to='/'><i class="material-icons left">delete</i>Delete Books</NavLink></li>
            <li><NavLink to='/'><i class="material-icons right">open_in_new</i>Logout</NavLink></li>
        </ul>
    )
}

export default ContentManagerLinks;