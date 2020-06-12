import React, { Component } from 'react';
import M from "materialize-css";
import Moment from 'react-moment';
import { Redirect } from "react-router-dom";
const axios = require("axios");


class BookDetails extends Component {
    constructor(props){
        super(props);
        this.state={
            id:this.props.book.id,
            isbn:this.props.book.isbn,
            publisher:this.props.book.publisher,
            category:this.props.book.category,
            publicationDate:this.props.book.publicationDate,
            author:this.props.book.author,
            title:this.props.book.title,
            price:this.props.book.price,
            format:this.props.book.format,
            description:this.props.book.description,
            imagePath:this.props.book.imagePath,
            qtyInStock:this.props.book.qtyInStock,
            updateBook:false,
            orders:[]
        }
        console.log(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount(){
        const modal = document.querySelectorAll('.modal');
        M.Modal.init(modal, {});

        const select = document.querySelectorAll('select');
        M.FormSelect.init(select, {});

        if(this.state.publicationDate!==null){
            let publishDate=this.state.publicationDate.toString().split("T");
            let date = new Date(publishDate[0]);
            date.setDate(date.getDate()+1);
            this.setState({
                publicationDate:date
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
        for(let a=0; a<this.state.orders.length; a++){
            if(this.state.orders[a].orderStatus==='Pending'){
                if(this.state.bookings[a].book.id === this.state.id){
                    canDelete=false;
                }
            }
        }

        if(canDelete){
            if (window.confirm("Are you sure you want to delete this book?")) {
                axios.delete("http://localhost:8080/DeleteBook/"+ this.state.id,config)
                .then(function(res){
                    console.log("Book deleted successfully!");
                    alert("Book deleted successfully!");
                    window.location.reload();
                }).catch(function(error){
                    console.log("Book delete un-successful!\nError : ",error.response);
                    alert("Book delete un-successful!");
            })
              } else {
                alert("Book deletion cancelled");
              } 
        }else{
            alert("This Book Cannot be Deleted due to existing orders that include this book");
        }
                    
    }

    handleUpdate() {
        this.setState({
            updateBook:true
        })
    }

    render() {
        return (
            <tr>
                {
                   this.state.updateBook?(
                       <Redirect to={{
                            state: {id:this.state.id},
                            pathname: '/updateBook'
                          }}/>
                   ):("")
                }
                <td class="center">
                    <i><b>{this.state.id}</b></i><br/><br/>
                    <button class="waves-effect waves-light btn-small red lighten-2" onClick={this.handleUpdate}>Update</button><br/><br/>
                    <button class="waves-effect waves-light btn-small red lighten-2" onClick={this.handleDelete}>Delete</button>
                </td>
                <td class="teal lighten-4 center">
                    <b>{this.props.book.title}</b><br/><br/>
                    {this.state.description}
                </td>
                <td class="center">{this.props.book.category}</td>
                <td class="teal lighten-4 center">
                US${this.state.price}
                </td>
                <td>
                    <img class="responsive-img" src={this.state.imagePath} alt=""/><br/>
                </td>
                
                <td class="teal lighten-4"><b>Author: </b>{this.props.book.author}
                <br/><b>Format: </b>{this.state.format}
                <br/><b>Publisher: </b>{this.state.publisher}
                <br/><b>Publication Date: </b>
                {/* {this.state.publicationDate!==null?(this.state.publicationDate):("")}  */}
                <Moment format="YYYY/MM/DD">{this.state.publicationDate}</Moment>
                <br/><b>Quantity: </b>{this.props.book.qtyInStock}
                <br/><b>ISBN: </b>{this.props.book.isbn}</td>

            </tr>
        )
    }
}

export default BookDetails;