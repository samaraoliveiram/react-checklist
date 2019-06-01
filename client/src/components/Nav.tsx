import React, { Component, ChangeEvent } from "react";
import { Icon } from "@blueprintjs/core";
import { styled, theme } from "./Theme";
import { RouteComponentProps, withRouter } from "react-router";
import { H1, H2 } from "./Text";

interface WelcomeState {
  firstname: string;
}

const Box = styled.div`
  padding: ${theme.sizes.sm} ${theme.sizes.md} ${theme.sizes.sm};
  background-color: ${theme.colors.base.darkest};
  box-shadow: 2px 2px 5px ${theme.colors.base.darker};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;

class Welcome extends Component<RouteComponentProps, WelcomeState> {
  state = {
    firstname: ""
  };

  loadName = () => {
    const username = document.cookie.replace(
      /(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    this.setState({ firstname: username });
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
        <div>
          <H1>Olá {this.state.firstname}</H1>
          <H2>o que fará hoje?</H2>
        </div>
        <div>
          <Icon
            onClick={this.signOut}
            style={{
              color: theme.colors.base.lightest,
              order: -1
            }}
            icon="log-out"
            iconSize={25}
          />
          <Icon
            style={{
              marginLeft: "8px",
              color: theme.colors.base.lightest,
              order: 1
            }}
            icon="person"
            onClick={() => this.profile(this.state)}
            iconSize={25}
          />
        </div>
      </Box>
    );
  }
}

export default withRouter(Welcome);
