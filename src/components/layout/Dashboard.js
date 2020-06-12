import React, { Component } from 'react'
import { Redirect } from "react-router-dom";

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state={
            role:this.props.location.state.role
        }
    }

    render() {
        return (
            <div class="dashboard">
                {
                    this.state.role.localeCompare("Admin")===0?(
                       <Redirect to="/userlist"/>
                   ):this.state.role.localeCompare("Content_Manager")===0?(
                       <Redirect to="/booklist"/>
                   ):this.state.role.localeCompare("Fulfillment_Manager")===0?(
                       <Redirect to="/orderlist"/>
                   ):("") 
                }
                    
            </div>
        );
    }
}

export default Dashboard;