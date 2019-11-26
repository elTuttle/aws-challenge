import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown, Row, Col, Container, Button, Form} from 'react-bootstrap';
const uuidv1 = require('uuid/v1');

class AddListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {titleValue: '',
                  statusValue: ''};

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeTitle(event) {
    this.setState({titleValue: event.target.value});
  }

  handleChangeStatus(event) {
    this.setState({statusValue: event.target.value});
  }

  handleSubmit(event) {
    var date = new Date();
    var timeMil = date.getTime();
    fetch('https://wu3rabjpra.execute-api.us-west-2.amazonaws.com/Test/todolist?todoId=' + timeMil + '&title=' + this.state.titleValue +'&status=' + this.state.statusValue,
    {
      method: 'POST'
    })
    .then(results => {
      return results.json();
    }).then(data => {
      this.forceUpdate();
      this.forceUpdate();
    })

  }

  render () {

    return (<div>
              <Col>
              <br /><br />
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="exampleForm.ControlInput1" >
                    <Form.Label>Add To Do Item:</Form.Label>
                    <Form.Control type="text" placeholder="Title" value={this.state.titleValue} onChange={this.handleChangeTitle}/>
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlTextarea1" value={this.state.statusValue} onChange={this.handleChangeStatus}>
                    <Form.Label>Explanation:</Form.Label>
                    <Form.Control as="textarea" rows="3" />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Col>
            </div>);
  }
}

export default AddListItem;
