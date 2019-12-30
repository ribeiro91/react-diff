import React, { Component } from "react";

class Report extends Component {
  render() {
    //console.info(this.props.reportData);
    //const jsonFeed = { diff: [["=", "test"]] };
    /* const jsonFeed = {
      diff: [
        ["=", "test"],
        ["r", "test2", "test3"],
        ["r", "", "test4"]
      ]
    }; 

    const jsonFeed = {
      diff: [
        ["=", "test"],
        ["-", "test1"],
        ["=", "test2"],
        ["=", "test3"],
        ["+", "test4"],
        ["r", "test2", "test3"]
      ]
    };*/
    const jsonFeed = JSON.parse(this.props.reportData);
    const reportData = jsonFeed.diff;

    return (
      <div className="container">
        <h1>Report</h1>
        <ul>
          <li className="d-flex f-0 flex-align-center">
            <div className="f-15 sourceWrapper">
              <h4 className="text-uppercase">Original Code</h4>
            </div>
            <div className="rowNumber f-15"></div>
            <div className="f-15 destinationWrapper">
              <h4 className="text-uppercase">Changed Code</h4>
            </div>
          </li>
          {reportData.map(
            (data, index) => (
              //data.map((item, i) => (
              <GenerateDOM key={index + 1} data={data} rowNumber={index + 1} />
            )
            //))
          )}
        </ul>
      </div>
    );
  }
}

class GenerateDOM extends Component {
  getEachRowValue(data) {
    console.info(data);
    let eachRowData = {};
    if (data[0] === "=") {
      eachRowData.sourceValue = eachRowData.destinationValue = data[1];
      eachRowData.sourceClass = eachRowData.destinationClass = "alert-light";
    } else if (data[0] === "r") {
      eachRowData.sourceValue = data[1];
      eachRowData.destinationValue = data[2];
      eachRowData.sourceClass = eachRowData.destinationClass = "alert-warning";
    } else if (data[0] === "-") {
      eachRowData.sourceValue = "";
      eachRowData.destinationValue = data[1];
      eachRowData.sourceClass = "alert-danger";
      eachRowData.destinationClass = "alert-success";
    } else {
      eachRowData.sourceValue = data[1];
      eachRowData.destinationValue = "";
      eachRowData.sourceClass = "alert-success";
      eachRowData.destinationClass = "alert-danger";
    }

    return eachRowData;
  }

  render() {
    let eachRowValue = this.getEachRowValue(this.props.data);
    return (
      <li className="d-flex f-0 flex-align-center">
        <div
          className={
            "alert " + eachRowValue.sourceClass + " f-15 sourceWrapper"
          }
        >
          {eachRowValue.sourceValue}
        </div>
        <div className="rowNumber f-15">{this.props.rowNumber}</div>
        <div
          className={
            "alert " +
            eachRowValue.destinationClass +
            " f-15 destinationWrapper"
          }
        >
          {eachRowValue.destinationValue}
        </div>
      </li>
    );
  }
}

export default Report;
