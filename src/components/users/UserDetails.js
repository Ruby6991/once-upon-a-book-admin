import React from 'react'
import { Component } from 'react'
import M from "materialize-css";
import { Redirect } from "react-router-dom";
const axios = require("axios")

class UserDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:this.props.user.email,
            firstName:this.props.user.firstName,
            lastName:this.props.user.lastName,
            dateOfBirth:this.props.user.dateOfBirth,
            addresses:this.props.user.addresses,
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
                <td class="teal lighten-4"><i><b>{this.state.email}</b></i><br/><br/>
                <button class="waves-effect waves-light btn-small red lighten-2" onClick={this.handleDelete}>Delete</button>
                </td>
                <td>{this.state.firstName+' '+this.state.lastName}</td>
                <td class="teal lighten-4">{this.state.phoneNo}</td>
                <td>{this.state.dateOfBirth!==null?(this.state.dateOfBirth.split('T')[0]):("N/A")}</td>
                <td class="teal lighten-4 center">{this.state.role} </td>
                <td>{this.state.addresses!==null?(this.state.addresses):("N/A")}</td>
                <td class="teal lighten-4">{this.state.orders!==null?(this.state.orders):("N/A")}</td>
            
            </tr>
        )
    }


}

export default UserDetails;