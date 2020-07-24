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
import { Redirect, useHistory } from "react-router-dom";
import Msg from "./msg.auth.page";

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



export default class NewUserForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleValidSubmit = this.handleValidSubmit.bind(this);
        this.onDissmisMsg = this.onDissmisMsg.bind(this);
        this.state = {
            name: '',
            surname: '',
            email: '',
            password: '',
            message: '',
            status: '',
            spin: true,
            disableForm: false,
        };
    }

    handleValidSubmit(event, values, form) {
        this.setState({ values });
        this.setState({ spin: false, disableForm: true });

        //event.preventDefault();
        postData("http://localhost:3001/newUser", {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            surname: this.state.surname
        }).then((data) => {
            console.log(data); // JSON data parsed by `data.json()` call

            if (data.error) {
                this.setState({ message: data.error });
                return;
            }
            this.setState({
                message: 'User Created',
                spin: true
            })
            this.form.reset();
        });

    }

    onDissmisMsg() {
        console.log("onDissmiss");
        this.setState({ message: "" });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        console.log("state:" + this.state.name);
    };

    render() {

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
                        <CardHeader>Create New User</CardHeader>
                        <CardBody>
                            <Msg message={this.state.message} status={this.state.status} dissmis={this.onDissmisMsg} />
                            <AvForm
                                onValidSubmit={this.handleValidSubmit}
                                ref={element => (this.form = element)}
                            >
                                <AvGroup>
                                    <Label for="example">Name</Label>
                                    <AvInput
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={this.state.name}
                                        onChange={this.onChange}
                                        required
                                    />
                                    <AvFeedback>Please enter your name</AvFeedback>
                                </AvGroup>
                                <AvGroup>
                                    <Label for="example">Surname</Label>
                                    <AvInput
                                        type="text"
                                        name="surname"
                                        id="surname"
                                        value={this.state.surname}
                                        onChange={this.onChange}
                                        required
                                    />
                                    <AvFeedback>Please enter your Surname</AvFeedback>
                                </AvGroup>
                                <AvGroup>
                                    <Label for="example">Email</Label>
                                    <AvInput
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                        required
                                    />
                                    <AvFeedback>Please enter your email</AvFeedback>
                                </AvGroup>
                                <AvGroup>
                                    <Label for="example">Password</Label>
                                    <AvInput
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        required
                                    />
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
