import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import OrderDetails from './OrderDetails'
import M from 'materialize-css'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
const axios = require("axios")


class OrderList extends Component {
    constructor(props){
        super(props);
        this.state={
            orders:[],
            search:'',
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
        axios.post("http://localhost:8080/GetOrderList",data,{
            headers:headersInfo
        }).then(function(res){
            console.log(res.data);
            that.setState({
                orders:res.data
            })
        }).catch(function(error){
            console.log(error.response);
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSearch = (e) => {
        const that=this;
        const token = 'Bearer '+ localStorage.token;
        const headersInfo = {
            Authorization:token
        }
        const data = {
            id: e.target.value
        }
        axios.post("http://localhost:8080/GetOrder/",data, {
            headers:headersInfo
        }).then(function(res){
            console.log(res.data);
            that.setState({
                searchResult:res.data,
                view:false
            })
        }).catch(function(error){
            console.log(error.response);
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
            <div class="books">
                {
                   this.state.isLoggedOut?(
                       <Redirect to="/signin"/>
                   ):("")
                }
                <div class="right-align">
                    {/* <button style={{marginRight:30+'px'}} data-target="modal1" class="modal-trigger waves-effect btn-flat teal lighten-3 white-text center btn-large"> Add New Book </button> */}
                    <button class="waves-effect btn-flat teal lighten-3 white-text center btn-large" onClick={this.signOut}>Logout </button>
                </div>
            <h2 class="center">Manage Orders</h2>
            <nav>
                    <div class="nav-wrapper">
                        <form>
                            <div class="input-field teal lighten-3">
                            <input id="search" type="search" required onChange={this.handleSearch}/>
                            <label class="label-icon" for="search" ><i class="material-icons">search</i></label>
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
                                            <th class="teal lighten-3">Order ID</th>
                                            <th class=" teal lighten-4">Purchased Date</th>
                                            <th class=" teal lighten-3">Delivery Date</th>
                                            {/* <th class="teal lighten-4"style={{width: 100+"px"}}>Price</th> */}
                                            <th class=" teal lighten-3" >Order Status</th>
                                            <th class="teal lighten-4" >Total Amount</th>
                                            <th class="teal lighten-4" >Payment Method</th>
                                            <th class="teal lighten-4" >User</th>
                                            <th class="teal lighten-4" >Address</th>
                                            <th class="teal lighten-4" >Ordered Books</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.state.view?(
                                            this.state.orders && this.state.orders.map(order => 
                                        {
                                            return(
                                                <OrderDetails order={order} key={order.id} />
                                            )
                                        })
                                        ):(
                                            <OrderDetails order={this.state.searchResult} key={this.state.searchResult.id} /> 
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


export default OrderList;