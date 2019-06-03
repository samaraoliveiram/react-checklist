import React, { Component, ChangeEvent } from "react";
import { FormGroup, InputGroup, Button, Icon } from "@blueprintjs/core";
import { styled } from "./Theme";
import { Link } from "react-router-dom";
import { withRouter, RouteComponentProps } from "react-router";

interface TodoState {
  title: string;
  description: string;
  date: Date;
}

const Wrapper = styled.div`
  padding: 15px 20px;
`;

class EditTodo extends Component<RouteComponentProps, TodoState> {
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

  onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await fetch(`/api/todos/${this.state._id}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...this.state,
          date: new Date(this.state.date + " ").toString()
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const todo = await result.json();
      this.props.history.push(`/lists/${this.state.list}`);
    } catch (error) {
      alert("Error on insert Todo: " + error);
    }
  };

  render() {
    return (
      <>
        <Wrapper>
          <Link to={`/lists/${this.state.list}`}>
            <Icon
              icon="chevron-left"
              iconSize={30}
              style={{ marginBottom: "10px" }}
            />
          </Link>
          <form onSubmit={this.onSubmit}>
            <FormGroup label="Title">
              <InputGroup
                id="title"
                type="title"
                name="title"
                placeholder="Enter a title"
                value={this.state.title}
                onChange={this.handleChange}
                required
                large
                intent="primary"
              />
            </FormGroup>
            <FormGroup label="Description">
              <InputGroup
                id="description"
                type="description"
                name="description"
                placeholder="Enter a description"
                value={this.state.description}
                onChange={this.handleChange}
                large
                intent="primary"
              />
            </FormGroup>
            <FormGroup label="Select a date">
              <input
                id="date"
                type="date"
                name="date"
                value={new Date(this.state.date).toISOString().substr(0, 10)}
                onChange={this.handleChange}
                required
                pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}"
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
      </>
    );
  }
}

export default withRouter(EditTodo);
