import React, { Component, ChangeEvent } from "react";
import { History } from "history";
import { FormGroup, InputGroup, Button, H1 } from "@blueprintjs/core";
import { styled } from "./Theme";

interface SigninState {
  email: string;
  password: string;
}

interface Props {
  history: History;
}

const Wrapper = styled.div`
  padding: 15px 20px;
`;

export default class Signin extends Component<Props, SigninState> {
  state = {
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
    fetch("/api/users/signin", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status == 200) {
          this.props.history.push("/lists");
        } else {
          const error = new Error(res.statusText);
          throw error;
        }
        return res;
      })
      .catch(err => {
        console.error(err);
        alert("Error logging in please try again");
      });
  };

  render() {
    return (
      <Wrapper>
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
          </FormGroup>
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
        </form>
      </Wrapper>
    );
  }
}
