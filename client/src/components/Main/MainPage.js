import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import Main from '../../services/MainService';

class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      customers: [],
    };
  }
  
  componentDidMount() {
    Main.getCustomers()
    .then(res => res.json())
    .then(customers => this.setState({ customers }));
  }

  render() {
    const columns = [{
    Header: 'Id',
      accessor: 'id' // String-based value accessors!
    }, {
      Header: 'FirstName',
      accessor: 'firstName' // String-based value accessors!
    }, {
      Header: 'LastName',
      accessor: 'lastName' // String-based value accessors!
    }]
    return (
      <div >
        <ReactTable data={this.state.customers} columns={columns} className="-striped -highlight" defaultPageSize={5}/>
      </div>
    );
  }
}

export default withRouter(MainPage);
