import React, { Component } from "react";
import { IonItemDivider } from "@ionic/react";
import { History } from "history";
import { FormGroup, InputGroup, Button, H1 } from "@blueprintjs/core";

interface LoginState {
  email: string;
  password: string;
}

interface Props {
  history: History;
}

export default class Login extends Component<Props, LoginState> {
  state = {
    email: "",
    password: ""
  };

  handlePasswordChange = (event: any) => {
    const { value } = event.target;
    this.setState({
      password: value
    });
  };

  handleEmailChange = (event: any) => {
    const { value } = event.target;
    this.setState({
      email: value
    });
  };

  onSubmit = (event: any) => {
    event.preventDefault();
    fetch("/api/users/signin", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status === 200) {
          this.props.history.push("/s");
        } else {
          const error = new Error(res.statusText);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert("Error logging in please try again");
      });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <H1>Sign in</H1>
        <FormGroup label="Email" labelFor="email">
          <InputGroup
            leftIcon="envelope"
            id="email"
            type="email"
            name="email"
            placeholder="Enter email"
            value={this.state.email}
            onChange={this.handleEmailChange}
            required
            large
            intent="primary"
          />
        </FormGroup>
        <FormGroup label="Senha">
          <InputGroup
            leftIcon="lock"
            type="password"
            name="password"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
            required
            large
            intent="primary"
          />
          <FormGroup>
            <Button
              intent="primary"
              large
              style={{ marginTop: "10px" }}
              type="submit"
              value="Submit"
            >
              Submit
            </Button>
          </FormGroup>
        </FormGroup>
      </form>
    );
  }
}
