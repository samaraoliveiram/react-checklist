import React, { Component, ChangeEvent } from "react";
import { FormGroup, InputGroup, Position, Button } from "@blueprintjs/core";
import { styled } from "./Theme";
import { Link } from "react-router-dom";

let today = new Date().toISOString().substr(0, 10);

interface Props {
  listID: string;
}

interface ITodo {
  _id: string;
  title: string;
  description: string;
  date: Date;
  done: boolean;
}

interface TodoState {
  title: string;
  description: string;
  date: Date;
}

const Wrapper = styled.div`
  padding: 15px 20px;
`;

export default class NewTodo extends Component<Props, TodoState> {
  state = {
    title: "",
    description: "",
    date: new Date(),
    list: this.props.listID
  };

  handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  handleDateChange = (date: Date) => this.setState({ date });

  onSubmit = async () => {
    const todo = await fetch("/api/todos/", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(r => {
        return r.json();
      })
      .catch(err => {
        console.error(err);
        alert("Error on insert Todo");
      });
  };

  render() {
    return (
      <>
        <Wrapper>
          <Link to={`/lists/${this.props.listID}`}>Back</Link>
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
                defaultValue={today}
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
