import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./component/home";
import Report from "./component/report";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isRedirected: false,
      reportData: ""
    };
    this.handleReport = this.handleReport.bind(this);
  }

  handleReport(data) {
    this.setState({
      isRedirected: true,
      reportData: data
    });
  }
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path={"/"}
              render={props => (
                <Home {...props} handleReport={this.handleReport} />
              )}
            ></Route>
            <Route
              exact
              path={"/report"}
              render={props =>
                this.state.isRedirected ? (
                  <Report {...props} reportData={this.state.reportData} />
                ) : (
                  <Redirect to="/" />
                )
              }
              /* render={props => (
                <Report {...props} reportData={this.state.reportData} />
              )} */
            ></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
