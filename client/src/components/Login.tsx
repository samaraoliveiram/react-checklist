import React, { Component } from "react";
import {} from "@ionic/react";
import { History } from "history";

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
        <h1>Login Below!</h1>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={this.state.email}
          onChange={this.handleEmailChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
          required
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
