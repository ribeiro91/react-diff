import React, { Component } from "react";
import ErrorBanner from "./errorBanner";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source: "",
      changed: "",
      isValidated: false,
      isValid: false,
      errorMessage: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      isValidated: true
    });

    if (!this.state.source.trim().length > 0) {
      this.setState({
        isValid: false,
        errorMessage: "Please enter a Original code"
      });
      return;
    }

    if (!this.state.changed.trim().length > 0) {
      this.setState({
        isValid: false,
        errorMessage: "Please enter a Changed code"
      });
      return;
    }

    let prettydiff = require("prettydiff");

    let options = {
      diff: this.state.changed,
      diff_space_ignore: true,
      diff_format: "json",
      mode: "diff",
      source: this.state.source
    };

    prettydiff.options = { ...prettydiff.options, ...options };

    let output = prettydiff();
    this.props.handleReport(output);
    this.props.history.push("/report");
  }

  render() {
    return (
      <div className="App w-15">
        <div className="container">
          <ErrorBanner
            isValidated={this.state.isValidated}
            errorMessage={this.state.errorMessage}
            isValid={this.state.isValid}
          />
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="row">
              <div className="leftWrapper col-6">
                <label>
                  <h4 className="text-uppercase">Original Code</h4>
                </label>
                <textarea
                  name="source"
                  cols="30"
                  rows="20"
                  className="w-100"
                  value={this.state.source}
                  onChange={event => {
                    this.handleChange(event);
                  }}
                ></textarea>
              </div>
              <div className="rightWrapper col-6">
                <label>
                  <h4 className="text-uppercase">Changed Code</h4>
                </label>
                <textarea
                  name="changed"
                  cols="30"
                  rows="20"
                  className="w-100"
                  value={this.state.changed}
                  onChange={event => {
                    this.handleChange(event);
                  }}
                ></textarea>
              </div>
            </div>
            <input
              type="submit"
              value="Compare"
              className="btn btn-info mt-3"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Home;
