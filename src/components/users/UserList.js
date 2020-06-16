import React, { Component } from 'react'
import UserDetails from './UserDetails'
import { Redirect } from "react-router-dom";
import M from 'materialize-css'
const axios = require("axios")

class UserList extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            firstName:'',
            lastName:'',
            dateOfBirth:'',
            address:'',
            phoneNo:'',
            role:'',
            orderedBooks:'',
            users:[],
            searchResult:'',
            view:true,
            isLoggedOut:false
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    componentDidMount(){
        const modal = document.querySelectorAll('.modal');
        M.Modal.init(modal, {});

        const select = document.querySelectorAll('select');
        M.FormSelect.init(select, {});

        const that = this;
        console.log(localStorage);
        const token = 'Bearer '+ localStorage.token;
        const headersInfo = {
            Authorization:token
        }
        const data = {
            email:localStorage.email
        }
        console.log(headersInfo);
        axios.post("http://localhost:8080/GetUserList",data,{
            headers:headersInfo
        }).then(function(res){
            console.log(res.data);
            that.setState({
                users:res.data
            })
        }).catch(function(error){
            console.log(error);
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        
        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email:this.state.email,
            phoneNo:this.state.phoneNo,
            address:this.state.address,
            password:this.state.password,
            role:this.state.role
        }

        axios.post("http://localhost:8080/Register",user)
        .then(function(res){
            alert("User Added Successfully!");
            window.location.reload();
            }).catch(function(error){
                console.log("User addition un-successful!\nError : ",error.response);
                alert("User addition un-successful!");
         })
    }

    handleSearch = (e) => {
        const that=this;
        const token = 'Bearer '+ localStorage.token;
        const headersInfo = {
            Authorization:token
        }
        const userData = {
            email:e.target.value
        }
        axios.post("http://localhost:8080/GetUser/",userData,{
            headers:headersInfo
        }).then(function(res){
            console.log(res.data);
            that.setState({
                searchResult:res.data,
                view:false
            })
        }).catch(function(error){
            console.log(error);
        })
    }

    handleClose = (e) => {
        this.setState({
            view:true,
            searchResult:''
        })
    }

    signOut(){
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        this.setState({
            isLoggedOut:true
        })
    }
    
    render() {
        return (
            <div class="users">
                {
                   this.state.isLoggedOut?(
                       <Redirect to="/signin"/>
                   ):("")
                }
                <div class="right-align">
                    <button style={{marginRight:30+'px'}} data-target="modal1" class="modal-trigger waves-effect btn-flat teal lighten-3 white-text center btn-large"> Add New User </button>
                    <button class="waves-effect btn-flat teal lighten-3 white-text center btn-large" onClick={this.signOut}>Logout </button>
                </div>
                {/* <!-- Modal1 Structure --> */}
                <div id="modal1" class="modal">
                    <div class="modal-content">
                        <h4 class="center" >Add New User</h4>
                        <form >
                            <input type="text" placeholder="First Name" id="firstName" onChange={this.handleChange}/>
                            <input type="text" placeholder="Last Name" id="lastName" onChange={this.handleChange}/>
                            <input type="text" placeholder="Phone Number" id="phoneNo" onChange={this.handleChange}/>
                            <input type="text" placeholder="Address" id="address" onChange={this.handleChange}/>
                            <input type="email" placeholder="Email" id="email" onChange={this.handleChange}/>
                            <input type="password" placeholder="Password" id="password" onChange={this.handleChange} />
                            <div class="input-field">
                                <select id="role" onChange={this.handleChange}>
                                <option value="" disabled selected>Choose User Role</option>
                                <option value="Content_Manager">Content Manager</option>
                                <option value="Fulfillment_Manager">Fulfillment Manager</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button style={{marginRight:30+'px'}} class="modal-close waves-effect waves-green btn-flat teal lighten-3" onClick={this.handleSubmit} >Add</button>
                        <button class="modal-close waves-effect waves-green btn-flat teal lighten-3">Cancel</button>
                    </div>
                </div>
                <h2 class="center">Manage Users</h2>
                <nav>
                    <div class="nav-wrapper">
                        <form>
                            <div class="input-field teal lighten-3">
                            <input id="search" type="search" onChange={this.handleSearch} required/>
                            <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                            <i class="material-icons" onClick={this.handleClose}>close</i>
                            </div>
                        </form>
                    </div>
                </nav>
                <div class="content bg">
                    <div class="row">
                        <div class="col s12">
                            <div class="card card-bg">
                                <table class="responsive-table highlight">
                                    <thead>
                                    <tr>
                                        <th class="teal lighten-4">User ID</th>
                                        <th class=" teal lighten-3">Full Name</th>
                                        <th class="teal lighten-4">Phone Number</th>
                                        <th class="teal lighten-3">Date of Birth</th>
                                        <th class=" teal lighten-4">Role</th>
                                        <th class=" teal lighten-3">Address</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                        {this.state.view?(
                                            this.state.users && this.state.users.map(user => 
                                        {
                                            if(user.role!=='Admin')
                                            {
                                                return(
                                                    <UserDetails user={user} key={user.id} />
                                                )
                                            }
                                        })
                                        ):(
                                            <UserDetails user={this.state.searchResult} key={this.state.searchResult.email} /> 
                                        )}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
                    
            </div>
        );
    }
}

export default UserList;