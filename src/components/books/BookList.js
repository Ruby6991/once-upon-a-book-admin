import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import BookDetails from '../books/BookDetails'
import M from 'materialize-css'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
const axios = require("axios")


class BookList extends Component {
    constructor(props){
        super(props);
        this.state={
            isbn:'',
            publisher:'',
            publicationDate:'',
            author:'',
            title:'',
            price:'',
            format:'',
            description:'',
            imagePath:'',
            qtyInStock:'',
            category:'',
            books:[],
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
        axios.post("http://localhost:8080/GetBookList",data,{
            headers:headersInfo
        }).then(function(res){
            console.log(res.data);
            that.setState({
                books:res.data
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

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        const token = 'Bearer '+ localStorage.token;
        const headersInfo = {
            Authorization:token
        }
        
        const data = {
            isbn:this.state.isbn,
            publisher:this.state.publisher,
            publicationDate:this.state.publicationDate,
            author:this.state.author,
            title:this.state.title,
            price:this.state.price,
            format:this.state.format,
            description:this.state.description,
            imagePath:this.state.imagePath,
            qtyInStock:this.state.qtyInStock,
            category:this.state.category
        }
        console.log(data);

        axios.post("http://localhost:8080/AddBook",data,{
            headers:headersInfo
        })
            .then(function(res){
                console.log("Book Added successfully!");
                alert("Book Added successfully!");
                window.location.reload();
            }).catch(function(error){
                console.log("Book addition un-successful!\nError : ",error.response);
                alert("Book addition un-successful!");
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
        axios.post("http://localhost:8080/GetBook/",data, {
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

    onDateChange = (value, event) => {
        this.setState({
            publicationDate: value
        }, () => {
            console.log(this.state);
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
                    <button style={{marginRight:30+'px'}} data-target="modal1" class="modal-trigger waves-effect btn-flat teal lighten-3 white-text center btn-large"> Add New Book </button>
                    <button class="waves-effect btn-flat teal lighten-3 white-text center btn-large" onClick={this.signOut}>Logout </button>
                </div>
                {/* <!-- Modal1 Structure --> */}
                <div id="modal1" class="modal">
                    <div class="modal-content">
                        <h4 class="center" >Add New Book</h4>
                        <form >
                            <input type="text" placeholder="Title" id="title" onChange={this.handleChange}/>
                            <input type="text" placeholder="Author" id="author" onChange={this.handleChange}/>
                            <input type="text" placeholder="ISBN" id="isbn" onChange={this.handleChange}/>
                            <input type="text" placeholder="Publisher" id="publisher" onChange={this.handleChange}/>
                            <label for="publishDate">Publication Date</label>
                            <Calendar id="publishDate" onChange={this.onDateChange} />
                            <input type="text" placeholder="Price" id="price" onChange={this.handleChange}/>
                            <input type="text" placeholder="Description" id="description" onChange={this.handleChange}/>

                            <div class="input-field">
                                <select id="category" onChange={this.handleChange}>
                                <option value="" disabled selected>Choose Category</option> 
                                <option value="Art & Photography">Art & Photography</option>
                                <option value="Biography">Biography</option>
                                <option value="Children's Books">Children's Books</option>
                                <option value="Crafts & Hobbies">Crafts & Hobbies</option>
                                <option value="Crime & Thriller">Crime & Thriller</option>
                                <option value="Fiction">Fiction</option>
                                <option value="Food & Drink">Food & Drink</option>
                                <option value="Graphic Novels, Anime & Manga">Graphic Novels, Anime & Manga</option>
                                <option value="History & Archaeology">History & Archaeology</option>
                                <option value="Mind, Body & Spirit">Mind, Body & Spirit</option>
                                <option value="Science Fiction, Fantasy & Horror">Science Fiction, Fantasy & Horror</option>
                                </select>
                            </div>

                            <input type="tel" placeholder="Quantity" id="qtyInStock" onChange={this.handleChange}/>

                            <div class="input-field">
                                <select id="format" onChange={this.handleChange}>
                                <option value="" disabled selected>Choose Format</option>
                                <option value="Hardcover">Hardcover</option>
                                <option value="Paperback">Paperback</option>
                                </select>
                            </div>

                            <input type="text" placeholder="Image" id="imagePath" onChange={this.handleChange} />
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button style={{marginRight:30+'px'}} class="modal-close waves-effect waves-green btn-flat teal lighten-3" onClick={this.handleSubmit} >Add</button>
                        <button class="modal-close waves-effect waves-green btn-flat teal lighten-3">Cancel</button>
                    </div>
                </div>
            <h2 class="center">Manage Books</h2>
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
                                            <th class="teal lighten-3">Book ID</th>
                                            <th class=" teal lighten-4">Title & Description</th>
                                            <th class=" teal lighten-3">Category</th>
                                            <th class="teal lighten-4"style={{width: 100+"px"}}>Price</th>
                                            <th class=" teal lighten-3" style={{width: 200+"px"}} >Image</th>
                                            <th class="teal lighten-4" style={{width: 200+"px"}}>Additional Information</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.state.view?(
                                            this.state.books && this.state.books.map(book => 
                                        {
                                            return(
                                                <BookDetails book={book} key={book.id} />
                                            )
                                        })
                                        ):(
                                            <BookDetails book={this.state.searchResult} key={this.state.searchResult.id} /> 
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


export default BookList;