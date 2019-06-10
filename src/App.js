import './App.css';

import React, { Component } from 'react'
//Importing React-router
import {Route, BrowserRouter as Router} from 'react-router-dom';

import About from './components/pages/About';
import AddTodo from './components/AddTodo';
import Header from './components/layout/Header';
// Importing Components
import Todos from './components/Todos';
import axios from 'axios';

class App extends Component {
state={
  todos:[]
}

markComplete=(id)=>{debugger
  this.setState({
    todos: this.state.todos.map(todo => {
      if(todo.id === id)
        todo.completed = !todo.completed;
      return todo;
    })
  });
}

componentDidMount() {
  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => this.setState({ todos: res.data }));
}

delTodo=(id)=>{debugger
axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
.then(res => this.setState({todos:[...this.state.todos.filter(todo => todo.id !== id)]}));
}

addTodo=(title)=>{
axios.post('https://jsonplaceholder.typicode.com/todos',{
  title:title,
  completed: false
})
  .then(res => this.setState({
    todos: [ res.data,...this.state.todos,]
  }))
}

render() {
  return (
   <Router>
   <div className="App">
          <div className="container">
             <Header/>
             <br/>
             <Route exact path='/' render={props=>(
               <React.Fragment>
                <AddTodo addTodo={this.addTodo}/>
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo}/>
               </React.Fragment>
             )}/>
             <Route path='/about' component={About}/>
          </div>
        </div>
   </Router>
  );
 }
}
export default App;
