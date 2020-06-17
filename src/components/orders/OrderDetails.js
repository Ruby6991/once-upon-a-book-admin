import React, { Component } from 'react';
import M from "materialize-css";
import Moment from 'react-moment';
import { Redirect } from "react-router-dom";
const axios = require("axios");


class BookDetails extends Component {
    constructor(props){
        super(props);
        this.state={
            id:this.props.order.id,
            purchasedDate:this.props.order.purchasedDate,
            deliveryDate:this.props.order.deliveryDate,
            status:this.props.order.status,
            totalAmount:this.props.order.totalAmount,
            paymentMethod:this.props.order.paymentMethod,
            user:this.props.order.user,
            address:this.props.order.user.address,
            orderedBooks:this.props.order.orderedBooks,
            updateOrder:false,
            orders:[]
        }
        console.log(props);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount(){
        const modal = document.querySelectorAll('.modal');
        M.Modal.init(modal, {});

        const select = document.querySelectorAll('select');
        M.FormSelect.init(select, {});

        if(this.state.purchasedDate!==null || this.state.deliveryDate!==null){
            let purchase=this.state.purchasedDate.toString().split("T");
            let pDate = new Date(purchase[0]);
            pDate.setDate(pDate.getDate()+1);

            let dDate=null;
            if(this.state.deliveryDate!=null){
                let delivery=this.state.deliveryDate.toString().split("T");
                dDate = new Date(delivery[0]);
                dDate.setDate(dDate.getDate()+1);
            }
            

            this.setState({
                purchasedDate:pDate,
                deliveryDate:dDate
            }, () => {
                console.log(this.state);
            })

        }
       
    }

    handleUpdate() {
        this.setState({
            updateOrder:true
        })
    }

    render() {
        return (
            <tr>
                {
                   this.state.updateOrder?(
                       <Redirect to={{
                            state: {id:this.state.id},
                            pathname: '/updateOrder'
                          }}/>
                   ):("")
                }
                <td class="center">
                    <i><b>{this.state.id}</b></i><br/><br/>
                    <button class="waves-effect waves-light btn-small red lighten-2" onClick={this.handleUpdate}>Update</button><br/><br/>
                </td>
                <td class="blue-grey darken-2 white-text center">
                <Moment format="YYYY/MM/DD">{this.state.purchasedDate}</Moment>
                </td>
                <td class="center">{this.state.deliveryDate!=null?(
                    <Moment format="YYYY/MM/DD">{this.state.deliveryDate}</Moment>
                    ):("N/A")}</td>
                <td class="blue-grey darken-2 white-text center">
                    {this.state.status}
                </td>
                <td>
                    US${this.state.totalAmount}
                </td>
                <td class="blue-grey darken-2 white-text center">
                    {this.state.paymentMethod}
                </td>
                <td >
                    <b>User ID: </b>{this.state.user.email}
                    <br/><b>Full Name: </b>{this.state.user.firstName + this.state.user.lastName}
                    <br/><b>Phone Number: </b>{this.state.user.phoneNo}
                </td>
                <td class="blue-grey darken-2 white-text center">
                    {this.state.address}
                </td>
            </tr>
        )
    }
}

export default BookDetails;