import React, { Component } from "react";
import { Card, Icon, Input } from "antd";
import styles from "../Style/TodoStyle.module.css";

class AllTodoItem extends Component {
  state = {
    editing: false,
    inputValue: ""
  };

  handleEditPressedAll = () => {
    this.setState({
      inputValue: this.props.name,
      editing: true
    });
  };

  handleSaveAll = () => {
    this.props.onEditAll(this.state.inputValue);
    this.setState({
      editing: false,
      inputValue: ""
    });
  };

  handleCancelAll = () => {
    this.setState({
      editing: false,
      inputValue: ""
    });
  };

  handleChangeAll = event => {
    this.setState({
      inputValue: event.target.value
    });
  };
  render() {
    return (
      <>
        {this.state.editing ? (
          <Card
            title={
              <Input
                value={this.state.inputValue}
                onChange={this.handleChangeAll}
                style={{ margin: 0 }}
              />
            }
            bordered={true}
            style={{
              width: 300,
              display: "inline-block",
              margin: 12,
              backgroundColor: `${this.props.done ? "#eafff0" : "#fff3f3"}`
            }}
            actions={[
              <span onClick={this.handleSaveAll} className={styles.saveBtn}>
                <Icon type="save" />
              </span>,
              <span onClick={this.handleCancelAll} className={styles.cancelBtn}>
                <Icon type="rollback" />
              </span>
            ]}
          >
            <p>Card content</p>
          </Card>
        ) : (
          <Card
            title={this.props.name}
            bordered={true}
            style={{
              width: 300,
              display: "inline-block",
              margin: 12,
              backgroundColor: `${this.props.done ? "#eafff0" : "#fff3f3"}`
            }}
            actions={[
              <Icon
                type="file-done"
                className={styles.ATDoneBtn}
                onClick={this.props.onToggleAll}
              />,
              <Icon
                type="edit"
                key="edit"
                className={styles.ATEditBtn}
                onClick={this.handleEditPressedAll}
              />,
              <Icon
                type="delete"
                key="delete"
                className={styles.ATDeleteBtn}
                onClick={this.props.onDeleteAll}
              />
            ]}
          >
            <p>Card content</p>
          </Card>
        )}
      </>
    );
  }
}

export default AllTodoItem;
