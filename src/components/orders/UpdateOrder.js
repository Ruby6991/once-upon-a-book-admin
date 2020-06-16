import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import M from 'materialize-css'
import Moment from 'react-moment';
const axios = require("axios")

class UpdateBook extends Component {
    constructor(props){
        super(props);
        this.state={
            id:this.props.location.state.id,
            purchasedDate:'',
            deliveryDate:'',
            status:'',
            totalAmount:'',
            paymentMethod:'',
            user:'',
            address:'',
            orderedBooks:'',
            isUpdated:false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    componentDidMount(){
        const select = document.querySelectorAll('select');
        M.FormSelect.init(select, {});

        const that = this;

        const token = 'Bearer '+ localStorage.token;
        const headersInfo = {
            Authorization:token
        }
        const data = {
            id: this.state.id
        }
        axios.post("http://localhost:8080/GetOrder/", data, {
            headers:headersInfo
        })
        .then(function(res){
                console.log(res.data)
                that.setState({
                    purchasedDate:res.data.purchasedDate,
                    deliveryDate:res.data.deliveryDate,
                    status:res.data.status,
                    totalAmount:res.data.totalAmount,
                    paymentMethod:res.data.paymentMethod,
                    user:res.data.user,
                    address:res.data.user.address,
                    orderedBooks:res.data.orderedBooks
                })
                console.log("Book Data Received!");
            }).catch(function(error){
                console.log("Book data error ",error.response);
        }) 
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onDateChange = (value, event) => {
        this.setState({
            deliveryDate: value
        }, () => {
            console.log(this.state);
        })
    }


    handleSubmit = (e) => {
        e.preventDefault();
        const that=this;
        const config = {
            headers:{
                Authorization:'Bearer '+ localStorage.token
            }
        }
        
        const data = {
            deliveryDate:this.state.deliveryDate,
            status:this.state.status
        }
        console.log(data);

        axios.put("http://localhost:8080/UpdateOrder/"+ this.state.id,data,config)
            .then(function(res){
                console.log("Order updated successfully!");
                alert("Order updated successfully!");
                that.setState({
                    isUpdated:true
                })
            }).catch(function(error){
                console.log("Order update un-successful!\nError : ",error.response);
                alert("Order update un-successful!");
         })
    }

    handleBack = (e) => {
        this.setState({
            isUpdated:true
        })
    }

    render() {
        return (
            <div class="update-order">
                {
                   this.state.isUpdated?(
                       <Redirect to={'/orderlist'}/>
                   ):("")
                }
                <div className="container">
                    <div class="card">
                        <div class="card-content">
                            <span class="card-title">Update Order : {this.state.id} </span>
                                <form>
                                    <table >
                                        <tbody>
                                        <tr>
                                            <th>Purchased Date</th>
                                            <td><Moment format="YYYY/MM/DD">{this.state.purchasedDate}</Moment></td>
                                        </tr>
                                        <tr>
                                            <th>User Details</th>
                                            <td><b>Full Name: </b>{this.state.user.firstName +" "+this.state.user.lastName}
                                                <br/><b>Phone Number: </b>{this.state.user.phoneNo}</td>
                                        </tr>
                                        <tr>
                                            <th>Address</th>
                                            <td>{this.state.address}</td>
                                        </tr>
                                        <tr>
                                            <th>Total Amount</th>
                                            <td>{this.state.totalAmount}</td>
                                        </tr>
                                        <tr>
                                            <th>Ordered Books</th>
                                            <td>
                                                {
                                                    this.state.orderedBooks && this.state.orderedBooks.map(orderedBook => 
                                                    {
                                                        return(
                                                            <div>
                                                                <b>Book Title: </b>{orderedBook.book.title}
                                                                <br/><b>Quantity: </b>{orderedBook.quantity}
                                                            </div>
                                                        )
                                                        
                                                    })
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Delivery Date</th>
                                            <td><Calendar onChange={this.onDateChange} /></td>
                                        </tr>
                                        <tr>
                                            <th>Order Status</th>
                                            <td>
                                                <div class="input-field">
                                                    <select id="status" onChange={this.handleChange}>
                                                        <option value="" disabled selected>Choose Order Status</option>
                                                        <option value="Confirmed">Confirmed</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                        <option value="Processed">Processed</option>
                                                        <option value="Dispatched">Dispatched</option>
                                                    </select>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <br/>
                                <button style={{marginRight:30+'px'}} class="waves-effect waves-light btn-small red lighten-2" type="button" onClick={this.handleSubmit}>Update Order</button>
                                <button class="waves-effect waves-light btn-small red lighten-2" onClick={this.handleBack}>Go Back</button>
                            </form>
                        </div>   
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateBook;