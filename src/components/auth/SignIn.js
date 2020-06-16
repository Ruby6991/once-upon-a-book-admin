import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";

class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : '',
            redirectToHome : false,
            role:''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmitSignIn = (e) => {
        e.preventDefault();
        console.log(this.state);

        const login = {
            email:this.state.email,
            password:this.state.password
        }
        const that = this;
        axios.post("http://localhost:8080/authenticate",login)
        .then(function(res){
            const data = res.data;
            console.log(data)
            localStorage.setItem("token",data.jwtToken);
            localStorage.setItem("email",that.state.email);
            localStorage.setItem("name",data.firstName);
            that.setState({
                role:data.role,
                redirectToHome:true
            })
            console.log(localStorage);
        }).catch(function(error){
            const res = error.response;
            if(res.status===401){
                alert("Invalid Email or Password. Please Try Again"); 
                console.log(error.response);
            }else{
                alert("Server Error!");
            }
        })
    }

    render() {
        return (
            <div class="login">
                {
                   this.state.redirectToHome?(
                    <Redirect to={{
                            state: {
                                role:this.state.role},
                            pathname: '/dashboard'
                          }}/>
                   ):("")
                }
                <h2 class="active"> sign in </h2>
                <form onSubmit={this.handleSubmitSignIn}>
                    <input id="email" type="email" class="text" name="email" onChange={this.handleChange}/>
                    <span>Email</span>
                    <br/>
                    <br/>
                    <input id="password" type="password" class="text" name="password" onChange={this.handleChange}/>
                    <span>password</span>
                    <br/>
                    <button class="signin">
                        Sign In
                    </button>
                    <hr></hr>
                </form>
            </div>
        );
    }
}

export default SignIn;