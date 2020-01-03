import React, { Component } from "react";
import styles from "../Style/TodoStyle.module.css";
import { Input, Icon, List, Avatar, Button, Skeleton } from "antd";
import TodoItem from "./TodoItem";
import axios from "axios";

const { Search } = Input;
class AddTodo extends Component {
  state = {
    todos: [],
    inputValue: "",
    filter: "All",
    date: null,
    id : 1

};
  setFilter = filterName => {
    this.setState({
      filter: filterName
    });
  };
  componentDidMount() {
    axios.get("http://localhost:9000/Todos").then(res => {
      this.setState(prev => {
        let lastId = res.data.map(i=>i.id)
        let maxId = Math.max(...lastId)
        return {
          todos: res.data,
          id:maxId+1
        };
      });
    });
  }

  add = taskName => {
    let itemId =
      this.state.todos
        .filter(i => i.name === taskName)
        .map(i => i.id)
        .values()
        .next().value - 1;
    axios.post("http://localhost:9000/Todos", {
      name: taskName,
      done: false,
      id: itemId
    });
    this.setState(prevState => {
      return {
        todos: [
          ...prevState.todos,
          { name: taskName, done: false, id: this.state.id++ }
        ]
      };
    });
    console.log('name:',taskName,'id:',this.state.id);
  };

  delete = (index, id) => {
    console.log("index:", index, ",id :", id);
    axios.delete(`http://localhost:9000/Todos/${id}`);
    this.setState(prevState => {
      return {
        todos: [...prevState.todos.filter(i => i.id !== id)],
        id:prevState.id-1
      };
    });
  };

  toggle = (index, id) => {
    console.log("index:", index, ",id :", id);
    let item = this.state.todos
      .filter(i => i.id === id)
      .map(i => i.done)
      .values()
      .next().value;
    this.setState(prevState => {
      return {
        todos: prevState.todos.map((todo, i) => {
          if (i === index) return { ...todo, done: !todo.done };
          else return todo;
        })
      };
    });

    console.log(item);
    axios.patch(`http://localhost:9000/Todos/${id}`, {
      done: !item
    });
  };

  edit = (newName, index, id) => {
    this.setState(prevState => {
      return {
        todos: prevState.todos.map((todo, i) => {
          if (i === index) return { ...todo, name: newName };
          else return todo;
        })
      };
    });
    console.log("newName:", newName, " index:", index, " id:", id);
    axios.patch(`http://localhost:9000/Todos/${id}`, {
      name: newName
    });
  };

  handleAddTodoPress = () => {
    if (this.state.inputValue) {
      this.add(this.state.inputValue);
      this.setState({
        inputValue: ""
      });
    }
  };

  handleInputChange = event => {
    this.setState({
      inputValue: event.target.value
    });
  };
  render() {
    return (
      <div
        style={{
          padding: "100px 0 ",
          background: "#fff"
        }}
      >
        <Search
          size="large"
          placeholder="Add New Todo"
          onSearch={this.handleAddTodoPress}
          enterButton={<Icon type="plus" />}
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          style={{ padding: "0 150px" }}
        />
        {this.state.todos.map((todo, index) => (
          <TodoItem
            {...todo}
            key={todo.id}
            onToggle={() => this.toggle(index, todo.id)}
            onDelete={() => this.delete(index, todo.id)}
            onEdit={newName => this.edit(newName, index, todo.id)}
          />
        ))}
      </div>
    );
  }
}

export default AddTodo;
