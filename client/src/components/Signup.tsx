import React, { Component, ChangeEvent } from "react";
import { IonItemDivider } from "@ionic/react";
import { History } from "history";
import { FormGroup, InputGroup, Button, H1 } from "@blueprintjs/core";

interface SignupState {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

interface Props {
  history: History;
}

export default class Signup extends Component<Props, SignupState> {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  };

  handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  onSubmit = (event: any) => {
    event.preventDefault();
    fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status === 200) {
          this.props.history.push("/tasks");
        } else {
          const error = new Error(res.statusText);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert("Error on register, please try again");
      });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <H1>Sign up</H1>
        <FormGroup label="First name" labelFor="firstname">
          <InputGroup
            id="firstname"
            type="firstname"
            name="firstname"
            placeholder="Enter firstname"
            value={this.state.firstname}
            onChange={this.handleChange}
            required
            large
            intent="primary"
          />
        </FormGroup>
        <FormGroup label="Last name" labelFor="lastname">
          <InputGroup
            id="lastname"
            type="lastname"
            name="lastname"
            placeholder="Enter lastname"
            value={this.state.lastname}
            onChange={this.handleChange}
            required
            large
            intent="primary"
          />
        </FormGroup>
        <FormGroup label="Email" labelFor="email">
          <InputGroup
            leftIcon="envelope"
            id="email"
            type="email"
            name="email"
            placeholder="Enter email"
            value={this.state.email}
            onChange={this.handleChange}
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
            onChange={this.handleChange}
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
