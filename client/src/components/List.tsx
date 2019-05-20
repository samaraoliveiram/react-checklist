import React, { Component } from "react";
import { Card as MCard, H5, Button, Icon } from "@blueprintjs/core";
import { styled, theme } from "../components/Theme";
import { Link } from "react-router-dom";
import { withRouter, RouteComponentProps } from "react-router";

interface IList {
  _id: string;
  title: string;
  description: string;
}

interface ListState {
  lists: IList[];
}

const Card = styled(MCard)`
  border-radius: 0px;
`;
const Wrapper = styled.div`
  margin-top: ${theme.sizes.lg};
`;

const PlusButton = styled(Button)`
  border-radius: 100%;
  border-color: ${theme.colors.base.dark};
  border-width: 2px;
  border-style: solid;
  position: fixed;
  bottom: 5%;
  right: 5%;
`;

class List extends Component<RouteComponentProps, ListState> {
  state = {
    lists: []
  };

  loadList = async () => {
    const lists: IList[] = await fetch("/api/lists").then(r => r.json());
    this.setState({ lists });
  };

  componentDidMount() {
    this.loadList();
  }

  removeItem = (arrayLists: IList[], id: string): IList[] => {
    return arrayLists.filter(item => (item._id == id ? false : true));
  };

  deleteList = async (listID: string) => {
    this.setState(prevState => ({
      lists: this.removeItem(prevState.lists, listID)
    }));
    const list = await fetch(`/api/lists/${listID}`, {
      method: "DELETE"
    })
      .then(r => {
        return r.json();
      })
      .catch(err => {
        console.error(err);
        alert("Error on delete List");
      });
  };

  editList = async (list: IList) => {
    this.props.history.push(`/lists/${list._id}/edit`, list);
  };

  render() {
    return (
      <>
        {this.state.lists.map((list: IList) => (
          <Wrapper key={list._id}>
            <Card elevation={2}>
              <Link to={`/lists/${list._id}`}>
                <H5>{list.title}</H5>
                <p>{list.description}</p>
              </Link>
              <Button intent="danger" onClick={() => this.deleteList(list._id)}>
                <Icon icon="trash" iconSize={20} />
              </Button>
              <Button
                intent="success"
                style={{ marginLeft: "20px" }}
                onClick={() => this.editList(list)}
              >
                <Icon icon="edit" iconSize={20} />
              </Button>
            </Card>
          </Wrapper>
        ))}
        <PlusButton>
          <Link to={`/lists/create`}>
            <Icon
              icon="plus"
              iconSize={35}
              style={{
                color: theme.colors.base.dark
              }}
            />
          </Link>
        </PlusButton>
      </>
    );
  }
}

export default withRouter(List);
