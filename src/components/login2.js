import React from "react";
import { Container, Card, Form, Button, Input, Checkbox, Grid, Header, Segment, Message, Image } from 'semantic-ui-react'
import { Redirect } from "react-router-dom";
import Msg from "./msg";
import { Spinner } from "reactstrap";

// Example POST method implementation:
async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  console.log(response.status);
  return response.json(); // parses JSON response into native JavaScript objects
}

//let history = useHistory();

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.onDissmisMsg = this.onDissmisMsg.bind(this);
    this.state = {
      loggedIn: false,
      chkLoggedIn: false,
      message: "",
      spin: true,
      disableForm: false,
      errorEmail: null,
      formError: false
    };
  }

  handleValidSubmit(event, values) {
    this.setState({ values });
    this.setState({ spin: false, disableForm: true });
    //event.preventDefault();
    postData("http://localhost:3001/login", {
      username: this.state.email,
      password: this.state.password,
    }).then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
      this.setState({ loggedIn: data.loggedIn });
      if (!data.loggedIn) {
        this.setState({ spin: true });
        this.setState({ formError: true })
      }
      this.setState({ message: data.msg });
    });
  }

  onDissmisMsg() {
    console.log("onDissmiss");
    this.setState({ message: "" });
  }

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
    console.log(this.state.email)
    this.setState({
      errorEmail: false
    })
  };

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/home" />;
    }

    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 550 }}>
          <Form size='large'
          
            onSubmit={this.handleValidSubmit}
            error={this.state.formError}>
            <Segment stacked textAlign='left' style={{ padding: "50px" }}>
              <Header as='h2' color='black' textAlign='center' >
                Log-in to your account
              </Header>
              <Message
                error
                header='Login Failed'
                content="Please enter valid credentials"
              />
              <Form.Field
                id='form-input-control-error-email'
                control={Input}
                label='Email'
                type='email'
                value={this.state.email}
                onChange={this.onChangeEmail}
                error={this.state.errorEmail}
                required
              />
              <Form.Field
                id='form-input-control-error-password'
                icon='lock'
                iconPosition='left'
                control={Input}
                label='Password'
                type='password'
                value={this.state.password}
                onChange={this.onChangePassword}
                error={this.state.errorPassword}
                required
              />
              <Button color='green' fluid size='large'>
                Login
            </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <a href='#'>Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}
