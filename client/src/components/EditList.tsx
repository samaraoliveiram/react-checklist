import React, { Component, ChangeEvent } from "react";
import { FormGroup, InputGroup, Button, Icon } from "@blueprintjs/core";
import { styled } from "./Theme";
import { Link } from "react-router-dom";
import { withRouter, RouteComponentProps } from "react-router";

interface ListState {
  _id: string;
  title: string;
  description: string;
}

const Wrapper = styled.div`
  padding: 15px 20px;
`;

class EditList extends Component<RouteComponentProps, ListState> {
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
      const result = await fetch(`/api/lists/${this.state._id}`, {
        method: "PATCH",
        body: JSON.stringify(this.state),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const { list } = await result.json();
      this.props.history.push(`/lists/${this.state._id}`);
    } catch (error) {
      alert("Error on insert List: " + error);
    }
  };

  render() {
    return (
      <>
        <Wrapper>
          <Link to={`/lists`}>
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

export default withRouter(EditList);
