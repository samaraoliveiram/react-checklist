import React, { Component, ChangeEvent } from "react";
import { History } from "history";
import { FormGroup, InputGroup, Button, Icon } from "@blueprintjs/core";
import { styled } from "../components/Theme";
import { withRouter, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

interface ProfileState {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const Wrapper = styled.div`
  padding: 15px 20px;
`;

class Profile extends Component<RouteComponentProps, ProfileState> {
  state = {
    ...this.props.history.location.state
  };

  handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const me = await fetch("/api/users/me").then(r => r.json());
    fetch(`/api/users/profile/${me._id}`, {
      method: "PATCH",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status === 200) {
          this.props.history.push("/lists");
        } else {
          const error = new Error(res.statusText);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert("Error on update, please try again");
      });
  };

  render() {
    return (
      <Wrapper>
        <div>
          <Link to="/lists">
            <Icon
              icon="chevron-left"
              iconSize={30}
              style={{ marginBottom: "10px" }}
            />
          </Link>
        </div>
        <form onSubmit={this.onSubmit}>
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
          <FormGroup>
            <Button
              intent="primary"
              large
              style={{ marginTop: "10px" }}
              type="submit"
              value="Submit"
            >
              Update
            </Button>
          </FormGroup>
        </form>
      </Wrapper>
    );
  }
}

export default withRouter(Profile);
