import React, { useState, useEffect } from "react";
import { Jumbotron, Button, Container } from "reactstrap";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const UsersPage = (props) => {
  let [products, setproducts] = useState([]);

  const columns = [
    {
      dataField: "username",
      text: "Email",
    },
    {
      dataField: "dateCreated",
      text: "Create Date",
    },
  ];

  return (
    <Container>
      <h1 className="display-3 text-justify">Users table</h1>
      <BootstrapTable
        keyField="email"
        data={props.products}
        columns={columns}
        pagination={paginationFactory()}
      />
    </Container>

  );
};

export default UsersPage;
