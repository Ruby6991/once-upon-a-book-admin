import React from 'react'
import { Component } from 'react'
import M from "materialize-css";
import { Redirect } from "react-router-dom";
import Moment from 'react-moment';
const axios = require("axios")

class UserDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:this.props.user.email,
            firstName:this.props.user.firstName,
            lastName:this.props.user.lastName,
            dateOfBirth:this.props.user.dateOfBirth,
            address:this.props.user.address,
            phoneNo:this.props.user.phoneNo,
            role:this.props.user.role,
            orders:this.props.user.orders
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount(){
        if(this.state.dateOfBirth!==null){
            let publishDate=this.state.dateOfBirth.toString().split("T");
            let date = new Date(publishDate[0]);
            date.setDate(date.getDate()+1);
            this.setState({
                dateOfBirth:date
            }, () => {
                console.log(this.state);
            })

        }
    }

    handleDelete() {
        const config = {
            headers:{
                Authorization:'Bearer '+ localStorage.token
            }
        }

        let canDelete = true;
        if(this.state.orders!==null){
            for(let a=0; a<this.state.orders.length; a++){
                if(this.state.orders[a].status==='Pending'){
                    canDelete=false;
                }
            }
        }


        if(canDelete){
            if (window.confirm("Are you sure you want to delete this user?")) {
                axios.delete("http://localhost:8080/DeleteUser/"+ this.state.email,config)
                .then(function(res){
                    console.log("User deleted successfully!");
                    alert("User deleted successfully!");
                    window.location.reload();
                }).catch(function(error){
                    console.log("User delete un-successful!\nError : ",error.response);
                    alert("User delete un-successful!");
            })
              } else {
                alert("User deletion cancelled");
              } 
        }else{
            alert("This User Cannot be Deleted due to pending orders of the user");
        }
                    
    }


    render(){
        return (
            <tr>
                <td ><i><b>{this.state.email}</b></i><br/><br/>
                <button class="waves-effect waves-light btn-small red lighten-2" onClick={this.handleDelete}>Delete</button>
                </td>
                <td class=" blue-grey darken-1 white-text">{this.state.firstName+' '+this.state.lastName}</td>
                <td>{this.state.phoneNo}</td>
                <td class=" blue-grey darken-1 white-text">{this.state.dateOfBirth!==null?(<Moment format="YYYY/MM/DD">{this.state.dateOfBirth}</Moment>):("N/A")}</td>
                <td>{this.state.role} </td>
                <td class=" blue-grey darken-1 white-text">{this.state.address!==null?(this.state.address):("N/A")}</td>
            
            </tr>
        )
    }


}

export default UserDetails;