import React from "react";
import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
  AvFeedback,
} from "availity-reactstrap-validation";
import {
  Button,
  Label,
  FormGroup,
  Container,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Spinner,
  CardTitle,
} from "reactstrap";
import { Redirect } from "react-router-dom";
import Msg from "./msg";
import auth from "./../auth";

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
      if(!data.loggedIn){
        this.setState({ spin: true });
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
  };

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/home" />;
    }

    return (
      <div>
        <Container
          style={{
            margin: 0,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            "max-width": "500px",
          }}
        >
          <Card
            style={{
              "background-color":
                "rgba(0,0,0, 0.4)" /* Black w/opacity/see-through */,
              color: "white",
            }}
          >
            <CardHeader>Login Form</CardHeader>
            <CardBody>
              <Msg message={this.state.message} dissmis={this.onDissmisMsg} />
              <AvForm
                onValidSubmit={this.handleValidSubmit}
                onSubmit={this.onSubmit}
              >
                <AvGroup>
                  <Label for="example">Email</Label>
                  {/* With AvField */}
                  <AvInput
                    type="email"
                    name="email"
                    id="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    required
                    disable={true}
                  />
                  {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
                  <AvFeedback>Please enter your email</AvFeedback>
                </AvGroup>
                {/* With AvGroup AvInput and AvFeedback to build your own */}
                <AvGroup>
                  <Label for="example">Password</Label>
                  <AvInput
                    type="password"
                    name="password"
                    id="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    required
                    disable={this.state.disableForm}
                  />
                  {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
                  <AvFeedback>Please enter a password</AvFeedback>
                </AvGroup>
                <FormGroup>
                  <Button color="primary">Submit</Button>
                </FormGroup>
              </AvForm>
            </CardBody>
            <CardFooter>
              <Spinner type="grow" color="primary" hidden={this.state.spin} />
            </CardFooter>
          </Card>
        </Container>
      </div>
    );
  }
}
