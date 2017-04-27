import React, { Component } from 'react';
//import './Table.css';
import json from '../../sluzba.json';
import * as ReactBootstrap from 'react-bootstrap';

class Table extends Component {
  constructor() {
      super();
      this.displayData = this.displayData.bind(this); //binding function once in constructor
      this.sortByID = this.sortByID.bind(this);
      this.filterData = this.filterData.bind(this);
      this.state = {json};
      this.textToFilter = null;
      let self = this;
  }

  displayData() {
    return this.state.json.map((item, index) => (
      <div className="row" key={index}>
        <div className="col-sm-1">{item.id}</div>
        <div className="col-sm-2">{item.firstName}</div>
        <div className="col-sm-2">{item.lastName}</div>
        <div className="col-sm-3">{item.dateOfBirth}</div>
        <div className="col-sm-2">{item.function}</div>
        <div className="col-sm-2">{item.experience}</div>
      </div>
    )
    )
  }

  sortByID() {
    this.setState({json: this.state.json.sort( (a, b) => (a.id - b.id))})
  }

  findItem(item) {
    console.log(self.textToFilter.value)
    console.log(item.firstName)
    //Object.keys(item).forEach( (value) => value === this.textToFilter ? item : '')
    if (item.firstName.includes(self.textToFilter.value)) {return item}
  }

  filterData() {
    return json.map(this.findItem)
  }

  render() {
    return (
      <div className="Table">
          <button className="btn btn-success" onClick={this.sortByID}> SortById </button>
          <input ref={(input) => {self.textToFilter = input;}} onKeyUp={this.filterData} />
         { this.displayData() }

      </div>
    );
  }
}

export default Table;
