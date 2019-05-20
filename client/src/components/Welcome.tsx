import React, { Component, ChangeEvent } from "react";
import { History } from "history";
import { H2 as MH2, Button, Icon } from "@blueprintjs/core";
import { styled, theme } from "../components/Theme";
import { RouteComponentProps, withRouter } from "react-router";

interface WelcomeState {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const Box = styled.div`
  height: 20vh;
  background-color: ${theme.colors.base.dark};
  box-shadow: 2px 2px 5px ${theme.colors.base.shadow};
  flex-wrap: wrap;
  padding: ${theme.sizes.sm} ${theme.sizes.md} ${theme.sizes.sm};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const H2 = styled(MH2)`
  color: ${theme.colors.base.light};
`;

class Welcome extends Component<RouteComponentProps, WelcomeState> {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  };

  loadName = async () => {
    const me = await fetch("/api/users/me").then(r => r.json());
    this.setState({ ...me });
  };

  componentDidMount() {
    this.loadName();
  }
  signOut = async () => {
    await fetch(`/api/users/signout`);
    this.props.history.push(`/`);
  };
  profile = async (user: WelcomeState) => {
    this.props.history.push(`/profile`, this.state);
  };

  render() {
    return (
      <Box>
        <H2>Olá {this.state.firstname}, o que fará hoje? </H2>
        <Icon
          onClick={this.signOut}
          style={{
            color: theme.colors.base.light
          }}
          icon="log-out"
          iconSize={25}
        />
        <Icon
          style={{ marginLeft: "8px", color: theme.colors.base.light }}
          icon="person"
          onClick={() => this.profile(this.state)}
          iconSize={25}
        />
      </Box>
    );
  }
}

export default withRouter(Welcome);
