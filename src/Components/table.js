import React, { Component } from 'react';
//import './Table.css';
import json from '../../sluzba.json';
import * as ReactBootstrap from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
let dateChosen = moment();

const compareDates = (date1, date2) => {
  console.log("Date1:", date1)
  console.log("Date2:", date2)
  return getFullDate(date1).isAfter(getFullDate(date2))
}

const getFullDate = (date) => {
  //console.log(moment(date, "DD.MM.YYYY"));
  //return date.getYear()+ date.getMonth() + date.getDay();
  return moment(date, "dd.mm.yyyy");
}

class Table extends Component {
  constructor() {
      super();
      this.displayData = this.displayData.bind(this); //binding function once in constructor
      this.sortByID = this.sortByID.bind(this);
      this.filterData = this.filterData.bind(this);
      this.state = {json, startDate: moment(), data: json, numberOfPages: Math.ceil(json.length/5)};
      this.textToFilter = null;
      let self = this;
      this.handleChange = this.handleChange.bind(this);
      this.filterData = this.filterData.bind(this);
      this.filterByDate = this.filterByDate.bind(this);
      this.renderPagination = this.renderPagination.bind(this);
      this.loadSelectedData = this.loadSelectedData.bind(this);
  }

  componentDidMount() {

  }

  renderPagination() {
    return [...new Array(this.state.numberOfPages).keys()].map((value, index) => (<div>{index+1}</div>))
  }

  loadSelectedData(selectedPage) {
    //return this.setState({data: json.slice(selectedPage, 5)})
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
    dateChosen = moment(this.state.startDate._d);
    this.filterByDate();
  }

  displayData() {
    //console.log(this.state.data)
    return this.state.data.map((item, index) => (
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
    const dataToCheck = item.firstName + item.lastName + item.function; //adding 3 strings to const variable

    return dataToCheck.includes(self.textToFilter.value) //return true or false
  }

  filterByDate() {
    return this.setState({data: this.state.json.filter(this.findItemByDate)});
  }

  findItemByDate(item) {
    //console.log("abc", compareDates(item.dateOfBirth, dateChosen._d))
   return compareDates(item.dateOfBirth, dateChosen._d)
  }

  filterData() {
    console.log(this.state.json.filter(this.findItem))
    return this.setState({data: this.state.json.filter(this.findItem)});
  }

  render() {
    return (
     <div className="Table">
          <button className="btn btn-success" onClick={this.sortByID}> SortById </button>
          <input placeholder="Szukaj..." ref={(input) => {self.textToFilter = input;}} onKeyUp={this.filterData} />
          <DatePicker placeholderText="Dodaj datę" locale="pl-pl" dateFormat="DD.MM.YYYY" selected={this.state.startDate} onChange={this.handleChange} />
         { this.displayData() }
         { this.renderPagination() }
      </div>
    );
  }
}

export default Table;
