import React from "react";
import "./App.css";
import TodoLayout from "./Component/TodoLayout";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={TodoLayout} />
      </Switch>
    </div>
  );
}

export default App;
