import React, { Component } from "react";
import { PageHeader, Button, Descriptions } from "antd";
import classes from "./../Style/TodoStyle.module.css";
import axios from "axios";
import AllTodoItem from "./AllTodoItem";

class AllTodos extends Component {
  state = {
    todos: [],
    inputValue: "",
    filter: "All",
    editFromAll: false
  };
  setFilter = filterName => {
    this.setState({
      filter: filterName
    });
  };
  componentDidMount() {
    axios.get("http://localhost:9000/Todos").then(res => {
      this.setState({
        todos: res.data
      });
    });
  }
  deleteFromAll = (index, id) => {
    this.setState(prevState => {
      return {
        todos: [...prevState.todos.filter(i => i.id !== id)]
      };
    });
    axios.delete(`http://localhost:9000/Todos/${id}`);
  };

  editFromAll = (newName, index, id) => {
    this.setState(prevState => {
      return {
        editFromAll: true,
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

  toggleFromAll = (index, id) => {
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
  getTodosInAll = () => {
    switch (this.state.filter) {
      case "All":
        return this.state.todos;
      case "Dones":
        return this.state.todos.filter(t => t.done);
      case "Un-Dones":
        return this.state.todos.filter(t => !t.done);
    }
  };
  render() {
    return (
      <div
        style={{
          padding: "25px 0 ",
          background: "#fff",
          textAlign: "center"
        }}
      >
        <div style={{position:'fixed',zIndex:100}}>
          <PageHeader
            style={{
              backgroundColor: "rgba(238,240,244,0.99)",
              paddingTop: "35px"
            }}
            ghost={false}
            onBack={() => window.history.back()}
            title="Title"
            subTitle="This is a subtitle"
            extra={[
              <Button
                key="3"
                onClick={() => this.setFilter("All")}
                className={`${
                  this.state.filter === "All"
                    ? classes.activeButton
                    : classes.notActiveButton
                }`}
              >
                All Todos
              </Button>,
              <Button
                key="2"
                onClick={() => this.setFilter("Dones")}
                className={`${
                  this.state.filter === "Dones"
                    ? classes.activeButton
                    : classes.notActiveButton
                }`}
              >
                Dones
              </Button>,
              <Button
                key="1"
                onClick={() => this.setFilter("Un-Dones")}
                className={`${
                  this.state.filter === "Un-Dones"
                    ? classes.activeButton
                    : classes.notActiveButton
                }`}
              >
                Un-Dones
              </Button>
            ]}
          >
            <Descriptions size="small" column={4}>
              <Descriptions.Item label="Number of your tasks">
                {this.state.todos.length}
              </Descriptions.Item>
              <Descriptions.Item label="Your Account Status">
                <a>Free</a>
              </Descriptions.Item>
              <Descriptions.Item label="Number of days used">
                6
              </Descriptions.Item>
              <Descriptions.Item label="Last Update">
                2017-10-10
              </Descriptions.Item>
            </Descriptions>
          </PageHeader>
        </div>
        <div style={{ paddingTop: "180px", paddingBottom: "150px" }}>
          {this.getTodosInAll().map((todo, index) => (
            <AllTodoItem
              {...todo}
              key={todo.id}
              onToggleAll={() => this.toggleFromAll(index, todo.id)}
              onDeleteAll={() => this.deleteFromAll(index, todo.id)}
              onEditAll={newName => this.editFromAll(newName, index, todo.id)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default AllTodos;
