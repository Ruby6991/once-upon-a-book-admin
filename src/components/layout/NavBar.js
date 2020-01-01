import React from 'react'
import AdminLinks from './AdminLinks'
import ContentManagerLinks from './ContentManagerLinks'
import FulfillmentManagerLinks from './FulfillmentManagerLinks'

const Navbar = () => {
    return(
        <nav class="nav-extended">
            <div class="nav wrapper white">
                <h4 class="blue-grey-text text-darken-4">Once Upon A Book</h4>
                <h5 class="blue-grey-text text-darken-4">|Content Manager|</h5>
            </div>
            <div class="nav wrapper">
                {/* <AdminLinks/> */}
                <ContentManagerLinks/>
                {/* <FulfillmentManagerLinks/> */}
            </div>
        </nav>
    )
}

export default Navbar;