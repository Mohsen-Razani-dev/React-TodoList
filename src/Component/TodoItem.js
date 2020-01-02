import React, { Component } from "react";
import styles from "../Style/TodoStyle.module.css";
import classNames from "classnames";
import { Avatar, List, Skeleton, Input, Icon } from "antd";
import { Link } from "react-router-dom";

class TodoItem extends Component {
  state = {
    editing: false,
    inputValue: ""
  };

  handleEditPressed = () => {
    this.setState({
      inputValue: this.props.name,
      editing: true
    });
  };

  handleSave = () => {
    this.props.onEdit(this.state.inputValue);
    this.setState({
      editing: false,
      inputValue: ""
    });
  };

  handleCancel = () => {
    this.setState({
      editing: false,
      inputValue: ""
    });
  };

  handleChange = event => {
    this.setState({
      inputValue: event.target.value
    });
  };

  render() {
    return (
      <>
        {this.state.editing ? (
          <List.Item
            style={{
              padding: "30px",
              margin: "0 auto",
              marginTop: 30,
              border: "1px solid grey",
              borderRadius: "10px",
              maxWidth: 600
            }}
            actions={[
              <span onClick={this.handleSave} className={styles.saveBtn}>
                <Icon type="save" />
              </span>,
              <span onClick={this.handleCancel} className={styles.cancelBtn}>
                <Icon type="rollback" />
              </span>
            ]}
          >
            <Skeleton avatar title={true} loading={false} active>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={
                  <span>
                    <Input
                      value={this.state.inputValue}
                      onChange={this.handleChange}
                      style={{ margin: 0 }}
                    />
                  </span>
                }
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                style={{
                  textDecoration: this.props.done ? "line-through" : "none"
                }}
              />
            </Skeleton>
          </List.Item>
        ) : (
          <List.Item
            style={{
              padding: "30px",
              margin: "0 auto",
              marginTop: 30,
              border: "1px solid grey",
              borderRadius: "10px",
              maxWidth: 600
            }}
            actions={[
              <span
                key="list-loadmore-edit"
                onClick={this.handleEditPressed}
                className={styles.editBtn}
              >
                <Icon type="edit" />
              </span>,
              <span
                key="list-loadmore-more"
                onClick={this.props.onToggle}
                className={this.props.done ? styles.undoBtn : styles.doneBtn}
              >
                {this.props.done ? <Icon type="undo" /> : <Icon type="check" />}
              </span>
            ]}
          >
            <Skeleton avatar title={true} loading={false} active>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={
                  <span
                    style={{
                      paddingLeft: "10px",
                      paddingTop: "5px",
                      fontSize: "21px"
                    }}
                  >
                    {this.props.name}
                  </span>
                }
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                style={{
                  textDecoration: this.props.done ? "line-through" : "none"
                }}
              />
              <span onClick={this.props.onDelete} className={styles.deleteBtn}>
                <Icon type="delete" />
              </span>
            </Skeleton>
          </List.Item>
        )}
      </>
    );
  }
}

export default TodoItem;
