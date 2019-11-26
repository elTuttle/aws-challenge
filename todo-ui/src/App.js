import React, { Component } from "react";
import ReactDOM from "react-dom";
import List from "./components/List.js";
import AddListItem from "./components/AddListItem.js";
import {Dropdown, Row, Col, Container, Button, Form} from 'react-bootstrap';
import "./index.css";

class App extends Component {
  render() {
    return (
        <div>
          <Row>
            <Col sm={6}>
              <br />
              <List />
            </Col>
            <Col sm={6}>
              <AddListItem />
            </Col>
          </Row>
        </div>
    );
  }
}

export default App;
