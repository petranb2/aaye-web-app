import React, { useState, useEffect } from "react";
import { Jumbotron, Button, Container } from "reactstrap";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import UsersTable from "./users.table.auth.page";

class UsersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: false,
    };
  }

  componentDidMount() {
    console.log("users useeffect");
    fetch(`http://localhost:3001/users`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          products: data,
        });
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
          <UsersTable products={this.state.products} />
      </div>
    );
  }
}

export default UsersPage;
