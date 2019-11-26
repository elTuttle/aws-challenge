import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown, Row, Col, Container, Button, Form} from 'react-bootstrap';

class List extends React.Component {

  constructor() {
    super();

    this.state = {
      listItems: [],
      dropdownItems: [],
      timestamp: "",
      formIds: []
    }

    this.imageClick = this.imageClick.bind(this);
    this.imageEditClick = this.imageEditClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  imageClick(todoId) {
          fetch('https://wu3rabjpra.execute-api.us-west-2.amazonaws.com/Test/todolist?todoId=' + todoId,
          {
            method: 'delete'
          }).then(results => {
            console.log(results)
            window.location.reload(false)
          })
      }

      imageEditClick(todoId) {
        console.log(this.state.formIds)
        if (this.state.formIds.includes(todoId)){
          this.setState({
            formIds: this.state.formIds.filter(function(value, index, arr){

                return value != todoId;

            })
          })
        } else {
              var formIds = this.state.formIds
              formIds.push(todoId)
              this.setState({
                formIds: formIds
              })
          }
        }

    handleSubmit(todoId) {
          fetch('https://wu3rabjpra.execute-api.us-west-2.amazonaws.com/Test/todolist?todoId=' + todoId + '&title=' + this.refs.title.value +'&status=' + this.refs.status.value,
          {
            method: 'PUT'
          }).then(results => {
            console.log(results)
            window.location.reload(false)
          })
  }

  onSelect(eventKey) {
    console.log(eventKey)
  }

  componentWillMount() {//when the component is created, send get request for bank
    fetch('https://wu3rabjpra.execute-api.us-west-2.amazonaws.com/Test/todolist',
    {
      method: 'GET'
    })

    .then(results => {
      return results.json();
    }).then(data => {
      this.setState({
        listItems: data['body']
      })
    })
  }



  render () {


    let listItems = this.state.listItems.map((item, index) => {
      if (this.state.formIds.includes(item.todoId)) {
        return (
          <Container key={item.todoId}>
            <Form onSubmit={() => this.handleSubmit(item.todoId)}>
              <Row>
                <Col sm={11}>
                  <Form.Control type="text" placeholder={item.title} ref="title" />
                </Col>
                <Col sm={1}>
                  <Row>
                    <Button variant="warning">
                      <img src="http://cdn.onlinewebfonts.com/svg/img_434596.png" height="30" width="30"  onClick={() => this.imageEditClick(item.todoId)}/>
                    </Button>
                    <Button variant="danger">
                      <img src="https://findicons.com/files/icons/1580/devine_icons_part_2/128/trash_recyclebin_empty_closed.png" height="30" width="30"  onClick={() => this.imageClick(item.todoId)}/>
                    </Button>
                   </Row>
                </Col>
              </Row>
              <Col sm={11}>
                <Form.Control as="textarea" rows="3" placeholder={item.status} ref="status"/>
                <br />
                <Button type="submit">Submit</Button>
                <hr/>
              </Col>
            </Form>
          </Container>
        );
      } else {
        return (
          <Container key={item.todoId}>
            <Row>
              <Col sm={4}>
                <h3>{item.title}</h3>
              </Col>
              <Col sm={7}>
              </Col>
              <Col sm={1}>
                <Row>
                  <Button variant="warning">
                    <img src="http://cdn.onlinewebfonts.com/svg/img_434596.png" height="30" width="30"  onClick={() => this.imageEditClick(item.todoId)}/>
                  </Button>
                  <Button variant="danger">
                    <img src="https://findicons.com/files/icons/1580/devine_icons_part_2/128/trash_recyclebin_empty_closed.png" height="30" width="30"  onClick={() => this.imageClick(item.todoId)}/>
                  </Button>
                 </Row>
              </Col>
            </Row>
            <Col sm={4}>
              <p>{item.status}</p>
              <hr/>
            </Col>
          </Container>
        );
      }
    })

    return (<div>
              <Row>
                <Col sm={5}>
                </Col>
                <Col sm={7}>
                  <h1>To Do List:</h1>
                </Col>
              </Row>
              {listItems}
            </div>);
  }
}

export default List;
