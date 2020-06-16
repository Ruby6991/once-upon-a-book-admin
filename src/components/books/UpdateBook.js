import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
const axios = require("axios")

class UpdateBook extends Component {
    constructor(props){
        super(props);
        this.state={
            id:this.props.location.state.id,
            isbn:'',
            publisher:'',
            category:'',
            publicationDate:'',
            author:'',
            title:'',
            price:'',
            format:'',
            description:'',
            imagePath:'',
            qtyInStock:'',
            isUpdated:false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    componentDidMount(){
        const that = this;

        const token = 'Bearer '+ localStorage.token;
        const headersInfo = {
            Authorization:token
        }
        const data = {
            id: this.state.id
        }
        axios.post("http://localhost:8080/GetBook/", data, {
            headers:headersInfo
        })
        .then(function(res){
                console.log(res.data)
                that.setState({
                    publisher:res.data.publisher,
                    category:res.data.category,
                    publicationDate:res.data.publicationDate,
                    author:res.data.author,
                    title:res.data.title,
                    price:res.data.price,
                    imagePath:res.data.imagePath,
                    qtyInStock:res.data.qtyInStock,
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
            publicationDate: value
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
            publicationDate:this.state.publicationDate,
            price:this.state.price,
            imagePath:this.state.imagePath,
            qtyInStock:this.state.qtyInStock,
        }
        console.log(data);

        axios.put("http://localhost:8080/UpdateBook/"+ this.state.id,data,config)
            .then(function(res){
                console.log("Book updated successfully!");
                alert("Book updated successfully!");
                that.setState({
                    isUpdated:true
                })
            }).catch(function(error){
                console.log("Book update un-successful!\nError : ",error.response);
                alert("Book update un-successful!");
         })
    }

    handleBack = (e) => {
        this.setState({
            isUpdated:true
        })
    }

    render() {
        return (
            <div class="update-book">
                {
                   this.state.isUpdated?(
                       <Redirect to={'/booklist'}/>
                   ):("")
                }
                <div className="container">
                    <div class="card">
                        <div class="card-content">
                            <span class="card-title">Update Book : {this.state.title} </span>
                            <img style={{width:700+"px"}} class="responsive-img" src={this.state.imagePath} alt=""/>
                                <form>
                                    <table >
                                        <tbody>
                                        <tr>
                                            <th>Author</th>
                                            <td>{this.state.author}</td>
                                        </tr>
                                        <tr>
                                            <th>Category</th>
                                            <td>{this.state.category}</td>
                                        </tr>
                                        <tr>
                                            <th>Price</th>
                                            <td><input type="text" placeholder={this.state.price} id="price" onChange={this.handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <th>Quantity</th>
                                            <td><input type="text" placeholder={this.state.qtyInStock} id="qtyInStock" onChange={this.handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <th>Publication Date</th>
                                            <td><Calendar onChange={this.onDateChange} /></td>
                                        </tr>
                                        <tr>
                                            <th>Image URL</th>
                                            <th><input type="text" placeholder="New Image URL" id="imagePath" onChange={this.handleChange} /></th>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <br/>
                                <button style={{marginRight:30+'px'}} class="waves-effect waves-light btn-small red lighten-2" type="button" onClick={this.handleSubmit}>Update Book</button>
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