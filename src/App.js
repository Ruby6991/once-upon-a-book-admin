import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import SignIn from './components/auth/SignIn';
import BookList from './components/books/BookList';
import UserList from './components/users/UserList';
import OrderList from './components/orders/OrderList'
import UpdateBook from './components/books/UpdateBook';
import Dashboard from './components/layout/Dashboard';

class App extends Component {
  render(){
    return (
       <BrowserRouter>
        <div className="App">
        <Switch>
            <Route exact path='/' component={SignIn}/>
            <Route exact path='/signin' component={SignIn}/>
            <Route exact path='/dashboard' component={Dashboard}/>
            <Route exact path='/booklist' component={BookList}/>
            <Route exact path='/updateBook' component={UpdateBook}/>
            <Route exact path='/userlist' component={UserList}/>
            <Route exact path='/orderlist' component={OrderList}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
