import { Layout, Menu, Icon, Card } from "antd";
import React, { Component } from "react";
import { NavLink, Route ,Switch} from "react-router-dom";
import classes from "./../Style/TodoStyle.module.css";
import { routes } from "./../Routes/routes";
import RouteWithSubRoutes from "../Routes/RouteWithSubRoutes";

const { Header, Content, Footer, Sider } = Layout;
class TodoLayout extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Sider
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
              zIndex: 400
            }}
          >
            <div className="logo" />
            <Header className={classes.header}>
              <span>Todo List</span>
            </Header>
            <Menu
              style={{ marginTop: 100 }}
              theme="dark"
              mode="inline"
              // defaultSelectedKeys={["1"]}
            >
              <Menu.Item key="1">
                <NavLink
                  to="/addTodo"
                  activeClassName={classes.selectedSideBar}
                >
                  <Icon type="user" />
                  <span className="nav-text">New To-Do</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="2">
                <NavLink
                  to="/allTodo"
                  activeClassName={classes.selectedSideBar}
                >
                  <Icon type="video-camera" />
                  <span className="nav-text">Archive</span>
                </NavLink>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            <Header
              style={{
                padding: 0,
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 200,
                width: "100%",
                height: 70,
              }}
            >
            </Header>
            <Content style={{ margin: "24px 16px 0", overflow: "scroll" }}>
                <Switch>
                {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
                </Switch>
            </Content>
          </Layout>
            <Footer
                style={{
                    zIndex: 0,
                    textAlign: "center",
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    overflow: "none"
                }}
            >
                Mz Design ©2020 Created by Mohsen Razani
            </Footer>
        </Layout>
      </div>
    );
  }
}

export default TodoLayout;
