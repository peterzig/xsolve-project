import React, { Component } from 'react';
//import './Table.css';
import json from '../../sluzba.json';
import * as ReactBootstrap from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
let dateChosen = moment();

const compareDates = (date1, date2) => {
  date2 = `${('0' + date2.getDate()).slice(-2)}.${('0' + (date2.getMonth()+1)).slice(-2)}.${date2.getFullYear()} 00:00`
  console.log("GFDate1:", getFullDate(date1))
  console.log("GFDate2:", getFullDate(date2))
  return getFullDate(date1).isBefore(getFullDate(date2))
}

const getFullDate = (date) => {
  return moment(date, "DD.MM.YYYY");
}

class Table extends Component {
  constructor() {
      super();
      this.displayData = this.displayData.bind(this); //binding function once in constructor
      this.sortByID = this.sortByID.bind(this);
      this.filterData = this.filterData.bind(this);
      this.state = {json, startDate: moment(), data: json, numberOfPages: Math.ceil(json.length/5), currentPage: 0};
      this.textToFilter = null;
      let self = this;
      this.handleChange = this.handleChange.bind(this);
      this.filterData = this.filterData.bind(this);
      this.filterByDate = this.filterByDate.bind(this);
      this.renderPagination = this.renderPagination.bind(this);
      this.loadSelectedData = this.loadSelectedData.bind(this);
      this.changePage = this.changePage.bind(this);
  }

  renderPagination() {
    return [...new Array(this.state.numberOfPages).keys()].map((value, index) =>
                (<div onClick= { () => this.changePage(index)}>{index+1}</div>))
  }

  loadSelectedData(selectedPage) {
    return this.setState({data: json.slice(selectedPage, 5)})
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
    dateChosen = moment(this.state.startDate._d);
    this.filterByDate();
  }

  changePage(page) {
    return this.setState({currentPage: page})
  }

  displayData() {
    return this.state.data.slice((this.state.currentPage)*5,(this.state.currentPage+1)*5).map((item, index) => (
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
    this.setState({json: this.state.data.sort( (a, b) => (a.id - b.id))})
  }

  findItem(item) {
    const dataToCheck = item.firstName + item.lastName + item.function; //adding 3 strings to const variable

    return dataToCheck.includes(self.textToFilter.value) //return true or false
  }

  filterByDate() {
    return this.setState({data: this.state.json.filter(this.findItemByDate)});
  }

  findItemByDate(item) {
   return compareDates(item.dateOfBirth, dateChosen._d)
  }

  filterData() {
    return this.setState({data: this.state.json.filter(this.findItem)});
  }

  render() {
    return (
     <div className="Table">
          <button className="btn btn-success" onClick={this.sortByID}> Sortuj </button>
          <input placeholder="Szukaj..." ref={(input) => {self.textToFilter = input;}} onKeyUp={this.filterData} />
          <DatePicker placeholderText="Dodaj datę" locale="pl-pl" dateFormat="DD.MM.YYYY" selected={this.state.startDate} onChange={this.handleChange} />
         { this.displayData() }
         { this.renderPagination() }
      </div>
    );
  }
}

export default Table;
